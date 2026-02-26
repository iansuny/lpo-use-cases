import type { DyScriptConfig } from '../../lib/config-schemas';

interface Props {
  config: DyScriptConfig;
  viewportMode?: 'desktop' | 'mobile';
}

export function DyScriptPreview({ config }: Props) {
  return (
    <div class="flex items-center justify-center h-full bg-gray-50" style={{ minHeight: '320px' }}>
      <div class="text-center px-8 max-w-md">
        <div class="text-5xl mb-4 opacity-60">🧪</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">DynamicYield Script Injection</h3>
        <p class="text-sm text-gray-500 mb-4">
          This use case has no visual preview. It injects DY scripts into the target page.
        </p>
        <div class="inline-block bg-gray-100 rounded-lg px-4 py-2 text-xs font-mono text-gray-600">
          Session ID: <span class="text-blue-600 font-semibold">{config.sessionId}</span>
        </div>
      </div>
    </div>
  );
}
