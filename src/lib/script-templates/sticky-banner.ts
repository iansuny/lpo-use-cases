import type { StickyBannerConfig } from '../config-schemas';

export function generateStickyBannerScript(config: StickyBannerConfig): string {
  return `// ==UserScript==
// @name         LPO - Sticky Banner
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Customizable sticky banner for personalization
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  const CONFIG = ${JSON.stringify(
    {
      message: config.message,
      linkText: config.linkText,
      linkUrl: config.linkUrl,
      position: config.position,
      bgColor: config.bgColor,
      textColor: config.textColor,
      linkColor: config.linkColor,
      showCloseButton: config.showCloseButton,
    },
    null,
    2
  )};

  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'lpo-sticky-banner';
    banner.style.cssText = \`
      position: fixed; left: 0; right: 0; z-index: 99999;
      \${CONFIG.position === 'top' ? 'top: 0;' : 'bottom: 0;'}
      background: \${CONFIG.bgColor}; color: \${CONFIG.textColor};
      padding: 12px 20px; font-family: system-ui, sans-serif;
      display: flex; align-items: center; justify-content: center; gap: 12px;
      font-size: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transform: translateY(\${CONFIG.position === 'top' ? '-100%' : '100%'});
      transition: transform 0.4s ease;
    \`;

    const text = document.createElement('span');
    text.textContent = CONFIG.message;
    banner.appendChild(text);

    const link = document.createElement('a');
    link.href = CONFIG.linkUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = CONFIG.linkText;
    link.style.cssText = \`
      color: \${CONFIG.linkColor}; font-weight: 600;
      text-decoration: underline; white-space: nowrap;
    \`;
    banner.appendChild(link);

    if (CONFIG.showCloseButton === 'yes') {
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '\\u00d7';
      closeBtn.style.cssText = \`
        background: none; border: none; color: \${CONFIG.textColor};
        font-size: 20px; cursor: pointer; margin-left: 8px;
        opacity: 0.7; padding: 0 4px;
      \`;
      closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
      closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.7');
      closeBtn.addEventListener('click', () => {
        banner.style.transform = \`translateY(\${CONFIG.position === 'top' ? '-100%' : '100%'})\`;
        setTimeout(() => banner.remove(), 400);
      });
      banner.appendChild(closeBtn);
    }

    document.body.appendChild(banner);

    requestAnimationFrame(() => {
      banner.style.transform = 'translateY(0)';
    });
  }

  createBanner();
})();`;
}
