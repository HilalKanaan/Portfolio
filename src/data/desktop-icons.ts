import type { DesktopIconConfig } from '@/types/desktop';

const GITHUB_SVG = `<svg viewBox="0 0 32 32" fill="white"><path d="M16 2C8.27 2 2 8.27 2 16c0 6.19 4.01 11.44 9.58 13.29.7.13.96-.3.96-.67 0-.33-.01-1.42-.02-2.58-3.9.85-4.72-1.65-4.72-1.65-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.91.49-1.52.89-1.87-3.11-.35-6.38-1.56-6.38-6.93 0-1.53.55-2.78 1.44-3.76-.14-.35-.63-1.78.14-3.72 0 0 1.17-.38 3.85 1.44a13.4 13.4 0 0 1 7.01 0c2.67-1.81 3.84-1.44 3.84-1.44.77 1.94.28 3.37.14 3.72.9.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.57-6.4 6.92.5.43.95 1.29.95 2.6 0 1.88-.02 3.39-.02 3.85 0 .38.25.81.97.67C25.99 27.44 30 22.19 30 16c0-7.73-6.27-14-14-14z"/></svg>`;

const LINKEDIN_SVG = `<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="4" fill="#0077B5"/><path d="M10.5 13.5v9h-3v-9h3zm-1.5-1.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm13.5 10.5h-3v-4.5c0-1.12-.4-1.88-1.4-1.88-.77 0-1.22.52-1.42 1.02-.07.18-.09.43-.09.68v4.68h-3s.04-7.6 0-8.39h3v1.19c.4-.61 1.11-1.49 2.7-1.49 1.97 0 3.21 1.29 3.21 4.06v4.63z" fill="white"/></svg>`;

const TWITTER_SVG = `<svg viewBox="0 0 32 32" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

export const desktopIcons: DesktopIconConfig[] = [
  {
    id: 'my-computer',
    label: 'My Computer',
    icon: '💻',
    windowType: 'my-computer',
    position: { row: 0, col: 0 },
  },
  {
    id: 'projects',
    label: 'My Projects',
    icon: '📂',
    windowType: 'projects',
    position: { row: 1, col: 0 },
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    windowType: 'experience',
    position: { row: 2, col: 0 },
  },
  {
    id: 'recycle-bin',
    label: 'Recycle Bin',
    icon: '🗑️',
    windowType: 'recycle-bin',
    position: { row: 3, col: 0 },
  },
  {
    id: 'about',
    label: 'About Me.txt',
    icon: '📄',
    windowType: 'about',
    position: { row: 4, col: 0 },
  },
  {
    id: 'ai-chat',
    label: 'Hilal\nAgent',
    icon: '🔮',
    windowType: 'ai-chat',
    position: { row: 5, col: 0 },
  },
  // Social links - open URLs directly
  {
    id: 'github',
    label: 'GitHub',
    icon: '🐙',
    svgIcon: GITHUB_SVG,
    href: 'https://github.com/HilalKanaan',
    position: { row: 0, col: 1 },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    svgIcon: LINKEDIN_SVG,
    href: 'https://www.linkedin.com/in/hilalkanaan',
    position: { row: 1, col: 1 },
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    icon: '🐦',
    svgIcon: TWITTER_SVG,
    href: 'https://twitter.com/HilalKanaan',
    position: { row: 2, col: 1 },
  },
  // System Monitor — only visible with ?admin=true
  ...(isAdmin
    ? [
        {
          id: 'system-monitor',
          label: 'System\nMonitor',
          icon: '📊',
          windowType: 'system-monitor' as const,
          position: { row: 3, col: 1 },
        },
      ]
    : []),
];
