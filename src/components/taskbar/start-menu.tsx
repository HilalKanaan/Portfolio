import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { startMenuItems } from '@/data/start-menu-items';
import { useWindowStore } from '@/stores/window-store';
import { useThemeStore } from '@/stores/theme-store';
import { useBootStore } from '@/stores/boot-store';
import { Z_INDEX, DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';
import type { WindowType } from '@/types/window';

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const openWindow = useWindowStore((s) => s.openWindow);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid the start button click from immediately closing
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleItemClick = (item: (typeof startMenuItems)[number]) => {
    switch (item.action) {
      case 'open-window':
        if (item.windowType) {
          openWindow({
            id: item.windowType,
            type: item.windowType as WindowType,
            title: item.label,
            icon: item.icon,
            position: {
              x: 100 + Math.random() * 200,
              y: 50 + Math.random() * 150,
            },
            size: { ...DEFAULT_WINDOW_SIZE },
            minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
          });
        }
        break;
      case 'link':
        if (item.href) {
          window.open(item.href, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'theme-toggle':
        toggleTheme();
        break;
      case 'shutdown': {
        // 20% chance of BSOD easter egg
        const triggerBSOD = (
          window as unknown as Record<string, (() => void) | undefined>
        ).__triggerBSOD;
        if (Math.random() < 0.2 && triggerBSOD) {
          triggerBSOD();
        } else {
          localStorage.removeItem('sentient-os-skip-boot');
          useBootStore.getState().setPhase('bios');
          useBootStore.setState({ currentLine: 0 });
        }
        break;
      }
    }
    onClose();
  };

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-full left-0 mb-0 bg-[var(--color-win-bg)] shadow-[var(--shadow-win-frame)] min-w-[200px]"
      style={{ zIndex: Z_INDEX.START_MENU }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Sidebar */}
      <div className="flex">
        <div className="w-[24px] bg-[var(--color-win-dark)] flex items-end py-2 px-1">
          <span
            className="text-white text-[10px] font-bold [writing-mode:vertical-rl] rotate-180"
          >
            HilalOS
          </span>
        </div>
        <div className="flex-1">
          {startMenuItems.map((item) => (
            <div key={item.id}>
              {item.id === 'shutdown' && (
                <div className="h-[1px] bg-[var(--color-win-dark)] mx-1 my-[2px]" />
              )}
              <button
                className="w-full flex items-center gap-[8px] px-[8px] py-[4px] text-[12px] text-left hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer bg-transparent border-none"
                onClick={() => handleItemClick(item)}
              >
                <span className="text-[16px] w-[20px] text-center flex-shrink-0">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
