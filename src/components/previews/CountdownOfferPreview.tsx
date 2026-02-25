import { useState, useEffect } from 'preact/hooks';
import type { CountdownOfferConfig } from '../../lib/config-schemas';

interface Props {
  config: CountdownOfferConfig;
  viewportMode?: 'desktop' | 'mobile';
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function CountdownOfferPreview({ config, viewportMode = 'desktop' }: Props) {
  const [endTime] = useState(() => Date.now() + config.countdownMinutes * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  const mobile = viewportMode === 'mobile';

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const dist = Math.max(0, endTime - now);
  const days = Math.floor(dist / 86400000);
  const hours = Math.floor((dist % 86400000) / 3600000);
  const minutes = Math.floor((dist % 3600000) / 60000);
  const seconds = Math.floor((dist % 60000) / 1000);

  const dark = darkenHex(config.primaryColor, 30);
  const gradient = `linear-gradient(135deg, ${config.primaryColor}, ${dark})`;

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ];

  return (
    <div class="relative overflow-hidden bg-gray-100 h-full" style={{ minHeight: '280px' }}>
      {/* Simulated page content */}
      <div class="p-6 space-y-3">
        <div class="h-5 bg-gray-300 rounded w-1/3 mb-4" />
        <div class="h-3 bg-gray-200 rounded w-3/4" />
        <div class="h-3 bg-gray-200 rounded w-1/2" />
        <div class="h-3 bg-gray-200 rounded w-5/6" />
        <div class="h-3 bg-gray-200 rounded w-2/3" />
        <div class="h-3 bg-gray-200 rounded w-3/5" />
      </div>

      {/* Countdown bar at bottom */}
      <div
        class="absolute bottom-0 left-0 right-0"
        style={{
          background: gradient,
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {mobile ? (
          /* ── Mobile: stacked layout ── */
          <div class="px-3 py-2.5 space-y-2">
            {/* Row 1: icon + title + close */}
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" style={{ fill: config.primaryColor }}>
                  <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div
                  class="inline-block text-[7px] font-bold px-1.5 py-0.5 rounded mb-0.5 uppercase tracking-wider"
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  Limited Time
                </div>
                <div class="text-xs font-bold leading-tight truncate">
                  {config.offerTitle} - {config.cashbackAmount} Cashback
                </div>
              </div>
              <button
                class="flex items-center justify-center w-5 h-5 rounded-full border-none text-white text-xs cursor-default flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                &times;
              </button>
            </div>

            {/* Row 2: timer + CTA */}
            <div class="flex items-center justify-between gap-2">
              <div class="flex gap-1">
                {timeUnits.map((u) => (
                  <div
                    key={u.label}
                    class="text-center rounded px-1 py-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      minWidth: '32px',
                    }}
                  >
                    <div class="text-xs font-extrabold leading-none mb-0.5">{pad(u.value)}</div>
                    <div class="text-[6px] uppercase font-semibold opacity-80">{u.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={config.ctaUrl}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.preventDefault()}
                class="text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-md no-underline whitespace-nowrap"
                style={{
                  background: '#fff',
                  color: config.primaryColor,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                {config.ctaText}
              </a>
            </div>

            {/* Social proof */}
            {config.socialProofEnabled === 'yes' && (
              <div class="flex items-center justify-center gap-1 text-[9px] opacity-90">
                <span>👥</span>
                <span>
                  <b>{config.socialProofCount.toLocaleString()}</b> {config.socialProofText}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* ── Desktop: single-row layout ── */
          <div class="flex items-center justify-between gap-3 px-4 py-2.5" style={{ maxWidth: '100%' }}>
            {/* Left: icon + text */}
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 3px 10px rgba(0,0,0,0.2)' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" style={{ fill: config.primaryColor }}>
                  <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
                </svg>
              </div>
              <div class="min-w-0">
                <div
                  class="inline-block text-[8px] font-bold px-2 py-0.5 rounded-md mb-0.5 uppercase tracking-wider"
                  style={{
                    background: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  Limited Time
                </div>
                <div class="text-sm font-bold leading-tight truncate">
                  {config.offerTitle} - {config.cashbackAmount} Cashback
                </div>
                {config.socialProofEnabled === 'yes' && (
                  <div class="flex items-center gap-1 mt-0.5 text-[9px] opacity-90">
                    <span>👥</span>
                    <span>
                      <b>{config.socialProofCount.toLocaleString()}</b> {config.socialProofText}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Timer */}
            <div class="flex gap-1.5 flex-shrink-0">
              {timeUnits.map((u) => (
                <div
                  key={u.label}
                  class="text-center rounded px-1.5 py-1"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    minWidth: '36px',
                  }}
                >
                  <div class="text-sm font-extrabold leading-none mb-0.5">{pad(u.value)}</div>
                  <div class="text-[7px] uppercase font-semibold opacity-80">{u.label}</div>
                </div>
              ))}
            </div>

            {/* CTA + Close */}
            <div class="flex items-center gap-2 flex-shrink-0">
              <a
                href={config.ctaUrl}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.preventDefault()}
                class="text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-md no-underline whitespace-nowrap"
                style={{
                  background: '#fff',
                  color: config.primaryColor,
                  boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
                }}
              >
                {config.ctaText}
              </a>
              <button
                class="flex items-center justify-center w-6 h-6 rounded-full border-none text-white text-sm cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
