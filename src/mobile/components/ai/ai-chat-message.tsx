import type { ChatMessage } from '@/types/ai';

interface AiChatMessageProps {
  message: ChatMessage;
}

export function AiChatMessage({ message }: AiChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-2.5 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[14px]"
        style={{
          background: isAssistant
            ? 'linear-gradient(135deg, #7C3AED, #4338CA)'
            : 'rgba(255,255,255,0.08)',
        }}
      >
        {isAssistant ? '🔮' : '👤'}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[80%] rounded-2xl px-3.5 py-2.5"
        style={{
          background: isAssistant
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(139, 92, 246, 0.15)',
          border: isAssistant
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(139, 92, 246, 0.25)',
          borderTopLeftRadius: isAssistant ? 4 : 16,
          borderTopRightRadius: isAssistant ? 16 : 4,
        }}
      >
        <p className="text-[13px] text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming && (
            <span className="inline-block w-[5px] h-[13px] bg-purple-400 animate-pulse ml-[2px] align-middle rounded-sm" />
          )}
        </p>
      </div>
    </div>
  );
}
