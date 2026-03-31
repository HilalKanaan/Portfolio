import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Z_INDEX } from '@/utils/constants';

interface BSODProps {
  onDismiss: () => void;
}

const BSOD_ERRORS = [
  'COMMUNICATION_SKILLS_TOO_HIGH',
  'TEAMWORK_BUFFER_OVERFLOW',
  'CREATIVITY_INDEX_OUT_OF_RANGE',
  'PROBLEM_SOLVING_STACK_EXCEEDED',
  'WORK_ETHIC_EXCEEDS_MAX_INT',
  'CAFFEINE_DEPENDENCY_INJECTION_FAILED',
  'DEADLINE_HANDLER_OVERCLOCKED',
  'CODE_REVIEW_POLITENESS_OVERFLOW',
  'IMPOSTER_SYNDROME_NULL_REFERENCE',
  'GIT_COMMIT_QUALITY_TOO_CLEAN',
];

function getRandomErrors(count: number): string[] {
  const shuffled = [...BSOD_ERRORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function BSOD({ onDismiss }: BSODProps) {
  const [errors] = useState(() => getRandomErrors(5));
  const [showCursor, setShowCursor] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  const allLines = [
    'A fatal exception has occurred at 0x00000PORTFOLIO',
    '',
    'HilalOS encountered a critical soft-skills overflow.',
    'Hilal\'s qualifications have exceeded system limits.',
    '',
    'Technical dump:',
    '',
    ...errors.map((e) => `  * ERROR: ${e}`),
    '',
    'The system has been halted to prevent further impressiveness.',
    '',
    'Press any key to reboot HilalOS...',
  ];

  // Reveal lines one by one
  useEffect(() => {
    if (visibleLines >= allLines.length) {
      setShowCursor(true);
      return;
    }
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 80);
    return () => clearTimeout(timer);
  }, [visibleLines, allLines.length]);

  // Listen for dismiss
  useEffect(() => {
    if (!showCursor) return;
    const handleDismiss = () => onDismiss();
    window.addEventListener('keydown', handleDismiss);
    window.addEventListener('click', handleDismiss);
    return () => {
      window.removeEventListener('keydown', handleDismiss);
      window.removeEventListener('click', handleDismiss);
    };
  }, [showCursor, onDismiss]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center p-8"
      style={{
        zIndex: Z_INDEX.BOOT + 100,
        backgroundColor: '#0000aa',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div className="max-w-[600px] w-full">
        {/* Title bar */}
        <div className="text-center mb-4">
          <span className="bg-[#aaaaaa] text-[#0000aa] px-4 py-[2px] font-[var(--font-fixedsys)] text-[14px] font-bold">
            HilalOS
          </span>
        </div>

        {/* Error text */}
        <div className="font-[var(--font-fixedsys)] text-white text-[14px] leading-[1.6]">
          {allLines.slice(0, visibleLines).map((line, i) => (
            <div key={i}>{line || '\u00A0'}</div>
          ))}
          {showCursor && (
            <span className="inline-block w-[8px] h-[14px] bg-white animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
