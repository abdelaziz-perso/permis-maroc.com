"use client";

import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoadSignProps {
  type: "stop" | "speed-30" | "parking" | "roundabout";
  position: [number, number, number];
  rotation?: [number, number, number];
  tooltipText?: string;
}

export function RoadSign({
  type,
  position,
  rotation = [0, 0, 0],
  tooltipText,
}: RoadSignProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.15 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  const getLabel = () => {
    if (tooltipText) return tooltipText;
    switch (type) {
      case "stop":
        return "Panneau STOP • Arrêt obligatoire";
      case "speed-30":
        return "Limitation à 30 km/h • Zone urbaine";
      case "parking":
        return "Stationnement autorisé [P]";
      case "roundabout":
        return "Sens giratoire obligatoire";
    }
  };

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
      {/* Sign Post */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* STOP Sign */}
      {type === "stop" && (
        <group position={[0, 1.4, 0]}>
          {/* Octagon shape */}
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.035, 8]} />
            <meshStandardMaterial
              color="#DC2626"
              roughness={0.3}
              emissive={hovered ? "#DC2626" : "#000000"}
              emissiveIntensity={hovered ? 0.6 : 0}
            />
          </mesh>
          {/* White border ring */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[0.27, 0.3, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}

      {/* 30 km/h Speed Limit Sign */}
      {type === "speed-30" && (
        <group position={[0, 1.35, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.035, 24]} />
            <meshStandardMaterial
              color="#FFFFFF"
              roughness={0.3}
              emissive={hovered ? "#DC2626" : "#000000"}
              emissiveIntensity={hovered ? 0.4 : 0}
            />
          </mesh>
          {/* Red Outer Ring */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[0.23, 0.29, 24]} />
            <meshBasicMaterial color="#DC2626" />
          </mesh>
        </group>
      )}

      {/* Parking Sign [P] */}
      {type === "parking" && (
        <group position={[0, 1.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.5, 0.035]} />
            <meshStandardMaterial
              color="#1D4ED8"
              roughness={0.3}
              emissive={hovered ? "#2563EB" : "#000000"}
              emissiveIntensity={hovered ? 0.5 : 0}
            />
          </mesh>
          {/* White 'P' icon symbol */}
          <mesh position={[-0.04, 0, 0.02]}>
            <planeGeometry args={[0.08, 0.3]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.04, 0.07, 0.02]}>
            <planeGeometry args={[0.12, 0.14]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}

      {/* HTML Tooltip on hover */}
      {hovered && (
        <Html position={[0, 1.85, 0]} center distanceFactor={10}>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 text-white border border-white/20 text-xs font-bold whitespace-nowrap shadow-2xl backdrop-blur-md flex items-center gap-1.5 animate-in fade-in zoom-in-95 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{getLabel()}</span>
          </div>
        </Html>
      )}
    </group>
  );
}
