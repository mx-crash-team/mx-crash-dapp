/* eslint-disable */
// @ts-nocheck

import React, { memo, Suspense, useEffect, useMemo, useRef } from 'react';
import {
  extend,
  Canvas,
  useThree,
  useFrame,
  useLoader
} from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

import circleImg from 'assets/images/three/circle.png';

extend({ OrbitControls });

function CameraControls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  const controlsRef = useRef();
  useFrame(() => controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      enabled={false}
    />
  );
}

function Points({
  pointCount,
  separator
}: {
  pointCount: number;
  separator: number;
}) {
  let velocity = 0.1;
  let acceleration = 0;

  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef<THREE.BufferAttribute>(null);
  const points = useRef<THREE.Points>(null);

  useFrame(() => {
    const positions = bufferRef.current.array;

    let i = 0;
    for (let j = 0; j < pointCount; j++) {
      positions[i] = positions[i] += velocity;
      if (positions[i] > 300) {
        positions[i] = -300;
      }
      i += 3;
    }

    bufferRef.current.needsUpdate = true;
  });

  const [positions] = useMemo(() => {
    let positions = [];

    for (let i = 0; i < pointCount; i++) {
      let x = Math.random() * 600 - 300;
      let z = Math.random() * 600 - 300;
      let y = Math.random() * 600 - 300;

      positions.push(x, y, z);
    }

    return [new Float32Array(positions)];
  }, [pointCount]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          attach='attributes-position'
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach='material'
        map={imgTex}
        depthWrite={false}
        color={0xf2542d}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

export const AnimationCanvas = () => {
  return (
    <Canvas
      camera={{
        position: [100, 30, 0],
        fov: 45,
        rotation: [Math.PI / 2, 0, 0]
      }}
      resize={{ scroll: false }}
    >
      <Suspense fallback={null}>
        <Points pointCount={6000} />
      </Suspense>
      <CameraControls />
    </Canvas>
  );
};

export const Particles = memo(() => {
  const onunload = (e) => {
    document.getElementById('canvas-container')?.remove();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onunload);
    return () => {
      window.removeEventListener('beforeunload', onunload);
    };
  }, []);

  return (
    <div className='particle-wrapper'>
      <div className='particles-background' id='canvas-container'>
        <AnimationCanvas />
      </div>
    </div>
  );
});
