import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/window-store';
import { Z_INDEX, DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';

const BUBBLE_MESSAGES = [
  'Psst... click me',
  "I'm the dev. AMA.",
  'I can prove I\'m qualified.',
  'Try asking me anything.',
  'I built this whole OS.',
  "Go ahead, I don't bite.",
  'Recruiters love me.',
];

export function AiOrb() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const chatIsOpen = useWindowStore((s) => !!s.windows['ai-chat']);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);

  const handleClick = () => {
    openWindow({
      id: 'ai-chat',
      type: 'ai-chat',
      title: 'Hilal Agent',
      icon: '🔮',
      position: { x: 300, y: 100 },
      size: { ...DEFAULT_WINDOW_SIZE },
      minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
    });
  };

  // Cycle speech bubbles every 12s when chat is not open
  useEffect(() => {
    if (chatIsOpen) {
      setBubbleText(null);
      return;
    }

    let msgIndex = 0;

    // Show first bubble after 5s
    const initialTimer = setTimeout(() => {
      setBubbleText(BUBBLE_MESSAGES[0]);
      setBubbleKey((k) => k + 1);
      msgIndex = 1;

      // Auto-hide after 4s
      setTimeout(() => setBubbleText(null), 4000);
    }, 5000);

    // Then cycle every 12s
    const interval = setInterval(() => {
      if (useWindowStore.getState().windows['ai-chat']) return;
      setBubbleText(BUBBLE_MESSAGES[msgIndex % BUBBLE_MESSAGES.length]);
      setBubbleKey((k) => k + 1);
      msgIndex++;
      setTimeout(() => setBubbleText(null), 4000);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [chatIsOpen]);

  return (
    <motion.div
      data-tour-id="ai-orb"
      className="fixed bottom-[40px] right-[16px] cursor-pointer"
      style={{ zIndex: Z_INDEX.AI_ORB }}
      onClick={handleClick}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with Hilal"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {bubbleText && !chatIsOpen && (
          <motion.div
            key={bubbleKey}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="absolute bottom-[56px] right-0 whitespace-nowrap"
          >
            <div className="relative bg-white text-[10px] font-[var(--font-fixedsys)] text-[#333] px-[8px] py-[4px] shadow-[var(--shadow-win-raised)] border border-[var(--color-win-dark)]">
              {bubbleText}
              {/* Triangle pointer */}
              <div className="absolute -bottom-[6px] right-[16px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[var(--color-win-dark)]" />
              <div className="absolute -bottom-[5px] right-[16px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-lg">
          <span className="text-[24px]">🔮</span>
        </div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          animate={{
            scale: [1, 1.4],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  );
}
