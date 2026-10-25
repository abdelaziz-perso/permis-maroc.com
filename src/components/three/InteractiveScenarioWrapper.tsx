"use client";

import React from "react";
import { Scenario3D } from "@/types/models";
import { InteractiveScenario3D } from "./InteractiveScenario3D";

interface Props {
  scenario: Scenario3D;
}

export function InteractiveScenarioWrapper({ scenario }: Props) {
  return <InteractiveScenario3D scenario={scenario} />;
}
