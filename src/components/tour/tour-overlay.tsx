import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTourStore } from '@/stores/tour-store';
import { TOUR_STEPS } from '@/data/tour-steps';
import { ClippyAgent } from './clippy-agent';
import { Z_INDEX } from '@/utils/constants';

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function TourOverlay() {
  const isActive = useTourStore((s) => s.isActive);
  const currentStepIndex = useTourStore((s) => s.currentStepIndex);
  const nextStep = useTourStore((s) => s.nextStep);
  const skipTour = useTourStore((s) => s.skipTour);

  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);

  const step = isActive ? TOUR_STEPS[currentStepIndex] : null;

  // Measure the target element's position with padding
  const measure = useCallback(() => {
    if (!step?.targetId) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(`[data-tour-id="${step.targetId}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const padding = 8;
      setTargetRect({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      });
    } else {
      setTargetRect(null);
    }
  }, [step?.targetId]);

  // Re-measure on step change and window resize
  useEffect(() => {
    if (!isActive) return;
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [isActive, measure]);

  return (
    <AnimatePresence>
      {isActive && step && (
        <motion.div
          key="tour-overlay"
          className="fixed inset-0"
          style={{ zIndex: Z_INDEX.TOUR_OVERLAY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Click blocker — prevents interaction with desktop below.
              When there's no target, it doubles as the dim background. */}
          {targetRect ? (
            <div className="fixed inset-0" style={{ pointerEvents: 'auto' }} />
          ) : (
            <div
              className="fixed inset-0"
              style={{ pointerEvents: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            />
          )}

          {/* Spotlight cutout — box-shadow technique creates the
              dark overlay with a hole around the target element. */}
          <AnimatePresence>
            {targetRect && (
              <motion.div
                key="spotlight"
                className="fixed pointer-events-none"
                style={{
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
                  borderRadius: 2,
                }}
                initial={{
                  opacity: 0,
                  top: targetRect.top,
                  left: targetRect.left,
                  width: targetRect.width,
                  height: targetRect.height,
                }}
                animate={{
                  opacity: 1,
                  top: targetRect.top,
                  left: targetRect.left,
                  width: targetRect.width,
                  height: targetRect.height,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.3 },
                  default: { type: 'spring', damping: 25, stiffness: 200 },
                }}
              >
                {/* Pulsing highlight border */}
                <motion.div
                  className="absolute border-2 border-white/80 rounded-sm"
                  style={{ inset: -2 }}
                  animate={{ opacity: [0.8, 0.3, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clippy agent */}
          <ClippyAgent
            step={step}
            stepIndex={currentStepIndex}
            targetRect={targetRect}
            isLastStep={currentStepIndex === TOUR_STEPS.length - 1}
            onNext={nextStep}
            onSkip={skipTour}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
