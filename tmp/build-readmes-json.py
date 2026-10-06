#!/usr/bin/env python3
"""Build the project-readmes.json deliverable from fetched READMEs."""
import json

projects = [
    {
        "slug": "medinote",
        "url": "https://github.com/Har-dik25/MediNote",
        "description": "MediMate is an open-source, zero-cost AI medical copilot that listens to doctor-patient conversations and synthesizes structured SOAP notes, suggests ICD-10 codes, recommends diagnostics, and flags drug interactions using RAG grounded in multi-regional clinical guidelines (NICE, CDC, EMA, WHO). It runs HuggingFace Whisper locally for privacy-preserving transcription and uses Llama 3 via Groq, LangChain orchestration, and a local ChromaDB vector store of authoritative clinical guidelines. The system supports 25+ medical specialties, patient tracking with historical encounters, and OpenFDA drug-interaction cross-checks.",
        "tech": ["React 18", "Vite", "FastAPI", "Python", "LangChain", "ChromaDB", "HuggingFace Whisper (local)", "Llama 3 via Groq", "all-MiniLM-L6-v2 embeddings", "OpenFDA API"],
        "highlights": [
            "Real-time Whisper transcription (local, privacy-preserving)",
            "Multi-region RAG: NICE / CDC / EMA / WHO guidelines",
            "Auto SOAP notes + ICD-10 + drug-interaction checks"
        ],
        "readme_found": True
    },
    {
        "slug": "rural-healthcare",
        "url": "https://github.com/Har-dik25/Rural-Healthcare-Access-Gap",
        "description": "A national-scale decision-support platform diagnosing rural healthcare access gaps across all 36 Indian States/UTs, 640 districts, and 673,638 villages using a composite Access Gap Index (AGI) and a peer-reviewed 2SFCA spatial accessibility model. It exposes 12 interactive Streamlit/Plotly modules - geospatial gap maps, infra-vs-staffing 4-quadrant diagnostics, a PM-ABHIM budget optimizer, NFHS-5 outcome correlations, and a 673k-village drilldown - backed by a SQLite warehouse built from MoHFW RHS, Census, NFHS-5, and OSRM travel data. The system is grounded in Lancet/BMJ Global Health methodology and IPHS/NHM statutory frameworks with 16/16 passing tests.",
        "tech": ["Python 3.10+", "Streamlit", "Plotly", "SQLite", "pandas", "OSRM", "2SFCA spatial model"],
        "highlights": [
            "Covers 36 states, 640 districts, 673,638 villages",
            "12-tab Streamlit dashboard + PM-ABHIM budget optimizer",
            "Composite AGI + 2SFCA spatial accessibility model"
        ],
        "readme_found": True
    },
    {
        "slug": "market-sentiment",
        "url": "https://github.com/Har-dik25/Algorithmic-Market-Sentiment-News-Vector-Correlation-Platform",
        "description": "An end-to-end data engineering and applied-ML platform that ingests live financial news from RSS / SEC EDGAR / HuggingFace FNSPID / NSE feeds, embeds articles into 384-dim SentenceTransformer vectors, indexes them in Qdrant, and statistically tests whether news-sentiment shifts lead or lag equity price moves via +/-5-day cross-correlation with p-values and regime classification. It pairs a FastAPI backend (semantic search, evidence traceability, real-time ingestion queue) with a Next.js 'Signal Desk' trading console and a HistGradientBoosting predictor fusing technical indicators (RSI/MACD/Bollinger) with sentiment signals. Covers 25+ tickers across US mega-caps, Nifty 50, crypto, and commodities, with 13/13 tests passing and Docker Compose / Render / Vercel / Railway deployment options.",
        "tech": ["Python 3.11+", "FastAPI", "Uvicorn", "Qdrant", "SentenceTransformers (all-MiniLM-L6-v2)", "scikit-learn (HistGradientBoosting)", "NumPy", "SciPy", "pandas", "Apache Parquet", "SQLite", "Next.js 16", "React 19", "Tailwind", "shadcn/ui", "Recharts", "Docker", "GitHub Actions"],
        "highlights": [
            "Live news -> 384-dim vectors -> Qdrant (<300ms p95 search)",
            "Lead-lag cross-correlation +/-5 days with p-values & regime tags",
            "HistGradientBoosting ML predictor + Next.js Signal Desk console"
        ],
        "readme_found": True
    },
    {
        "slug": "samvidhan-ai",
        "url": "https://github.com/Har-dik25/Samvidhan_AI",
        "description": "Samvidhan AI (LegalMind) is a deterministic, zero-LLM extractive legal intelligence engine for the Indian legal corpus - covering BNS/BNSS/BSA 2023, the Constitution of India, IPC/CrPC, and landmark Supreme Court precedents across 3,840+ statutory chunks. It uses hybrid dense (ChromaDB, all-MiniLM-L12-v2) + sparse (BM25) retrieval fused with Section-Boosted Reciprocal Rank Fusion and a cross-encoder reranker (ms-marco-MiniLM-L-6-v2), then synthesizes verbatim statutory answers (0% hallucination) in <0.02s via Server-Sent Events streaming to a React/Vite workspace. The UI includes interactive IPC<->BNS / CrPC<->BNSS / IEA<->BSA transmuters, knowledge graphs, citation viewports, and speech-to-text.",
        "tech": ["Python 3.9+", "FastAPI", "Uvicorn", "React 18", "Vite 5", "ChromaDB", "BM25", "Sentence-Transformers (all-MiniLM-L12-v2)", "Cross-Encoder (ms-marco-MiniLM-L-6-v2)", "SQLite", "Server-Sent Events"],
        "highlights": [
            "Zero-LLM extractive synthesis - 0% hallucination, <0.02s",
            "Hybrid Dense + BM25 retrieval with RRF + cross-encoder reranker",
            "IPC<->BNS / CrPC<->BNSS / IEA<->BSA cross-statute mapping"
        ],
        "readme_found": True
    },
    {
        "slug": "fake-news-detection",
        "url": "https://github.com/Har-dik25/Fake-News-Detection-System",
        "description": "TruthLens AI is a production-grade fake-news detection platform combining a hybrid ensemble of BERT (contextual) and BiLSTM with scaled dot-product self-attention (sequential), augmented with classical TF-IDF, POS-ratio, and VADER sentiment features, calibrated via trust/sensationalism heuristics at 60% BERT / 40% BiLSTM weighting. It is trained on the WELFake dataset (72,134 articles) and ships with a FastAPI backend, a glassmorphic frontend with attention-heatmap visualizations for explainability, and full Docker Compose deployment. Output artifacts include trained .pth models, an error-analysis CSV of 20 misclassified examples, and attention heatmaps for correctly/misclassified samples.",
        "tech": ["PyTorch", "HuggingFace Transformers (BERT)", "NLTK", "scikit-learn (TF-IDF)", "VADER", "FastAPI", "Pydantic", "Matplotlib", "Seaborn", "HTML5", "CSS3", "Vanilla JS", "Docker", "Docker Compose"],
        "highlights": [
            "Hybrid BERT + BiLSTM-attention ensemble (60/40 weighting)",
            "Attention heatmaps for token-level explainable AI",
            "Trained on WELFake 72k+ articles; Dockerized FastAPI"
        ],
        "readme_found": True
    },
    {
        "slug": "shopwave-agent",
        "url": "https://github.com/Har-dik25/ShopWave_Autonomous_Support_Resolution_Agent",
        "description": "A rule-based (zero-LLM) autonomous support resolution agent for the NexusDesk e-commerce platform that processes 20 customer tickets concurrently (8 workers, 0.13s total) using a 9-tool toolkit, with each ticket requiring >=3 chained tool calls (fetch -> verify -> act -> reply). It classifies tickets into 8 categories with urgency/flag detection (social engineering, threatening language, VIP exceptions), resolves refunds/cancellations/replacements, escalates ambiguous cases, and emits a complete audit log of every tool call. Every tool is wrapped with a @resilient_tool retry decorator (3 retries, exponential backoff + jitter) and the system uses only Python 3.10+ standard library - no external dependencies, no API keys, no .env files.",
        "tech": ["Python 3.10+ (standard library only)", "ThreadPoolExecutor", "threading"],
        "highlights": [
            "Zero-LLM, zero-dependency (pure Python stdlib)",
            "20 tickets concurrent, 8 workers, >=3 tool calls per chain",
            "@resilient_tool retries + full audit log + self-evaluation"
        ],
        "readme_found": True
    },
    {
        "slug": "hitcast-spotify",
        "url": "https://github.com/Har-dik25/HitCast-Spotify-Track-Popularity-Predictor",
        "description": "The README is minimal - only the heading '# HitCast' and the text 'In Progress' - so no features, technical approach, datasets, or models are documented. Based on the repo name (HitCast-Spotify-Track-Popularity-Predictor), the project's apparent intent is to predict Spotify track popularity, but nothing in the README confirms this. (based on repo metadata)",
        "tech": [],
        "highlights": [
            "README under construction (marked 'In Progress')",
            "Intent inferred from repo name: Spotify popularity prediction",
            "No technical details documented yet"
        ],
        "readme_found": True
    },
    {
        "slug": "ocr-studio",
        "url": "https://github.com/Har-dik25/OCR-Studio-Offline-Image-to-JSON-Web-App",
        "description": "OCR Studio is a fully offline Optical Character Recognition web app built with Flask, OpenCV, and Tesseract OCR - users upload PNG/JPG/JPEG images, extract text locally, view it live on the UI, and download structured JSON, all without an internet connection. It features a modern glassmorphism SaaS-style UI, device image upload support, and a clean Flask/static/templates project layout designed for portfolio/internship showcases. The README lists future enhancements including batch OCR, Aadhaar/PAN structured field extraction, OCR history with auth, and AI-based document understanding.",
        "tech": ["Python", "Flask", "OpenCV", "Tesseract OCR (pytesseract)", "Pillow", "NumPy", "HTML", "CSS", "JavaScript"],
        "highlights": [
            "100% offline OCR - privacy-focused, no internet required",
            "Flask + OpenCV + Tesseract stack; PNG/JPG/JPEG upload",
            "Live text render + structured JSON preview & download"
        ],
        "readme_found": True
    },
    {
        "slug": "transport-delay",
        "url": "https://github.com/Har-dik25/Public-Transport-Delays-with-Weather-Events",
        "description": "TransitAI is an end-to-end ML project that analyzes and predicts NYC MTA bus delays by enriching simulated trip records with historical weather (Open-Meteo) and city events (concerts, marathons), then training Random Forest and Gradient Boosting models to predict both delay occurrence and delay minutes. It exposes insights through a Streamlit dashboard with overview KPIs, an interactive data explorer (filterable .parquet dataset), a custom plotter, a 'What-If' trip predictor, SHAP-based explainable-AI insights, and a 7-day forecast with hypothetical-snowstorm injection. The full pipeline is reproducible via a Makefile (make data / features / train).",
        "tech": ["Python 3.10+", "Streamlit", "scikit-learn (Random Forest, Gradient Boosting)", "Plotly", "pandas", "SHAP", "Parquet", "pytest", "Make", "Open-Meteo API"],
        "highlights": [
            "Random Forest + Gradient Boosting on NYC MTA bus data",
            "Streamlit dashboard: What-If predictor + SHAP explanations",
            "Weather + city-event enrichment; Makefile-driven pipeline"
        ],
        "readme_found": True
    },
    {
        "slug": "ums-replica",
        "url": "https://github.com/Har-dik25/UMS-replica",
        "description": "CampusFlow is a full-stack University Management System built with FastAPI (Python 3.13) and React 19 (Vite), backed by Supabase (PostgreSQL) with JWT-based role auth (local SQLite for users). It covers students, faculty/staff, academics (departments/programs/courses), attendance/timetables, exams/results, finance/fees, library, and hostels, exposing 109 API endpoints across 50+ database tables and 13 routers. The React frontend ships with 18 route pages and a reusable component architecture (Header, Layout, generic DataPage CRUD).",
        "tech": ["React 19", "Vite", "React Router", "React Icons", "FastAPI", "Uvicorn", "Python 3.13", "Supabase (PostgreSQL)", "JWT", "SQLite", "Pydantic"],
        "highlights": [
            "109 API endpoints across 50+ tables (13 routers)",
            "Modules: students, faculty, exams, finance, library, hostels",
            "JWT role-based auth + Supabase Postgres; 18 React pages"
        ],
        "readme_found": True
    },
    {
        "slug": "hrms",
        "url": "https://github.com/Har-dik25/hrms-backend",
        "description": "Nexus HR Core is a full-stack Human Resource Management System split into a FastAPI backend (PostgreSQL via Supabase, JWT auth, Pydantic v2 schemas, RBAC for Admin/Employee, Dockerized) and a React 18 + Vite + Tailwind frontend (separate repo hrms-frontend) with role-based dashboards, Recharts visualizations, glassmorphism design, and dark/light mode. The backend manages employees, departments, attendance check-in, and leave requests/approvals; the frontend provides Admin analytics/approvals and Employee check-in/history views with real-time optimistic UI updates via React Context + Axios. Both halves ship Dockerized (Nginx on the frontend) with auto-generated Swagger/ReDoc API docs.",
        "tech": ["FastAPI", "Python 3.11+", "Supabase (PostgreSQL)", "Pydantic v2", "Uvicorn", "JWT", "Docker", "React 18", "Vite", "Tailwind CSS", "React Context API", "Axios", "Recharts", "Lucide React", "Nginx"],
        "highlights": [
            "FastAPI + Supabase Postgres backend with RBAC + JWT",
            "React/Vite/Tailwind frontend; Recharts dashboards, glass UI",
            "Endpoints: auth, employees, attendance, leave request/approve"
        ],
        "readme_found": True
    },
    {
        "slug": "ai-traffic-congestion",
        "url": "https://github.com/Har-dik25/AI-Traffic-Congestion-Analysis",
        "description": "A group project (with Mehtab Singh, Nakala Harshavardhan Reddy, and Akshith Gupta) that analyzes traffic congestion patterns using historical data from the TOMTOM API and INRIX reports, then trains an ML model deployed on AWS Lambda to predict congestion levels. Insights are visualized as heatmaps and historical trends in a Flask-based dashboard, with travel recommendations derived from congestion patterns. The data pipeline runs on Amazon EC2 and the README lists future enhancements including more data sources, deep-learning models, and cloud dashboard deployment.",
        "tech": ["Python", "Amazon EC2", "AWS Lambda", "Matplotlib", "Seaborn", "Flask", "TOMTOM API", "INRIX Reports"],
        "highlights": [
            "ML congestion prediction deployed on AWS Lambda",
            "Data sources: TOMTOM API + INRIX reports; EC2 compute",
            "Flask dashboard with heatmaps + travel recommendations"
        ],
        "readme_found": True
    },
    {
        "slug": "gemini-ocr-azure",
        "url": "https://github.com/vansharora156/Gemini-Ocr-Azure",
        "description": "A serverless OCR system that extracts text from JPG, PNG, and PDF files using Google Gemini's multimodal AI, exposed via an Azure Functions (Python) REST backend with a modern HTML/Tailwind CSS/JavaScript frontend. It features drag-and-drop file upload, copy/download of extracted text, and secure API-key handling (Gemini key stored only in Azure Function App settings, never exposed to the frontend or repo). The README lists future enhancements including multi-page PDF support, structured JSON output, language detection, text summarization, user authentication, and Azure Blob Storage integration.",
        "tech": ["Azure Functions (Python)", "Google Gemini Multimodal API", "HTML5", "Tailwind CSS", "JavaScript (Fetch API)", "REST", "Microsoft Azure"],
        "highlights": [
            "Serverless: Azure Functions backend + Google Gemini AI",
            "Drag-and-drop JPG/PNG/PDF upload; copy/download text",
            "Secure API-key handling (backend-only Gemini calls)"
        ],
        "readme_found": True
    },
    {
        "slug": "solar-forecasting",
        "url": "https://github.com/LeviAckermanZ9/solar-power-generation-forecasting",
        "description": "A solar power generation forecasting project that uses an ensemble of regression models (scikit-learn, XGBoost, LightGBM) trained on historical power and weather data, exposed through a Streamlit web UI. Features include weather/time-based feature engineering, ensemble modeling for improved accuracy and stability, and a clean project structure with datasets bundled in the model folder. The trained model file is not uploaded due to GitHub file-size limits but can be regenerated by running the training script (requirements pinned: scikit-learn 1.4.2, XGBoost 2.0.3, LightGBM 4.6.0).",
        "tech": ["Python", "scikit-learn 1.4.2", "XGBoost 2.0.3", "LightGBM 4.6.0", "pandas", "NumPy", "joblib", "Streamlit"],
        "highlights": [
            "Ensemble of scikit-learn + XGBoost + LightGBM regressors",
            "Streamlit UI; weather + time-based features",
            "Datasets bundled in /model; model regenerable via training"
        ],
        "readme_found": True
    },
    {
        "slug": "genai-doc-demistifier",
        "url": "https://github.com/JXPJXT/GoogleGenAiExchange-GenAI-Document-Demystifier",
        "description": "The provided repository URL returns HTTP 404 - the repo does not exist under JXPJXT's account (verified by scanning JXPJXT's full public repository list across both pages, which contains no 'Demistifier' / 'Demystifier' / 'GenAI' / 'Exchange' project), and a z-ai page_reader fetch confirmed the 404. Based on the repo name only, the apparent intent is a Google Gen AI Exchange submission that 'demystifies' documents using GenAI, but no README, tech stack, or features could be retrieved. (based on repo metadata)",
        "tech": [],
        "highlights": [
            "Repo URL returns HTTP 404 (not found on JXPJXT)",
            "Intent inferred from name: Google Gen AI Exchange doc tool",
            "No README, tech stack, or features documented"
        ],
        "readme_found": False
    },
    {
        "slug": "kaggle-backpack",
        "url": "https://github.com/JXPJXT/Kaggle-Backpack-Prediction-Challenge",
        "description": "A Kaggle Tabular Playground Series submission (Feb 1-28, 2025) that predicts backpack prices from tabular attributes, optimized for RMSE. The notebook (code.ipynb) walks through EDA, data cleaning, feature engineering (transformations + combination testing), and regression-model experimentation with hyperparameter tuning via cross-validation, using XGBoost (XGBRegressor) as the primary model alongside pandas, NumPy, scikit-learn, Matplotlib, and Seaborn. Final predictions are formatted into the required Kaggle submission file; authors are Japjot, Gurkirat, and Hardik.",
        "tech": ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost (XGBRegressor)", "Matplotlib", "Seaborn", "Jupyter Notebook"],
        "highlights": [
            "Kaggle Tabular Playground Series (Feb 2025) - RMSE on price",
            "EDA + feature engineering + XGBoost with CV tuning",
            "Group project (Japjot, Gurkirat, Hardik)"
        ],
        "readme_found": True
    },
]

with open("/tmp/project-readmes.json", "w") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print(f"Wrote {len(projects)} project entries to /tmp/project-readmes.json")
found = sum(1 for p in projects if p['readme_found'])
print(f"Found README: {found}/{len(projects)}")
print(f"Missing README: {[p['slug'] for p in projects if not p['readme_found']]}")
print()
for p in projects:
    print(f"  {p['slug']:24s} | tech={len(p['tech']):2d} | highlights={len(p['highlights'])} | desc={len(p['description'])} chars")
