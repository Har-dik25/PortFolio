// Portfolio data for Hardik — AI/ML Engineer
// Consolidated from CV + certificate research. Updated per user request.

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

// Stats — CGPA moved to Education section; replaced with HackerRank 5★ (from CV achievements)
export const stats = [
  { label: "Projects", value: "15+", icon: "FolderGit2" },
  { label: "Hackathons", value: "3+", icon: "Trophy" },
  { label: "Years Coding", value: "4+", icon: "Code2" },
  { label: "HackerRank", value: "5★", sub: "Python & SQL", icon: "Star" },
] as const;

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
  },
  {
    id: "udemy-genai-master",
    title: "Master Generative AI & GenAI Tools (ChatGPT & more)",
    issuer: "Udemy",
    date: "Aug '25",
    icon: "Sparkles",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-f8a1cf4e-10bc-47c6-9cbe-b52ae86cf5e3.pdf",
  },
  {
    id: "udemy-chatgpt",
    title: "ChatGPT Made Easy: AI Essentials for Beginners",
    issuer: "Udemy",
    date: "Aug '25",
    icon: "MessageSquare",
    url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-2e2b095a-2ae5-4178-a40e-531afe50dc0a.pdf",
  },
  {
    id: "ibm-hw-os",
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM (via Coursera)",
    date: "Oct '24",
    icon: "Cpu",
    url: "https://lnkd.in/p/gy9ctjCx",
  },
  {
    id: "uab-digital-systems",
    title: "Digital Systems: From Logic Gates to Processors",
    issuer: "UAB (via Coursera)",
    date: "Sep '24",
    icon: "Cpu",
    url: "https://lnkd.in/p/ggsdziVY",
  },
  {
    id: "accenture-digital-skills-ai",
    title: "Digital Skills: Artificial Intelligence",
    issuer: "Accenture (via FutureLearn)",
    date: "Sep '24",
    icon: "Brain",
    url: "https://lnkd.in/p/gRhSNViH",
  },
  {
    id: "infosys-html",
    title: "Introduction to HTML",
    issuer: "Infosys",
    date: "Jan '24",
    icon: "Code2",
    url: "https://lnkd.in/p/gW8xw_NQ",
  },
  {
    id: "iit-delhi-da-workshop",
    title: "Data Analytics Workshop — Participation",
    issuer: "IIT Delhi × Techgyan",
    date: "Jul '25",
    icon: "Award",
    url: "https://lnkd.in/p/gZ6UG53i",
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
  },
  {
    id: "oci-ds",
    title: "OCI Certified Data Science Professional",
    issuer: "Oracle",
    date: "Sep '25",
    icon: "ChartLine",
    url: "https://www.linkedin.com/posts/hardik8_data-science-professional-ugcPost-7389534103588659200-GkAy/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQRyuwB0zCPK7scmrw3oCQd02xFX6nHoBk",
  },
  {
    id: "freecodecamp-rwd",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    date: "2024",
    icon: "MonitorSmartphone",
    url: "https://www.freecodecamp.org/certification/fcc3196ca3e-54e2-4ebc-afa1-8d477e3c60d8/responsive-web-design",
  },
  {
    id: "bcg-forage",
    title: "Data Science Job Simulation",
    issuer: "BCG (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/BCG%20/Tcz8gTtprzAS4xSoK_BCG_YZPnJpJicnio6fwnG_1723047648966_completion_certificate.pdf",
  },
  {
    id: "accenture-na-forage",
    title: "Data Analytics & Visualization Job Simulation",
    issuer: "Accenture NA (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://lnkd.in/p/ggsMNuxp",
  },
  {
    id: "ba-forage",
    title: "Data Science Job Simulation",
    issuer: "British Airways (via Forage)",
    date: "Aug '24",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/British%20Airways/NjynCWzGSaWXQCxSX_British%20Airways_YZPnJpJicnio6fwnG_1723045973325_completion_certificate.pdf",
  },
  {
    id: "deloitte-forage",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "Aug '25",
    icon: "Briefcase",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_YZPnJpJicnio6fwnG_1756043909209_completion_certificate.pdf",
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
};

export const projects: Project[] = [
  {
    slug: "medinote",
    title: "MediNote — AI Medical Documentation",
    tagline: "LLM-powered clinical note generation",
    icon: "Stethoscope",
    featured: true,
    description:
      "AI-powered medical documentation platform built during my Applied AI internship at Futurense. Leverages LLMs and NLP to automate clinical note generation and streamline healthcare workflows — turning raw clinical input into structured, reviewable documentation with secure REST APIs connecting the frontend, backend, and AI services.",
    tech: ["LLMs", "NLP", "Python", "React", "REST API", "MongoDB"],
    url: "https://github.com/Har-dik25/MediNote",
    highlights: [
      "Automated clinical note generation with LLMs + NLP",
      "Secure RESTful API bridging frontend, backend & AI services",
      "Shipped end-to-end during Applied AI internship",
    ],
  },
  {
    slug: "rural-healthcare",
    title: "Rural Healthcare Access Gap Mapper",
    tagline: "GIS decision-support for 640 districts",
    icon: "HeartPulse",
    featured: true,
    description:
      "National-scale data ingestion workflow consolidating MoHFW, Census, and NFHS-5 surveys across 640 districts and 673K+ villages into an indexed SQLite analytical warehouse. Models spatial healthcare disparities via an Enhanced 2SFCA travel-friction algorithm and a composite Access Gap Index (0–100), decoupling infrastructure deficits from doctor vacancies. Deployed as a 12-module Streamlit decision-support platform.",
    tech: ["Python", "Streamlit", "SQLite", "GeoPandas", "Plotly", "SciPy", "OSRM"],
    url: "https://github.com/Har-dik25/Rural-Healthcare-Access-Gap",
    highlights: [
      "640 districts · 673K+ villages consolidated into SQLite warehouse",
      "Enhanced 2SFCA travel-friction + composite Access Gap Index (0–100)",
      "12-module Streamlit platform with GIS choropleth + What-If simulators",
    ],
  },
  {
    slug: "samvidhan-ai",
    title: "Legal Mind RAG — Samvidhan AI",
    tagline: "Hybrid RAG for the Indian Constitution",
    icon: "Scale",
    featured: false,
    description:
      "Full-stack legal research workspace combining ChromaDB dense vector search, BM25 sparse search, and Cross-Encoder reranking over 3,800+ legal statutory chunks for sub-second, high-accuracy retrieval. A Zero-Hallucination Extractive Synthesis Engine delivers verbatim statutory breakdowns, penal liabilities, and automated IPC ↔ BNS cross-mappings with sub-20ms synthesis latency. Built in React + FastAPI with real-time SSE streaming and SQLite-backed session persistence.",
    tech: ["Python", "FastAPI", "React", "ChromaDB", "BM25", "Sentence-Transformers", "SQLite"],
    url: "https://github.com/Har-dik25/Samvidhan_AI",
    highlights: [
      "Hybrid dense + sparse retrieval with cross-encoder reranking (3,800+ chunks)",
      "Zero-hallucination extractive synthesis, sub-20ms latency",
      "React + FastAPI with SSE streaming & legal knowledge graphs",
    ],
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection System",
    tagline: "Explainable deep learning for misinformation",
    icon: "Newspaper",
    featured: false,
    description:
      "Deep learning-based fake news detection system trained on 72,000+ news articles using a hybrid BERT and BiLSTM architecture with TF-IDF, POS-tagging, and sentiment features. Includes attention-based explainability, FastAPI inference, Docker deployment, and visual heatmaps for model predictions.",
    tech: ["Python", "PyTorch", "BERT", "BiLSTM", "NLP", "FastAPI", "XAI"],
    url: "https://github.com/Har-dik25/Fake-News-Detection-System",
    highlights: [
      "72k+ training articles",
      "Attention-based explainability (XAI)",
      "Dockerized FastAPI inference service",
    ],
  },
  {
    slug: "shopwave-agent",
    title: "ShopWave — Autonomous Support Agent",
    tagline: "Multi-step e-commerce support automation",
    icon: "ShoppingCart",
    featured: false,
    description:
      "Autonomous e-commerce customer-support resolution system that classifies support tickets, executes multi-step tool chains, validates actions, escalates uncertain cases, and maintains a complete audit trail.",
    tech: ["Python", "AI Agent", "Automation", "REST API", "Concurrency", "Fault Tolerance"],
    url: "https://github.com/Har-dik25/ShopWave_Autonomous_Support_Resolution_Agent",
    highlights: [
      "Intent classification with confidence thresholding",
      "Multi-step tool execution with validation",
      "Full audit trail of every action",
    ],
  },
  {
    slug: "market-sentiment",
    title: "Algorithmic Market Sentiment Platform",
    tagline: "News-vector correlation engine",
    icon: "TrendingUp",
    featured: false,
    description:
      "Platform that correlates financial market sentiment with vectorized news embeddings. Ingests live news, encodes articles into a vector space, and surfaces correlation signals between narrative shifts and market movement — enabling sentiment-driven market analysis at scale.",
    tech: ["Python", "NLP", "Vector Embeddings", "Sentiment Analysis", "Data Engineering"],
    url: "https://github.com/Har-dik25/Algorithmic-Market-Sentiment-News-Vector-Correlation-Platform",
    highlights: [
      "News-to-vector embedding pipeline",
      "Sentiment ↔ market-movement correlation",
      "Real-time narrative shift detection",
    ],
  },
  {
    slug: "ocr-studio",
    title: "OCR Studio",
    tagline: "Offline client-side OCR to JSON",
    icon: "Image",
    featured: false,
    description:
      "Offline OCR web application that converts images into structured JSON entirely on the client side. Built with React and Tesseract to perform text extraction without cloud-based OCR services.",
    tech: ["OCR", "React.js", "Tesseract", "JavaScript", "JSON"],
    url: "https://github.com/Har-dik25/OCR-Studio-Offline-Image-to-JSON-Web-App",
    highlights: [
      "100% client-side (no server)",
      "Structured JSON output",
      "Offline-capable",
    ],
  },
  {
    slug: "hitcast-spotify",
    title: "HitCast — Spotify Popularity Predictor",
    tagline: "ML on audio features",
    icon: "Music",
    featured: false,
    description:
      "Machine learning system that predicts Spotify track popularity using audio characteristics and regression techniques. Performed data preparation, feature analysis, and predictive modeling.",
    tech: ["Machine Learning", "Regression", "Python", "Spotify API", "Data Analysis"],
    url: "https://github.com/Har-dik25/HitCast-Spotify-Track-Popularity-Predictor",
    highlights: [
      "Spotify Web API ingestion",
      "Audio feature regression",
      "Feature importance analysis",
    ],
  },
  {
    slug: "transport-delay",
    title: "Public Transport Delay × Weather",
    tagline: "Data analysis of disruption patterns",
    icon: "Bus",
    featured: false,
    description:
      "Data analysis pipeline combining public transport delay data with weather events to identify disruption patterns and relationships between environmental conditions and transportation performance.",
    tech: ["Data Engineering", "Pandas", "Python", "Data Analysis", "Visualization"],
    url: "https://github.com/Har-dik25/Public-Transport-Delays-with-Weather-Events",
    highlights: [
      "Multi-source data joining",
      "Pattern discovery in delay + weather",
      "Reusable Pandas pipeline",
    ],
  },
  {
    slug: "hrms",
    title: "HRMS — Backend & Frontend",
    tagline: "Full-stack HR management system",
    icon: "Users",
    featured: false,
    description:
      "Full-stack Human Resource Management System covering employee, payroll, and attendance workflows through a React frontend, RESTful backend services, and MongoDB-based data management.",
    tech: ["Full Stack", "React.js", "MongoDB", "JavaScript", "REST API"],
    url: "https://github.com/Har-dik25/hrms-backend",
    extraLinks: [
      { label: "Backend", url: "https://github.com/Har-dik25/hrms-backend" },
      { label: "Frontend", url: "https://github.com/Har-dik25/hrms-frontend" },
    ],
    highlights: [
      "Modular React + REST split",
      "MongoDB persistence",
      "Two production-ready repos",
    ],
  },
  {
    slug: "ums-replica",
    title: "UMS Replica",
    tagline: "University management system",
    icon: "GraduationCap",
    featured: false,
    description:
      "Full-stack University Management System replica with modules for students, faculty, courses, and administrative workflows. Developed a responsive React frontend integrated with MongoDB.",
    tech: ["Full Stack", "React.js", "MongoDB", "JavaScript"],
    url: "https://github.com/Har-dik25/UMS-replica",
    highlights: [
      "Multi-role workflows",
      "Responsive React UI",
      "MongoDB integration",
    ],
  },
  // ---- Group / collaboration projects (same grid, marked with a badge) ----
  {
    slug: "ai-traffic-congestion",
    title: "AI Traffic Congestion Analysis",
    tagline: "Computer vision for traffic flow",
    icon: "TrafficCone",
    featured: false,
    description:
      "Computer vision and deep learning system for analyzing traffic footage to identify congestion levels and forecast traffic flow. Uses video-based visual analysis to extract traffic patterns.",
    tech: ["Computer Vision", "OpenCV", "Deep Learning", "Python", "Video Analytics"],
    url: "https://github.com/Har-dik25/AI-Traffic-Congestion-Analysis",
    collaboration: true,
    highlights: [
      "OpenCV-based video pipeline",
      "Deep-learning congestion classification",
      "Short-horizon flow forecasting",
    ],
  },
  {
    slug: "gemini-ocr-azure",
    title: "Gemini OCR — Azure",
    tagline: "Serverless multimodal OCR on Azure",
    icon: "Eye",
    featured: false,
    description:
      "AI-powered OCR application that extracts text from images and PDF documents using Google Gemini's multimodal capabilities. Built a serverless Python backend with Azure Functions.",
    tech: ["Google Gemini", "Azure Functions", "OCR", "Python", "REST API", "Cloud"],
    url: "https://github.com/vansharora156/Gemini-Ocr-Azure",
    collaboration: true,
    highlights: [
      "Serverless architecture (Azure Functions)",
      "Gemini multimodal text + structure extraction",
      "Collaboration project",
    ],
  },
  {
    slug: "solar-forecasting",
    title: "Solar Power Generation Forecasting",
    tagline: "ML forecasting for renewable energy",
    icon: "Sun",
    featured: false,
    description:
      "Machine learning system for forecasting solar power generation using historical power data, weather information, and temporal features. Deployed the prediction workflow through Streamlit.",
    tech: ["Python", "Machine Learning", "Regression", "Ensemble Learning", "Streamlit", "Forecasting"],
    url: "https://github.com/LeviAckermanZ9/solar-power-generation-forecasting",
    collaboration: true,
    highlights: [
      "Ensemble regression for robust predictions",
      "Weather + temporal feature engineering",
      "Streamlit deployment",
    ],
  },
  {
    slug: "genai-doc-demistifier",
    title: "GenAI Document Demystifier",
    tagline: "Google Gen AI Exchange hackathon build",
    icon: "FileText",
    featured: false,
    description:
      "Generative-AI application built for the Google Gen AI Exchange Hackathon that demystifies complex documents — summarizing, explaining, and answering questions over dense PDFs using Google's GenAI stack. Turns opaque legal/technical paperwork into navigable, queryable knowledge.",
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
    tagline: "Tabular ML competition workflow",
    icon: "Briefcase",
    featured: false,
    description:
      "Machine learning regression project developed for the Kaggle Tabular Playground Series to predict backpack prices from product attributes. Performed EDA, feature engineering, and RMSE evaluation.",
    tech: ["Python", "Machine Learning", "Regression", "Feature Engineering", "Kaggle", "RMSE"],
    url: "https://github.com/JXPJXT/Kaggle-Backpack-Prediction-Challenge",
    collaboration: true,
    highlights: [
      "EDA-driven feature engineering",
      "RMSE-optimized model selection",
      "Collaboration project",
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
