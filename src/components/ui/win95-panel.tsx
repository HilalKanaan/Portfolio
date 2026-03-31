import { cn } from '@/utils/cn';

interface Win95PanelProps {
  children: React.ReactNode;
  variant?: 'raised' | 'sunken' | 'frame';
  className?: string;
}

export function Win95Panel({
  children,
  variant = 'raised',
  className,
}: Win95PanelProps) {
  return (
    <div
      className={cn(
        variant === 'raised' && 'win-raised',
        variant === 'sunken' && 'win-sunken',
        variant === 'frame' && 'win-frame',
        className
      )}
    >
      {children}
    </div>
  );
}
