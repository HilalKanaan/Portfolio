export interface StartMenuItem {
  id: string;
  label: string;
  icon: string;
  action: 'open-window' | 'link' | 'theme-toggle' | 'shutdown';
  windowType?: string;
  href?: string;
}

export const startMenuItems: StartMenuItem[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: '📄',
    action: 'open-window',
    windowType: 'about',
  },
  {
    id: 'my-computer',
    label: 'My Computer',
    icon: '💻',
    action: 'open-window',
    windowType: 'my-computer',
  },
  {
    id: 'projects',
    label: 'My Projects',
    icon: '📂',
    action: 'open-window',
    windowType: 'projects',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    action: 'open-window',
    windowType: 'experience',
  },
  {
    id: 'ai-chat',
    label: 'Hilal Agent',
    icon: '🔮',
    action: 'open-window',
    windowType: 'ai-chat',
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: '⚙️',
    action: 'open-window',
    windowType: 'settings',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: '🔗',
    action: 'link',
    href: 'https://github.com/HilalKanaan',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: '💼',
    action: 'link',
    href: 'https://www.linkedin.com/in/hilalkanaan',
  },
  {
    id: 'resume',
    label: 'Download Resume',
    icon: '📋',
    action: 'link',
    href: '/resume.pdf',
  },
  {
    id: 'shutdown',
    label: 'Shut Down...',
    icon: '🔌',
    action: 'shutdown',
  },
];
