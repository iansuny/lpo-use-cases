import { useRef, useEffect, useState } from 'preact/hooks';
import type { ScratchCardConfig } from '../../lib/config-schemas';

interface Props {
  config: ScratchCardConfig;
  onClose?: () => void;
}

const REDEMPTION_CODE = 'MC-CASHBACK-2025';

export function ScratchCardPreview({ config, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [copied, setCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const canvasWidth = 280;
  const canvasHeight = 120;

  useEffect(() => {
    setCopied(false);
    setUnlocked(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch Here', canvasWidth / 2, canvasHeight / 2);
  }, [config.primaryColor, config.ctaUrl]);

  function getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
  }

  function scratch(e: MouseEvent | TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas || !isScratching) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkUnlock() {
    if (unlocked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    if (transparent / (canvasWidth * canvasHeight) > 0.5) {
      setUnlocked(true);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(REDEMPTION_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      class="relative flex items-center justify-center overflow-hidden h-full"
      style={{ background: 'rgba(0,0,0,0.5)', minHeight: '320px' }}
      onClick={(e) => { if (onClose && e.target === e.currentTarget) onClose(); }}
    >
      <div class="relative text-center rounded-xl p-8 shadow-lg max-w-sm w-full mx-4 bg-white">
        {onClose && (
          <button
            class="absolute top-2 right-3 bg-transparent border-none text-2xl cursor-pointer"
            style={{ color: '#9ca3af' }}
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        <h2 class="text-xl font-bold mb-2 text-gray-900">Scratch to Reveal Your Offer!</h2>
        <p class="text-sm text-gray-500 mb-4">Use your mouse to scratch the card below</p>

        {/* Scratch area */}
        <div
          class="relative mx-auto rounded-lg overflow-hidden select-none"
          style={{ width: canvasWidth, height: canvasHeight }}
        >
          {/* Prize layer (behind canvas) */}
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-1"
            style={{ background: `${config.primaryColor}15` }}
          >
            <span class="text-xs text-gray-500 uppercase tracking-wider">Your Redemption Code</span>
            <span
              class="text-2xl font-mono font-bold tracking-widest"
              style={{ color: config.primaryColor }}
            >
              {REDEMPTION_CODE}
            </span>
            <span class="text-xs text-gray-400">5% cashback on your first purchase</span>
          </div>

          {/* Canvas scratch layer */}
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            class="absolute inset-0 cursor-pointer"
            style={{ touchAction: 'none' }}
            onMouseDown={(e) => { e.preventDefault(); setIsScratching(true); scratch(e); }}
            onMouseMove={(e) => { e.preventDefault(); scratch(e); }}
            onMouseUp={() => { setIsScratching(false); checkUnlock(); }}
            onMouseLeave={() => { setIsScratching(false); checkUnlock(); }}
            onTouchStart={(e) => { e.preventDefault(); setIsScratching(true); scratch(e); }}
            onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
            onTouchEnd={() => { setIsScratching(false); checkUnlock(); }}
          />
        </div>

        {/* Copy button */}
        <div class="mt-4">
          <button
            onClick={handleCopy}
            disabled={!unlocked}
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base text-white border-none transition-opacity duration-300"
            style={{
              background: config.primaryColor,
              opacity: unlocked ? 1 : 0.3,
              cursor: unlocked ? 'pointer' : 'not-allowed',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
