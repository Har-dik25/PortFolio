/* ============================================================
   api.js — minimal fetch helper for the portfolio backend
   Default base URL: same-origin (when served from Flask)
   Fallback:  http://localhost:5000  (dev)
   ============================================================ */
(function () {
  'use strict';

  const DEV_BASE = 'http://localhost:5000';

  function resolveBase() {
    if (window.PORTFOLIO_API_BASE) return window.PORTFOLIO_API_BASE;
    const { hostname, protocol } = window.location;
    // GitHub Pages, etc. — try the dev backend
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.local')
    ) {
      return '';
    }
    return DEV_BASE;
  }

  const BASE = resolveBase();

  async function call(path, opts = {}) {
    const url = BASE + path;
    const init = Object.assign(
      {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
      },
      opts
    );
    if (init.body && typeof init.body !== 'string') {
      init.body = JSON.stringify(init.body);
    }
    try {
      const r = await fetch(url, init);
      const ct = r.headers.get('content-type') || '';
      const data = ct.includes('application/json') ? await r.json() : await r.text();
      if (!r.ok) {
        return { ok: false, status: r.status, error: (data && data.error) || r.statusText, data };
      }
      return { ok: true, status: r.status, data };
    } catch (err) {
      return { ok: false, status: 0, error: 'network_error: ' + err.message };
    }
  }

  function sessionId() {
    let id = localStorage.getItem('hd-sid');
    if (!id) {
      id = 'sid-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('hd-sid', id);
    }
    return id;
  }

  window.portfolioAPI = {
    base: BASE,
    call,
    sessionId,
    contact: (payload) => call('/api/portfolio/contact', { method: 'POST', body: payload }),
    chat: (message, history) => call('/api/portfolio/chat', {
      method: 'POST',
      body: { message, history: history || [], session_id: sessionId() },
    }),
    recommend: (interests) => call('/api/portfolio/recommend', { method: 'POST', body: { interests } }),
    resume: (role) => call('/api/portfolio/resume', { method: 'POST', body: { role } }),
    coverLetter: (jobDescription) => call('/api/portfolio/cover-letter', { method: 'POST', body: { job_description: jobDescription } }),
    analyticsPing: (path, withGeo = false) => call('/api/portfolio/analytics/ping', {
      method: 'POST',
      body: {
        path,
        referrer: document.referrer,
        session_id: sessionId(),
        with_geo: withGeo,
      },
    }),
    visitorStats: () => call('/api/portfolio/stats/visitor'),
    resumeDownload: () => call('/api/portfolio/resume-download', { method: 'POST' }),
    blogList: () => call('/api/portfolio/blog'),
    blogPost: (slug) => call('/api/portfolio/blog/' + encodeURIComponent(slug)),
    blogComment: (slug, name, message) => call('/api/portfolio/blog/' + encodeURIComponent(slug) + '/comments', {
      method: 'POST', body: { name, message },
    }),
    newsletter: (email) => call('/api/portfolio/newsletter', { method: 'POST', body: { email } }),
    search: (q) => call('/api/portfolio/search?q=' + encodeURIComponent(q)),
    adminLogin: (username, password) => call('/api/portfolio/admin/login', {
      method: 'POST', body: { username, password },
    }),
    adminAnalytics: (username, password) => {
      const token = btoa(username + ':' + password);
      return call('/api/portfolio/admin/analytics', { headers: { Authorization: 'Basic ' + token } });
    },
  };
})();
