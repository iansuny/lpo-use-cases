import { useState, useMemo, useCallback } from 'preact/hooks';
import { schemas, type UseCaseId, type FieldMeta } from '../../lib/config-schemas';
import { generateScript } from '../../lib/generate-script';
import { ConfigPanel } from './ConfigPanel';
import { CodeBlock } from './CodeBlock';
import { PopupDialogPreview } from '../previews/PopupDialogPreview';
import { StickyBannerPreview } from '../previews/StickyBannerPreview';
import { CountdownOfferPreview } from '../previews/CountdownOfferPreview';

interface Props {
  useCaseId: UseCaseId;
}

const previewComponents: Record<UseCaseId, (props: { config: any }) => any> = {
  'popup-dialog': PopupDialogPreview,
  'sticky-banner': StickyBannerPreview,
  'countdown-offer': CountdownOfferPreview,
};

function getDefaults(id: UseCaseId): Record<string, any> {
  const { schema } = schemas[id];
  return schema.parse({});
}

export function PlaygroundShell({ useCaseId }: Props) {
  const [config, setConfig] = useState(() => getDefaults(useCaseId));

  const handleChange = useCallback((key: string, value: any) => {
    setConfig((prev: Record<string, any>) => ({ ...prev, [key]: value }));
  }, []);

  const script = useMemo(() => generateScript(useCaseId, config), [useCaseId, config]);

  const { meta } = schemas[useCaseId];
  const Preview = previewComponents[useCaseId];

  return (
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Config Panel */}
      <div class="lg:col-span-3 order-2 lg:order-1">
        <div class="rounded-xl border border-gray-200 bg-white p-5 sticky top-4">
          <ConfigPanel
            config={config}
            meta={meta as Record<string, FieldMeta>}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Preview + Code */}
      <div class="lg:col-span-9 order-1 lg:order-2 space-y-6">
        {/* Preview */}
        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Preview</h3>
          <Preview config={config} />
        </div>

        {/* Code Block */}
        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <CodeBlock code={script} />
        </div>
      </div>
    </div>
  );
}
