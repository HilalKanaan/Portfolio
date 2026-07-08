import { create } from 'zustand';

export type MobileAppId =
  | 'about'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'contact'
  | 'recycle-bin';

export type MobilePhase = 'boot' | 'home';

export interface OriginRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MobileStore {
  phase: MobilePhase;
  openApp: MobileAppId | null;
  /** Screen rect of the tapped icon — apps zoom out of it. */
  originRect: OriginRect | null;
  startMenuOpen: boolean;
  chatOpen: boolean;
  showBSOD: boolean;

  finishBoot: () => void;
  launchApp: (id: MobileAppId, rect?: OriginRect) => void;
  closeApp: () => void;
  setStartMenuOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
  triggerBSOD: () => void;
  reboot: () => void;
}

export const useMobileStore = create<MobileStore>((set) => ({
  phase: 'boot',
  openApp: null,
  originRect: null,
  startMenuOpen: false,
  chatOpen: false,
  showBSOD: false,

  finishBoot: () => set({ phase: 'home' }),

  launchApp: (id, rect) =>
    set({
      openApp: id,
      originRect: rect ?? null,
      startMenuOpen: false,
      chatOpen: false,
    }),

  closeApp: () => set({ openApp: null }),

  setStartMenuOpen: (open) => set({ startMenuOpen: open }),

  setChatOpen: (open) => set({ chatOpen: open, startMenuOpen: false }),

  triggerBSOD: () =>
    set({ showBSOD: true, startMenuOpen: false, chatOpen: false, openApp: null }),

  reboot: () => set({ showBSOD: false, phase: 'boot', openApp: null }),
}));

/** Map desktop AI OPEN_WINDOW targets to Pocket apps. */
export function aiTargetToMobileApp(target: string): MobileAppId | null {
  switch (target) {
    case 'about':
      return 'about';
    case 'projects':
      return 'projects';
    case 'experience':
      return 'experience';
    case 'my-computer':
      return 'skills';
    case 'recycle-bin':
      return 'recycle-bin';
    default:
      return null;
  }
}
