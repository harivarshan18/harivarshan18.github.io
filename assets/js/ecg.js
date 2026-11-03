/*
  Hero rhythm strip: a synthetic ECG drawn on chart-paper grid.
  Standard paper: 1 mm minor squares, 5 mm major squares, 25 mm/s, 10 mm/mV.
  Moving the pointer across (or tapping) the strip sets the heart rate (left slow, right fast).
*/
(function () {
  const canvas = document.getElementById("ecg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const bpmEl = document.getElementById("bpm");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const MM = 6;              // CSS px per mm
  const SPEED = 25 * MM;     // px per second (25 mm/s)
  const GAIN = 10 * MM;      // px per mV (10 mm/mV)
  const START_X = 9 * MM;    // trace starts after the calibration pulse
  const GAP = 4 * MM;        // erased gap ahead of the sweep

  let W = 0, H = 0, dpr = 1, baseY = 0;
  let buf = new Float32Array(0);  // mV value per x pixel
  let head = START_X;
  let tBeat = 0;                  // seconds since start of current beat
  let bpm = 64, targetBpm = 64;
  let colors = {};
  let running = false, visible = true, lastT = 0;

  // Sum-of-Gaussians PQRST complex. t in seconds since beat onset.
  const waves = [
    { c: 0.10, a: 0.12, w: 0.025 },  // P
    { c: 0.195, a: -0.10, w: 0.010 }, // Q
    { c: 0.22, a: 1.05, w: 0.010 },   // R
    { c: 0.245, a: -0.24, w: 0.011 }, // S
    { c: 0.46, a: 0.30, w: 0.045 },   // T
  ];
  function ecg(t, rr) {
    // Shorten QT slightly at higher rates (rough Bazett-style scaling).
    const k = Math.min(1, Math.sqrt(rr));
    let v = 0;
    for (const p of waves) {
      const c = p.c > 0.3 ? p.c * k : p.c;
      const d = (t - c) / p.w;
      v += p.a * Math.exp(-0.5 * d * d);
    }
    return v;
  }

  function readColors() {
    const s = getComputedStyle(document.documentElement);
    colors = {
      minor: s.getPropertyValue("--grid-minor").trim(),
      major: s.getPropertyValue("--grid-major").trim(),
      trace: s.getPropertyValue("--trace").trim(),
      paper: s.getPropertyValue("--paper").trim(),
    };
  }

  function nextSample() {
    const rr = 60 / bpm;
    tBeat += 1 / SPEED;
    if (tBeat >= rr) tBeat -= rr;
    return ecg(tBeat, rr) + (Math.random() - 0.5) * 0.012;
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    baseY = Math.round(H * 0.62);
    const old = buf;
    buf = new Float32Array(W).fill(NaN);
    buf.set(old.subarray(0, Math.min(old.length, W)));
    if (head >= W) head = START_X;
    if (reduceMotion || !running) prefill();
    draw();
  }

  function prefill() {
    tBeat = 0.35;
    for (let x = START_X; x < W; x++) buf[x] = nextSample();
    head = W;
  }

  function drawGrid() {
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (const [step, color] of [[MM, colors.minor], [5 * MM, colors.major]]) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      for (let x = 0.5; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = baseY % step + 0.5; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
    }
  }

  function drawCalibration() {
    // 1 mV, 200 ms square pulse, as printed at the start of a real strip.
    const x0 = 2 * MM, w = 0.2 * SPEED;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.lineTo(x0, baseY);
    ctx.lineTo(x0, baseY - GAIN);
    ctx.lineTo(x0 + w, baseY - GAIN);
    ctx.lineTo(x0 + w, baseY);
    ctx.lineTo(START_X, baseY);
    ctx.stroke();
  }

  function draw() {
    if (!W) return;
    drawGrid();
    ctx.strokeStyle = colors.trace;
    ctx.lineWidth = 1.6;
    ctx.lineJoin = "round";
    drawCalibration();

    ctx.beginPath();
    let pen = false;
    for (let x = START_X; x < W; x++) {
      const inGap = !reduceMotion && x >= head && x < head + GAP;
      const v = buf[x];
      if (inGap || Number.isNaN(v)) { pen = false; continue; }
      const y = baseY - v * GAIN;
      if (pen) ctx.lineTo(x, y); else { ctx.moveTo(x, y); pen = true; }
    }
    ctx.stroke();

    // Write head dot
    if (!reduceMotion && head > START_X) {
      const v = buf[head - 1];
      if (!Number.isNaN(v)) {
        ctx.fillStyle = colors.trace;
        ctx.beginPath();
        ctx.arc(head - 1, baseY - v * GAIN, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function frame(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - (lastT || t)) / 1000);
    lastT = t;
    bpm += (targetBpm - bpm) * Math.min(1, dt * 1.5);
    if (bpmEl) bpmEl.textContent = Math.round(bpm);

    let n = Math.round(dt * SPEED);
    while (n-- > 0) {
      buf[head] = nextSample();
      head++;
      if (head >= W) head = START_X;
    }
    draw();
    requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion || !visible) return;
    running = true; lastT = 0;
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  // Pointer sets the target rate: 48 bpm at the left edge to 120 bpm at the right.
  function setRate(e) {
    const r = canvas.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    targetBpm = 48 + f * 72;
    if (reduceMotion) {
      bpm = targetBpm;
      if (bpmEl) bpmEl.textContent = Math.round(bpm);
      prefill(); draw();
    }
  }
  canvas.parentElement.addEventListener("pointermove", setRate);
  canvas.parentElement.addEventListener("pointerdown", setRate); // taps on phones
  canvas.parentElement.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") targetBpm = 64; });

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);

  document.addEventListener("themechange", () => { readColors(); draw(); });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); draw(); });
  window.addEventListener("resize", resize);

  readColors();
  resize();
  if (!reduceMotion) { buf.fill(NaN); head = START_X; tBeat = 0; start(); }
})();
