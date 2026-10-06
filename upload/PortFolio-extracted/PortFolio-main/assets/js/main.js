/* ============================================================
   main.js — Portfolio core enhancements (Phase A)
   - Scroll-spy nav
   - Skill proficiency bars
   - Testimonials carousel
   - View counter (countapi.xyz)
   - Project detail modal
   - Dynamic phrase rotator from JSON
   - Role-based resume highlight
   - Print + reduced-motion guards
   ============================================================ */

(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const STORAGE = {
    theme: 'hd-theme',
    role: 'hd-role',
    banner: 'hd-banner-dismissed-until'
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- Safe JSON fetch helper -------- */
  async function fetchJSON(url) {
    try {
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      console.warn('[portfolio] failed to load', url, e.message);
      return null;
    }
  }

  /* =========================================================
     1. SCROLL-SPY NAV
     ========================================================= */
  function initScrollSpy() {
    const navLinks = $$('.nav-links a[href^="#"]');
    if (!navLinks.length) return;
    const map = {};
    navLinks.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) map[id] = { link: a, section: sec };
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(a => a.classList.remove('active'));
          if (map[id]) map[id].link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Object.values(map).forEach(m => obs.observe(m.section));
  }

  /* =========================================================
     2. SKILL PROFICIENCY BARS (injects into existing cards)
     ========================================================= */
  async function initSkillBars() {
    const data = await fetchJSON('assets/data/skills.json');
    if (!data) return;
    const grid = $('.skills-grid');
    if (!grid) return;

    data.categories.forEach((cat) => {
      const card = document.createElement('div');
      card.className = 'skill-card skill-card--detailed';
      const tags = cat.skills
        .map(s => `<li>
            <span class="skill-bar-label">${s.name}<span class="skill-bar-val">${s.level}% · ${s.years}y</span></span>
            <span class="skill-bar"><span class="skill-bar-fill" data-level="${s.level}"></span></span>
          </li>`)
        .join('');
      card.innerHTML = `
        <div class="skill-icon"><i class="${cat.icon}"></i></div>
        <h4>${cat.title}</h4>
        <ul class="skill-bars">${tags}</ul>
      `;
      grid.appendChild(card);
    });

    if (reducedMotion) {
      $$('.skill-bar-fill').forEach(el => el.style.width = el.dataset.level + '%');
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.level + '%';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    $$('.skill-bar-fill').forEach(el => obs.observe(el));
  }

  /* =========================================================
     3. TESTIMONIALS CAROUSEL (new section after projects)
     ========================================================= */
  async function initTestimonials() {
    const data = await fetchJSON('assets/data/testimonials.json');
    if (!data || !data.testimonials || !data.testimonials.length) return;

    const target = $('#projects');
    if (!target) return;

    const section = document.createElement('section');
    section.id = 'testimonials';
    section.className = 'reveal';
    section.innerHTML = `
      <div class="section-header">
        <span class="section-num">06.5.</span>
        <h2 class="section-title">What People Say</h2>
        <div class="section-line"></div>
      </div>
      <div class="testimonial-carousel" aria-roledescription="carousel">
        <button class="t-prev" aria-label="Previous testimonial"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="t-viewport">
          ${data.testimonials.map((t, i) => `
            <article class="t-slide ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-hidden="${i !== 0}">
              <div class="t-quote"><i class="fa-solid fa-quote-left"></i></div>
              <p class="t-text">${t.quote}</p>
              <div class="t-author">
                <div class="t-avatar">${t.initials}</div>
                <div>
                  <div class="t-name">${t.name}</div>
                  <div class="t-role">${t.role} · ${t.company}</div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
        <button class="t-next" aria-label="Next testimonial"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="t-dots" role="tablist">
          ${data.testimonials.map((_, i) => `<button class="t-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Go to testimonial ${i + 1}"></button>`).join('')}
        </div>
      </div>
    `;
    target.insertAdjacentElement('afterend', section);

    const slides = $$('.t-slide', section);
    const dots = $$('.t-dot', section);
    let idx = 0;
    let timer = null;

    function go(n) {
      slides[idx].classList.remove('active');
      slides[idx].setAttribute('aria-hidden', 'true');
      dots[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active');
      slides[idx].setAttribute('aria-hidden', 'false');
      dots[idx].classList.add('active');
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }

    $('.t-next', section).addEventListener('click', () => { next(); restart(); });
    $('.t-prev', section).addEventListener('click', () => { prev(); restart(); });
    dots.forEach(d => d.addEventListener('click', () => { go(parseInt(d.dataset.idx, 10)); restart(); }));

    function restart() {
      stop();
      if (!reducedMotion) timer = setInterval(next, 5500);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    section.addEventListener('mouseenter', stop);
    section.addEventListener('mouseleave', restart);

    // Reveal observer
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealObs.observe(section);

    restart();
  }

  /* =========================================================
     4. VIEW COUNTER (localStorage fallback)
     ========================================================= */
  function initViewCounter() {
    const el = $('#view-count');
    if (!el) return;
    const KEY = 'hd-view-count';
    try {
      let count = parseInt(localStorage.getItem(KEY) || '0', 10);
      // Only increment once per session
      if (!sessionStorage.getItem('hd-counted')) {
        count++;
        localStorage.setItem(KEY, String(count));
        sessionStorage.setItem('hd-counted', '1');
      }
      el.textContent = count.toLocaleString();
    } catch (e) {
      el.textContent = '—';
    }
  }

  /* =========================================================
     5. PROJECT MODAL (data-driven)
     ========================================================= */
  async function initProjectModal() {
    const data = await fetchJSON('assets/data/projects.json');
    if (!data) return;

    // Build modal once
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="pm-backdrop" data-close></div>
      <div class="pm-panel" role="document">
        <button class="pm-close" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        <div class="pm-body" id="pm-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    const body = modal.querySelector('#pm-body');

    function open(slug) {
      const p = data.projects.find(x => x.slug === slug);
      if (!p) return;
      body.innerHTML = `
        <div class="pm-icon"><i class="${p.icon}"></i></div>
        <h3>${p.title}</h3>
        <p class="pm-tagline">${p.tagline || ''}</p>
        <div class="pm-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <p>${p.description}</p>
        ${p.caseStudy ? `
          <div class="pm-case">
            <div class="pm-case-block">
              <h5><i class="fa-solid fa-bullseye"></i> Problem</h5>
              <p>${p.caseStudy.problem}</p>
            </div>
            <div class="pm-case-block">
              <h5><i class="fa-solid fa-wand-magic-sparkles"></i> Solution</h5>
              <p>${p.caseStudy.solution}</p>
            </div>
            <div class="pm-case-block">
              <h5><i class="fa-solid fa-chart-line"></i> Impact</h5>
              <p>${p.caseStudy.impact}</p>
            </div>
            ${p.caseStudy.highlights && p.caseStudy.highlights.length ? `
              <div class="pm-case-block">
                <h5><i class="fa-solid fa-star"></i> Highlights</h5>
                <ul>${p.caseStudy.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </div>
        ` : ''}
        <div class="pm-actions">
          <a href="${p.url}" target="_blank" rel="noopener" class="btn-primary">
            <i class="fa-brands fa-github"></i> View Repository
          </a>
          ${p.extraLinks ? p.extraLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="btn-secondary"><i class="fa-brands fa-github"></i> ${l.label}</a>`).join('') : ''}
        </div>
      `;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => { if (e.target.dataset.close !== undefined) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

    // Wire up all project cards
    $$('.project-card, .featured-card').forEach(card => {
      // Card currently navigates away — intercept and open modal
      card.addEventListener('click', (e) => {
        // Allow modifier-clicks to open in new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        const href = card.getAttribute('href') || '';
        const slug = (card.dataset.slug || deriveSlug(href)).toLowerCase();
        if (slug) {
          open(slug);
          // Play sound if available
          if (window.playSound) window.playSound('click');
        }
      });
    });

    function deriveSlug(href) {
      if (!href) return null;
      try {
        const u = new URL(href);
        const path = u.pathname.replace(/^\/+|\/+$/g, '');
        const parts = path.split('/');
        return parts[parts.length - 1] || null;
      } catch {
        return null;
      }
    }
  }

  /* =========================================================
     6. ROLE-BASED RESUME HIGHLIGHT (top-bar button)
     ========================================================= */
  async function initRoleHighlight() {
    const data = await fetchJSON('assets/data/resume-roles.json');
    if (!data) return;
    const bar = $('#role-bar');
    if (!bar) return;
    data.roles.forEach((r) => {
      const btn = document.createElement('button');
      btn.className = 'role-pill';
      btn.dataset.role = r.id;
      btn.title = r.description;
      btn.innerHTML = `<i class="${r.icon}"></i> ${r.label}`;
      btn.addEventListener('click', () => applyRole(r.id, data));
      bar.appendChild(btn);
    });
    const saved = localStorage.getItem(STORAGE.role);
    if (saved) applyRole(saved, data, true);
  }
  function applyRole(roleId, data, silent) {
    const r = data.roles.find(x => x.id === roleId);
    if (!r) return;
    $$('.role-pill').forEach(b => b.classList.toggle('active', b.dataset.role === roleId));
    $$('section.reveal, section[id]').forEach(s => {
      if (!s.id) return;
      s.classList.toggle('role-dim', !r.highlight.includes(s.id) && s.id !== 'home');
    });
    localStorage.setItem(STORAGE.role, roleId);
    if (!silent && window.showToast) showToast(`Resume view: ${r.label}`, 'fa-user-tie');
  }

  /* =========================================================
     7. INIT
     ========================================================= */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(() => {
    initScrollSpy();
    initSkillBars();
    initTestimonials();
    initViewCounter();
    initProjectModal();
    initRoleHighlight();
  });

  // Expose for inline handlers if needed
  window.portfolio = { fetchJSON };
})();
