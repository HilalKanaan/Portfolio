import type { MobileAppId } from '@/stores/mobile-store';
import { social } from '@/data/social';

export interface PocketApp {
  id: MobileAppId;
  /** Home-screen label */
  label: string;
  /** Title-bar text when the app is open */
  windowTitle: string;
  icon: string;
}

export const pocketApps: PocketApp[] = [
  { id: 'about', label: 'About Me.txt', windowTitle: 'About Me.txt — Notepad', icon: '📄' },
  { id: 'projects', label: 'My Projects', windowTitle: 'My Projects', icon: '📂' },
  { id: 'experience', label: 'Experience', windowTitle: 'Experience — Timeline', icon: '💼' },
  { id: 'skills', label: 'Skills', windowTitle: 'My Computer — Skills', icon: '💾' },
  { id: 'contact', label: 'Contact.exe', windowTitle: 'Contact.exe', icon: '📧' },
  { id: 'recycle-bin', label: 'Recycle Bin', windowTitle: 'Recycle Bin', icon: '🗑️' },
];

export interface PocketLink {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export const pocketLinks: PocketLink[] = [
  { id: 'resume', label: 'Resume.pdf', icon: '📜', href: social.resume },
  { id: 'github', label: 'GitHub', icon: '🐙', href: social.github },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', href: social.linkedin },
  { id: 'twitter', label: 'X / Twitter', icon: '🐦', href: social.twitter },
];

export function getPocketApp(id: MobileAppId): PocketApp {
  const app = pocketApps.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown pocket app: ${id}`);
  return app;
}
