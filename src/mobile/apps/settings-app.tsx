import { useThemeStore } from '@/stores/theme-store';
import { useWallpaperStore, type WallpaperId } from '@/stores/wallpaper-store';
import { haptic } from '../lib/haptics';

const WALLPAPERS: { id: WallpaperId; label: string; color: string }[] = [
  { id: 'teal', label: 'Classic Teal', color: '#008080' },
  { id: 'navy', label: 'Midnight Navy', color: '#000040' },
  { id: 'forest', label: 'Forest Green', color: '#254117' },
  { id: 'plum', label: 'Plum Purple', color: '#3d0c4f' },
  { id: 'storm', label: 'Storm Grey', color: '#3a3a4a' },
  { id: 'matrix', label: 'Matrix', color: '#001100' },
];

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset
      className="p-3 m-0"
      style={{ border: '1px solid var(--color-win-dark)', minWidth: 0 }}
    >
      <legend className="px-1 font-bold" style={{ fontSize: 12 }}>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2.5 w-full text-left border-0 bg-transparent cursor-pointer px-0"
      style={{ minHeight: 44, fontSize: 13, color: 'var(--color-win-text)' }}
      onClick={() => {
        haptic();
        onChange(!checked);
      }}
      role="checkbox"
      aria-checked={checked}
    >
      <span
        className="win-sunken flex items-center justify-center shrink-0"
        style={{ width: 20, height: 20, fontSize: 14, fontWeight: 700, color: '#000' }}
        aria-hidden
      >
        {checked ? '✓' : ''}
      </span>
      {label}
    </button>
  );
}

/** System Settings — theme, wallpaper, effects. Persists via shared stores. */
export function SettingsApp() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const wallpaper = useWallpaperStore((s) => s.wallpaper);
  const setWallpaper = useWallpaperStore((s) => s.setWallpaper);
  const scanlines = useWallpaperStore((s) => s.scanlines);
  const setScanlines = useWallpaperStore((s) => s.setScanlines);

  return (
    <div className="pk-scroll pk-orb-clear flex-1 px-3 py-3 flex flex-col gap-3">
      <Fieldset legend="Appearance">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 13 }}>Theme:</span>
          <button
            type="button"
            className="pk-btn font-bold"
            onClick={() => {
              haptic();
              toggleTheme();
            }}
          >
            {theme === 'classic' ? '☀️ Classic' : '🌙 Dark'}
          </button>
        </div>
        <CheckRow label="CRT Scanline Effect" checked={scanlines} onChange={setScanlines} />
      </Fieldset>

      <Fieldset legend="Wallpaper">
        <div className="grid grid-cols-3 gap-2">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              type="button"
              onClick={() => {
                haptic();
                setWallpaper(wp.id);
              }}
              className="flex flex-col items-center gap-1.5 cursor-pointer bg-transparent p-1.5"
              style={{
                border:
                  wallpaper === wp.id
                    ? '2px solid var(--color-win-highlight)'
                    : '2px solid transparent',
                minHeight: 64,
              }}
              aria-pressed={wallpaper === wp.id}
            >
              <span
                className="win-sunken block w-full"
                style={{ height: 34, backgroundColor: wp.color }}
                aria-hidden
              />
              <span style={{ fontSize: 10 }}>{wp.label}</span>
            </button>
          ))}
        </div>
        <div className="pk-tiny mt-2" style={{ color: 'var(--color-win-dark)' }}>
          Synced with the desktop version of HilalOS
        </div>
      </Fieldset>

      <Fieldset legend="System">
        <div className="pk-pixel" style={{ fontSize: 16, lineHeight: 1.5 }}>
          HilalOS Pocket Edition v1.0
          <br />
          RAM: 640K (enough for anybody)
          <br />
          Uptime: since 1995
        </div>
      </Fieldset>
    </div>
  );
}
