import { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

// Lazy-load the heavy 3D scene to avoid blocking initial render
const AvatarScene = lazy(() =>
  import('./avatar-scene').then((m) => ({ default: m.AvatarScene }))
);

const AVATAR_URL = import.meta.env.VITE_AVATAR_URL;

function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-[10px] font-[var(--font-fixedsys)] text-[#888] text-center">
        <div className="animate-pulse">Loading 3D...</div>
      </div>
    </div>
  );
}

export function Avatar3D() {
  const [show, setShow] = useState(false);

  // Delay mount to avoid blocking desktop paint
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Don't render if no avatar URL configured
  if (!AVATAR_URL) return null;
  if (!show) return null;

  return (
    <div className="w-[600px] h-[90vh]" style={{ pointerEvents: 'none' }}>
      <Suspense fallback={<LoadingPlaceholder />}>
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 30 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent', pointerEvents: 'none' }}
        >
          <AvatarScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
