import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function MorphSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        pointer.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('touchmove', onTouch);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth pointer-driven rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.current.y * 0.5 + Math.sin(t * 0.2) * 0.1,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.current.x * 0.5 + t * 0.15,
      0.05
    );

    // Subtle float
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.32;

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#0A0A12"
          distort={0.42}
          speed={1.6}
          roughness={0.18}
          metalness={0.95}
          emissive="#001a26"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function GlowRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.08;
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.55;

  return (
    <mesh ref={meshRef} scale={scale} position={[0, 0, -1.5]}>
      <ringGeometry args={[1, 1.04, 96]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.18} side={THREE.DoubleSide} />
    </mesh>
  );
}

function GradientBackdrop() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Custom shader: animated radial gradient with cyan glow
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#00E5FF') },
      uColorB: { value: new THREE.Color('#FF2E93') },
      uColorBg: { value: new THREE.Color('#050507') },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorBg;

    // 2D simplex-ish noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
        mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
        u.y
      );
    }

    void main() {
      vec2 uv = vUv - 0.5;
      float t = uTime * 0.06;

      // Two slow-drifting blobs
      vec2 blobA = vec2(sin(t * 1.3) * 0.35, cos(t * 0.9) * 0.3);
      vec2 blobB = vec2(cos(t * 1.1) * 0.4, sin(t * 1.5) * 0.35);

      float dA = length(uv - blobA);
      float dB = length(uv - blobB);

      float glowA = smoothstep(0.55, 0.0, dA) * 0.5;
      float glowB = smoothstep(0.5, 0.0, dB) * 0.35;

      // Vignette
      float vig = smoothstep(1.0, 0.4, length(uv));

      // Subtle noise grain
      float n = noise(vUv * 80.0 + uTime * 0.5) * 0.04;

      vec3 col = uColorBg;
      col = mix(col, uColorA, glowA * vig);
      col = mix(col, uColorB, glowB * vig);
      col += n;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2.2} color="#00E5FF" />
      <pointLight position={[-3, -2, 2]} intensity={1.8} color="#FF2E93" />
      <directionalLight position={[0, 5, 5]} intensity={0.6} />

      <GradientBackdrop />
      <GlowRing />
      <MorphSphere />

      <Sparkles count={80} scale={6} size={1.4} speed={0.3} color="#F5F1E8" opacity={0.6} />
    </Canvas>
  );
}
