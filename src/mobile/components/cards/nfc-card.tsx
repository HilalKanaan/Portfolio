import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicSheen } from '../wallet/holographic-sheen';

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: '🐙', href: 'https://github.com/HilalKanaan' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/hilalkanaan' },
  { label: 'X / Twitter', icon: '🐦', href: 'https://twitter.com/HilalKanaan' },
] as const;

// Decorative QR pattern — 10x10 grid
function QrPattern() {
  return (
    <svg viewBox="0 0 40 40" className="w-[120px] h-[120px]">
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          // Corner markers (always filled)
          const isCorner =
            (row < 3 && col < 3) ||
            (row < 3 && col > 6) ||
            (row > 6 && col < 3);
          const fill = isCorner || Math.random() > 0.45;
          return (
            <rect
              key={`${row}-${col}`}
              x={col * 4}
              y={row * 4}
              width={3.5}
              height={3.5}
              rx={0.5}
              fill={fill ? 'rgba(6, 182, 212, 0.5)' : 'transparent'}
            />
          );
        })
      )}
    </svg>
  );
}

interface NfcCardProps {
  expanded?: boolean;
}

export function NfcCard({ expanded = false }: NfcCardProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle');

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloadState === 'success') return;

    setDownloadState('success');
    navigator.vibrate?.([30, 50, 30]);

    setTimeout(() => {
      window.open('/resume.pdf', '_blank');
    }, 800);

    setTimeout(() => setDownloadState('idle'), 2500);
  };

  if (expanded) {
    return (
      <div
        className="w-full rounded-[16px] p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0A0A0A 0%, #0a1520 100%)',
          border: '1px solid rgba(6, 182, 212, 0.15)',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.05)',
        }}
      >
        <HolographicSheen />

        {/* Header */}
        <p className="text-[10px] text-cyan-400 tracking-[3px] uppercase font-medium mb-1">
          ))) NFC Enabled
        </p>
        <h2 className="text-[20px] font-bold text-white">Connect</h2>
        <p className="text-[12px] text-zinc-500 mt-0.5">Tap to interact</p>

        {/* QR Code */}
        <div className="flex justify-center my-6">
          <div
            className="p-4 rounded-2xl"
            style={{
              background: 'rgba(6, 182, 212, 0.05)',
              border: '1px solid rgba(6, 182, 212, 0.1)',
            }}
          >
            <QrPattern />
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-3 justify-center mb-6">
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[24px]">{link.icon}</span>
              <span className="text-[10px] text-zinc-400 font-medium">{link.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Resume download */}
        <motion.button
          className="w-full py-4 rounded-xl text-[14px] font-medium relative overflow-hidden"
          style={{
            background:
              downloadState === 'success'
                ? 'rgba(34, 197, 94, 0.15)'
                : 'rgba(6, 182, 212, 0.1)',
            border: `1px solid ${
              downloadState === 'success'
                ? 'rgba(34, 197, 94, 0.3)'
                : 'rgba(6, 182, 212, 0.2)'
            }`,
            color: downloadState === 'success' ? '#22C55E' : '#06B6D4',
          }}
          onClick={handleDownload}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {downloadState === 'idle' ? (
              <motion.span
                key="label"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                📋 Download Resume
              </motion.span>
            ) : (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              >
                ✓ Opening Resume
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* NFC wave decoration */}
        <div className="flex items-center justify-center gap-1 mt-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full border"
              style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Collapsed preview
  return (
    <div
      className="w-full h-full rounded-[16px] p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0A0A0A 0%, #0a1520 100%)',
        border: '1px solid rgba(6, 182, 212, 0.15)',
      }}
    >
      <HolographicSheen />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-cyan-400 tracking-[3px] uppercase font-medium">
            ))) NFC Card
          </p>
          <h2 className="text-[18px] font-bold text-white mt-1">Contact</h2>
          <p className="text-[12px] text-zinc-400">Resume & Socials</p>
        </div>
        <div className="flex gap-2">
          {SOCIAL_LINKS.map((link) => (
            <div
              key={link.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(6,182,212,0.08)' }}
            >
              <span className="text-[16px]">{link.icon}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 right-4 flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
