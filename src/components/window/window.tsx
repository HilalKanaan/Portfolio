import { useWindowStore } from '@/stores/window-store';
import { TitleBar } from './title-bar';
import { TASKBAR_HEIGHT } from '@/utils/constants';
import type { WindowId } from '@/types/window';

interface WindowProps {
  windowId: WindowId;
  children: React.ReactNode;
}

export function Window({ windowId, children }: WindowProps) {
  const win = useWindowStore((s) => s.windows[windowId]);
  const focusWindow = useWindowStore((s) => s.focusWindow);

  if (!win || win.isMinimized) return null;

  const isMaximized = win.isMaximized;
  const style = isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
      }
    : {
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      className="absolute flex flex-col bg-[var(--color-win-bg)] shadow-[var(--shadow-win-frame)] p-[2px]"
      style={style}
      onPointerDown={() => focusWindow(windowId)}
    >
      <TitleBar windowId={windowId} title={win.title} icon={win.icon} />
      <div className="flex-1 flex flex-col m-[2px] mt-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
