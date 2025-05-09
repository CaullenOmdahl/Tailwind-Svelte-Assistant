// src/tools/index.ts

import {
  GetSveltekitTailwindSetupGuideToolSchema as getSveltekitTailwindSetupGuideToolSchema
} from './get_sveltekit_tailwind_setup_guide/schema.js';
import {
  handler as getSveltekitTailwindSetupGuideHandler
} from './get_sveltekit_tailwind_setup_guide/handler.js';

export const tools = {
  get_sveltekit_tailwind_setup_guide: {
    schema: getSveltekitTailwindSetupGuideToolSchema,
    handler: getSveltekitTailwindSetupGuideHandler,
  },
  // ... other tools would go here
};

export const toolDefinitions = [getSveltekitTailwindSetupGuideToolSchema];