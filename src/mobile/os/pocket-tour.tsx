import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileStore } from '@/stores/mobile-store';
import { useVisitorStore } from '@/stores/visitor-store';
import { haptic } from '../lib/haptics';

export const POCKET_TOURED_KEY = 'hilalos-pocket-toured';

interface TourStep {
  target: string | null;
  title: string;
  message: string;
  /** Round spotlight (for the orb) */
  round?: boolean;
}

const STEPS: TourStep[] = [
  {
    target: null,
    title: 'Welcome to HilalOS!',
    message:
      "This portfolio is a working mini-OS. Every icon is an app — Hilal built all of it, pixel by pixel.",
  },
  {
    target: 'projects',
    title: 'Start here',
    message:
      'My Projects holds real shipped apps, each with live links. Tap any project for the full story.',
  },
  {
    target: 'orb',
    title: 'Meet the AI',
    message:
      "This orb is Hilal's live AI clone. Ask it about skills, experience, or why you should hire him.",
    round: true,
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** 3-step first-visit tour: spotlight + Win95 coach card. */
export function PocketTour() {
  const phase = useMobileStore((s) => s.phase);
  const showVisitorDialog = useVisitorStore((s) => s.showVisitorDialog);
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  // Start after boot + visitor dialog, first visit only
  useEffect(() => {
    if (phase !== 'home' || showVisitorDialog) return;
    if (localStorage.getItem(POCKET_TOURED_KEY)) return;
    const t = setTimeout(() => setActive(true), 900);
    return () => clearTimeout(t);
  }, [phase, showVisitorDialog]);

  // Measure the current step's target
  const step = STEPS[stepIndex];
  useEffect(() => {
    if (!active) return;
    const measure = () => {
      if (!step.target) {
        setRect(null);
        return;
      }
      const el = document.querySelector(`[data-pk-tour="${step.target}"]`);
      if (!el) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      const pad = 8;
      setRect({
        top: r.top - pad,
        left: r.left - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, step]);

  const finish = () => {
    haptic();
    localStorage.setItem(POCKET_TOURED_KEY, '1');
    localStorage.setItem('hilalOS-visited', '1');
    setActive(false);
  };

  const next = () => {
    haptic();
    if (stepIndex >= STEPS.length - 1) finish();
    else setStepIndex(stepIndex + 1);
  };

  const isLast = stepIndex === STEPS.length - 1;
  // Keep the card clear of the orb spotlight on the last step
  const cardBottom = step.target === 'orb' ? 'calc(30dvh)' : 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom) + 52px)';

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          style={{ zIndex: 9400 }}
        >
          {/* Dim layer / spotlight cutout */}
          {rect ? (
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute"
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                borderRadius: step.round ? '50%' : 6,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.62)',
                outline: '2px dotted #fff',
                outlineOffset: 2,
              }}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.62)' }} />
          )}

          {/* Coach card */}
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="win-raised absolute left-4 right-4"
            style={{ bottom: cardBottom, padding: 3, maxWidth: 420, margin: '0 auto' }}
            role="dialog"
            aria-label={step.title}
          >
            <div className="win-title-active flex items-center justify-between px-2" style={{ minHeight: 28 }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>
                📎 {step.title}
              </span>
              <span className="pk-tiny" style={{ color: '#b0c4ff' }}>
                {stepIndex + 1} of {STEPS.length}
              </span>
            </div>
            <div className="px-3 py-2.5" style={{ background: 'var(--color-win-bg)' }}>
              <p className="m-0" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {step.message}
              </p>
              <div className="flex gap-2 mt-3">
                <button type="button" className="pk-btn flex-1" onClick={finish}>
                  Skip
                </button>
                <button type="button" className="pk-btn flex-1 font-bold" onClick={next}>
                  {isLast ? '✓ Got it' : 'Next ▶'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
