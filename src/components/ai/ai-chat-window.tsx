import { useState, useRef, useEffect, useMemo } from 'react';
import { useAIStore, sendChatMessage } from '@/stores/ai-store';
import { useAICommands, WINDOW_CONFIGS } from '@/hooks/use-ai-commands';
import type { AICommand } from '@/types/ai';

// Grouped by topic so we can pick contextually relevant follow-ups
// and never repeat something the user already asked
const CHIP_POOL = [
  // Intro / general
  'Tell me about yourself',
  'What can you do?',
  'Surprise me',
  // Projects
  'Show me your projects',
  'Tell me about Corsa',
  'What did you build for the Student Rep platform?',
  // Experience
  "What's your work experience?",
  'What did you do at the Ministry?',
  'Tell me about your freelance work',
  // Skills
  'What tech stack do you use?',
  'Do you know AI/ML?',
  'What databases have you worked with?',
  // Fun / personality
  'What makes you different?',
  'Why did you build a Windows 95 portfolio?',
  'Are you actually an AI?',
  'Tell me a fun fact',
  // Hiring
  'Why should I hire you?',
  'Are you open to work?',
  'How can I contact you?',
];

function getCommandLabel(cmd: AICommand): string {
  if (cmd.command === 'OPEN_WINDOW') {
    const config = WINDOW_CONFIGS[cmd.target];
    return config ? `Open ${config.icon} ${config.title}` : `Open ${cmd.target}`;
  }
  if (cmd.command === 'HIGHLIGHT_ICON') {
    const config = WINDOW_CONFIGS[cmd.target];
    return config ? `Highlight ${config.icon} ${config.title}` : `Highlight ${cmd.target}`;
  }
  return 'Trigger glitch effect';
}

export function AiChatWindow() {
  const [input, setInput] = useState('');
  const messages = useAIStore((s) => s.messages);
  const isLoading = useAIStore((s) => s.isLoading);
  const resolvePendingCommands = useAIStore((s) => s.resolvePendingCommands);
  const dismissPendingCommands = useAIStore((s) => s.dismissPendingCommands);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { executeCommand } = useAICommands();

  const usedChipsRef = useRef<Set<string>>(new Set());

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pick 3 fresh chips that haven't been used yet, recalculate after each message change
  const currentChips = useMemo(() => {
    const available = CHIP_POOL.filter((c) => !usedChipsRef.current.has(c));
    // If we've exhausted the pool, reset and start fresh
    if (available.length < 3) {
      usedChipsRef.current.clear();
      return CHIP_POOL.slice(0, 3);
    }
    // Shuffle and pick 3
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [messages]);

  // Show chips when the last message is from the assistant (or system) and not loading
  const lastMsg = messages[messages.length - 1];
  const showChips = !isLoading && lastMsg && lastMsg.role !== 'user';

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    sendChatMessage(trimmed);
  };

  const handleChipClick = (text: string) => {
    if (isLoading) return;
    usedChipsRef.current.add(text);
    sendChatMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAcceptCommands = (msgId: string) => {
    const cmds = resolvePendingCommands(msgId);
    for (const cmd of cmds) {
      setTimeout(() => executeCommand(cmd), 300);
    }
  };

  const handleDismissCommands = (msgId: string) => {
    dismissPendingCommands(msgId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div className="flex-1 overflow-auto p-2 bg-white shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#808080] win-scrollbar">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className="flex gap-2">
                <span className="text-[16px] flex-shrink-0 mt-[1px]">
                  {msg.role === 'assistant' ? '🔮' : '👤'}
                </span>
                <div className="text-[12px] leading-[1.5] min-w-0 flex-1">
                  <p
                    className="font-bold mb-[2px]"
                    style={{
                      color: msg.role === 'assistant' ? '#4a0080' : '#000080',
                    }}
                  >
                    {msg.role === 'assistant' ? 'Hilal' : 'You'}
                  </p>
                  <div className="whitespace-pre-wrap break-words font-[var(--font-fixedsys)] text-[11px] leading-[1.5]">
                    {msg.content}
                    {msg.isStreaming && (
                      <span className="inline-block w-[6px] h-[11px] bg-[#4a0080] animate-pulse ml-[1px] align-middle" />
                    )}
                  </div>
                </div>
              </div>

              {/* Pending command confirmation */}
              {msg.pendingCommands && msg.pendingCommands.length > 0 && (
                <div className="ml-[28px] mt-2 p-[6px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] text-[11px] font-[var(--font-fixedsys)]">
                  <div className="mb-[4px] text-[#333]">
                    {msg.pendingCommands.map((cmd, i) => (
                      <span key={i}>{getCommandLabel(cmd)}</span>
                    ))}
                    ?
                  </div>
                  <div className="flex gap-[4px]">
                    <button
                      onClick={() => handleAcceptCommands(msg.id)}
                      className="h-[20px] px-[10px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer font-[var(--font-fixedsys)]"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleDismissCommands(msg.id)}
                      className="h-[20px] px-[10px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer font-[var(--font-fixedsys)]"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-2">
              <span className="text-[16px] flex-shrink-0">🔮</span>
              <div className="text-[11px] text-[#888] font-[var(--font-fixedsys)]">
                Hilal is typing...
              </div>
            </div>
          )}

          {/* Suggestion chips — always show fresh follow-ups after AI replies */}
          {showChips && (
            <div className="flex flex-wrap gap-[4px] mt-[6px] ml-[28px]">
              {currentChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="h-[22px] px-[8px] text-[10px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer font-[var(--font-fixedsys)] text-[#000080] hover:text-[#4a0080] whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="flex gap-[2px] p-[2px] mt-[2px]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Hilal anything..."
          disabled={isLoading}
          className="flex-1 h-[22px] px-[4px] text-[12px] border-none shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#808080] bg-white disabled:bg-[#e0e0e0] disabled:text-[#888] outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="h-[22px] px-[8px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}
