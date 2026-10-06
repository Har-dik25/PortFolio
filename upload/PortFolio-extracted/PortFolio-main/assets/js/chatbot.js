/* ============================================================
   chatbot.js — floating "Ask Hardik" AI assistant widget
   Uses window.portfolioAPI.chat (Gemini backend)
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    if (!window.portfolioAPI) return;

    // Build UI
    const root = document.createElement('div');
    root.className = 'hd-bot';
    root.innerHTML = `
      <button class="hd-bot-toggle" id="hd-bot-toggle" aria-label="Open AI assistant" aria-expanded="false">
        <i class="fa-solid fa-robot"></i>
        <span class="hd-bot-pulse"></span>
      </button>
      <div class="hd-bot-panel" id="hd-bot-panel" role="dialog" aria-label="Ask Hardik AI assistant" aria-hidden="true">
        <header class="hd-bot-head">
          <div class="hd-bot-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="hd-bot-meta">
            <div class="hd-bot-name">Ask Hardik</div>
            <div class="hd-bot-sub">RAG over Hardik's profile · powered by Gemini</div>
          </div>
          <button class="hd-bot-close" id="hd-bot-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        </header>
        <div class="hd-bot-log" id="hd-bot-log">
          <div class="hd-msg hd-msg-bot">
            <div class="hd-msg-bubble">
              Hi 👋 I'm an AI assistant trained on Hardik's profile. Ask me anything about his projects, skills, or experience.
            </div>
          </div>
        </div>
        <form class="hd-bot-form" id="hd-bot-form" autocomplete="off">
          <input type="text" id="hd-bot-input" placeholder="Ask about a project, skill, or role…" maxlength="500" required>
          <button type="submit" id="hd-bot-send" aria-label="Send message"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <div class="hd-bot-foot">
          <span class="hd-bot-suggest" data-q="What are his top LLM projects?">Top LLM projects</span>
          <span class="hd-bot-suggest" data-q="Is he open to remote roles?">Remote work?</span>
          <span class="hd-bot-suggest" data-q="How can I contact him?">Contact</span>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    const toggle = root.querySelector('#hd-bot-toggle');
    const panel = root.querySelector('#hd-bot-panel');
    const close = root.querySelector('#hd-bot-close');
    const log = root.querySelector('#hd-bot-log');
    const form = root.querySelector('#hd-bot-form');
    const input = root.querySelector('#hd-bot-input');
    const send = root.querySelector('#hd-bot-send');

    function open() {
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      setTimeout(() => input.focus(), 250);
    }
    function closePanel() {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
      if (panel.classList.contains('open')) closePanel();
      else open();
    });
    close.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
    });

    const history = [];
    function appendMsg(role, text) {
      const div = document.createElement('div');
      div.className = 'hd-msg hd-msg-' + role;
      const bubble = document.createElement('div');
      bubble.className = 'hd-msg-bubble';
      bubble.textContent = text;
      div.appendChild(bubble);
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }
    function typing() {
      const div = document.createElement('div');
      div.className = 'hd-msg hd-msg-bot hd-typing';
      div.innerHTML = '<div class="hd-msg-bubble"><span class="hd-dot"></span><span class="hd-dot"></span><span class="hd-dot"></span></div>';
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }

    async function sendMsg(text) {
      if (!text || !text.trim()) return;
      appendMsg('user', text);
      history.push({ role: 'user', content: text });
      const t = typing();
      send.disabled = true;
      const res = await window.portfolioAPI.chat(text, history);
      t.remove();
      if (res.ok) {
        const reply = (res.data && res.data.reply) || 'No response.';
        appendMsg('bot', reply);
        history.push({ role: 'assistant', content: reply });
      } else {
        // Intelligent local responder for common portfolio queries
        const q = text.toLowerCase();
        let fallback = "";
        if (q.includes('project') || q.includes('llm') || q.includes('rag')) {
          fallback = "Hardik's flagship projects include **Legal Mind RAG (Samvidhan AI)** (hybrid dense + BM25 RRF search over the Indian Constitution) and the **Fake News Detection System** (BERT + BiLSTM with attention explainability). Check out the Projects section or his GitHub profile at github.com/Har-dik25.";
        } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
          fallback = "You can reach Hardik directly at **hardikkumar2583@gmail.com** or via phone/WhatsApp at **+91 7878600960**. You can also connect on LinkedIn: linkedin.com/in/hardik8.";
        } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
          fallback = "Hardik specializes in Python, LLMs, RAG architectures, PyTorch, Scikit-learn, FastAPI, React.js, and MongoDB, backed by certifications in Oracle OCI Generative AI & Data Science.";
        } else if (q.includes('remote') || q.includes('role') || q.includes('open')) {
          fallback = "Yes! Hardik is actively open to full-time and internship opportunities in AI/ML Engineering, Generative AI, and Data Science across Remote, Hybrid, or On-site roles.";
        } else {
          fallback = "I'm running in offline mode right now! For immediate inquiries, feel free to use the contact form below or email Hardik at hardikkumar2583@gmail.com.";
        }
        appendMsg('bot', fallback);
      }
      send.disabled = false;
      input.value = '';
      input.focus();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMsg(input.value);
    });
    root.querySelectorAll('.hd-bot-suggest').forEach((s) => {
      s.addEventListener('click', () => sendMsg(s.dataset.q));
    });
  });
})();
