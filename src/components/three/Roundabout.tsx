"use client";

import React from "react";
import * as THREE from "three";
import { PalmTree } from "./PalmTree";

export function Roundabout() {
  return (
    <group position={[0, 0, 0]}>
      {/* Asphalt Roundabout Road Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.25, 2.75, 48]} />
        <meshStandardMaterial color="#2B3445" roughness={0.7} />
      </mesh>

      {/* Dashed Center Circle Lane Marking */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.98, 2.04, 48]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
      </mesh>

      {/* Central Island Curb (White Concrete) */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.28, 1.34, 0.18, 48]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
      </mesh>

      {/* Central Island Green Turf */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.24, 1.24, 0.05, 48]} />
        <meshStandardMaterial color="#15803D" roughness={0.9} />
      </mesh>

      {/* Circular Bed of Low Shrubs & Landscaping */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.sin(rad) * 0.85;
        const z = Math.cos(rad) * 0.85;
        return (
          <group key={i} position={[x, 0.25, z]}>
            <mesh castShadow>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial color="#166534" roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* Center Palm Tree */}
      <PalmTree position={[0, 0.2, 0]} scale={1.1} />

      {/* Circular Blue Roundabout Direction Sign (Facing approaching traffic) */}
      <group position={[0.7, 0.2, 0.7]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Metal post */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 12]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.7} />
        </mesh>
        {/* Disc */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 24]} />
          <meshStandardMaterial color="#1D4ED8" />
        </mesh>
        {/* White circular arrow symbol */}
        <mesh position={[0, 0.95, 0.02]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.12, 0.17, 24]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Outer Curb of Roundabout */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[2.75, 2.82, 0.14, 48, 1, true]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
