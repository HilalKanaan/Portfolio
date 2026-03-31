import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/stores/window-store';
import { useThemeStore } from '@/stores/theme-store';
import { useWallpaperStore } from '@/stores/wallpaper-store';
import type { WindowType } from '@/types/window';
import { DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const openWindow = useWindowStore((s) => s.openWindow);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const theme = useThemeStore((s) => s.theme);
  const showWidgets = useWallpaperStore((s) => s.showWidgets);
  const setShowWidgets = useWallpaperStore((s) => s.setShowWidgets);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handle);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handle);
    };
  }, [onClose]);

  const openWin = (type: WindowType, title: string, icon: string) => {
    openWindow({
      id: type,
      type,
      title,
      icon,
      position: { x: x + 20, y: y + 20 },
      size: { ...DEFAULT_WINDOW_SIZE },
      minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
    });
    onClose();
  };

  const items: {
    label: string;
    icon: string;
    action: () => void;
    divider?: boolean;
  }[] = [
    {
      label: 'View Source',
      icon: '👁️',
      action: () => {
        window.open('https://github.com/HilalKanaan', '_blank');
        onClose();
      },
    },
    {
      label: 'Refresh',
      icon: '🔄',
      action: () => {
        document.documentElement.classList.add('glitch-active');
        setTimeout(() => document.documentElement.classList.remove('glitch-active'), 500);
        onClose();
      },
    },
    {
      label: `Switch to ${theme === 'classic' ? 'Dark' : 'Classic'} Mode`,
      icon: theme === 'classic' ? '🌙' : '☀️',
      action: () => {
        toggleTheme();
        onClose();
      },
      divider: true,
    },
    {
      label: showWidgets ? 'Hide Widgets' : 'Show Widgets',
      icon: '🧩',
      action: () => {
        setShowWidgets(!showWidgets);
        onClose();
      },
    },
    {
      label: 'System Settings',
      icon: '⚙️',
      action: () => openWin('settings', 'System Settings', '⚙️'),
      divider: true,
    },
    {
      label: 'About Me',
      icon: '📄',
      action: () => openWin('about', 'About Me.txt', '📄'),
    },
    {
      label: 'My Projects',
      icon: '📂',
      action: () => openWin('projects', 'My Projects', '📂'),
    },
    {
      label: 'Chat with Hilal',
      icon: '🔮',
      action: () => openWin('ai-chat', 'Hilal Agent', '🔮'),
      divider: true,
    },
    {
      label: 'Download Resume',
      icon: '📋',
      action: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      },
    },
  ];

  // Clamp position to stay on screen
  const menuWidth = 200;
  const menuHeight = items.length * 26 + 20;
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 40);

  return (
    <motion.div
      ref={ref}
      className="fixed bg-[var(--color-win-bg)] shadow-[var(--shadow-win-frame)] py-[2px] min-w-[200px]"
      style={{ left: clampedX, top: clampedY, zIndex: 9500 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {items.map((item, i) => (
        <div key={i}>
          {item.divider && i > 0 && (
            <div className="h-[1px] bg-[var(--color-win-dark)] mx-[3px] my-[2px]" />
          )}
          <button
            className="w-full flex items-center gap-[8px] px-[20px] py-[3px] text-[12px] text-left hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer bg-transparent border-none"
            onClick={item.action}
          >
            <span className="text-[14px] w-[18px] text-center flex-shrink-0">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        </div>
      ))}
    </motion.div>
  );
}
