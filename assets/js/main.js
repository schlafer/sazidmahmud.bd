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

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      // localStorage may be disabled
    }
  });

  // Listen to system color scheme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('theme')) {
          document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
        }
      } catch (err) {}
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
