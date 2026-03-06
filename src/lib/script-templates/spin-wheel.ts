import type { SpinWheelConfig } from '../config-schemas';

export function generateSpinWheelScript(config: SpinWheelConfig): string {
  return `// ==UserScript==
// @name         LPO - Spin Wheel
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Lucky spin wheel popup for gamified offers
// @match        ${config.matchUrl}
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';
  console.log('Script implemented.');

  const CONFIG = ${JSON.stringify(
    {
      primaryColor: config.primaryColor,
      ctaUrl: config.ctaUrl,
      delaySeconds: config.delaySeconds,
    },
    null,
    2
  )};

  const PRIZES = ['5% Cashback', 'NT$500 Bonus', 'Free Annual Fee', '3X Points', 'NT$200 Voucher', '2% Rebate'];
  const REDEMPTION_CODE = 'MC-LUCKY-2025';
  const SIZE = 260, CX = SIZE / 2, CY = SIZE / 2, R = SIZE / 2 - 4;
  const SLICE = (2 * Math.PI) / PRIZES.length;

  function createSpinWheel() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'lpo-spin-overlay';
    overlay.style.cssText = \`
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.3s ease;
      font-family: system-ui, sans-serif;
    \`;

    // Card
    const card = document.createElement('div');
    card.style.cssText = \`
      background: #fff; border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      transform: scale(0.9); transition: transform 0.3s ease;
      position: relative; display: flex; align-items: center;
      max-width: 600px; width: 90%;
    \`;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '\\u00d7';
    closeBtn.style.cssText = \`
      position: absolute; top: 8px; right: 12px;
      background: none; border: none; font-size: 24px;
      cursor: pointer; color: #666; opacity: 0.5; z-index: 1;
    \`;
    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.5');
    card.appendChild(closeBtn);

    // Left: wheel section
    const leftSection = document.createElement('div');
    leftSection.style.cssText = 'padding: 24px; text-align: center;';

    const title = document.createElement('h2');
    title.textContent = 'Spin to Win!';
    title.style.cssText = 'margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #111;';
    leftSection.appendChild(title);

    const sub = document.createElement('p');
    sub.textContent = 'Try your luck for an exclusive reward';
    sub.style.cssText = 'margin: 0 0 12px; font-size: 14px; color: #999;';
    leftSection.appendChild(sub);

    const canvasWrap = document.createElement('div');
    canvasWrap.style.cssText = \`position: relative; width: \${SIZE + 18}px; height: \${SIZE + 16}px; margin: 0 auto;\`;
    const canvas = document.createElement('canvas');
    canvas.width = SIZE + 18;
    canvas.height = SIZE;
    canvas.style.cssText = 'cursor: pointer; margin-top: 16px;';
    canvasWrap.appendChild(canvas);
    leftSection.appendChild(canvasWrap);

    const info = document.createElement('p');
    info.textContent = 'Click the wheel to spin';
    info.style.cssText = 'margin: 12px 0 0; font-size: 12px; color: #bbb;';
    leftSection.appendChild(info);

    card.appendChild(leftSection);

    // Right: result section
    const rightSection = document.createElement('div');
    rightSection.style.cssText = 'padding: 24px; text-align: center; min-width: 200px; flex: 1; border-left: 1px solid #f3f4f6;';
    rightSection.innerHTML = '<p style="font-size:14px;color:#bbb;">Click the wheel to spin</p>';

    card.appendChild(rightSection);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    const ctx = canvas.getContext('2d');
    let rotation = 0;
    let spinning = false;
    let used = false;

    function drawWheel(rot) {
      ctx.clearRect(0, 0, SIZE + 18, SIZE);
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(rot);
      for (let i = 0; i < PRIZES.length; i++) {
        const sa = i * SLICE, ea = sa + SLICE;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, R, sa, ea);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? CONFIG.primaryColor : CONFIG.primaryColor + '40';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.rotate(sa + SLICE / 2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = i % 2 === 0 ? '#fff' : '#333';
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillText(PRIZES[i], R - 14, 0);
        ctx.restore();
      }
      ctx.restore();
      // Center
      ctx.beginPath();
      ctx.arc(CX, CY, 24, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#333';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SPIN', CX, CY);
      // Pointer (right)
      ctx.beginPath();
      ctx.moveTo(SIZE - 4, CY);
      ctx.lineTo(SIZE + 14, CY - 10);
      ctx.lineTo(SIZE + 14, CY + 10);
      ctx.closePath();
      ctx.fillStyle = CONFIG.primaryColor;
      ctx.fill();
    }

    drawWheel(0);

    function spin() {
      if (spinning || used) return;
      spinning = true;
      info.textContent = 'Spinning...';
      rightSection.innerHTML = '<p style="font-size:14px;color:#bbb;">Spinning...</p>';

      const totalRot = (3 + Math.random() * 2) * 2 * Math.PI + Math.random() * 2 * Math.PI;
      const duration = 4000;
      const startTime = performance.now();
      const startRot = rotation;

      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        rotation = startRot + totalRot * ease;
        drawWheel(rotation);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          spinning = false;
          used = true;
          canvas.style.cursor = 'default';
          const finalAngle = (((-rotation) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const winIndex = Math.floor(finalAngle / SLICE) % PRIZES.length;
          showResult(PRIZES[winIndex]);
        }
      }
      requestAnimationFrame(animate);
    }

    function showResult(prize) {
      info.style.display = 'none';
      rightSection.innerHTML = \`
        <p style="font-size:14px;color:#999;margin:0 0 4px;">You won</p>
        <p style="font-size:20px;font-weight:700;color:\${CONFIG.primaryColor};margin:0 0 16px;">\${prize}</p>
        <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Redemption Code</p>
        <p style="font-size:18px;font-weight:700;font-family:monospace;letter-spacing:0.15em;color:\${CONFIG.primaryColor};margin:0 0 16px;">\${REDEMPTION_CODE}</p>
      \`;
      const copyBtn = document.createElement('button');
      copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code';
      copyBtn.style.cssText = \`
        display: inline-flex; align-items: center;
        padding: 10px 20px; border-radius: 8px; border: none;
        background: \${CONFIG.primaryColor}; color: #fff;
        font-weight: 600; font-size: 14px; cursor: pointer;
      \`;
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(REDEMPTION_CODE).then(() => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code';
          }, 2000);
        });
      });
      rightSection.appendChild(copyBtn);
    }

    canvas.addEventListener('click', spin);

    function close() {
      overlay.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => overlay.remove(), 300);
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      card.style.transform = 'scale(1)';
    });
  }

  setTimeout(createSpinWheel, CONFIG.delaySeconds * 1000);
})();`;
}
