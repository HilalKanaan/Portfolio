import { useMobileStore } from '@/stores/mobile-store';
import { useThemeStore } from '@/stores/theme-store';
import { useWallpaperStore } from '@/stores/wallpaper-store';
import { pocketApps, pocketLinks } from '../data/pocket-apps';
import { AppIcon } from './app-icon';
import { HeroWidget } from './hero-widget';
import { haptic } from '../lib/haptics';

/** The Pocket desktop: wallpaper, hero widget, app grid. */
export function HomeScreen() {
  const launchApp = useMobileStore((s) => s.launchApp);
  const isDark = useThemeStore((s) => s.theme === 'dark');
  const wallpaperColor = useWallpaperStore((s) => s.getColor(isDark));

  return (
    <div
      className="pk-wallpaper pk-scroll absolute left-0 right-0"
      style={{
        top: 'calc(var(--pk-status-h) + var(--pk-safe-top))',
        bottom: 'calc(var(--pk-taskbar-h) + var(--pk-safe-bottom))',
        backgroundColor: wallpaperColor,
      }}
    >
      <div className="px-4 pt-4 pb-6 flex flex-col gap-5">
        <HeroWidget onOpen={(rect) => launchApp('about', rect)} />

        <div className="grid grid-cols-4 gap-x-1 gap-y-4">
          {pocketApps.map((app, i) => (
            <AppIcon
              key={app.id}
              label={app.label}
              icon={app.icon}
              index={i}
              tourId={app.id === 'projects' ? 'projects' : undefined}
              onLaunch={(rect) => launchApp(app.id, rect)}
            />
          ))}
          {pocketLinks.map((link, i) => (
            <AppIcon
              key={link.id}
              label={link.label}
              icon={link.icon}
              index={pocketApps.length + i}
              onLaunch={() => {
                haptic();
                window.open(link.href, '_blank', 'noopener,noreferrer');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
