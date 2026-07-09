import { useState, useMemo, useCallback } from 'preact/hooks';
import {
  type Transaction,
  derivePersona,
  buildEdm,
  personas,
  SEED_TRANSACTIONS,
} from '../../lib/breeze-personas';
import { TransactionPanel } from './TransactionPanel';
import { PersonaPanel } from './PersonaPanel';
import { EdmPreview } from './EdmPreview';
import { PushPreview } from './PushPreview';

let idCounter = 0;
const nextId = (): string => `tx-${Date.now().toString(36)}-${idCounter++}`;

const base = import.meta.env.BASE_URL;
const navLinks = [
  { label: 'Demo Site', href: base, icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'Dashboard', href: `${base}/dashboard`, icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
];

export function BreezeShell() {
  const [txs, setTxs] = useState<Transaction[]>(() => SEED_TRANSACTIONS);
  const [menuOpen, setMenuOpen] = useState(false);

  const addTx = useCallback((tx: Omit<Transaction, 'id'>) => {
    setTxs((prev) => [{ ...tx, id: nextId() }, ...prev]);
  }, []);

  const removeTx = useCallback((id: string) => {
    setTxs((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearTxs = useCallback(() => setTxs([]), []);

  const derived = useMemo(() => derivePersona(txs), [txs]);
  const edm = useMemo(() => buildEdm(derived.personaId, derived.topCountry), [derived]);
  const persona = personas[derived.personaId];

  return (
    <div class="relative flex h-full overflow-hidden">
      {/* LEFT: spending controls (top, scrollable) + persona readout (bottom, pinned) */}
      <aside class="flex w-[420px] flex-shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white">
        <div class="flex-1 overflow-y-auto">
          <TransactionPanel txs={txs} onAdd={addTx} onRemove={removeTx} onClear={clearTxs} />
        </div>
        <PersonaPanel derived={derived} />
      </aside>

      {/* RIGHT: live personalized channels — push notification + email */}
      <main class="flex-1 overflow-y-auto bg-gray-100">
        <div class="flex flex-wrap items-start justify-center gap-8 px-6 py-8">
          <div class="w-[300px] flex-shrink-0">
            <PushPreview persona={persona} push={edm.push} />
          </div>
          <div class="w-full max-w-xl flex-1 min-w-[380px]">
            <EdmPreview persona={persona} edm={edm} />
          </div>
        </div>
      </main>

      {/* Gear nav (bottom-right, like the homepage) */}
      <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {menuOpen && (
          <div class="mb-1 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <div class="border-b border-gray-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
              Navigate
            </div>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                class="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d={l.icon} />
                </svg>
                {l.label}
              </a>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Navigation menu"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={{ transform: menuOpen ? 'rotate(60deg)' : 'none', transition: 'transform 0.3s ease' }}
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
