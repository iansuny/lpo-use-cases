import {
  type DerivedPersona,
  type Category,
  personas,
  categoryLabels,
  categoryColors,
} from '../../lib/breeze-personas';

interface Props {
  derived: DerivedPersona;
}

const CATEGORY_ORDER: Category[] = ['overseas', 'shopping', 'dining', 'daily'];

export function PersonaPanel({ derived }: Props) {
  const persona = personas[derived.personaId];

  return (
    <div
      class="flex-shrink-0 border-t border-gray-200 p-5 space-y-4"
      style={{ background: `linear-gradient(180deg, #ffffff, ${persona.primaryColor}0d)` }}
    >
      <div class="flex items-center gap-1.5">
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span class="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Detected Persona
        </span>
      </div>

      {/* Persona card */}
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm"
          style={{ background: `linear-gradient(135deg, ${persona.gradientFrom}, ${persona.gradientTo})` }}
        >
          {persona.icon}
        </div>
        <div class="min-w-0">
          <div class="text-base font-bold text-gray-900">{persona.label}</div>
          <div class="text-xs text-gray-500">{persona.tagline}</div>
        </div>
      </div>

      {/* Category breakdown */}
      <div class="space-y-1.5">
        {CATEGORY_ORDER.map((c) => {
          const share = derived.shares[c];
          return (
            <div key={c} class="flex items-center gap-2">
              <span class="w-24 flex-shrink-0 text-[11px] text-gray-500">{categoryLabels[c]}</span>
              <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(share * 100)}%`, background: categoryColors[c] }}
                />
              </div>
              <span class="w-8 flex-shrink-0 text-right text-[11px] font-medium tabular-nums text-gray-600">
                {Math.round(share * 100)}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Reasoning */}
      <div class="rounded-lg bg-white/70 px-3 py-2 ring-1 ring-gray-200">
        <p class="text-xs leading-relaxed text-gray-600">
          <span class="font-semibold text-gray-700">Why: </span>
          {derived.reason}
        </p>
      </div>
    </div>
  );
}
