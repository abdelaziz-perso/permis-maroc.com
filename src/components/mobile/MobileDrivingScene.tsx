"use client";

import React, { useRef, useEffect, useState } from "react";
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
import { Sun, Moon, Eye } from "lucide-react";

export function MobileDrivingScene() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const mountRef = useRef<HTMLDivElement>(null);
  const [isNight, setIsNight] = useState(false);
  const isNightRef = useRef(false);
  const [cameraClose, setCameraClose] = useState(false);
  const cameraCloseRef = useRef(false);

  useEffect(() => {
    isNightRef.current = isNight;
  }, [isNight]);

  useEffect(() => {
    cameraCloseRef.current = cameraClose;
  }, [cameraClose]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const scene = new THREE.Scene();
    const initW = container.clientWidth || 360;
    const initH = container.clientHeight || 210;

    const camera = new THREE.PerspectiveCamera(36, initW / initH, 0.1, 60);
    camera.position.set(5.0, 3.6, 6.0);
    camera.lookAt(0, 0.25, 0);

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
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.75)
    );
    renderer.setSize(initW, initH);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const envTexture = setupStudioEnvironment(renderer, scene);

    const ambLight = new THREE.AmbientLight("#FFFFFF", 1.7);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight("#FFFBEB", 2.5);
    dirLight.position.set(6, 9, 5);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight("#BAE6FD", "#FEF3C7", 0.9));

    const world = new THREE.Group();
    world.position.set(0, -0.4, 0);
    scene.add(world);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 14),
      new THREE.MeshStandardMaterial({ color: "#CBD5E1", roughness: 0.9 })
    );
    ground.rotation.set(-Math.PI / 2, 0, 0);
    world.add(ground);

    // Asphalt Boulevard
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 2.8),
      new THREE.MeshStandardMaterial({ color: "#1E293B", roughness: 0.7 })
    );
    road.position.set(0, 0.02, 0.6);
    road.rotation.set(-Math.PI / 2, 0, 0);
    world.add(road);

    // Dashed lines
    const dashMat = new THREE.MeshStandardMaterial({ color: "#FFFFFF" });
    [-3, -1.5, 0, 1.5, 3].forEach((x) => {
      const dash = new THREE.Mesh(
        new THREE.PlaneGeometry(0.55, 0.09),
        dashMat
      );
      dash.position.set(x, 0.025, 0.6);
      dash.rotation.set(-Math.PI / 2, 0, 0);
      world.add(dash);
    });

    // Learner car
    const car = createDrivingSchoolCar(0.78, true);
    car.group.position.set(0.4, 0.05, 0.4);
    car.group.rotation.set(0, -Math.PI / 7, 0);
    world.add(car.group);

    // Waving 3D Official Moroccan Flag
    const flag = createMoroccanFlagPole([0.5, 0.02, -1.3], 0.72);
    world.add(flag.group);

    // Direction Sign
    world.add(
      createDirectionSign([-1.6, 0.03, -0.9], [0, Math.PI / 6, 0]).group
    );

    // STOP Sign
    const stopSign = createRoadSign(
      "stop",
      [1.8, 0.03, 0.2],
      [0, -Math.PI / 6, 0]
    );
    world.add(stopSign.group);

    // Moroccan Minaret & Palms
    world.add(createMoroccanBuilding("minaret", [-3.2, 0, -2.4], 0.75));
    world.add(createPalmTree([2.6, 0.03, -1.2], 0.75));
    world.add(createPalmTree([-0.3, 0.03, -1.8], 0.65));

    let scrollFactor = 0;
    let touchOffsetX = 0;

    const onScroll = () => {
      scrollFactor = Math.min(Math.max(window.scrollY / 320, 0), 1);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      if (r.width > 0) {
        touchOffsetX = ((e.clientX - r.left) / r.width) * 2 - 1;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("pointermove", onPointerMove);

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
      const elapsed = clock.getElapsedTime();

      // Day / Night smooth transition
      ambLight.intensity = THREE.MathUtils.damp(
        ambLight.intensity,
        isNightRef.current ? 0.55 : 1.7,
        4,
        delta
      );
      dirLight.intensity = THREE.MathUtils.damp(
        dirLight.intensity,
        isNightRef.current ? 0.75 : 2.5,
        4,
        delta
      );

      // Animate Moroccan Flag
      flag.update(elapsed);

      // Scroll-reactive + continuous cruising motion
      const carX =
        0.4 + Math.sin(elapsed * 1.1 + scrollFactor * 3.0) * 0.75;
      car.group.position.x = carX;
      car.group.position.y = 0.05 + Math.sin(elapsed * 6) * 0.008;
      car.update(delta, elapsed, 1.0 + scrollFactor * 0.6, 0, "right");

      // Camera responds to mobile scroll & touch drag
      const closeZoom = cameraCloseRef.current ? 0.72 : 1.0;
      const targetCamX =
        (5.0 - scrollFactor * 1.6 + touchOffsetX * 1.1) * closeZoom;
      const targetCamY = (3.6 - scrollFactor * 1.0) * closeZoom;
      const targetCamZ = (6.0 - scrollFactor * 1.5) * closeZoom;

      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        targetCamX,
        4,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        targetCamY,
        4,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        targetCamZ,
        4,
        delta
      );
      camera.lookAt(carX * 0.35, 0.25, 0.2);

      // World rotates gently with mobile scroll
      world.rotation.y = THREE.MathUtils.damp(
        world.rotation.y,
        scrollFactor * 0.4 + touchOffsetX * 0.25,
        4,
        delta
      );

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
      window.removeEventListener("scroll", onScroll);
      container.removeEventListener("pointermove", onPointerMove);
      envTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`w-full h-48 sm:h-56 rounded-3xl overflow-hidden relative border border-[#E5ECF5] shadow-md transition-colors duration-500 ${
        isNight
          ? "bg-gradient-to-b from-[#071124] via-[#0F172A] to-[#1E293B]"
          : "bg-gradient-to-b from-[#DBEAFE] via-[#E0F2FE] to-[#F8FAFC]"
      }`}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Mobile 3D Scene Interactive Controls */}
      <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between pointer-events-auto">
        <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 text-white text-[10px] font-bold">
          {isArabic ? "مشهد 3D يتفاعل مع التمرير واللمس" : "3D Réactif au Scroll & Touch"}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCameraClose(!cameraClose)}
            className="px-2.5 py-1 rounded-lg bg-slate-950/85 text-white text-[10px] font-bold flex items-center gap-1"
          >
            <Eye className="w-3 h-3 text-[#F20D2F]" />
            <span>{isArabic ? "تقريب" : "Zoom"}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsNight(!isNight)}
            className="p-1.5 rounded-lg bg-slate-950/85 text-white"
            aria-label="Day/Night"
          >
            {isNight ? (
              <Moon className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
