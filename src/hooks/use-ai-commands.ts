import { useCallback } from 'react';
import { useWindowStore } from '@/stores/window-store';
import { useDesktopStore } from '@/stores/desktop-store';
import type { AICommand } from '@/types/ai';
import type { WindowType } from '@/types/window';
import { DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';

export const WINDOW_CONFIGS: Record<string, { title: string; icon: string }> = {
  'my-computer': { title: 'My Computer', icon: '💻' },
  projects: { title: 'My Projects', icon: '📂' },
  experience: { title: 'Experience', icon: '💼' },
  network: { title: 'Network Neighborhood', icon: '🌐' },
  'recycle-bin': { title: 'Recycle Bin', icon: '🗑️' },
  about: { title: 'About Me.txt', icon: '📄' },
  'ai-chat': { title: 'Hilal Agent', icon: '🔮' },
  settings: { title: 'System Settings', icon: '⚙️' },
  'system-monitor': { title: 'System Monitor', icon: '📊' },
};

export function useAICommands() {
  const openWindow = useWindowStore((s) => s.openWindow);
  const selectIcon = useDesktopStore((s) => s.selectIcon);

  const executeCommand = useCallback(
    (cmd: AICommand) => {
      switch (cmd.command) {
        case 'OPEN_WINDOW': {
          const config = WINDOW_CONFIGS[cmd.target];
          if (config) {
            openWindow({
              id: cmd.target,
              type: cmd.target as WindowType,
              title: config.title,
              icon: config.icon,
              position: {
                x: 120 + Math.random() * 180,
                y: 60 + Math.random() * 120,
              },
              size: { ...DEFAULT_WINDOW_SIZE },
              minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
            });
          }
          break;
        }
        case 'HIGHLIGHT_ICON': {
          selectIcon(cmd.target);
          setTimeout(() => selectIcon(null), 2000);
          break;
        }
        case 'TRIGGER_GLITCH': {
          document.documentElement.classList.add('glitch-active');
          setTimeout(() => {
            document.documentElement.classList.remove('glitch-active');
          }, 500);
          break;
        }
      }
    },
    [openWindow, selectIcon]
  );

  return { executeCommand };
}
