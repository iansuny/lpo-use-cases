import type { ExitIntentConfig } from '../../lib/config-schemas';

interface Props {
  config: ExitIntentConfig;
  viewportMode?: 'desktop' | 'mobile';
  onClose?: () => void;
}

export function ExitIntentPreview({ config, viewportMode = 'desktop', onClose }: Props) {
  const mobile = viewportMode === 'mobile';

  return (
    <div
      class="relative flex items-center justify-center overflow-hidden h-full"
      style={{ background: config.overlayColor, minHeight: '320px' }}
      onClick={(e) => { if (onClose && e.target === e.currentTarget) onClose(); }}
    >
      <div
        class={`relative shadow-2xl overflow-hidden ${
          mobile
            ? 'flex flex-col rounded-lg max-w-[340px] w-full mx-3'
            : 'flex rounded-xl max-w-2xl w-full mx-4'
        }`}
        style={{ background: config.bgColor }}
      >
        {/* Image */}
        <div class={mobile ? 'w-full' : 'w-1/2 flex-shrink-0'}>
          <img
            src={config.imageUrl}
            alt="Offer"
            class="w-full object-cover object-top"
            style={{ height: mobile ? '180px' : '100%', minHeight: mobile ? undefined : '280px' }}
          />
        </div>

        {/* Content */}
        <div
          class={`flex flex-col justify-center relative ${
            mobile ? 'w-full p-5' : 'w-1/2 p-8'
          }`}
        >
          <button
            class="absolute top-2 right-3 bg-transparent border-none text-2xl"
            style={{ color: config.textColor, opacity: 0.5, cursor: onClose ? 'pointer' : 'default' }}
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>

          <h2
            class={`font-bold mb-2 ${mobile ? 'text-base' : 'text-xl mb-3'}`}
            style={{ color: config.textColor }}
          >
            {config.title}
          </h2>
          <p
            class={`leading-relaxed ${mobile ? 'text-xs mb-4' : 'text-sm mb-6'}`}
            style={{ color: config.textColor, opacity: 0.85 }}
          >
            {config.message}
          </p>
          <a
            href={config.buttonUrl}
            target="_blank"
            rel="noopener"
            class={`inline-block rounded-lg font-semibold no-underline text-center ${
              mobile ? 'px-5 py-2.5 text-xs' : 'px-6 py-3 text-sm'
            }`}
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
    </div>
  );
}
