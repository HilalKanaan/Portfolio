import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

const CHIP_POOL = [
  { label: 'Intro', prompt: 'Tell me about yourself' },
  { label: 'Hire Me', prompt: 'Why should I hire you?' },
  { label: 'Projects', prompt: 'Show me your projects' },
  { label: 'Corsa', prompt: 'Tell me about Corsa' },
  { label: 'Stack', prompt: 'What tech stack do you use?' },
  { label: 'Fun Fact', prompt: 'Tell me a fun fact' },
  { label: 'Career', prompt: "What's your work experience?" },
  { label: 'Contact', prompt: 'How can I contact you?' },
  { label: 'Unique', prompt: 'What makes you different?' },
  { label: 'AI/ML', prompt: 'Do you know AI/ML?' },
  { label: 'Why Win95?', prompt: 'Why did you build a Windows 95 portfolio?' },
  { label: 'Open to Work?', prompt: 'Are you open to work?' },
];

interface AiPromptChipsProps {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

export function AiPromptChips({ onSelect, disabled }: AiPromptChipsProps) {
  const usedRef = useRef<Set<string>>(new Set());

  const chips = useMemo(() => {
    const available = CHIP_POOL.filter((c) => !usedRef.current.has(c.label));
    if (available.length < 3) {
      usedRef.current.clear();
      return CHIP_POOL.slice(0, 3);
    }
    return [...available].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [disabled]); // recalculate when loading state changes

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-1">
      {chips.map((chip) => (
        <motion.button
          key={chip.label}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium text-purple-300 whitespace-nowrap disabled:opacity-30"
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
          onClick={() => {
            if (disabled) return;
            usedRef.current.add(chip.label);
            onSelect(chip.prompt);
          }}
          disabled={disabled}
          whileTap={{ scale: 0.95 }}
        >
          {chip.label}
        </motion.button>
      ))}
    </div>
  );
}
