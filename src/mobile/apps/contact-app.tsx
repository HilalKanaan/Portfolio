import { useState } from 'react';
import { bio } from '@/data/bio';
import { social } from '@/data/social';
import { haptic } from '../lib/haptics';

const ACTIONS = [
  { icon: '🐙', label: 'GitHub', href: social.github },
  { icon: '💼', label: 'LinkedIn', href: social.linkedin },
  { icon: '🐦', label: 'X / Twitter', href: social.twitter },
  { icon: '📜', label: 'Download Resume', href: social.resume },
];

/** Contact.exe — the conversion screen. */
export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    haptic([10, 40, 10]);
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — mailto below still works
    }
  };

  return (
    <div className="pk-scroll pk-orb-clear flex-1 px-3 py-4">
      <div className="text-center mb-4">
        <div style={{ fontSize: 44 }} aria-hidden>
          📧
        </div>
        <div className="pk-pixel" style={{ fontSize: 30, marginTop: 6 }}>
          {bio.contactHeading}
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--color-win-dark)', margin: '6px auto 0', maxWidth: 300 }}>
          {bio.contactSub}
        </p>
      </div>

      {/* Primary: email */}
      <a
        href={`mailto:${social.email}`}
        className="pk-btn flex items-center justify-center gap-2 font-bold no-underline w-full"
        style={{ minHeight: 52, fontSize: 14, color: 'var(--color-win-text)' }}
        onClick={() => haptic()}
      >
        ✉️ Email Me
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className="w-full mt-2 border-0 bg-transparent cursor-pointer flex items-center justify-center gap-2"
        style={{ minHeight: 44, fontSize: 12 }}
        aria-live="polite"
      >
        <span className="win-sunken px-2 py-1 pk-pixel" style={{ fontSize: 15, color: '#000' }}>
          {social.email}
        </span>
        <span style={{ color: 'var(--color-win-title-active)', fontWeight: 700 }}>
          {copied ? '✓ Copied!' : 'Copy'}
        </span>
      </button>

      <div
        style={{ height: 2, margin: '14px 4px', boxShadow: 'var(--shadow-win-pressed)' }}
      />

      <div className="flex flex-col gap-2">
        {ACTIONS.map((a) => (
          <a
            key={a.label}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn flex items-center gap-3 no-underline"
            style={{ minHeight: 48, color: 'var(--color-win-text)' }}
            onClick={() => haptic()}
          >
            <span style={{ fontSize: 20 }} aria-hidden>
              {a.icon}
            </span>
            <span className="flex-1">{a.label}</span>
            <span aria-hidden>↗</span>
          </a>
        ))}
      </div>

      <div className="pk-tiny text-center mt-4" style={{ color: 'var(--color-win-dark)' }}>
        avg response time: &lt; 24h
      </div>
    </div>
  );
}
