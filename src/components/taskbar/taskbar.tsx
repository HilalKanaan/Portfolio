import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/window-store';
import { StartButton } from './start-button';
import { StartMenu } from './start-menu';
import { TaskButton } from './task-button';
import { SystemTray } from './system-tray';
import { Z_INDEX, TASKBAR_HEIGHT } from '@/utils/constants';

export function Taskbar() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const order = useWindowStore((s) => s.order);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[var(--color-win-bg)] shadow-[var(--shadow-win-raised)] flex items-center px-[2px] gap-[2px]"
      style={{ height: TASKBAR_HEIGHT, zIndex: Z_INDEX.TASKBAR }}
    >
      <div className="relative">
        <StartButton
          isOpen={startMenuOpen}
          onClick={() => setStartMenuOpen((prev) => !prev)}
        />
        <AnimatePresence>
          {startMenuOpen && (
            <StartMenu onClose={() => setStartMenuOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Separator */}
      <div className="w-[2px] h-[22px] shadow-[inset_-1px_0_0_#dfdfdf,inset_1px_0_0_#808080]" />

      {/* Task buttons */}
      <div className="flex-1 flex items-center gap-[2px] overflow-hidden">
        {order.map((id) => (
          <TaskButton key={id} windowId={id} />
        ))}
      </div>

      <SystemTray />
    </div>
  );
}
