import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIStore, sendChatMessage } from '@/stores/ai-store';
import { IconSparkle, IconClose, IconSend } from './icons';

const SUGGESTIONS = [
  'Tell me about yourself',
  'Show me your projects',
  'Why should I hire you?',
  'What tech do you use?',
];

interface ChatSheetProps {
  open: boolean;
  onClose: () => void;
}

export function ChatSheet({ open, onClose }: ChatSheetProps) {
  const messages = useAIStore((s) => s.messages);
  const isLoading = useAIStore((s) => s.isLoading);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hide the Win95 boot welcome message on mobile
  const visibleMessages = messages.filter((m) => m.id !== 'welcome');

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, visibleMessages.length]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    await sendChatMessage(text.trim());
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 200,
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
            className="fixed left-0 right-0 bottom-0 flex flex-col rounded-t-[24px] overflow-hidden"
            style={{
              height: '88dvh',
              background: 'var(--m-bg-2)',
              zIndex: 201,
              borderTop: '1px solid var(--m-line-strong)',
              boxShadow: '0 -32px 64px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Accent glow at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[140px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at top, var(--m-accent-soft), transparent 70%)',
              }}
            />

            {/* Drag handle */}
            <div className="relative pt-[10px] pb-[6px] flex justify-center cursor-grab active:cursor-grabbing">
              <div
                style={{
                  width: 44,
                  height: 4,
                  borderRadius: 4,
                  background: 'var(--m-line-strong)',
                }}
              />
            </div>

            {/* Header */}
            <div
              className="relative flex items-center justify-between px-[20px] py-[14px]"
              style={{ borderBottom: '1px solid var(--m-line)' }}
            >
              <div className="flex items-center gap-[12px]">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 36,
                    height: 36,
                    background:
                      'radial-gradient(circle, var(--m-accent), var(--m-accent-2))',
                    color: 'var(--m-bg)',
                  }}
                >
                  <IconSparkle size={16} />
                </motion.div>
                <div>
                  <div
                    className="m-display"
                    style={{
                      fontSize: 18,
                      color: 'var(--m-ink)',
                      lineHeight: 1.1,
                    }}
                  >
                    Hilal's <span className="m-display-italic">AI</span>
                  </div>
                  <div
                    className="m-eyebrow"
                    style={{ fontSize: 9, marginTop: 2 }}
                  >
                    Online · 24/7
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="border-0 bg-transparent cursor-pointer flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--m-line)',
                  color: 'var(--m-ink-soft)',
                }}
                aria-label="Close chat"
              >
                <IconClose size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="relative flex-1 overflow-y-auto px-[20px] py-[20px]"
            >
              {visibleMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="flex items-center justify-center rounded-full mb-[24px]"
                    style={{
                      width: 72,
                      height: 72,
                      background:
                        'radial-gradient(circle, var(--m-accent), transparent 70%)',
                      color: 'var(--m-ink)',
                    }}
                  >
                    <IconSparkle size={32} />
                  </motion.div>
                  <div
                    className="m-display"
                    style={{
                      fontSize: 28,
                      color: 'var(--m-ink)',
                      marginBottom: 8,
                      lineHeight: 1,
                    }}
                  >
                    Hey, I'm <span className="m-display-italic" style={{ color: 'var(--m-accent)' }}>Hilal.</span>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--m-ink-soft)',
                      maxWidth: 280,
                      lineHeight: 1.5,
                    }}
                  >
                    Ask me about my work, experience, or anything you're curious about.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[12px]">
                  {visibleMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="rounded-[18px] px-[16px] py-[12px]"
                        style={{
                          maxWidth: '82%',
                          background:
                            m.role === 'user'
                              ? 'var(--m-ink)'
                              : 'var(--m-card)',
                          color:
                            m.role === 'user'
                              ? 'var(--m-bg)'
                              : 'var(--m-ink)',
                          border:
                            m.role === 'user'
                              ? 'none'
                              : '1px solid var(--m-line-strong)',
                          fontSize: 14.5,
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                          fontWeight: m.role === 'user' ? 500 : 400,
                        }}
                      >
                        {m.content || (m.isStreaming ? '…' : '')}
                      </div>
                    </div>
                  ))}
                  {isLoading &&
                    !visibleMessages[visibleMessages.length - 1]?.isStreaming && (
                      <div className="flex justify-start">
                        <div
                          className="rounded-[18px] px-[16px] py-[12px]"
                          style={{
                            background: 'var(--m-card)',
                            border: '1px solid var(--m-line-strong)',
                            color: 'var(--m-ink-soft)',
                            fontSize: 14,
                          }}
                        >
                          <span className="flex items-center gap-[6px]">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  background: 'var(--m-accent)',
                                  display: 'inline-block',
                                }}
                              />
                            ))}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Suggestions */}
            {visibleMessages.length === 0 && (
              <div className="px-[20px] pb-[12px] flex flex-wrap gap-[8px]">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full px-[14px] py-[9px] cursor-pointer"
                    style={{
                      border: '1px solid var(--m-line-strong)',
                      background: 'var(--m-card)',
                      color: 'var(--m-ink-soft)',
                      fontSize: 12.5,
                      fontWeight: 500,
                    }}
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
              className="flex gap-[8px] px-[16px] pt-[12px] m-safe-bottom"
              style={{ borderTop: '1px solid var(--m-line)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 h-[44px] px-[18px] rounded-full"
                style={{
                  border: '1px solid var(--m-line-strong)',
                  background: 'var(--m-card)',
                  color: 'var(--m-ink)',
                  fontSize: 15,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-full border-0 cursor-pointer disabled:opacity-40 flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  background: 'var(--m-accent)',
                  color: 'var(--m-bg)',
                }}
                aria-label="Send"
              >
                <IconSend size={18} />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
