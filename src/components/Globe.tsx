'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function makeMapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.fillStyle = '#061b16'; ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = '#18a96c';
  const land = [
    [[110,105],[155,62],[220,72],[260,112],[246,155],[205,180],[190,235],[158,275],[130,230],[115,175]],
    [[255,270],[300,286],[324,340],[300,410],[270,465],[245,395],[230,330]],
    [[455,95],[510,65],[585,78],[620,120],[595,155],[545,165],[520,210],[485,185],[450,145]],
    [[510,195],[570,180],[620,220],[610,295],[570,370],[530,350],[500,280]],
    [[650,95],[710,65],[790,88],[840,135],[810,180],[755,172],[720,220],[680,175]],
    [[760,300],[815,285],[855,325],[840,390],[790,405],[760,360]]
  ];
  land.forEach(points => { ctx.beginPath(); points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y)); ctx.closePath(); ctx.fill(); });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Earth() {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(makeMapTexture, []);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.12; });
  return <group ref={group} rotation={[0.08, -0.6, -0.12]}>
    <mesh>
      <sphereGeometry args={[1.55, 96, 96]} />
      <meshStandardMaterial map={texture} roughness={0.82} metalness={0.12} />
    </mesh>
    <mesh scale={1.012}>
      <sphereGeometry args={[1.55, 48, 48]} />
      <meshBasicMaterial color="#45ffad" wireframe transparent opacity={0.12} />
    </mesh>
    <mesh scale={1.08}>
      <sphereGeometry args={[1.55, 48, 48]} />
      <meshBasicMaterial color="#10b981" side={THREE.BackSide} transparent opacity={0.12} />
    </mesh>
  </group>;
}

function Stars() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(900 * 3);
    for (let i=0;i<900;i++) { arr[i*3]=(Math.random()-.5)*18; arr[i*3+1]=(Math.random()-.5)*10; arr[i*3+2]=(Math.random()-.5)*8-2; }
    return arr;
  }, []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.003; });
  return <points ref={ref}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#a5ffd2" size={0.018} transparent opacity={0.75} sizeAttenuation />
  </points>;
}

export default function Globe() {
  return <div className="globe-canvas" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[-3, 4, 5]} intensity={2.2} color="#d6ffe9" />
      <pointLight position={[3, -2, 2]} intensity={16} color="#00ff91" />
      <Stars />
      <Earth />
    </Canvas>
  </div>;
}
