import { create } from 'zustand';

export type BootPhase = 'bios' | 'ai-interrupt' | 'loading' | 'desktop';

interface BootStore {
  phase: BootPhase;
  currentLine: number;
  setPhase: (phase: BootPhase) => void;
  advanceLine: () => void;
  skipBoot: () => void;
}

export const useBootStore = create<BootStore>((set) => ({
  phase: localStorage.getItem('sentient-os-skip-boot') === 'true' ? 'desktop' : 'bios',
  currentLine: 0,

  setPhase: (phase) => set({ phase }),

  advanceLine: () => set((state) => ({ currentLine: state.currentLine + 1 })),

  skipBoot: () => {
    localStorage.setItem('sentient-os-skip-boot', 'true');
    set({ phase: 'desktop' });
  },
}));
