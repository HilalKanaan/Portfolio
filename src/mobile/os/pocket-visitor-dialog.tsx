import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorStore } from '@/stores/visitor-store';
import { haptic } from '../lib/haptics';

const INTRO_TEXT = 'Identifying user profile...';

function OptionRow({
  icon,
  label,
  description,
  onPick,
  delay,
}: {
  icon: string;
  label: string;
  description: string;
  onPick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        haptic([10, 40, 10]);
        onPick();
      }}
      className="pk-btn flex items-center gap-3 w-full text-left"
      style={{ minHeight: 64, padding: '10px 12px' }}
    >
      <span style={{ fontSize: 28 }} aria-hidden>
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-bold" style={{ fontSize: 14 }}>
          {label}
        </span>
        <span style={{ fontSize: 11.5, color: 'var(--color-win-dark)', lineHeight: 1.35 }}>
          {description}
        </span>
      </span>
    </motion.button>
  );
}

/** First-visit user setup: recruiter vs visitor — feeds the AI context + analytics. */
export function PocketVisitorDialog() {
  const showVisitorDialog = useVisitorStore((s) => s.showVisitorDialog);
  const setVisitorType = useVisitorStore((s) => s.setVisitorType);
  const [typed, setTyped] = useState('');
  const typingDone = typed.length >= INTRO_TEXT.length;

  useEffect(() => {
    if (!showVisitorDialog || typingDone) return;
    const t = setTimeout(() => setTyped(INTRO_TEXT.slice(0, typed.length + 1)), 32);
    return () => clearTimeout(t);
  }, [showVisitorDialog, typed, typingDone]);

  return (
    <AnimatePresence>
      {showVisitorDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-5"
          style={{ zIndex: 9500, background: 'rgba(0,0,0,0.55)' }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="win-raised w-full"
            style={{ maxWidth: 360, padding: 3 }}
            role="dialog"
            aria-label="HilalOS user setup"
          >
            {/* Title bar */}
            <div className="win-title-active flex items-center gap-2 px-2" style={{ minHeight: 32 }}>
              <span aria-hidden>🖥️</span>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>
                HilalOS — User Setup
              </span>
            </div>

            <div className="p-3" style={{ background: 'var(--color-win-bg)' }}>
              {/* Terminal intro */}
              <div
                className="px-2.5 py-2 mb-3 pk-pixel"
                style={{
                  background: '#000',
                  boxShadow: 'var(--shadow-win-sunken)',
                  color: '#00ff41',
                  fontSize: 17,
                  lineHeight: 1.5,
                }}
              >
                <span style={{ opacity: 0.6 }}>C:\HILAL_OS&gt; </span>
                {typed}
                {!typingDone && <span className="pk-blink">▌</span>}
                {typingDone && (
                  <div style={{ opacity: 0.7, fontSize: 15 }}>
                    USER_TYPE not set. Manual selection required.
                  </div>
                )}
              </div>

              {typingDone && (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bold m-0 mb-2"
                    style={{ fontSize: 13 }}
                  >
                    Select your access profile:
                  </motion.p>
                  <div className="flex flex-col gap-2">
                    <OptionRow
                      icon="💼"
                      label="Recruiter / Hiring"
                      description="Looking at Hilal's work for a role or opportunity"
                      onPick={() => setVisitorType('recruiter')}
                      delay={0.1}
                    />
                    <OptionRow
                      icon="🧑‍💻"
                      label="Explorer / Visitor"
                      description="Just checking things out or here for fun"
                      onPick={() => setVisitorType('visitor')}
                      delay={0.2}
                    />
                  </div>
                  <div
                    className="mt-2.5 px-1 pk-tiny"
                    style={{ color: 'var(--color-win-dark)' }}
                  >
                    Sets the AI greeting · no data sold, ever
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
