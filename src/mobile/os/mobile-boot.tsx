import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileStore } from '@/stores/mobile-store';
import { haptic } from '../lib/haptics';

const VISITED_KEY = 'hilalos-pocket-visited';

const BIOS_LINES = [
  'Award Modular BIOS v6.00PG — Pocket',
  'HILAL KANAAN POCKET SYSTEM BIOS',
  '',
  'CPU: Creative Core i9 @ 4.20 GHz',
  'Memory Test: 640K OK',
  'Detecting touchscreen......... OK',
  'Detecting thumb reach......... OK',
  'Detecting AI core............. ONLINE',
  '',
  'Loading HilalOS Pocket Edition...',
];

/** The classic four-pane Win95 flag, drawn in CSS. */
function PixelFlag({ size = 64 }: { size?: number }) {
  const colors = ['#f25022', '#7fba00', '#00a4ef', '#ffb900'];
  return (
    <div
      className="grid grid-cols-2 grid-rows-2"
      style={{ width: size, height: size, gap: size / 16, transform: 'skewY(-6deg)' }}
    >
      {colors.map((c) => (
        <div key={c} style={{ background: c }} />
      ))}
    </div>
  );
}

export function MobileBoot() {
  const finishBoot = useMobileStore((s) => s.finishBoot);
  const returning = !!localStorage.getItem(VISITED_KEY);
  const [stage, setStage] = useState<'bios' | 'splash'>(returning ? 'splash' : 'bios');
  const [lineCount, setLineCount] = useState(0);

  // Type out BIOS lines
  useEffect(() => {
    if (stage !== 'bios') return;
    if (lineCount >= BIOS_LINES.length) {
      const t = setTimeout(() => setStage('splash'), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineCount((c) => c + 1), 140);
    return () => clearTimeout(t);
  }, [stage, lineCount]);

  // Splash → home
  useEffect(() => {
    if (stage !== 'splash') return;
    const t = setTimeout(() => {
      localStorage.setItem(VISITED_KEY, '1');
      finishBoot();
    }, returning ? 1100 : 1700);
    return () => clearTimeout(t);
  }, [stage, returning, finishBoot]);

  const skip = () => {
    haptic();
    localStorage.setItem(VISITED_KEY, '1');
    finishBoot();
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 10000, background: '#000' }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      onClick={skip}
    >
      <AnimatePresence mode="wait">
        {stage === 'bios' ? (
          <motion.div
            key="bios"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex-1 px-4 pk-pixel"
            style={{
              paddingTop: 'calc(var(--pk-safe-top) + 24px)',
              color: '#aaaaaa',
              fontSize: 17,
              lineHeight: 1.35,
            }}
          >
            {BIOS_LINES.slice(0, lineCount).map((line, i) => (
              <div key={i} style={{ minHeight: '1.35em' }}>
                {line}
              </div>
            ))}
            <span className="pk-blink" style={{ color: '#fff' }}>
              _
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-6"
            style={{ background: 'var(--color-win-desktop)' }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <PixelFlag />
            </motion.div>
            <div className="text-center">
              <div className="pk-pixel" style={{ fontSize: 44, color: '#fff', lineHeight: 1 }}>
                HilalOS
              </div>
              <div className="pk-tiny" style={{ color: '#c0ffee', marginTop: 8 }}>
                Pocket Edition
              </div>
            </div>
            <div className="pk-progress" style={{ width: 180 }}>
              <motion.div
                className="pk-progress-fill"
                initial={{ width: '5%' }}
                animate={{ width: '100%' }}
                transition={{ duration: returning ? 0.9 : 1.5, ease: 'easeInOut' }}
              />
            </div>
            <div className="pk-tiny" style={{ color: 'rgba(255,255,255,0.55)' }}>
              tap to skip
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
