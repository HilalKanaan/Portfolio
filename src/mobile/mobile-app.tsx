import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { trackVisit } from '@/lib/tracking';
import { useMobileStore } from '@/stores/mobile-store';
import { MobileBoot } from './os/mobile-boot';
import { StatusBar } from './os/status-bar';
import { HomeScreen } from './os/home-screen';
import { AppWindow } from './os/app-window';
import { Taskbar } from './os/taskbar';
import { StartMenu } from './os/start-menu';
import { MobileBSOD } from './os/mobile-bsod';
import { ChatSheet } from './components/chat-sheet';

/** HilalOS Pocket Edition — the phone-OS counterpart of the Win95 desktop. */
export function MobileApp() {
  const phase = useMobileStore((s) => s.phase);
  const openApp = useMobileStore((s) => s.openApp);
  const chatOpen = useMobileStore((s) => s.chatOpen);
  const startMenuOpen = useMobileStore((s) => s.startMenuOpen);
  const showBSOD = useMobileStore((s) => s.showBSOD);

  useEffect(() => {
    trackVisit();
  }, []);

  // Hardware/gesture back button closes the topmost surface instead of leaving
  useEffect(() => {
    const onPop = () => {
      const s = useMobileStore.getState();
      if (s.chatOpen) s.setChatOpen(false);
      else if (s.startMenuOpen) s.setStartMenuOpen(false);
      else if (s.openApp) s.closeApp();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const hasOverlay = !!(openApp || chatOpen || startMenuOpen);
  const prevOverlay = useRef(false);
  useEffect(() => {
    const state = history.state as { pk?: boolean } | null;
    if (hasOverlay && !prevOverlay.current && !state?.pk) {
      history.pushState({ pk: true }, '');
    } else if (!hasOverlay && prevOverlay.current && state?.pk) {
      history.back();
    }
    prevOverlay.current = hasOverlay;
  }, [hasOverlay]);

  return (
    <div className="mobile-app">
      <AnimatePresence mode="wait">
        {phase === 'boot' ? (
          <MobileBoot key="boot" />
        ) : (
          <motion.div
            key="os"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <StatusBar />
            <HomeScreen />
            <AnimatePresence>
              {openApp && <AppWindow key={openApp} id={openApp} />}
            </AnimatePresence>
            <Taskbar />
            <StartMenu />
            <ChatSheet />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{showBSOD && <MobileBSOD key="bsod" />}</AnimatePresence>

      <div className="pk-scanlines" aria-hidden />
    </div>
  );
}
