import type { MiniPollConfig } from '../config-schemas';

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function generateMiniPollScript(config: MiniPollConfig): string {
  const dark = darkenHex(config.primaryColor, 30);
  const posLeft = config.buttonPosition === 'bottom-left';

  return `// ==UserScript==
// @name         LPO - Mini Poll (Multi-select)
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Floating button trigger with multi-select persona quiz
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  var CONFIG = ${JSON.stringify(
    {
      title: config.title,
      subtitle: config.subtitle,
      questionText: config.questionText,
      submitText: config.submitText,
      tooltipText: config.tooltipText,
      options: [
        { value: 'option1', label: config.option1Label, persona: 'The Foodie' },
        { value: 'option2', label: config.option2Label, persona: 'Globetrotter' },
        { value: 'option3', label: config.option3Label, persona: 'Deal Hunter' },
        { value: 'option4', label: config.option4Label, persona: 'Smart Saver' },
      ],
      primaryColor: config.primaryColor,
      primaryDark: dark,
      ctaUrl: config.ctaUrl,
      buttonPosition: config.buttonPosition,
      delaySeconds: config.delaySeconds,
      sessionKey: 'lpo_poll_persona',
      completedKey: 'lpo_poll_completed',
    },
    null,
    2
  )};

  if (sessionStorage.getItem(CONFIG.completedKey)) return;

  var style = document.createElement('style');
  style.textContent = \`
    .lpo-poll-fab {
      position: fixed; bottom: 30px;
      \${posLeft ? 'left: 30px;' : 'right: 30px;'}
      z-index: 999998; opacity: 0; transform: translateY(20px);
      transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .lpo-poll-fab.show { opacity: 1; transform: translateY(0); }
    .lpo-poll-fab-wrap { position: relative; }
    .lpo-poll-tooltip {
      position: absolute; top: 50%; transform: translateY(-50%);
      \${posLeft ? 'left: 70px;' : 'right: 70px;'}
      background: #fff; padding: 10px 16px; border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      font: 600 13px/1.4 system-ui,sans-serif; color: #1a1a1a;
      white-space: nowrap; pointer-events: none;
    }
    .lpo-poll-tooltip::after {
      content:''; position: absolute; top: 50%; transform: translateY(-50%);
      \${posLeft
        ? 'left: -8px; border-right: 8px solid #fff; border-top: 8px solid transparent; border-bottom: 8px solid transparent;'
        : 'right: -8px; border-left: 8px solid #fff; border-top: 8px solid transparent; border-bottom: 8px solid transparent;'
      }
    }
    .lpo-poll-btn {
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      border: none; box-shadow: 0 4px 20px \${CONFIG.primaryColor}66;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.25s; position: relative;
    }
    .lpo-poll-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px \${CONFIG.primaryColor}80; }
    .lpo-poll-btn svg { width: 26px; height: 26px; fill: #fff; position: relative; z-index: 1; }
    .lpo-poll-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      display: none; align-items: center; justify-content: center;
      z-index: 999999; backdrop-filter: blur(3px); opacity: 0;
      transition: opacity 0.3s;
    }
    .lpo-poll-overlay.show { display: flex; opacity: 1; }
    .lpo-poll-popup {
      background: #fff; border-radius: 20px; padding: 44px 36px;
      max-width: 520px; width: 90%; position: relative;
      box-shadow: 0 25px 80px rgba(0,0,0,0.4);
      transform: translateY(-30px); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      font-family: system-ui,sans-serif;
    }
    .lpo-poll-overlay.show .lpo-poll-popup { transform: translateY(0); }
    .lpo-poll-x {
      position: absolute; top: 16px; right: 16px; background: none; border: none;
      font-size: 24px; color: #aaa; cursor: pointer; width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center; border-radius: 50%;
      transition: all 0.2s;
    }
    .lpo-poll-x:hover { background: #f5f5f5; color: #555; }
    .lpo-poll-hdr { text-align: center; margin-bottom: 28px; }
    .lpo-poll-icon {
      width: 72px; height: 72px; margin: 0 auto 16px;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 24px \${CONFIG.primaryColor}4d;
    }
    .lpo-poll-icon svg { width: 36px; height: 36px; fill: #fff; }
    .lpo-poll-h1 { font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 0 0 6px; }
    .lpo-poll-sub { font-size: 13px; color: #666; }
    .lpo-poll-q { font-size: 18px; font-weight: 600; color: #1a1a1a; text-align: center; margin-bottom: 24px; }
    .lpo-poll-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
    .lpo-poll-opt {
      padding: 16px; font: 600 14px/1.3 system-ui,sans-serif; background: #fff;
      border: 2.5px solid #e8e8e8; border-radius: 12px; cursor: pointer;
      transition: all 0.25s; color: #333; text-align: center; user-select: none;
    }
    .lpo-poll-opt:hover { border-color: \${CONFIG.primaryColor}; background: \${CONFIG.primaryColor}0d; transform: translateY(-2px); }
    .lpo-poll-opt.sel { border-color: \${CONFIG.primaryColor}; background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark}); color: #fff; }
    .lpo-poll-help { text-align: center; color: #999; font-size: 12px; margin-bottom: 16px; }
    .lpo-poll-submit {
      width: 100%; padding: 14px; font: 600 15px/1 system-ui,sans-serif;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      color: #fff; border: none; border-radius: 12px; cursor: pointer;
      transition: all 0.25s; box-shadow: 0 4px 16px \${CONFIG.primaryColor}4d;
      opacity: 0.5; pointer-events: none;
    }
    .lpo-poll-submit.on { opacity: 1; pointer-events: auto; }
    .lpo-poll-submit.on:hover { transform: translateY(-2px); }
    .lpo-poll-result { text-align: center; display: none; }
    .lpo-poll-result.active { display: block; animation: lpoFade 0.4s ease; }
    @keyframes lpoFade { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .lpo-poll-result h2 { font-size: 26px; color: \${CONFIG.primaryColor}; font-weight: 700; margin: 0 0 12px; }
    .lpo-poll-result p { color: #555; font-size: 15px; margin: 0 0 16px; }
    .lpo-poll-badge {
      display: inline-block; background: \${CONFIG.primaryColor}0d; color: \${CONFIG.primaryColor};
      font: 700 18px/1 system-ui,sans-serif; padding: 10px 24px; border-radius: 10px;
      border: 2px solid \${CONFIG.primaryColor}; margin: 8px 0 16px;
    }
    .lpo-poll-done {
      padding: 12px 32px; font: 600 15px/1 system-ui,sans-serif;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      color: #fff; border: none; border-radius: 10px; cursor: pointer;
      transition: all 0.25s; box-shadow: 0 4px 16px \${CONFIG.primaryColor}4d;
    }
    .lpo-poll-done:hover { transform: translateY(-2px); }
    .lpo-poll-res-icon {
      width: 80px; height: 80px; margin: 0 auto 16px;
      background: linear-gradient(135deg, \${CONFIG.primaryColor}, \${CONFIG.primaryDark});
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 30px \${CONFIG.primaryColor}4d;
    }
    .lpo-poll-res-icon svg { width: 40px; height: 40px; fill: #fff; }
  \`;
  document.head.appendChild(style);

  setTimeout(function() {
    var optionsHTML = CONFIG.options.map(function(o) {
      return '<div class="lpo-poll-opt" data-value="' + o.value + '">' + o.label + '</div>';
    }).join('');

    var html = '<div class="lpo-poll-fab" id="lpoPollFab">'
      + '<div class="lpo-poll-fab-wrap">'
      + '<div class="lpo-poll-tooltip">' + CONFIG.tooltipText + '</div>'
      + '<button class="lpo-poll-btn" id="lpoPollTrigger">'
      + '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>'
      + '</button></div></div>'
      + '<div class="lpo-poll-overlay" id="lpoPollOverlay"><div class="lpo-poll-popup">'
      + '<button class="lpo-poll-x" id="lpoPollClose">\\u00d7</button>'
      + '<div class="lpo-poll-hdr"><div class="lpo-poll-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg></div>'
      + '<h1 class="lpo-poll-h1">' + CONFIG.title + '</h1>'
      + '<p class="lpo-poll-sub">' + CONFIG.subtitle + '</p></div>'
      + '<div id="lpoPollQ"><div class="lpo-poll-q">' + CONFIG.questionText + '</div>'
      + '<div class="lpo-poll-opts">' + optionsHTML + '</div>'
      + '<div class="lpo-poll-help">Select at least one option</div>'
      + '<button class="lpo-poll-submit" id="lpoPollSubmit">' + CONFIG.submitText + '</button></div>'
      + '<div class="lpo-poll-result" id="lpoPollResult">'
      + '<div class="lpo-poll-res-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>'
      + '<h2>Thank You!</h2><p>Your personalized experience is ready</p>'
      + '<div class="lpo-poll-badge" id="lpoPersonaId"></div>'
      + '<p id="lpoPersonaDesc" style="color:#666;font-size:13px;"></p>'
      + '<a class="lpo-poll-done" id="lpoPollFinish" href="' + CONFIG.ctaUrl + '" target="_blank" rel="noopener" style="text-decoration:none;display:inline-block;">Apply Now</a>'
      + '</div></div></div>';

    document.body.insertAdjacentHTML('beforeend', html);

    var fab = document.getElementById('lpoPollFab');
    var overlay = document.getElementById('lpoPollOverlay');
    var submitBtn = document.getElementById('lpoPollSubmit');
    var questionDiv = document.getElementById('lpoPollQ');
    var resultDiv = document.getElementById('lpoPollResult');
    var selected = new Set();

    setTimeout(function() { fab.classList.add('show'); }, 100);

    document.getElementById('lpoPollTrigger').addEventListener('click', function() {
      overlay.classList.add('show');
      fab.style.display = 'none';
    });

    document.querySelectorAll('.lpo-poll-opt').forEach(function(opt) {
      opt.addEventListener('click', function() {
        var v = this.dataset.value;
        if (selected.has(v)) { selected.delete(v); this.classList.remove('sel'); }
        else { selected.add(v); this.classList.add('sel'); }
        submitBtn.classList.toggle('on', selected.size > 0);
      });
    });

    submitBtn.addEventListener('click', function() {
      if (selected.size === 0) return;
      var labels = [];
      var persona = '';
      CONFIG.options.forEach(function(o) {
        if (selected.has(o.value)) {
          labels.push(o.label);
          if (!persona) persona = o.persona;
        }
      });
      document.getElementById('lpoPersonaId').textContent = persona;
      document.getElementById('lpoPersonaDesc').textContent = labels.join(' \\u2022 ');
      questionDiv.style.display = 'none';
      resultDiv.classList.add('active');
      sessionStorage.setItem(CONFIG.sessionKey, JSON.stringify(Array.from(selected)));
      sessionStorage.setItem(CONFIG.completedKey, 'true');
    });

    function close() {
      overlay.classList.remove('show');
      if (!resultDiv.classList.contains('active')) {
        setTimeout(function() { fab.style.display = 'block'; }, 300);
      }
    }
    document.getElementById('lpoPollClose').addEventListener('click', close);
    document.getElementById('lpoPollFinish').addEventListener('click', close);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
  }, CONFIG.delaySeconds * 1000);
})();`;
}
