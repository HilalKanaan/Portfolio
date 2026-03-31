import { create } from 'zustand';
import type { DesktopIconConfig } from '@/types/desktop';
import { desktopIcons } from '@/data/desktop-icons';

interface DesktopStore {
  icons: DesktopIconConfig[];
  selectedIconId: string | null;
  selectIcon: (id: string | null) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  icons: desktopIcons,
  selectedIconId: null,
  selectIcon: (id) => set({ selectedIconId: id }),
}));
