import type { CountdownOfferConfig } from '../config-schemas';

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function generateCountdownOfferScript(config: CountdownOfferConfig): string {
  const dark = darkenHex(config.primaryColor, 30);
  const targetDate = new Date(Date.now() + config.countdownMinutes * 60 * 1000).toISOString().slice(0, 19);

  return `// ==UserScript==
// @name         LPO - Countdown Bar
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      2.0
// @description  Fixed bottom countdown timer bar with social proof
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  var CONFIG = ${JSON.stringify(
    {
      targetDate,
      offerTitle: config.offerTitle,
      cashbackAmount: config.cashbackAmount,
      ctaText: config.ctaText,
      ctaUrl: config.ctaUrl,
      primaryColor: config.primaryColor,
      primaryDark: dark,
      showOnce: false,
      storageKey: 'lpo_countdown_dismissed',
      socialProof: {
        enabled: config.socialProofEnabled === 'yes',
        count: config.socialProofCount,
        text: config.socialProofText,
      },
    },
    null,
    2
  )};

  if (CONFIG.showOnce && sessionStorage.getItem(CONFIG.storageKey)) return;

  var style = document.createElement('style');
  style.id = 'lpo-countdown-styles';
  style.textContent = \`
    .lpo-cd-bar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      color: #fff; font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.3);
      animation: lpo-cd-up 0.5s cubic-bezier(0.16,1,0.3,1);
    }
    @keyframes lpo-cd-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .lpo-cd-bar.closing { animation: lpo-cd-down 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
    @keyframes lpo-cd-down { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
    .lpo-cd-inner {
      max-width: 1400px; margin: 0 auto; padding: 12px 28px;
      display: flex; align-items: center; justify-content: space-between; gap: 18px;
    }
    .lpo-cd-content { display: flex; align-items: center; gap: 18px; flex: 1; }
    .lpo-cd-icon {
      width: 42px; height: 42px; background: #fff; border-radius: 50%;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .lpo-cd-icon svg { width: 20px; height: 20px; fill: \${CONFIG.primaryColor}; }
    .lpo-cd-badge {
      display: inline-block; background: rgba(255,255,255,0.25);
      font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 10px;
      margin-bottom: 4px; letter-spacing: 0.8px; text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .lpo-cd-title { font-size: 18px; font-weight: 700; margin: 0; line-height: 1.2; }
    .lpo-cd-social { display: flex; align-items: center; gap: 5px; margin-top: 5px; font-size: 11px; opacity: 0.95; }
    .lpo-cd-social b { color: #fff; }
    .lpo-cd-timer { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
    .lpo-cd-unit {
      background: rgba(255,255,255,0.15); border-radius: 6px; padding: 6px 10px;
      min-width: 50px; text-align: center; border: 1px solid rgba(255,255,255,0.2);
    }
    .lpo-cd-val { font-size: 20px; font-weight: 800; line-height: 1; display: block; margin-bottom: 2px; }
    .lpo-cd-lbl { font-size: 9px; opacity: 0.85; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
    .lpo-cd-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .lpo-cd-cta {
      padding: 11px 24px; font-size: 14px; font-weight: 700; background: #fff;
      color: \${CONFIG.primaryColor}; border: none; border-radius: 8px; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15); text-transform: uppercase;
      letter-spacing: 0.5px; white-space: nowrap; text-decoration: none;
      display: inline-block; transition: all 0.3s;
    }
    .lpo-cd-cta:hover { background: #f8f9fa; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
    .lpo-cd-close {
      background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
      color: #fff; font-size: 18px; cursor: pointer; width: 28px; height: 28px;
      display: flex; align-items: center; justify-content: center; border-radius: 50%;
      transition: all 0.2s; line-height: 1; flex-shrink: 0;
    }
    .lpo-cd-close:hover { background: rgba(255,255,255,0.3); transform: rotate(90deg); }
  \`;
  document.head.appendChild(style);

  var socialHTML = CONFIG.socialProof.enabled
    ? '<div class="lpo-cd-social"><span>\\ud83d\\udc65</span><span><b>' + CONFIG.socialProof.count.toLocaleString() + '</b> ' + CONFIG.socialProof.text + '</span></div>'
    : '';

  var html = '<div class="lpo-cd-bar" id="lpo-cd-bar"><div class="lpo-cd-inner">'
    + '<div class="lpo-cd-content">'
    + '<div class="lpo-cd-icon"><svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg></div>'
    + '<div><div class="lpo-cd-badge">\\u26a1 Limited Time</div>'
    + '<h2 class="lpo-cd-title">' + CONFIG.offerTitle + ' - ' + CONFIG.cashbackAmount + ' Cashback</h2>'
    + socialHTML + '</div>'
    + '<div class="lpo-cd-timer">'
    + '<div class="lpo-cd-unit"><span class="lpo-cd-val" id="lpo-d">00</span><span class="lpo-cd-lbl">Days</span></div>'
    + '<div class="lpo-cd-unit"><span class="lpo-cd-val" id="lpo-h">00</span><span class="lpo-cd-lbl">Hours</span></div>'
    + '<div class="lpo-cd-unit"><span class="lpo-cd-val" id="lpo-m">00</span><span class="lpo-cd-lbl">Mins</span></div>'
    + '<div class="lpo-cd-unit"><span class="lpo-cd-val" id="lpo-s">00</span><span class="lpo-cd-lbl">Secs</span></div>'
    + '</div></div>'
    + '<div class="lpo-cd-actions">'
    + '<a href="' + CONFIG.ctaUrl + '" class="lpo-cd-cta" target="_blank" rel="noopener">' + CONFIG.ctaText + '</a>'
    + '<button class="lpo-cd-close" id="lpo-cd-close">\\u00d7</button>'
    + '</div></div></div>';

  document.body.insertAdjacentHTML('beforeend', html);

  var target = new Date(CONFIG.targetDate).getTime();
  var interval;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var dist = Math.max(0, target - Date.now());
    document.getElementById('lpo-d').textContent = pad(Math.floor(dist / 86400000));
    document.getElementById('lpo-h').textContent = pad(Math.floor((dist % 86400000) / 3600000));
    document.getElementById('lpo-m').textContent = pad(Math.floor((dist % 3600000) / 60000));
    document.getElementById('lpo-s').textContent = pad(Math.floor((dist % 60000) / 1000));
    if (dist === 0) clearInterval(interval);
  }
  tick();
  interval = setInterval(tick, 1000);

  document.getElementById('lpo-cd-close').addEventListener('click', function() {
    var bar = document.getElementById('lpo-cd-bar');
    bar.classList.add('closing');
    if (CONFIG.showOnce) sessionStorage.setItem(CONFIG.storageKey, 'true');
    setTimeout(function() { bar.remove(); clearInterval(interval); }, 400);
  });
})();`;
}
