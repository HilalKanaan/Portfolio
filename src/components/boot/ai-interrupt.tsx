import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aiInterruptMessages } from '@/data/boot-messages';
import { useBootStore } from '@/stores/boot-store';

export function AiInterrupt() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const setPhase = useBootStore((s) => s.setPhase);

  // Typewriter effect
  useEffect(() => {
    if (lineIndex >= aiInterruptMessages.length) {
      setShowLoading(true);
      return;
    }

    const currentMessage = aiInterruptMessages[lineIndex];
    if (charIndex < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentText]);
        setCurrentText('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, currentText]);

  // Loading bar
  useEffect(() => {
    if (!showLoading) return;
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => setPhase('desktop'), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setLoadingProgress((prev) => Math.min(prev + 3, 100));
    }, 30);
    return () => clearTimeout(timer);
  }, [showLoading, loadingProgress, setPhase]);

  return (
    <motion.div
      initial={{ skewX: 2, scaleY: 0.98 }}
      animate={{ skewX: 0, scaleY: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-start p-4"
    >
      {displayedLines.map((line, i) => (
        <div
          key={i}
          className="font-[var(--font-fixedsys)] text-[14px] text-[#00ff41] leading-[1.6]"
        >
          {line}
        </div>
      ))}
      {currentText && (
        <div className="font-[var(--font-fixedsys)] text-[14px] text-[#00ff41] leading-[1.6]">
          {currentText}
          <span className="inline-block w-[8px] h-[14px] bg-[#00ff41] animate-pulse ml-[1px]" />
        </div>
      )}

      {showLoading && (
        <div className="mt-6 w-[300px]">
          <div className="text-[#00ff41] font-[var(--font-fixedsys)] text-[12px] mb-1">
            Loading desktop... {loadingProgress}%
          </div>
          <div className="w-full h-[16px] bg-[#111] border border-[#00ff41]/30 p-[2px]">
            <motion.div
              className="h-full bg-[#00ff41]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
