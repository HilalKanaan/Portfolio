import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { bio } from '@/data/bio';
import { haptic } from '../lib/haptics';
import type { OriginRect } from '@/stores/mobile-store';

const TYPED_TEXT = 'Full-Stack Engineer · AI-powered products';

/** Pinned mini-window on the home screen: identity, status, one tap to About. */
export function HeroWidget({ onOpen }: { onOpen: (rect: OriginRect) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) clearInterval(interval);
    }, 34);
    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    haptic();
    const r = ref.current?.getBoundingClientRect();
    onOpen(
      r
        ? { x: r.left, y: r.top, w: r.width, h: r.height }
        : { x: 24, y: 100, w: 280, h: 140 }
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.1 }}
      whileTap={{ scale: 0.98 }}
      onTap={handleTap}
      className="win-raised cursor-pointer"
      style={{ padding: 3 }}
      role="button"
      aria-label="Open About Me"
    >
      {/* Mini title bar */}
      <div
        className="win-title-active flex items-center justify-between px-2"
        style={{ height: 24 }}
      >
        <span className="flex items-center gap-1.5" style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>
          <span aria-hidden>👾</span> hilal_kanaan.exe
        </span>
        <span className="flex gap-[3px]" aria-hidden>
          {['▁', '□', '✕'].map((g) => (
            <span
              key={g}
              className="win-raised flex items-center justify-center"
              style={{ width: 16, height: 14, fontSize: 8, color: '#000' }}
            >
              {g}
            </span>
          ))}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 pt-3 pb-2.5" style={{ background: 'var(--color-win-bg)' }}>
        <div className="pk-pixel" style={{ fontSize: 36, lineHeight: 0.95, color: 'var(--color-win-text)' }}>
          {bio.name}
        </div>
        <div
          className="pk-pixel"
          style={{ fontSize: 17, color: 'var(--color-win-title-active)', minHeight: 22, marginTop: 4 }}
        >
          {typed}
          <span className="pk-blink">▌</span>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <span className="flex items-center gap-1.5" style={{ fontSize: 11 }}>
            <span className="pk-led" aria-hidden />
            <b>OPEN TO ROLES</b>
          </span>
          <span style={{ fontSize: 11, color: 'var(--color-win-dark)' }}>
            📍 Beirut, Lebanon
          </span>
        </div>
      </div>
    </motion.div>
  );
}
