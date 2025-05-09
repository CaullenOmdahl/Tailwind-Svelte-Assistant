// src/tools/index.ts

import {
  GetSveltekitTailwindSetupGuideToolSchema as getSveltekitTailwindSetupGuideToolSchema
} from './get_sveltekit_tailwind_setup_guide/schema.js';
import {
  handler as getSveltekitTailwindSetupGuideHandler
} from './get_sveltekit_tailwind_setup_guide/handler.js';

// --- New tool imports ---
import {
  GetHeadlessUiSvelteComponentToolSchema as getHeadlessUiSvelteComponentToolSchema
} from './get_headlessui_svelte_component/schema.js';
import {
  handler as getHeadlessUiSvelteComponentHandler
} from './get_headlessui_svelte_component/handler.js';

export const tools = {
  get_sveltekit_tailwind_setup_guide: {
    schema: getSveltekitTailwindSetupGuideToolSchema,
    handler: getSveltekitTailwindSetupGuideHandler,
  },
  get_headlessui_svelte_component: {
    schema: getHeadlessUiSvelteComponentToolSchema,
    handler: getHeadlessUiSvelteComponentHandler,
  },
  // ... other tools would go here
};

export const toolDefinitions = [
  getSveltekitTailwindSetupGuideToolSchema,
  getHeadlessUiSvelteComponentToolSchema,
  // ... other tool definitions ...
];