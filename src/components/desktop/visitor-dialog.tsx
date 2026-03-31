import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorStore } from '@/stores/visitor-store';
import { Z_INDEX } from '@/utils/constants';
import { cn } from '@/utils/cn';

const INTRO_TEXT = 'Identifying user profile...';
const TYPING_SPEED = 35;

function TypingText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, onComplete]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[7px] h-[12px] bg-[#00ff41] animate-pulse ml-[1px] align-middle" />
      )}
    </span>
  );
}

function OptionCard({
  icon,
  label,
  description,
  focused,
  onClick,
  delay,
}: {
  icon: string;
  label: string;
  description: string;
  focused?: boolean;
  onClick: () => void;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex-1 cursor-pointer text-left p-[10px] min-h-[80px]',
        'active:translate-y-px transition-none'
      )}
      style={{
        fontFamily: 'var(--font-ms-sans)',
        background: hovered ? 'var(--color-win-highlight)' : 'var(--color-win-bg)',
        color: hovered ? 'var(--color-win-highlight-text)' : 'var(--color-win-text)',
        boxShadow: hovered
          ? 'var(--shadow-win-pressed)'
          : 'var(--shadow-win-raised)',
        outline: focused ? '1px dotted black' : 'none',
        outlineOffset: -4,
      }}
    >
      <div className="text-[24px] leading-none mb-[6px]">{icon}</div>
      <div className="text-[12px] font-bold mb-[2px]">{label}</div>
      <div
        className="text-[10px] leading-[1.4]"
        style={{ opacity: hovered ? 0.9 : 0.7 }}
      >
        {description}
      </div>
    </motion.button>
  );
}

export function VisitorDialog() {
  const showVisitorDialog = useVisitorStore((s) => s.showVisitorDialog);
  const setVisitorType = useVisitorStore((s) => s.setVisitorType);
  const [typingDone, setTypingDone] = useState(false);

  if (!showVisitorDialog) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: Z_INDEX.VISITOR_DIALOG, backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="win-frame"
        style={{ width: 380 }}
      >
        {/* Title bar */}
        <div className="flex items-center h-[18px] px-[2px] gap-[2px] win-title-active">
          <span className="text-[12px] leading-none flex-shrink-0">🖥️</span>
          <span
            className="text-white text-[11px] font-bold truncate flex-1"
            style={{ fontFamily: 'var(--font-ms-sans)' }}
          >
            HilalOS — User Setup
          </span>
        </div>

        {/* Body */}
        <div className="p-[14px]">
          {/* Terminal-style intro line */}
          <div
            className="p-[8px] mb-[12px]"
            style={{
              background: '#000',
              boxShadow: 'var(--shadow-win-sunken)',
            }}
          >
            <div
              className="text-[12px] text-[#00ff41] leading-[1.6]"
              style={{ fontFamily: 'var(--font-fixedsys)' }}
            >
              <span className="opacity-60">C:\HILAL_OS&gt; </span>
              <TypingText text={INTRO_TEXT} onComplete={() => setTypingDone(true)} />
            </div>
            <AnimatePresence>
              {typingDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] text-[#00ff41]/70 mt-[2px]"
                  style={{ fontFamily: 'var(--font-fixedsys)' }}
                >
                  USER_TYPE not set. Manual selection required.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Question */}
          <AnimatePresence>
            {typingDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.25 }}
              >
                <p
                  className="text-[12px] font-bold mb-[8px]"
                  style={{ fontFamily: 'var(--font-ms-sans)', color: 'var(--color-win-text)' }}
                >
                  Select your access profile:
                </p>

                {/* Option cards */}
                <div className="flex gap-[8px] mb-[12px]">
                  <OptionCard
                    icon="💼"
                    label="Recruiter / Hiring"
                    description="Looking at Hilal's work for a potential role or opportunity"
                    focused
                    onClick={() => setVisitorType('recruiter')}
                    delay={0.15}
                  />
                  <OptionCard
                    icon="🧑‍💻"
                    label="Explorer / Visitor"
                    description="Just checking things out, browsing, or here for fun"
                    onClick={() => setVisitorType('visitor')}
                    delay={0.25}
                  />
                </div>

                {/* Status bar */}
                <div
                  className="px-[6px] py-[3px] text-[10px]"
                  style={{
                    fontFamily: 'var(--font-fixedsys)',
                    color: 'var(--color-win-text)',
                    boxShadow: 'var(--shadow-win-sunken)',
                    background: 'var(--color-win-bg)',
                  }}
                >
                  <span className="opacity-50">STATUS:</span>{' '}
                  <span className="opacity-70">
                    Awaiting user input
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'loop' }}
                    >
                      _
                    </motion.span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
