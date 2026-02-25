import type { PopupDialogConfig } from '../config-schemas';

export function generatePopupDialogScript(config: PopupDialogConfig): string {
  return `// ==UserScript==
// @name         LPO - Popup Dialog
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Customizable popup dialog for personalization
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  const CONFIG = ${JSON.stringify(
    {
      title: config.title,
      message: config.message,
      buttonText: config.buttonText,
      buttonUrl: config.buttonUrl,
      bgColor: config.bgColor,
      textColor: config.textColor,
      buttonBgColor: config.buttonBgColor,
      buttonTextColor: config.buttonTextColor,
      overlayColor: config.overlayColor,
      delaySeconds: config.delaySeconds,
    },
    null,
    2
  )};

  function createPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'lpo-popup-overlay';
    overlay.style.cssText = \`
      position: fixed; inset: 0; z-index: 99999;
      background: \${CONFIG.overlayColor};
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease;
    \`;

    const dialog = document.createElement('div');
    dialog.style.cssText = \`
      background: \${CONFIG.bgColor}; color: \${CONFIG.textColor};
      border-radius: 12px; padding: 32px; max-width: 420px; width: 90%;
      box-shadow: 0 25px 50px rgba(0,0,0,0.25);
      transform: scale(0.9); transition: transform 0.3s ease;
      text-align: center; font-family: system-ui, sans-serif;
    \`;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '\\u00d7';
    closeBtn.style.cssText = \`
      position: absolute; top: 8px; right: 12px;
      background: none; border: none; font-size: 24px;
      cursor: pointer; color: \${CONFIG.textColor}; opacity: 0.5;
    \`;
    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.5');

    dialog.style.position = 'relative';
    dialog.appendChild(closeBtn);

    const title = document.createElement('h2');
    title.textContent = CONFIG.title;
    title.style.cssText = 'margin: 0 0 12px; font-size: 24px; font-weight: 700;';
    dialog.appendChild(title);

    const msg = document.createElement('p');
    msg.textContent = CONFIG.message;
    msg.style.cssText = 'margin: 0 0 24px; font-size: 16px; line-height: 1.5; opacity: 0.85;';
    dialog.appendChild(msg);

    const btn = document.createElement('a');
    btn.href = CONFIG.buttonUrl;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.textContent = CONFIG.buttonText;
    btn.style.cssText = \`
      display: inline-block; padding: 12px 32px; border-radius: 8px;
      background: \${CONFIG.buttonBgColor}; color: \${CONFIG.buttonTextColor};
      text-decoration: none; font-weight: 600; font-size: 16px;
      transition: opacity 0.2s;
    \`;
    btn.addEventListener('mouseover', () => btn.style.opacity = '0.9');
    btn.addEventListener('mouseout', () => btn.style.opacity = '1');
    dialog.appendChild(btn);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function close() {
      overlay.style.opacity = '0';
      dialog.style.transform = 'scale(0.9)';
      setTimeout(() => overlay.remove(), 300);
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    });
  }

  setTimeout(createPopup, CONFIG.delaySeconds * 1000);
})();`;
}
