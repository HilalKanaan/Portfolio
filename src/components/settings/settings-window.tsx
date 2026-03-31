import { WindowContent } from '@/components/window/window-content';
import { useThemeStore } from '@/stores/theme-store';
import { useWallpaperStore } from '@/stores/wallpaper-store';

const WALLPAPERS = [
  { id: 'teal', label: 'Classic Teal', color: '#008080' },
  { id: 'navy', label: 'Midnight Navy', color: '#000040' },
  { id: 'forest', label: 'Forest Green', color: '#254117' },
  { id: 'plum', label: 'Plum Purple', color: '#3d0c4f' },
  { id: 'storm', label: 'Storm Grey', color: '#3a3a4a' },
  { id: 'matrix', label: 'Matrix', color: '#001100' },
] as const;

export function SettingsWindow() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const wallpaper = useWallpaperStore((s) => s.wallpaper);
  const setWallpaper = useWallpaperStore((s) => s.setWallpaper);
  const showWidgets = useWallpaperStore((s) => s.showWidgets);
  const setShowWidgets = useWallpaperStore((s) => s.setShowWidgets);
  const scanlines = useWallpaperStore((s) => s.scanlines);
  const setScanlines = useWallpaperStore((s) => s.setScanlines);

  return (
    <WindowContent>
      <div className="p-3 space-y-4 text-[12px]">
        {/* Theme */}
        <fieldset className="border border-[var(--color-win-dark)] p-3">
          <legend className="px-1 text-[11px] font-bold">Appearance</legend>
          <div className="flex items-center gap-3">
            <span className="text-[11px]">Theme:</span>
            <button
              onClick={toggleTheme}
              className="h-[22px] px-[10px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer"
            >
              {theme === 'classic' ? '☀️ Classic' : '🌙 Dark'}
            </button>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <label className="flex items-center gap-[6px] text-[11px] cursor-pointer">
              <input
                type="checkbox"
                checked={scanlines}
                onChange={(e) => setScanlines(e.target.checked)}
              />
              CRT Scanline Effect
            </label>
          </div>
        </fieldset>

        {/* Wallpaper */}
        <fieldset className="border border-[var(--color-win-dark)] p-3">
          <legend className="px-1 text-[11px] font-bold">Wallpaper</legend>
          <div className="grid grid-cols-3 gap-[6px]">
            {WALLPAPERS.map((wp) => (
              <button
                key={wp.id}
                onClick={() => setWallpaper(wp.id)}
                className={`flex flex-col items-center gap-[4px] p-[6px] cursor-pointer border-2 ${
                  wallpaper === wp.id
                    ? 'border-[var(--color-win-highlight)]'
                    : 'border-transparent'
                }`}
              >
                <div
                  className="w-[40px] h-[28px] shadow-[var(--shadow-win-sunken)]"
                  style={{ backgroundColor: wp.color }}
                />
                <span className="text-[9px]">{wp.label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Desktop Widgets */}
        <fieldset className="border border-[var(--color-win-dark)] p-3">
          <legend className="px-1 text-[11px] font-bold">Desktop</legend>
          <label className="flex items-center gap-[6px] text-[11px] cursor-pointer">
            <input
              type="checkbox"
              checked={showWidgets}
              onChange={(e) => setShowWidgets(e.target.checked)}
            />
            Show Desktop Widgets
          </label>
        </fieldset>

        {/* System info */}
        <div className="pt-1 border-t border-[var(--color-win-dark)] text-[10px] text-[#888]">
          HilalOS v1.0 — Built with React, TypeScript, Tailwind CSS
        </div>
      </div>
    </WindowContent>
  );
}
