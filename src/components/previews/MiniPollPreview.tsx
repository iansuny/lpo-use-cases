import { useState } from 'preact/hooks';
import type { MiniPollConfig } from '../../lib/config-schemas';

interface Props {
  config: MiniPollConfig;
}

function darkenHex(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function MiniPollPreview({ config }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const dark = darkenHex(config.primaryColor, 30);
  const gradient = `linear-gradient(135deg, ${config.primaryColor}, ${dark})`;
  const isLeft = config.buttonPosition === 'bottom-left';

  const options = [
    { value: 'option1', label: config.option1Label, persona: 'The Foodie' },
    { value: 'option2', label: config.option2Label, persona: 'Globetrotter' },
    { value: 'option3', label: config.option3Label, persona: 'Deal Hunter' },
    { value: 'option4', label: config.option4Label, persona: 'Smart Saver' },
  ];

  const toggleOption = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setShowPopup(false);
    setSelected(new Set());
    setSubmitted(false);
  };

  return (
    <div class="relative bg-gray-100 overflow-hidden h-full" style={{ minHeight: '360px' }}>
      {/* Simulated page content */}
      <div class="p-6 space-y-3">
        <div class="h-4 bg-gray-200 rounded w-3/4" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
        <div class="h-4 bg-gray-200 rounded w-5/6" />
        <div class="h-4 bg-gray-200 rounded w-2/3" />
        <div class="h-4 bg-gray-200 rounded w-3/5" />
      </div>

      {/* Floating button */}
      {!showPopup && (
        <div
          class="absolute flex items-center gap-3"
          style={{
            bottom: '20px',
            [isLeft ? 'left' : 'right']: '20px',
            flexDirection: isLeft ? 'row' : 'row-reverse',
          }}
        >
          <button
            onClick={() => setShowPopup(true)}
            class="w-12 h-12 rounded-full border-none flex items-center justify-center cursor-pointer shadow-lg"
            style={{ background: gradient }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
            </svg>
          </button>
          <div
            class="bg-white px-3 py-2 rounded-lg shadow-md text-xs font-semibold text-gray-800 whitespace-nowrap"
          >
            {config.tooltipText}
          </div>
        </div>
      )}

      {/* Popup overlay */}
      {showPopup && (
        <div
          class="absolute inset-0 flex items-center justify-center z-10"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleReset();
          }}
        >
          <div
            class="bg-white rounded-2xl p-6 shadow-2xl relative"
            style={{ width: '88%', maxWidth: '400px', fontFamily: 'system-ui, sans-serif' }}
          >
            <button
              onClick={handleReset}
              class="absolute top-3 right-3 bg-transparent border-none text-gray-400 text-xl cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              &times;
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div class="text-center mb-5">
                  <div
                    class="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ background: gradient, boxShadow: `0 6px 20px ${config.primaryColor}4d` }}
                  >
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </div>
                  <h2 class="text-lg font-bold text-gray-900 mb-1">{config.title}</h2>
                  <p class="text-xs text-gray-500">{config.subtitle}</p>
                </div>

                {/* Question */}
                <div class="text-center text-sm font-semibold text-gray-900 mb-4">
                  {config.questionText}
                </div>

                {/* Options grid */}
                <div class="grid grid-cols-2 gap-2 mb-4">
                  {options.map((opt) => {
                    const isSelected = selected.has(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleOption(opt.value)}
                        class="py-3 px-2 text-xs font-semibold rounded-lg border-2 cursor-pointer transition-all text-center"
                        style={{
                          borderColor: isSelected ? config.primaryColor : '#e5e5e5',
                          background: isSelected ? gradient : '#fff',
                          color: isSelected ? '#fff' : '#333',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div class="text-center text-[11px] text-gray-400 mb-3">Select at least one option</div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  class="w-full py-3 rounded-lg border-none text-white text-xs font-semibold cursor-pointer transition-all"
                  style={{
                    background: gradient,
                    opacity: selected.size > 0 ? 1 : 0.5,
                    pointerEvents: selected.size > 0 ? 'auto' : 'none',
                    boxShadow: `0 4px 14px ${config.primaryColor}4d`,
                  }}
                >
                  {config.submitText}
                </button>
              </>
            ) : (
              /* Result */
              <div class="text-center py-2">
                <div
                  class="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: gradient, boxShadow: `0 6px 20px ${config.primaryColor}4d` }}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <h2 class="text-xl font-bold mb-2" style={{ color: config.primaryColor }}>
                  Thank You!
                </h2>
                <p class="text-sm text-gray-500 mb-3">Your personalized experience is ready</p>
                <div
                  class="inline-block text-sm font-bold px-4 py-2 rounded-lg border-2 mb-3"
                  style={{
                    color: config.primaryColor,
                    borderColor: config.primaryColor,
                    background: `${config.primaryColor}0d`,
                  }}
                >
                  {options.find((o) => selected.has(o.value))?.persona ?? ''}
                </div>
                <p class="text-xs text-gray-500 mb-4">
                  {options
                    .filter((o) => selected.has(o.value))
                    .map((o) => o.label)
                    .join(' \u2022 ')}
                </p>
                <a
                  href={config.ctaUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={(e) => { e.preventDefault(); handleReset(); }}
                  class="inline-block px-6 py-2 rounded-lg border-none text-white text-xs font-semibold cursor-pointer no-underline"
                  style={{ background: gradient }}
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
