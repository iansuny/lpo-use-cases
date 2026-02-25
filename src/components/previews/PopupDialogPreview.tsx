import type { PopupDialogConfig } from '../../lib/config-schemas';

interface Props {
  config: PopupDialogConfig;
}

export function PopupDialogPreview({ config }: Props) {
  return (
    <div
      class="relative flex items-center justify-center overflow-hidden h-full"
      style={{ background: config.overlayColor, minHeight: '320px' }}
    >
      <div
        class="relative text-center rounded-xl p-8 shadow-2xl max-w-sm w-full mx-4"
        style={{ background: config.bgColor, color: config.textColor }}
      >
        <button
          class="absolute top-2 right-3 bg-transparent border-none text-2xl cursor-default"
          style={{ color: config.textColor, opacity: 0.5 }}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold mb-3" style={{ color: config.textColor }}>
          {config.title}
        </h2>
        <p class="text-base mb-6 leading-relaxed" style={{ color: config.textColor, opacity: 0.85 }}>
          {config.message}
        </p>
        <a
          href={config.buttonUrl}
          target="_blank"
          rel="noopener"
          class="inline-block px-8 py-3 rounded-lg font-semibold text-base no-underline"
          style={{
            background: config.buttonBgColor,
            color: config.buttonTextColor,
          }}
          onClick={(e) => e.preventDefault()}
        >
          {config.buttonText}
        </a>
      </div>
    </div>
  );
}
