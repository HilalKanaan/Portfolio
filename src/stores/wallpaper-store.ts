import { create } from 'zustand';

export type WallpaperId = 'teal' | 'navy' | 'forest' | 'plum' | 'storm' | 'matrix';

const WALLPAPER_COLORS: Record<WallpaperId, { light: string; dark: string }> = {
  teal: { light: '#008080', dark: '#004040' },
  navy: { light: '#000040', dark: '#000020' },
  forest: { light: '#254117', dark: '#132a0c' },
  plum: { light: '#3d0c4f', dark: '#1e0628' },
  storm: { light: '#3a3a4a', dark: '#1e1e28' },
  matrix: { light: '#001100', dark: '#000800' },
};

interface WallpaperStore {
  wallpaper: WallpaperId;
  showWidgets: boolean;
  scanlines: boolean;
  setWallpaper: (id: WallpaperId) => void;
  setShowWidgets: (show: boolean) => void;
  setScanlines: (on: boolean) => void;
  getColor: (isDark: boolean) => string;
}

export const useWallpaperStore = create<WallpaperStore>((set, get) => ({
  wallpaper: (localStorage.getItem('hilalos-wallpaper') as WallpaperId) || 'matrix',
  showWidgets: localStorage.getItem('hilalos-widgets') !== 'false',
  scanlines: localStorage.getItem('hilalos-scanlines') === 'true',

  setWallpaper: (id) => {
    localStorage.setItem('hilalos-wallpaper', id);
    set({ wallpaper: id });
  },

  setShowWidgets: (show) => {
    localStorage.setItem('hilalos-widgets', String(show));
    set({ showWidgets: show });
  },

  setScanlines: (on) => {
    localStorage.setItem('hilalos-scanlines', String(on));
    set({ scanlines: on });
  },

  getColor: (isDark) => {
    const wp = get().wallpaper;
    const colors = WALLPAPER_COLORS[wp];
    return isDark ? colors.dark : colors.light;
  },
}));
