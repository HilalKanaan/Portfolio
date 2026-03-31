import { useState, useRef, useEffect } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useWalletStore } from '../../stores/wallet-store';
import { useAIStore, sendChatMessage } from '@/stores/ai-store';
import { AiChatMessage } from './ai-chat-message';
import { AiPromptChips } from './ai-prompt-chips';

export function AiChatPanel() {
  const closeChat = useWalletStore((s) => s.closeChat);
  const messages = useAIStore((s) => s.messages);
  const isLoading = useAIStore((s) => s.isLoading);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    setInput('');
    sendChatMessage(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 400) {
      closeChat();
    }
  };

  const lastMsg = messages[messages.length - 1];
  const showChips = !isLoading && lastMsg && lastMsg.role !== 'user';

  return (
    <>
      {/* Dim overlay */}
      <motion.div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeChat}
      />

      {/* Chat panel */}
      <motion.div
        className="fixed left-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          height: '75vh',
          background: '#0A0A0A',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          borderBottom: 'none',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #4338CA)' }}
            >
              <span className="text-[16px]">🔮</span>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-white">AI Concierge</h3>
              <p className="text-[10px] text-zinc-500">Powered by Hilal&apos;s brain</p>
            </div>
          </div>
          <motion.button
            className="text-zinc-500 text-[13px] px-2 py-1"
            onClick={closeChat}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-[32px] mb-3">🔮</span>
              <p className="text-[14px] text-zinc-400">Ask me anything about Hilal</p>
              <p className="text-[11px] text-zinc-600 mt-1">
                I know about his projects, skills, and experience
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <AiChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && lastMsg?.role === 'user' && (
            <div className="flex gap-2.5 items-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #4338CA)' }}
              >
                <span className="text-[14px]">🔮</span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chips */}
        {showChips && (
          <div className="flex-shrink-0 pt-1 pb-2 px-3">
            <AiPromptChips
              onSelect={(p) => handleSend(p)}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Input */}
        <div
          className="flex-shrink-0 p-3 flex gap-2"
          style={{
            paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 h-10 px-4 rounded-full text-[13px] text-white placeholder-zinc-600 outline-none disabled:opacity-50"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: '#7C3AED' }}
          >
            <span className="text-white text-[14px]">↑</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
