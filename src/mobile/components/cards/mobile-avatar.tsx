import { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const AvatarScene = lazy(() =>
  import('@/components/desktop/widgets/avatar-scene').then((m) => ({
    default: m.AvatarScene,
  }))
);

const AVATAR_URL = import.meta.env.VITE_AVATAR_URL;

export function MobileAvatar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!AVATAR_URL || !show) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg">
        <span className="text-[40px]">👤</span>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg">
          <div className="text-[10px] text-zinc-500 animate-pulse">Loading 3D...</div>
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.5], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <AvatarScene />
      </Canvas>
    </Suspense>
  );
}
