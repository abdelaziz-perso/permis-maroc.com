"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { RoadNetwork } from "./RoadNetwork";
import { Roundabout } from "./Roundabout";
import { CarPath } from "./CarPath";
import { MoroccanBuilding } from "./MoroccanBuilding";
import { PalmTree } from "./PalmTree";
import { RoadSign } from "./RoadSign";
import { DirectionSign } from "./DirectionSign";
import { TrafficLight } from "./TrafficLight";
import { CameraRig } from "./CameraRig";
import { Pause, Play, Sparkles } from "lucide-react";

export function HeroRoadScene() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-[#0F172A] to-[#090D16]">
      {/* 3D Scene Controls & Interactive Overlay Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-xs text-slate-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-100">Diorama 3D</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 hidden sm:inline">Survolez les panneaux</span>
        </div>
      </div>

      {/* Pause / Play 3D Animation Toggle */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-850 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          title={isPaused ? "Reprendre l'animation" : "Mettre en pause"}
          aria-label={isPaused ? "Reprendre l'animation" : "Mettre en pause"}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4 text-slate-300" />}
        </button>
      </div>

      {/* Bottom info pill */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Scène interactive : Priorités au giratoire • Signaux lumineux • Signalisation marocaine</span>
        </div>
      </div>

      {/* WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [10.5, 11, 12.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Camera mouse parallax & scroll animation */}
        <CameraRig basePosition={[10.5, 11, 12.5]} targetLookAt={[0, 0.4, 0]} />

        {/* Ambient & Daylight Sun Lights */}
        <ambientLight intensity={0.72} color="#F8FAFC" />
        <directionalLight
          position={[12, 16, 8]}
          intensity={1.5}
          color="#FFFBEB"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0004}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
          shadow-camera-left={-13}
          shadow-camera-right={13}
          shadow-camera-top={13}
          shadow-camera-bottom={-13}
        />
        <hemisphereLight args={["#BAE6FD", "#FEF3C7", 0.4]} />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* Diorama base, road network, zebra crossings, parking stalls & mountains */}
            <RoadNetwork />

            {/* Central Roundabout Island with palm and signage */}
            <Roundabout />

            {/* Moroccan Learner Car moving on CatmullRom curve */}
            <CarPath isPaused={isPaused} />

            {/* Moroccan Architecture */}
            {/* Koutoubia / Hassan style Minaret */}
            <MoroccanBuilding
              type="minaret"
              position={[-7.4, 0, -5.8]}
              scale={1.05}
            />
            {/* Modern Coastal White Mediterranean Buildings */}
            <MoroccanBuilding
              type="modern-white"
              position={[-7.2, 0, 5.2]}
              scale={0.95}
              rotation={[0, Math.PI / 8, 0]}
            />
            <MoroccanBuilding
              type="apartment"
              position={[6.6, 0, -6.0]}
              scale={0.9}
              rotation={[0, -Math.PI / 10, 0]}
            />

            {/* Moroccan Palm Trees lining the sidewalks */}
            <PalmTree position={[-2.8, 0, -2.4]} scale={0.95} />
            <PalmTree position={[2.6, 0, -2.4]} scale={0.9} />
            <PalmTree position={[-2.8, 0, 2.6]} scale={0.95} />
            <PalmTree position={[5.8, 0, -1.8]} scale={1.05} />
            <PalmTree position={[-7.0, 0, 0.4]} scale={1.1} />

            {/* Moroccan Highway Overhead Direction Sign */}
            <DirectionSign position={[-0.8, 0, -4.6]} />

            {/* Interactive Moroccan Road Signs */}
            <RoadSign
              type="stop"
              position={[-2.4, 0, 1.8]}
              rotation={[0, -Math.PI / 6, 0]}
              tooltipText="Panneau STOP • Marquer un temps d'arrêt obligatoire à l'intersection"
            />
            <RoadSign
              type="speed-30"
              position={[4.6, 0, 2.0]}
              rotation={[0, -Math.PI / 2, 0]}
              tooltipText="Limitation de vitesse 30 km/h • Zone urbaine sécurisée"
            />
            <RoadSign
              type="parking"
              position={[3.4, 0, 3.8]}
              rotation={[0, -Math.PI / 4, 0]}
              tooltipText="Zone de stationnement réservée [P]"
            />

            {/* Functional Cycling Traffic Lights */}
            <TrafficLight position={[-2.4, 0, -1.8]} rotation={[0, Math.PI / 4, 0]} />
            <TrafficLight position={[2.6, 0, 1.9]} rotation={[0, -Math.PI * 0.75, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
