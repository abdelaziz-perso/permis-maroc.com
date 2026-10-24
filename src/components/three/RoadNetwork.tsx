"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

// --- Orange & White Traffic Cone ---
export function TrafficCone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.26, 0.06, 0.26]} />
        <meshStandardMaterial color="#EA580C" roughness={0.6} />
      </mesh>
      {/* Cone Body */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <coneGeometry args={[0.11, 0.5, 12]} />
        <meshStandardMaterial color="#EA580C" roughness={0.5} />
      </mesh>
      {/* Reflective White Ring 1 */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.07, 0.082, 0.08, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      {/* Reflective White Ring 2 */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.06, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
    </group>
  );
}

// --- Modern Curved Street Lamp ---
export function StreetLamp({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base post */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 2.5, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Horizontal curved arm */}
      <mesh position={[0.25, 2.45, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.03, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[0.5, 2.3, 0]} castShadow>
        <boxGeometry args={[0.22, 0.06, 0.12]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Light Diffuser */}
      <mesh position={[0.5, 2.26, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.08]} />
        <meshStandardMaterial
          color="#FEF08A"
          emissive="#FEF08A"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
      {/* Soft local point light */}
      <pointLight
        position={[0.5, 2.1, 0]}
        color="#FEF3C7"
        intensity={0.6}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}

// --- Stylized Low-Poly Atlas Mountain ---
export function AtlasMountains() {
  return (
    <group position={[0, 0, -11]}>
      {/* Main majestic peak */}
      <mesh position={[-3, 2.4, -2]} castShadow={false}>
        <coneGeometry args={[4.8, 5.5, 5]} />
        <meshStandardMaterial color="#78350F" roughness={0.9} flatShading />
      </mesh>
      {/* Snow cap */}
      <mesh position={[-3, 4.4, -2]}>
        <coneGeometry args={[1.6, 1.8, 5]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.8} flatShading />
      </mesh>

      {/* Middle peak */}
      <mesh position={[2.5, 2.0, -3]} castShadow={false}>
        <coneGeometry args={[4.2, 4.5, 5]} />
        <meshStandardMaterial color="#854D0E" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[2.5, 3.6, -3]}>
        <coneGeometry args={[1.3, 1.4, 5]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.8} flatShading />
      </mesh>

      {/* Right peak */}
      <mesh position={[7.5, 1.7, -4]} castShadow={false}>
        <coneGeometry args={[3.8, 3.8, 5]} />
        <meshStandardMaterial color="#9A3412" roughness={0.95} flatShading />
      </mesh>

      {/* Distant rolling ridge */}
      <mesh position={[-8, 1.2, -3]} castShadow={false}>
        <coneGeometry args={[4.0, 3.0, 4]} />
        <meshStandardMaterial color="#92400E" roughness={0.95} flatShading />
      </mesh>
    </group>
  );
}

// --- Road Markings: Directional Arrow ---
function RoadArrow({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, rotation]}>
      {/* Arrow stem */}
      <mesh position={[0, -0.3, 0]}>
        <planeGeometry args={[0.1, 0.45]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      {/* Arrow head */}
      <mesh position={[0, 0.05, 0]}>
        <coneGeometry args={[0.2, 0.35, 3]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
    </group>
  );
}

// --- "START" Asphalt Marking Texture ---
function StartMarking({ position }: { position: [number, number, number] }) {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 256, 128);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 44px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "6px";
      ctx.fillText("START", 128, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  if (!texture) return null;

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <planeGeometry args={[1.6, 0.8]} />
      <meshBasicMaterial map={texture} transparent opacity={0.88} />
    </mesh>
  );
}

export function RoadNetwork() {
  return (
    <group position={[0, 0, 0]}>
      {/* Diorama Base Platform with soft beveled curb */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <boxGeometry args={[22, 0.4, 18]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
      </mesh>

      {/* Main Ground / Green Verges */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[21.8, 17.8]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.95} />
      </mesh>

      {/* Lawn / Grass Plots */}
      {/* Top Left Lawn */}
      <mesh position={[-5.8, 0.01, -4.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.2, 5.0]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.8} />
      </mesh>
      {/* Bottom Left Lawn */}
      <mesh position={[-5.8, 0.01, 4.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.2, 5.0]} />
        <meshStandardMaterial color="#4ADE80" roughness={0.8} />
      </mesh>
      {/* East Lawn (beside approach road) */}
      <mesh position={[5.5, 0.01, -4.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.5, 5.0]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.8} />
      </mesh>
      <mesh position={[5.5, 0.01, 4.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.5, 4.5]} />
        <meshStandardMaterial color="#4ADE80" roughness={0.8} />
      </mesh>

      {/* ================= ROADS ================= */}
      {/* East-West Main Thoroughfare */}
      <mesh position={[0, 0.02, 0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20.5, 3.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* North Boulevard */}
      <mesh position={[-0.8, 0.02, -5.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 7.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* South Road */}
      <mesh position={[-0.8, 0.02, 5.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 7.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* ================= ROAD MARKINGS ================= */}
      {/* East Approach Dashed Line */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`east-dash-${i}`}
          position={[3.2 + i * 1.1, 0.025, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.55, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* West Road Dashed Line */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`west-dash-${i}`}
          position={[-4.5 - i * 1.1, 0.025, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.55, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* North Road Dashed Line */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`north-dash-${i}`}
          position={[-0.8, 0.025, -2.8 - i * 1.0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <planeGeometry args={[0.5, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* South Road Dashed Line */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`south-dash-${i}`}
          position={[-0.8, 0.025, 2.8 + i * 1.0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <planeGeometry args={[0.5, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* ================= PEDESTRIAN CROSSING (ZEBRA) ================= */}
      {/* West Road Pedestrian Crossing */}
      <group position={[-6.2, 0.026, 0.1]}>
        {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((z, idx) => (
          <mesh key={idx} position={[0, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.7, 0.24]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* North Road Pedestrian Crossing */}
      <group position={[-0.8, 0.026, -6.2]}>
        {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[0.7, 0.24]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ================= "START" MARKING ================= */}
      <StartMarking position={[7.8, 0.028, 0.85]} />

      {/* Directional Arrows painted on asphalt */}
      <RoadArrow position={[5.8, 0.027, 0.85]} rotation={-Math.PI / 2} />
      <RoadArrow position={[-4.0, 0.027, -0.65]} rotation={-Math.PI / 2} />
      <RoadArrow position={[-1.55, 0.027, -4.2]} rotation={0} />

      {/* Solid Give-Way Stop Bars near Roundabout */}
      {/* East entry yield line (dashed teeth) */}
      {[-0.6, -0.2, 0.2, 0.6].map((z, i) => (
        <mesh
          key={`yield-east-${i}`}
          position={[2.45, 0.027, 0.85 + z * 0.7]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.15, 0.35]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* ================= PARKING AREA ================= */}
      <group position={[5.6, 0.022, 2.8]}>
        {/* Parking bay asphalt */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[4.2, 2.4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Parking stalls lines */}
        {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
          <mesh
            key={`park-line-${i}`}
            position={[x, 0.005, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.08, 2.2]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        ))}
        {/* Back border line */}
        <mesh position={[0, 0.005, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 0.08]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
        {/* Parked Mini Sedan in Stall 1 */}
        <group position={[-1.2, 0.16, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.32, 0.9]} />
            <meshStandardMaterial color="#38BDF8" roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[0.1, 0.24, 0]} castShadow>
            <boxGeometry args={[0.9, 0.24, 0.8]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} />
          </mesh>
          {/* Windows */}
          <mesh position={[0.1, 0.24, 0]}>
            <boxGeometry args={[0.92, 0.2, 0.82]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ================= TRAFFIC CONES ================= */}
      {/* Placed along curve and training zone */}
      <TrafficCone position={[2.8, 0.03, 1.8]} />
      <TrafficCone position={[3.4, 0.03, 1.8]} />
      <TrafficCone position={[4.0, 0.03, 1.8]} />
      <TrafficCone position={[-3.2, 0.03, 1.9]} />
      <TrafficCone position={[-3.8, 0.03, 1.9]} />

      {/* ================= STREET LAMPS ================= */}
      <StreetLamp position={[-3.5, 0.03, -1.8]} rotation={[0, Math.PI / 2, 0]} />
      <StreetLamp position={[3.2, 0.03, -1.8]} rotation={[0, -Math.PI / 2, 0]} />
      <StreetLamp position={[-2.6, 0.03, 3.8]} rotation={[0, 0, 0]} />
      <StreetLamp position={[3.2, 0.03, 4.4]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Atlas Mountains background */}
      <AtlasMountains />
    </group>
  );
}
