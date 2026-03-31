import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWalletStore } from './stores/wallet-store';
import { FaceIdScreen } from './components/face-id/face-id-screen';
import { WalletStack } from './components/wallet/wallet-stack';
import { AiConciergeOrb } from './components/ai/ai-concierge-orb';
import { AiChatPanel } from './components/ai/ai-chat-panel';
import { trackVisit } from '@/lib/tracking';

export function MobileApp() {
  const isAuthenticated = useWalletStore((s) => s.isAuthenticated);
  const isChatOpen = useWalletStore((s) => s.isChatOpen);

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <div className="mobile-app fixed inset-0 bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <FaceIdScreen key="face-id" />
        ) : (
          <div key="wallet" className="w-full h-full relative">
            <WalletStack />
            <AiConciergeOrb />
            <AnimatePresence>
              {isChatOpen && <AiChatPanel key="chat-panel" />}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
