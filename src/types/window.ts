export type WindowId = string;

export type WindowType =
  | 'my-computer'
  | 'network'
  | 'recycle-bin'
  | 'ai-chat'
  | 'notepad'
  | 'settings'
  | 'about'
  | 'projects'
  | 'experience'
  | 'system-monitor';

export interface WindowState {
  id: WindowId;
  type: WindowType;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}
