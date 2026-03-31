import { useCallback, useRef } from 'react';
import { useWindowStore } from '@/stores/window-store';
import { TASKBAR_HEIGHT } from '@/utils/constants';
import type { WindowId } from '@/types/window';

export function useDrag(windowId: WindowId) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const win = useWindowStore.getState().windows[windowId];
      if (!win || win.isMaximized) return;

      useWindowStore.getState().focusWindow(windowId);

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: win.position.x,
        startPosY: win.position.y,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [windowId]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      let newX = dragRef.current.startPosX + dx;
      let newY = dragRef.current.startPosY + dy;

      // Clamp to viewport
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - TASKBAR_HEIGHT - 30;
      newX = Math.max(-100, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      useWindowStore.getState().moveWindow(windowId, { x: newX, y: newY });
    },
    [windowId]
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
