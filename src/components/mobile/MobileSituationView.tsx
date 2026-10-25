"use client";

import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  afterDraw,
  createMoroccanBuilding,
  createPalmTree,
  createRoadSign,
  detectSoftwareGl,
  setupStudioEnvironment,
} from "@/components/three/sceneBuilders";
import { Lightbulb, CheckCircle2, XCircle, X } from "lucide-react";

function createIntersectionCar(
  position: [number, number, number],
  rotation: [number, number, number],
  color: string
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.set(...rotation);
  group.scale.setScalar(0.65);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.42, 2.3),
    new THREE.MeshStandardMaterial({ color, roughness: 0.3 })
  );
  body.position.set(0, 0.22, 0);
  group.add(body);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.36, 1.2),
    new THREE.MeshStandardMaterial({
      color: "#071A3D",
      roughness: 0.2,
      metalness: 0.7,
    })
  );
  cabin.position.set(0, 0.52, -0.1);
  group.add(cabin);

  const badge = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.2, 0.4),
    new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
  );
  badge.position.set(0, 0.82, -0.1);
  group.add(badge);

  const wheelMat = new THREE.MeshStandardMaterial({ color: "#1E293B" });
  [-0.6, 0.6].forEach((x) => {
    [-0.7, 0.7].forEach((z) => {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.12, 10),
        wheelMat
      );
      w.position.set(x, 0.1, z);
      w.rotation.set(0, 0, Math.PI / 2);
      group.add(w);
    });
  });

  return group;
}

export function MobileSituationView() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<"A" | "B" | null>(
    null
  );
  const [showExplanationSheet, setShowExplanationSheet] = useState(false);

  const selectedVehicleRef = useRef<"A" | "B" | null>(null);
  const isAnimatingRef = useRef(false);

  const handleSelect = (vehicle: "A" | "B") => {
    selectedVehicleRef.current = vehicle;
    isAnimatingRef.current = true;
    setSelectedVehicle(vehicle);
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 2500);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const scene = new THREE.Scene();
    const initW = container.clientWidth || 360;
    const initH = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(36, initW / initH, 0.1, 60);
    camera.position.set(5.2, 5.8, 6.2);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
    );
    renderer.setSize(initW, initH);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const envTexture = setupStudioEnvironment(renderer, scene);

    scene.add(new THREE.AmbientLight("#FFFFFF", 0.85));
    const dirLight = new THREE.DirectionalLight("#FFFBEB", 1.25);
    dirLight.position.set(6, 9, 5);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight("#BAE6FD", "#FEF3C7", 0.35));

    const world = new THREE.Group();
    world.position.set(0, -0.2, 0);
    scene.add(world);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshStandardMaterial({ color: "#E2E8F0", roughness: 0.9 })
    );
    ground.rotation.set(-Math.PI / 2, 0, 0);
    world.add(ground);

    const roadMat = new THREE.MeshStandardMaterial({ color: "#1E293B" });
    const ewRoad = new THREE.Mesh(new THREE.PlaneGeometry(12, 2.8), roadMat);
    ewRoad.position.set(0, 0.02, 0);
    ewRoad.rotation.set(-Math.PI / 2, 0, 0);
    world.add(ewRoad);

    const nsRoad = new THREE.Mesh(new THREE.PlaneGeometry(12, 2.8), roadMat);
    nsRoad.position.set(0, 0.02, 0);
    nsRoad.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    world.add(nsRoad);

    const zebraMat = new THREE.MeshStandardMaterial({ color: "#FFFFFF" });
    [-0.8, -0.4, 0, 0.4, 0.8].forEach((z) => {
      const strip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.2),
        zebraMat
      );
      strip.position.set(-2.8, 0.025, z);
      strip.rotation.set(-Math.PI / 2, 0, 0);
      world.add(strip);
    });

    world.add(
      createRoadSign("stop", [1.8, 0.03, 1.8], [0, -Math.PI / 4, 0]).group
    );

    const carA = createIntersectionCar(
      [2.8, 0.08, -0.6],
      [0, -Math.PI / 2, 0],
      "#FBBF24"
    );
    const carB = createIntersectionCar([0.6, 0.08, 2.8], [0, 0, 0], "#38BDF8");
    world.add(carA);
    world.add(carB);

    world.add(createMoroccanBuilding("modern-white", [-3.2, 0, -3.2], 0.7));
    world.add(createPalmTree([3.2, 0.03, -3.2], 0.75));
    world.add(createPalmTree([-3.2, 0.03, 3.2], 0.75));

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let progressA = 0;
    let progressB = 0;
    let frameId = 0;
    let timerId = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const anim = isAnimatingRef.current;
      const sel = selectedVehicleRef.current;

      if (anim && sel === "A") {
        progressA = Math.min(progressA + delta * 2, 4);
        carA.position.x = 2.8 - 1.5 * progressA;
      } else {
        progressA = 0;
        carA.position.set(2.8, 0.08, -0.6);
      }

      if (anim && sel === "B") {
        progressB = Math.min(progressB + delta * 2, 4);
        carB.position.z = 2.8 - 1.5 * progressB;
      } else {
        progressB = 0;
        carB.position.set(0.6, 0.08, 2.8);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        timerId = afterDraw(renderer, tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
      resizeObserver.disconnect();
      envTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. 3D Canvas Scene */}
      <div className="w-full h-64 sm:h-72 rounded-3xl overflow-hidden relative border border-[#E5ECF5] shadow-sm bg-gradient-to-b from-sky-100 to-slate-100">
        <div ref={mountRef} className="w-full h-full" />

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[#071A3D] shadow-sm">
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
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setShowExplanationSheet(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto rounded-t-3xl bg-white border-t border-[#E5ECF5] p-6 shadow-2xl animate-in slide-in-from-bottom duration-250 pb-safe">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black text-[#071A3D] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>
                  {isArabic ? "علاش هاد الجواب ؟" : "Pourquoi cette règle ?"}
                </span>
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
