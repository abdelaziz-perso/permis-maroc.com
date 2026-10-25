import * as THREE from "three";

/**
 * Learner-car lap around the roundabout diorama, fully road-bound.
 * Narrative: westbound approach -> yield bars -> counter-clockwise ring ->
 * south exit -> U-turn at the south end -> northbound on the east lane ->
 * ring re-entry -> east exit -> hairpin at the east edge -> merge back westbound.
 * Control points are in the road centre-lines (verified against RoadNetwork /
 * createRoundabout geometry: east-west band z in [-1.5, 1.7], south road
 * x in [-2.4, 0.8], roundabout ring r in [1.25, 2.75]).
 */
export const CAR_PATH: ReadonlyArray<readonly [number, number]> = [
  [7.2, 0.85], // u 0.000 - START marking, westbound approach
  [4.8, 0.85], // u 0.065
  [2.6, 0.82], // u 0.126 - give-way stop bars
  [1.55, 0.2], // u 0.162 - ring entry
  [0.0, -1.95], // u 0.236 - ring north
  [-1.95, -0.2], // u 0.310 - ring west
  [-1.42, 1.35], // u 0.356 - ring south-west, exit approach
  [-1.68, 2.6], // u 0.392 - south road, right (west) lane, southbound
  [-1.6, 5.05], // u 0.458 - cruising the south road
  [-1.3, 6.95], // u 0.511 - entering the U-turn
  [-0.38, 7.4], // u 0.540 - U-turn apex
  [0.0, 5.7], // u 0.589 - northbound, east lane (right-hand rule)
  [0.12, 2.75], // u 0.669 - closing on the roundabout
  [0.62, 1.6], // u 0.704 - ring re-entry
  [2.25, -0.72], // u 0.782 - ring east, exit approach
  [4.7, -0.68], // u 0.850 - eastbound, north lane
  [7.55, -0.66], // u 0.928
  [8.3, -0.05], // u 0.955 - hairpin entry
  [8.05, 0.62], // u 0.976 - hairpin end, back onto the approach lane
];

export function buildCarCurve(y = 0.05): THREE.CatmullRomCurve3 {
  const points = CAR_PATH.map(([x, z]) => new THREE.Vector3(x, y, z));
  return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
}

// u windows derived from arc-length landmarks of CAR_PATH above.
export const CAR_SPEED_WINDOWS: ReadonlyArray<{
  from: number;
  to: number;
  factor: number;
  label: string;
}> = [
  { from: 0.09, to: 0.175, factor: 0.5, label: "yield / give way" },
  { from: 0.175, to: 0.4, factor: 0.85, label: "roundabout cruise" },
  { from: 0.4, to: 0.505, factor: 1.35, label: "exit acceleration" },
  { from: 0.505, to: 0.575, factor: 0.5, label: "U-turn crawl" },
  { from: 0.575, to: 0.795, factor: 1.3, label: "return + east exit" },
  { from: 0.795, to: 0.93, factor: 1.4, label: "eastbound straight" },
  { from: 0.93, to: 1.0, factor: 0.55, label: "final hairpin" },
];

export const CAR_SIGNAL_WINDOWS: ReadonlyArray<{
  from: number;
  to: number;
  dir: "left" | "right";
  label: string;
}> = [
  { from: 0.3, to: 0.45, dir: "right", label: "right before south exit" },
  { from: 0.485, to: 0.6, dir: "left", label: "U-turn at south end" },
  { from: 0.68, to: 0.81, dir: "right", label: "right before east exit" },
  { from: 0.91, to: 0.99, dir: "left", label: "hairpin at east edge" },
];

export function carSpeedFactor(u: number): number {
  const w = CAR_SPEED_WINDOWS.find((w) => u >= w.from && u <= w.to);
  return w ? w.factor : 1.0;
}

export function carTurnSignal(u: number): "none" | "left" | "right" {
  const w = CAR_SIGNAL_WINDOWS.find((w) => u >= w.from && u <= w.to);
  return w ? w.dir : "none";
}
