import type { ScratchCardConfig } from '../config-schemas';

export function generateScratchCardScript(config: ScratchCardConfig): string {
  return `// ==UserScript==
// @name         LPO - Scratch Card
// @namespace    https://github.com/iansun/lpo-use-cases
// @version      1.0
// @description  Scratch card popup for gamified offers
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
    },
    null,
    2
  )};

  const REDEMPTION_CODE = 'MC-CASHBACK-2025';
  const W = 280, H = 120;

  function createScratchCard() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'lpo-scratch-overlay';
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
      background: #fff; border-radius: 12px; padding: 32px;
      max-width: 380px; width: 90%; text-align: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      transform: scale(0.9); transition: transform 0.3s ease;
    \`;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '\\u00d7';
    closeBtn.style.cssText = \`
      position: absolute; top: 8px; right: 12px;
      background: none; border: none; font-size: 24px;
      cursor: pointer; color: #666; opacity: 0.5;
    \`;
    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.5');
    card.style.position = 'relative';
    card.appendChild(closeBtn);

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Scratch to Reveal Your Offer!';
    title.style.cssText = 'margin: 0 0 4px; font-size: 20px; font-weight: 700; color: #111;';
    card.appendChild(title);

    const sub = document.createElement('p');
    sub.textContent = 'Use your mouse to scratch the card below';
    sub.style.cssText = 'margin: 0 0 16px; font-size: 14px; color: #999;';
    card.appendChild(sub);

    // Scratch container
    const container = document.createElement('div');
    container.style.cssText = \`
      position: relative; width: \${W}px; height: \${H}px;
      margin: 0 auto; border-radius: 8px; overflow: hidden;
      user-select: none; -webkit-user-select: none;
    \`;

    // Prize layer
    const prize = document.createElement('div');
    prize.style.cssText = \`
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 4px;
      background: \${CONFIG.primaryColor}15;
    \`;
    prize.innerHTML = \`
      <span style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.1em;">Your Redemption Code</span>
      <span style="font-size:24px;font-weight:700;font-family:monospace;letter-spacing:0.15em;color:\${CONFIG.primaryColor};">\${REDEMPTION_CODE}</span>
      <span style="font-size:12px;color:#999;">5% cashback on your first purchase</span>
    \`;
    container.appendChild(prize);

    // Canvas
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText = 'position:absolute;inset:0;cursor:pointer;touch-action:none;';
    container.appendChild(canvas);
    card.appendChild(container);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code';
    copyBtn.style.cssText = \`
      display: inline-flex; align-items: center; margin-top: 16px;
      padding: 12px 24px; border-radius: 8px; border: none;
      background: \${CONFIG.primaryColor}; color: #fff;
      font-weight: 600; font-size: 16px; cursor: not-allowed;
      opacity: 0.3; transition: opacity 0.3s;
    \`;
    copyBtn.disabled = true;
    copyBtn.addEventListener('mouseover', () => copyBtn.style.opacity = '0.9');
    copyBtn.addEventListener('mouseout', () => copyBtn.style.opacity = '1');
    copyBtn.addEventListener('click', () => {
      if (!unlocked) return;
      navigator.clipboard.writeText(REDEMPTION_CODE).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code';
        }, 2000);
      });
    });
    card.appendChild(copyBtn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Init canvas
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch Here', W / 2, H / 2);

    let scratching = false;
    let unlocked = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function doScratch(e) {
      if (!scratching) return;
      const pos = getPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fill();
    }

    function checkUnlock() {
      if (unlocked) return;
      const data = ctx.getImageData(0, 0, W, H).data;
      let t = 0;
      for (let i = 3; i < data.length; i += 4) { if (data[i] === 0) t++; }
      if (t / (W * H) > 0.5) {
        unlocked = true;
        copyBtn.style.opacity = '1';
        copyBtn.style.cursor = 'pointer';
        copyBtn.disabled = false;
      }
    }

    canvas.addEventListener('mousedown', (e) => { e.preventDefault(); scratching = true; doScratch(e); });
    canvas.addEventListener('mousemove', (e) => { e.preventDefault(); doScratch(e); });
    canvas.addEventListener('mouseup', () => { scratching = false; checkUnlock(); });
    canvas.addEventListener('mouseleave', () => { scratching = false; checkUnlock(); });
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); scratching = true; doScratch(e); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); doScratch(e); });
    canvas.addEventListener('touchend', () => { scratching = false; checkUnlock(); });

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

  setTimeout(createScratchCard, 1000);
})();`;
}
