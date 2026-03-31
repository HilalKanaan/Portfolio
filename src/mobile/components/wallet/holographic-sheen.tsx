import { useDeviceOrientation } from '../../hooks/use-device-orientation';

export function HolographicSheen() {
  const { beta, gamma, supported } = useDeviceOrientation();

  // Map tilt to gradient angle and position
  const angle = supported ? 135 + gamma * 1.5 : 135;
  const offsetX = supported ? 50 + gamma * 0.8 : 50;
  const offsetY = supported ? 50 + (beta - 45) * 0.5 : 50;

  return (
    <div
      className="absolute inset-0 rounded-[16px] pointer-events-none"
      style={{
        background: `linear-gradient(${angle}deg,
          transparent 0%,
          rgba(255,255,255,0.06) ${offsetX - 10}%,
          rgba(255,255,255,0.12) ${offsetX}%,
          rgba(255,255,255,0.06) ${offsetX + 10}%,
          transparent 100%)`,
        transform: `translateY(${(offsetY - 50) * 0.2}px)`,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
