import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let cachedSoftwareGl: boolean | null = null;

export function detectSoftwareGl(): boolean {
  if (typeof document === "undefined") return false;
  if (cachedSoftwareGl !== null) return cachedSoftwareGl;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      cachedSoftwareGl = true;
      return true;
    }
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    cachedSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
      gpu
    );
    return cachedSoftwareGl;
  } catch {
    cachedSoftwareGl = false;
    return false;
  }
}

export function setupStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
): THREE.Texture | null {
  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();
    return envTexture;
  } catch {
    return null;
  }
}

export function afterDraw(
  renderer: THREE.WebGLRenderer,
  cb: () => void
): number {
  const gl = renderer.getContext() as WebGL2RenderingContext;
  if (!gl || typeof gl.fenceSync !== "function") {
    return window.setTimeout(cb, 80);
  }
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
  let timerId = 0;
  const poll = () => {
    const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
    if (state === gl.UNSIGNALED) {
      timerId = window.setTimeout(poll, 5);
    } else {
      if (sync) gl.deleteSync(sync);
      timerId = window.setTimeout(cb, 80);
    }
  };
  timerId = window.setTimeout(poll, 5);
  return timerId;
}

export function createPalmTree(
  position: [number, number, number] = [0, 0, 0],
  scale = 1.0,
  rotation: [number, number, number] = [0, 0, 0]
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  group.rotation.set(...rotation);

  const trunkMat1 = new THREE.MeshStandardMaterial({
    color: "#78350F",
    roughness: 0.9,
  });
  const trunkMat2 = new THREE.MeshStandardMaterial({
    color: "#854D0E",
    roughness: 0.9,
  });

  const trunkLower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.18, 1.4, 8),
    trunkMat1
  );
  trunkLower.position.set(0, 0.7, 0);
  trunkLower.castShadow = true;
  group.add(trunkLower);

  const trunkUpper = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8),
    trunkMat2
  );
  trunkUpper.position.set(0.04, 1.7, 0);
  trunkUpper.rotation.set(0, 0, -0.06);
  trunkUpper.castShadow = true;
  group.add(trunkUpper);

  const canopy = new THREE.Group();
  canopy.position.set(0.06, 2.1, 0);

  const leafMat = new THREE.MeshStandardMaterial({
    color: "#15803D",
    roughness: 0.65,
  });
  const freshLeafMat = new THREE.MeshStandardMaterial({
    color: "#22C55E",
    roughness: 0.6,
  });

  [0, 45, 90, 135, 180, 225, 270, 315].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const arm = new THREE.Group();
    arm.rotation.set(0, rad, 0);
    const frond = new THREE.Mesh(
      new THREE.ConeGeometry(0.26, 1.0, 5),
      leafMat
    );
    frond.position.set(0.42, -0.15, 0);
    frond.rotation.set(0, 0, -0.55);
    frond.castShadow = true;
    arm.add(frond);
    canopy.add(arm);
  });

  [22, 112, 202, 292].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const arm = new THREE.Group();
    arm.rotation.set(0, rad, 0);
    const frond = new THREE.Mesh(
      new THREE.ConeGeometry(0.2, 0.7, 5),
      freshLeafMat
    );
    frond.position.set(0.28, 0.1, 0);
    frond.rotation.set(0, 0, -0.3);
    frond.castShadow = true;
    arm.add(frond);
    canopy.add(arm);
  });

  group.add(canopy);
  return group;
}

export function createMoroccanBuilding(
  type: "minaret" | "modern-white" | "apartment" = "modern-white",
  position: [number, number, number] = [0, 0, 0],
  scale = 1.0,
  rotation: [number, number, number] = [0, 0, 0]
): THREE.Group {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);
  group.rotation.set(...rotation);

  if (type === "minaret") {
    const ochreMat = new THREE.MeshStandardMaterial({
      color: "#E0A96D",
      roughness: 0.8,
    });
    const nicheMat = new THREE.MeshStandardMaterial({
      color: "#A16207",
      roughness: 0.7,
    });
    const balconyMat = new THREE.MeshStandardMaterial({
      color: "#D97706",
      roughness: 0.7,
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: "#047857",
      roughness: 0.4,
      metalness: 0.2,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: "#CA8A04",
      metalness: 0.8,
      roughness: 0.2,
    });

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 5.0, 1.6),
      ochreMat
    );
    base.position.set(0, 2.5, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    [-0.81, 0.81].forEach((x) => {
      const n1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 1.2, 0.6),
        nicheMat
      );
      n1.position.set(x, 3.2, 0);
      group.add(n1);

      const n2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.2, 0.02),
        nicheMat
      );
      n2.position.set(0, 3.2, x);
      group.add(n2);
    });

    const gallery = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.3, 1.8),
      balconyMat
    );
    gallery.position.set(0, 5.15, 0);
    gallery.castShadow = true;
    group.add(gallery);

    const lantern = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 1.0, 1.0),
      ochreMat
    );
    lantern.position.set(0, 5.75, 0);
    lantern.castShadow = true;
    group.add(lantern);

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(0.9, 1.2, 4),
      roofMat
    );
    roof.position.set(0, 6.75, 0);
    roof.rotation.set(0, Math.PI / 4, 0);
    roof.castShadow = true;
    group.add(roof);

    const jamour = new THREE.Group();
    jamour.position.set(0, 7.5, 0);
    jamour.add(
      new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8), goldMat)
    );
    const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), goldMat);
    s1.position.set(0, 0.15, 0);
    jamour.add(s1);
    const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), goldMat);
    s2.position.set(0, 0.35, 0);
    jamour.add(s2);
    group.add(jamour);

    return group;
  }

  const wallMat = new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    roughness: 0.4,
  });
  const parapetMat = new THREE.MeshStandardMaterial({
    color: "#F1F5F9",
    roughness: 0.5,
  });
  const slabMat = new THREE.MeshStandardMaterial({
    color: "#E2E8F0",
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: "#38BDF8",
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
    depthWrite: false,
  });
  const winMat = new THREE.MeshStandardMaterial({
    color: "#0F172A",
    roughness: 0.1,
    metalness: 0.9,
  });

  const mainBox = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 4.4, 2.4),
    wallMat
  );
  mainBox.position.set(0, 2.2, 0);
  mainBox.castShadow = true;
  mainBox.receiveShadow = true;
  group.add(mainBox);

  const parapet = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.25, 2.5),
    parapetMat
  );
  parapet.position.set(0, 4.5, 0);
  parapet.castShadow = true;
  group.add(parapet);

  [1.5, 2.7, 3.8].forEach((y) => {
    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.15, 0.35),
      slabMat
    );
    slab.position.set(0, y, 1.25);
    slab.castShadow = true;
    group.add(slab);

    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.3, 0.04),
      glassMat
    );
    rail.position.set(0, y + 0.22, 1.4);
    group.add(rail);

    const w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.65), winMat);
    w1.position.set(-0.6, y + 0.5, 1.21);
    group.add(w1);

    const w2 = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.65), winMat);
    w2.position.set(0.6, y + 0.5, 1.21);
    group.add(w2);
  });

  return group;
}

export function createRoadSign(
  type: "stop" | "speed-30" | "parking" | "roundabout",
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0],
  tooltipText?: string
): { group: THREE.Group; label: string } {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.set(...rotation);

  const label =
    tooltipText ||
    (type === "stop"
      ? "Panneau STOP • Arrêt obligatoire"
      : type === "speed-30"
      ? "Limitation à 30 km/h • Zone urbaine"
      : type === "parking"
      ? "Stationnement autorisé [P]"
      : "Sens giratoire obligatoire");

  group.userData = { isInteractiveSign: true, label, baseScale: 1.0 };

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 1.4, 12),
    new THREE.MeshStandardMaterial({
      color: "#94A3B8",
      metalness: 0.7,
      roughness: 0.3,
    })
  );
  post.position.set(0, 0.7, 0);
  post.castShadow = true;
  group.add(post);

  if (type === "stop") {
    const signGroup = new THREE.Group();
    signGroup.position.set(0, 1.4, 0);
    const oct = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.04, 8),
      new THREE.MeshStandardMaterial({ color: "#DC2626", roughness: 0.3 })
    );
    oct.rotation.set(Math.PI / 2, 0, Math.PI / 8);
    oct.castShadow = true;
    signGroup.add(oct);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.28, 8),
      new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        side: THREE.DoubleSide,
      })
    );
    ring.position.set(0, 0, 0.025);
    ring.rotation.set(0, 0, Math.PI / 8);
    signGroup.add(ring);
    group.add(signGroup);
  } else if (type === "speed-30") {
    const signGroup = new THREE.Group();
    signGroup.position.set(0, 1.35, 0);
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.04, 24),
      new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.3 })
    );
    disc.rotation.set(Math.PI / 2, 0, 0);
    disc.castShadow = true;
    signGroup.add(disc);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.22, 0.29, 24),
      new THREE.MeshBasicMaterial({
        color: "#DC2626",
        side: THREE.DoubleSide,
      })
    );
    ring.position.set(0, 0, 0.025);
    signGroup.add(ring);
    group.add(signGroup);
  } else if (type === "parking") {
    const signGroup = new THREE.Group();
    signGroup.position.set(0, 1.35, 0);
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.04),
      new THREE.MeshStandardMaterial({ color: "#1D4ED8", roughness: 0.3 })
    );
    box.castShadow = true;
    signGroup.add(box);

    const pStem = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, 0.3),
      new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        side: THREE.DoubleSide,
      })
    );
    pStem.position.set(-0.05, 0, 0.025);
    signGroup.add(pStem);

    const pLoop = new THREE.Mesh(
      new THREE.PlaneGeometry(0.13, 0.14),
      new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        side: THREE.DoubleSide,
      })
    );
    pLoop.position.set(0.04, 0.07, 0.025);
    signGroup.add(pLoop);
    group.add(signGroup);
  }

  return { group, label };
}

export function createDirectionSign(
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0]
): { group: THREE.Group; label: string } {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.set(...rotation);

  const label =
    "Panneau de Direction Autoroutière • Casablanca • Rabat • Marrakech";
  group.userData = { isInteractiveSign: true, label, baseScale: 1.0 };

  const postMat = new THREE.MeshStandardMaterial({
    color: "#94A3B8",
    metalness: 0.8,
    roughness: 0.2,
  });

  [-0.7, 0.7].forEach((x) => {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.2, 12),
      postMat
    );
    post.position.set(x, 1.1, 0);
    post.castShadow = true;
    group.add(post);
  });

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 1.1, 0.06),
    new THREE.MeshStandardMaterial({
      color: "#1D4ED8",
      roughness: 0.3,
      metalness: 0.2,
    })
  );
  panel.position.set(0, 1.8, 0);
  panel.castShadow = true;
  group.add(panel);

  const plateMat = new THREE.MeshStandardMaterial({ color: "#1E40AF" });
  const barMat = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });

  [2.15, 1.8, 1.45].forEach((y) => {
    const row = new THREE.Group();
    row.position.set(0, y, 0.04);
    row.add(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.26, 0.01), plateMat));
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.06), barMat);
    bar.position.set(0.55, 0, 0.01);
    row.add(bar);
    group.add(row);
  });

  return { group, label };
}

export interface TrafficLightInstance {
  group: THREE.Group;
  update: (elapsedTime: number) => void;
}

export function createTrafficLight(
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0]
): TrafficLightInstance {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.set(...rotation);

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 2.8, 12),
    new THREE.MeshStandardMaterial({
      color: "#1E293B",
      metalness: 0.8,
      roughness: 0.3,
    })
  );
  pole.position.set(0, 1.4, 0);
  pole.castShadow = true;
  group.add(pole);

  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.85, 0.28),
    new THREE.MeshStandardMaterial({ color: "#0F172A", roughness: 0.4 })
  );
  housing.position.set(0, 2.65, 0.12);
  housing.castShadow = true;
  group.add(housing);

  const visorMat = new THREE.MeshStandardMaterial({ color: "#020617" });
  [-0.24, 0, 0.24].forEach((yOff) => {
    const visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.03, 0.14),
      visorMat
    );
    visor.position.set(0, 2.65 + yOff + 0.07, 0.26);
    visor.rotation.set(0.4, 0, 0);
    group.add(visor);
  });

  const redMat = new THREE.MeshStandardMaterial({
    color: "#450A0A",
    emissive: "#000000",
    emissiveIntensity: 0,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: "#451A03",
    emissive: "#000000",
    emissiveIntensity: 0,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: "#10B981",
    emissive: "#10B981",
    emissiveIntensity: 3.0,
  });

  const redBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 14, 14),
    redMat
  );
  redBulb.position.set(0, 2.89, 0.26);
  group.add(redBulb);

  const amberBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 14, 14),
    amberMat
  );
  amberBulb.position.set(0, 2.65, 0.26);
  group.add(amberBulb);

  const greenBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 14, 14),
    greenMat
  );
  greenBulb.position.set(0, 2.41, 0.26);
  group.add(greenBulb);

  let currentPhase: "green" | "amber" | "red" | "" = "";

  const update = (elapsedTime: number) => {
    const t = elapsedTime % 12;
    const phase = t < 6.0 ? "green" : t < 8.0 ? "amber" : "red";
    if (phase === currentPhase) return;
    currentPhase = phase;

    redMat.color.set(phase === "red" ? "#EF4444" : "#450A0A");
    redMat.emissive.set(phase === "red" ? "#EF4444" : "#000000");
    redMat.emissiveIntensity = phase === "red" ? 3.5 : 0;

    amberMat.color.set(phase === "amber" ? "#F59E0B" : "#451A03");
    amberMat.emissive.set(phase === "amber" ? "#F59E0B" : "#000000");
    amberMat.emissiveIntensity = phase === "amber" ? 3.5 : 0;

    greenMat.color.set(phase === "green" ? "#10B981" : "#022C22");
    greenMat.emissive.set(phase === "green" ? "#10B981" : "#000000");
    greenMat.emissiveIntensity = phase === "green" ? 3.5 : 0;
  };

  return { group, update };
}

export function createRoundabout(): THREE.Group {
  const group = new THREE.Group();

  const ringRoad = new THREE.Mesh(
    new THREE.RingGeometry(1.25, 2.75, 48),
    new THREE.MeshStandardMaterial({ color: "#2B3445", roughness: 0.7 })
  );
  ringRoad.position.set(0, 0.022, 0);
  ringRoad.rotation.set(-Math.PI / 2, 0, 0);
  ringRoad.receiveShadow = true;
  group.add(ringRoad);

  const centerLine = new THREE.Mesh(
    new THREE.RingGeometry(1.98, 2.04, 48),
    new THREE.MeshBasicMaterial({
      color: "#FFFFFF",
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    })
  );
  centerLine.position.set(0, 0.026, 0);
  centerLine.rotation.set(-Math.PI / 2, 0, 0);
  group.add(centerLine);

  const curb = new THREE.Mesh(
    new THREE.CylinderGeometry(1.28, 1.34, 0.18, 48),
    new THREE.MeshStandardMaterial({ color: "#E2E8F0", roughness: 0.6 })
  );
  curb.position.set(0, 0.1, 0);
  group.add(curb);

  const turf = new THREE.Mesh(
    new THREE.CylinderGeometry(1.24, 1.24, 0.05, 48),
    new THREE.MeshStandardMaterial({ color: "#15803D", roughness: 0.9 })
  );
  turf.position.set(0, 0.2, 0);
  group.add(turf);

  const shrubMat = new THREE.MeshStandardMaterial({
    color: "#166534",
    roughness: 0.8,
  });
  [0, 45, 90, 135, 180, 225, 270, 315].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const shrub = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      shrubMat
    );
    shrub.position.set(Math.sin(rad) * 0.85, 0.25, Math.cos(rad) * 0.85);
    shrub.castShadow = true;
    group.add(shrub);
  });

  group.add(createPalmTree([0, 0.2, 0], 1.1));

  // Blue Roundabout Sign
  const rSign = new THREE.Group();
  rSign.position.set(0.7, 0.2, 0.7);
  rSign.rotation.set(0, -Math.PI / 4, 0);
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.9, 12),
    new THREE.MeshStandardMaterial({ color: "#94A3B8", metalness: 0.7 })
  );
  post.position.set(0, 0.45, 0);
  rSign.add(post);

  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.26, 0.03, 24),
    new THREE.MeshStandardMaterial({ color: "#1D4ED8" })
  );
  disc.position.set(0, 0.95, 0);
  disc.rotation.set(Math.PI / 2, 0, 0);
  rSign.add(disc);

  const arrowRing = new THREE.Mesh(
    new THREE.RingGeometry(0.12, 0.17, 24),
    new THREE.MeshBasicMaterial({
      color: "#FFFFFF",
      side: THREE.DoubleSide,
    })
  );
  arrowRing.position.set(0, 0.95, 0.02);
  rSign.add(arrowRing);
  group.add(rSign);

  const outerCurb = new THREE.Mesh(
    new THREE.CylinderGeometry(2.75, 2.82, 0.14, 48, 1, true),
    new THREE.MeshStandardMaterial({
      color: "#CBD5E1",
      roughness: 0.6,
      side: THREE.DoubleSide,
    })
  );
  outerCurb.position.set(0, 0.08, 0);
  group.add(outerCurb);

  return group;
}

export function createMoroccanFlagPole(
  position: [number, number, number] = [0, 0, 0],
  scale = 1.0
): { group: THREE.Group; update: (elapsedTime: number) => void } {
  const group = new THREE.Group();
  group.position.set(...position);
  group.scale.setScalar(scale);

  // Metallic Flagpole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.05, 3.2, 12),
    new THREE.MeshStandardMaterial({
      color: "#F8FAFC",
      metalness: 0.85,
      roughness: 0.2,
    })
  );
  pole.position.set(0, 1.6, 0);
  pole.castShadow = true;
  group.add(pole);

  // Golden Finial Ball
  const finial = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 12),
    new THREE.MeshStandardMaterial({
      color: "#F59E0B",
      metalness: 0.9,
      roughness: 0.15,
    })
  );
  finial.position.set(0, 3.24, 0);
  group.add(finial);

  // Procedural CanvasTexture for the Official Flag of Morocco
  let flagTexture: THREE.CanvasTexture | undefined;
  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = 450;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Official Crimson Red (#C1272D)
      ctx.fillStyle = "#C1272D";
      ctx.fillRect(0, 0, 450, 300);

      // Official Emerald Green Pentagram (#006233)
      ctx.strokeStyle = "#006233";
      ctx.lineWidth = 15;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 10;
      const cx = 225;
      const cy = 150;
      const r = 70;
      const pts: [number, number][] = [];
      for (let i = 0; i < 5; i++) {
        const ang = -Math.PI / 2 + (i * 4 * Math.PI) / 5;
        pts.push([cx + Math.cos(ang) * r, cy + Math.sin(ang) * r]);
      }
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 5; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.closePath();
      ctx.stroke();
    }
    flagTexture = new THREE.CanvasTexture(canvas);
    flagTexture.colorSpace = THREE.SRGBColorSpace;
  }

  const flagGeo = new THREE.PlaneGeometry(1.35, 0.9, 18, 10);
  const posAttr = flagGeo.attributes.position;
  const origZ = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    origZ[i] = posAttr.getZ(i);
  }

  const flagMat = new THREE.MeshStandardMaterial({
    map: flagTexture,
    color: flagTexture ? "#FFFFFF" : "#C1272D",
    roughness: 0.45,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const flagMesh = new THREE.Mesh(flagGeo, flagMat);
  flagMesh.position.set(0.7, 2.7, 0);
  flagMesh.castShadow = true;
  group.add(flagMesh);

  const update = (elapsedTime: number) => {
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Normalized distance from pole (0 at left edge x = -0.675, 1 at right edge x = +0.675)
      const factor = Math.max(0, (x + 0.675) / 1.35);
      const wave =
        Math.sin(x * 4.5 - elapsedTime * 5.2) * 0.09 * factor +
        Math.cos(y * 3.0 - elapsedTime * 3.8) * 0.03 * factor;
      posAttr.setZ(i, origZ[i] + wave);
    }
    posAttr.needsUpdate = true;
  };

  return { group, update };
}

export function createRoadNetwork(): THREE.Group {
  const group = new THREE.Group();

  // Base platform
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(22, 0.4, 18),
    new THREE.MeshStandardMaterial({ color: "#E2E8F0", roughness: 0.9 })
  );
  base.position.set(0, -0.22, 0);
  base.receiveShadow = true;
  group.add(base);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(21.8, 17.8),
    new THREE.MeshStandardMaterial({ color: "#E2E8F0", roughness: 0.95 })
  );
  ground.rotation.set(-Math.PI / 2, 0, 0);
  ground.receiveShadow = true;
  group.add(ground);

  // Lawns
  const lawn1Mat = new THREE.MeshStandardMaterial({
    color: "#86EFAC",
    roughness: 0.8,
  });
  const lawn2Mat = new THREE.MeshStandardMaterial({
    color: "#4ADE80",
    roughness: 0.8,
  });

  const addLawn = (
    w: number,
    h: number,
    x: number,
    z: number,
    mat: THREE.Material
  ) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, 0.01, z);
    m.rotation.set(-Math.PI / 2, 0, 0);
    m.receiveShadow = true;
    group.add(m);
  };

  addLawn(6.2, 5.0, -5.8, -4.5, lawn1Mat);
  addLawn(6.2, 5.0, -5.8, 4.5, lawn2Mat);
  addLawn(5.5, 5.0, 5.5, -4.5, lawn1Mat);
  addLawn(5.5, 4.5, 5.5, 4.8, lawn2Mat);

  // Roads
  const roadMat = new THREE.MeshStandardMaterial({
    color: "#1E293B",
    roughness: 0.7,
  });

  const ewRoad = new THREE.Mesh(new THREE.PlaneGeometry(20.5, 3.2), roadMat);
  ewRoad.position.set(0, 0.02, 0.1);
  ewRoad.rotation.set(-Math.PI / 2, 0, 0);
  ewRoad.receiveShadow = true;
  group.add(ewRoad);

  const nRoad = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 7.8), roadMat);
  nRoad.position.set(-0.8, 0.02, -5.2);
  nRoad.rotation.set(-Math.PI / 2, 0, 0);
  nRoad.receiveShadow = true;
  group.add(nRoad);

  const sRoad = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 7.8), roadMat);
  sRoad.position.set(-0.8, 0.02, 5.2);
  sRoad.rotation.set(-Math.PI / 2, 0, 0);
  sRoad.receiveShadow = true;
  group.add(sRoad);

  // Road Markings
  const whiteMarkMat = new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    roughness: 0.4,
  });

  for (let i = 0; i < 6; i++) {
    const eDash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 0.1),
      whiteMarkMat
    );
    eDash.position.set(3.2 + i * 1.1, 0.025, 0.1);
    eDash.rotation.set(-Math.PI / 2, 0, 0);
    group.add(eDash);

    const wDash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 0.1),
      whiteMarkMat
    );
    wDash.position.set(-4.5 - i * 1.1, 0.025, 0.1);
    wDash.rotation.set(-Math.PI / 2, 0, 0);
    group.add(wDash);

    const nDash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.1),
      whiteMarkMat
    );
    nDash.position.set(-0.8, 0.025, -2.8 - i * 1.0);
    nDash.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    group.add(nDash);

    const sDash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.1),
      whiteMarkMat
    );
    sDash.position.set(-0.8, 0.025, 2.8 + i * 1.0);
    sDash.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    group.add(sDash);
  }

  // Zebra Crossings
  [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].forEach((offset) => {
    const zWest = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.24),
      whiteMarkMat
    );
    zWest.position.set(-6.2, 0.026, 0.1 + offset);
    zWest.rotation.set(-Math.PI / 2, 0, 0);
    group.add(zWest);

    const zNorth = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.24),
      whiteMarkMat
    );
    zNorth.position.set(-0.8 + offset, 0.026, -6.2);
    zNorth.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    group.add(zNorth);
  });

  // Yield teeth at East roundabout entry
  [-0.6, -0.2, 0.2, 0.6].forEach((z) => {
    const tooth = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15, 0.35),
      whiteMarkMat
    );
    tooth.position.set(2.45, 0.027, 0.85 + z * 0.7);
    tooth.rotation.set(-Math.PI / 2, 0, 0);
    group.add(tooth);
  });

  // Parking bay + parked car
  const parkingGroup = new THREE.Group();
  parkingGroup.position.set(5.6, 0.022, 2.8);
  const parkBay = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.4), roadMat);
  parkBay.rotation.set(-Math.PI / 2, 0, 0);
  parkingGroup.add(parkBay);

  [-1.8, -0.6, 0.6, 1.8].forEach((x) => {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, 2.2),
      whiteMarkMat
    );
    line.position.set(x, 0.005, 0);
    line.rotation.set(-Math.PI / 2, 0, 0);
    parkingGroup.add(line);
  });

  const parkedCar = new THREE.Group();
  parkedCar.position.set(-1.2, 0.16, 0);
  parkedCar.rotation.set(0, Math.PI / 2, 0);
  parkedCar.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.32, 0.9),
      new THREE.MeshStandardMaterial({
        color: "#38BDF8",
        roughness: 0.3,
        metalness: 0.4,
      })
    )
  );
  const parkedTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.24, 0.8),
    new THREE.MeshStandardMaterial({ color: "#0284C7", roughness: 0.3 })
  );
  parkedTop.position.set(0.1, 0.24, 0);
  parkedCar.add(parkedTop);
  parkingGroup.add(parkedCar);
  group.add(parkingGroup);

  // Traffic cones
  const coneMat = new THREE.MeshStandardMaterial({
    color: "#EA580C",
    roughness: 0.5,
  });
  [
    [2.8, 0.03, 1.8],
    [3.4, 0.03, 1.8],
    [4.0, 0.03, 1.8],
    [-3.2, 0.03, 1.9],
    [-3.8, 0.03, 1.9],
  ].forEach(([x, y, z]) => {
    const cone = new THREE.Group();
    cone.position.set(x, y, z);
    const body = new THREE.Mesh(
      new THREE.ConeGeometry(0.11, 0.5, 10),
      coneMat
    );
    body.position.set(0, 0.25, 0);
    cone.add(body);
    group.add(cone);
  });

  // Street lamps
  const lampPostMat = new THREE.MeshStandardMaterial({
    color: "#334155",
    metalness: 0.7,
    roughness: 0.3,
  });
  const lampGlowMat = new THREE.MeshStandardMaterial({
    color: "#FEF08A",
    emissive: "#FEF08A",
    emissiveIntensity: 1.5,
  });
  [
    { pos: [-3.5, 0.03, -1.8], rot: Math.PI / 2 },
    { pos: [3.2, 0.03, -1.8], rot: -Math.PI / 2 },
    { pos: [-2.6, 0.03, 3.8], rot: 0 },
    { pos: [3.2, 0.03, 4.4], rot: -Math.PI / 2 },
  ].forEach(({ pos, rot }) => {
    const lamp = new THREE.Group();
    lamp.position.set(pos[0], pos[1], pos[2]);
    lamp.rotation.set(0, rot, 0);
    const p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.07, 2.5, 8),
      lampPostMat
    );
    p.position.set(0, 1.25, 0);
    lamp.add(p);
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.06, 0.12),
      lampGlowMat
    );
    head.position.set(0.35, 2.4, 0);
    lamp.add(head);
    group.add(lamp);
  });

  // Atlas Mountains background
  const mountains = new THREE.Group();
  mountains.position.set(0, 0, -11);
  const peak1 = new THREE.Mesh(
    new THREE.ConeGeometry(4.8, 5.5, 5),
    new THREE.MeshStandardMaterial({
      color: "#78350F",
      roughness: 0.9,
      flatShading: true,
    })
  );
  peak1.position.set(-3, 2.4, -2);
  mountains.add(peak1);

  const snow1 = new THREE.Mesh(
    new THREE.ConeGeometry(1.6, 1.8, 5),
    new THREE.MeshStandardMaterial({
      color: "#F8FAFC",
      roughness: 0.8,
      flatShading: true,
    })
  );
  snow1.position.set(-3, 4.4, -2);
  mountains.add(snow1);

  const peak2 = new THREE.Mesh(
    new THREE.ConeGeometry(4.2, 4.5, 5),
    new THREE.MeshStandardMaterial({
      color: "#854D0E",
      roughness: 0.95,
      flatShading: true,
    })
  );
  peak2.position.set(2.5, 2.0, -3);
  mountains.add(peak2);

  const snow2 = new THREE.Mesh(
    new THREE.ConeGeometry(1.3, 1.4, 5),
    new THREE.MeshStandardMaterial({
      color: "#F1F5F9",
      roughness: 0.8,
      flatShading: true,
    })
  );
  snow2.position.set(2.5, 3.6, -3);
  mountains.add(snow2);

  const peak3 = new THREE.Mesh(
    new THREE.ConeGeometry(3.8, 3.8, 5),
    new THREE.MeshStandardMaterial({
      color: "#9A3412",
      roughness: 0.95,
      flatShading: true,
    })
  );
  peak3.position.set(7.5, 1.7, -4);
  mountains.add(peak3);

  group.add(mountains);

  return group;
}

export interface DrivingSchoolCarInstance {
  group: THREE.Group;
  update: (
    delta: number,
    elapsedTime: number,
    speedFactor: number,
    steerAngle: number,
    turnSignal: "none" | "left" | "right"
  ) => void;
}

export function createDrivingSchoolCar(
  scale = 0.9,
  roofSign = true
): DrivingSchoolCarInstance {
  const group = new THREE.Group();
  group.scale.setScalar(scale);

  // Immediate high-detail composite procedural car (replaced seamlessly if sedan.glb loads)
  const fallbackCarGroup = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    roughness: 0.25,
    metalness: 0.15,
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: "#F20D2F",
    roughness: 0.35,
  });
  const cabinMat = new THREE.MeshStandardMaterial({
    color: "#071A3D",
    roughness: 0.15,
    metalness: 0.85,
  });
  const wheelMat = new THREE.MeshStandardMaterial({
    color: "#1E293B",
    roughness: 0.8,
  });

  const lowerBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.44, 2.5),
    bodyMat
  );
  lowerBody.position.set(0, 0.36, 0);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  fallbackCarGroup.add(lowerBody);

  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.38, 0.09, 2.52),
    stripeMat
  );
  stripe.position.set(0, 0.34, 0);
  fallbackCarGroup.add(stripe);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.16, 0.4, 1.35),
    cabinMat
  );
  cabin.position.set(0, 0.74, -0.08);
  cabin.castShadow = true;
  fallbackCarGroup.add(cabin);

  const wheels: {
    fl?: THREE.Object3D;
    fr?: THREE.Object3D;
    bl?: THREE.Object3D;
    br?: THREE.Object3D;
  } = {};

  const makeWheel = (x: number, z: number): THREE.Group => {
    const wPivot = new THREE.Group();
    wPivot.position.set(x, 0.2, z);
    const tire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.16, 16),
      wheelMat
    );
    tire.rotation.set(0, 0, Math.PI / 2);
    tire.castShadow = true;
    wPivot.add(tire);
    fallbackCarGroup.add(wPivot);
    return wPivot;
  };

  wheels.fl = makeWheel(-0.68, 0.78);
  wheels.fr = makeWheel(0.68, 0.78);
  wheels.bl = makeWheel(-0.68, -0.78);
  wheels.br = makeWheel(0.68, -0.78);

  group.add(fallbackCarGroup);

  // Try loading GLTF model /models/car/sedan.glb to upgrade mesh if available
  if (typeof window !== "undefined") {
    const loader = new GLTFLoader();
    loader.load(
      "/models/car/sedan.glb",
      (gltf) => {
        const cloned = gltf.scene.clone(true);
        cloned.traverse((child) => {
          if (child.name === "wheel-front-left") wheels.fl = child;
          if (child.name === "wheel-front-right") wheels.fr = child;
          if (child.name === "wheel-back-left") wheels.bl = child;
          if (child.name === "wheel-back-right") wheels.br = child;
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        group.remove(fallbackCarGroup);
        group.add(cloned);
      },
      undefined,
      () => {
        // Keep procedural fallback car if GLB fails
      }
    );
  }

  // Roof "L" Auto-École Sign
  if (roofSign) {
    const roofGroup = new THREE.Group();
    roofGroup.position.set(0, 1.15, 0);

    const signBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.28, 0.42),
      new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        roughness: 0.3,
        metalness: 0.1,
      })
    );
    signBox.castShadow = true;
    roofGroup.add(signBox);

    const redTrim = new THREE.Mesh(
      new THREE.BoxGeometry(0.57, 0.03, 0.44),
      new THREE.MeshStandardMaterial({ color: "#C1272D", roughness: 0.4 })
    );
    redTrim.position.set(0, 0.14, 0);
    roofGroup.add(redTrim);

    const badgeMat = new THREE.MeshBasicMaterial({
      color: "#C1272D",
      side: THREE.DoubleSide,
    });
    const whiteMat = new THREE.MeshBasicMaterial({
      color: "#FFFFFF",
      side: THREE.DoubleSide,
    });

    const frontBadge = new THREE.Mesh(
      new THREE.PlaneGeometry(0.22, 0.22),
      badgeMat
    );
    frontBadge.position.set(0, 0, 0.215);
    roofGroup.add(frontBadge);

    const lVert = new THREE.Mesh(
      new THREE.PlaneGeometry(0.05, 0.15),
      whiteMat
    );
    lVert.position.set(-0.03, 0, 0.22);
    roofGroup.add(lVert);

    const lHoriz = new THREE.Mesh(
      new THREE.PlaneGeometry(0.09, 0.045),
      whiteMat
    );
    lHoriz.position.set(0.01, -0.055, 0.22);
    roofGroup.add(lHoriz);

    group.add(roofGroup);
  }

  // Turn indicators & lights
  const rightIndMat = new THREE.MeshStandardMaterial({
    color: "#D97706",
    roughness: 0.2,
  });
  const leftIndMat = new THREE.MeshStandardMaterial({
    color: "#D97706",
    roughness: 0.2,
  });

  const rfInd = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.08, 0.14),
    rightIndMat
  );
  rfInd.position.set(0.7, 0.42, 1.15);
  group.add(rfInd);

  const rrInd = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.08, 0.14),
    rightIndMat
  );
  rrInd.position.set(0.7, 0.48, -1.2);
  group.add(rrInd);

  const lfInd = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.08, 0.14),
    leftIndMat
  );
  lfInd.position.set(-0.7, 0.42, 1.15);
  group.add(lfInd);

  const lrInd = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.08, 0.14),
    leftIndMat
  );
  lrInd.position.set(-0.7, 0.48, -1.2);
  group.add(lrInd);

  // Headlights & Taillights
  const headMat = new THREE.MeshStandardMaterial({
    color: "#FEF08A",
    emissive: "#FEF08A",
    emissiveIntensity: 1.5,
  });
  [-0.45, 0.45].forEach((x) => {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), headMat);
    hl.position.set(x, 0.42, 1.26);
    group.add(hl);
  });

  const tailMat = new THREE.MeshStandardMaterial({
    color: "#EF4444",
    emissive: "#DC2626",
    emissiveIntensity: 1.2,
  });
  [-0.48, 0.48].forEach((x) => {
    const tl = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.1, 0.04),
      tailMat
    );
    tl.position.set(x, 0.48, -1.26);
    group.add(tl);
  });

  let wheelSpin = 0;

  const update = (
    delta: number,
    elapsedTime: number,
    speedFactor: number,
    steerAngle: number,
    turnSignal: "none" | "left" | "right"
  ) => {
    wheelSpin -= delta * 14 * speedFactor;

    if (wheels.fl) {
      wheels.fl.rotation.x = wheelSpin;
      wheels.fl.rotation.y = steerAngle;
    }
    if (wheels.fr) {
      wheels.fr.rotation.x = wheelSpin;
      wheels.fr.rotation.y = steerAngle;
    }
    if (wheels.bl) {
      wheels.bl.rotation.x = wheelSpin;
    }
    if (wheels.br) {
      wheels.br.rotation.x = wheelSpin;
    }

    const isBlinkOn = Math.sin(elapsedTime * 14) > 0;
    const rightActive = turnSignal === "right" && isBlinkOn;
    rightIndMat.emissive.set(rightActive ? "#F59E0B" : "#000000");
    rightIndMat.emissiveIntensity = rightActive ? 3.0 : 0;

    const leftActive = turnSignal === "left" && isBlinkOn;
    leftIndMat.emissive.set(leftActive ? "#F59E0B" : "#000000");
    leftIndMat.emissiveIntensity = leftActive ? 3.0 : 0;
  };

  return { group, update };
}
