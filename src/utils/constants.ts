export const Z_INDEX = {
  DESKTOP: 0,
  WINDOW_BASE: 100,
  AI_ORB: 8000,
  TOUR_OVERLAY: 8500,
  TASKBAR: 9000,
  START_MENU: 9100,
  BOOT: 10000,
} as const;

export const TASKBAR_HEIGHT = 28;

export const DEFAULT_WINDOW_SIZE = {
  width: 500,
  height: 400,
} as const;

export const DEFAULT_WINDOW_MIN_SIZE = {
  width: 200,
  height: 150,
} as const;
