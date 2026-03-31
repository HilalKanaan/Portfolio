import { useState, useEffect, useRef } from 'react';

const TERMINAL_LINES = [
  '> whoami',
  'hilal_kanaan',
  '> cat skills.txt',
  'React | TypeScript | Next.js',
  'Node.js | Express | Python',
  'FastAPI | PostgreSQL | MongoDB',
  'Docker | CI/CD | Firebase',
  '> uptime',
  'Portfolio online since 2025',
  '> echo $STATUS',
  'Open to opportunities!',
  '> cat /etc/motd',
  '┌──────────────────────────┐',
  '│  Welcome to HilalOS      │',
  '│  v1.0 — Retro Edition    │',
  '│  "Ship it or it ships    │',
  '│   without you."          │',
  '└──────────────────────────┘',
  '> neofetch',
  '  ╔═══════════════════╗',
  '  ║     HilalOS       ║',
  '  ║  Kernel: React 19 ║',
  '  ║  Shell: Zustand    ║',
  '  ║  RAM: 640K (enough)║',
  '  ╚═══════════════════╝',
  '> _',
];

export function MiniTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) {
      const timer = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 8000);
      return () => clearTimeout(timer);
    }

    const line = TERMINAL_LINES[currentLine];
    const isCommand = line.startsWith('>');
    const delay = isCommand ? 55 : 8;

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = line.slice(0, currentChar + 1);
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setLines((prev) => [...prev, '']);
      }, isCommand ? 500 : 120);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-[300px] bg-black/90 border border-[#333] shadow-lg">
      {/* Title bar */}
      <div className="flex items-center justify-between px-[8px] py-[3px] bg-[#1a1a1a] border-b border-[#333]">
        <span className="text-[10px] text-[#0f0] font-[var(--font-fixedsys)]">
          hilal@hilalos:~
        </span>
        <div className="flex gap-[6px]">
          <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f56]" />
          <span className="w-[8px] h-[8px] rounded-full bg-[#ffbd2e]" />
          <span className="w-[8px] h-[8px] rounded-full bg-[#27c93f]" />
        </div>
      </div>
      {/* Content */}
      <div
        ref={containerRef}
        className="h-[220px] overflow-hidden px-[8px] py-[6px] font-[var(--font-fixedsys)] text-[11px] leading-[1.6]"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.startsWith('>') ? 'text-[#0f0]' : 'text-[#0a0]'}
            style={{ opacity: line.startsWith('>') ? 1 : 0.7 }}
          >
            {line}
            {i === lines.length - 1 && currentLine < TERMINAL_LINES.length && (
              <span className="inline-block w-[7px] h-[12px] bg-[#0f0] animate-pulse ml-[1px] align-middle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
