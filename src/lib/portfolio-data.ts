// Portfolio data for Hardik — AI/ML Engineer
// Consolidated from CV + README research + certificate research.

export const profile = {
  name: "Hardik",
  title: "AI/ML Engineer",
  tagline: "Building applied intelligence systems that solve real-world problems.",
  bio: "AI/ML Engineer specializing in LLMs, NLP, Computer Vision, and Full-Stack AI applications. I design production-grade systems — from hybrid RAG pipelines to explainable deep-learning classifiers — and ship them end-to-end.",
  email: "hardikkumar2583@gmail.com",
  phone: "+91 78786 00960",
  location: "Punjab, India",
  availability: "Open to AI/ML Engineer roles · Remote / Hybrid",
  github: "https://github.com/Har-dik25",
  linkedin: "https://www.linkedin.com/in/hardik8/",
  website: "https://hardik.dev",
} as const;

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
};

// Restructured per CV. "years" removed per user request.
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "Code2",
    skills: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 82 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 74 },
      { name: "HTML / CSS", level: 88 },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML Frameworks",
    icon: "Brain",
    skills: [
      { name: "Large Language Models", level: 88 },
      { name: "NLP (BERT, RAG, Prompt Eng.)", level: 90 },
      { name: "Scikit-learn", level: 85 },
      { name: "TensorFlow", level: 78 },
      { name: "PyTorch", level: 80 },
      { name: "LangChain / Google ADK", level: 80 },
      { name: "Retrieval-Augmented Generation", level: 85 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Auth", level: 80 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "SQLite", level: 82 },
      { name: "Vector DBs (ChromaDB)", level: 82 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "MonitorSmartphone",
    skills: [
      { name: "React.js / Vite", level: 82 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Streamlit", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "Wrench",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Azure", level: 72 },
      { name: "Power BI", level: 78 },
      { name: "Hugging Face", level: 82 },
      { name: "Postman", level: 85 },
    ],
  },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  highlights: string[];
  certificate?: { label: string; url: string };
  project?: { label: string; url: string };
};

export const experiences: Experience[] = [
  {
    id: "futurense-aiml",
    role: "Applied AI & Intelligent Systems Intern",
    company: "Futurense Technologies",
    period: "Jun '26 – Jul '26",
    current: false,
    highlights: [
      "Designed applied AI solutions using machine learning workflows and intelligent system design patterns to address real-world automation and data challenges.",
      "Engineered AI/ML pipelines using prompt engineering, embeddings, and intelligent architectures to improve model inference, latency, and response reliability.",
      "Architected production-oriented AI system design, exploring full-pipeline workflows spanning data ingestion, preprocessing, model inference/fine-tuning, and API deployment.",
    ],
    certificate: {
      label: "View Certificate",
      url: "https://lnkd.in/p/dCbWkd-U",
    },
    project: {
      label: "View Project — MediNote",
      url: "https://github.com/Har-dik25/MediNote",
    },
  },
  {
    id: "futurense-data",
    role: "Data Intern",
    company: "Futurense Technologies",
    period: "Jun '25 – Aug '25",
    current: false,
    highlights: [
      "Developed and deployed production-grade ML models to forecast lead volume and conversion rates.",
      "Cleaned and standardized high-volume marketing data to support end-to-end funnel and cohort analysis, ensuring near-perfect data consistency across reporting tools.",
      "Delivered Power BI dashboards to visualize funnel drop-offs, identifying 15% critical inefficiencies in CPL focused optimization strategies.",
    ],
    certificate: {
      label: "View Certificate",
      url: "https://www.linkedin.com/posts/hardik8_internship-activity-7429402370805047296-5OnB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQRyuwB0zCPK7scmrw3oCQd02xFX6nHoBk",
    },
  },
];

export type EducationItem = {
  id: string;
  degree: string;
  school: string;
  period: string;
  grade: string;
  icon: string;
};

export const education: EducationItem[] = [
  {
    id: "lpu-cse",
    degree: "B.Tech in Computer Science & Engineering",
    school: "Lovely Professional University, Punjab",
    period: "Aug '23 – Jul '27 (Expected)",
    grade: "CGPA: 7.00",
    icon: "GraduationCap",
  },
  {
    id: "aci-12th",
    degree: "Intermediate (Class XII — Science)",
    school: "ACI Senior Secondary School, Jhunjhunu, Rajasthan",
    period: "Apr '21 – Mar '22",
    grade: "Percentage: 83.80%",
    icon: "School",
  },
  {
    id: "aci-10th",
    degree: "Matriculation (Class X)",
    school: "ACI Senior Secondary School, Jhunjhunu, Rajasthan",
    period: "Apr '19 – Mar '20",
    grade: "Percentage: 82.17%",
    icon: "BookOpen",
  },
];

export type Achievement = {
  id: string;
  title: string;
  context: string;
  date: string;
  icon: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    id: "hackerrank-5star",
    title: "5★ on HackerRank — Python & SQL",
    context: "Achieved 5-star rating in both Python and SQL on HackerRank, reflecting strong problem-solving and data-querying fundamentals.",
    date: "Oct '25",
    icon: "Star",
    url: "https://www.hackerrank.com/profile/har-dik25",
  },
  {
    id: "google-genai-exchange",
    title: "Google Gen AI Exchange Hackathon — Participant",
    context: "Competed in Google's Gen AI Exchange Hackathon, building generative-AI powered solutions under time-boxed constraints.",
    date: "Sep '25",
    icon: "Trophy",
  },
  {
    id: "smart-india-hackathon",
    title: "Smart India Hackathon — Participant",
    context: "Represented in the national-level Smart India Hackathon, tackling real-world problem statements with cross-functional teams.",
    date: "Sep '25",
    icon: "Trophy",
  },
  {
    id: "iit-delhi-da",
    title: "Data Analytics Hackathon — IIT Delhi",
    context: "Participated in a Data Analytics Hackathon organized at IIT Delhi (via Techgyan), working on end-to-end analytical problem solving.",
    date: "Jul '25",
    icon: "Award",
    url: "https://lnkd.in/p/gZ6UG53i",
  },
];

export type CertItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  url: string;
  description: string;
};

// Column 1 — course / workshop / participation completion certificates
export const certificates: CertItem[] = [
  {
    id: "udemy-genai-nocode",
    title: "Build Generative AI Apps and Solutions with No-Code Tools",
    issuer: "Udemy",
    date: "Aug '25",
    icon: "Sparkles",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-31d36878-c879-4417-8e0b-5a8a55a124a5.pdf",
    description:
      "Hands-on building of generative AI apps and solutions using no-code platforms, LLM APIs, and prompt engineering.",
  },
  {
    id: "udemy-genai-master",
    title: "Master Generative AI & GenAI Tools (ChatGPT & more)",
    issuer: "Udemy",
    date: "Aug '25",
    icon: "Sparkles",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-f8a1cf4e-10bc-47c6-9cbe-b52ae86cf5e3.pdf",
    description:
      "Comprehensive mastery of generative AI concepts and hands-on use of ChatGPT plus major GenAI tools.",
  },
  {
    id: "udemy-chatgpt",
    title: "ChatGPT Made Easy: AI Essentials for Beginners",
    issuer: "Udemy",
    date: "Aug '25",
    icon: "MessageSquare",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-2e2b095a-2ae5-4178-a40e-531afe50dc0a.pdf",
    description:
      "Beginner-friendly introduction to ChatGPT fundamentals and essential AI concepts for everyday productivity use.",
  },
  {
    id: "ibm-hw-os",
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM (via Coursera)",
    date: "Oct '24",
    icon: "Cpu",
    url: "https://lnkd.in/p/gy9ctjCx",
    description:
      "Computer hardware components, OS architecture, resource management, memory allocation, multitasking, and file management fundamentals.",
  },
  {
    id: "uab-digital-systems",
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "UAB (via Coursera)",
    date: "Sep '24",
    icon: "Cpu",
    url: "https://lnkd.in/p/ggsdziVY",
    description:
      "Digital electronics fundamentals from logic gates and combinational logic through microprocessor architecture and processor design.",
  },
  {
    id: "accenture-digital-skills-ai",
    title: "Digital Skills: Artificial Intelligence",
    issuer: "Accenture (via FutureLearn)",
    date: "Sep '24",
    icon: "Brain",
    url: "https://lnkd.in/p/gRhSNViH",
    description:
      "AI origins and evolution, industry applications, human-AI collaboration, and skills for an AI-driven workplace.",
  },
  {
    id: "infosys-html",
    title: "Introduction to HTML",
    issuer: "Infosys",
    date: "Jan '24",
    icon: "Code2",
    url: "https://lnkd.in/p/gW8xw_NQ",
    description:
      "Foundational HTML for web page structure: tags, elements, links, images, forms, tables, and semantics.",
  },
  {
    id: "iit-delhi-da-workshop",
    title: "Data Analytics Workshop — Participation",
    issuer: "IIT Delhi × Techgyan",
    date: "Jul '25",
    icon: "Award",
    url: "https://lnkd.in/p/gZ6UG53i",
    description:
      "Participatory data analytics workshop emphasizing creativity, analytical thinking, and problem-solving applied to real datasets.",
  },
];

// Column 2 — professional certifications + industry virtual job simulations
export const certifications: CertItem[] = [
  {
    id: "oci-genai",
    title: "OCI Certified Generative AI Professional",
    issuer: "Oracle",
    date: "Sep '25",
    icon: "Cloud",
    url: "https://www.linkedin.com/posts/hardik8_generative-ai-professional-activity-7388917134468431872-ipzL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQRyuwB0zCPK7scmrw3oCQd02xFX6nHoBk",
    description:
      "Oracle OCI Generative AI Professional: foundation models, LLMs on Oracle Cloud, scalable AI pipelines, ethical deployment.",
  },
  {
    id: "oci-ds",
    title: "OCI Certified Data Science Professional",
    issuer: "Oracle",
    date: "Sep '25",
    icon: "ChartLine",
    url: "https://www.linkedin.com/posts/hardik8_data-science-professional-ugcPost-7389534103588659200-GkAy/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQRyuwB0zCPK7scmrw3oCQd02xFX6nHoBk",
    description:
      "Oracle OCI Data Science Professional: building, training, and deploying ML models on Oracle Cloud infrastructure.",
  },
  {
    id: "freecodecamp-rwd",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    date: "2024",
    icon: "MonitorSmartphone",
    url: "https://www.freecodecamp.org/certification/fcc3196ca3e-54e2-4ebc-afa1-8d477e3c60d8/responsive-web-design",
    description:
      "HTML, CSS, Flexbox, Grid, accessibility, and responsive web design fundamentals for mobile-first layouts.",
  },
  {
    id: "bcg-forage",
    title: "Data Science Job Simulation",
    issuer: "BCG (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/BCG%20/Tcz8gTtprzAS4xSoK_BCG_YZPnJpJicnio6fwnG_1723047648966_completion_certificate.pdf",
    description:
      "BCG data-science simulation: business framing, exploratory data analysis, feature engineering, modeling, and executive recommendations.",
  },
  {
    id: "accenture-na-forage",
    title: "Data Analytics & Visualization Job Simulation",
    issuer: "Accenture NA (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://lnkd.in/p/ggsMNuxp",
    description:
      "Accenture virtual simulation: project understanding, data cleaning and modeling, visualization storytelling, and client presentations.",
  },
  {
    id: "ba-forage",
    title: "Data Science Job Simulation",
    issuer: "British Airways (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/British%20Airways/NjynCWzGSaWXQCxSX_British%20Airways_YZPnJpJicnio6fwnG_1723045973325_completion_certificate.pdf",
    description:
      "British Airways data-science simulation: web scraping for company insights and predicting customer buying behavior.",
  },
  {
    id: "deloitte-forage",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "Aug '25",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_YZPnJpJicnio6fwnG_1756043909209_completion_certificate.pdf",
    description:
      "Deloitte data-analytics virtual simulation covering practical data analysis techniques and forensic technology investigations.",
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  featured: boolean;
  description: string;
  tech: string[];
  url: string;
  collaboration?: boolean;
  extraLinks?: { label: string; url: string }[];
  highlights?: string[];
  image?: string;
};

// Descriptions grounded in each repo's actual README (fetched via raw.githubusercontent.com).
export const projects: Project[] = [
  {
    slug: "medinote",
    title: "MediNote — AI Medical Documentation",
    tagline: "Open-source AI medical copilot (internship project)",
    icon: "Stethoscope",
    featured: true,
    description:
      "MediMate is an open-source, zero-cost AI medical copilot that listens to doctor-patient conversations and synthesizes structured SOAP notes, suggests ICD-10 codes, recommends diagnostics, and flags drug interactions using RAG grounded in multi-regional clinical guidelines (NICE, CDC, EMA, WHO). It runs HuggingFace Whisper locally for privacy-preserving transcription, with Llama 3 via Groq, LangChain orchestration, and a local ChromaDB vector store of authoritative clinical guidelines. Built during my Applied AI internship at Futurense.",
    tech: ["React", "Vite", "FastAPI", "LangChain", "ChromaDB", "Whisper", "Llama 3"],
    url: "https://github.com/Har-dik25/MediNote",
    highlights: [
      "Real-time Whisper transcription (local, privacy-preserving)",
      "Multi-region RAG: NICE / CDC / EMA / WHO guidelines",
      "Auto SOAP notes + ICD-10 + drug-interaction checks",
    ],
  },
  {
    slug: "rural-healthcare",
    title: "Rural Healthcare Access Gap Mapper",
    tagline: "GIS decision-support across 673K+ villages",
    icon: "HeartPulse",
    featured: true,
    description:
      "National-scale decision-support platform diagnosing rural healthcare access gaps across 36 states/UTs, 640 districts, and 673,638 villages using a composite Access Gap Index (AGI) and a peer-reviewed 2SFCA spatial accessibility model. Exposes 12 interactive Streamlit/Plotly modules — geospatial gap maps, infra-vs-staffing 4-quadrant diagnostics, a PM-ABHIM budget optimizer, NFHS-5 outcome correlations, and a 673k-village drilldown — backed by a SQLite warehouse built from MoHFW RHS, Census, NFHS-5, and OSRM travel data. Grounded in Lancet/BMJ Global Health methodology with 16/16 passing tests.",
    tech: ["Python", "Streamlit", "Plotly", "SQLite", "pandas", "OSRM", "2SFCA"],
    url: "https://github.com/Har-dik25/Rural-Healthcare-Access-Gap",
    highlights: [
      "Covers 36 states, 640 districts, 673,638 villages",
      "12-tab Streamlit dashboard + PM-ABHIM budget optimizer",
      "Composite AGI + 2SFCA spatial accessibility model",
    ],
  },
  {
    slug: "samvidhan-ai",
    title: "Legal Mind RAG — Samvidhan AI",
    tagline: "Zero-LLM extractive legal intelligence engine",
    icon: "Scale",
    featured: false,
    description:
      "Samvidhan AI (LegalMind) is a deterministic, zero-LLM extractive legal intelligence engine for the Indian legal corpus — covering BNS/BNSS/BSA 2023, the Constitution of India, IPC/CrPC, and landmark Supreme Court precedents across 3,840+ statutory chunks. It uses hybrid dense (ChromaDB) + sparse (BM25) retrieval fused with Section-Boosted Reciprocal Rank Fusion and a cross-encoder reranker, then synthesizes verbatim statutory answers (0% hallucination) in <0.02s via Server-Sent Events streaming to a React/Vite workspace with interactive IPC↔BNS / CrPC↔BNSS / IEA↔BSA transmuters and knowledge graphs.",
    tech: ["Python", "FastAPI", "React", "Vite", "ChromaDB", "BM25", "Sentence-Transformers", "SQLite"],
    url: "https://github.com/Har-dik25/Samvidhan_AI",
    highlights: [
      "Zero-LLM extractive synthesis — 0% hallucination, <0.02s",
      "Hybrid Dense + BM25 retrieval with RRF + cross-encoder reranker",
      "IPC↔BNS / CrPC↔BNSS / IEA↔BSA cross-statute mapping",
    ],
  },
  {
    slug: "fake-news-detection",
    title: "TruthLens AI — Fake News Detection",
    tagline: "Explainable BERT + BiLSTM ensemble",
    icon: "Newspaper",
    featured: false,
    description:
      "TruthLens AI is a production-grade fake-news detection platform combining a hybrid ensemble of BERT (contextual) and BiLSTM with scaled dot-product self-attention (sequential), augmented with classical TF-IDF, POS-ratio, and VADER sentiment features, calibrated at 60% BERT / 40% BiLSTM weighting. Trained on the WELFake dataset (72,134 articles), it ships with a FastAPI backend, a glassmorphic frontend with attention-heatmap visualizations for explainability, and full Docker Compose deployment.",
    tech: ["PyTorch", "BERT", "BiLSTM", "NLTK", "scikit-learn", "FastAPI", "Docker"],
    url: "https://github.com/Har-dik25/Fake-News-Detection-System",
    highlights: [
      "Hybrid BERT + BiLSTM-attention ensemble (60/40 weighting)",
      "Attention heatmaps for token-level explainable AI",
      "Trained on WELFake 72k+ articles; Dockerized FastAPI",
    ],
  },
  {
    slug: "shopwave-agent",
    title: "ShopWave — Autonomous Support Agent",
    tagline: "Zero-LLM rule-based e-commerce agent (NexusDesk)",
    icon: "ShoppingCart",
    featured: false,
    description:
      "A rule-based (zero-LLM) autonomous support resolution agent for the NexusDesk e-commerce platform that processes 20 customer tickets concurrently (8 workers, ~0.13s total) using a 9-tool toolkit, with each ticket requiring ≥3 chained tool calls (fetch → verify → act → reply). It classifies tickets into 8 categories with urgency/flag detection (social engineering, VIP exceptions), resolves refunds/cancellations/replacements, escalates ambiguous cases, and emits a complete audit log. Pure Python 3.10+ standard library — no external dependencies, no API keys, no .env files.",
    tech: ["Python 3.10+", "ThreadPoolExecutor", "threading", "Concurrency"],
    url: "https://github.com/Har-dik25/ShopWave_Autonomous_Support_Resolution_Agent",
    highlights: [
      "Zero-LLM, zero-dependency (pure Python stdlib)",
      "20 tickets concurrent, 8 workers, ≥3 tool calls per chain",
      "@resilient_tool retries + full audit log + self-evaluation",
    ],
  },
  {
    slug: "market-sentiment",
    title: "Algorithmic Market Sentiment Platform",
    tagline: "News-vector correlation + Signal Desk console",
    icon: "TrendingUp",
    featured: false,
    description:
      "An end-to-end data engineering and applied-ML platform that ingests live financial news from RSS / SEC EDGAR / FNSPID / NSE feeds, embeds articles into 384-dim SentenceTransformer vectors, indexes them in Qdrant, and statistically tests whether news-sentiment shifts lead or lag equity price moves via ±5-day cross-correlation with p-values and regime classification. Pairs a FastAPI backend (semantic search, evidence traceability) with a Next.js 'Signal Desk' trading console and a HistGradientBoosting predictor fusing technical indicators (RSI/MACD/Bollinger) with sentiment signals across 25+ tickers.",
    tech: ["Python", "FastAPI", "Qdrant", "SentenceTransformers", "scikit-learn", "Next.js", "Docker"],
    url: "https://github.com/Har-dik25/Algorithmic-Market-Sentiment-News-Vector-Correlation-Platform",
    highlights: [
      "Live news → 384-dim vectors → Qdrant (<300ms p95 search)",
      "Lead-lag cross-correlation ±5 days with p-values & regime tags",
      "HistGradientBoosting ML predictor + Next.js Signal Desk console",
    ],
  },
  {
    slug: "ocr-studio",
    title: "OCR Studio",
    tagline: "Offline Flask + Tesseract OCR to JSON",
    icon: "Image",
    featured: false,
    description:
      "OCR Studio is a fully offline Optical Character Recognition web app built with Flask, OpenCV, and Tesseract OCR — users upload PNG/JPG/JPEG images, extract text locally, view it live on the UI, and download structured JSON, all without an internet connection. Features a modern glassmorphism SaaS-style UI, device image-upload support, and a clean Flask/static/templates project layout designed for portfolio showcases.",
    tech: ["Python", "Flask", "OpenCV", "Tesseract OCR", "Pillow", "NumPy"],
    url: "https://github.com/Har-dik25/OCR-Studio-Offline-Image-to-JSON-Web-App",
    highlights: [
      "100% offline OCR — privacy-focused, no internet required",
      "Flask + OpenCV + Tesseract stack; PNG/JPG/JPEG upload",
      "Live text render + structured JSON preview & download",
    ],
  },
  {
    slug: "hitcast-spotify",
    title: "HitCast — Spotify Popularity Predictor",
    tagline: "ML on Spotify audio features",
    icon: "Music",
    featured: false,
    description:
      "Machine learning system that predicts Spotify track popularity using audio characteristics and regression techniques. Performs data preparation, feature analysis on Spotify audio features, and predictive modeling to surface which acoustic traits correlate with popularity. (Project README currently marked in-progress.)",
    tech: ["Python", "Machine Learning", "Regression", "Spotify API"],
    url: "https://github.com/Har-dik25/HitCast-Spotify-Track-Popularity-Predictor",
    highlights: [
      "Spotify Web API ingestion",
      "Audio feature regression",
      "Feature importance analysis",
    ],
  },
  {
    slug: "transport-delay",
    title: "TransitAI — Transport Delay × Weather",
    tagline: "NYC MTA bus-delay ML with SHAP explainability",
    icon: "Bus",
    featured: false,
    description:
      "TransitAI is an end-to-end ML project that analyzes and predicts NYC MTA bus delays by enriching simulated trip records with historical weather (Open-Meteo) and city events (concerts, marathons), then training Random Forest and Gradient Boosting models to predict both delay occurrence and delay minutes. Exposes insights through a Streamlit dashboard with overview KPIs, an interactive data explorer, a custom plotter, a 'What-If' trip predictor, SHAP-based explainable-AI insights, and a 7-day forecast with hypothetical-snowstorm injection. Full pipeline is reproducible via a Makefile.",
    tech: ["Python", "Streamlit", "scikit-learn", "Plotly", "pandas", "SHAP"],
    url: "https://github.com/Har-dik25/Public-Transport-Delays-with-Weather-Events",
    highlights: [
      "Random Forest + Gradient Boosting on NYC MTA bus data",
      "Streamlit dashboard: What-If predictor + SHAP explanations",
      "Weather + city-event enrichment; Makefile-driven pipeline",
    ],
  },
  {
    slug: "hrms",
    title: "Nexus HR Core — HRMS",
    tagline: "Full-stack HR management system",
    icon: "Users",
    featured: false,
    description:
      "Nexus HR Core is a full-stack Human Resource Management System split into a FastAPI backend (PostgreSQL via Supabase, JWT auth, Pydantic v2 schemas, RBAC for Admin/Employee, Dockerized) and a React 18 + Vite + Tailwind frontend (separate repo) with role-based dashboards, Recharts visualizations, glassmorphism design, and dark/light mode. The backend manages employees, departments, attendance check-in, and leave requests/approvals; the frontend provides Admin analytics/approvals and Employee check-in/history views with real-time optimistic UI updates.",
    tech: ["FastAPI", "Supabase", "PostgreSQL", "JWT", "Docker", "React", "Vite", "Tailwind", "Recharts"],
    url: "https://github.com/Har-dik25/hrms-backend",
    extraLinks: [
      { label: "Backend", url: "https://github.com/Har-dik25/hrms-backend" },
      { label: "Frontend", url: "https://github.com/Har-dik25/hrms-frontend" },
    ],
    highlights: [
      "FastAPI + Supabase Postgres backend with RBAC + JWT",
      "React/Vite/Tailwind frontend; Recharts dashboards, glass UI",
      "Endpoints: auth, employees, attendance, leave request/approve",
    ],
  },
  {
    slug: "ums-replica",
    title: "CampusFlow — UMS Replica",
    tagline: "Full-stack university management system",
    icon: "GraduationCap",
    featured: false,
    description:
      "CampusFlow is a full-stack University Management System built with FastAPI (Python 3.13) and React 19 (Vite), backed by Supabase (PostgreSQL) with JWT-based role auth (local SQLite for users). It covers students, faculty/staff, academics (departments/programs/courses), attendance/timetables, exams/results, finance/fees, library, and hostels — exposing 109 API endpoints across 50+ database tables and 13 routers. The React frontend ships with 18 route pages and a reusable component architecture.",
    tech: ["React", "Vite", "FastAPI", "Supabase", "PostgreSQL", "JWT", "SQLite"],
    url: "https://github.com/Har-dik25/UMS-replica",
    highlights: [
      "109 API endpoints across 50+ tables (13 routers)",
      "Modules: students, faculty, exams, finance, library, hostels",
      "JWT role-based auth + Supabase Postgres; 18 React pages",
    ],
  },
  // ---- Group / collaboration projects (same grid, marked with a badge) ----
  {
    slug: "ai-traffic-congestion",
    title: "AI Traffic Congestion Analysis",
    tagline: "ML congestion prediction on AWS Lambda",
    icon: "TrafficCone",
    featured: false,
    description:
      "A group project (with Mehtab Singh, Nakala Harshavardhan Reddy, and Akshith Gupta) that analyzes traffic congestion patterns using historical data from the TOMTOM API and INRIX reports, then trains an ML model deployed on AWS Lambda to predict congestion levels. Insights are visualized as heatmaps and historical trends in a Flask-based dashboard, with travel recommendations derived from congestion patterns. The data pipeline runs on Amazon EC2.",
    tech: ["Python", "Amazon EC2", "AWS Lambda", "Matplotlib", "Seaborn", "Flask", "TOMTOM API"],
    url: "https://github.com/Har-dik25/AI-Traffic-Congestion-Analysis",
    collaboration: true,
    highlights: [
      "ML congestion prediction deployed on AWS Lambda",
      "Data sources: TOMTOM API + INRIX reports; EC2 compute",
      "Flask dashboard with heatmaps + travel recommendations",
    ],
  },
  {
    slug: "gemini-ocr-azure",
    title: "Gemini OCR — Azure",
    tagline: "Serverless multimodal OCR on Azure",
    icon: "Eye",
    featured: false,
    description:
      "A serverless OCR system (collaboration with Vansh Arora) that extracts text from JPG, PNG, and PDF files using Google Gemini's multimodal AI, exposed via an Azure Functions (Python) REST backend with a modern HTML/Tailwind CSS/JavaScript frontend. Features drag-and-drop file upload, copy/download of extracted text, and secure API-key handling — the Gemini key is stored only in Azure Function App settings, never exposed to the frontend or repo.",
    tech: ["Azure Functions", "Google Gemini", "HTML5", "Tailwind CSS", "JavaScript", "REST"],
    url: "https://github.com/vansharora156/Gemini-Ocr-Azure",
    collaboration: true,
    highlights: [
      "Serverless: Azure Functions backend + Google Gemini AI",
      "Drag-and-drop JPG/PNG/PDF upload; copy/download text",
      "Secure API-key handling (backend-only Gemini calls)",
    ],
  },
  {
    slug: "solar-forecasting",
    title: "Solar Power Generation Forecasting",
    tagline: "scikit-learn + XGBoost + LightGBM ensemble",
    icon: "Sun",
    featured: false,
    description:
      "A solar power generation forecasting project (collaboration) that uses an ensemble of regression models — scikit-learn, XGBoost, and LightGBM — trained on historical power and weather data, exposed through a Streamlit web UI. Features weather/time-based feature engineering and ensemble modeling for improved accuracy and stability, with datasets bundled in the repository and the model regenerable via the training script.",
    tech: ["Python", "scikit-learn", "XGBoost", "LightGBM", "pandas", "NumPy", "Streamlit"],
    url: "https://github.com/LeviAckermanZ9/solar-power-generation-forecasting",
    collaboration: true,
    highlights: [
      "Ensemble of scikit-learn + XGBoost + LightGBM regressors",
      "Streamlit UI; weather + time-based features",
      "Datasets bundled in /model; model regenerable via training",
    ],
  },
  {
    slug: "genai-doc-demistifier",
    title: "GenAI Document Demystifier",
    tagline: "Google Gen AI Exchange hackathon build",
    icon: "FileText",
    featured: false,
    description:
      "A generative-AI application built for the Google Gen AI Exchange Hackathon (collaboration) that demystifies complex documents — summarizing, explaining, and answering questions over dense PDFs using Google's GenAI stack. Turns opaque legal/technical paperwork into navigable, queryable knowledge.",
    tech: ["Google GenAI", "Generative AI", "RAG", "Python", "Document AI"],
    url: "https://github.com/JXPJXT/GoogleGenAiExchange-GenAI-Document-Demistifier",
    collaboration: true,
    highlights: [
      "Built for Google Gen AI Exchange Hackathon",
      "Document summarization + Q&A over dense PDFs",
      "Collaboration project",
    ],
  },
  {
    slug: "kaggle-backpack",
    title: "Kaggle Backpack Price Prediction",
    tagline: "Tabular ML competition (Feb 2025)",
    icon: "Briefcase",
    featured: false,
    description:
      "A Kaggle Tabular Playground Series submission (Feb 2025, collaboration with Japjot & Gurkirat) that predicts backpack prices from tabular attributes, optimized for RMSE. The notebook walks through EDA, data cleaning, feature engineering (transformations + combination testing), and regression-model experimentation with hyperparameter tuning via cross-validation, using XGBoost as the primary model alongside pandas, NumPy, scikit-learn, Matplotlib, and Seaborn.",
    tech: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Matplotlib", "Seaborn"],
    url: "https://github.com/JXPJXT/Kaggle-Backpack-Prediction-Challenge",
    collaboration: true,
    highlights: [
      "Kaggle Tabular Playground Series (Feb 2025) — RMSE on price",
      "EDA + feature engineering + XGBoost with CV tuning",
      "Group project (Japjot, Gurkirat, Hardik)",
    ],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
] as const;
