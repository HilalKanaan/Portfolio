import { create } from 'zustand';
import type { WindowId, WindowState } from '@/types/window';
import { Z_INDEX } from '@/utils/constants';
import { trackWindowOpen } from '@/lib/tracking';

interface WindowStore {
  windows: Record<WindowId, WindowState>;
  order: WindowId[];
  activeWindowId: WindowId | null;
  nextZIndex: number;

  openWindow: (config: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void;
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  order: [],
  activeWindowId: null,
  nextZIndex: Z_INDEX.WINDOW_BASE,

  openWindow: (config) => {
    const state = get();
    if (state.windows[config.id]) {
      state.focusWindow(config.id);
      return;
    }
    const zIndex = state.nextZIndex;
    set({
      windows: {
        ...state.windows,
        [config.id]: { ...config, zIndex, isMinimized: false, isMaximized: false },
      },
      order: [...state.order, config.id],
      activeWindowId: config.id,
      nextZIndex: zIndex + 1,
    });
    trackWindowOpen(config.type);
  },

  closeWindow: (id) =>
    set((state) => {
      const { [id]: _, ...remaining } = state.windows;
      const newOrder = state.order.filter((wId) => wId !== id);
      return {
        windows: remaining,
        order: newOrder,
        activeWindowId:
          state.activeWindowId === id
            ? newOrder.length > 0
              ? newOrder[newOrder.length - 1]
              : null
            : state.activeWindowId,
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      if (!state.windows[id]) return state;
      const newOrder = [...state.order.filter((wId) => wId !== id), id];
      const zIndex = state.nextZIndex;
      return {
        order: newOrder,
        activeWindowId: id,
        nextZIndex: zIndex + 1,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex, isMinimized: false },
        },
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      if (!state.windows[id]) return state;
      const newActiveOrder = state.order.filter(
        (wId) => wId !== id && !state.windows[wId]?.isMinimized
      );
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: true },
        },
        activeWindowId:
          state.activeWindowId === id
            ? newActiveOrder.length > 0
              ? newActiveOrder[newActiveOrder.length - 1]
              : null
            : state.activeWindowId,
      };
    }),

  toggleMaximize: (id) =>
    set((state) => {
      if (!state.windows[id]) return state;
      const win = state.windows[id];
      return {
        windows: {
          ...state.windows,
          [id]: { ...win, isMaximized: !win.isMaximized },
        },
      };
    }),

  moveWindow: (id, position) =>
    set((state) => {
      if (!state.windows[id]) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], position },
        },
      };
    }),

  resizeWindow: (id, size) =>
    set((state) => {
      if (!state.windows[id]) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], size },
        },
      };
    }),
}));
