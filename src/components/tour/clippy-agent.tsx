import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TourStep } from '@/data/tour-steps';
import { TOUR_STEPS } from '@/data/tour-steps';

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ClippyAgentProps {
  step: TourStep;
  stepIndex: number;
  targetRect: TargetRect | null;
  isLastStep: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const AGENT_WIDTH = 320;

export function ClippyAgent({
  step,
  stepIndex,
  targetRect,
  isLastStep,
  onNext,
  onSkip,
}: ClippyAgentProps) {
  const totalSteps = TOUR_STEPS.length;

  const position = useMemo(() => {
    if (!targetRect) {
      // Centered on screen
      return {
        top: Math.max(60, window.innerHeight / 2 - 110),
        left: Math.max(20, window.innerWidth / 2 - AGENT_WIDTH / 2),
      };
    }

    const targetCenterX = targetRect.left + targetRect.width / 2;
    let left: number;
    let top = Math.max(20, targetRect.top - 10);

    if (targetCenterX < window.innerWidth / 2) {
      // Target on left → Clippy on right
      left = targetRect.left + targetRect.width + 24;
    } else {
      // Target on right → Clippy on left
      left = targetRect.left - AGENT_WIDTH - 24;
    }

    // Clamp to viewport
    left = Math.max(20, Math.min(left, window.innerWidth - AGENT_WIDTH - 20));
    top = Math.max(20, Math.min(top, window.innerHeight - 220));

    return { top, left };
  }, [targetRect]);

  return (
    <motion.div
      className="fixed pointer-events-auto"
      style={{ width: AGENT_WIDTH }}
      initial={{ opacity: 0, scale: 0.9, top: position.top, left: position.left }}
      animate={{ opacity: 1, scale: 1, top: position.top, left: position.left }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        top: { type: 'spring', damping: 22, stiffness: 180 },
        left: { type: 'spring', damping: 22, stiffness: 180 },
      }}
    >
      {/* Gentle idle bounce */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Win95 window frame */}
        <div className="win-frame">
          {/* Title bar — matches existing title-bar.tsx styling */}
          <div className="flex items-center h-[18px] px-[2px] gap-[2px] win-title-active">
            <span className="text-[12px] leading-none flex-shrink-0">📎</span>
            <span className="text-white text-[11px] font-bold truncate flex-1">
              HilalOS Tour Guide
            </span>
            <button
              onClick={onSkip}
              className="w-[16px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] flex items-center justify-center text-[11px] font-bold leading-none active:shadow-[var(--shadow-win-pressed)]"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-[10px]">
            <div className="flex gap-[10px] items-start">
              {/* Clippy character */}
              <div className="text-[32px] leading-none flex-shrink-0">📎</div>

              {/* Speech bubble text — animates between steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[48px]"
                >
                  <p className="text-[12px] font-bold mb-[3px]">
                    {step.title}
                  </p>
                  <p className="text-[11px] leading-[1.5]">
                    {step.message}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: step counter + navigation buttons */}
            <div className="flex items-center justify-between mt-[10px] pt-[6px] border-t border-[var(--color-win-dark)]">
              <span className="text-[10px] opacity-60">
                Step {stepIndex + 1} of {totalSteps}
              </span>
              <div className="flex gap-[4px]">
                {!isLastStep && (
                  <button
                    onClick={onSkip}
                    className="px-[10px] py-[2px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)]"
                  >
                    Skip Tour
                  </button>
                )}
                <button
                  onClick={onNext}
                  className="px-[10px] py-[2px] text-[11px] font-bold bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)]"
                  style={{ outline: '1px dotted black', outlineOffset: -4 }}
                >
                  {isLastStep ? 'Start Exploring!' : 'Next >'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
