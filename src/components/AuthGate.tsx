import { useState, useEffect, useRef } from 'preact/hooks';

const HASH = '2901595c74cdc156b00b70a6aba9458096b36d37fd9ade4f0e14928eb18d83ac';
const KEY = 'lpo-auth';

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AuthGate() {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(KEY) === 'true'; } catch { return false; }
  });
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authed) {
      document.body.classList.add('lpo-authed');
    } else {
      inputRef.current?.focus();
    }
  }, [authed]);

  if (authed) return null;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const val = inputRef.current?.value ?? '';
    const hash = await sha256(val);
    if (hash === HASH) {
      sessionStorage.setItem(KEY, 'true');
      document.body.classList.add('lpo-authed');
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.select();
    }
  };

  return (
    <div
      data-auth-gate
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff', borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
          padding: '40px 32px', width: '340px', textAlign: 'center',
          animation: shake ? 'auth-shake 0.4s ease' : undefined,
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>&#128274;</div>
        <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>
          Enter Password
        </div>
        <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
          This site is password protected.
        </div>
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          autoComplete="off"
          style={{
            width: '100%', padding: '10px 14px', fontSize: '14px',
            border: `1.5px solid ${error ? '#ef4444' : '#d1d5db'}`,
            borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={() => setError(false)}
        />
        {error && (
          <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>
            Incorrect password. Please try again.
          </div>
        )}
        <button
          type="submit"
          style={{
            marginTop: '16px', width: '100%', padding: '10px',
            background: '#2563eb', color: '#fff', border: 'none',
            borderRadius: '8px', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Unlock
        </button>
      </form>
      <style>{`
        @keyframes auth-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
