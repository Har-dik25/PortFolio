/* ============================================================
   constellation.js — 3D skills constellation
   Three.js nodes that gently orbit, drag to rotate, click to highlight.
   Falls back to a static layout if Three.js fails to load.
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    const section = document.getElementById('skills-constellation');
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 600px)').matches;
    if (reduced) {
      section.innerHTML = `
        <div class="section-header">
          <span class="section-num">◆</span>
          <h2 class="section-title">Skills Constellation</h2>
          <div class="section-line"></div>
        </div>
        <p class="constellation-fallback muted">Animated view disabled (prefers-reduced-motion).</p>
      `;
      return;
    }

    section.innerHTML = `
      <div class="section-header">
        <span class="section-num">◆</span>
        <h2 class="section-title">Skills Constellation</h2>
        <div class="section-line"></div>
      </div>
      <p class="constellation-lead">Drag to rotate. Click a node to see details.</p>
      <div class="constellation-wrap">
        <canvas id="constellation-canvas" aria-label="3D skills constellation"></canvas>
        <div class="constellation-info" id="constellation-info">
          <div class="ci-name">Drag to explore</div>
          <div class="ci-meta muted">Click a node to inspect a skill</div>
        </div>
      </div>
    `;

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.onload = init;
    script.onerror = () => {
      section.querySelector('.constellation-wrap').innerHTML =
        '<div class="constellation-fallback muted">3D view unavailable (offline).</div>';
    };
    document.head.appendChild(script);

    function init() {
      if (typeof THREE === 'undefined') return;
      const canvas = document.getElementById('constellation-canvas');
      const info = document.getElementById('constellation-info');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
      camera.position.set(0, 0, 26);

      // Skills (categorized) — 24 nodes
      const data = [
        { c: 'AI/ML',     n: ['LLMs', 'RAG', 'BERT', 'BiLSTM', 'Prompt Eng.'] },
        { c: 'Languages', n: ['Python', 'JavaScript', 'SQL'] },
        { c: 'Backend',   n: ['FastAPI', 'Flask', 'REST APIs', 'Node.js', 'JWT'] },
        { c: 'Databases', n: ['MongoDB', 'MySQL', 'PostgreSQL', 'ChromaDB'] },
        { c: 'Frontend',  n: ['React.js', 'Tailwind', 'HTML/CSS'] },
        { c: 'Tools',     n: ['Git', 'Docker', 'Postman', 'Linux'] },
      ];
      const palette = [0xf5b342, 0xff8a3d, 0x4f46e5, 0x9333ea, 0x10b981, 0x06b6d4];

      // Distribute nodes on a sphere using Fibonacci lattice, grouped by category
      const allNodes = [];
      const COLS = 6;
      const nodes = [];
      data.forEach((cat, ci) => {
        cat.n.forEach((name, ni) => {
          const idx = ci * COLS + ni;
          const t = idx / (data.reduce((s, c) => s + c.n.length, 0));
          const phi = Math.acos(1 - 2 * t);
          const theta = Math.PI * (1 + Math.sqrt(5)) * idx;
          const R = 12;
          nodes.push({
            name,
            cat: cat.c,
            color: palette[ci % palette.length],
            pos: new THREE.Vector3(
              R * Math.cos(theta) * Math.sin(phi),
              R * Math.sin(theta) * Math.sin(phi),
              R * Math.cos(phi)
            ),
            mesh: null,
          });
        });
      });

      // Spheres for nodes
      const sphereGeo = new THREE.SphereGeometry(0.45, 18, 18);
      const labelOffset = new THREE.Vector3(0, 0.85, 0);
      nodes.forEach((n) => {
        const mat = new THREE.MeshBasicMaterial({ color: n.color, transparent: true, opacity: 0.85 });
        const mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.position.copy(n.pos);
        mesh.userData = { name: n.name, cat: n.cat, color: n.color };
        scene.add(mesh);
        n.mesh = mesh;
        allNodes.push(mesh);

        // Label sprite
        const c = document.createElement('canvas');
        c.width = 256; c.height = 64;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = '500 24px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(232, 233, 239, 0.95)';
        ctx.fillText(n.name, c.width / 2, c.height / 2);
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(3, 0.75, 1);
        sprite.position.copy(n.pos).add(labelOffset);
        scene.add(sprite);
        n.sprite = sprite;
      });

      // Lines between consecutive nodes (constellation edges)
      const lineMat = new THREE.LineBasicMaterial({ color: 0xf5b342, transparent: true, opacity: 0.12 });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].pos.distanceTo(nodes[j].pos);
          if (d < 9) {
            const g = new THREE.BufferGeometry().setFromPoints([nodes[i].pos, nodes[j].pos]);
            scene.add(new THREE.Line(g, lineMat));
          }
        }
      }

      // Center "Hardik" hub
      const hubGeo = new THREE.SphereGeometry(0.9, 24, 24);
      const hubMat = new THREE.MeshBasicMaterial({ color: 0xf5b342 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      scene.add(hub);
      const hubC = document.createElement('canvas');
      hubC.width = 256; hubC.height = 64;
      const hctx = hubC.getContext('2d');
      hctx.font = '700 26px "Space Grotesk", sans-serif';
      hctx.textAlign = 'center';
      hctx.textBaseline = 'middle';
      hctx.fillStyle = '#f5b342';
      hctx.fillText('HARDIK', 128, 32);
      const hubTex = new THREE.CanvasTexture(hubC);
      const hubSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: hubTex, transparent: true, depthTest: false }));
      hubSprite.scale.set(3, 0.75, 1);
      hubSprite.position.set(0, 1.6, 0);
      scene.add(hubSprite);

      // Mouse interaction
      let isDown = false;
      let lastX = 0, lastY = 0;
      let yaw = 0.4, pitch = 0.2;
      let targetYaw = 0.4, targetPitch = 0.2;
      const ray = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      function onPointerDown(e) {
        isDown = true;
        const p = pointerPos(e);
        lastX = p.x; lastY = p.y;
      }
      function onPointerMove(e) {
        const p = pointerPos(e);
        if (isDown) {
          const dx = (p.x - lastX) / canvas.clientWidth;
          const dy = (p.y - lastY) / canvas.clientHeight;
          targetYaw += dx * 3;
          targetPitch = Math.max(-1.3, Math.min(1.3, targetPitch + dy * 3));
          lastX = p.x; lastY = p.y;
        }
        pointer.x = (p.x / canvas.clientWidth) * 2 - 1;
        pointer.y = -(p.y / canvas.clientHeight) * 2 + 1;
      }
      function onPointerUp() { isDown = false; }
      function onClick(e) {
        if (typeof e.detail === 'number' && e.detail > 1) return; // ignore double
        const p = pointerPos(e);
        pointer.x = (p.x / canvas.clientWidth) * 2 - 1;
        pointer.y = -(p.y / canvas.clientHeight) * 2 + 1;
        ray.setFromCamera(pointer, camera);
        const hits = ray.intersectObjects(allNodes, false);
        if (hits.length) {
          const d = hits[0].object.userData;
          info.innerHTML = `
            <div class="ci-name" style="color:#${d.color.toString(16).padStart(6, '0')}">${d.name}</div>
            <div class="ci-meta">${d.cat}</div>
          `;
        } else {
          info.innerHTML = `
            <div class="ci-name">Drag to explore</div>
            <div class="ci-meta muted">Click a node to inspect a skill</div>
          `;
        }
      }
      function pointerPos(e) {
        if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return { x: e.clientX, y: e.clientY };
      }
      canvas.addEventListener('mousedown', onPointerDown);
      canvas.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      canvas.addEventListener('click', onClick);
      canvas.addEventListener('touchstart', onPointerDown, { passive: true });
      canvas.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerUp);

      // Resize
      function resize() {
        const r = canvas.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / Math.max(r.height, 1);
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);
      new ResizeObserver(resize).observe(canvas);

      // Animate
      let raf;
      function tick() {
        targetYaw += 0.0015; // slow auto-rotation
        yaw += (targetYaw - yaw) * 0.08;
        pitch += (targetPitch - pitch) * 0.08;
        scene.rotation.y = yaw;
        scene.rotation.x = pitch;
        // gentle pulse on hub
        const s = 1 + Math.sin(performance.now() * 0.002) * 0.06;
        hub.scale.set(s, s, s);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      }
      tick();
      // Cleanup on page hide
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else tick();
      });
    }
  });
})();
