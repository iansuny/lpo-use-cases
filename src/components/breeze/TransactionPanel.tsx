import { useState } from 'preact/hooks';
import {
  type Transaction,
  type Category,
  categoryLabels,
  categoryIcons,
  categoryColors,
  countries,
  countryByCode,
  defaultMerchants,
  defaultAmounts,
  quickAdds,
} from '../../lib/breeze-personas';

interface Props {
  txs: Transaction[];
  onAdd: (tx: Omit<Transaction, 'id'>) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CATEGORY_ORDER: Category[] = ['overseas', 'shopping', 'dining', 'daily'];

export function TransactionPanel({ txs, onAdd, onRemove, onClear }: Props) {
  const [category, setCategory] = useState<Category>('overseas');
  const [country, setCountry] = useState<string>('JP');

  const add = () => {
    const isOverseas = category === 'overseas';
    const c = countryByCode(country);
    // Auto-fill merchant + a lightly randomized amount so the list feels real.
    const amount = Math.round(defaultAmounts[category] * (0.8 + Math.random() * 0.4));
    onAdd({
      category,
      country: isOverseas ? country : undefined,
      merchant: isOverseas ? `${c?.city ?? 'Overseas'} Spending` : defaultMerchants[category],
      amount,
    });
  };

  return (
    <div class="p-5 space-y-5">
      <div>
        <h2 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Spending Activity</h2>
        <p class="text-xs text-gray-500 mt-0.5">Adjust the records to reshape the persona.</p>
      </div>

      {/* Quick add */}
      <div class="flex flex-wrap gap-1.5">
        {quickAdds.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => onAdd(q.tx)}
            class="px-2.5 py-1 text-xs font-medium rounded-full border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Add form — just pick a category (and country for overseas) */}
      <div class="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
        <div class={category === 'overseas' ? 'grid grid-cols-2 gap-2.5' : ''}>
          <label class="block">
            <span class="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory((e.currentTarget as HTMLSelectElement).value as Category)}
              class="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
            >
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {categoryIcons[c]} {categoryLabels[c]}
                </option>
              ))}
            </select>
          </label>

          {category === 'overseas' && (
            <label class="block">
              <span class="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Country</span>
              <select
                value={country}
                onChange={(e) => setCountry((e.currentTarget as HTMLSelectElement).value)}
                class="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <button
          type="button"
          onClick={add}
          class="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          Add Transaction
        </button>
      </div>

      {/* Transaction list */}
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
            {txs.length} {txs.length === 1 ? 'Transaction' : 'Transactions'}
          </span>
          {txs.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              class="text-[11px] font-medium text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {txs.length === 0 ? (
          <p class="text-xs text-gray-400 italic py-3 text-center">No transactions yet.</p>
        ) : (
          <ul class="space-y-1.5">
            {txs.map((t) => {
              const c = countryByCode(t.country);
              return (
                <li
                  key={t.id}
                  class="group flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2"
                >
                  <span
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm"
                    style={{ background: `${categoryColors[t.category]}1a` }}
                  >
                    {categoryIcons[t.category]}
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="truncate text-sm font-medium text-gray-900">
                      {t.merchant} {c && <span class="text-xs">{c.flag}</span>}
                    </div>
                    <div class="text-[11px] text-gray-400">
                      {categoryLabels[t.category]}
                      {c ? ` · ${c.name}` : ''}
                    </div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 tabular-nums">${t.amount}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(t.id)}
                    aria-label="Remove"
                    class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
