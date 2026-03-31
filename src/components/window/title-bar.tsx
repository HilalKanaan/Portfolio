import { useWindowStore } from '@/stores/window-store';
import { cn } from '@/utils/cn';
import type { WindowId } from '@/types/window';
import { useDrag } from '@/hooks/use-drag';

interface TitleBarProps {
  windowId: WindowId;
  title: string;
  icon: string;
}

export function TitleBar({ windowId, title, icon }: TitleBarProps) {
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
  const isActive = activeWindowId === windowId;
  const { onPointerDown, onPointerMove, onPointerUp } = useDrag(windowId);

  return (
    <div
      className={cn(
        'flex items-center h-[18px] px-[2px] gap-[2px] select-none',
        isActive ? 'win-title-active' : 'win-title-inactive'
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: 'none' }}
    >
      <span className="text-[12px] mr-[2px] flex-shrink-0">{icon}</span>
      <span className="text-white text-[11px] font-bold truncate flex-1">
        {title}
      </span>
      <div className="flex gap-[2px] flex-shrink-0">
        {/* Minimize */}
        <button
          className="w-[16px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] flex items-center justify-center text-[9px] leading-none active:shadow-[var(--shadow-win-pressed)]"
          onClick={(e) => {
            e.stopPropagation();
            minimizeWindow(windowId);
          }}
        >
          <span className="block w-[6px] h-[2px] bg-black mt-[4px]" />
        </button>
        {/* Maximize */}
        <button
          className="w-[16px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] flex items-center justify-center text-[9px] leading-none active:shadow-[var(--shadow-win-pressed)]"
          onClick={(e) => {
            e.stopPropagation();
            toggleMaximize(windowId);
          }}
        >
          <span className="block w-[8px] h-[7px] border border-black border-t-2" />
        </button>
        {/* Close */}
        <button
          className="w-[16px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] flex items-center justify-center text-[11px] font-bold leading-none active:shadow-[var(--shadow-win-pressed)]"
          onClick={(e) => {
            e.stopPropagation();
            closeWindow(windowId);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
