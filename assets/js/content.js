/*
  All site content lives here. Edit this file to update the website;
  you should not need to touch the HTML or CSS.

  Lines marked TODO are placeholders for you to check or replace.
  Empty strings ("") hide a link or field.
*/

const SITE = {
  name: "Hari Varshan",
  // One plain sentence: what you work on and why it matters.
  tagline:
    "I build machine learning methods for medical images and wearable signals, " +
    "with a focus on models that still work when the scanner, device, or site changes.",
  // Short status lines shown under the name.
  status: [
    "M.S. Computer Science and Engineering, University of Michigan", // TODO: update when you start your PhD
    "HPC Research Intern, NERSC, Lawrence Berkeley National Laboratory",
  ],

  links: {
    email: "", // TODO: e.g. "you@umich.edu"
    github: "https://github.com/harivarshan18",
    scholar: "", // TODO: Google Scholar profile URL
    linkedin: "", // TODO
    orcid: "", // TODO
    cv: "assets/cv.pdf", // TODO: upload your CV to assets/cv.pdf, or set to "" to hide
  },

  about: [
    "My research sits between medical imaging, machine learning, and biomedical signal processing. " +
      "A recurring question in my work is harmonization: how to learn representations that stay reliable " +
      "across scanners, devices, cohorts, and recording conditions.",
    "I have worked on PET image harmonization, thyroid nodule classification from CT, flow matching on " +
      "foundation model embeddings, and health classification from wearable and driving sensor data. " +
      "At NERSC I work on high-performance computing for quantum chemistry.",
    "Outside research I teach as a Graduate Student Instructor at the University of Michigan.",
  ],

  // Themes are used by the filter buttons in the Research section.
  themes: {
    imaging: "Medical imaging",
    signals: "Wearables and signals",
    representation: "Representation learning",
    hpc: "HPC and quantum",
  },

  // Research projects. Keep summaries to 1–2 sentences; put detail in "details".
  projects: [
    {
      title: "Harmonizing PET images across scanners",
      themes: ["imaging", "representation"],
      status: "Manuscript in preparation",
      summary:
        "CycleGAN variants, including a flow-matching CycleGAN (FM-Cycle-GAN), that map PET images " +
        "between scanner domains while preserving clinically relevant measurements.",
      details:
        "Evaluation uses paired statistical tests and correlation comparisons (Steiger's Z-test) to check " +
        "that harmonized images agree with the target domain without distorting quantitative values.",
      links: [],
    },
    {
      title: "Thyroid nodule classification from CT",
      themes: ["imaging"],
      status: "Manuscript in preparation",
      summary:
        "Benign versus malignant classification of thyroid nodules from CT, comparing 2D slice models " +
        "with a 3D pipeline built on DINOv2 features.",
      details:
        "The 3D pipeline uses masked, cropped nodule regions and a three-window CT input (soft tissue, " +
        "calcification, wide range). Evaluation is grouped by patient to avoid leakage between folds.",
      links: [],
    },
    {
      title: "Flow matching on foundation model embeddings",
      themes: ["representation", "imaging"],
      status: "Ongoing",
      summary:
        "Controlled experiments on how flow matching reshapes DINOv2 embedding spaces, from synthetic " +
        "data to MRI from the ADNI Alzheimer's cohort.",
      details:
        "Noise is calibrated by signal-to-noise ratio, and changes to the embedding space are measured " +
        "with shape summaries such as effective rank and participation ratio, with bootstrap inference.",
      links: [],
    },
    {
      title: "Migraine subtype classification from Fitbit heart rate",
      themes: ["signals"],
      status: "Ongoing",
      summary:
        "Chronic versus episodic migraine classification from minute-level Fitbit heart rate in the " +
        "All of Us Research Program, comparing summary statistics with time-series foundation model embeddings.",
      details: "",
      links: [],
    },
    {
      title: "Mild cognitive impairment from naturalistic driving",
      themes: ["signals", "representation"],
      status: "Ongoing",
      summary:
        "Detecting mild cognitive impairment from in-vehicle motion sensors recorded during everyday " +
        "driving, using time-series foundation models.",
      details:
        "Current work reconstructs a missing accelerometer channel from gyroscope and speed signals " +
        "before classification at the trip and turn level.",
      links: [],
    },
    {
      title: "Generative trial states for quantum Monte Carlo",
      themes: ["hpc"],
      status: "SC 2026 poster",
      summary:
        "Using variational (VQE) and generative (GQE) quantum eigensolvers to prepare trial wavefunctions " +
        "for phaseless auxiliary-field quantum Monte Carlo, and measuring the effect on accuracy and cost.",
      details:
        "Work done at NERSC. A follow-up benchmarks VQE, GQE, and their ADAPT variants on stretched " +
        "hydrogen chains.",
      links: [],
    },
  ],

  /*
    Publications, posters, abstracts, and talks.
    type: "paper" | "poster" | "abstract" | "talk" | "preprint" | "tutorial"
    Put your name exactly as it appears in "authors"; it is bolded automatically.
  */
  meName: "H. Varshan", // TODO: match how your name appears in author lists
  publications: [
    {
      // TODO: replace with the exact poster title and author list
      title: "Quantum-prepared trial wavefunctions for phaseless AFQMC",
      authors: "H. Varshan, et al.",
      venue: "SC 2026 (Research Poster)",
      year: 2026,
      type: "poster",
      status: "",
      abstract: "",
      links: { pdf: "", code: "", doi: "" },
      bibtex: "",
    },
    {
      // TODO: replace with the exact abstract title and author list
      title: "Architectural modifications to GQE for trial-state preparation in stretched hydrogen chains",
      authors: "H. Varshan, et al.",
      venue: "APS March Meeting",
      year: 2027,
      type: "abstract",
      status: "Submitted",
      abstract: "",
      links: {},
      bibtex: "",
    },
    {
      // TODO: replace with the exact tutorial title and author list
      title: "HPC tutorial (title to be added)",
      authors: "H. Varshan, et al.",
      venue: "SIGCSE Technical Symposium 2027 (Tutorial)",
      year: 2027,
      type: "tutorial",
      status: "Submitted",
      abstract: "",
      links: {},
      bibtex: "",
    },
  ],

  /*
    Notes / blog posts. Each post is a Markdown file in /posts.
    slug must match the file name: posts/<slug>.md
  */
  posts: [
    {
      slug: "hello-world",
      title: "Why harmonization keeps coming up in my work",
      date: "2026-11-03",
      summary: "A short note on the common thread between PET scanners, CT protocols, and wearable devices.",
    },
  ],

  // Teaching, service, awards. Shown as a simple list; newest first.
  experience: [
    { when: "2026–", what: "HPC Research Intern, NERSC, Lawrence Berkeley National Laboratory" },
    { when: "2026", what: "Graduate Student Instructor, University of Michigan" }, // TODO: course name and term
  ],
};
