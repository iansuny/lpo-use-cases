import type { ExitIntentConfig } from '../config-schemas';

export function generateExitIntentScript(config: ExitIntentConfig): string {
  return `// ==UserScript==
// @name         LPO - Exit Intent Dialog
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Exit-intent popup with image and CTA
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  var STORAGE_KEY = 'lpo_exit_intent_shown';
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  var CONFIG = ${JSON.stringify(
    {
      title: config.title,
      message: config.message,
      imageUrl: config.imageUrl,
      buttonText: config.buttonText,
      buttonUrl: config.buttonUrl,
      bgColor: config.bgColor,
      textColor: config.textColor,
      buttonBgColor: config.buttonBgColor,
      buttonTextColor: config.buttonTextColor,
      overlayColor: config.overlayColor,
    },
    null,
    2
  )};

  var shown = false;

  document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 0 && !shown) {
      shown = true;
      sessionStorage.setItem(STORAGE_KEY, 'true');
      showDialog();
    }
  });

  function showDialog() {
    var style = document.createElement('style');
    style.id = 'lpo-exit-styles';
    style.textContent = \`
      .lpo-exit-overlay {
        position: fixed; inset: 0; z-index: 999999;
        background: \${CONFIG.overlayColor};
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.3s ease;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .lpo-exit-dialog {
        display: flex; border-radius: 12px; overflow: hidden;
        max-width: 640px; width: 90%;
        background: \${CONFIG.bgColor}; color: \${CONFIG.textColor};
        box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        transform: scale(0.9); transition: transform 0.3s ease;
      }
      .lpo-exit-img {
        width: 50%; object-fit: cover; display: block;
      }
      .lpo-exit-body {
        width: 50%; padding: 32px; display: flex; flex-direction: column;
        justify-content: center; position: relative;
      }
      .lpo-exit-close {
        position: absolute; top: 8px; right: 12px;
        background: none; border: none; font-size: 24px;
        cursor: pointer; color: \${CONFIG.textColor}; opacity: 0.5;
      }
      .lpo-exit-close:hover { opacity: 1; }
      .lpo-exit-title {
        margin: 0 0 12px; font-size: 20px; font-weight: 700;
      }
      .lpo-exit-msg {
        margin: 0 0 24px; font-size: 14px; line-height: 1.6; opacity: 0.85;
      }
      .lpo-exit-cta {
        display: inline-block; padding: 12px 24px; border-radius: 8px;
        background: \${CONFIG.buttonBgColor}; color: \${CONFIG.buttonTextColor};
        text-decoration: none; font-weight: 600; font-size: 14px;
        text-align: center; transition: opacity 0.2s;
      }
      .lpo-exit-cta:hover { opacity: 0.9; }
    \`;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'lpo-exit-overlay';
    overlay.innerHTML = '<div class="lpo-exit-dialog">'
      + '<img class="lpo-exit-img" src="' + CONFIG.imageUrl + '" alt="Offer" />'
      + '<div class="lpo-exit-body">'
      + '<button class="lpo-exit-close" id="lpo-exit-close">\\u00d7</button>'
      + '<h2 class="lpo-exit-title">' + CONFIG.title + '</h2>'
      + '<p class="lpo-exit-msg">' + CONFIG.message + '</p>'
      + '<a class="lpo-exit-cta" href="' + CONFIG.buttonUrl + '" target="_blank" rel="noopener">' + CONFIG.buttonText + '</a>'
      + '</div></div>';

    document.body.appendChild(overlay);

    function close() {
      overlay.style.opacity = '0';
      overlay.querySelector('.lpo-exit-dialog').style.transform = 'scale(0.9)';
      setTimeout(function() { overlay.remove(); }, 300);
    }

    document.getElementById('lpo-exit-close').addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });

    requestAnimationFrame(function() {
      overlay.style.opacity = '1';
      overlay.querySelector('.lpo-exit-dialog').style.transform = 'scale(1)';
    });
  }
})();`;
}
