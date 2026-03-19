import { useState, useMemo, useEffect, useCallback, useRef } from 'preact/hooks';
import { schemas, type UseCaseId } from '../../lib/config-schemas';
import { PopupDialogPreview } from '../previews/PopupDialogPreview';
import { StickyBannerPreview } from '../previews/StickyBannerPreview';
import { CountdownOfferPreview } from '../previews/CountdownOfferPreview';
import { MiniPollPreview } from '../previews/MiniPollPreview';
import { ExitIntentPreview } from '../previews/ExitIntentPreview';
import { FloatingButtonPreview } from '../previews/FloatingButtonPreview';
import { SocialProofPreview } from '../previews/SocialProofPreview';
import { ScratchCardPreview } from '../previews/ScratchCardPreview';
import { SpinWheelPreview } from '../previews/SpinWheelPreview';
import { variantLabels, type VariantId } from '../../lib/hero-variants';
import { applyVariant, saveOriginals, restoreOriginals, type OriginalSnapshot } from '../../lib/hero-dom';

interface UseCaseEntry {
  id: UseCaseId;
  title: string;
  icon: string;
  modal?: boolean;
  trigger?: 'delay' | 'exit-intent';
  /** DOM manipulation use case (no overlay rendering) */
  domManipulation?: boolean;
}

const useCaseList: UseCaseEntry[] = [
  { id: 'hero-personalization', title: 'Hero Personalization', icon: '🎯', domManipulation: true },
  { id: 'popup-dialog', title: 'Popup Dialog', icon: '💬', modal: true, trigger: 'delay' },
  { id: 'sticky-banner', title: 'Sticky Banner', icon: '📢' },
  { id: 'countdown-offer', title: 'Countdown Bar', icon: '⏱️' },
  { id: 'mini-poll', title: 'Mini Poll', icon: '📋' },
  { id: 'exit-intent', title: 'Exit Intent', icon: '🚪', modal: true, trigger: 'exit-intent' },
  { id: 'floating-button', title: 'Floating Button', icon: '🔘' },
  { id: 'social-proof', title: 'Social Proof', icon: '👥' },
  { id: 'scratch-card', title: 'Scratch Card', icon: '🎰', modal: true, trigger: 'delay' },
  { id: 'spin-wheel', title: 'Spin Wheel', icon: '🎡', modal: true, trigger: 'delay' },
];

const previewComponents: Record<string, (props: { config: any; viewportMode?: string }) => any> = {
  'popup-dialog': PopupDialogPreview,
  'sticky-banner': StickyBannerPreview,
  'countdown-offer': CountdownOfferPreview,
  'mini-poll': MiniPollPreview,
  'exit-intent': ExitIntentPreview,
  'floating-button': FloatingButtonPreview,
  'social-proof': SocialProofPreview,
  'scratch-card': ScratchCardPreview,
  'spin-wheel': SpinWheelPreview,
};

const STORAGE_KEY = 'lpo-demo-enabled';
const VARIANT_STORAGE_KEY = 'lpo-hero-variant';

function getDefaults(id: UseCaseId): Record<string, any> {
  const { schema } = schemas[id];
  return schema.parse({});
}

function loadEnabled(): Set<UseCaseId> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const ids = JSON.parse(raw) as string[];
      const validIds = Object.keys(previewComponents);
      return new Set(
        ids.filter((id) => validIds.includes(id) || id === 'hero-personalization') as UseCaseId[]
      );
    }
  } catch {}
  return new Set();
}

function saveEnabled(set: Set<UseCaseId>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

/** Detect variant from URL utm_content parameter */
function detectUtmVariant(): VariantId {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_content');
    if (utm === 'overseas') return 'overseas';
    if (utm === 'shopping') return 'shopping';
    if (utm === 'dining') return 'dining';
  } catch {}
  return 'default';
}

export function DemoOverlay() {
  const [enabled, setEnabled] = useState<Set<UseCaseId>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState<Set<UseCaseId>>(new Set());
  const [dismissed, setDismissed] = useState<Set<UseCaseId>>(new Set());

  // ─── Hero personalization state ───
  const [heroVariant, setHeroVariant] = useState<VariantId>('default');
  const originalContentRef = useRef<OriginalSnapshot | null>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const loaded = loadEnabled();
    if (loaded.size > 0) setEnabled(loaded);

    // Detect UTM variant
    const utmVariant = detectUtmVariant();
    if (utmVariant !== 'default') {
      setHeroVariant(utmVariant);
      // Auto-enable hero personalization if UTM param present
      if (!loaded.has('hero-personalization')) {
        loaded.add('hero-personalization');
        setEnabled(new Set(loaded));
      }
    }

    // Restore saved variant
    try {
      const saved = sessionStorage.getItem(VARIANT_STORAGE_KEY);
      if (saved && ['default', 'overseas', 'shopping', 'dining'].includes(saved)) {
        if (utmVariant === 'default') setHeroVariant(saved as VariantId);
      }
    } catch {}
  }, []);

  // Persist enabled state
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    saveEnabled(enabled);
  }, [enabled]);

  // Persist hero variant
  useEffect(() => {
    try {
      sessionStorage.setItem(VARIANT_STORAGE_KEY, heroVariant);
    } catch {}
  }, [heroVariant]);

  // ─── Hero personalization DOM manipulation ───
  useEffect(() => {
    const isActive = enabled.has('hero-personalization');

    if (!isActive) {
      // Restore originals when disabled
      if (originalContentRef.current) {
        restoreOriginals(originalContentRef.current);
        originalContentRef.current = null;
      }
      return;
    }

    // Save originals on first enable
    if (!originalContentRef.current) {
      originalContentRef.current = saveOriginals();
    }

    if (heroVariant === 'default') {
      // Restore to default
      if (originalContentRef.current) {
        restoreOriginals(originalContentRef.current);
      }
    } else {
      // Apply variant
      applyVariant(heroVariant);
    }
  }, [enabled, heroVariant]);

  const configs = useMemo(() => {
    const c: Record<string, Record<string, any>> = {};
    for (const uc of useCaseList) {
      if (!uc.domManipulation) {
        c[uc.id] = getDefaults(uc.id);
      }
    }
    return c;
  }, []);

  // ─── Delay triggers ───
  useEffect(() => {
    const delayIds: UseCaseId[] = ['popup-dialog', 'scratch-card', 'spin-wheel'];
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (const id of delayIds) {
      if (enabled.has(id) && !modalVisible.has(id) && !dismissed.has(id)) {
        timers.push(
          setTimeout(() => {
            setModalVisible((prev) => new Set([...prev, id]));
          }, 5000)
        );
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [enabled, dismissed]);

  // ─── Exit-intent trigger ───
  useEffect(() => {
    if (!enabled.has('exit-intent') || dismissed.has('exit-intent')) return;

    const handler = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) {
        setModalVisible((prev) => new Set([...prev, 'exit-intent']));
      }
    };
    document.addEventListener('mouseout', handler);
    return () => document.removeEventListener('mouseout', handler);
  }, [enabled, dismissed]);

  // ─── Clear dismissed & visibility when toggled off ───
  useEffect(() => {
    setModalVisible((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const id of prev) {
        if (!enabled.has(id)) { next.delete(id); changed = true; }
      }
      return changed ? next : prev;
    });
    setDismissed((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const id of prev) {
        if (!enabled.has(id)) { next.delete(id); changed = true; }
      }
      return changed ? next : prev;
    });
  }, [enabled]);

  const dismissModal = useCallback((id: UseCaseId) => {
    setModalVisible((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setDismissed((prev) => new Set([...prev, id]));
  }, []);

  const toggleUseCase = (id: UseCaseId) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── Gear button position ───
  let gearBottom = 24;
  if (enabled.has('countdown-offer')) gearBottom += 65;
  if (enabled.has('floating-button') || enabled.has('social-proof'))
    gearBottom += 106;

  function shouldRender(uc: UseCaseEntry): boolean {
    if (uc.domManipulation) return false; // handled via DOM manipulation
    if (!enabled.has(uc.id)) return false;
    if (uc.trigger) return modalVisible.has(uc.id);
    return true;
  }

  return (
    <>
      {/* ─── Rendered use case overlays ─── */}
      {useCaseList.map((uc) => {
        if (!shouldRender(uc)) return null;
        const Preview = previewComponents[uc.id];
        if (!Preview) return null;
        const config = configs[uc.id];
        return (
          <div
            key={uc.id}
            class={`uc-overlay ${uc.modal ? 'uc-overlay-modal' : ''}`}
            style={{ zIndex: uc.modal ? 9995 : 9990 }}
          >
            <Preview
              config={config}
              viewportMode="desktop"
              onClose={uc.modal ? () => dismissModal(uc.id) : undefined}
            />
          </div>
        );
      })}

      {/* ─── Gear button ─── */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        style={{
          position: 'fixed',
          bottom: `${gearBottom}px`,
          right: '24px',
          zIndex: 10100,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#1f2937',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          transition: 'bottom 0.3s ease, transform 0.3s ease',
          transform: panelOpen ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
        title="LPO Use Cases"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* ─── Control panel drawer ─── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: panelOpen ? '0' : '-320px',
          bottom: 0,
          width: '300px',
          zIndex: 10050,
          background: '#ffffff',
          borderLeft: '1px solid #e5e7eb',
          boxShadow: panelOpen ? '-4px 0 24px rgba(0,0,0,0.1)' : 'none',
          transition: 'right 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>LPO Use Cases</div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
              Toggle to inject onto this page
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              fontSize: '20px',
              padding: '4px',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Use case toggles */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {useCaseList.map((uc) => {
            const isEnabled = enabled.has(uc.id);
            const isWaiting = isEnabled && uc.trigger && !modalVisible.has(uc.id);
            return (
              <div key={uc.id}>
                <button
                  onClick={() => toggleUseCase(uc.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 20px',
                    border: 'none',
                    background: isEnabled ? '#f0fdf4' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{uc.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: isEnabled ? '#166534' : '#374151',
                        display: 'block',
                      }}
                    >
                      {uc.title}
                    </span>
                    {isWaiting && (
                      <span style={{ fontSize: '10px', color: '#f59e0b' }}>
                        {uc.trigger === 'delay'
                          ? 'Waiting 5s...'
                          : 'Waiting for exit...'}
                      </span>
                    )}
                  </div>
                  {/* Toggle switch */}
                  <div
                    style={{
                      width: '36px',
                      height: '20px',
                      borderRadius: '10px',
                      background: isEnabled ? '#22c55e' : '#d1d5db',
                      position: 'relative',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#fff',
                        position: 'absolute',
                        top: '2px',
                        left: isEnabled ? '18px' : '2px',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                </button>

                {/* ─── Hero variant radio buttons + search links ─── */}
                {uc.id === 'hero-personalization' && isEnabled && (
                  <div
                    style={{
                      padding: '4px 20px 12px 52px',
                      background: '#f0fdf4',
                    }}
                  >
                    {(['default', 'overseas', 'shopping', 'dining'] as VariantId[]).map((v) => (
                      <label
                        key={v}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#374151',
                        }}
                      >
                        <input
                          type="radio"
                          name="hero-variant"
                          value={v}
                          checked={heroVariant === v}
                          onChange={() => setHeroVariant(v)}
                          style={{ margin: 0, accentColor: '#22c55e' }}
                        />
                        {variantLabels[v]}
                      </label>
                    ))}
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Simulate Search
                      </div>
                      {([
                        { label: 'Overseas', href: 'search/overseas' },
                        { label: 'Shopping', href: 'search/shopping' },
                        { label: 'Dining', href: 'search/dining' },
                      ] as const).map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            color: '#2563EB',
                            textDecoration: 'none',
                            padding: '2px 0',
                          }}
                        >
                          {link.label} &rarr;
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Panel footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid #e5e7eb',
            fontSize: '11px',
            color: '#9ca3af',
            textAlign: 'center',
          }}
        >
          <a
            href="dashboard"
            style={{ color: '#6b7280', textDecoration: 'underline' }}
          >
            Open Dashboard
          </a>
          {' '}for full configuration
        </div>
      </div>

      {/* ─── Backdrop when panel is open ─── */}
      {panelOpen && (
        <div
          onClick={() => setPanelOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10040,
            background: 'rgba(0,0,0,0.15)',
          }}
        />
      )}
    </>
  );
}
