import { useState, useMemo, useCallback } from 'preact/hooks';
import { schemas, primaryColorKey, ctaUrlKey, type UseCaseId, type FieldMeta } from '../../lib/config-schemas';
import { generateScript } from '../../lib/generate-script';
import { ConfigPanel } from './ConfigPanel';
import { CodeBlock } from './CodeBlock';
import { PopupDialogPreview } from '../previews/PopupDialogPreview';
import { StickyBannerPreview } from '../previews/StickyBannerPreview';
import { CountdownOfferPreview } from '../previews/CountdownOfferPreview';
import { MiniPollPreview } from '../previews/MiniPollPreview';
import { ExitIntentPreview } from '../previews/ExitIntentPreview';
import { FloatingButtonPreview } from '../previews/FloatingButtonPreview';
import { SocialProofPreview } from '../previews/SocialProofPreview';
import { DyScriptPreview } from '../previews/DyScriptPreview';
import { ScratchCardPreview } from '../previews/ScratchCardPreview';

interface UseCaseItem {
  id: UseCaseId;
  title: string;
  icon: string;
  description: string;
}

const useCaseList: UseCaseItem[] = [
  { id: 'popup-dialog', title: 'Popup Dialog', icon: '💬', description: 'Modal dialog for promotions & lead capture' },
  { id: 'sticky-banner', title: 'Sticky Banner', icon: '📢', description: 'Fixed banner for announcements' },
  { id: 'countdown-offer', title: 'Countdown Bar', icon: '⏱️', description: 'Countdown timer with social proof' },
  { id: 'mini-poll', title: 'Mini Poll', icon: '📋', description: 'Multi-select persona quiz' },
  { id: 'exit-intent', title: 'Exit Intent', icon: '🚪', description: 'Retain leaving visitors with a dialog' },
  { id: 'floating-button', title: 'Floating Button', icon: '🔘', description: 'Fixed floating CTA button' },
  { id: 'social-proof', title: 'Social Proof', icon: '👥', description: 'CTA with social proof bubble' },
  { id: 'dy-script', title: 'DY Script', icon: '🧪', description: 'DynamicYield script injection' },
  { id: 'scratch-card', title: 'Scratch Card', icon: '🎰', description: 'Gamified scratch card popup' },
];

const previewComponents: Record<UseCaseId, (props: { config: any; viewportMode: ViewportMode }) => any> = {
  'popup-dialog': PopupDialogPreview,
  'sticky-banner': StickyBannerPreview,
  'countdown-offer': CountdownOfferPreview,
  'mini-poll': MiniPollPreview,
  'exit-intent': ExitIntentPreview,
  'floating-button': FloatingButtonPreview,
  'social-proof': SocialProofPreview,
  'dy-script': DyScriptPreview,
  'scratch-card': ScratchCardPreview,
};

function getDefaults(id: UseCaseId): Record<string, any> {
  const { schema } = schemas[id];
  return schema.parse({});
}

type ViewportMode = 'desktop' | 'mobile';

export function Dashboard() {
  const [activeId, setActiveId] = useState<UseCaseId>('popup-dialog');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [configs, setConfigs] = useState<Record<UseCaseId, Record<string, any>>>(() => ({
    'popup-dialog': getDefaults('popup-dialog'),
    'sticky-banner': getDefaults('sticky-banner'),
    'countdown-offer': getDefaults('countdown-offer'),
    'mini-poll': getDefaults('mini-poll'),
    'exit-intent': getDefaults('exit-intent'),
    'floating-button': getDefaults('floating-button'),
    'social-proof': getDefaults('social-proof'),
    'dy-script': getDefaults('dy-script'),
    'scratch-card': getDefaults('scratch-card'),
  }));

  const config = configs[activeId];

  const handleChange = useCallback(
    (key: string, value: any) => {
      setConfigs((prev) => {
        const next = { ...prev, [activeId]: { ...prev[activeId], [key]: value } };

        // If the changed field is the primary color for the active use case,
        // propagate the new color to all other use cases' primary color fields.
        if (key === primaryColorKey[activeId]) {
          for (const ucId of Object.keys(primaryColorKey) as UseCaseId[]) {
            if (ucId !== activeId) {
              const colorKey = primaryColorKey[ucId];
              next[ucId] = { ...next[ucId], [colorKey]: value };
            }
          }
        }

        // Sync CTA URL across all use cases
        if (key === ctaUrlKey[activeId]) {
          for (const ucId of Object.keys(ctaUrlKey) as UseCaseId[]) {
            if (ucId !== activeId) {
              next[ucId] = { ...next[ucId], [ctaUrlKey[ucId]]: value };
            }
          }
        }

        // Sync matchUrl across all use cases
        if (key === 'matchUrl') {
          for (const ucId of Object.keys(schemas) as UseCaseId[]) {
            if (ucId !== activeId) {
              next[ucId] = { ...next[ucId], matchUrl: value };
            }
          }
        }

        return next;
      });
    },
    [activeId]
  );

  const script = useMemo(() => generateScript(activeId, config), [activeId, config]);

  const { meta } = schemas[activeId];
  const Preview = previewComponents[activeId];
  const activeItem = useCaseList.find((uc) => uc.id === activeId)!;

  return (
    <div class="flex h-[calc(100vh-49px)] overflow-hidden">
      {/* ─── Left Sidebar: Use Case List (~20%) ─── */}
      <aside class="w-[20%] min-w-[180px] max-w-[260px] flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div class="px-4 py-3 border-b border-gray-100">
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Use Cases</h2>
        </div>
        <nav class="flex-1 overflow-y-auto py-1">
          {useCaseList.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveId(uc.id)}
              class={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                activeId === uc.id
                  ? 'bg-blue-50 border-r-2 border-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span class="text-lg flex-shrink-0">{uc.icon}</span>
              <span
                class={`text-sm font-medium truncate ${
                  activeId === uc.id ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                {uc.title}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ─── Center: Preview (~60%) ─── */}
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Title bar */}
        <div class="px-5 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2">
          <span class="text-lg">{activeItem.icon}</span>
          <h1 class="text-base font-semibold text-gray-900">{activeItem.title}</h1>

          {/* Viewport toggle */}
          <div class="ml-auto flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewportMode('desktop')}
              class={`p-1.5 rounded-md transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Desktop view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              class={`p-1.5 rounded-md transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Mobile view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Preview area — fills the entire center */}
        <div class="flex-1 overflow-hidden flex justify-center bg-gray-100">
          <div
            class={`h-full transition-all duration-300 ${
              viewportMode === 'mobile'
                ? 'max-w-[375px] w-full border-x border-gray-300 bg-white shadow-lg'
                : 'w-full'
            }`}
          >
            <Preview config={config} viewportMode={viewportMode} />
          </div>
        </div>
      </div>

      {/* ─── Right Sidebar: Primary Color + Match URL + Script (~20%) ─── */}
      <aside class="w-[20%] min-w-[220px] max-w-[300px] flex-shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <ConfigPanel
            config={config}
            meta={meta as Record<string, FieldMeta>}
            onChange={handleChange}
          />

          <div class="border-t border-gray-200 pt-4">
            <CodeBlock code={script} />
          </div>
        </div>
      </aside>
    </div>
  );
}
