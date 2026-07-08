import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileStore } from '@/stores/mobile-store';
import { useClock } from '../lib/use-clock';
import { haptic } from '../lib/haptics';

const HINT_SEEN_KEY = 'hilalos-pocket-ai-hint';

/** Win95 taskbar, rebuilt for thumbs: Start, running app, AI orb, tray clock. */
export function Taskbar() {
  const startMenuOpen = useMobileStore((s) => s.startMenuOpen);
  const setStartMenuOpen = useMobileStore((s) => s.setStartMenuOpen);
  const setChatOpen = useMobileStore((s) => s.setChatOpen);
  const chatOpen = useMobileStore((s) => s.chatOpen);
  const time = useClock();

  // One-time hint bubble pointing at the AI orb.
  // First-timers get the tour instead (its last step covers the orb).
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem(HINT_SEEN_KEY)) return;
    if (!localStorage.getItem('hilalos-pocket-toured')) return;
    const show = setTimeout(() => setShowHint(true), 9000);
    return () => clearTimeout(show);
  }, []);
  useEffect(() => {
    if (!showHint) return;
    const hide = setTimeout(() => {
      setShowHint(false);
      sessionStorage.setItem(HINT_SEEN_KEY, '1');
    }, 7000);
    return () => clearTimeout(hide);
  }, [showHint]);
  useEffect(() => {
    if (chatOpen) setShowHint(false);
  }, [chatOpen]);

  return (
    <>
      {/* AI hint bubble */}
      <AnimatePresence>
        {showHint && !chatOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            onClick={() => {
              sessionStorage.setItem(HINT_SEEN_KEY, '1');
              setShowHint(false);
              haptic();
              setChatOpen(true);
            }}
            className="win-raised fixed left-1/2 -translate-x-1/2 px-3 py-2 cursor-pointer"
            style={{
              bottom: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom) + 44px)',
              zIndex: 9050,
              fontSize: 12,
              maxWidth: 240,
              textAlign: 'center',
            }}
          >
            👋 That orb is <b>me</b> — a live AI clone. Ask me anything.
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI orb — pokes above the bar, dead-center in the thumb zone */}
      <motion.button
        type="button"
        onClick={() => {
          haptic(12);
          setChatOpen(true);
        }}
        whileTap={{ scale: 0.88 }}
        className="fixed left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer border-0"
        style={{
          bottom: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom) - 26px)',
          width: 60,
          height: 60,
          borderRadius: '50%',
          zIndex: 9010,
          background: 'radial-gradient(circle at 35% 30%, #6a5acd, #000080 70%)',
          boxShadow:
            'inset 2px 2px 0 rgba(255,255,255,0.45), inset -2px -2px 0 rgba(0,0,0,0.5), 0 0 0 3px var(--color-win-bg), 0 0 0 4px #404040',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="Open AI chat with Hilal"
        data-pk-tour="orb"
      >
        <motion.span
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 28, lineHeight: 1 }}
          aria-hidden
        >
          🔮
        </motion.span>
        <motion.span
          className="absolute rounded-full pointer-events-none"
          animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ inset: -4, border: '2px solid #9a8cf0' }}
          aria-hidden
        />
      </motion.button>

      {/* Bar */}
      <div
        className="pk-raised-thick fixed left-0 right-0 bottom-0 flex items-center gap-2 px-2"
        style={{
          height: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom))',
          paddingBottom: 'var(--pk-safe-bottom)',
          zIndex: 9000,
        }}
      >
        <button
          type="button"
          className={`pk-btn flex items-center gap-1.5 font-bold ${startMenuOpen ? 'pk-pressed' : ''}`}
          style={{ minWidth: 84 }}
          onClick={() => {
            haptic();
            setStartMenuOpen(!startMenuOpen);
          }}
          aria-expanded={startMenuOpen}
          aria-label="Start menu"
        >
          <span
            className="grid grid-cols-2 grid-rows-2"
            style={{ width: 16, height: 16, gap: 1, transform: 'skewY(-6deg)' }}
            aria-hidden
          >
            <span style={{ background: '#f25022' }} />
            <span style={{ background: '#7fba00' }} />
            <span style={{ background: '#00a4ef' }} />
            <span style={{ background: '#ffb900' }} />
          </span>
          Start
        </button>

        {/* Spacer — the AI orb owns the center */}
        <div className="flex-1" />

        {/* Tray */}
        <div
          className="flex items-center gap-1.5 px-2"
          style={{
            boxShadow: 'var(--shadow-win-pressed)',
            height: 40,
            fontSize: 12,
            whiteSpace: 'nowrap',
          }}
        >
          <span className="pk-led" style={{ width: 6, height: 6 }} aria-hidden />
          {time}
        </div>
      </div>
    </>
  );
}
