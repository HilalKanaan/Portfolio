import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootSequence } from '@/hooks/use-boot-sequence';
import { BiosScreen } from './bios-screen';
import { AiInterrupt } from './ai-interrupt';
import { Z_INDEX } from '@/utils/constants';

export function BootSequence() {
  const { displayedLines, phase, skipToDesktop } = useBootSequence();

  useEffect(() => {
    const handleSkip = () => {
      if (phase !== 'desktop') skipToDesktop();
    };
    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [phase, skipToDesktop]);

  return (
    <motion.div
      className="fixed inset-0 bg-black overflow-hidden cursor-pointer"
      style={{ zIndex: Z_INDEX.BOOT }}
      onClick={skipToDesktop}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {phase === 'bios' && (
          <motion.div
            key="bios"
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
          >
            <BiosScreen lines={displayedLines} />
          </motion.div>
        )}
        {(phase === 'ai-interrupt' || phase === 'loading') && (
          <motion.div
            key="ai-interrupt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AiInterrupt />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 font-[var(--font-fixedsys)] text-[12px] text-[#555] animate-pulse">
        Click or press any key to skip
      </div>
    </motion.div>
  );
}
