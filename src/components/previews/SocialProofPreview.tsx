import type { SocialProofConfig } from '../../lib/config-schemas';

interface Props {
  config: SocialProofConfig;
  viewportMode?: 'desktop' | 'mobile';
}

export function SocialProofPreview({ config }: Props) {
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

      {/* Social proof widget */}
      <div
        class="absolute flex flex-col"
        style={{
          bottom: '24px',
          [isRight ? 'right' : 'left']: '24px',
          alignItems: isRight ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Chat bubble */}
        <div
          style={{
            background: '#ffffff',
            color: '#374151',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '11px',
            lineHeight: '1.4',
            padding: '10px 14px',
            marginBottom: '13px',
            maxWidth: '200px',
            borderRadius: '12px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
            position: 'relative',
          }}
        >
          <span style={{ fontWeight: 700 }}>{config.proofCount.toLocaleString()}</span>{' '}
          {config.proofText}
          {/* Bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              [isRight ? 'right' : 'left']: '20px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #ffffff',
            }}
          />
        </div>

        {/* Rounded rect button */}
        <a
          href={config.buttonUrl}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.preventDefault()}
          class="flex items-center gap-2 cursor-pointer no-underline"
          style={{
            background: config.bgColor,
            color: config.textColor,
            borderRadius: '10px',
            padding: '10px 18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {config.buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={{ opacity: 0.7, flexShrink: 0 }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  );
}
