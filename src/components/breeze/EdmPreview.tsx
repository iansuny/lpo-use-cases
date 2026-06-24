import { type Persona, type EdmContent } from '../../lib/breeze-personas';

interface Props {
  persona: Persona;
  edm: EdmContent;
}

const GOLD = '#E9C46A';
const GOLD_DEEP = '#C9A24B';

// Subject-line personalization isn't supported by the product yet, so the
// subject stays fixed — only the email body (offer) is personalized.
const FIXED_SUBJECT = 'Your exclusive Mastercard Travel Rewards offer';

// Small interlocking-circles Mastercard mark.
function MastercardMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="15" r="14" fill="#EB001B" />
      <circle cx="30" cy="15" r="14" fill="#F79E1B" />
      <path d="M24 4.5a14 14 0 0 1 0 21 14 14 0 0 1 0-21z" fill="#FF5F00" />
    </svg>
  );
}

function ToolbarIcon({ path, label }: { path: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      class="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d={path} />
      </svg>
    </button>
  );
}

export function EdmPreview({ persona, edm }: Props) {
  return (
    <div class="mx-auto max-w-2xl px-6 py-6">
      {/* Live-preview hint */}
      <div class="mb-3 flex items-center gap-2 text-xs text-gray-400">
        <span class="relative flex h-1.5 w-1.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Live preview — this email updates as you change spending on the left.
      </div>

      {/* ── Gmail-style open-email view ── */}
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div class="flex items-center gap-0.5 border-b border-gray-100 px-3 py-1.5">
          <ToolbarIcon path="M19 12H5 M12 19l-7-7 7-7" label="Back" />
          <span class="mx-1 h-5 w-px bg-gray-200" />
          <ToolbarIcon path="M21 8v13H3V8 M1 3h22v5H1z M10 12h4" label="Archive" />
          <ToolbarIcon path="M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" label="Delete" />
          <ToolbarIcon path="M4 4h16v16H4z M22 6l-10 7L2 6" label="Mark unread" />
          <ToolbarIcon path="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2" label="More" />
          <div class="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <span>1 of 1,248</span>
            <ToolbarIcon path="M15 18l-6-6 6-6" label="Newer" />
            <ToolbarIcon path="M9 18l6-6-6-6" label="Older" />
          </div>
        </div>

        {/* Subject line */}
        <div class="flex items-start gap-3 px-6 pt-5">
          <h1 class="flex-1 text-xl font-normal text-gray-900">{FIXED_SUBJECT}</h1>
          <span class="mt-1 flex-shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[11px] text-gray-500">Inbox</span>
          <button type="button" aria-label="Star" class="mt-0.5 flex-shrink-0 text-gray-300 hover:text-amber-400 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>

        {/* Sender row */}
        <div class="flex items-center gap-3 px-6 py-4">
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
            <MastercardMark size={26} />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-semibold text-gray-900">Mastercard Travel Rewards</span>
              <span class="truncate text-xs text-gray-500">&lt;rewards@traveler.mastercard.com&gt;</span>
            </div>
            <div class="flex items-center gap-1 text-xs text-gray-500">
              to me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
          <div class="flex flex-shrink-0 items-center gap-2 text-xs text-gray-500">
            <span>10:24 AM (3 hours ago)</span>
            <button type="button" aria-label="Reply" class="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 17l-5-5 5-5 M4 12h11a4 4 0 0 1 4 4v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Email body — single-offer ad poster */}
        <div class="px-4 pb-4">
          <article
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '14px',
              background: `linear-gradient(160deg, ${persona.gradientFrom}, ${persona.gradientTo})`,
              color: '#fff',
            }}
          >
            {/* Decorative glows */}
            <div
              style={{
                position: 'absolute',
                top: '-90px',
                right: '-70px',
                width: '250px',
                height: '250px',
                borderRadius: '999px',
                background: `radial-gradient(circle, ${persona.primaryColor}77, transparent 70%)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-80px',
                width: '270px',
                height: '270px',
                borderRadius: '999px',
                background: 'radial-gradient(circle, rgba(233,196,106,0.18), transparent 70%)',
              }}
            />

            {/* Brand bar */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 22px',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <MastercardMark size={26} />
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#fff' }}>
                TRAVEL REWARDS
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: GOLD,
                  border: `1px solid ${GOLD}66`,
                  borderRadius: '999px',
                  padding: '4px 10px',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '999px', background: GOLD }} />
                WORLD ELITE
              </span>
            </div>

            {/* Poster body */}
            <div style={{ position: 'relative', padding: '32px 28px 34px', textAlign: 'center' }}>
              <div style={{ fontSize: '44px', lineHeight: 1, marginBottom: '14px' }}>{edm.heroIcon}</div>

              <div
                style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: GOLD,
                  border: `1px solid ${GOLD}66`,
                  borderRadius: '999px',
                  padding: '5px 12px',
                  marginBottom: '18px',
                }}
              >
                LIMITED-TIME OFFER
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{ fontSize: '66px', fontWeight: 800, lineHeight: 1, color: GOLD, letterSpacing: '-0.02em' }}>
                  {edm.mainOffer.multiplier}
                </span>
                <span
                  style={{
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    lineHeight: 1.35,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  TRAVEL
                  <br />
                  REWARDS
                  <br />
                  POINTS
                </span>
              </div>

              <h2 style={{ margin: '16px auto 0', maxWidth: '360px', fontSize: '25px', fontWeight: 700, lineHeight: 1.25, color: '#fff' }}>
                {edm.mainOffer.title}
              </h2>

              <p style={{ margin: '12px auto 0', maxWidth: '380px', fontSize: '14px', lineHeight: 1.55, color: 'rgba(255,255,255,0.8)' }}>
                {edm.mainOffer.body}
              </p>

              <button
                type="button"
                style={{
                  marginTop: '24px',
                  padding: '14px 30px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  color: '#1a1304',
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DEEP})`,
                  boxShadow: '0 10px 28px -8px rgba(233,196,106,0.6)',
                }}
              >
                {edm.mainOffer.cta} →
              </button>

              {/* Three-up merchant offers */}
              <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {edm.merchantOffers.map((m) => (
                  <div
                    key={m.merchant}
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '12px',
                      padding: '16px 10px',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{m.icon}</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#fff', marginBottom: '5px', lineHeight: 1.25 }}>
                      {m.merchant}
                    </div>
                    <div style={{ fontSize: '11px', lineHeight: 1.45, color: 'rgba(255,255,255,0.68)' }}>
                      {m.offer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal footer */}
            <div
              style={{
                position: 'relative',
                padding: '14px 22px',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                Offer ends Dec 31 · <span style={{ textDecoration: 'underline' }}>Unsubscribe</span>
              </span>
            </div>
          </article>
        </div>

        {/* Reply / Forward actions */}
        <div class="flex gap-2 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 17l-5-5 5-5 M4 12h11a4 4 0 0 1 4 4v2" />
            </svg>
            Reply
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 17l5-5-5-5 M20 12H9a4 4 0 0 0-4 4v2" />
            </svg>
            Forward
          </button>
        </div>
      </div>
    </div>
  );
}
