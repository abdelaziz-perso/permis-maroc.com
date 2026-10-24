"use client";

import React from "react";

interface BuildingProps {
  type?: "minaret" | "modern-white" | "apartment";
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function MoroccanBuilding({
  type = "modern-white",
  position,
  scale = 1.0,
  rotation = [0, 0, 0],
}: BuildingProps) {
  if (type === "minaret") {
    // Stylized Moroccan Minaret (Hassan / Koutoubia inspired)
    return (
      <group position={position} scale={scale} rotation={rotation}>
        {/* Main Tower Base */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 5.0, 1.6]} />
          <meshStandardMaterial color="#E0A96D" roughness={0.8} />
        </mesh>

        {/* Decorative Arabesque / Arched Niches */}
        {[-0.81, 0.81].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 3.2, 0]}>
              <boxGeometry args={[0.02, 1.2, 0.6]} />
              <meshStandardMaterial color="#A16207" roughness={0.7} />
            </mesh>
            <mesh position={[0, 3.2, x]}>
              <boxGeometry args={[0.6, 1.2, 0.02]} />
              <meshStandardMaterial color="#A16207" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Balcony / Gallery Level */}
        <mesh position={[0, 5.15, 0]} castShadow>
          <boxGeometry args={[1.8, 0.3, 1.8]} />
          <meshStandardMaterial color="#D97706" roughness={0.7} />
        </mesh>

        {/* Upper Lantern Tier */}
        <mesh position={[0, 5.75, 0]} castShadow>
          <boxGeometry args={[1.0, 1.0, 1.0]} />
          <meshStandardMaterial color="#E0A96D" roughness={0.8} />
        </mesh>

        {/* Moroccan Green Ceramic Tile Pyramid Roof */}
        <mesh position={[0, 6.75, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[0.9, 1.2, 4]} />
          <meshStandardMaterial color="#047857" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Bronze Jamour (Spire with spheres) */}
        <group position={[0, 7.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>
    );
  }

  // Modern White Coastal Moroccan Building
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Main White Structure */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 4.4, 2.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>

      {/* Rooftop Parapet */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <boxGeometry args={[2.9, 0.25, 2.5]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
      </mesh>

      {/* Layered Balconies */}
      {[1.5, 2.7, 3.8].map((y, idx) => (
        <group key={idx}>
          <mesh position={[0, y, 1.25]} castShadow>
            <boxGeometry args={[2.4, 0.15, 0.35]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
          </mesh>
          {/* Glass / Metal Balcony Railing */}
          <mesh position={[0, y + 0.22, 1.4]}>
            <boxGeometry args={[2.35, 0.3, 0.04]} />
            <meshStandardMaterial
              color="#38BDF8"
              transparent
              opacity={0.65}
              roughness={0.1}
            />
          </mesh>
          {/* Windows behind balcony */}
          <mesh position={[-0.6, y + 0.5, 1.21]}>
            <planeGeometry args={[0.6, 0.65]} />
            <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0.6, y + 0.5, 1.21]}>
            <planeGeometry args={[0.6, 0.65]} />
            <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
