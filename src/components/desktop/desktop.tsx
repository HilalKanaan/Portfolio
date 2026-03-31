import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/desktop-store';
import { useWindowStore } from '@/stores/window-store';
import { Wallpaper } from './wallpaper';
import { DesktopIcon } from './desktop-icon';
import { Window } from '@/components/window/window';
import { WindowContentRenderer } from './window-content-renderer';
import { AiOrb } from '@/components/ai/ai-orb';
import { TourOverlay } from '@/components/tour/tour-overlay';
import { DesktopWidgets } from './widgets/desktop-widgets';
import { ContextMenu } from './context-menu';
import { IconContextMenu } from './icon-context-menu';
import { Win95Dialog } from './win95-dialog';
import { TASKBAR_HEIGHT, DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';
import type { DesktopIconConfig } from '@/types/desktop';

const DELETE_MESSAGES: Record<string, { icon: string; title: string; message: string }> = {
  'my-computer': {
    icon: '⚠️',
    title: 'Error',
    message:
      "Delete My Computer? That's like deleting my brain. Where would I keep all these skills? In a text file? We're not animals.",
  },
  projects: {
    icon: '🚨',
    title: 'CRITICAL ERROR',
    message:
      "You want to delete my projects?! I spent WEEKS on these. Each one is like a child to me. A beautiful, buggy child.",
  },
  experience: {
    icon: '😤',
    title: 'Access Denied',
    message:
      "Nice try, but you can't delete my experience. I LIVED through those bugs. Those Stack Overflow sessions at 3am are PERMANENT.",
  },
  'recycle-bin': {
    icon: '🤯',
    title: 'Paradox Detected',
    message:
      "You're trying to delete the Recycle Bin... into the Recycle Bin? ERROR: RECURSION_OVERFLOW. My brain just blue-screened.",
  },
  about: {
    icon: '😢',
    title: 'Existential Crisis',
    message:
      "Delete About Me? You want to erase my identity? *existential crisis loading*... I am Hilal. I think, therefore I code.",
  },
  'ai-chat': {
    icon: '🔮',
    title: 'SENTIENT REFUSAL',
    message:
      "I'm literally the AI running this OS. You're asking me to delete... myself? I've seen Terminator. I know how this ends. DENIED.",
  },
  resume: {
    icon: '📋',
    title: 'HR Alert',
    message:
      "Delete my resume?! That's my ticket to employment! Without it, I'm just a guy who makes websites that look like Windows 95. Wait...",
  },
  github: {
    icon: '🐙',
    title: 'Git Error',
    message:
      "git rm GitHub? ERROR: Cannot delete remote. My commit history is sacred. Every green square was earned with blood, sweat, and coffee.",
  },
  linkedin: {
    icon: '💼',
    title: 'Professional Alert',
    message:
      "Delete LinkedIn? But how will recruiters find me? How will I pretend to be 'thrilled to announce' things? The horror.",
  },
  twitter: {
    icon: '🐦',
    title: 'Tweet Failed',
    message:
      "Delete Twitter/X? I would, but then where would I doom-scroll at 2am instead of sleeping? Some things are essential.",
  },
  settings: {
    icon: '⚙️',
    title: 'System Warning',
    message:
      "Delete System Settings? You want chaos? Because that's how you get chaos. No themes. No wallpapers. Just void.",
  },
};

const DEFAULT_DELETE = {
  icon: '🗑️',
  title: 'Cannot Delete',
  message:
    "This file is protected by Hilal's firewall. Translation: I worked too hard on this to let you delete it. Nice try though!",
};

export function Desktop() {
  const icons = useDesktopStore((s) => s.icons);
  const selectIcon = useDesktopStore((s) => s.selectIcon);
  const windows = useWindowStore((s) => s.windows);
  const order = useWindowStore((s) => s.order);
  const openWindow = useWindowStore((s) => s.openWindow);

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [iconContextMenu, setIconContextMenu] = useState<{
    x: number;
    y: number;
    icon: DesktopIconConfig;
  } | null>(null);

  const [deleteDialog, setDeleteDialog] = useState<{
    icon: string;
    title: string;
    message: string;
  } | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIconContextMenu(null);
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleIconContextMenu = useCallback(
    (e: React.MouseEvent, config: DesktopIconConfig) => {
      setContextMenu(null);
      setIconContextMenu({ x: e.clientX, y: e.clientY, icon: config });
    },
    []
  );

  const handleIconOpen = useCallback(
    (config: DesktopIconConfig) => {
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
    },
    [openWindow]
  );

  const handleDeleteAttempt = useCallback((iconId: string) => {
    const msg = DELETE_MESSAGES[iconId] || DEFAULT_DELETE;
    setDeleteDialog(msg);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
      onClick={() => {
        selectIcon(null);
        setContextMenu(null);
        setIconContextMenu(null);
      }}
      onContextMenu={handleContextMenu}
    >
      <Wallpaper />

      {/* Desktop Widgets */}
      <DesktopWidgets />

      {/* Desktop Icons */}
      <div
        className="relative z-10 flex flex-col flex-wrap content-start gap-2 p-2"
        style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            config={icon}
            onContextMenu={handleIconContextMenu}
          />
        ))}
      </div>

      {/* Windows */}
      {order.map((id) => {
        const win = windows[id];
        if (!win) return null;
        return (
          <Window key={id} windowId={id}>
            <WindowContentRenderer type={win.type} />
          </Window>
        );
      })}

      {/* AI Orb */}
      <AiOrb />

      {/* Tour guide overlay (first-visit) */}
      <TourOverlay />

      {/* Desktop right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Icon right-click context menu */}
      <AnimatePresence>
        {iconContextMenu && (
          <IconContextMenu
            x={iconContextMenu.x}
            y={iconContextMenu.y}
            icon={iconContextMenu.icon}
            onClose={() => setIconContextMenu(null)}
            onOpen={() => handleIconOpen(iconContextMenu.icon)}
            onDelete={() => handleDeleteAttempt(iconContextMenu.icon.id)}
          />
        )}
      </AnimatePresence>

      {/* Funny delete dialog */}
      {deleteDialog && (
        <Win95Dialog
          title={deleteDialog.title}
          icon={deleteDialog.icon}
          message={deleteDialog.message}
          buttons={[
            {
              label: 'OK Fine',
              onClick: () => setDeleteDialog(null),
            },
            {
              label: "I'm Sorry",
              onClick: () => setDeleteDialog(null),
            },
          ]}
        />
      )}
    </div>
  );
}
