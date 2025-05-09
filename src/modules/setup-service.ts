// src/modules/setup-service.ts

import { latestVersions, svelteKitWithTailwindSetupSteps } from '../data/setup-instructions.js';

export function getSvelteKitTailwindSetup() {
  return {
    versions: latestVersions,
    steps: svelteKitWithTailwindSetupSteps,
  };
}