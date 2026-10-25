"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Scenario3D } from "@/types/models";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  afterDraw,
  createPalmTree,
  createRoadSign,
  detectSoftwareGl,
  setupStudioEnvironment,
} from "./sceneBuilders";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from "lucide-react";

interface ScenarioProps {
  scenario: Scenario3D;
}

const arabicOptionLabels: Record<string, string> = {
  "opt-red": "السيارة الحمراء (في الأسفل)",
  "opt-blue": "السيارة الزرقاء (على اليمين)",
  "opt-yellow": "السيارة الصفراء (في الأعلى)",
  "opt-wait": "السماح بالمرور للسيارة البيضاء المتواجدة داخل المدار",
  "opt-pass": "المرور أولاً بتطبيق قاعدة الأسبقية لليمين",
};

const arabicRulesMap: Record<string, string[]> = {
  "scenario-priority-right": [
    "الأسبقية لليمين في غياب أي تشوير طرقي (المادة 28 من القانون 52-05)",
    "السائق الذي يكون يمينه فارغاً يمر أولاً (السيارة الزرقاء)",
    "تمر باقي السيارات بالتتابع بمجرد خلو يمينها",
  ],
  "scenario-roundabout": [
    "علامة 'اسمح بالمرور' عند مدخل المدار الطرقي",
    "الأسبقية المطلقة للعربات المتواجدة داخل المدار (القادمة من اليسار)",
  ],
};

export function InteractiveScenario3D({ scenario }: ScenarioProps) {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const selectedVehicleIdRef = useRef<string | null>(null);
  const isAnimatingRef = useRef(false);

  const isCorrect = selectedVehicleId
    ? selectedVehicleId === scenario.correctVehicleId
    : null;

  const handleSelect = (vehicleId: string) => {
    selectedVehicleIdRef.current = vehicleId;
    isAnimatingRef.current = true;
    setSelectedVehicleId(vehicleId);
    setShowExplanation(true);
    setIsAnimating(true);
  };

  const handleReset = () => {
    selectedVehicleIdRef.current = null;
    isAnimatingRef.current = false;
    setIsAnimating(false);
    setSelectedVehicleId(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0F172A");

    const initW = container.clientWidth || 600;
    const initH = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(38, initW / initH, 0.1, 80);
    camera.position.set(0, 11, 10);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(initW, initH);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const envTexture = setupStudioEnvironment(renderer, scene);

    scene.add(new THREE.AmbientLight("#FFFFFF", 1.5));
    const dirLight = new THREE.DirectionalLight("#FFFBEB", 2.4);
    dirLight.position.set(8, 12, 6);
    dirLight.castShadow = !isSoftwareGl;
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight("#BAE6FD", "#FEF3C7", 0.9));

    // Ground & Crossroads
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(22, 22),
      new THREE.MeshStandardMaterial({ color: "#0F172A", roughness: 0.9 })
    );
    ground.position.set(0, -0.05, 0);
    ground.rotation.set(-Math.PI / 2, 0, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    const roadMat = new THREE.MeshStandardMaterial({
      color: "#1E293B",
      roughness: 0.7,
    });
    const nsRoad = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 20), roadMat);
    nsRoad.rotation.set(-Math.PI / 2, 0, 0);
    nsRoad.receiveShadow = true;
    scene.add(nsRoad);

    const ewRoad = new THREE.Mesh(new THREE.PlaneGeometry(20, 3.8), roadMat);
    ewRoad.position.set(0, 0.002, 0);
    ewRoad.rotation.set(-Math.PI / 2, 0, 0);
    ewRoad.receiveShadow = true;
    scene.add(ewRoad);

    const centerJunction = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 3.8),
      new THREE.MeshStandardMaterial({ color: "#243046", roughness: 0.6 })
    );
    centerJunction.position.set(0, 0.005, 0);
    centerJunction.rotation.set(-Math.PI / 2, 0, 0);
    scene.add(centerJunction);

    // Pedestrian Crossings
    const zebraMat = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    [-1.2, -0.6, 0, 0.6, 1.2].forEach((offset) => {
      const nStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.9),
        zebraMat
      );
      nStrip.position.set(offset, 0.01, 2.5);
      nStrip.rotation.set(-Math.PI / 2, 0, 0);
      scene.add(nStrip);

      const sStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.9),
        zebraMat
      );
      sStrip.position.set(offset, 0.01, -2.5);
      sStrip.rotation.set(-Math.PI / 2, 0, 0);
      scene.add(sStrip);

      const eStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.9),
        zebraMat
      );
      eStrip.position.set(2.5, 0.01, offset);
      eStrip.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      scene.add(eStrip);

      const wStrip = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.9),
        zebraMat
      );
      wStrip.position.set(-2.5, 0.01, offset);
      wStrip.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      scene.add(wStrip);
    });

    scene.add(createPalmTree([-4.2, 0, -4.2], 0.85));
    scene.add(createPalmTree([4.2, 0, -4.2], 0.85));
    scene.add(createPalmTree([-4.2, 0, 4.2], 0.85));
    scene.add(
      createRoadSign("stop", [2.4, 0, 2.4], [0, -Math.PI / 4, 0]).group
    );

    interface CarEntry {
      id: string;
      group: THREE.Group;
      initialPos: [number, number, number];
      rotation: [number, number, number];
      priorityOrder: number;
      bodyMat: THREE.MeshStandardMaterial;
      ringMat: THREE.MeshBasicMaterial;
      baseColor: string;
      progress: number;
    }

    const carEntries: CarEntry[] = [];
    const clickableGroups: THREE.Group[] = [];

    scenario.vehicles.forEach((v) => {
      const carGroup = new THREE.Group();
      carGroup.position.set(...v.position);
      carGroup.rotation.set(...v.rotation);
      carGroup.userData = { vehicleId: v.id };

      const bodyMat = new THREE.MeshStandardMaterial({
        color: v.color,
        roughness: 0.2,
        metalness: 0.4,
      });
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.45, 2.4),
        bodyMat
      );
      body.position.set(0, 0.22, 0);
      body.castShadow = true;
      carGroup.add(body);

      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.38, 1.3),
        new THREE.MeshStandardMaterial({
          color: "#0F172A",
          roughness: 0.1,
          metalness: 0.9,
          transparent: true,
          opacity: 0.85,
        })
      );
      cabin.position.set(0, 0.55, -0.1);
      cabin.castShadow = true;
      carGroup.add(cabin);

      const hlMat = new THREE.MeshStandardMaterial({
        color: "#FEF08A",
        emissive: "#FEF08A",
        emissiveIntensity: 1.5,
      });
      [-0.42, 0.42].forEach((x) => {
        const hl = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.1, 0.05),
          hlMat
        );
        hl.position.set(x, 0.22, -1.22);
        carGroup.add(hl);
      });

      const wheelMat = new THREE.MeshStandardMaterial({ color: "#1E293B" });
      [
        [-0.68, 0.15, 0.7],
        [0.68, 0.15, 0.7],
        [-0.68, 0.15, -0.7],
        [0.68, 0.15, -0.7],
      ].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 0.15, 12),
          wheelMat
        );
        w.position.set(wx, wy, wz);
        w.rotation.set(0, 0, Math.PI / 2);
        carGroup.add(w);
      });

      const ringMat = new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.0, 1.2, 24),
        ringMat
      );
      ring.position.set(0, 0.05, 0);
      ring.rotation.set(-Math.PI / 2, 0, 0);
      carGroup.add(ring);

      scene.add(carGroup);
      clickableGroups.push(carGroup);
      carEntries.push({
        id: v.id,
        group: carGroup,
        initialPos: v.position,
        rotation: v.rotation,
        priorityOrder: v.priorityOrder,
        bodyMat,
        ringMat,
        baseColor: v.color,
        progress: 0,
      });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredVehicleId: string | null = null;

    const getHitVehicleId = (e: PointerEvent): string | null => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableGroups, true);
      if (hits.length > 0) {
        let obj: THREE.Object3D | null = hits[0].object;
        while (obj && !obj.userData?.vehicleId) {
          obj = obj.parent;
        }
        return obj?.userData?.vehicleId || null;
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      hoveredVehicleId = getHitVehicleId(e);
      container.style.cursor = hoveredVehicleId ? "pointer" : "default";
    };

    const onPointerDown = (e: PointerEvent) => {
      const vid = getHitVehicleId(e);
      if (vid) {
        handleSelect(vid);
      }
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);

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
    let frameId = 0;
    let timerId = 0;
    let disposed = false;

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const selId = selectedVehicleIdRef.current;
      const anim = isAnimatingRef.current;

      for (const entry of carEntries) {
        const isSel = selId === entry.id;
        const isHov = hoveredVehicleId === entry.id;
        const isThisRight = entry.id === scenario.correctVehicleId;

        entry.bodyMat.emissive.set(isHov ? entry.baseColor : "#000000");
        entry.bodyMat.emissiveIntensity = isHov ? 0.3 : 0;

        if (isSel) {
          entry.ringMat.color.set(isThisRight ? "#10B981" : "#EF4444");
          entry.ringMat.opacity = 0.9;
        } else if (isHov) {
          entry.ringMat.color.set("#F59E0B");
          entry.ringMat.opacity = 0.9;
        } else {
          entry.ringMat.color.set("#FFFFFF");
          entry.ringMat.opacity = 0.25;
        }

        if (anim) {
          const delay = (entry.priorityOrder - 1) * 1.4;
          entry.progress += delta;
          if (entry.progress > delay && entry.progress < delay + 3.2) {
            const speed = delta * 3.5;
            const dirX = Math.sin(entry.rotation[1]);
            const dirZ = Math.cos(entry.rotation[1]);
            entry.group.position.x -= dirX * speed;
            entry.group.position.z -= dirZ * speed;
          }
        } else {
          entry.progress = 0;
          entry.group.position.set(...entry.initialPos);
        }
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
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      envTexture?.dispose();
      renderer.dispose();
    };
  }, [scenario]);

  const titleText =
    isArabic && scenario.titleAr ? scenario.titleAr : scenario.title;
  const descText =
    isArabic && scenario.descriptionAr
      ? scenario.descriptionAr
      : scenario.description;
  const questionText =
    isArabic && scenario.questionAr ? scenario.questionAr : scenario.question;
  const explanationText =
    isArabic && scenario.explanationAr
      ? scenario.explanationAr
      : scenario.explanation;
  const rulesList =
    isArabic && arabicRulesMap[scenario.id]
      ? arabicRulesMap[scenario.id]
      : scenario.rulesApplied;

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col lg:flex-row">
      {/* 3D Canvas Viewport */}
      <div className="w-full lg:w-3/5 h-[340px] sm:h-[420px] lg:h-[480px] relative bg-slate-900">
        <div ref={mountRef} className="w-full h-full" />

        {/* Action Hint */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-white/95 border border-[#E2E8F0] text-xs text-[#071A3D] flex items-center gap-2 pointer-events-none shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>
            {isArabic
              ? "اضغط مباشرة على السيارة لاختبار الأسبقية"
              : "Cliquez directement sur une voiture pour tester"}
          </span>
        </div>

        {/* Reset Button */}
        {isAnimating && (
          <button
            onClick={handleReset}
            className="absolute bottom-3 right-3 px-3 py-2 rounded-lg bg-white/95 hover:bg-white text-[#071A3D] border border-[#E2E8F0] text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {isArabic ? "إعادة تشغيل المشهد" : "Réinitialiser la scène"}
            </span>
          </button>
        )}
      </div>

      {/* Interactive Controls & Educational Feedback */}
      <div className="w-full lg:w-2/5 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-s border-[#E2E8F0] bg-white">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-[#F20D2F] text-xs font-semibold tracking-wide mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {isArabic ? "وضعية ثلاثية الأبعاد 3D" : "Situation 3D Réelle"}
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#071A3D] mb-2">{titleText}</h3>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            {descText}
          </p>

          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-5">
            <h4 className="text-sm font-semibold text-[#071A3D] mb-3">
              {questionText}
            </h4>

            {/* Answer Options */}
            <div className="space-y-2">
              {scenario.options.map((opt) => {
                const isSelected = selectedVehicleId === opt.vehicleId;
                const isThisCorrect =
                  opt.vehicleId === scenario.correctVehicleId;
                const labelText =
                  isArabic && arabicOptionLabels[opt.id]
                    ? arabicOptionLabels[opt.id]
                    : opt.label;

                let btnStyles =
                  "border-[#E2E8F0] bg-white text-[#071A3D] hover:border-slate-400 hover:bg-slate-50";
                if (isSelected) {
                  if (isThisCorrect) {
                    btnStyles =
                      "border-emerald-500 bg-emerald-50 text-emerald-800";
                  } else {
                    btnStyles = "border-red-500 bg-red-50 text-red-800";
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.vehicleId)}
                    className={`w-full text-start px-3.5 py-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyles}`}
                  >
                    <span>{labelText}</span>
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
                    {isArabic
                      ? "إجابة صحيحة! تحليل ممتاز."
                      : "Exact ! Excellente analyse."}
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-[#F20D2F]" />
                  <span className="font-bold text-red-800 text-sm">
                    {isArabic
                      ? "انتبه، قرار غير صحيح!"
                      : "Attention, mauvaise décision !"}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {explanationText}
            </p>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                {isArabic
                  ? "القواعد القانونية المطبقة :"
                  : "Règles officielles appliquées :"}
              </span>
              <ul className="text-[11px] text-slate-500 space-y-1 list-disc list-inside">
                {rulesList.map((rule, idx) => (
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
