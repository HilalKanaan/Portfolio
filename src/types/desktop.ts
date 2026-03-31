import type { WindowType } from './window';

export interface DesktopIconConfig {
  id: string;
  label: string;
  icon: string;
  /** If set, double-click opens this window */
  windowType?: WindowType;
  /** If set, double-click opens this URL */
  href?: string;
  /** Optional: render as raw HTML (for SVG icons) */
  svgIcon?: string;
  position: { row: number; col: number };
}
