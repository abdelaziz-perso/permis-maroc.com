"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PalmTree } from "@/components/three/PalmTree";
import { MoroccanBuilding } from "@/components/three/MoroccanBuilding";
import { RoadSign } from "@/components/three/RoadSign";
import { DirectionSign } from "@/components/three/DirectionSign";

// Ultra-lightweight car for mobile scene (zero lag, no heavy mesh downloads)
function CompactMobileCar() {
  const carRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!carRef.current) return;
    // Subtle gentle floating movement
    carRef.current.position.y =
      0.18 + Math.sin(clock.elapsedTime * 3) * 0.01;
  });

  return (
    <group ref={carRef} position={[0.4, 0.18, 0.4]} rotation={[0, -Math.PI / 7, 0]} scale={0.72}>
      {/* Vehicle body */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.4, 0.45, 2.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Red Permis Maroc side stripe */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.42, 0.08, 2.42]} />
        <meshStandardMaterial color="#F20D2F" />
      </mesh>
      {/* Cabin / Windows */}
      <mesh position={[0, 0.58, -0.1]}>
        <boxGeometry args={[1.2, 0.38, 1.3]} />
        <meshStandardMaterial color="#071A3D" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* L Roof Sign */}
      <group position={[0, 0.88, -0.1]}>
        <mesh>
          <boxGeometry args={[0.45, 0.22, 0.32]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0, 0.165]}>
          <planeGeometry args={[0.18, 0.18]} />
          <meshBasicMaterial color="#F20D2F" />
        </mesh>
      </group>
      {/* Headlights */}
      <mesh position={[0.42, 0.22, 1.22]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.42, 0.22, 1.22]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>
      {/* Wheels */}
      {[-0.65, 0.65].map((x, i) =>
        [-0.7, 0.7].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.12, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.16, 0.14, 12]} />
            <meshStandardMaterial color="#1E293B" roughness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
}

export function MobileDrivingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Performance: Pause when outside viewport using IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-44 sm:h-52 rounded-3xl overflow-hidden relative border border-[#E5ECF5] shadow-sm bg-gradient-to-b from-[#E0F2FE] via-[#F0FDF4] to-[#F6F9FD]"
    >
      {/* Sky & Sun Glow Background */}
      <div className="absolute top-2 right-6 w-16 h-16 rounded-full bg-amber-300/30 blur-xl pointer-events-none" />

      {isVisible ? (
        <Canvas
          camera={{ position: [5.2, 3.8, 6.2], fov: 36 }}
          dpr={[1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} color="#FFFFFF" />
          <directionalLight position={[6, 8, 4]} intensity={1.2} color="#FFFBEB" />

          <Suspense fallback={null}>
            <group position={[0, -0.4, 0]}>
              {/* Road Ground */}
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[16, 12]} />
                <meshStandardMaterial color="#CBD5E1" roughness={0.9} />
              </mesh>

              {/* Asphalt Boulevard */}
              <mesh position={[0, 0.02, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[14, 2.6]} />
                <meshStandardMaterial color="#1E293B" roughness={0.7} />
              </mesh>

              {/* Road dashed lines */}
              {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
                <mesh key={i} position={[x, 0.025, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[0.55, 0.08]} />
                  <meshStandardMaterial color="#FFFFFF" />
                </mesh>
              ))}

              {/* Learner car */}
              <CompactMobileCar />

              {/* Direction Sign Casablanca / Rabat / Marrakech */}
              <DirectionSign position={[-1.6, 0.03, -0.9]} rotation={[0, Math.PI / 6, 0]} />

              {/* STOP sign */}
              <RoadSign
                type="stop"
                position={[1.8, 0.03, 0.2]}
                rotation={[0, -Math.PI / 6, 0]}
              />

              {/* Moroccan Hassan/Koutoubia Minaret in background */}
              <MoroccanBuilding
                type="minaret"
                position={[-3.2, 0, -2.4]}
                scale={0.75}
              />

              {/* Palm trees */}
              <PalmTree position={[2.6, 0.03, -1.2]} scale={0.75} />
              <PalmTree position={[-0.2, 0.03, -1.8]} scale={0.65} />
            </group>
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-xs text-slate-400">
          Scène en pause
        </div>
      )}
    </div>
  );
}
