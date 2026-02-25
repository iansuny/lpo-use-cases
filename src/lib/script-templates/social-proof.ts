import type { SocialProofConfig } from '../config-schemas';

export function generateSocialProofScript(config: SocialProofConfig): string {
  const isRight = config.position === 'bottom-right';

  return `// ==UserScript==
// @name         LPO - Social Proof
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Floating CTA button with social proof bubble
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  var CONFIG = ${JSON.stringify(
    {
      proofCount: config.proofCount,
      proofText: config.proofText,
      buttonText: config.buttonText,
      buttonUrl: config.buttonUrl,
      bgColor: config.bgColor,
      textColor: config.textColor,
    },
    null,
    2
  )};

  var ARROW_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  var style = document.createElement('style');
  style.id = 'lpo-sp-styles';
  style.textContent = \`
    .lpo-sp-wrap {
      position: fixed; bottom: 28px; ${isRight ? 'right: 28px;' : 'left: 28px;'}
      z-index: 999999;
      display: flex; flex-direction: column;
      align-items: ${isRight ? 'flex-end' : 'flex-start'};
      opacity: 0; transform: translateY(24px) scale(0.9);
      animation: lpo-sp-in 0.6s 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }

    .lpo-sp-bubble {
      background: #ffffff; color: #374151;
      font: 400 12px/1.4 system-ui, -apple-system, sans-serif;
      padding: 10px 14px; border-radius: 12px;
      margin-bottom: 13px; max-width: 210px;
      box-shadow: 0 1px 6px rgba(0,0,0,0.1);
      position: relative;
      opacity: 0; transform: translateY(6px);
      animation: lpo-sp-bubble-in 0.4s 1s cubic-bezier(0.16,1,0.3,1) forwards;
    }
    .lpo-sp-bubble strong { font-weight: 700; }
    .lpo-sp-bubble::after {
      content: '';
      position: absolute; bottom: -6px;
      ${isRight ? 'right: 20px;' : 'left: 20px;'}
      width: 0; height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #ffffff;
    }

    .lpo-sp-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 18px; border-radius: 10px; border: none;
      background: \${CONFIG.bgColor}; color: \${CONFIG.textColor};
      font: 600 13px/1 system-ui, -apple-system, sans-serif;
      text-decoration: none; white-space: nowrap; cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    }
    .lpo-sp-btn .lpo-sp-arrow {
      opacity: 0.7; flex-shrink: 0;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    }

    @keyframes lpo-sp-in {
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes lpo-sp-bubble-in {
      to { opacity: 1; transform: translateY(0); }
    }

    .lpo-sp-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    .lpo-sp-btn:hover .lpo-sp-arrow {
      transform: translateX(3px);
    }
    .lpo-sp-btn:active {
      transform: translateY(0) scale(0.98);
    }
  \`;
  document.head.appendChild(style);

  var wrap = document.createElement('div');
  wrap.className = 'lpo-sp-wrap';

  var bubble = document.createElement('div');
  bubble.className = 'lpo-sp-bubble';
  bubble.innerHTML = '<strong>' + CONFIG.proofCount.toLocaleString() + '</strong> ' + CONFIG.proofText;

  var btn = document.createElement('a');
  btn.className = 'lpo-sp-btn';
  btn.href = CONFIG.buttonUrl;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.innerHTML = CONFIG.buttonText + ' <span class="lpo-sp-arrow">' + ARROW_ICON + '</span>';

  wrap.appendChild(bubble);
  wrap.appendChild(btn);
  document.body.appendChild(wrap);
})();`;
}
