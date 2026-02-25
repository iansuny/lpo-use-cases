import { useState, useCallback } from 'preact/hooks';

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-HTTPS contexts
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div>
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        TamperMonkey Script
      </h3>
      <pre class="overflow-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100 leading-relaxed max-h-52 mb-3">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        class={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
          copied
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {copied ? 'Copied!' : 'Copy Script'}
      </button>
    </div>
  );
}
