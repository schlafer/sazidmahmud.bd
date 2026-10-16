/**
 * Client interactions: Theme toggle & code block copy buttons
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCodeCopyButtons();
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
