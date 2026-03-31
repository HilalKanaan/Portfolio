import { useCallback } from 'react';
import { useDesktopStore } from '@/stores/desktop-store';
import { useWindowStore } from '@/stores/window-store';
import { cn } from '@/utils/cn';
import type { DesktopIconConfig } from '@/types/desktop';
import { DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';

interface DesktopIconProps {
  config: DesktopIconConfig;
  onContextMenu?: (e: React.MouseEvent, config: DesktopIconConfig) => void;
}

export function DesktopIcon({ config, onContextMenu }: DesktopIconProps) {
  const selectedIconId = useDesktopStore((s) => s.selectedIconId);
  const selectIcon = useDesktopStore((s) => s.selectIcon);
  const openWindow = useWindowStore((s) => s.openWindow);
  const isSelected = selectedIconId === config.id;

  const handleDoubleClick = useCallback(() => {
    if (config.href) {
      window.open(config.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (config.windowType) {
      openWindow({
        id: config.id,
        type: config.windowType,
        title: config.label.replace('\n', ' '),
        icon: config.icon,
        position: {
          x: 100 + Math.random() * 200,
          y: 50 + Math.random() * 150,
        },
        size: { ...DEFAULT_WINDOW_SIZE },
        minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
      });
    }
  }, [config, openWindow]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      selectIcon(config.id);
      onContextMenu?.(e, config);
    },
    [config, selectIcon, onContextMenu]
  );

  return (
    <div
      data-tour-id={`icon-${config.id}`}
      className="flex flex-col items-center w-[75px] cursor-pointer gap-[2px] p-[4px]"
      onClick={() => selectIcon(config.id)}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <div
        className={cn(
          'leading-none flex items-center justify-center',
          isSelected && 'bg-[var(--color-win-highlight)] rounded-sm'
        )}
      >
        {config.svgIcon ? (
          <div
            className="w-[32px] h-[32px]"
            dangerouslySetInnerHTML={{ __html: config.svgIcon }}
          />
        ) : (
          <span className="text-[32px]">{config.icon}</span>
        )}
      </div>
      <span
        className={cn(
          'text-[11px] text-center leading-[1.2] break-words max-w-[70px]',
          isSelected
            ? 'bg-[var(--color-win-highlight)] text-[var(--color-win-highlight-text)]'
            : 'text-white [text-shadow:1px_1px_1px_black]'
        )}
        style={{ whiteSpace: 'pre-line' }}
      >
        {config.label}
      </span>
    </div>
  );
}
