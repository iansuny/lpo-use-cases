import { useRef, useEffect, useState, useCallback } from 'preact/hooks';
import type { SpinWheelConfig } from '../../lib/config-schemas';

interface Props {
  config: SpinWheelConfig;
  onClose?: () => void;
}

const PRIZES = ['5% Cashback', 'NT$500 Bonus', 'Free Annual Fee', '3X Points', 'NT$200 Voucher', '2% Rebate'];
const REDEMPTION_CODE = 'MC-LUCKY-2025';

export function SpinWheelPreview({ config, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [used, setUsed] = useState(false);
  const rotationRef = useRef(0);
  const animRef = useRef<number>(0);

  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;
  const sliceAngle = (2 * Math.PI) / PRIZES.length;

  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    for (let i = 0; i < PRIZES.length; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? config.primaryColor : config.primaryColor + '40';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = i % 2 === 0 ? '#fff' : '#333';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(PRIZES[i], radius - 14, 0);
      ctx.restore();
    }

    ctx.restore();

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', cx, cy);

    // Pointer (right)
    ctx.beginPath();
    ctx.moveTo(size - 4, cy);
    ctx.lineTo(size + 14, cy - 10);
    ctx.lineTo(size + 14, cy + 10);
    ctx.closePath();
    ctx.fillStyle = config.primaryColor;
    ctx.fill();
  }, [config.primaryColor, size, cx, cy, radius, sliceAngle]);

  useEffect(() => {
    setResult(null);
    setCopied(false);
    setSpinning(false);
    setUsed(false);
    rotationRef.current = 0;
    cancelAnimationFrame(animRef.current);
    drawWheel(0);
  }, [config.primaryColor, drawWheel]);

  function handleSpin() {
    if (spinning || used) return;
    setSpinning(true);
    setResult(null);
    setCopied(false);

    const totalRotation = (3 + Math.random() * 2) * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000;
    const startTime = performance.now();
    const startRotation = rotationRef.current;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * ease;
      rotationRef.current = currentRotation;
      drawWheel(currentRotation);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setUsed(true);
        const finalAngle = (((-currentRotation) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const winIndex = Math.floor(finalAngle / sliceAngle) % PRIZES.length;
        setResult(PRIZES[winIndex]);
      }
    }

    animRef.current = requestAnimationFrame(animate);
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
      style={{ background: 'rgba(0,0,0,0.5)', minHeight: '420px' }}
      onClick={(e) => { if (onClose && e.target === e.currentTarget) onClose(); }}
    >
      <div class="relative rounded-xl shadow-lg bg-white mx-4" style={{ maxWidth: 560 }}>
        {onClose && (
          <button
            class="absolute top-2 right-3 bg-transparent border-none text-2xl z-10 cursor-pointer"
            style={{ color: '#9ca3af' }}
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        <div class="flex flex-row items-center">
          {/* Left: Wheel */}
          <div class="text-center p-6 border-r border-gray-100">
            <h2 class="text-xl font-bold mb-1 text-gray-900">Spin to Win!</h2>
            <p class="text-sm text-gray-500 mb-3">Try your luck for an exclusive reward</p>

            <div class="relative mx-auto" style={{ width: size + 18, height: size }}>
              <canvas
                ref={canvasRef}
                width={size + 18}
                height={size}
                class={used ? 'cursor-default' : 'cursor-pointer'}
                style={{ marginTop: 16 }}
                onClick={handleSpin}
              />
            </div>

          </div>

          {/* Right: Result */}
          <div class="p-6 text-center flex-1" style={{ minWidth: 200 }}>
            {result ? (
              <>
                <p class="text-sm text-gray-500 mb-1">You won</p>
                <p class="text-xl font-bold mb-4" style={{ color: config.primaryColor }}>{result}</p>
                <p class="text-xs text-gray-400 uppercase tracking-wider">Redemption Code</p>
                <p class="text-lg font-mono font-bold tracking-widest mt-1 mb-4" style={{ color: config.primaryColor }}>
                  {REDEMPTION_CODE}
                </p>
                <button
                  onClick={handleCopy}
                  class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm text-white border-none cursor-pointer"
                  style={{ background: config.primaryColor }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </>
            ) : (
              <p class="text-sm text-gray-400">
                {spinning ? 'Spinning...' : 'Click the wheel to spin'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
