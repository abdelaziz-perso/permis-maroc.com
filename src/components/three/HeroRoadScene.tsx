"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- Stylized Moroccan Palm Tree ---
function PalmTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 2.8, 8]} />
        <meshStandardMaterial color="#6B4423" roughness={0.9} />
      </mesh>
      {/* Palm Leaves */}
      <group position={[0, 2.8, 0]}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              rotation={[0.35, rad, 0]}
              position={[Math.sin(rad) * 0.4, 0, Math.cos(rad) * 0.4]}
            >
              <coneGeometry args={[0.45, 1.2, 5]} />
              <meshStandardMaterial color="#15803D" roughness={0.7} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// --- Stylized Moroccan Building ---
function MoroccanBuilding({
  position,
  width,
  height,
  depth,
  color,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}) {
  return (
    <group position={position}>
      {/* Main Block */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      {/* Parapet / Roof Border */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[width + 0.1, 0.2, depth + 0.1]} />
        <meshStandardMaterial color="#994D22" roughness={0.9} />
      </mesh>
      {/* Arched windows / niches */}
      {[-0.6, 0.6].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, height * 0.6, depth / 2 + 0.02]}>
          <boxGeometry args={[0.4, 0.7, 0.05]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// --- Driving School Car ---
function DrivingSchoolCar({ isMoving = true }: { isMoving?: boolean }) {
  const carRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    if (!carRef.current || !isMoving) return;
    // Gentle forward motion loop along Z axis
    carRef.current.position.z -= delta * 1.8;
    if (carRef.current.position.z < -9) {
      carRef.current.position.z = 9;
    }
    // Slight suspension bob
    carRef.current.position.y = 0.35 + Math.sin(state.clock.elapsedTime * 6) * 0.012;
  });

  return (
    <group ref={carRef} position={[0.9, 0.35, 3]}>
      {/* Car Body Lower */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.4, 0.45, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Red accent strip (Permis Maroc branding) */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.42, 0.08, 2.62]} />
        <meshStandardMaterial color="#C1272D" roughness={0.4} />
      </mesh>
      {/* Cabin / Windows */}
      <mesh position={[0, 0.62, -0.1]} castShadow>
        <boxGeometry args={[1.15, 0.4, 1.4]} />
        <meshStandardMaterial color="#1E293B" roughness={0.1} metalness={0.9} transparent opacity={0.85} />
      </mesh>
      {/* Auto-École Roof Sign */}
      <group position={[0, 0.95, -0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.2, 0.25]} />
          <meshStandardMaterial color="#FEF08A" roughness={0.3} />
        </mesh>
        {/* Red 'L' or Auto-école badge */}
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[0.16, 0.16]} />
          <meshBasicMaterial color="#C1272D" />
        </mesh>
      </group>
      {/* Headlights */}
      <mesh position={[0.45, 0.22, -1.32]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#FEF9C3" emissive="#FEF08A" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-0.45, 0.22, -1.32]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#FEF9C3" emissive="#FEF08A" emissiveIntensity={1.2} />
      </mesh>
      {/* Tail lights */}
      <mesh position={[0.45, 0.25, 1.32]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.45, 0.25, 1.32]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={0.8} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.72, 0.16, 0.75],
        [0.72, 0.16, 0.75],
        [-0.72, 0.16, -0.75],
        [0.72, 0.16, -0.75],
      ].map((pos, idx) => (
        <mesh
          key={idx}
          position={pos as [number, number, number]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.22, 0.22, 0.16, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// --- Animated Traffic Light ---
function TrafficLight({ position }: { position: [number, number, number] }) {
  const [activeLight, setActiveLight] = useState<"green" | "yellow" | "red">("green");

  useFrame(({ clock }) => {
    const cycle = Math.floor(clock.elapsedTime / 3) % 3;
    if (cycle === 0 && activeLight !== "green") setActiveLight("green");
    if (cycle === 1 && activeLight !== "yellow") setActiveLight("yellow");
    if (cycle === 2 && activeLight !== "red") setActiveLight("red");
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 3.0, 10]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Box */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      {/* Red light */}
      <mesh position={[0, 2.95, 0.16]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color={activeLight === "red" ? "#EF4444" : "#450A0A"}
          emissive={activeLight === "red" ? "#EF4444" : "#000000"}
          emissiveIntensity={activeLight === "red" ? 2.5 : 0}
        />
      </mesh>
      {/* Yellow/Orange light */}
      <mesh position={[0, 2.7, 0.16]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color={activeLight === "yellow" ? "#F59E0B" : "#451A03"}
          emissive={activeLight === "yellow" ? "#F59E0B" : "#000000"}
          emissiveIntensity={activeLight === "yellow" ? 2.5 : 0}
        />
      </mesh>
      {/* Green light */}
      <mesh position={[0, 2.45, 0.16]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color={activeLight === "green" ? "#10B981" : "#022C22"}
          emissive={activeLight === "green" ? "#10B981" : "#000000"}
          emissiveIntensity={activeLight === "green" ? 2.5 : 0}
        />
      </mesh>
    </group>
  );
}

// --- 3D Exam Sign Banner ---
function ExamRoadSign({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Two Posts */}
      <mesh position={[-1.4, 1.4, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#64748B" metalness={0.7} />
      </mesh>
      <mesh position={[1.4, 1.4, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#64748B" metalness={0.7} />
      </mesh>
      {/* Sign Board */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <boxGeometry args={[3.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#0B0F17" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Outer border in Moroccan Red */}
      <mesh position={[0, 2.4, 0.06]}>
        <boxGeometry args={[3.1, 0.82, 0.02]} />
        <meshStandardMaterial color="#C1272D" />
      </mesh>
      {/* Inner green accent */}
      <mesh position={[0, 2.4, 0.08]}>
        <boxGeometry args={[2.9, 0.68, 0.02]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

// --- Scene Setup with Mouse Camera Reactivity ---
function SceneContainer() {
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!cameraGroupRef.current) return;
    // Subtle reaction to mouse pointer on desktop
    cameraGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.y,
      pointer.x * 0.12,
      0.05
    );
    cameraGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.x,
      -pointer.y * 0.08,
      0.05
    );
  });

  return (
    <group ref={cameraGroupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 4, -2]} intensity={0.4} color="#F59E0B" />

      {/* Moroccan Distant Mountains */}
      <group position={[0, 1.5, -22]}>
        <mesh position={[-6, 0, 0]}>
          <coneGeometry args={[7, 4.5, 5]} />
          <meshStandardMaterial color="#9A3412" roughness={0.95} />
        </mesh>
        <mesh position={[3, 0, -2]}>
          <coneGeometry args={[9, 5.5, 5]} />
          <meshStandardMaterial color="#7C2D12" roughness={0.95} />
        </mesh>
        <mesh position={[10, 0, 0]}>
          <coneGeometry args={[6, 3.8, 5]} />
          <meshStandardMaterial color="#831843" roughness={0.95} />
        </mesh>
      </group>

      {/* Buildings Left Side */}
      <MoroccanBuilding position={[-4.5, 0, -4]} width={2.2} height={4.2} depth={3} color="#C2410C" />
      <MoroccanBuilding position={[-4.2, 0, 2]} width={2.4} height={3.2} depth={2.8} color="#D97706" />
      <MoroccanBuilding position={[-4.8, 0, 7]} width={2} height={2.8} depth={2.4} color="#B45309" />

      {/* Buildings Right Side */}
      <MoroccanBuilding position={[4.6, 0, -5]} width={2.4} height={3.6} depth={3} color="#D97706" />
      <MoroccanBuilding position={[4.8, 0, 3]} width={2.2} height={4.8} depth={2.6} color="#C2410C" />

      {/* Palm Trees */}
      <PalmTree position={[-2.8, 0, -1]} />
      <PalmTree position={[-2.8, 0, 5]} />
      <PalmTree position={[2.9, 0, -2]} />
      <PalmTree position={[3.0, 0, 6]} />

      {/* Moroccan Road (Asphalt) */}
      <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 30]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Sidewalks / Curbs (Red and White Moroccan curbs) */}
      {[-2.2, 2.2].map((x, i) => (
        <group key={i} position={[x, 0.08, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[0.6, 0.16, 30]} />
            <meshStandardMaterial color="#D1D5DB" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* White Road Markings (Dashes) */}
      {[-8, -5, -2, 1, 4, 7, 10].map((z, idx) => (
        <mesh key={idx} position={[0, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.18, 1.4]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
      ))}

      {/* Pedestrian Crossing (Zebra) */}
      {[-1.5, -0.9, -0.3, 0.3, 0.9, 1.5].map((x, idx) => (
        <mesh key={idx} position={[x, 0.016, -1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.42, 1.6]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* Traffic Light */}
      <TrafficLight position={[-2.4, 0, -2]} />

      {/* Road Sign (60 km/h) */}
      <group position={[2.6, 0, 1]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
          <meshStandardMaterial color="#64748B" metalness={0.7} />
        </mesh>
        {/* Disc */}
        <mesh position={[0, 2.2, 0]} rotation={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 24]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 2.2, 0.025]} rotation={[0, -0.2, 0]}>
          <ringGeometry args={[0.3, 0.39, 24]} />
          <meshBasicMaterial color="#C1272D" />
        </mesh>
      </group>

      {/* Overhead Exam Road Sign */}
      <ExamRoadSign position={[0, 0, -6.5]} />

      {/* Driving School Car */}
      <DrivingSchoolCar isMoving={true} />
    </group>
  );
}

export function HeroRoadScene() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[540px] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-slate-950 via-[#0B0F17] to-slate-900">
      <Canvas
        camera={{ position: [0, 2.8, 6.8], fov: 46 }}
        shadows
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <SceneContainer />
      </Canvas>

      {/* Interactive overlay indicator */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Scène 3D interactive • Bougez le curseur pour explorer</span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
          60 FPS • WebGL
        </span>
      </div>
    </div>
  );
}
