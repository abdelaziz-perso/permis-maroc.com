"use client";

import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";

interface TrafficLightProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function TrafficLight({
  position,
  rotation = [0, 0, 0],
}: TrafficLightProps) {
  const [phase, setPhase] = useState<"green" | "amber" | "red">("green");

  // Predictable, realistic traffic light cycle
  useFrame(({ clock }) => {
    // 12-second total cycle:
    // 0s -> 6s: Green
    // 6s -> 8s: Amber
    // 8s -> 12s: Red
    const t = clock.elapsedTime % 12;

    if (t < 6.0) {
      if (phase !== "green") setPhase("green");
    } else if (t < 8.0) {
      if (phase !== "amber") setPhase("amber");
    } else {
      if (phase !== "red") setPhase("red");
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Modern Curved Dark Steel Pole */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 2.8, 12]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Traffic Light Housing */}
      <mesh position={[0, 2.65, 0.12]} castShadow>
        <boxGeometry args={[0.3, 0.85, 0.28]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} />
      </mesh>

      {/* Visors / Hoods */}
      {[-0.24, 0, 0.24].map((yOff, i) => (
        <mesh key={i} position={[0, 2.65 + yOff + 0.07, 0.26]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.22, 0.03, 0.14]} />
          <meshStandardMaterial color="#020617" />
        </mesh>
      ))}

      {/* Red Light */}
      <mesh position={[0, 2.89, 0.26]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          color={phase === "red" ? "#EF4444" : "#450A0A"}
          emissive={phase === "red" ? "#EF4444" : "#000000"}
          emissiveIntensity={phase === "red" ? 3.5 : 0}
        />
      </mesh>

      {/* Amber Light */}
      <mesh position={[0, 2.65, 0.26]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          color={phase === "amber" ? "#F59E0B" : "#451A03"}
          emissive={phase === "amber" ? "#F59E0B" : "#000000"}
          emissiveIntensity={phase === "amber" ? 3.5 : 0}
        />
      </mesh>

      {/* Green Light */}
      <mesh position={[0, 2.41, 0.26]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          color={phase === "green" ? "#10B981" : "#022C22"}
          emissive={phase === "green" ? "#10B981" : "#000000"}
          emissiveIntensity={phase === "green" ? 3.5 : 0}
        />
      </mesh>
    </group>
  );
}
