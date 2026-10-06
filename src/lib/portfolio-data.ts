// Portfolio data for Hardik — AI/ML Engineer
// Consolidated from the original static site, with unwanted sections removed.

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
  socials: [
    { name: "GitHub", icon: "Github", url: "https://github.com/Har-dik25", label: "GitHub Profile" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/in/hardik8/", label: "LinkedIn Profile" },
    { name: "Email", icon: "Mail", url: "mailto:hardikkumar2583@gmail.com", label: "Email", copy: "hardikkumar2583@gmail.com" },
    { name: "Phone", icon: "Phone", url: "tel:+917878600960", label: "Phone", copy: "+917878600960" },
  ],
} as const;

export const stats = [
  { label: "Projects", value: "13+", icon: "FolderGit2" },
  { label: "Domains", value: "8", icon: "Layers" },
  { label: "Years Coding", value: "4+", icon: "Code2" },
  { label: "CGPA", value: "7.00", icon: "GraduationCap" },
] as const;

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  skills: { name: string; level: number; years: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    icon: "Brain",
    skills: [
      { name: "Large Language Models", level: 88, years: 1.5 },
      { name: "NLP (BERT, RAG, Prompt Eng.)", level: 90, years: 2 },
      { name: "Scikit-learn", level: 85, years: 2.5 },
      { name: "TensorFlow", level: 78, years: 2 },
      { name: "PyTorch", level: 80, years: 1.5 },
      { name: "Retrieval-Augmented Generation", level: 85, years: 1 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "Code2",
    skills: [
      { name: "Python", level: 92, years: 4 },
      { name: "JavaScript", level: 80, years: 2.5 },
      { name: "SQL", level: 82, years: 3 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "Server",
    skills: [
      { name: "FastAPI", level: 88, years: 2 },
      { name: "Flask", level: 80, years: 1.5 },
      { name: "REST APIs", level: 90, years: 3 },
      { name: "Node.js", level: 72, years: 1.5 },
      { name: "JWT Auth", level: 80, years: 1 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: 85, years: 2 },
      { name: "MySQL", level: 80, years: 2 },
      { name: "PostgreSQL", level: 75, years: 1 },
      { name: "Vector DBs (ChromaDB)", level: 82, years: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "MonitorSmartphone",
    skills: [
      { name: "React.js", level: 82, years: 2 },
      { name: "HTML / CSS", level: 88, years: 4 },
      { name: "JavaScript (ES6+)", level: 80, years: 2.5 },
      { name: "Tailwind CSS", level: 75, years: 1 },
    ],
  },
  {
    id: "devops",
    title: "Tools & DevOps",
    icon: "Wrench",
    skills: [
      { name: "Git / GitHub", level: 90, years: 3 },
      { name: "Docker", level: 75, years: 1 },
      { name: "Postman", level: 85, years: 2 },
      { name: "Linux", level: 75, years: 2 },
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
};

export const experiences: Experience[] = [
  {
    id: "futurense-aiml",
    role: "AI/ML Intern",
    company: "Futurense Technologies",
    period: "Jul '26",
    current: true,
    highlights: [
      "Developed an AI-powered medical documentation platform leveraging LLMs and NLP to automate clinical note generation and streamline healthcare workflows.",
      "Designed and integrated secure RESTful APIs, enabling seamless communication between the frontend, backend, and AI services for efficient document management.",
      "Built scalable full-stack features using Python, React.js, REST APIs, MongoDB, Git, and GitHub, improving application performance and user experience.",
    ],
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

export const education = [
  {
    id: "lpu-cse",
    degree: "B.Tech in Computer Science & Engineering",
    school: "Lovely Professional University, Punjab",
    period: "Aug '23 – Jul '27 (Expected)",
    grade: "CGPA: 7.00",
    icon: "GraduationCap",
  },
];

export const certifications = [
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
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "samvidhan-ai",
    title: "Legal Mind RAG — Samvidhan AI",
    tagline: "AI legal assistant for the Indian Constitution",
    icon: "Scale",
    featured: true,
    description:
      "AI-powered legal assistant that answers questions about the Indian Constitution and legal documents using Retrieval-Augmented Generation. Built a hybrid retrieval pipeline combining dense vector search, BM25 sparse retrieval, and Reciprocal Rank Fusion (RRF), with FastAPI and Ollama powering the application layer.",
    tech: ["LLM", "RAG", "BM25", "ChromaDB", "FastAPI", "Ollama"],
    url: "https://github.com/Har-dik25/Samvidhan_AI",
    highlights: [
      "Hybrid dense + sparse retrieval (RRF fusion)",
      "Local LLM inference via Ollama (no cloud cost)",
      "FastAPI service with clean REST contract",
    ],
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection System",
    tagline: "Deep learning for misinformation detection",
    icon: "Newspaper",
    featured: true,
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
    slug: "traffic-congestion",
    title: "AI Traffic Congestion Analysis",
    tagline: "Computer vision for traffic flow",
    icon: "TrafficCone",
    featured: false,
    description:
      "Computer vision and deep learning system for analyzing traffic footage to identify congestion levels and forecast traffic flow. Uses video-based visual analysis to extract traffic patterns.",
    tech: ["Computer Vision", "OpenCV", "Deep Learning", "Python", "Video Analytics"],
    url: "https://github.com/Har-dik25/AI-Traffic-Congestion-Analysis",
    highlights: [
      "OpenCV-based video pipeline",
      "Deep-learning congestion classification",
      "Short-horizon flow forecasting",
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
    slug: "hrms",
    title: "HRMS — Backend & Frontend",
    tagline: "Full-stack HR management system",
    icon: "Users",
    featured: false,
    description:
      "Full-stack Human Resource Management System covering employee, payroll, and attendance workflows through a React frontend, RESTful backend services, and MongoDB-based data management.",
    tech: ["Full Stack", "React.js", "MongoDB", "JavaScript", "REST API"],
    url: "https://github.com/Har-dik25/hrms-backend",
    highlights: [
      "Modular React + REST split",
      "MongoDB persistence",
      "Two production-ready repos",
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
];

export const testimonials = [
  {
    id: "t1",
    name: "Mentor, Futurense",
    role: "Senior Data Scientist",
    company: "Futurense Technologies",
    quote:
      "Hardik approaches every problem with curiosity and rigor. His work on the medical documentation platform showed strong ownership from data pipeline to API surface.",
    initials: "FN",
  },
  {
    id: "t2",
    name: "Project Collaborator",
    role: "ML Engineer",
    company: "OCR × Azure",
    quote:
      "A reliable collaborator who ships clean, well-documented code. Hardik picks up new tools fast and turns them into working features.",
    initials: "VA",
  },
  {
    id: "t3",
    name: "Hackathon Teammate",
    role: "Backend Developer",
    company: "University Hackathons",
    quote:
      "Strong fundamentals, calm under pressure, and a knack for unblocking the team. The kind of engineer you want on a tight deadline.",
    initials: "HT",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
