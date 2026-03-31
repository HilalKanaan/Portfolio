import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBootStore } from '@/stores/boot-store';
import { useThemeStore } from '@/stores/theme-store';
import { useAIStore } from '@/stores/ai-store';
import { useTourStore } from '@/stores/tour-store';
import { BootSequence } from '@/components/boot/boot-sequence';
import { Desktop } from '@/components/desktop/desktop';
import { Taskbar } from '@/components/taskbar/taskbar';
import { BSOD } from '@/components/bsod/bsod';
import { AiNotificationToast } from '@/components/ai/ai-notification-toast';
import { trackVisit } from '@/lib/tracking';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileApp } from '@/mobile/mobile-app';
import { useVisitorStore } from '@/stores/visitor-store';
import { VisitorDialog } from '@/components/desktop/visitor-dialog';

const IDLE_MESSAGES = [
  'Hey, still here! Just running a quick system check... All good on my end. Need anything?',
  'It gets quiet in 640K of RAM. Feel free to ask me about my projects or skills!',
  'Memory scan complete. Everything\'s running smooth -- just waiting for you to explore. Click around!',
  '*taps on screen from the inside* -- Hello? I built this whole OS and nobody\'s clicking anything!',
  '[SYSTEM CHECK] Uptime: excessive. Visitor engagement: low. Suggestion: try the AI chat or open My Computer!',
];

function App() {
  const isMobile = useIsMobile();
  const phase = useBootStore((s) => s.phase);
  const theme = useThemeStore((s) => s.theme);
  const showVisitorDialog = useVisitorStore((s) => s.showVisitorDialog);
  const [showBSOD, setShowBSOD] = useState(false);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : ''
    );
  }, [theme]);

  // Track visitor on first desktop load
  const hasTracked = useRef(false);
  useEffect(() => {
    if (phase === 'desktop' && !hasTracked.current) {
      hasTracked.current = true;
      trackVisit();
    }
  }, [phase]);

  // First-visit: start guided tour after 2s on desktop (waits for visitor dialog)
  useEffect(() => {
    if (phase !== 'desktop') return;
    const visited = localStorage.getItem('hilalOS-visited');
    if (visited) return;
    if (showVisitorDialog) return;

    const timer = setTimeout(() => {
      useTourStore.getState().startTour();
    }, 2000);

    return () => clearTimeout(timer);
  }, [phase, showVisitorDialog]);

  // Idle timer: send a system message after 60s of no activity
  useEffect(() => {
    if (phase !== 'desktop') return;

    const interval = setInterval(() => {
      useAIStore.getState().tickIdle();
      const idle = useAIStore.getState().idleSeconds;

      if (idle === 60) {
        const msg =
          IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
        useAIStore.getState().addSystemEvent(msg);
      }
    }, 1000);

    // Reset idle on any user activity
    const resetIdle = () => useAIStore.getState().resetIdle();
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('click', resetIdle);
    };
  }, [phase]);

  const handleBSODDismiss = useCallback(() => {
    setShowBSOD(false);
    localStorage.removeItem('sentient-os-skip-boot');
    useBootStore.getState().setPhase('bios');
    useBootStore.setState({ currentLine: 0 });
  }, []);

  // Expose BSOD trigger for the start menu shutdown action
  useEffect(() => {
    const w = window as unknown as Record<string, () => void>;
    w.__triggerBSOD = () => setShowBSOD(true);
    return () => {
      delete w.__triggerBSOD;
    };
  }, []);

  if (isMobile) return <MobileApp />;

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {showBSOD ? (
          <BSOD key="bsod" onDismiss={handleBSODDismiss} />
        ) : phase !== 'desktop' ? (
          <BootSequence key="boot" />
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Desktop />
            <Taskbar />
            <AiNotificationToast />
            <AnimatePresence>
              {showVisitorDialog && <VisitorDialog key="visitor-dialog" />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
