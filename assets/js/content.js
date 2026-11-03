/*
  All site content lives here. Edit this file to update the website;
  you should not need to touch the HTML or CSS.
  Empty strings ("") hide a link or field.
*/

const SITE = {
  name: "Hari Varshan",
  photo: "assets/img/hari.jpg",
  status: [
    "Ph.D. student in Computer Science, Arizona State University",
    "Graduate Research Associate, Wu Lab, ASU–Mayo Center for Innovative Imaging",
  ],

  links: {
    email: "harivarshan18@gmail.com",
    github: "https://github.com/harivarshan18",
    linkedin: "https://www.linkedin.com/in/hari-varshan-d",
    scholar: "https://scholar.google.com/citations?user=c0R_YdsAAAAJ&hl=en&authuser=1", 
    orcid: "",
    cv: "assets/Hari_Varshan_CV.pdf",
  },

  about: [
    "I am a Ph.D. student in Computer Science (earning a M.S. in Computer Science en route) at Arizona State University, advised by Dr. Teresa Wu " +
      "in the Wu Lab at the ASU–Mayo Center for Innovative Imaging. I completed my undergratuate" +
      "B.S. degrees in Computer Science and Mathematics from ASU with Barrett, The Honors College.",
    "My research adapts foundation models and generative models to clinical data: 3D medical images, " +
      "radiology reports, and physiological signals from wearables and in-vehicle sensors. I work on " +
      "harmonizing data across scanners and tracers, multimodal risk prediction, and early detection " +
      "of conditions such as mild cognitive impairment and cancer.",
    "Application areas include neuroimaging, computational oncology, and wearable health. " +
      "I train models at scale with multi-GPU distributed training on SLURM clusters.",
  ],

  // Themes are used by the filter buttons in the Research section.
  themes: {
    imaging: "Medical imaging",
    timeseries: "Physiological time series",
    multimodal: "Multimodal learning",
    generative: "Generative models",
  },

  projects: [
    {
      title: "Unpaired generative learning for amyloid PET harmonization",
      themes: ["imaging", "generative"],
      status: "Manuscript in preparation",
      summary:
        "A Feature-Mapping CycleGAN (FM-CycleGAN) that harmonizes regional amyloid PET measurements " +
        "between PiB and FBP tracers, without needing paired scans for training.",
      result: "Inter-tracer mcSUVR correlation improved from R = 0.922 to R = 0.963 (p < 0.001) on an independent paired test cohort.",
      details:
        "Trained on 5,433 unpaired PET scans from multiple neuroimaging cohorts, using residual MLP generators " +
        "with adversarial, cycle-consistency, and identity losses.",
      links: [],
    },
    {
      title: "Multimodal deep learning for incidental thyroid nodule risk stratification",
      themes: ["imaging", "multimodal"],
      status: "Manuscript in preparation",
      summary:
        "2D, 3D, and multimodal models that classify incidental thyroid nodules as benign or malignant " +
        "from CT images and radiology-report text in a 454-patient clinical cohort.",
      result: "0.768 AUC with image-text fusion on a 91-patient internal holdout cohort, outperforming image-only and volumetric models.",
      details:
        "Fine-tuned BioMedCLIP vision and text encoders and compared them with 2D ResNet and U-Net models and " +
        "MONAI 3D architectures, using patient-level 5-fold cross-validation and held-out evaluation.",
      links: [],
    },
    {
      title: "Foundation models for cognitive impairment detection from naturalistic driving",
      themes: ["timeseries"],
      status: "Ongoing",
      summary:
        "Detecting mild cognitive impairment (MCI) from accelerometer and gyroscope signals recorded while " +
        "19 older adults drove in everyday conditions.",
      result: "Frozen MOMENT embeddings improved from 0.51 AUROC on trip-level windows to 0.64 on turn-level segments and 0.79 on right turns.",
      details:
        "Foundation-model embeddings carried strong driver-specific structure, so evaluation uses leave-pair-out " +
        "splits with permutation testing to prevent subject leakage. High-frequency (24 Hz) maneuver-level " +
        "segments appear to keep MCI-related signal that coarse trip-level aggregation loses.",
      links: [],
    },
    {
      title: "Wearable time-series foundation models for migraine subtyping",
      themes: ["timeseries"],
      status: "Ongoing",
      summary:
        "Classifying chronic versus episodic migraine from minute-level Fitbit heart rate for 1,158 " +
        "participants in the All of Us Research Program.",
      result: "",
      details:
        "The pipeline detects device artifacts, resamples irregular readings onto a minute-level grid, and builds " +
        "20-day windows. Time-series foundation-model embeddings are compared with statistical baselines using " +
        "subject-level 5-fold cross-validation.",
      links: [],
    },
    {
      title: "Multimodal prognosis for lung adenocarcinoma",
      themes: ["multimodal", "imaging"],
      status: "CASI, 2025",
      summary:
        "Research design for a framework that combines whole-slide histopathology, genomic sequencing, and " +
        "clinical records to predict disease progression and treatment response.",
      result: "",
      details:
        "The architecture pairs a CNN with multiple instance learning for whole-slide images and MLP encoders for " +
        "genomic data, fused at the feature level. I led two graduate and one undergraduate researcher and wrote " +
        "the 12-month roadmap for a proposed ASU–Caris Life Sciences collaboration.",
      links: [],
    },
  ],

  /*
    Publications. Leave empty until papers are out; the section then shows
    "inPreparation" instead.
    type: "paper" | "preprint" | "poster" | "abstract" | "talk"
  */
  meName: "H. Varshan",
  publications: [
    // Example:
    // {
    //   title: "Paper title",
    //   authors: "H. Varshan, A. Coauthor, T. Wu",
    //   venue: "Journal or conference",
    //   year: 2027,
    //   type: "paper",
    //   status: "",
    //   abstract: "",
    //   links: { pdf: "", code: "", doi: "" },
    //   bibtex: "",
    // },
  ],
  inPreparation:
    "Manuscripts on amyloid PET harmonization and on multimodal thyroid nodule risk stratification are in " +
    "preparation. Papers will be listed here once they are published.",

  posts: [
    {
      slug: "hello-world",
      title: "Why harmonization keeps coming up in my work",
      date: "2026-11-03",
      summary: "A short note on the common thread between PET tracers, CT cohorts, and wearable devices.",
    },
  ],

  experience: [
    {
      when: "2025–now",
      what: "Graduate Research Associate, Wu Lab, ASU–Mayo Center for Innovative Imaging",
      detail: "Deep learning pipelines for 3D segmentation, anomaly detection, and multimodal classification across 10,000+ volumes from 9 datasets.",
    },
    {
      when: "2025",
      what: "AI Research Intern, Complex Adaptive Systems Initiative (CASI), ASU",
      detail: "Multimodal deep learning for lung adenocarcinoma prognosis, advised by Dr. George Poste.",
    },
    {
      when: "2024–2025",
      what: "Student Researcher, Meteor Studio Lab, ASU",
      detail: "VR training simulators and an XR development framework now used in a course of 100+ students each semester, advised by Dr. Robert LiKamWa.",
    },
    {
      when: "2024",
      what: "Data Science Intern, DATAD. CO",
      detail: "Time-series models for underground mining safety risk and an LLM-based retrieval system.",
    },
    {
      when: "2022–2025",
      what: "Co-Founder, DocYou LLC",
      detail: "Procedure-logging app for Phoenix Children's Hospital residents; $16,000 raised through pitch competitions.",
    },
  ],

  education: [
    { when: "2025–now", what: "Ph.D. in Computer Science, Arizona State University", detail: "M.S. in Computer Science awarded en route. Advisor: Dr. Teresa Wu." },
    { when: "2025", what: "B.S. in Computer Science and B.S. in Mathematics, Arizona State University", detail: "Barrett, The Honors College." },
  ],

  honors: [
    { when: "2026–now", what: "Reviewer, Journal of Alzheimer's Disease" },
    { when: "2026", what: "University Graduate Fellowship, Arizona State University" },
    { when: "2025", what: "Graduate Teaching Associate, Arizona State University" },
    { when: "2022–2024", what: "Student Mentor, School of Computing and Augmented Intelligence, ASU" },
  ],
};
