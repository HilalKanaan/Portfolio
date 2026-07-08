import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIStore, sendChatMessage } from '@/stores/ai-store';
import { useMobileStore, aiTargetToMobileApp } from '@/stores/mobile-store';
import type { ChatMessage } from '@/types/ai';
import { haptic } from '../lib/haptics';

const SUGGESTIONS = [
  'Why should I hire you?',
  'Show me your projects',
  'Tell me about yourself',
  'What tech do you use?',
];

/** Yes/No Win95 dialog rendered under a message with pending AI commands. */
function CommandPrompt({ message }: { message: ChatMessage }) {
  const resolvePendingCommands = useAIStore((s) => s.resolvePendingCommands);
  const dismissPendingCommands = useAIStore((s) => s.dismissPendingCommands);
  const launchApp = useMobileStore((s) => s.launchApp);

  const openTarget = message.pendingCommands?.find(
    (c) => c.command === 'OPEN_WINDOW' && aiTargetToMobileApp(c.target) !== null
  );
  if (!openTarget || openTarget.command !== 'OPEN_WINDOW') return null;
  const appId = aiTargetToMobileApp(openTarget.target);
  if (!appId) return null;

  return (
    <div className="win-raised px-3 py-2.5 self-start" style={{ maxWidth: '86%' }}>
      <div className="flex items-center gap-2" style={{ fontSize: 12.5 }}>
        <span aria-hidden>❓</span> Open <b>{appId.replace('-', ' ')}</b>?
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          className="pk-btn flex-1 font-bold"
          style={{ minHeight: 40 }}
          onClick={() => {
            haptic();
            resolvePendingCommands(message.id);
            launchApp(appId);
          }}
        >
          OK
        </button>
        <button
          type="button"
          className="pk-btn flex-1"
          style={{ minHeight: 40 }}
          onClick={() => {
            haptic();
            dismissPendingCommands(message.id);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`px-3 py-2 ${isUser ? 'self-end' : 'self-start'}`}
      style={{
        maxWidth: '86%',
        fontSize: 13.5,
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        background: isUser ? 'var(--color-win-highlight)' : 'var(--color-win-bg)',
        color: isUser ? '#fff' : 'var(--color-win-text)',
        boxShadow: isUser ? 'var(--shadow-win-pressed)' : 'var(--shadow-win-raised)',
      }}
    >
      {message.content || (message.isStreaming ? '▌' : '')}
    </div>
  );
}

/** Hilal Agent — Win95 chat window as a bottom sheet. */
export function ChatSheet() {
  const open = useMobileStore((s) => s.chatOpen);
  const setChatOpen = useMobileStore((s) => s.setChatOpen);
  const messages = useAIStore((s) => s.messages);
  const isLoading = useAIStore((s) => s.isLoading);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const userHasChatted = messages.some((m) => m.role === 'user');

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    await sendChatMessage(text.trim());
  };

  const onClose = () => setChatOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.5)', zIndex: 9190 }}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
            className="win-raised fixed left-0 right-0 bottom-0 flex flex-col"
            style={{ height: '86dvh', zIndex: 9200, padding: 3 }}
            role="dialog"
            aria-label="Chat with Hilal's AI"
          >
            {/* Title bar */}
            <div
              className="win-title-active flex items-center justify-between pl-2 touch-none"
              style={{ minHeight: 40 }}
            >
              <span
                className="flex items-center gap-2"
                style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden
                >
                  🔮
                </motion.span>
                Hilal Agent
                <span
                  className="pk-tiny flex items-center gap-1"
                  style={{ color: '#9effa0', fontSize: 7 }}
                >
                  <span className="pk-led" style={{ width: 5, height: 5 }} aria-hidden />
                  ONLINE
                </span>
              </span>
              <button
                type="button"
                className="pk-btn flex items-center justify-center font-bold shrink-0"
                style={{ width: 44, height: 34, marginRight: 3, fontSize: 15 }}
                onClick={onClose}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="pk-scroll flex-1 flex flex-col gap-2 px-3 py-3"
              style={{ background: '#fff', boxShadow: 'var(--shadow-win-sunken)' }}
            >
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col gap-2">
                  <Bubble message={m} />
                  {m.pendingCommands && <CommandPrompt message={m} />}
                </div>
              ))}
              {isLoading && !messages[messages.length - 1]?.isStreaming && (
                <div
                  className="win-raised self-start px-3 py-2 pk-pixel"
                  style={{ fontSize: 16 }}
                >
                  thinking
                  <span className="pk-blink">…</span>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {!userHasChatted && (
              <div className="flex gap-1.5 px-2 pt-2 pk-scroll" style={{ overflowX: 'auto' }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      haptic();
                      handleSend(s);
                    }}
                    className="pk-btn shrink-0"
                    style={{ fontSize: 12, minHeight: 40 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2 px-2 py-2"
              style={{ paddingBottom: 'calc(var(--pk-safe-bottom) + 8px)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message to Hilal…"
                className="win-sunken flex-1 px-3 border-0 outline-none"
                style={{ minHeight: 44, fontSize: 15, fontFamily: 'var(--font-ms-sans)' }}
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="pk-btn font-bold disabled:opacity-40"
                style={{ minWidth: 64 }}
              >
                Send
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
