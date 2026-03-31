import { create } from 'zustand';

export type RetroTheme = 'classic' | 'dark';

interface ThemeStore {
  theme: RetroTheme;
  toggleTheme: () => void;
  setTheme: (theme: RetroTheme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem('sentient-os-theme') as RetroTheme) || 'classic',

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'classic' ? 'dark' : 'classic';
      localStorage.setItem('sentient-os-theme', newTheme);
      document.documentElement.setAttribute(
        'data-theme',
        newTheme === 'dark' ? 'dark' : ''
      );
      return { theme: newTheme };
    }),

  setTheme: (theme) => {
    localStorage.setItem('sentient-os-theme', theme);
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : ''
    );
    set({ theme });
  },
}));
