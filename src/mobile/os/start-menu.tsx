import { motion, AnimatePresence } from 'framer-motion';
import { useMobileStore } from '@/stores/mobile-store';
import { pocketApps, pocketLinks } from '../data/pocket-apps';
import { haptic } from '../lib/haptics';

function MenuRow({
  icon,
  label,
  onClick,
  bold,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  bold?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        haptic();
        onClick();
      }}
      className="flex items-center gap-3 w-full text-left border-0 bg-transparent cursor-pointer px-3"
      style={{
        minHeight: 48,
        fontSize: 14,
        fontWeight: bold ? 700 : 400,
        color: 'var(--color-win-text)',
        WebkitTapHighlightColor: 'transparent',
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.background = 'var(--color-win-highlight)';
        e.currentTarget.style.color = '#fff';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--color-win-text)';
      }}
    >
      <span style={{ fontSize: 22, width: 28, textAlign: 'center' }} aria-hidden>
        {icon}
      </span>
      {label}
    </button>
  );
}

/** Win95 Start menu as a thumb-reach bottom sheet. */
export function StartMenu() {
  const open = useMobileStore((s) => s.startMenuOpen);
  const setOpen = useMobileStore((s) => s.setStartMenuOpen);
  const launchApp = useMobileStore((s) => s.launchApp);
  const setChatOpen = useMobileStore((s) => s.setChatOpen);
  const triggerBSOD = useMobileStore((s) => s.triggerBSOD);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.35)', zIndex: 9080 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 24, scaleY: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="win-raised fixed left-2 flex"
            style={{
              bottom: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom) + 6px)',
              width: 'min(300px, 82vw)',
              maxHeight:
                'calc(100dvh - var(--pk-taskbar-h) - var(--pk-safe-bottom) - var(--pk-status-h) - var(--pk-safe-top) - 16px)',
              zIndex: 9100,
              transformOrigin: 'bottom left',
              padding: 3,
            }}
            role="menu"
          >
            {/* Sidebar band */}
            <div
              className="win-title-active flex items-end justify-center"
              style={{ width: 28 }}
            >
              <span
                className="pk-pixel"
                style={{
                  color: '#fff',
                  fontSize: 20,
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  padding: '10px 0',
                  letterSpacing: '0.05em',
                }}
              >
                HilalOS 95
              </span>
            </div>

            {/* Items */}
            <div className="flex-1 pk-scroll" style={{ background: 'var(--color-win-bg)' }}>
              {pocketApps.map((app) => (
                <MenuRow
                  key={app.id}
                  icon={app.icon}
                  label={app.label}
                  onClick={() => launchApp(app.id)}
                />
              ))}
              <div
                style={{
                  height: 2,
                  margin: '4px 8px',
                  boxShadow: 'var(--shadow-win-pressed)',
                }}
              />
              <MenuRow
                icon="🔮"
                label="Ask Hilal (AI)"
                bold
                onClick={() => setChatOpen(true)}
              />
              {pocketLinks.map((link) => (
                <MenuRow
                  key={link.id}
                  icon={link.icon}
                  label={link.label}
                  onClick={() => {
                    setOpen(false);
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                  }}
                />
              ))}
              <div
                style={{
                  height: 2,
                  margin: '4px 8px',
                  boxShadow: 'var(--shadow-win-pressed)',
                }}
              />
              <MenuRow icon="🌙" label="Shut Down..." onClick={triggerBSOD} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
