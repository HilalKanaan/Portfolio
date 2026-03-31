export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  pendingCommands?: AICommand[];
}

export type AICommand =
  | { command: 'OPEN_WINDOW'; target: string }
  | { command: 'HIGHLIGHT_ICON'; target: string }
  | { command: 'TRIGGER_GLITCH' };
