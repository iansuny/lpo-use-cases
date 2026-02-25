import type { StickyBannerConfig } from '../../lib/config-schemas';

interface Props {
  config: StickyBannerConfig;
}

export function StickyBannerPreview({ config }: Props) {
  return (
    <div class="relative overflow-hidden bg-gray-100 h-full" style={{ minHeight: '200px' }}>
      {/* Simulated page content */}
      <div class="p-6 space-y-3">
        <div class="h-4 bg-gray-200 rounded w-3/4" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
        <div class="h-4 bg-gray-200 rounded w-5/6" />
        <div class="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Banner */}
      <div
        class="absolute left-0 right-0 flex items-center justify-center gap-3 px-5 py-3 text-sm"
        style={{
          [config.position === 'top' ? 'top' : 'bottom']: 0,
          background: config.bgColor,
          color: config.textColor,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <span>{config.message}</span>
        <a
          href={config.linkUrl}
          target="_blank"
          rel="noopener"
          class="font-semibold underline whitespace-nowrap"
          style={{ color: config.linkColor }}
          onClick={(e) => e.preventDefault()}
        >
          {config.linkText}
        </a>
        {config.showCloseButton === 'yes' && (
          <button
            class="bg-transparent border-none text-xl cursor-default ml-2"
            style={{ color: config.textColor, opacity: 0.7 }}
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
