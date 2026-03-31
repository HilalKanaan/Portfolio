import { cn } from '@/utils/cn';

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function StartButton({ isOpen, onClick }: StartButtonProps) {
  return (
    <button
      className={cn(
        'h-[22px] px-[6px] flex items-center gap-[4px] font-bold text-[11px]',
        'bg-[var(--color-win-btn-face)]',
        isOpen
          ? 'shadow-[var(--shadow-win-pressed)]'
          : 'shadow-[var(--shadow-win-raised)]',
        'active:shadow-[var(--shadow-win-pressed)]'
      )}
      onClick={onClick}
    >
      <span className="text-[14px] leading-none">🪟</span>
      <span>Start</span>
    </button>
  );
}
