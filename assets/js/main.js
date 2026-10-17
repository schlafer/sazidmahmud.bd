/**
 * Client interactions: Theme toggle & code block copy buttons
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCodeCopyButtons();
  initRainAnimation();
});

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  function updateButtonLabel(setting) {
    if (setting === 'light') {
      toggleBtn.title = "Theme: Light (click for Dark)";
      toggleBtn.setAttribute('aria-label', "Current theme is Light. Click to switch to Dark.");
    } else if (setting === 'dark') {
      toggleBtn.title = "Theme: Dark (click for System Auto)";
      toggleBtn.setAttribute('aria-label', "Current theme is Dark. Click to switch to System Auto.");
    } else {
      toggleBtn.title = "Theme: Auto / System (click for Light)";
      toggleBtn.setAttribute('aria-label', "Current theme is System Auto. Click to switch to Light.");
    }
  }

  // Set initial tooltip
  const initialSetting = document.documentElement.getAttribute('data-theme-setting') || 'auto';
  updateButtonLabel(initialSetting);

  toggleBtn.addEventListener('click', () => {
    const currentSetting = document.documentElement.getAttribute('data-theme-setting') || 'auto';
    let nextSetting = 'auto';

    if (currentSetting === 'auto') {
      nextSetting = 'light';
    } else if (currentSetting === 'light') {
      nextSetting = 'dark';
    } else {
      nextSetting = 'auto';
    }

    let effectiveTheme = 'light';
    if (nextSetting === 'dark') {
      effectiveTheme = 'dark';
    } else if (nextSetting === 'light') {
      effectiveTheme = 'light';
    } else {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = isDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.dataset.theme = effectiveTheme;
    document.documentElement.setAttribute('data-theme-setting', nextSetting);

    try {
      localStorage.setItem('theme', nextSetting);
    } catch (e) {}

    updateButtonLabel(nextSetting);
  });

  // Listen to system color scheme changes when on auto
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentSetting = document.documentElement.getAttribute('data-theme-setting') || 'auto';
      if (currentSetting === 'auto') {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.dataset.theme = theme;
      }
    });
  }
}

function initCodeCopyButtons() {
  const highlightContainers = document.querySelectorAll('.highlight');

  highlightContainers.forEach((container) => {
    const codeEl = container.querySelector('.lntd:last-child pre > code') || container.querySelector('pre > code');
    if (!codeEl) return;

    // Check if button already exists
    if (container.querySelector('.copy-code-btn')) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.type = 'button';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.textContent = 'Copy';

    copyBtn.addEventListener('click', async () => {
      const codeText = codeEl.innerText || codeEl.textContent;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(codeText);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = codeText;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = 'var(--accent)';
        copyBtn.style.borderColor = 'var(--accent)';

        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        copyBtn.textContent = 'Failed';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      }
    });

    container.appendChild(copyBtn);
  });
}

/**
 * Ambient Rain Animation (Optimized: batched strokes, capped DPR, no lag)
 */
function initRainAnimation() {
  const canvas = document.getElementById('rain-canvas');
  if (!canvas) return;

  // Respect prefers-reduced-motion for accessibility
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let drops = [];
  let animId = null;

  function getIsDark() {
    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'dark') return true;
    if (explicit === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  let isDark = getIsDark();

  // Watch for theme changes (manual toggle or OS preference)
  const themeObserver = new MutationObserver(() => {
    isDark = getIsDark();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      isDark = getIsDark();
    });
  }

  function resize() {
    // Cap DPR to 1.5 to prevent massive 4K/5K canvas allocations on Retina screens
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initDrops();
  }

  function createDrop(randomY = false) {
    // 3 depth layers: 0 (distant/faint), 1 (midground), 2 (foreground/accent)
    const rand = Math.random();
    const layer = rand < 0.55 ? 0 : (rand < 0.85 ? 1 : 2);

    const speed = layer === 0 ? 7 + Math.random() * 3 : (layer === 1 ? 12 + Math.random() * 4 : 18 + Math.random() * 5);
    const length = layer === 0 ? 12 + Math.random() * 5 : (layer === 1 ? 18 + Math.random() * 6 : 26 + Math.random() * 8);
    const slant = 0.16; // Gentle diagonal breeze

    // Distribute drops: favor side margins where they are fully visible
    let x;
    const centerWidth = 720;
    if (width > 850) {
      const margin = (width - centerWidth) / 2;
      if (Math.random() < 0.72) {
        x = Math.random() < 0.5 ? Math.random() * margin : (width - margin) + Math.random() * margin;
      } else {
        x = margin + Math.random() * centerWidth;
      }
    } else {
      x = Math.random() * (width + 60) - 30;
    }

    return {
      x: x,
      y: randomY ? Math.random() * height : -length - 10,
      length: length,
      speed: speed,
      layer: layer,
      slant: slant
    };
  }

  function initDrops() {
    // Gentle drizzle density: roughly 50-75 drops on desktop, 30 on mobile
    const count = Math.max(30, Math.min(75, Math.floor(width * 0.05)));
    drops = [];
    for (let i = 0; i < count; i++) {
      drops.push(createDrop(true));
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Color palette based on theme:
    // Light mode: soft warm slate-gray
    // Dark mode: faint luminous cool white-blue
    const r = isDark ? 210 : 80;
    const g = isDark ? 225 : 75;
    const b = isDark ? 240 : 70;

    // Batch draw calls by layer (only 3 stroke calls per frame instead of 80)
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      ctx.lineWidth = layer === 0 ? 0.75 : (layer === 1 ? 1.05 : 1.35);
      const opacity = layer === 0 ? 0.09 : (layer === 1 ? 0.14 : 0.20);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        if (d.layer !== layer) continue;

        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.length * d.slant, d.y + d.length);

        // Update position inside the loop
        d.x += d.speed * d.slant;
        d.y += d.speed;

        // Wrap around when falling past bottom or right bounds
        if (d.y > height + 20 || d.x > width + 80) {
          drops[i] = createDrop(false);
        }
      }
      ctx.stroke();
    }

    animId = requestAnimationFrame(render);
  }

  // Battery saving: pause when tab is inactive/hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    }
  });

  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  resize();
  animId = requestAnimationFrame(render);
}
