"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildCarCurve, carSpeedFactor, carTurnSignal } from "./carPathData";
import { DrivingSchoolCar } from "./DrivingSchoolCar";

interface CarPathProps {
  isPaused?: boolean;
}

export function CarPath({ isPaused = false }: CarPathProps) {
  const carGroupRef = useRef<THREE.Group>(null);

  // Performance refs to avoid React re-renders in useFrame
  const speedFactorRef = useRef(1.0);
  const steeringAngleRef = useRef(0);
  const turnSignalRef = useRef<"none" | "left" | "right">("none");

  // Road-bound lap curve shared with HeroRoadScene (see ./carPathData)
  const curve = useMemo(() => buildCarCurve(0.05), []);

  // Track progress along curve with non-linear realistic speed profile
  const progressRef = useRef(0);

  useFrame((state, delta) => {
    if (!carGroupRef.current || isPaused) return;

    const u = progressRef.current;

    // Road-bound speed profile (yield, ring cruise, exit acceleration,
    // U-turn crawl, return, hairpin) shared with HeroRoadScene.
    const speedFactor = carSpeedFactor(u);
    speedFactorRef.current = speedFactor;

    const step = (delta * 0.065 * speedFactor) % 1;
    progressRef.current = (progressRef.current + step) % 1.0;

    const currentU = progressRef.current;

    // Calculate position on curve
    const position = curve.getPointAt(currentU);
    carGroupRef.current.position.copy(position);

    // Calculate forward tangent vector
    const tangent = curve.getTangentAt(currentU).normalize();
    const futureU = (currentU + 0.02) % 1.0;
    const futureTangent = curve.getTangentAt(futureU).normalize();

    // Rotation from tangent
    const angle = Math.atan2(tangent.x, tangent.z);
    carGroupRef.current.rotation.y = angle;

    // Front wheel steering angle (curvature rate)
    const steer = Math.atan2(futureTangent.x, futureTangent.z) - angle;
    steeringAngleRef.current = THREE.MathUtils.clamp(steer * 4, -0.45, 0.45);

    // Turn indicator logic shared with the road layout: signal right before
    // the ring exits, left at the U-turns.
    turnSignalRef.current = carTurnSignal(currentU);

    // Subtle suspension vertical bobbing
    carGroupRef.current.position.y =
      position.y + Math.sin(state.clock.elapsedTime * 8) * 0.008;
  });

  return (
    <group ref={carGroupRef}>
      <DrivingSchoolCar
        speedFactorRef={speedFactorRef}
        steeringAngleRef={steeringAngleRef}
        turnSignalRef={turnSignalRef}
        roofSign={true}
      />
    </group>
  );
}
