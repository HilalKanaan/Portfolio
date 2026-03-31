import { useState, useEffect, useCallback } from 'react';
import { useBootStore } from '@/stores/boot-store';
import { biosMessages } from '@/data/boot-messages';

export function useBootSequence() {
  const { phase, currentLine, advanceLine, setPhase } = useBootStore();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (phase !== 'bios') return;

    if (currentLine >= biosMessages.length) {
      setPhase('ai-interrupt');
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, biosMessages[currentLine].text]);
      advanceLine();
    }, biosMessages[currentLine].delay);

    return () => clearTimeout(timer);
  }, [phase, currentLine, advanceLine, setPhase]);

  const skipToDesktop = useCallback(() => {
    useBootStore.getState().skipBoot();
  }, []);

  return { displayedLines, phase, skipToDesktop };
}
