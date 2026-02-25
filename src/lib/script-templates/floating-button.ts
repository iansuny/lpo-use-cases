import type { FloatingButtonConfig } from '../config-schemas';

export function generateFloatingButtonScript(config: FloatingButtonConfig): string {
  const isRight = config.position === 'bottom-right';

  return `// ==UserScript==
// @name         LPO - Floating Button
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Fixed floating CTA button
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  var CONFIG = ${JSON.stringify(
    {
      buttonText: config.buttonText,
      buttonUrl: config.buttonUrl,
      bgColor: config.bgColor,
      textColor: config.textColor,
    },
    null,
    2
  )};

  var CARD_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>';

  var style = document.createElement('style');
  style.id = 'lpo-fab-styles';
  style.textContent = \`
    .lpo-fab {
      position: fixed; bottom: 28px; ${isRight ? 'right: 28px;' : 'left: 28px;'}
      z-index: 999999;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 80px; height: 80px;
      border-radius: 50%; border: none;
      background: \${CONFIG.bgColor}; color: \${CONFIG.textColor};
      font-family: system-ui, -apple-system, sans-serif;
      text-decoration: none; cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
      opacity: 0; transform: translateY(24px) scale(0.9);
      animation: lpo-fab-in 0.6s 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }
    .lpo-fab-icon { margin-bottom: 3px; }
    .lpo-fab-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.03em;
      white-space: nowrap;
    }
    @keyframes lpo-fab-in {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .lpo-fab:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    .lpo-fab:active {
      transform: translateY(0) scale(0.95);
    }
  \`;
  document.head.appendChild(style);

  var btn = document.createElement('a');
  btn.className = 'lpo-fab';
  btn.href = CONFIG.buttonUrl;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.innerHTML = '<span class="lpo-fab-icon">' + CARD_ICON + '</span>'
    + '<span class="lpo-fab-label">' + CONFIG.buttonText + '</span>';
  document.body.appendChild(btn);
})();`;
}
