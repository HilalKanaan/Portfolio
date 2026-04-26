type IconProps = { size?: number; className?: string; stroke?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

/* ── Project glyphs ────────────────────────────────────────── */

export function GlyphHilalOS({ size = 48 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="3" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 6h20" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.5" cy="4.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="4.5" r="0.5" fill="currentColor" />
      <path d="M8 11h3l1-3 2 6 1-3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 21h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 17v4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function GlyphCorsa({ size = 48 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path
        d="M3 14l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 9l2 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x="2" y="13" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 16h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function GlyphMoney({ size = 48 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="6" width="20" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 13.2v2.6M11 14.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 8.5h2M17 8.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function GlyphStudent({ size = 48 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M2 9l10-5 10 5-10 5L2 9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M22 9v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Social icons ──────────────────────────────────────────── */

export function IconGithub({ size = 20 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.61-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.55-1.13-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34s1.7.11 2.5.34c1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49C19.13 20.59 22 16.76 22 12.25 22 6.58 17.52 2 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconLinkedIn({ size = 20 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.34H5.67v-7.68h2.67v7.68zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zM18.34 17.34h-2.67v-3.74c0-.89-.02-2.04-1.24-2.04-1.24 0-1.43.97-1.43 1.97v3.81h-2.67v-7.68h2.56v1.05h.04c.36-.68 1.23-1.39 2.54-1.39 2.71 0 3.21 1.79 3.21 4.11v3.91z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconX({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── UI icons ──────────────────────────────────────────────── */

export function IconArrowUpRight({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M7 17L17 7M17 7H8M17 7v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowDown({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M12 5v14M19 12l-7 7-7-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronDown({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconClose({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSparkle({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M12 3l1.8 5.4 5.4 1.8-5.4 1.8L12 17.4l-1.8-5.4L4.8 10.2l5.4-1.8L12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path d="M19 4v3M20.5 5.5h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSend({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <path
        d="M12 19V5M5 12l7-7 7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMail({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Project glyph map (lookup helper) */
export const PROJECT_GLYPHS = {
  hilalos: GlyphHilalOS,
  corsa: GlyphCorsa,
  'money-tracker': GlyphMoney,
  'student-rep': GlyphStudent,
} as const;
