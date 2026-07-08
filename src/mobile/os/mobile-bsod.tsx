import { motion } from 'framer-motion';
import { useMobileStore } from '@/stores/mobile-store';
import { haptic } from '../lib/haptics';

/** The Shut Down easter egg: a friendly blue screen, tap to reboot. */
export function MobileBSOD() {
  const reboot = useMobileStore((s) => s.reboot);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col justify-center px-6 pk-pixel"
      style={{
        zIndex: 10001,
        background: '#0000aa',
        color: '#fff',
        fontSize: 19,
        lineHeight: 1.5,
      }}
      onClick={() => {
        haptic([15, 60, 15]);
        reboot();
      }}
    >
      <div className="self-center px-3 mb-6" style={{ background: '#aaaaaa', color: '#0000aa' }}>
        HilalOS
      </div>
      <p style={{ margin: 0 }}>
        A problem has been detected and HilalOS has been shut down to prevent
        damage to your curiosity:
      </p>
      <p style={{ margin: '16px 0' }}>VISIT_TERMINATED_TOO_EARLY</p>
      <p style={{ margin: 0 }}>
        * Hilal has not been hired yet
        <br />
        * 4 projects remain unexplored
        <br />
        * The AI clone gets lonely
      </p>
      <p style={{ margin: '24px 0 0' }}>
        Touch anywhere to reboot and continue exploring...
        <span className="pk-blink">▌</span>
      </p>
    </motion.div>
  );
}
