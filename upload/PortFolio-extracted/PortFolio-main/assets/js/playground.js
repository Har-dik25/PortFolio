/* ============================================================
   playground.js — embedded Python (Pyodide) + JS code runner
   Loads Pyodide from CDN on first use. Falls back gracefully if offline.
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(async () => {
    const section = document.getElementById('playground');
    if (!section) return;

    section.innerHTML = `
      <div class="section-header">
        <span class="section-num">▶</span>
        <h2 class="section-title">Live Code Playground</h2>
        <div class="section-line"></div>
      </div>
      <p class="pg-lead">Try running Python right here. Powered by Pyodide (Python in WebAssembly).</p>
      <div class="pg-tabs" role="tablist">
        <button class="pg-tab active" data-lang="python" role="tab">Python</button>
        <button class="pg-tab" data-lang="js" role="tab">JavaScript</button>
      </div>
      <div class="pg-box">
        <div class="pg-side">
          <div class="pg-pane-header">Editor</div>
          <textarea id="pg-editor" spellcheck="false" aria-label="Code editor"></textarea>
          <div class="pg-pane-header">Output</div>
          <pre id="pg-output" aria-live="polite">Click "Run" to execute.</pre>
        </div>
        <div class="pg-controls">
          <button id="pg-run" class="pg-btn primary"><i class="fa-solid fa-play"></i> Run</button>
          <button id="pg-clear" class="pg-btn"><i class="fa-solid fa-eraser"></i> Clear</button>
          <button id="pg-sample" class="pg-btn"><i class="fa-solid fa-shuffle"></i> Sample</button>
        </div>
      </div>
      <div class="pg-snippets" id="pg-snippets"></div>
    `;

    const SNIPPETS = {
      python: [
        {
          name: 'Fibonacci',
          code: 'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nprint([fib(i) for i in range(10)])',
        },
        {
          name: 'List comprehension',
          code: 'words = ["AI", "ML", "RAG", "LLM", "agent"]\nlengths = [len(w) for w in words]\nprint(dict(zip(words, lengths)))',
        },
        {
          name: 'ML-style sigmoid',
          code: 'import math\ndef sigmoid(x):\n    return 1 / (1 + math.exp(-x))\n\nprint([round(sigmoid(x), 3) for x in [-2, -1, 0, 1, 2]])',
        },
      ],
      js: [
        {
          name: 'Map + filter',
          code: 'const nums = [1, 2, 3, 4, 5, 6];\nconst result = nums.filter(n => n % 2).map(n => n * n);\nconsole.log(result);',
        },
        {
          name: 'Fetch (simulated)',
          code: 'async function fakeFetch() {\n  return { user: "hardik", repos: 13 };\n}\nfakeFetch().then(d => console.log(d));',
        },
      ],
    };

    const editor = document.getElementById('pg-editor');
    const out = document.getElementById('pg-output');
    const runBtn = document.getElementById('pg-run');
    const clearBtn = document.getElementById('pg-clear');
    const sampleBtn = document.getElementById('pg-sample');
    const tabs = section.querySelectorAll('.pg-tab');
    const snippetList = document.getElementById('pg-snippets');
    let lang = 'python';
    let pyodide = null;
    let pyReady = false;

    function setLang(l) {
      lang = l;
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.lang === l));
      editor.value = SNIPPETS[l][0].code;
      out.textContent = 'Click "Run" to execute.';
      renderSnippets();
    }
    function renderSnippets() {
      snippetList.innerHTML = (SNIPPETS[lang] || []).map((s, i) =>
        `<button class="pg-snippet" data-idx="${i}">${s.name}</button>`
      ).join('');
      snippetList.querySelectorAll('.pg-snippet').forEach((b) => {
        b.addEventListener('click', () => {
          editor.value = SNIPPETS[lang][parseInt(b.dataset.idx, 10)].code;
        });
      });
    }
    tabs.forEach((t) => t.addEventListener('click', () => setLang(t.dataset.lang)));
    clearBtn.addEventListener('click', () => { out.textContent = ''; });
    sampleBtn.addEventListener('click', () => {
      const i = Math.floor(Math.random() * SNIPPETS[lang].length);
      editor.value = SNIPPETS[lang][i].code;
    });

    async function ensurePyodide() {
      if (pyodide) return pyodide;
      out.textContent = 'Loading Python runtime (~10MB on first use)…';
      try {
        // Load from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
        document.head.appendChild(script);
        await new Promise((res, rej) => { script.onload = res; script.onerror = rej; });
        pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
        pyodide.setStdout({ batched: (s) => appendOut(s + '\n') });
        pyodide.setStderr({ batched: (s) => appendOut('[stderr] ' + s + '\n') });
        pyReady = true;
        appendOut('Python ' + pyodide.runPython('import sys; print(sys.version.split()[0])') + '\n');
        return pyodide;
      } catch (e) {
        out.textContent = 'Could not load Python runtime (offline?): ' + e.message;
        throw e;
      }
    }
    function appendOut(s) {
      out.textContent += s;
      out.scrollTop = out.scrollHeight;
    }
    function clearOut() { out.textContent = ''; }

    async function runPython(code) {
      try {
        if (!pyReady) await ensurePyodide();
        clearOut();
        appendOut('> running python…\n');
        await pyodide.runPythonAsync(code);
      } catch (e) {
        appendOut('[error] ' + (e.message || e) + '\n');
      }
    }
    function runJS(code) {
      clearOut();
      appendOut('> running javascript…\n');
      // Custom console hook
      const log = [];
      const fakeConsole = {
        log: (...args) => log.push(args.map((a) => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        warn: (...args) => log.push('⚠ ' + args.join(' ')),
        error: (...args) => log.push('✗ ' + args.join(' ')),
        info: (...args) => log.push(args.join(' ')),
      };
      try {
        const fn = new Function('console', code);
        const result = fn(fakeConsole);
        if (result !== undefined) log.push('=> ' + (typeof result === 'object' ? JSON.stringify(result) : String(result)));
      } catch (e) {
        log.push('[error] ' + e.message);
      }
      appendOut(log.join('\n') + '\n');
    }

    runBtn.addEventListener('click', () => {
      const code = editor.value;
      if (!code.trim()) return;
      if (lang === 'python') runPython(code);
      else runJS(code);
    });

    // Keyboard: Ctrl/Cmd+Enter to run
    editor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runBtn.click();
      }
    });

    setLang('python');
  });
})();
