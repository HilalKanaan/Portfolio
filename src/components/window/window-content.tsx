import { cn } from '@/utils/cn';

interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function WindowContent({
  children,
  className,
  noPadding = false,
}: WindowContentProps) {
  return (
    <div
      className={cn(
        'flex-1 overflow-auto win-scrollbar bg-white',
        'shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#808080]',
        !noPadding && 'p-2',
        className
      )}
    >
      {children}
    </div>
  );
}
