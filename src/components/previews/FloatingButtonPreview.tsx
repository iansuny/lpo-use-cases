import type { FloatingButtonConfig } from '../../lib/config-schemas';

interface Props {
  config: FloatingButtonConfig;
  viewportMode?: 'desktop' | 'mobile';
}

export function FloatingButtonPreview({ config }: Props) {
  const isRight = config.position === 'bottom-right';

  return (
    <div class="relative bg-gray-100 overflow-hidden h-full" style={{ minHeight: '320px' }}>
      {/* Simulated page content */}
      <div class="p-6 space-y-3">
        <div class="h-5 bg-gray-300 rounded w-1/3 mb-4" />
        <div class="h-3 bg-gray-200 rounded w-3/4" />
        <div class="h-3 bg-gray-200 rounded w-1/2" />
        <div class="h-3 bg-gray-200 rounded w-5/6" />
        <div class="h-3 bg-gray-200 rounded w-2/3" />
        <div class="h-3 bg-gray-200 rounded w-3/5" />
        <div class="h-3 bg-gray-200 rounded w-1/2 mt-6" />
        <div class="h-3 bg-gray-200 rounded w-4/5" />
        <div class="h-3 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Floating circle button */}
      <a
        href={config.buttonUrl}
        target="_blank"
        rel="noopener"
        onClick={(e) => e.preventDefault()}
        class="absolute flex flex-col items-center justify-center rounded-full cursor-pointer no-underline"
        style={{
          bottom: '24px',
          [isRight ? 'right' : 'left']: '24px',
          width: '80px',
          height: '80px',
          background: config.bgColor,
          color: config.textColor,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Credit card icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{ marginBottom: '3px' }}
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.03em' }}>
          {config.buttonText}
        </span>
      </a>
    </div>
  );
}
