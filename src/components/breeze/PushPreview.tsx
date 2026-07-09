import { type Persona, type EdmContent } from '../../lib/breeze-personas';

interface Props {
  persona: Persona;
  push: EdmContent['push'];
}

// Small interlocking-circles Mastercard mark.
function MastercardMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="15" r="14" fill="#EB001B" />
      <circle cx="30" cy="15" r="14" fill="#F79E1B" />
      <path d="M24 4.5a14 14 0 0 1 0 21 14 14 0 0 1 0-21z" fill="#FF5F00" />
    </svg>
  );
}

export function PushPreview({ persona, push }: Props) {
  return (
    <div class="w-full">
      <div class="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        Push notification
      </div>

      {/* Phone */}
      <div
        class="mx-auto"
        style={{
          width: '300px',
          borderRadius: '40px',
          padding: '10px',
          background: '#0b0b0f',
          boxShadow: '0 24px 60px -20px rgba(0,0,0,0.45)',
        }}
      >
        {/* Lock screen */}
        <div
          style={{
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            minHeight: '520px',
            padding: '18px 14px',
            background: `linear-gradient(160deg, ${persona.gradientFrom}, ${persona.gradientTo})`,
          }}
        >
          {/* Notch */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '24px',
              borderRadius: '999px',
              background: '#0b0b0f',
            }}
          />

          {/* Clock */}
          <div style={{ textAlign: 'center', marginTop: '48px', color: '#fff' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.85 }}>Monday, June 30</div>
            <div style={{ fontSize: '64px', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em' }}>9:41</div>
          </div>

          {/* Notification */}
          <div
            style={{
              marginTop: '32px',
              borderRadius: '18px',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 24px -10px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  display: 'flex',
                  height: '22px',
                  width: '22px',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  background: '#fff',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
                }}
              >
                <MastercardMark size={16} />
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.02em', color: '#1f2937', textTransform: 'uppercase' }}>
                Horizon Wallet
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#9ca3af' }}>now</span>
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{push.title}</div>
            <div style={{ marginTop: '2px', fontSize: '12.5px', color: '#4b5563', lineHeight: 1.4 }}>{push.body}</div>
          </div>

          {/* Secondary (muted, generic) notification for realism */}
          <div
            style={{
              marginTop: '10px',
              borderRadius: '18px',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'flex',
                  height: '22px',
                  width: '22px',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  background: '#34c759',
                  fontSize: '12px',
                }}
              >
                💬
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase' }}>Messages</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#9ca3af' }}>8:02 AM</span>
            </div>
            <div style={{ marginTop: '4px', fontSize: '12.5px', color: '#6b7280' }}>Alex, are we still on for dinner?</div>
          </div>

          {/* Bottom hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '4px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
