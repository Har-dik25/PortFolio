/* ============================================================
   admin.js — private analytics dashboard
   Stores creds in sessionStorage; clears on logout.
   ============================================================ */
(function () {
  'use strict';

  const STORE_KEY = 'hd-admin-creds';

  function getCreds() {
    try {
      const c = sessionStorage.getItem(STORE_KEY);
      if (!c) return null;
      return JSON.parse(c);
    } catch { return null; }
  }
  function setCreds(user, pass) {
    sessionStorage.setItem(STORE_KEY, JSON.stringify({ user, pass }));
  }
  function clearCreds() {
    sessionStorage.removeItem(STORE_KEY);
  }

  function $(s) { return document.querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function showDashboard(creds) {
    $('#admin-login').hidden = true;
    $('#admin-dashboard').hidden = false;
    $('#admin-username').textContent = creds.user;
    $('#admin-user').hidden = false;
    loadAnalytics(creds);
  }
  function showLogin() {
    $('#admin-login').hidden = false;
    $('#admin-dashboard').hidden = true;
    $('#admin-user').hidden = true;
  }

  async function loadAnalytics(creds) {
    const token = btoa(creds.user + ':' + creds.pass);
    const r = await fetch((window.portfolioAPI ? window.portfolioAPI.base : '') + '/api/portfolio/admin/analytics', {
      headers: { Authorization: 'Basic ' + token },
    });
    if (!r.ok) {
      if (r.status === 401) { clearCreds(); showLogin(); return; }
      $('#admin-err').textContent = 'Failed to load analytics: ' + r.status;
      return;
    }
    const data = await r.json();
    render(data);
  }

  function render(d) {
    $('#kpi-total').textContent = d.total_views.toLocaleString();
    $('#kpi-today').textContent = d.today_views.toLocaleString();
    $('#kpi-unique').textContent = d.unique_sessions.toLocaleString();
    $('#kpi-resume').textContent = d.resume_downloads.toLocaleString();
    $('#kpi-news').textContent = d.newsletter_count.toLocaleString();
    $('#kpi-chat').textContent = d.chat_messages.toLocaleString();

    // Chart by day (last 30, oldest left → newest right)
    const days = (d.by_day || []).slice().reverse();
    const max = days.reduce((m, x) => Math.max(m, x.c), 1);
    $('#chart-days').innerHTML = days.map((x) =>
      `<div class="col" style="height:${(x.c / max) * 100}%" data-tip="${x.day}: ${x.c}"></div>`
    ).join('') || '<div class="muted">No data yet.</div>';

    // Bar lists
    renderBars($('#list-countries'), d.by_country, (x) => x.country);
    renderBars($('#list-devices'), d.by_device, (x) => x.device);
    renderBars($('#list-paths'), d.by_path, (x) => x.path);

    // Contacts table
    const tbody = $('#table-contacts tbody');
    if (!d.recent_contacts || !d.recent_contacts.length) {
      tbody.innerHTML = '<tr><td colspan="5" class="muted">No submissions yet.</td></tr>';
    } else {
      tbody.innerHTML = d.recent_contacts.map((c) => `
        <tr>
          <td>${esc((c.ts || '').slice(0, 19).replace('T', ' '))}</td>
          <td>${esc(c.name)}</td>
          <td><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></td>
          <td class="msg" title="${esc(c.message)}">${esc(c.message)}</td>
          <td class="${c.delivered ? 'delivered-yes' : 'delivered-no'}">${c.delivered ? '✓ sent' : '✗ stored'}</td>
        </tr>
      `).join('');
    }
  }

  function renderBars(el, items, keyFn) {
    if (!items || !items.length) { el.innerHTML = '<div class="muted">No data.</div>'; return; }
    const max = items.reduce((m, x) => Math.max(m, x.c), 1);
    el.innerHTML = items.map((x) => `
      <div class="bar-row">
        <span class="name">${esc(keyFn(x))}</span>
        <span class="bar"><span style="width:${(x.c / max) * 100}%"></span></span>
        <span class="val">${x.c}</span>
      </div>
    `).join('');
  }

  // Wire login
  document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const user = fd.get('username');
    const pass = fd.get('password');
    const token = btoa(user + ':' + pass);
    const r = await fetch((window.portfolioAPI ? window.portfolioAPI.base : '') + '/api/portfolio/admin/analytics', {
      headers: { Authorization: 'Basic ' + token },
    });
    if (r.ok) {
      setCreds(user, pass);
      $('#admin-err').textContent = '';
      showDashboard({ user, pass });
    } else if (r.status === 401) {
      $('#admin-err').textContent = 'Invalid credentials.';
    } else {
      $('#admin-err').textContent = 'Server error: ' + r.status;
    }
  });

  // Logout
  document.getElementById('admin-logout').addEventListener('click', () => {
    clearCreds();
    showLogin();
  });

  // Auto-resume from session
  const creds = getCreds();
  if (creds) {
    showDashboard(creds);
  } else {
    showLogin();
  }

  // Refresh every 30s
  setInterval(() => {
    const c = getCreds();
    if (c && !$('#admin-dashboard').hidden) loadAnalytics(c);
  }, 30000);
})();
