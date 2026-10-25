"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  afterDraw,
  createDirectionSign,
  createDrivingSchoolCar,
  createMoroccanBuilding,
  createMoroccanFlagPole,
  createPalmTree,
  createRoadNetwork,
  createRoadSign,
  createRoundabout,
  createTrafficLight,
  detectSoftwareGl,
  setupStudioEnvironment,
} from "./sceneBuilders";
import {
  Pause,
  Play,
  Eye,
  Car,
  Compass,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type CameraPreset = "overview" | "car" | "signs";
type TimeOfDay = "day" | "night";

export function HeroRoadScene() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("overview");
  const cameraPresetRef = useRef<CameraPreset>("overview");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const timeOfDayRef = useRef<TimeOfDay>("day");
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [webglActive, setWebglActive] = useState(false);
  const [scrollDepthPct, setScrollDepthPct] = useState(0);

  const signLabels = {
    direction: isArabic
      ? "لوحة الاتجاهات • الدار البيضاء • الرباط • مراكش"
      : "Panneau de Direction • Casablanca • Rabat • Marrakech",
    stop: isArabic
      ? "علامة قف (STOP) • الوقوف الإجباري عند خط التقاطع"
      : "Panneau STOP • Marquer un temps d'arrêt obligatoire",
    speed30: isArabic
      ? "تحديد السرعة في 30 كلم/س • منطقة حضرية آمنة"
      : "Limitation de vitesse 30 km/h • Zone urbaine sécurisée",
    parking: isArabic
      ? "موقف السيارات مسموح [P] • خاص بمدرسة السياقة"
      : "Zone de stationnement autorisée [P]",
  };

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    cameraPresetRef.current = cameraPreset;
  }, [cameraPreset]);

  useEffect(() => {
    timeOfDayRef.current = timeOfDay;
  }, [timeOfDay]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const scene = new THREE.Scene();
    const fogColor = new THREE.Color("#0B1528");
    scene.fog = new THREE.FogExp2(fogColor, 0.015);

    const rect = container.getBoundingClientRect();
    const initW = Math.max(rect.width || container.clientWidth || 640, 320);
    const initH = Math.max(rect.height || container.clientHeight || 480, 320);

    const basePosition: [number, number, number] = [9.5, 9.2, 11.2];
    const targetLookAt: [number, number, number] = [0, 0.35, 0.2];

    const camera = new THREE.PerspectiveCamera(38, initW / initH, 0.1, 120);
    camera.position.set(...basePosition);
    camera.lookAt(...targetLookAt);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
      });
    } catch {
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true });
      } catch {
        setWebglActive(false);
        return;
      }
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
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

    // Three-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight("#F8FAFC", 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("#FFFBEB", 2.8);
    dirLight.position.set(12, 18, 10);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 45;
    dirLight.shadow.camera.left = -14;
    dirLight.shadow.camera.right = 14;
    dirLight.shadow.camera.top = 14;
    dirLight.shadow.camera.bottom = -14;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight("#38BDF8", 1.1);
    rimLight.position.set(-10, 8, -10);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight("#BAE6FD", "#FDE68A", 1.15);
    scene.add(hemiLight);

    // Root Group
    const world = new THREE.Group();
    scene.add(world);

    world.add(createRoadNetwork());
    world.add(createRoundabout());

    // Official Waving 3D Moroccan Flag at the Roundabout Center
    const moroccanFlag = createMoroccanFlagPole([-0.45, 0.2, 0.45], 0.95);
    world.add(moroccanFlag.group);

    // Moroccan Architecture
    world.add(createMoroccanBuilding("minaret", [-7.4, 0, -5.8], 1.05));
    world.add(
      createMoroccanBuilding(
        "modern-white",
        [-7.2, 0, 5.2],
        0.95,
        [0, Math.PI / 8, 0]
      )
    );
    world.add(
      createMoroccanBuilding(
        "apartment",
        [6.6, 0, -6.0],
        0.9,
        [0, -Math.PI / 10, 0]
      )
    );

    // Palm Trees
    world.add(createPalmTree([-2.8, 0, -2.4], 0.95));
    world.add(createPalmTree([2.6, 0, -2.4], 0.9));
    world.add(createPalmTree([-2.8, 0, 2.6], 0.95));
    world.add(createPalmTree([5.8, 0, -1.8], 1.05));
    world.add(createPalmTree([-7.0, 0, 0.4], 1.1));

    // Interactive Signs
    const interactiveSigns: THREE.Group[] = [];
    const dirSign = createDirectionSign([-0.8, 0, -4.6]);
    dirSign.group.userData.label = signLabels.direction;
    world.add(dirSign.group);
    interactiveSigns.push(dirSign.group);

    const stopSign = createRoadSign(
      "stop",
      [-2.4, 0, 1.8],
      [0, -Math.PI / 6, 0],
      signLabels.stop
    );
    world.add(stopSign.group);
    interactiveSigns.push(stopSign.group);

    const speedSign = createRoadSign(
      "speed-30",
      [4.6, 0, 2.0],
      [0, -Math.PI / 2, 0],
      signLabels.speed30
    );
    world.add(speedSign.group);
    interactiveSigns.push(speedSign.group);

    const parkSign = createRoadSign(
      "parking",
      [3.4, 0, 3.8],
      [0, -Math.PI / 4, 0],
      signLabels.parking
    );
    world.add(parkSign.group);
    interactiveSigns.push(parkSign.group);

    // Traffic Lights
    const tl1 = createTrafficLight([-2.4, 0, -1.8], [0, Math.PI / 4, 0]);
    const tl2 = createTrafficLight([2.6, 0, 1.9], [0, -Math.PI * 0.75, 0]);
    world.add(tl1.group);
    world.add(tl2.group);

    // Learner Car & CatmullRom Curve Path
    const carInstance = createDrivingSchoolCar(0.95, true);
    const carWrapper = new THREE.Group();
    carWrapper.add(carInstance.group);
    world.add(carWrapper);

    const curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(7.2, 0.05, 0.85),
        new THREE.Vector3(4.8, 0.05, 0.85),
        new THREE.Vector3(2.6, 0.05, 0.82),
        new THREE.Vector3(1.4, 0.05, 0.35),
        new THREE.Vector3(0.0, 0.05, -1.95),
        new THREE.Vector3(-1.95, 0.05, -0.2),
        new THREE.Vector3(-1.4, 0.05, 1.4),
        new THREE.Vector3(-0.4, 0.05, 2.3),
        new THREE.Vector3(0.9, 0.05, 4.0),
        new THREE.Vector3(0.9, 0.05, 6.2),
        new THREE.Vector3(3.2, 0.05, 5.8),
        new THREE.Vector3(6.2, 0.05, 3.4),
      ],
      true,
      "centripetal",
      0.5
    );

    const currentCamPos = new THREE.Vector3(...basePosition);
    const currentLookTarget = new THREE.Vector3(...targetLookAt);
    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hoveredGroup: THREE.Group | null = null;
    let scrollFactor = 0;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVelocityBoost = 0;
    let progressU = 0.08;

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveSigns, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.isInteractiveSign) {
          obj = obj.parent;
        }
        if (obj && obj.userData?.isInteractiveSign) {
          hoveredGroup = obj as THREE.Group;
          setHoveredLabel(obj.userData.label || null);
          container.style.cursor = "pointer";
          return;
        }
      }
      hoveredGroup = null;
      setHoveredLabel(null);
      container.style.cursor = "grab";
    };

    const onPointerDown = (e: PointerEvent) => {
      onPointerMove(e);
    };

    const onScroll = () => {
      const sy = window.scrollY;
      const dy = Math.abs(sy - lastScrollY);
      lastScrollY = sy;
      // Scroll velocity boosts car speed and rotates signs!
      scrollVelocityBoost = Math.min(scrollVelocityBoost + dy * 0.003, 1.8);
      scrollFactor = Math.min(Math.max(sy / 550, 0), 1.0);
      setScrollDepthPct(Math.round(scrollFactor * 100));
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 10 && h > 10 && renderer) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    let timerId = 0;
    let disposed = false;
    let markedReady = false;

    const tick = () => {
      if (disposed || !renderer) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smoothly decay scroll velocity boost
      scrollVelocityBoost = THREE.MathUtils.damp(
        scrollVelocityBoost,
        0,
        4,
        delta
      );

      // Day vs Night lighting interpolation
      const isNight = timeOfDayRef.current === "night";
      ambientLight.intensity = THREE.MathUtils.damp(
        ambientLight.intensity,
        isNight ? 0.55 : 1.8,
        4,
        delta
      );
      dirLight.intensity = THREE.MathUtils.damp(
        dirLight.intensity,
        isNight ? 0.7 : 2.8,
        4,
        delta
      );
      hemiLight.intensity = THREE.MathUtils.damp(
        hemiLight.intensity,
        isNight ? 0.35 : 1.15,
        4,
        delta
      );

      // Animate waving 3D Moroccan Flag
      moroccanFlag.update(elapsed);

      if (!isPausedRef.current) {
        const u = progressU;
        let speedFactor = 1.0 + scrollVelocityBoost;
        if (u >= 0.12 && u <= 0.28) {
          speedFactor = 0.52 + scrollVelocityBoost * 0.5;
        } else if (u > 0.28 && u <= 0.6) {
          speedFactor = 0.88 + scrollVelocityBoost * 0.7;
        } else if (u > 0.6 && u <= 0.88) {
          speedFactor = 1.32 + scrollVelocityBoost;
        }

        const step = (delta * 0.075 * speedFactor) % 1;
        progressU = (progressU + step) % 1.0;

        const pos = curve.getPointAt(progressU);
        const tangent = curve.getTangentAt(progressU).normalize();
        const futureTangent = curve
          .getTangentAt((progressU + 0.02) % 1.0)
          .normalize();

        const angle = Math.atan2(tangent.x, tangent.z);
        const steer = THREE.MathUtils.clamp(
          (Math.atan2(futureTangent.x, futureTangent.z) - angle) * 4,
          -0.45,
          0.45
        );
        const turnSignal: "none" | "left" | "right" =
          progressU >= 0.48 && progressU <= 0.74 ? "right" : "none";

        carWrapper.position.set(
          pos.x,
          pos.y + Math.sin(elapsed * 8) * 0.008,
          pos.z
        );
        carWrapper.rotation.y = angle;

        carInstance.update(delta, elapsed, speedFactor, steer, turnSignal);

        tl1.update(elapsed);
        tl2.update(elapsed);
      }

      for (const signGrp of interactiveSigns) {
        const targetS =
          signGrp === hoveredGroup
            ? 1.2
            : 1.0 + Math.min(scrollVelocityBoost * 0.08, 0.12);
        const nextS = THREE.MathUtils.damp(
          signGrp.scale.x,
          targetS,
          8,
          delta
        );
        signGrp.scale.setScalar(nextS);
      }

      // Scroll-Driven + Preset Camera Choreography
      const preset = cameraPresetRef.current;
      const scrollAngle = scrollFactor * 0.85;
      let goalCamX =
        Math.cos(scrollAngle) * basePosition[0] +
        pointer.x * 1.1 -
        scrollFactor * 2.6;
      let goalCamY =
        basePosition[1] - pointer.y * 0.7 - scrollFactor * 3.8;
      let goalCamZ =
        Math.sin(scrollAngle) * 3.0 +
        basePosition[2] +
        pointer.x * 0.7 -
        scrollFactor * 3.4;
      let goalLookX = targetLookAt[0] + pointer.x * 0.3;
      let goalLookY = targetLookAt[1] + scrollFactor * 0.3;
      let goalLookZ = targetLookAt[2] + pointer.y * 0.3;

      if (preset === "car") {
        goalCamX = carWrapper.position.x + 4.5;
        goalCamY = 3.8;
        goalCamZ = carWrapper.position.z + 4.8;
        goalLookX = carWrapper.position.x;
        goalLookY = 0.5;
        goalLookZ = carWrapper.position.z;
      } else if (preset === "signs") {
        goalCamX = 4.2;
        goalCamY = 3.8;
        goalCamZ = 6.5;
        goalLookX = 0.5;
        goalLookY = 1.1;
        goalLookZ = 1.8;
      }

      currentCamPos.x = THREE.MathUtils.damp(
        currentCamPos.x,
        goalCamX,
        4,
        delta
      );
      currentCamPos.y = THREE.MathUtils.damp(
        currentCamPos.y,
        goalCamY,
        4,
        delta
      );
      currentCamPos.z = THREE.MathUtils.damp(
        currentCamPos.z,
        goalCamZ,
        4,
        delta
      );
      camera.position.copy(currentCamPos);

      currentLookTarget.x = THREE.MathUtils.damp(
        currentLookTarget.x,
        goalLookX,
        5,
        delta
      );
      currentLookTarget.y = THREE.MathUtils.damp(
        currentLookTarget.y,
        goalLookY,
        5,
        delta
      );
      currentLookTarget.z = THREE.MathUtils.damp(
        currentLookTarget.z,
        goalLookZ,
        5,
        delta
      );
      camera.lookAt(currentLookTarget);

      // Gentle world rotation with scroll for 3D depth
      world.rotation.y = THREE.MathUtils.damp(
        world.rotation.y,
        scrollFactor * 0.35,
        4,
        delta
      );

      renderer.render(scene, camera);

      if (!markedReady) {
        markedReady = true;
        setWebglActive(true);
      }

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
      window.removeEventListener("scroll", onScroll);
      envTexture?.dispose();
      renderer?.dispose();
    };
  }, [
    signLabels.direction,
    signLabels.parking,
    signLabels.speed30,
    signLabels.stop,
  ]);

  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[490px] lg:min-h-[560px] relative rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-gradient-to-b from-[#0B1933] via-[#0F172A] to-[#090D16] select-none">
      {/* Interactive Animated Vector Backdrop / Fallback */}
      <div
        className={`absolute inset-0 z-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${
          webglActive ? "opacity-20 pointer-events-none" : "opacity-100"
        }`}
      >
        <svg
          viewBox="0 0 600 460"
          className="w-full h-full max-w-[560px]"
          aria-label="محاكاة المدار الطرقي المغربي"
        >
          <defs>
            <radialGradient id="roudaboutGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="300" cy="230" r="220" fill="url(#roudaboutGlow)" />
          <rect x="235" y="0" width="130" height="460" fill="#1E293B" />
          <rect x="0" y="165" width="600" height="130" fill="#1E293B" />

          <circle
            cx="300"
            cy="230"
            r="122"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="4"
          />
          <circle
            cx="300"
            cy="230"
            r="92"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeOpacity="0.5"
          />

          <circle
            cx="300"
            cy="230"
            r="58"
            fill="#065F46"
            stroke="#EF4444"
            strokeWidth="8"
            strokeDasharray="14 14"
          />
          <circle
            cx="300"
            cy="230"
            r="58"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeDasharray="14 14"
            strokeDashoffset="14"
          />

          {/* Center Roundabout Island */}
          <circle
            cx="300"
            cy="230"
            r="38"
            fill="#065F46"
            stroke="#10B981"
            strokeWidth="2"
          />
          <circle
            cx="300"
            cy="230"
            r="16"
            fill="#047857"
            stroke="#A7F3D0"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* Dedicated WebGL Mount Container */}
      <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* Minimal Top-Left Spec Badge (No backdrop-blur over WebGL, no pulsing dots) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-white/15 text-xs text-slate-100 shadow-lg">
          <span className="font-bold text-white">
            {isArabic ? "محاكاة ثلاثية الأبعاد 3D" : "Diorama 3D Interactif"}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300 hidden sm:inline">
            {scrollDepthPct > 5
              ? isArabic
                ? `تفاعل التمرير ${scrollDepthPct}%`
                : `Zoom au scroll ${scrollDepthPct}%`
              : isArabic
              ? "مرر لأسفل أو المس العلامات"
              : "Scrollez ou survolez les panneaux"}
          </span>
        </div>
      </div>

      {/* Hovered Sign Tooltip */}
      {hoveredLabel && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-max max-w-[92%]">
          <div className="px-4 py-2 rounded-xl bg-slate-950/95 text-white border border-[#C1272D]/70 text-xs font-bold shadow-2xl flex items-center gap-2">
            <span className="text-[#C1272D] font-black">●</span>
            <span className="truncate">{hoveredLabel}</span>
          </div>
        </div>
      )}

      {/* Unified Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[540px] flex flex-col items-center pointer-events-auto">
        <button
          type="button"
          onClick={() => setDockCollapsed(!dockCollapsed)}
          aria-expanded={!dockCollapsed}
          aria-label={dockCollapsed ? (isArabic ? "إظهار التحكم 3D" : "Afficher contrôles 3D") : (isArabic ? "إخفاء" : "Masquer")}
          className="px-3 py-1.5 min-h-8 rounded-t-xl bg-slate-950/90 border border-b-0 border-white/15 text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{isArabic ? "إظهار التحكم 3D" : "Afficher contrôles 3D"}</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>{isArabic ? "إخفاء" : "Masquer"}</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="w-full p-2 rounded-2xl bg-slate-950/92 border border-white/15 shadow-2xl flex flex-wrap items-center justify-between gap-1.5">
            {/* Camera View Pills */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCameraPreset("overview")}
                aria-pressed={cameraPreset === "overview"}
                className={`px-3 py-2 min-h-9 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  cameraPreset === "overview"
                    ? "bg-[#E30D2B] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isArabic ? "نظرة عامة" : "Global"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCameraPreset("car");
                  setHoveredLabel(signLabels.direction);
                }}
                aria-pressed={cameraPreset === "car"}
                className={`px-3 py-2 min-h-9 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  cameraPreset === "car"
                    ? "bg-[#E30D2B] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>{isArabic ? "تتبع السيارة" : "Voiture"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCameraPreset("signs");
                  setHoveredLabel(signLabels.stop);
                }}
                aria-pressed={cameraPreset === "signs"}
                className={`px-3 py-2 min-h-9 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  cameraPreset === "signs"
                    ? "bg-[#E30D2B] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isArabic ? "العلامات" : "Panneaux"}</span>
              </button>
            </div>

            {/* Day / Night & Pause Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setTimeOfDay(timeOfDay === "day" ? "night" : "day")
                }
                className="px-3 py-2 min-h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                title={isArabic ? "تبديل النهار / الليل" : "Mode Jour / Nuit"}
                aria-pressed={timeOfDay === "day"}
              >
                {timeOfDay === "day" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isArabic ? "نهار" : "Jour"}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isArabic ? "سياقة ليلية" : "Nuit"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                ) : (
                  <Pause className="w-4 h-4 text-slate-200" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
