import { motion } from 'framer-motion';
import { IconSparkle } from './icons';

interface ChatFabProps {
  onClick: () => void;
}

export function ChatFab({ onClick }: ChatFabProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
      className="fixed flex items-center gap-[10px] rounded-full border-0 cursor-pointer"
      style={{
        bottom: 'max(env(safe-area-inset-bottom), 20px)',
        right: 16,
        height: 52,
        paddingLeft: 18,
        paddingRight: 22,
        background: 'rgba(14, 14, 20, 0.9)',
        border: '1px solid var(--m-line-strong)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'var(--m-ink)',
        boxShadow: 'var(--m-shadow-fab)',
        zIndex: 100,
      }}
      aria-label="Open chat with Hilal's AI"
    >
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'inline-flex',
          color: 'var(--m-accent)',
        }}
      >
        <IconSparkle size={16} />
      </motion.span>
      <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>
        Ask Hilal
      </span>
    </motion.button>
  );
}
