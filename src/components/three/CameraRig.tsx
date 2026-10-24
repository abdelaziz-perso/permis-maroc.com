"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  basePosition?: [number, number, number];
  targetLookAt?: [number, number, number];
}

export function CameraRig({
  basePosition = [10.5, 11, 12.5],
  targetLookAt = [0, 0.4, 0],
}: CameraRigProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(...basePosition));
  const lookTarget = useRef(new THREE.Vector3(...targetLookAt));
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll between 0 and 1 over 600px scroll
      const scrollY = window.scrollY;
      scrollOffset.current = Math.min(Math.max(scrollY / 600, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    // Parallax from mouse pointer
    const pointerX = state.pointer.x; // -1 to 1
    const pointerY = state.pointer.y; // -1 to 1

    // Scroll zoom: smoothly push camera forward towards the road
    const scrollFactor = scrollOffset.current;
    const zoomPushX = -scrollFactor * 3.5;
    const zoomPushY = -scrollFactor * 3.2;
    const zoomPushZ = -scrollFactor * 4.0;

    const targetX = basePosition[0] + pointerX * 1.2 + zoomPushX;
    const targetY = basePosition[1] - pointerY * 0.8 + zoomPushY;
    const targetZ = basePosition[2] + pointerX * 0.8 + zoomPushZ;

    // Smooth lerp (frame-rate independent)
    const factor = Math.min(delta * 4, 0.2);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, factor);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, factor);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, factor);

    camera.position.copy(currentPos.current);

    // Look at target with subtle pan
    const targetLookX = targetLookAt[0] + pointerX * 0.3;
    const targetLookZ = targetLookAt[2] + pointerY * 0.3;
    lookTarget.current.x = THREE.MathUtils.lerp(lookTarget.current.x, targetLookX, factor);
    lookTarget.current.z = THREE.MathUtils.lerp(lookTarget.current.z, targetLookZ, factor);

    camera.lookAt(lookTarget.current);
  });

  return null;
}
