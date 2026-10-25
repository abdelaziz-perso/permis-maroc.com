"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  afterDraw,
  createDirectionSign,
  createDrivingSchoolCar,
  createMoroccanBuilding,
  createMoroccanFlagPole,
  createPalmTree,
  createRoadSign,
  detectSoftwareGl,
  setupStudioEnvironment,
} from "@/components/three/sceneBuilders";
import { ArrowDown, Gauge, Compass, ShieldCheck } from "lucide-react";

export function ScrollTransitionRoadSign() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const sectionRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const manualStageRef = useRef<number | null>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [liveSpeed, setLiveSpeed] = useState(60);

  const stages = [
    {
      id: 0,
      title: isArabic ? "1. مراقبة التشوير الطرقي" : "1. Lecture des panneaux",
      desc: isArabic
        ? "انتبه لعلامات تحديد السرعة (60 كلم/س) ولوحات الاتجاهات قبل التقاطع."
        : "Repérez les limitations de vitesse et portiques de direction.",
      speed: 60,
    },
    {
      id: 1,
      title: isArabic
        ? "2. تشغيل مؤشر تغيير الاتجاه (الغمّاز)"
        : "2. Clignotant & Contrôle",
      desc: isArabic
        ? "راقب المرآة العاكسة وشغّل مؤشر اليسار قبل الشروع في التجاوز."
        : "Vérifiez vos rétroviseurs et activez le clignotant gauche.",
      speed: 75,
    },
    {
      id: 2,
      title: isArabic
        ? "3. التجاوز الآمن من اليسار"
        : "3. Dépassement sécurisé",
      desc: isArabic
        ? "تجاوز العربة البطيئة مع ترك مسافة أمان جانبية كافية."
        : "Dépassez par la voie de gauche en respectant les distances de sécurité.",
      speed: 90,
    },
    {
      id: 3,
      title: isArabic ? "4. الاستعداد للامتحان" : "4. Prêt pour l'examen",
      desc: isArabic
        ? "العودة للمسلك الأيمن والوقوف الإجباري عند علامة قف STOP."
        : "Rabattez-vous à droite et préparez-vous au test théorique.",
      speed: 40,
    },
  ];

  const handleStageSelect = (idx: number) => {
    manualStageRef.current = idx / 3;
    setActiveStage(idx);
    setLiveSpeed(stages[idx].speed);
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Compute progress 0 -> 1 as section traverses viewport
      const raw = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, raw));
      scrollProgressRef.current = clamped;
      manualStageRef.current = null;

      const stageIdx = Math.min(3, Math.floor(clamped * 4));
      setActiveStage(stageIdx);
      setLiveSpeed(Math.round(50 + Math.sin(clamped * Math.PI) * 40));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#071124", 0.025);

    const initW = Math.max(container.clientWidth || 800, 300);
    const initH = Math.max(container.clientHeight || 360, 260);

    const camera = new THREE.PerspectiveCamera(42, initW / initH, 0.1, 90);
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 0.8, -6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(initW, initH);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const envTexture = setupStudioEnvironment(renderer, scene);

    scene.add(new THREE.AmbientLight("#F8FAFC", 1.7));
    const keyLight = new THREE.DirectionalLight("#FFFBEB", 2.6);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);
    scene.add(new THREE.HemisphereLight("#BAE6FD", "#FDE68A", 1.1));

    const world = new THREE.Group();
    scene.add(world);

    // 3D Moroccan Dual-Lane Highway
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 60),
      new THREE.MeshStandardMaterial({ color: "#0B1528", roughness: 0.95 })
    );
    ground.rotation.set(-Math.PI / 2, 0, 0);
    ground.position.set(0, -0.02, -10);
    world.add(ground);

    const highway = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 56),
      new THREE.MeshStandardMaterial({ color: "#1E293B", roughness: 0.65 })
    );
    highway.rotation.set(-Math.PI / 2, 0, 0);
    highway.position.set(0, 0.01, -10);
    world.add(highway);

    // Red & White Moroccan Highway Shoulders
    const redCurbMat = new THREE.MeshStandardMaterial({ color: "#C1272D" });
    const whiteCurbMat = new THREE.MeshStandardMaterial({ color: "#F8FAFC" });
    const dashMat = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });

    for (let i = -22; i < 16; i += 2) {
      const isRed = Math.abs(i) % 4 === 0;
      const curbMat = isRed ? redCurbMat : whiteCurbMat;
      const leftCurb = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.08, 1.9),
        curbMat
      );
      leftCurb.position.set(-3.3, 0.04, i);
      world.add(leftCurb);

      const rightCurb = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.08, 1.9),
        curbMat
      );
      rightCurb.position.set(3.3, 0.04, i);
      world.add(rightCurb);

      const centerDash = new THREE.Mesh(
        new THREE.PlaneGeometry(0.14, 1.1),
        dashMat
      );
      centerDash.rotation.set(-Math.PI / 2, 0, 0);
      centerDash.position.set(0, 0.02, i);
      world.add(centerDash);
    }

    // Highway Scenery: Palms, Moroccan Flagpoles, Signs, and Architecture along Z
    [-18, -12, -6, 0, 6].forEach((z, idx) => {
      world.add(createPalmTree([-4.6, 0, z], 0.95));
      world.add(createPalmTree([4.6, 0, z - 2], 0.95));
      if (idx % 2 === 0) {
        world.add(
          createMoroccanBuilding(
            idx === 0 ? "minaret" : "modern-white",
            [idx % 4 === 0 ? -7.5 : 7.5, 0, z - 3],
            0.85
          )
        );
      }
    });

    const flagLeft = createMoroccanFlagPole([-4.2, 0, -3], 0.9);
    const flagRight = createMoroccanFlagPole([4.2, 0, -9], 0.9);
    world.add(flagLeft.group);
    world.add(flagRight.group);

    // Interactive Road Signs along the scroll highway
    const gantrySign = createDirectionSign([0, 0, -8.5]);
    gantrySign.group.scale.setScalar(1.35);
    world.add(gantrySign.group);

    const speedSign = createRoadSign("speed-30", [3.6, 0, 2.5]);
    const stopSign = createRoadSign("stop", [3.6, 0, -14.5]);
    const parkSign = createRoadSign("parking", [-3.6, 0, -5.5]);
    world.add(speedSign.group);
    world.add(stopSign.group);
    world.add(parkSign.group);

    // Lead Car (Right Lane)
    const leadCar = createDrivingSchoolCar(0.88, false);
    leadCar.group.position.set(1.45, 0.05, -3.5);
    leadCar.group.rotation.set(0, Math.PI, 0);
    world.add(leadCar.group);

    // Hero Learner Car (Performs Scroll-Driven Lane Change & Overtake!)
    const heroCar = createDrivingSchoolCar(0.95, true);
    heroCar.group.position.set(1.45, 0.05, 3.5);
    heroCar.group.rotation.set(0, Math.PI, 0);
    world.add(heroCar.group);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 10 && h > 10) {
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
    let smoothProgress = 0.2;

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const targetP =
        manualStageRef.current !== null
          ? manualStageRef.current
          : scrollProgressRef.current;

      smoothProgress = THREE.MathUtils.damp(
        smoothProgress,
        targetP,
        4.5,
        delta
      );

      // Animate waving flags
      flagLeft.update(elapsed);
      flagRight.update(elapsed);

      // Lead car steady cruise
      const leadZ = -1.5 - smoothProgress * 9.0 + Math.sin(elapsed * 1.5) * 0.25;
      leadCar.group.position.set(1.45, 0.05, leadZ);
      leadCar.update(delta, elapsed, 1.0, 0, "none");

      // Hero Learner Car Scroll-Driven Overtaking Maneuver:
      // p in [0, 0.25]: Right lane behind lead car
      // p in [0.25, 0.65]: Pulls into left lane (x: +1.45 -> -1.45) with left turn signal & overtakes!
      // p in [0.65, 1.0]: Merges back to right lane ahead of lead car!
      let targetLaneX = 1.45;
      let turnSig: "none" | "left" | "right" = "none";
      let steerAngle = 0;

      if (smoothProgress >= 0.2 && smoothProgress < 0.72) {
        targetLaneX = -1.45;
        turnSig = "left";
        steerAngle = smoothProgress < 0.45 ? 0.25 : 0;
      } else if (smoothProgress >= 0.72) {
        targetLaneX = 1.45;
        turnSig = "right";
        steerAngle = smoothProgress < 0.88 ? -0.25 : 0;
      }

      heroCar.group.position.x = THREE.MathUtils.damp(
        heroCar.group.position.x,
        targetLaneX,
        6,
        delta
      );
      const heroZ = 4.2 - smoothProgress * 16.5;
      heroCar.group.position.z = heroZ;
      heroCar.group.position.y = 0.05 + Math.sin(elapsed * 9) * 0.008;
      heroCar.group.rotation.y = Math.PI + steerAngle * 0.35;

      heroCar.update(delta, elapsed, 1.35, steerAngle, turnSig);

      // Scroll-Linked Camera Follow along the highway
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        heroCar.group.position.x * 0.45,
        4,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        2.7 - smoothProgress * 0.4,
        4,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        heroZ + 5.8,
        5,
        delta
      );
      camera.lookAt(
        heroCar.group.position.x * 0.3,
        0.75,
        heroZ - 5.5
      );

      // Subtle sign highlight bounce as car passes
      speedSign.group.rotation.y = Math.sin(elapsed * 2) * 0.12;
      stopSign.group.rotation.y = Math.cos(elapsed * 2) * 0.12;

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
    <section
      ref={sectionRef}
      className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-[#071124] via-[#0B1933] to-[#071124] border-y border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#F20D2F] mb-2">
              <Compass className="w-4 h-4" />
              <span>
                {isArabic
                  ? "تجربة السياقة التفاعلية عند التمرير (3D Scroll)"
                  : "Simulation 3D Réactive au Scroll"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t.hero.readyForExamBanner}
            </h2>
          </div>

          {/* Live Speedometer HUD */}
          <div className="flex items-center gap-4 self-start md:self-auto px-4 py-2 rounded-2xl bg-slate-900/90 border border-white/15 text-white">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400">
                  {isArabic ? "السرعة الحالية" : "Vitesse actuelle"}
                </span>
                <span className="text-base font-black tabular-nums text-emerald-400">
                  {liveSpeed} {isArabic ? "كلم/س" : "km/h"}
                </span>
              </div>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#F20D2F]" />
              <span>
                {isArabic ? "مناورة التجاوز القانوني" : "Manœuvre de dépassement"}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Highway Canvas Viewport */}
        <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#071124]">
          <div ref={mountRef} className="w-full h-full" />

          {/* Active Stage Explanation Overlay */}
          <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm z-10 p-3.5 rounded-2xl bg-slate-950/90 border border-white/15 text-white pointer-events-none">
            <div className="text-xs font-extrabold text-amber-400 mb-1">
              {stages[activeStage].title}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {stages[activeStage].desc}
            </p>
          </div>
        </div>

        {/* 4 Interactive Driving Maneuver Stage Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
          {stages.map((st, idx) => {
            const isAct = activeStage === idx;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`p-3 rounded-2xl border text-start transition-all cursor-pointer ${
                  isAct
                    ? "bg-[#C1272D] border-red-400 text-white shadow-lg shadow-red-600/25"
                    : "bg-slate-900/90 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="text-xs font-extrabold mb-1 truncate">
                  {st.title}
                </div>
                <div
                  className={`text-[11px] line-clamp-1 ${
                    isAct ? "text-red-100" : "text-slate-400"
                  }`}
                >
                  {st.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA to Quick Test */}
        <div className="mt-6 flex justify-center">
          <Link
            href="#quick-test"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#071A3D] text-xs sm:text-sm font-black transition-all shadow-lg"
          >
            <span>
              {isArabic
                ? "اختبر معلوماتك الآن في السؤال التفاعلي أسفله"
                : "Répondre à la question test ci-dessous"}
            </span>
            <ArrowDown className="w-4 h-4 text-[#F20D2F]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
