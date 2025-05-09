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

import {
  GetShadcnUiSvelteComponentToolSchema as getShadcnUiSvelteComponentToolSchema
} from './get_shadcn_ui_svelte_component/schema.js';
import {
  handler as getShadcnUiSvelteComponentHandler
} from './get_shadcn_ui_svelte_component/handler.js';

import {
  GetHeroiconToolSchema as getHeroiconToolSchema
} from './get_heroicon/schema.js';
import {
  handler as getHeroiconHandler
} from './get_heroicon/handler.js';

export const tools = {
  get_sveltekit_tailwind_setup_guide: {
    schema: getSveltekitTailwindSetupGuideToolSchema,
    handler: getSveltekitTailwindSetupGuideHandler,
  },
  get_headlessui_svelte_component: {
    schema: getHeadlessUiSvelteComponentToolSchema,
    handler: getHeadlessUiSvelteComponentHandler,
  },
  get_shadcn_ui_svelte_component: {
    schema: getShadcnUiSvelteComponentToolSchema,
    handler: getShadcnUiSvelteComponentHandler,
  },
  get_heroicon: {
    schema: getHeroiconToolSchema,
    handler: getHeroiconHandler,
  },
  // ... other tools would go here
};

export const toolDefinitions = [
  getSveltekitTailwindSetupGuideToolSchema,
  getHeadlessUiSvelteComponentToolSchema,
  getShadcnUiSvelteComponentToolSchema,
  getHeroiconToolSchema,
  // ... other tool definitions ...
];