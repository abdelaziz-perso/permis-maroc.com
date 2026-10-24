"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Scenario3D } from "@/types/models";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from "lucide-react";

interface ScenarioProps {
  scenario: Scenario3D;
}

// --- Car Mesh with Animation State ---
function ScenarioCar({
  color,
  initialPos,
  rotation,
  isAnimating,
  priorityOrder,
  onSelect,
  isSelected,
  isCorrect,
}: {
  id?: string;
  name?: string;
  color: string;
  initialPos: [number, number, number];
  rotation: [number, number, number];
  isAnimating: boolean;
  priorityOrder: number;
  onSelect: () => void;
  isSelected: boolean;
  isCorrect: boolean | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (isAnimating) {
      // Delay animation based on priority order: 1st moves right away, 2nd moves after 1.5s, 3rd after 3s
      const delay = (priorityOrder - 1) * 1.4;
      progressRef.current += delta;

      if (progressRef.current > delay) {
        // Move car forward in its direction
        const speed = delta * 3.5;
        // Direction vector from rotation.y
        const dirX = Math.sin(rotation[1]);
        const dirZ = Math.cos(rotation[1]);
        groupRef.current.position.x -= dirX * speed;
        groupRef.current.position.z -= dirZ * speed;
      }
    } else {
      // Reset position
      progressRef.current = 0;
      groupRef.current.position.set(initialPos[0], initialPos[1], initialPos[2]);
    }
  });

  return (
    <group
      ref={groupRef}
      position={initialPos}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Car Body */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[1.3, 0.45, 2.4]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.4}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      {/* Roof / Cabin */}
      <mesh position={[0, 0.55, -0.1]} castShadow>
        <boxGeometry args={[1.1, 0.38, 1.3]} />
        <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} transparent opacity={0.8} />
      </mesh>
      {/* Headlights */}
      <mesh position={[0.42, 0.22, -1.22]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.42, 0.22, -1.22]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.68, 0.15, 0.7],
        [0.68, 0.15, 0.7],
        [-0.68, 0.15, -0.7],
        [0.68, 0.15, -0.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      ))}

      {/* Target Marker Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.2, 24]} />
        <meshBasicMaterial
          color={isSelected ? (isCorrect ? "#10B981" : "#EF4444") : hovered ? "#F59E0B" : "#FFFFFF"}
          transparent
          opacity={isSelected || hovered ? 0.9 : 0.2}
        />
      </mesh>
    </group>
  );
}

// --- Intersection 3D Scene ---
function IntersectionScene({
  scenario,
  selectedVehicleId,
  isAnimating,
  onSelectVehicle,
  isCorrect,
}: {
  scenario: Scenario3D;
  selectedVehicleId: string | null;
  isAnimating: boolean;
  onSelectVehicle: (id: string) => void;
  isCorrect: boolean | null;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 12, 6]} intensity={1.3} castShadow />

      {/* Ground Grass / Terrain */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#0F172A" roughness={0.9} />
      </mesh>

      {/* North-South Road */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.8, 20]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* East-West Road */}
      <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 3.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* Crossroad Junction Center Area */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 3.8]} />
        <meshStandardMaterial color="#243046" roughness={0.6} />
      </mesh>

      {/* Pedestrian Crossing Strips */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((offset, i) => (
        <group key={i}>
          {/* North */}
          <mesh position={[offset, 0.01, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 0.9]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* South */}
          <mesh position={[offset, 0.01, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 0.9]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* East */}
          <mesh position={[2.5, 0.01, offset]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[0.3, 0.9]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* West */}
          <mesh position={[-2.5, 0.01, offset]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[0.3, 0.9]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* Vehicles from structured data */}
      {scenario.vehicles.map((v) => (
        <ScenarioCar
          key={v.id}
          id={v.id}
          name={v.name}
          color={v.color}
          initialPos={v.position}
          rotation={v.rotation}
          isAnimating={isAnimating}
          priorityOrder={v.priorityOrder}
          onSelect={() => onSelectVehicle(v.id)}
          isSelected={selectedVehicleId === v.id}
          isCorrect={isCorrect}
        />
      ))}
    </>
  );
}

export function InteractiveScenario3D({ scenario }: ScenarioProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = selectedVehicleId
    ? selectedVehicleId === scenario.correctVehicleId
    : null;

  const handleSelect = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setShowExplanation(true);
    // Trigger animated traffic simulation
    setIsAnimating(true);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setSelectedVehicleId(null);
    setShowExplanation(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col lg:flex-row">
      {/* 3D Canvas Viewport */}
      <div className="w-full lg:w-3/5 h-[340px] sm:h-[420px] lg:h-[480px] relative bg-slate-900">
        <Canvas
          camera={{ position: [0, 11, 10], fov: 38 }}
          shadows
          gl={{ antialias: true }}
        >
          <IntersectionScene
            scenario={scenario}
            selectedVehicleId={selectedVehicleId}
            isAnimating={isAnimating}
            onSelectVehicle={handleSelect}
            isCorrect={isCorrect}
          />
        </Canvas>

        {/* Floating action hint */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-[#E2E8F0] text-xs text-[#071A3D] flex items-center gap-2 pointer-events-none shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>Cliquez directement sur une voiture pour tester</span>
        </div>

        {/* Reset button if animated */}
        {isAnimating && (
          <button
            onClick={handleReset}
            className="absolute bottom-3 right-3 px-3 py-2 rounded-lg bg-white/95 hover:bg-white text-[#071A3D] border border-[#E2E8F0] text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>Réinitialiser la scène</span>
          </button>
        )}
      </div>

      {/* Interactive Controls & Educational Feedback */}
      <div className="w-full lg:w-2/5 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E2E8F0] bg-white">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-[#F20D2F] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Situation 3D Réelle</span>
          </div>

          <h3 className="text-xl font-bold text-[#071A3D] mb-2">{scenario.title}</h3>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">{scenario.description}</p>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-5">
            <h4 className="text-sm font-semibold text-[#071A3D] mb-3">{scenario.question}</h4>

            {/* Answer Options */}
            <div className="space-y-2">
              {scenario.options.map((opt) => {
                const isSelected = selectedVehicleId === opt.vehicleId;
                const isThisCorrect = opt.vehicleId === scenario.correctVehicleId;

                let btnStyles =
                  "border-[#E2E8F0] bg-white text-[#071A3D] hover:border-slate-400 hover:bg-slate-50";
                if (isSelected) {
                  if (isThisCorrect) {
                    btnStyles = "border-emerald-500 bg-emerald-50 text-emerald-800";
                  } else {
                    btnStyles = "border-red-500 bg-red-50 text-red-800";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.vehicleId)}
                    className={`w-full text-left px-3.5 py-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyles}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span>
                        {isThisCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#F20D2F]" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Explanation Box */}
        {showExplanation && (
          <div
            className={`p-4 rounded-xl border transition-all ${
              isCorrect
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-800 text-sm">
                    Exact ! Excellente analyse.
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-[#F20D2F]" />
                  <span className="font-bold text-red-800 text-sm">
                    Attention, mauvaise décision !
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {scenario.explanation}
            </p>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                Règles officielles appliquées :
              </span>
              <ul className="text-[11px] text-slate-500 space-y-1 list-disc list-inside">
                {scenario.rulesApplied.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
