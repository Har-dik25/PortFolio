/* ============================================================
   tools.js — cover-letter helper, recommender UI, analytics beacon
   Depends on: window.portfolioAPI
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    if (!window.portfolioAPI) return;

    /* ---------------- Analytics beacon ---------------- */
    let lastPath = '';
    function ping() {
      const path = window.location.pathname + window.location.hash;
      if (path === lastPath) return;
      lastPath = path;
      window.portfolioAPI.analyticsPing(path, false);
    }
    // initial ping
    setTimeout(ping, 1500);
    window.addEventListener('hashchange', ping);
    // visibility-based ping (re-shows as a new view)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) ping();
    });

    /* ---------------- Resume download tracking ---------------- */
    document.querySelectorAll('a[href$=".pdf"]').forEach((a) => {
      a.addEventListener('click', () => {
        window.portfolioAPI.resumeDownload();
      });
    });

    /* ---------------- Project recommender ---------------- */
    const recSection = document.getElementById('project-recommender');
    if (recSection) {
      const interests = [
        { id: 'llm', label: 'LLM / RAG', icon: 'fa-solid fa-robot' },
        { id: 'nlp', label: 'NLP', icon: 'fa-solid fa-comments' },
        { id: 'computer-vision', label: 'Computer Vision', icon: 'fa-solid fa-eye' },
        { id: 'data-science', label: 'Data Science', icon: 'fa-solid fa-chart-line' },
        { id: 'fullstack', label: 'Full-Stack', icon: 'fa-solid fa-laptop-code' },
        { id: 'mlops', label: 'MLOps', icon: 'fa-solid fa-gears' },
      ];
      recSection.innerHTML = `
        <div class="section-header">
          <span class="section-num">★</span>
          <h2 class="section-title">Find Your Match</h2>
          <div class="section-line"></div>
        </div>
        <p class="rec-lead">Pick what you're hiring for and I'll highlight matching projects.</p>
        <div class="rec-pills" id="rec-pills">
          ${interests.map((i) => `<button class="rec-pill" data-id="${i.id}"><i class="${i.icon}"></i> ${i.label}</button>`).join('')}
        </div>
        <div class="rec-results" id="rec-results"></div>
      `;
      const pills = recSection.querySelectorAll('.rec-pill');
      const out = recSection.querySelector('#rec-results');
      const chosen = new Set();
      async function refresh() {
        if (chosen.size === 0) {
          out.innerHTML = '<div class="rec-empty">Pick one or more interests above to filter matching projects.</div>';
          return;
        }

        // Fetch project data locally first
        let pdata = null;
        try {
          const pres = await fetch('assets/data/projects.json');
          pdata = await pres.json();
        } catch (e) {
          out.innerHTML = '<div class="rec-empty">Unable to load projects data.</div>';
          return;
        }

        let matched = [];
        // Try backend if available
        let r = null;
        if (window.portfolioAPI && window.portfolioAPI.recommend) {
          try {
            r = await window.portfolioAPI.recommend(Array.from(chosen));
          } catch (e) {}
        }

        if (r && r.ok && r.data && r.data.items && r.data.items.length) {
          matched = r.data.items
            .map((slug) => pdata.projects.find((p) => p.slug === slug || p.url.toLowerCase().includes(slug)))
            .filter(Boolean);
        } else {
          // Client-side fallback matching by tags/tech/category
          const tagsMap = {
            'llm': ['llm', 'rag', 'ollama', 'gemini', 'bert'],
            'nlp': ['nlp', 'bert', 'bilstm', 'tf-idf', 'sentiment', 'pos'],
            'computer-vision': ['computer vision', 'opencv', 'ocr', 'video analytics', 'tesseract'],
            'data-science': ['machine learning', 'regression', 'eda', 'pandas', 'statistics', 'power bi'],
            'fullstack': ['react.js', 'fastapi', 'flask', 'mongodb', 'rest api', 'full stack'],
            'mlops': ['docker', 'fastapi', 'concurrency', 'cloud', 'azure']
          };

          const activeTerms = Array.from(chosen).flatMap(c => tagsMap[c] || [c]);
          matched = pdata.projects.filter(p => {
            const projectText = (p.tech.join(' ') + ' ' + p.title + ' ' + p.description).toLowerCase();
            return activeTerms.some(term => projectText.includes(term));
          });
        }

        if (!matched.length) {
          out.innerHTML = '<div class="rec-empty">No direct matches found — explore the complete projects list above.</div>';
          return;
        }
        out.innerHTML = `
          <div class="rec-grid">
            ${matched.map((p) => `
              <a href="${p.url}" target="_blank" rel="noopener" class="rec-card" data-slug="${p.slug}">
                <div class="rec-icon"><i class="${p.icon}"></i></div>
                <h4>${p.title}</h4>
                <p>${p.tagline || (p.description ? p.description.slice(0, 90) + '…' : '')}</p>
                <div class="rec-tech">${p.tech.slice(0, 4).map((t) => `<span>${t}</span>`).join('')}</div>
              </a>
            `).join('')}
          </div>
        `;
      }
      pills.forEach((p) => {
        p.addEventListener('click', () => {
          const id = p.dataset.id;
          if (chosen.has(id)) chosen.delete(id);
          else chosen.add(id);
          p.classList.toggle('active');
          refresh();
        });
      });
      refresh();
    }

    /* ---------------- Cover letter helper ---------------- */
    const clSection = document.getElementById('cover-letter');
    if (clSection) {
      clSection.innerHTML = `
        <div class="section-header">
          <span class="section-num">✎</span>
          <h2 class="section-title">AI Cover Letter Helper</h2>
          <div class="section-line"></div>
        </div>
        <p class="rec-lead">Paste a job description to generate a tailored pitch highlighting Hardik's matching skills.</p>
        <div class="cl-box">
          <textarea id="cl-input" placeholder="Paste the job description here (e.g., AI/ML Engineer with LLM, RAG, PyTorch experience)…" maxlength="4000"></textarea>
          <div class="cl-actions">
            <button class="btn-primary" id="cl-go"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate Draft</button>
            <button class="btn-secondary" id="cl-copy" disabled><i class="fa-solid fa-copy"></i> Copy</button>
          </div>
          <div class="cl-out" id="cl-out" aria-live="polite"></div>
        </div>
      `;
      const input = clSection.querySelector('#cl-input');
      const out = clSection.querySelector('#cl-out');
      const go = clSection.querySelector('#cl-go');
      const copyBtn = clSection.querySelector('#cl-copy');
      let lastLetter = '';
      go.addEventListener('click', async () => {
        const jd = input.value.trim();
        if (!jd) { out.innerHTML = '<div class="cl-err">Please paste a job description first.</div>'; return; }
        out.innerHTML = '<div class="cl-loading"><i class="fa-solid fa-spinner fa-spin"></i> Generating tailored alignment draft…</div>';
        
        let generated = null;
        if (window.portfolioAPI && window.portfolioAPI.coverLetter) {
          try {
            const r = await window.portfolioAPI.coverLetter(jd);
            if (r.ok && r.data && r.data.letter) {
              generated = r.data.letter;
            }
          } catch (e) {}
        }

        // Client-side template generator when backend is offline
        if (!generated) {
          const jdLower = jd.toLowerCase();
          const hasLLM = jdLower.includes('llm') || jdLower.includes('rag') || jdLower.includes('genai') || jdLower.includes('generative');
          const hasCV = jdLower.includes('vision') || jdLower.includes('cv') || jdLower.includes('image');
          const hasML = jdLower.includes('machine learning') || jdLower.includes('model') || jdLower.includes('pytorch');

          generated = `Dear Hiring Team,\n\nI am writing to express my strong interest in the engineering role at your organization. Having reviewed your job requirements, my background in applied AI systems, machine learning engineering, and full-stack deployment aligns well with your team's needs.\n\nKey Highlights of My Experience:\n• Applied AI & LLMs: Engineered Legal Mind RAG (Samvidhan AI), combining BM25 lexical with dense vector search and Reciprocal Rank Fusion.\n• Deep Learning & NLP: Built a hybrid BERT + BiLSTM fake news detection system with attention-based explainability and Dockerized FastAPI inference.\n• Industry Impact: During my AI/ML and Data internships at Futurense Technologies, developed medical documentation systems with LLMs and trained predictive ML models.\n\nI would welcome the opportunity to discuss how my hands-on experience in building performant AI pipelines can add value to your team.\n\nSincerely,\nHardik\nEmail: hardikkumar2583@gmail.com\nGitHub: github.com/Har-dik25\nLinkedIn: linkedin.com/in/hardik8`;
        }

        lastLetter = generated;
        out.innerHTML = `<pre class="cl-letter" style="white-space: pre-wrap; font-family: inherit; font-size: 13.5px; line-height: 1.65; background: var(--card-2, #1d2030); padding: 18px; border-radius: 10px; border: 1px solid var(--border);">${escapeHtml(lastLetter)}</pre>`;
        copyBtn.disabled = !lastLetter;
      });
      copyBtn.addEventListener('click', async () => {
        if (!lastLetter) return;
        try {
          await navigator.clipboard.writeText(lastLetter);
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
          setTimeout(() => (copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy'), 1500);
        } catch (e) {
          out.innerHTML += '<div class="cl-err">Copy failed — please select manually.</div>';
        }
      });
    }

    /* ---------------- Newsletter signup ---------------- */
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = nlForm.querySelector('input[type=email]').value.trim();
        if (!email) return;
        const r = await window.portfolioAPI.newsletter(email);
        const out = nlForm.querySelector('.nl-msg');
        if (out) {
          out.textContent = r.ok ? '✓ Subscribed' : '✗ Failed — try again later';
          out.className = 'nl-msg ' + (r.ok ? 'ok' : 'err');
        }
        if (r.ok) nlForm.reset();
      });
    }
  });

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
