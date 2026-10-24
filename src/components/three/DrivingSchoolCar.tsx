"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DrivingSchoolCarProps {
  speedFactorRef?: React.MutableRefObject<number>;
  steeringAngleRef?: React.MutableRefObject<number>;
  turnSignalRef?: React.MutableRefObject<"none" | "left" | "right">;
  scale?: number;
  roofSign?: boolean;
}

export function DrivingSchoolCar({
  speedFactorRef,
  steeringAngleRef,
  turnSignalRef,
  scale = 0.9,
  roofSign = true,
}: DrivingSchoolCarProps) {
  const { scene } = useGLTF("/models/car/sedan.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Turn signal blink ref
  const rightIndicatorFrontRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightIndicatorRearRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftIndicatorFrontRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftIndicatorRearRef = useRef<THREE.MeshStandardMaterial>(null);

  // Wheel node references
  const wheelsRef = useRef<{
    fl?: THREE.Object3D;
    fr?: THREE.Object3D;
    bl?: THREE.Object3D;
    br?: THREE.Object3D;
  }>({});

  const wheelSpinRef = useRef(0);

  // Locate wheels inside cloned scene
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.name === "wheel-front-left") wheelsRef.current.fl = child;
      if (child.name === "wheel-front-right") wheelsRef.current.fr = child;
      if (child.name === "wheel-back-left") wheelsRef.current.bl = child;
      if (child.name === "wheel-back-right") wheelsRef.current.br = child;

      // Enable shadows
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  // Smooth frame loop
  useFrame(({ clock }, delta) => {
    const speed = speedFactorRef?.current ?? 1.0;
    const steer = steeringAngleRef?.current ?? 0;
    const signal = turnSignalRef?.current ?? "none";

    wheelSpinRef.current -= delta * 14 * speed;

    // Spin wheels & steer front wheels
    if (wheelsRef.current.fl) {
      wheelsRef.current.fl.rotation.x = wheelSpinRef.current;
      wheelsRef.current.fl.rotation.y = steer;
    }
    if (wheelsRef.current.fr) {
      wheelsRef.current.fr.rotation.x = wheelSpinRef.current;
      wheelsRef.current.fr.rotation.y = steer;
    }
    if (wheelsRef.current.bl) {
      wheelsRef.current.bl.rotation.x = wheelSpinRef.current;
    }
    if (wheelsRef.current.br) {
      wheelsRef.current.br.rotation.x = wheelSpinRef.current;
    }

    // Blinking turn signals (flash at ~3.5Hz)
    const isBlinkOn = Math.sin(clock.elapsedTime * 14) > 0;

    const rightActive = signal === "right" && isBlinkOn;
    if (rightIndicatorFrontRef.current) {
      rightIndicatorFrontRef.current.emissive.set(rightActive ? "#F59E0B" : "#000000");
      rightIndicatorFrontRef.current.emissiveIntensity = rightActive ? 3.0 : 0;
    }
    if (rightIndicatorRearRef.current) {
      rightIndicatorRearRef.current.emissive.set(rightActive ? "#F59E0B" : "#000000");
      rightIndicatorRearRef.current.emissiveIntensity = rightActive ? 3.0 : 0;
    }

    const leftActive = signal === "left" && isBlinkOn;
    if (leftIndicatorFrontRef.current) {
      leftIndicatorFrontRef.current.emissive.set(leftActive ? "#F59E0B" : "#000000");
      leftIndicatorFrontRef.current.emissiveIntensity = leftActive ? 3.0 : 0;
    }
    if (leftIndicatorRearRef.current) {
      leftIndicatorRearRef.current.emissive.set(leftActive ? "#F59E0B" : "#000000");
      leftIndicatorRearRef.current.emissiveIntensity = leftActive ? 3.0 : 0;
    }
  });

  return (
    <group scale={scale}>
      {/* 3D GLTF Vehicle Model */}
      <primitive object={clonedScene} />

      {/* Moroccan Driving School Roof Sign ("L" Auto-École) */}
      {roofSign && (
        <group position={[0, 1.25, 0]}>
          {/* Base aerodynamic sign housing */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.55, 0.28, 0.42]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
          </mesh>

          {/* Red border trim */}
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.57, 0.03, 0.44]} />
            <meshStandardMaterial color="#C1272D" roughness={0.4} />
          </mesh>

          {/* Front Red "L" Learner Badge */}
          <mesh position={[0, 0, 0.22]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshBasicMaterial color="#C1272D" />
          </mesh>
          <mesh position={[-0.03, 0, 0.225]}>
            <planeGeometry args={[0.05, 0.16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.01, -0.055, 0.225]}>
            <planeGeometry args={[0.09, 0.05]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>

          {/* Rear "L" Learner Badge */}
          <mesh position={[0, 0, -0.22]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshBasicMaterial color="#C1272D" />
          </mesh>
          <mesh position={[-0.03, 0, -0.225]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.05, 0.16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.01, -0.055, -0.225]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.09, 0.05]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}

      {/* Right Turn Indicators (Front and Rear) */}
      <mesh position={[0.74, 0.45, 1.15]}>
        <boxGeometry args={[0.06, 0.08, 0.14]} />
        <meshStandardMaterial
          ref={rightIndicatorFrontRef}
          color="#D97706"
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.74, 0.55, -1.22]}>
        <boxGeometry args={[0.06, 0.08, 0.14]} />
        <meshStandardMaterial
          ref={rightIndicatorRearRef}
          color="#D97706"
          roughness={0.2}
        />
      </mesh>

      {/* Left Turn Indicators (Front and Rear) */}
      <mesh position={[-0.74, 0.45, 1.15]}>
        <boxGeometry args={[0.06, 0.08, 0.14]} />
        <meshStandardMaterial
          ref={leftIndicatorFrontRef}
          color="#D97706"
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.74, 0.55, -1.22]}>
        <boxGeometry args={[0.06, 0.08, 0.14]} />
        <meshStandardMaterial
          ref={leftIndicatorRearRef}
          color="#D97706"
          roughness={0.2}
        />
      </mesh>

      {/* Headlight beams */}
      <mesh position={[0.45, 0.48, 1.28]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.45, 0.48, 1.28]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={1.5} />
      </mesh>

      {/* Red Tail lights */}
      <mesh position={[0.5, 0.56, -1.28]}>
        <boxGeometry args={[0.18, 0.1, 0.04]} />
        <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-0.5, 0.56, -1.28]}>
        <boxGeometry args={[0.18, 0.1, 0.04]} />
        <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/car/sedan.glb");
