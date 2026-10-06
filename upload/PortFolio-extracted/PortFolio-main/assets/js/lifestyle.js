/* ============================================================
   lifestyle.js — voice intro + day-in-the-life timeline
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(async () => {
    const r = await fetch('assets/data/lifestyle.json');
    if (!r.ok) return;
    const data = await r.json();

    // Voice intro (in connect section, before form)
    const connectInfo = document.querySelector('.connect-info');
    if (connectInfo && data.voice) {
      const v = data.voice;
      const card = document.createElement('div');
      card.className = 'voice-card';
      card.innerHTML = `
        <div class="voice-icon"><i class="fa-solid fa-microphone"></i></div>
        <div class="voice-meta">
          <div class="voice-title">${v.title}</div>
          <div class="voice-sub">${v.subtitle}</div>
        </div>
        <audio controls preload="none" src="${v.src}" aria-label="Audio introduction"></audio>
      `;
      connectInfo.appendChild(card);
    }

    // Day-in-the-life (own section, before connect)
    if (data.dayInLife && data.dayInLife.length) {
      const projects = document.getElementById('projects');
      if (!projects) return;
      const dil = document.createElement('section');
      dil.id = 'day-in-life';
      dil.className = 'reveal';
      dil.innerHTML = `
        <div class="section-header">
          <span class="section-num">07.</span>
          <h2 class="section-title">A Day in My Life</h2>
          <div class="section-line"></div>
        </div>
        <div class="dayinlife">
          ${data.dayInLife.map((it) => `
            <div class="dil-item">
              <div class="dil-time">${it.time}</div>
              <div class="dil-title">${it.title}</div>
              <div class="dil-desc">${it.desc}</div>
            </div>
          `).join('')}
        </div>
      `;
      // Insert after testimonials, before recommender
      const recommender = document.getElementById('project-recommender');
      if (recommender) recommender.insertAdjacentElement('beforebegin', dil);
      else projects.insertAdjacentElement('afterend', dil);

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      obs.observe(dil);
    }
  });
})();
