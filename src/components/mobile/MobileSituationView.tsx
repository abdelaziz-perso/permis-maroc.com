"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { PalmTree } from "@/components/three/PalmTree";
import { MoroccanBuilding } from "@/components/three/MoroccanBuilding";
import { RoadSign } from "@/components/three/RoadSign";
import { Lightbulb, CheckCircle2, XCircle, X } from "lucide-react";

// Animated Vehicle for 3D Intersection
function IntersectionCar({
  position,
  rotation,
  color,
  isMoving,
  moveVector,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label?: string;
  isMoving: boolean;
  moveVector: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const initialPos = useRef(new THREE.Vector3(...position));
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (isMoving) {
      progress.current = Math.min(progress.current + delta * 2, 4);
      groupRef.current.position.x =
        initialPos.current.x + moveVector[0] * progress.current;
      groupRef.current.position.z =
        initialPos.current.z + moveVector[2] * progress.current;
    } else {
      progress.current = 0;
      groupRef.current.position.copy(initialPos.current);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={0.65}>
      {/* Car Body */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.3, 0.42, 2.3]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.52, -0.1]}>
        <boxGeometry args={[1.1, 0.36, 1.2]} />
        <meshStandardMaterial color="#071A3D" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Label Badge */}
      <group position={[0, 0.82, -0.1]}>
        <mesh>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>
      {/* Wheels */}
      {[-0.6, 0.6].map((x, i) =>
        [-0.7, 0.7].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.1, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 10]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        ))
      )}
    </group>
  );
}

export function MobileSituationView() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const [selectedVehicle, setSelectedVehicle] = useState<"A" | "B" | null>(null);
  const [showExplanationSheet, setShowExplanationSheet] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Voiture A is correct (Voiture B has a Cédez-le-passage yield sign)
  const isCorrect = selectedVehicle === "A";

  const handleSelect = (vehicle: "A" | "B") => {
    setSelectedVehicle(vehicle);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* 1. 3D Canvas Scene (260px-300px height, compact mobile R3F) */}
      <div className="w-full h-64 sm:h-72 rounded-3xl overflow-hidden relative border border-[#E5ECF5] shadow-sm bg-gradient-to-b from-sky-100 to-slate-100">
        <Canvas
          camera={{ position: [5.2, 5.8, 6.2], fov: 36 }}
          dpr={[1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[6, 9, 5]} intensity={1.2} />

          <Suspense fallback={null}>
            <group position={[0, -0.2, 0]}>
              {/* Ground */}
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[14, 14]} />
                <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
              </mesh>

              {/* Crossroads Asphalt */}
              <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 2.8]} />
                <meshStandardMaterial color="#1E293B" />
              </mesh>
              <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
                <planeGeometry args={[12, 2.8]} />
                <meshStandardMaterial color="#1E293B" />
              </mesh>

              {/* Zebra crossing on left */}
              {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
                <mesh key={i} position={[-2.8, 0.025, z]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[0.5, 0.2]} />
                  <meshStandardMaterial color="#FFFFFF" />
                </mesh>
              ))}

              {/* Yield Sign for Blue Car B */}
              <RoadSign
                type="stop"
                position={[1.8, 0.03, 1.8]}
                rotation={[0, -Math.PI / 4, 0]}
              />

              {/* Yellow Car A (coming from the right, priority road) */}
              <IntersectionCar
                position={[2.8, 0.08, -0.6]}
                rotation={[0, -Math.PI / 2, 0]}
                color="#FBBF24"
                label="A"
                isMoving={isAnimating && isCorrect}
                moveVector={[-1.5, 0, 0]}
              />

              {/* Blue Car B (coming from bottom, facing Yield sign) */}
              <IntersectionCar
                position={[0.6, 0.08, 2.8]}
                rotation={[0, 0, 0]}
                color="#38BDF8"
                label="B"
                isMoving={isAnimating && !isCorrect}
                moveVector={[0, 0, -1.5]}
              />

              {/* Architecture & Palm Trees in corners */}
              <MoroccanBuilding
                type="modern-white"
                position={[-3.2, 0, -3.2]}
                scale={0.7}
              />
              <PalmTree position={[3.2, 0.03, -3.2]} scale={0.75} />
              <PalmTree position={[-3.2, 0.03, 3.2]} scale={0.75} />
            </group>
          </Suspense>
        </Canvas>

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#071A3D] shadow-sm">
            Situation 1 / 3
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#F20D2F] text-[11px] font-bold text-white shadow-sm">
            Intersection
          </span>
        </div>
      </div>

      {/* 2. Question Text */}
      <div className="pt-1">
        <h2 className="text-lg font-black text-[#071A3D]">
          {isArabic ? "شكون كيدوز الأول ؟" : "Qui passe en premier ?"}
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          {isArabic
            ? "اضغط على السيارة التي تعتقد أن لها الأسبقية."
            : "Touchez le véhicule de votre choix."}
        </p>
      </div>

      {/* 3. Two Large Selection Cards (Voiture A vs Voiture B) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Voiture A Card */}
        <button
          onClick={() => handleSelect("A")}
          className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
            selectedVehicle === "A"
              ? "bg-emerald-50 border-[#20C875] ring-2 ring-[#20C875] shadow-sm"
              : "bg-white border-[#E5ECF5] hover:border-slate-300"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-xl mb-2 shadow-inner">
            🚗
          </div>
          <span className="text-sm font-bold text-[#071A3D]">Voiture A</span>
          <span className="text-[11px] text-[#64748B]">Jaune</span>
          {selectedVehicle === "A" && (
            <span className="mt-2 text-xs font-bold text-[#20C875] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Bonne réponse
            </span>
          )}
        </button>

        {/* Voiture B Card */}
        <button
          onClick={() => handleSelect("B")}
          className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
            selectedVehicle === "B"
              ? "bg-red-50 border-[#F20D2F] ring-2 ring-[#F20D2F] shadow-sm"
              : "bg-white border-[#E5ECF5] hover:border-slate-300"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-xl mb-2 shadow-inner">
            🚙
          </div>
          <span className="text-sm font-bold text-[#071A3D]">Voiture B</span>
          <span className="text-[11px] text-[#64748B]">Bleue</span>
          {selectedVehicle === "B" && (
            <span className="mt-2 text-xs font-bold text-[#F20D2F] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Mauvaise réponse
            </span>
          )}
        </button>
      </div>

      {/* 4. "Voir la correction" Button (opens bottom sheet) */}
      <button
        onClick={() => setShowExplanationSheet(true)}
        className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5ECF5] text-[#071A3D] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
      >
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <span>{isArabic ? "شوف الشرح والتصحيح" : "Voir la correction"}</span>
      </button>

      {/* Bottom Sheet Modal: Explanation */}
      {showExplanationSheet && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowExplanationSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto rounded-t-3xl bg-white border-t border-[#E5ECF5] p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 pb-safe">
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-[#071A3D] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>{isArabic ? "علاش هاد الجواب ؟" : "Pourquoi cette règle ?"}</span>
              </h3>
              <button
                onClick={() => setShowExplanationSheet(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
              {isArabic
                ? "السيارة الصفراء A تمر أولاً لأن السيارة الزرقاء B أمامها علامة قف/ليس لكم حق الأسبقية. يجب على السيارة B التوقف التام وإعطاء الأسبقية للعربات القادمة من اليمين واليسار."
                : "La Voiture A (jaune) passe en premier car la Voiture B (bleue) rencontre un panneau d'arrêt / Cédez le passage. Elle a donc l'obligation absolue de marquer un temps d'arrêt et de céder le passage avant de s'engager."}
            </p>

            <button
              onClick={() => setShowExplanationSheet(false)}
              className="w-full py-3 px-4 rounded-2xl bg-[#F20D2F] text-white text-xs font-bold shadow-md shadow-red-500/20 active:scale-98"
            >
              {isArabic ? "فهمت القاعدة" : "J'ai compris"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
