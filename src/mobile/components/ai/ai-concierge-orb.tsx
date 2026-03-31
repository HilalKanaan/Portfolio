import { motion } from 'framer-motion';
import { useWalletStore } from '../../stores/wallet-store';

export function AiConciergeOrb() {
  const toggleChat = useWalletStore((s) => s.toggleChat);
  const isChatOpen = useWalletStore((s) => s.isChatOpen);

  if (isChatOpen) return null;

  return (
    <motion.button
      className="fixed z-50 flex items-center justify-center"
      style={{
        bottom: 24,
        right: 20,
        width: 56,
        height: 56,
      }}
      onClick={toggleChat}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.5 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'rgba(139, 92, 246, 0.3)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb */}
      <div
        className="w-full h-full rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #4338CA 100%)',
        }}
      >
        <span className="text-[24px]">🔮</span>
      </div>
    </motion.button>
  );
}
