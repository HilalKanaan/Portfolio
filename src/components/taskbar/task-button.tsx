import { useWindowStore } from '@/stores/window-store';
import { cn } from '@/utils/cn';
import type { WindowId } from '@/types/window';

interface TaskButtonProps {
  windowId: WindowId;
}

export function TaskButton({ windowId }: TaskButtonProps) {
  const win = useWindowStore((s) => s.windows[windowId]);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  if (!win) return null;

  const isActive = activeWindowId === windowId && !win.isMinimized;

  const handleClick = () => {
    if (isActive) {
      minimizeWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <button
      className={cn(
        'h-[22px] px-[6px] flex items-center gap-[4px] text-[11px] max-w-[160px] truncate',
        'bg-[var(--color-win-btn-face)]',
        isActive
          ? 'shadow-[var(--shadow-win-pressed)] font-bold'
          : 'shadow-[var(--shadow-win-raised)]'
      )}
      onClick={handleClick}
    >
      <span className="text-[12px] flex-shrink-0">{win.icon}</span>
      <span className="truncate">{win.title}</span>
    </button>
  );
}
