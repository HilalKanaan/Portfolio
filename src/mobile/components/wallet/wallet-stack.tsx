import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  type PanInfo,
} from 'framer-motion';
import { useWalletStore } from '../../stores/wallet-store';
import { IdentityCard } from '../cards/identity-card';
import { VipPassCard } from '../cards/vip-pass-card';
import { BoardingPassCard } from '../cards/boarding-pass-card';
import { NfcCard } from '../cards/nfc-card';

const CARDS = [
  { id: 'nfc', Component: NfcCard },
  { id: 'boarding', Component: BoardingPassCard },
  { id: 'vip', Component: VipPassCard },
  { id: 'identity', Component: IdentityCard },
] as const;

const CARD_HEIGHT = 220;
const COLLAPSED_GAP = 36;
const FANNED_GAP = CARD_HEIGHT + 12;
const FAN_DRAG_THRESHOLD = -120;

export function WalletStack() {
  const stackState = useWalletStore((s) => s.stackState);
  const focusedCardIndex = useWalletStore((s) => s.focusedCardIndex);
  const focusCard = useWalletStore((s) => s.focusCard);
  const unfocusCard = useWalletStore((s) => s.unfocusCard);
  const setStackState = useWalletStore((s) => s.setStackState);

  const dragY = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Map drag to a 0→1 fan progress
  const fanProgress = useTransform(dragY, [0, FAN_DRAG_THRESHOLD], [0, 1], {
    clamp: true,
  });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (stackState === 'card-focused') return;

    if (info.offset.y < FAN_DRAG_THRESHOLD || info.velocity.y < -300) {
      setStackState('fanned');
      controls.start({ y: FAN_DRAG_THRESHOLD });
    } else {
      setStackState('collapsed');
      controls.start({ y: 0 });
    }
  };

  const handleCardTap = (index: number) => {
    if (stackState === 'card-focused') {
      if (focusedCardIndex === index) {
        unfocusCard();
      }
      return;
    }
    if (stackState === 'fanned') {
      focusCard(index);
    }
  };

  const handleBackToStack = () => {
    unfocusCard();
  };

  // Focused card layout
  if (stackState === 'card-focused' && focusedCardIndex !== null) {
    const { Component } = CARDS[focusedCardIndex];
    return (
      <div className="w-full h-full flex flex-col">
        {/* Back button */}
        <motion.button
          className="self-start mt-[max(env(safe-area-inset-top,16px),16px)] ml-4 px-4 py-2 text-[13px] text-zinc-400 z-10"
          onClick={handleBackToStack}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          ← Back to Wallet
        </motion.button>

        {/* Focused card */}
        <motion.div
          className="flex-1 flex items-start justify-center px-4 pt-2 pb-8 overflow-y-auto scrollbar-hide"
          layoutId={`card-${focusedCardIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="w-full max-w-[380px]">
            <Component expanded />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col" ref={containerRef}>
      {/* Header */}
      <motion.div
        className="flex-shrink-0 px-6"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 20px), 20px)' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-zinc-500 text-[12px] font-medium tracking-widest uppercase mt-4">
          Digital Wallet
        </p>
        <h1 className="text-white text-[28px] font-bold tracking-tight mt-1">
          Hilal Kanaan
        </h1>
        <p className="text-zinc-500 text-[13px] mt-1">
          {stackState === 'collapsed'
            ? 'Pull up to browse cards'
            : 'Tap a card to explore'}
        </p>
      </motion.div>

      {/* Card stack */}
      <motion.div
        className="flex-1 relative mt-4"
        drag={stackState !== 'card-focused' ? 'y' : false}
        dragConstraints={{ top: FAN_DRAG_THRESHOLD, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y: dragY, touchAction: 'none' }}
      >
        {CARDS.map((card, index) => {
          const collapsedY = (CARDS.length - 1 - index) * COLLAPSED_GAP;
          const fannedY = index * FANNED_GAP;

          return (
            <motion.div
              key={card.id}
              className="absolute left-4 right-4 cursor-pointer"
              style={{
                height: CARD_HEIGHT,
                zIndex: index,
                bottom: stackState === 'collapsed' ? `${collapsedY}px` : 'auto',
                top: stackState === 'fanned' ? `${fannedY}px` : 'auto',
              }}
              initial={false}
              animate={{
                bottom: stackState === 'collapsed' ? collapsedY : undefined,
                top: stackState === 'fanned' ? fannedY : undefined,
                scale: 1,
                opacity: 1,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardTap(index)}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <card.Component expanded={false} />
            </motion.div>
          );
        })}

        {/* Collapsed: use fanProgress to interpolate positions */}
        {stackState === 'collapsed' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: fanProgress }}
          />
        )}
      </motion.div>
    </div>
  );
}
