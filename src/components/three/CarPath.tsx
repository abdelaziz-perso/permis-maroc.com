"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
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

  // Define CatmullRomCurve3 matching the roundabout and approach roads
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(7.2, 0.05, 0.85),   // 1. Enters from right approach road ("START")
      new THREE.Vector3(4.8, 0.05, 0.85),   // 2. Approaches roundabout
      new THREE.Vector3(2.6, 0.05, 0.82),   // 3. Slows down before yield markings
      new THREE.Vector3(1.4, 0.05, 0.35),   // 4. Enters roundabout
      new THREE.Vector3(0.0, 0.05, -1.95),  // 5. Drives around north side of roundabout
      new THREE.Vector3(-1.95, 0.05, -0.2), // 6. Drives around west side
      new THREE.Vector3(-1.4, 0.05, 1.4),   // 7. Approaches southern exit
      new THREE.Vector3(-0.4, 0.05, 2.3),   // 8. Preparing to exit
      new THREE.Vector3(0.9, 0.05, 4.0),    // 9. Exits onto southern road
      new THREE.Vector3(0.9, 0.05, 6.2),    // 10. Driving forward on boulevard
      new THREE.Vector3(3.2, 0.05, 5.8),    // 11. Curved link road to loop
      new THREE.Vector3(6.2, 0.05, 3.4),    // 12. Returning to eastern approach
    ];
    return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
  }, []);

  // Track progress along curve with non-linear realistic speed profile
  const progressRef = useRef(0);

  useFrame((state, delta) => {
    if (!carGroupRef.current || isPaused) return;

    const u = progressRef.current;

    // Realistic speed profile:
    // 1. Slow down at entrance (u between 0.12 and 0.28) - yield check
    // 2. Moderate cruising speed inside roundabout (u between 0.28 and 0.60)
    // 3. Accelerate upon exit (u between 0.60 and 0.88)
    let speedFactor = 1.0;
    if (u >= 0.12 && u <= 0.28) {
      speedFactor = 0.42; // Yielding / checking priority
    } else if (u > 0.28 && u <= 0.6) {
      speedFactor = 0.82; // Cruising round circle
    } else if (u > 0.6 && u <= 0.88) {
      speedFactor = 1.35; // Accelerating safely out
    }
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

    // Turn indicator logic: activate right indicator as it nears exit (between 0.50 and 0.72)
    if (currentU >= 0.50 && currentU <= 0.72) {
      turnSignalRef.current = "right";
    } else {
      turnSignalRef.current = "none";
    }

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
