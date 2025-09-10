// src/components/InteractiveBackground.tsx
"use client";

import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import { BufferGeometry, Material, Points as PointsType } from 'three';
import { gsap } from 'gsap';

const Starfield = (props: any) => {
  const ref = useRef<PointsType<BufferGeometry, Material | Material[]>>(null!);
  const [sphere] = useState(() => random.inSphere(new Float32Array(props.count || 12000), { radius: props.radius || 1.5 }));

  // Fare pozisyonunu takip etmek için bir ref
  const mousePosition = useRef({ x: 0, y: 0 });

  // GSAP ile fare hareketini yumuşat
  useFrame((state, delta) => {
    if (props.reduced) {
      // Çok hafif bir arka plan hareketi, mouse takibi yok
      ref.current.rotation.x -= delta / 40;
      ref.current.rotation.y -= delta / 60;
      return;
    }

    gsap.to(mousePosition.current, {
      x: state.mouse.x * 0.3,
      y: state.mouse.y * 0.3,
      duration: 1,
      ease: 'power3.out',
    });

    ref.current.rotation.x -= delta / 15 + mousePosition.current.y / 20;
    ref.current.rotation.y -= delta / 20 + mousePosition.current.x / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          opacity={0.6}
          size={0.006} // Parçacık boyutu
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarfieldFar = ({ reduced }: { reduced?: boolean }) => {
  const ref = useRef<PointsType<BufferGeometry, Material | Material[]>>(null!);
  const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 2.5 }));
  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 40;
    ref.current.rotation.y -= delta / 60;
  });
  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#9aa3ae" opacity={0.35} size={0.003} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const InteractiveBackground = () => {
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduced.current = mq.matches;
      const onChange = () => (reduced.current = mq.matches);
      mq.addEventListener?.('change', onChange);
      return () => mq.removeEventListener?.('change', onChange);
    }
  }, []);

  // Yüksek DPR cihazlarda parçacık sayısını düşür
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const nearCount = reduced.current ? 4000 : (dpr > 1.5 ? 8000 : 12000);

  return (
    <div className="w-full h-full fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1.5] }} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} dpr={dpr}>
        <Suspense fallback={null}>
          <StarfieldFar reduced={reduced.current} />
          <Starfield reduced={reduced.current} count={nearCount} radius={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;