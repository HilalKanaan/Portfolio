import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/window-store';
import { Z_INDEX, DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';

const TOAST_MESSAGES = [
  {
    title: '💬 Hilal Agent signed in',
    body: "Ask me anything about my work — I don't bite (I'm an AI).",
  },
  {
    title: '📨 New message from Hilal',
    body: 'Fun fact: I can open any window on this desktop. Try me.',
  },
  {
    title: '⚠️ System Notice',
    body: 'The developer trapped inside this OS wants to talk to you.',
  },
  {
    title: '🔮 Hilal Agent',
    body: "I know you're curious. Just click here.",
  },
  {
    title: '📢 HilalOS Alert',
    body: "I'm literally an AI clone of the developer. That's pretty cool, right?",
  },
];

// Show toasts at 10s, 30s, 60s after desktop loads
const TOAST_DELAYS = [10_000, 30_000, 60_000];

export function AiNotificationToast() {
  const [currentToast, setCurrentToast] = useState<typeof TOAST_MESSAGES[0] | null>(null);
  const [toastIndex, setToastIndex] = useState(0);
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);

  const chatIsOpen = !!windows['ai-chat'];

  const openChat = useCallback(() => {
    setCurrentToast(null);
    openWindow({
      id: 'ai-chat',
      type: 'ai-chat',
      title: 'Hilal Agent',
      icon: '🔮',
      position: { x: 300, y: 100 },
      size: { ...DEFAULT_WINDOW_SIZE },
      minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
    });
  }, [openWindow]);

  useEffect(() => {
    if (chatIsOpen) {
      setCurrentToast(null);
      return;
    }

    const timers = TOAST_DELAYS.map((delay, i) =>
      setTimeout(() => {
        if (useWindowStore.getState().windows['ai-chat']) return;
        setCurrentToast(TOAST_MESSAGES[i % TOAST_MESSAGES.length]);
        setToastIndex(i);
        // Auto-dismiss after 6 seconds
        setTimeout(() => setCurrentToast(null), 6000);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [chatIsOpen]);

  // Don't render anything if chat has been opened
  if (chatIsOpen) return null;

  return (
    <AnimatePresence>
      {currentToast && (
        <motion.div
          key={toastIndex}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-[36px] right-[8px] w-[260px] cursor-pointer"
          style={{ zIndex: Z_INDEX.AI_ORB + 1 }}
          onClick={openChat}
        >
          {/* Win95 window chrome */}
          <div className="bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] border border-[var(--color-win-dark)]">
            {/* Title bar */}
            <div className="flex items-center h-[18px] px-[2px] bg-gradient-to-r from-[#000080] to-[#1084d0]">
              <span className="text-white text-[11px] font-bold px-[2px] truncate flex-1">
                {currentToast.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentToast(null);
                }}
                className="w-[14px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] flex items-center justify-center text-[10px] leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>
            {/* Body */}
            <div className="p-[8px] flex items-start gap-[8px]">
              <span className="text-[24px] flex-shrink-0">🔮</span>
              <div>
                <p className="text-[11px] font-[var(--font-fixedsys)] leading-[1.4] text-[#333]">
                  {currentToast.body}
                </p>
                <p className="text-[9px] text-[#888] mt-[4px] font-[var(--font-fixedsys)]">
                  Click to chat →
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
