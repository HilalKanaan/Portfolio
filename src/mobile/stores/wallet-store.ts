import { create } from 'zustand';

export interface WalletStore {
  // Face ID
  isAuthenticated: boolean;
  setAuthenticated: () => void;

  // Stack state
  stackState: 'collapsed' | 'fanned' | 'card-focused';
  focusedCardIndex: number | null;
  setStackState: (state: 'collapsed' | 'fanned' | 'card-focused') => void;
  focusCard: (index: number) => void;
  unfocusCard: () => void;

  // VIP Pass (Projects)
  activeProjectIndex: number;
  isProjectFlipped: boolean;
  setActiveProjectIndex: (i: number) => void;
  toggleProjectFlip: () => void;
  nextProject: () => void;
  prevProject: () => void;

  // AI Concierge
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const TOTAL_PROJECTS = 4;

export const useWalletStore = create<WalletStore>((set, get) => ({
  // Face ID
  isAuthenticated: localStorage.getItem('hilalOS-wallet-authenticated') === 'true',
  setAuthenticated: () => {
    localStorage.setItem('hilalOS-wallet-authenticated', 'true');
    set({ isAuthenticated: true });
  },

  // Stack
  stackState: 'collapsed',
  focusedCardIndex: null,
  setStackState: (stackState) => set({ stackState }),
  focusCard: (index) =>
    set({ stackState: 'card-focused', focusedCardIndex: index, isProjectFlipped: false }),
  unfocusCard: () =>
    set({ stackState: 'fanned', focusedCardIndex: null, isProjectFlipped: false }),

  // VIP Pass
  activeProjectIndex: 0,
  isProjectFlipped: false,
  setActiveProjectIndex: (i) => set({ activeProjectIndex: i, isProjectFlipped: false }),
  toggleProjectFlip: () => set({ isProjectFlipped: !get().isProjectFlipped }),
  nextProject: () => {
    const next = (get().activeProjectIndex + 1) % TOTAL_PROJECTS;
    set({ activeProjectIndex: next, isProjectFlipped: false });
  },
  prevProject: () => {
    const prev = (get().activeProjectIndex - 1 + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    set({ activeProjectIndex: prev, isProjectFlipped: false });
  },

  // AI Concierge
  isChatOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set({ isChatOpen: !get().isChatOpen }),
}));
