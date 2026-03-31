import { cn } from '@/utils/cn';

interface Win95ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function Win95Button({
  children,
  onClick,
  active = false,
  disabled = false,
  className,
  size = 'md',
}: Win95ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-[var(--color-win-btn-face)] border-none cursor-pointer flex items-center justify-center',
        'font-[var(--font-ms-sans)] text-[var(--color-win-text)]',
        size === 'sm' ? 'w-[16px] h-[14px] p-0' : 'px-[6px] py-[2px] min-w-[75px]',
        active
          ? 'shadow-[var(--shadow-win-pressed)]'
          : 'shadow-[var(--shadow-win-raised)]',
        'active:shadow-[var(--shadow-win-pressed)]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
