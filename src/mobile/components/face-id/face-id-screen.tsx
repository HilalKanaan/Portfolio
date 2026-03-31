import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWalletStore } from '../../stores/wallet-store';

export function FaceIdScreen() {
  const setAuthenticated = useWalletStore((s) => s.setAuthenticated);
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'granted' | 'exit'>('idle');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('scanning'), 500),
      setTimeout(() => {
        setPhase('granted');
        navigator.vibrate?.([50]);
      }, 2200),
      setTimeout(() => setPhase('exit'), 2800),
      setTimeout(() => setAuthenticated(), 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [setAuthenticated]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Scanner outline */}
      <motion.div
        className="relative w-[200px] h-[280px] rounded-[28px]"
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase === 'idle' ? 0 : 1,
          borderColor:
            phase === 'granted' || phase === 'exit'
              ? 'rgba(34, 197, 94, 0.6)'
              : 'rgba(255, 255, 255, 0.15)',
        }}
        transition={{ duration: 0.4 }}
        style={{ border: '2px solid rgba(255,255,255,0.15)' }}
      >
        {/* Scanning line */}
        {(phase === 'scanning') && (
          <motion.div
            className="absolute left-2 right-2 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            }}
            initial={{ top: 8 }}
            animate={{ top: [8, 268, 8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Green glow on granted */}
        {(phase === 'granted' || phase === 'exit') && (
          <motion.div
            className="absolute inset-0 rounded-[26px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.1] }}
            transition={{ duration: 0.6 }}
            style={{ background: 'rgba(34, 197, 94, 0.15)' }}
          />
        )}

        {/* Face icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-[48px]"
            animate={{
              opacity: phase === 'idle' ? 0 : 1,
              scale: phase === 'granted' || phase === 'exit' ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {phase === 'granted' || phase === 'exit' ? '✓' : '👤'}
          </motion.div>
        </div>
      </motion.div>

      {/* Status text */}
      <motion.p
        className="mt-8 text-[14px] font-medium tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'idle' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          color:
            phase === 'granted' || phase === 'exit'
              ? '#22C55E'
              : 'rgba(255,255,255,0.5)',
        }}
      >
        {phase === 'granted' || phase === 'exit'
          ? 'Access Granted'
          : 'Authenticating Guest...'}
      </motion.p>

      {/* Exit fade */}
      {phase === 'exit' && (
        <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
