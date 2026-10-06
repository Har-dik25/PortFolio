/* ============================================================
   blog.js — single-post viewer + comments
   URL: blog.html?slug=my-post
   ============================================================ */
(function () {
  'use strict';

  function $(s) { return document.querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderMarkdown(md) {
    // Very small Markdown subset: headings, bold, code, lists, paragraphs
    const lines = (md || '').split(/\r?\n/);
    let html = '';
    let inList = false;
    let inPre = false;
    for (let raw of lines) {
      const line = raw;
      if (line.startsWith('```')) {
        if (inPre) { html += '</code></pre>'; inPre = false; }
        else { html += '<pre><code>'; inPre = true; }
        continue;
      }
      if (inPre) { html += esc(line) + '\n'; continue; }
      if (/^### /.test(line)) { html += `<h3>${inline(line.slice(4))}</h3>`; continue; }
      if (/^## /.test(line)) { html += `<h2>${inline(line.slice(3))}</h2>`; continue; }
      if (/^# /.test(line)) { html += `<h1>${inline(line.slice(2))}</h1>`; continue; }
      if (/^[-*] /.test(line)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${inline(line.slice(2))}</li>`;
        continue;
      } else if (inList) {
        html += '</ul>'; inList = false;
      }
      if (line.trim() === '') { html += ''; continue; }
      html += `<p>${inline(line)}</p>`;
    }
    if (inList) html += '</ul>';
    if (inPre) html += '</code></pre>';
    return html;

    function inline(s) {
      return esc(s)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
    }
  }

  async function load() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
      $('#blog-main').innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px; color: var(--accent, #f5b342);"><i class="fa-solid fa-pen-nib"></i></div>
          <h1 style="font-size: 28px; margin-bottom: 12px;">Technical Blog & Insights</h1>
          <p style="color: #9499a8; max-width: 500px; margin: 0 auto 24px; line-height: 1.6;">
            Articles on LLMs, RAG architectures, Agentic AI, and Machine Learning engineering are in the works. Check back soon!
          </p>
          <a href="index.html#projects" class="back-link" style="display: inline-flex; align-items: center; gap: 8px; color: var(--accent, #f5b342); text-decoration: none; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Explore Projects
          </a>
        </div>
      `;
      return;
    }
    if (!window.portfolioAPI) {
      $('#blog-main').innerHTML = '<div class="blog-loading">API not available.</div>';
      return;
    }
    const r = await window.portfolioAPI.blogPost(slug);
    if (!r.ok) {
      $('#blog-main').innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 40px; margin-bottom: 16px; color: var(--accent, #f5b342);"><i class="fa-solid fa-file-lines"></i></div>
          <h2 style="margin-bottom: 12px;">Article Coming Soon</h2>
          <p style="color: #9499a8; max-width: 480px; margin: 0 auto 20px;">
            This write-up is currently being polished. In the meantime, feel free to inspect the corresponding project on GitHub.
          </p>
          <a href="index.html#projects" style="color: var(--accent, #f5b342); text-decoration: none; font-weight: 500;">
            ← Return to Portfolio
          </a>
        </div>
      `;
      return;
    }
    const d = r.data;
    const fm = d.frontmatter || {};
    const tags = (fm.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

    document.title = `${fm.title || slug} — Hardik`;

    const html = `
      <article>
        <h1 class="blog-title">${esc(fm.title || slug)}</h1>
        <div class="blog-meta">
          <span><i class="fa-regular fa-calendar"></i> ${esc(fm.date || '')}</span>
          ${tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join('')}
        </div>
        <div class="blog-body">${renderMarkdown(d.body)}</div>
      </article>
      <section class="blog-comments">
        <h2>Comments (${d.comments.length})</h2>
        <form class="comment-form" id="comment-form">
          <input type="text" name="name" placeholder="Your name" maxlength="80">
          <textarea name="message" placeholder="Add a comment…" required maxlength="1500"></textarea>
          <button type="submit">Post comment</button>
          <div class="comment-msg" id="comment-msg"></div>
        </form>
        <div class="comment-list">
          ${d.comments.length === 0 ? '<div class="muted">No comments yet — be the first.</div>' : d.comments.map((c) => `
            <div class="comment">
              <div>
                <span class="comment-name">${esc(c.name || 'Anonymous')}</span>
                <span class="comment-ts">${esc((c.ts || '').slice(0, 19).replace('T', ' '))}</span>
              </div>
              <div class="comment-body">${esc(c.message)}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    $('#blog-main').innerHTML = html;

    $('#comment-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const msgEl = $('#comment-msg');
      msgEl.className = 'comment-msg';
      msgEl.textContent = 'Posting…';
      const res = await window.portfolioAPI.blogComment(slug, fd.get('name') || 'Anonymous', fd.get('message'));
      if (res.ok) {
        msgEl.className = 'comment-msg ok';
        msgEl.textContent = '✓ Posted';
        e.target.reset();
        setTimeout(load, 800);
      } else {
        msgEl.className = 'comment-msg err';
        msgEl.textContent = '✗ ' + (res.error || 'Failed');
      }
    });
  }

  load();
})();
