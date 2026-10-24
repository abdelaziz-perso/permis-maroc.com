"use client";

import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DirectionSignProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function DirectionSign({
  position,
  rotation = [0, 0, 0],
}: DirectionSignProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.08 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Sign Steel Posts */}
      <mesh position={[-0.7, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Blue Directional Panel */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[1.7, 1.1, 0.06]} />
        <meshStandardMaterial
          color="#1D4ED8"
          roughness={0.3}
          metalness={0.2}
          emissive={hovered ? "#2563EB" : "#000000"}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>

      {/* White Border Frame */}
      <mesh position={[0, 1.8, 0.035]}>
        <boxGeometry args={[1.64, 1.04, 0.01]} />
        <meshBasicMaterial color="#FFFFFF" wireframe={true} />
      </mesh>

      {/* Three Horizontal Direction Plates (Casablanca, Rabat, Marrakech) */}
      {[
        { name: "Casablanca →", y: 2.15 },
        { name: "Rabat →", y: 1.8 },
        { name: "Marrakech →", y: 1.45 },
      ].map((dir, idx) => (
        <group key={idx} position={[0, dir.y, 0.04]}>
          <mesh>
            <boxGeometry args={[1.5, 0.26, 0.01]} />
            <meshStandardMaterial color="#1E40AF" />
          </mesh>
          {/* Decorative arrow bar */}
          <mesh position={[0.55, 0, 0.01]}>
            <planeGeometry args={[0.18, 0.06]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* Hover HTML Info Tooltip */}
      {hovered && (
        <Html position={[0, 2.65, 0]} center distanceFactor={11}>
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/95 text-white border border-blue-500/40 text-xs shadow-2xl backdrop-blur-md flex flex-col gap-0.5 pointer-events-none">
            <span className="font-bold text-blue-400">Panneau de Direction Autoroutière</span>
            <span className="text-[11px] text-slate-300">
              Casablanca • Rabat • Marrakech
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
