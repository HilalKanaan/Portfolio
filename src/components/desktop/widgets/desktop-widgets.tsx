import { useWallpaperStore } from '@/stores/wallpaper-store';
import { MiniTerminal } from './mini-terminal';
import { StickyNote } from './sticky-note';
import { RetroCounter } from './retro-counter';
import { MatrixRain } from './matrix-rain';

export function DesktopWidgets() {
  const showWidgets = useWallpaperStore((s) => s.showWidgets);
  const wallpaper = useWallpaperStore((s) => s.wallpaper);

  if (!showWidgets) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {/* Matrix rain only on matrix wallpaper */}
      {wallpaper === 'matrix' && <MatrixRain />}

      {/* Mini terminal - top right */}
      <div className="absolute top-3 right-3 pointer-events-auto">
        <MiniTerminal />
      </div>

      {/* Sticky note - middle right area */}
      <div className="absolute top-[270px] right-[24px] pointer-events-auto">
        <StickyNote />
      </div>

      {/* Retro visitor counter - bottom left, away from AI orb */}
      <div className="absolute bottom-[12px] left-[100px] pointer-events-auto">
        <RetroCounter />
      </div>
    </div>
  );
}
