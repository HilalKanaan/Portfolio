import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import type { OnCenterCallbackProps } from '@react-three/drei';

const AVATAR_URL = import.meta.env.VITE_AVATAR_URL || '';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function AvatarModel() {
  const gltf = useGLTF(AVATAR_URL);
  const scene = (gltf as { scene: THREE.Group }).scene;
  const headRef = useRef<THREE.Bone | null>(null);
  const neckRef = useRef<THREE.Bone | null>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Window-level mouse tracking (works even with pointer-events: none on canvas)
  const mouseNDC = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mouseNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // Clone scene AND find bones on the clone (not the cached original)
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clonedScene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Bone).isBone) {
        const name = child.name.toLowerCase();
        if (name === 'head') headRef.current = child as THREE.Bone;
        if (name === 'neck') neckRef.current = child as THREE.Bone;
      }
    });
  }, [clonedScene]);

  useFrame(() => {
    const targetY = clamp(mouseNDC.current.x * 0.5, -0.5, 0.5);
    const targetX = clamp(-mouseNDC.current.y * 0.3, -0.25, 0.25);

    targetRotation.current.x = targetX;
    targetRotation.current.y = targetY;

    if (neckRef.current) {
      neckRef.current.rotation.x = THREE.MathUtils.lerp(
        neckRef.current.rotation.x,
        targetRotation.current.x * 0.4,
        0.05
      );
      neckRef.current.rotation.y = THREE.MathUtils.lerp(
        neckRef.current.rotation.y,
        targetRotation.current.y * 0.5,
        0.05
      );
    }

    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotation.current.x * 0.6,
        0.08
      );
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotation.current.y * 0.7,
        0.08
      );
    }
  });

  const handleCentered = useCallback((props: OnCenterCallbackProps) => {
    console.log('[Avatar3D] Centered model:', {
      width: props.width.toFixed(3),
      height: props.height.toFixed(3),
      depth: props.depth.toFixed(3),
      boundingBox: {
        min: props.boundingBox.min.toArray().map((v: number) => v.toFixed(3)),
        max: props.boundingBox.max.toArray().map((v: number) => v.toFixed(3)),
      },
    });
  }, []);

  return (
    <Center onCentered={handleCentered}>
      <primitive object={clonedScene} />
    </Center>
  );
}

export function AvatarScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <directionalLight position={[-2, 3, -1]} intensity={0.3} color="#8888ff" />
      <pointLight position={[0, 2, -2]} intensity={0.5} color="#aa88ff" />
      <AvatarModel />
    </>
  );
}

if (AVATAR_URL) {
  useGLTF.preload(AVATAR_URL);
}
