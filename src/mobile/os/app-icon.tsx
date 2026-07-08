import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { haptic } from '../lib/haptics';
import type { OriginRect } from '@/stores/mobile-store';

interface AppIconProps {
  label: string;
  icon: string;
  svgIcon?: string;
  onLaunch: (rect: OriginRect) => void;
  index: number;
  /** Anchor id for the first-visit tour spotlight */
  tourId?: string;
}

/** Home-screen icon: Win95 desktop icon adapted to a 44px+ touch target. */
export function AppIcon({ label, icon, svgIcon, onLaunch, index, tourId }: AppIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pressed, setPressed] = useState(false);

  const handleTap = () => {
    haptic();
    const el = ref.current;
    const r = el?.getBoundingClientRect();
    onLaunch(
      r
        ? { x: r.left, y: r.top, w: r.width, h: r.height }
        : { x: window.innerWidth / 2 - 24, y: window.innerHeight / 2 - 24, w: 48, h: 48 }
    );
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, scale: 0.5, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 * index }}
      whileTap={{ scale: 0.9 }}
      onTapStart={() => setPressed(true)}
      onTap={() => {
        setPressed(false);
        handleTap();
      }}
      onTapCancel={() => setPressed(false)}
      className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer"
      style={{ minWidth: 64, minHeight: 72, padding: 4, WebkitTapHighlightColor: 'transparent' }}
      aria-label={label.replace('\n', ' ')}
      data-pk-tour={tourId}
    >
      <span
        className="flex items-center justify-center"
        style={{ width: 44, height: 44, fontSize: 34, lineHeight: 1 }}
      >
        {svgIcon ? (
          <span
            style={{ width: 36, height: 36, display: 'block' }}
            dangerouslySetInnerHTML={{ __html: svgIcon }}
          />
        ) : (
          icon
        )}
      </span>
      <span
        className="pk-icon-label"
        style={{
          background: pressed ? 'var(--color-win-highlight)' : 'transparent',
          outline: pressed ? '1px dotted #fff' : 'none',
          padding: '0 3px',
          whiteSpace: 'pre-line',
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
