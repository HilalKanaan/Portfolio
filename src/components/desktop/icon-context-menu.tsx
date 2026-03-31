import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { DesktopIconConfig } from '@/types/desktop';

interface IconContextMenuProps {
  x: number;
  y: number;
  icon: DesktopIconConfig;
  onClose: () => void;
  onOpen: () => void;
  onDelete: () => void;
}

export function IconContextMenu({
  x,
  y,
  icon,
  onClose,
  onOpen,
  onDelete,
}: IconContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  const menuWidth = 160;
  const menuHeight = 120;
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 40);

  return (
    <motion.div
      ref={ref}
      className="fixed bg-[var(--color-win-bg)] shadow-[var(--shadow-win-frame)] py-[2px] min-w-[160px]"
      style={{ left: clampedX, top: clampedY, zIndex: 9500 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <button
        className="w-full flex items-center gap-[8px] px-[20px] py-[3px] text-[12px] text-left hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer bg-transparent border-none font-bold"
        onClick={() => {
          onOpen();
          onClose();
        }}
      >
        <span className="text-[14px] w-[18px] text-center">📂</span>
        <span>Open</span>
      </button>

      <div className="h-[1px] bg-[var(--color-win-dark)] mx-[3px] my-[2px]" />

      <button
        className="w-full flex items-center gap-[8px] px-[20px] py-[3px] text-[12px] text-left hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer bg-transparent border-none"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        <span className="text-[14px] w-[18px] text-center">🗑️</span>
        <span>Delete</span>
      </button>

      <div className="h-[1px] bg-[var(--color-win-dark)] mx-[3px] my-[2px]" />

      <div className="px-[20px] py-[3px] text-[11px] text-[#888]">
        {icon.label.replace('\n', ' ')}
      </div>
    </motion.div>
  );
}
