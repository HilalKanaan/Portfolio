/** Tiny haptic tick for touch feedback (no-op where unsupported, e.g. iOS Safari). */
export function haptic(pattern: number | number[] = 8) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}
