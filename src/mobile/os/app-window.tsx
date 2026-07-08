import { useMemo } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useMobileStore, type MobileAppId } from '@/stores/mobile-store';
import { getPocketApp } from '../data/pocket-apps';
import { haptic } from '../lib/haptics';
import { AboutApp } from '../apps/about-app';
import { ProjectsApp } from '../apps/projects-app';
import { ExperienceApp } from '../apps/experience-app';
import { SkillsApp } from '../apps/skills-app';
import { ContactApp } from '../apps/contact-app';
import { RecycleBinApp } from '../apps/recycle-bin-app';
import { SettingsApp } from '../apps/settings-app';

function AppContent({ id }: { id: MobileAppId }) {
  switch (id) {
    case 'about':
      return <AboutApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'experience':
      return <ExperienceApp />;
    case 'skills':
      return <SkillsApp />;
    case 'contact':
      return <ContactApp />;
    case 'recycle-bin':
      return <RecycleBinApp />;
    case 'settings':
      return <SettingsApp />;
  }
}

/** Full-screen Win95 window: zooms out of the tapped icon, swipes down to close. */
export function AppWindow({ id }: { id: MobileAppId }) {
  const closeApp = useMobileStore((s) => s.closeApp);
  const setChatOpen = useMobileStore((s) => s.setChatOpen);
  const originRect = useMobileStore((s) => s.originRect);
  const app = getPocketApp(id);
  const dragControls = useDragControls();

  // Compute the zoom-from-icon start transform once per open
  const initial = useMemo(() => {
    if (!originRect) return { opacity: 0, scale: 0.9, y: 40 };
    const topOffset = 26; // status bar height (safe area excluded from scale math)
    const vw = window.innerWidth;
    const vh = window.innerHeight - topOffset - 54;
    return {
      opacity: 0.3,
      x: originRect.x,
      y: originRect.y - topOffset,
      scaleX: originRect.w / vw,
      scaleY: originRect.h / vh,
    };
  }, [originRect]);

  const close = () => {
    haptic();
    closeApp();
  };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: 60, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 130 || info.velocity.y > 600) close();
      }}
      className="win-raised fixed left-0 right-0 flex flex-col"
      style={{
        top: 'calc(var(--pk-status-h) + var(--pk-safe-top))',
        bottom: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom))',
        zIndex: 100,
        transformOrigin: '0 0',
        padding: 3,
      }}
      role="dialog"
      aria-label={app.windowTitle}
    >
      {/* Title bar — drag handle for swipe-to-close */}
      <div
        className="win-title-active flex items-center justify-between pl-2 touch-none"
        style={{ minHeight: 40 }}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span
          className="flex items-center gap-2 truncate"
          style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}
        >
          <span aria-hidden>{app.icon}</span>
          <span className="truncate">{app.windowTitle}</span>
        </span>
        <button
          type="button"
          className="pk-btn flex items-center justify-center font-bold shrink-0"
          style={{ width: 44, height: 34, marginRight: 3, fontSize: 15 }}
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Menu bar */}
      <div
        className="flex items-center gap-1 px-1"
        style={{ background: 'var(--color-win-bg)', minHeight: 32, fontSize: 12 }}
      >
        {['File', 'View'].map((m) => (
          <span key={m} className="px-2 py-1" style={{ color: 'var(--color-win-dark)' }}>
            <u>{m[0]}</u>
            {m.slice(1)}
          </span>
        ))}
        <button
          type="button"
          className="px-2 py-1 border-0 bg-transparent cursor-pointer"
          style={{ fontSize: 12, color: 'var(--color-win-text)', minHeight: 32 }}
          onClick={() => {
            haptic();
            setChatOpen(true);
          }}
          aria-label="Help — ask the AI"
        >
          <u>H</u>elp
        </button>
        <span className="flex-1" />
        <span className="pk-tiny pr-2" style={{ color: 'var(--color-win-dark)' }}>
          swipe ▼ to close
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex flex-col" style={{ boxShadow: 'var(--shadow-win-sunken)', background: 'var(--color-win-bg)', padding: 2 }}>
        <AppContent id={id} />
      </div>
    </motion.div>
  );
}
