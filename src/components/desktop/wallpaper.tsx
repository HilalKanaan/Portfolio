import { useThemeStore } from '@/stores/theme-store';
import { useWallpaperStore } from '@/stores/wallpaper-store';

export function Wallpaper() {
  const theme = useThemeStore((s) => s.theme);
  const getColor = useWallpaperStore((s) => s.getColor);
  const scanlines = useWallpaperStore((s) => s.scanlines);

  return (
    <>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: getColor(theme === 'dark') }}
      />
      {scanlines && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
            zIndex: 1,
          }}
        />
      )}
    </>
  );
}
