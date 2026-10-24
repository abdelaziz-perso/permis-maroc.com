"use client";

import React from "react";

interface PalmTreeProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function PalmTree({
  position = [0, 0, 0],
  scale = 1.0,
  rotation = [0, 0, 0],
}: PalmTreeProps) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Textured Curved Trunk */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.18, 1.4, 8]} />
        <meshStandardMaterial color="#78350F" roughness={0.9} />
      </mesh>
      <mesh position={[0.04, 1.7, 0]} rotation={[0, 0, -0.06]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#854D0E" roughness={0.9} />
      </mesh>

      {/* Fronds / Palm Canopy */}
      <group position={[0.06, 2.1, 0]}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <group key={idx} rotation={[0, rad, 0]}>
              <mesh position={[0.42, -0.15, 0]} rotation={[0, 0, -0.55]} castShadow>
                <coneGeometry args={[0.26, 1.0, 5]} />
                <meshStandardMaterial color="#15803D" roughness={0.65} />
              </mesh>
            </group>
          );
        })}

        {/* Top Fresh Leaves */}
        {[22, 112, 202, 292].map((deg, idx) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <group key={idx} rotation={[0, rad, 0]}>
              <mesh position={[0.28, 0.1, 0]} rotation={[0, 0, -0.3]} castShadow>
                <coneGeometry args={[0.2, 0.7, 5]} />
                <meshStandardMaterial color="#22C55E" roughness={0.6} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
