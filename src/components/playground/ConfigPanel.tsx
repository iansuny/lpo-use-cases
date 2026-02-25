import type { FieldMeta } from '../../lib/config-schemas';

interface Props {
  config: Record<string, any>;
  meta: Record<string, FieldMeta>;
  onChange: (key: string, value: any) => void;
}

export function ConfigPanel({ config, meta, onChange }: Props) {
  const entries = (Object.entries(meta) as [string, FieldMeta][]).filter(
    ([, field]) => field.sidebar
  );

  return (
    <div class="space-y-4">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
      {entries.map(([key, field]) => (
        <div key={key}>
          <label class="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          {field.type === 'radio' ? (
            <div class="flex gap-3">
              {field.options?.map((opt) => (
                <label key={opt.value} class="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name={key}
                    value={opt.value}
                    checked={config[key] === opt.value}
                    onChange={() => onChange(key, opt.value)}
                    class="accent-blue-600"
                  />
                  <span class="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          ) : field.type === 'select' ? (
            <select
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              value={config[key]}
              onChange={(e) => onChange(key, (e.target as HTMLSelectElement).value)}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y"
              rows={3}
              value={config[key]}
              placeholder={field.placeholder}
              onInput={(e) => onChange(key, (e.target as HTMLTextAreaElement).value)}
            />
          ) : field.type === 'color' ? (
            <div class="flex items-center gap-2">
              <input
                type="color"
                class="h-9 w-12 cursor-pointer rounded border border-gray-300"
                value={config[key]}
                onInput={(e) => onChange(key, (e.target as HTMLInputElement).value)}
              />
              <input
                type="text"
                class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                value={config[key]}
                onInput={(e) => onChange(key, (e.target as HTMLInputElement).value)}
              />
            </div>
          ) : field.type === 'number' ? (
            <input
              type="number"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              value={config[key]}
              min={field.min}
              max={field.max}
              onInput={(e) => onChange(key, Number((e.target as HTMLInputElement).value))}
            />
          ) : (
            <input
              type="text"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              value={config[key]}
              placeholder={field.placeholder}
              onInput={(e) => onChange(key, (e.target as HTMLInputElement).value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
