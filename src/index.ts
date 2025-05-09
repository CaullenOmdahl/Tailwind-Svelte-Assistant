// src/index.ts

import { getSvelteKitTailwindSetup } from './modules/setup-service.js';

const setupData = getSvelteKitTailwindSetup();

console.log("MCP Server Initialized. Svelte Version:", setupData.versions.svelte);
console.log("Number of setup steps:", setupData.steps.length);