// src/tools/index.ts
import { ValidTailwindClassesData } from "../tailwind-class-validator.js";

import {
  GetSveltekitTailwindSetupGuideToolSchema as getSveltekitTailwindSetupGuideToolSchema
} from './get_sveltekit_tailwind_setup_guide/schema.js';
import {
  handler as getSveltekitTailwindSetupGuideHandler
} from './get_sveltekit_tailwind_setup_guide/handler.js';

import validateTailwindClassesInputSchema from './validate_tailwind_classes/schema.js';
import { 
  handleValidateTailwindClasses 
} from './validate_tailwind_classes/handler.js';


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

// Define a type for the context that some tools might need
export interface ToolContext {
  validTailwindClassesData: ValidTailwindClassesData | null;
  validTailwindClassesLoadError: string | null;
}

// Define a union type for all possible tool names for stricter typing
// This should eventually include all tools mentioned in server.ts
type KnownToolNames = 
  | 'get_sveltekit_tailwind_setup_guide'
  | 'validate_tailwind_classes'
  | 'get_headlessui_svelte_component'
  | 'get_shadcn_ui_svelte_component'
  | 'get_heroicon';
  // TODO: Add other tool names like 'get_documentation_snippet', etc.

export const tools = {
  get_sveltekit_tailwind_setup_guide: {
    schema: getSveltekitTailwindSetupGuideToolSchema,
    handler: getSveltekitTailwindSetupGuideHandler,
  },
  validate_tailwind_classes: {
    schema: validateTailwindClassesInputSchema,
    handler: handleValidateTailwindClasses,
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
  validateTailwindClassesInputSchema, // Added schema
  getHeadlessUiSvelteComponentToolSchema,
  getShadcnUiSvelteComponentToolSchema,
  getHeroiconToolSchema,
  // ... other tool definitions ...
];

// Master handler function
export async function masterHandleToolCall(
  toolName: string, // Keep as string for now, or use KnownToolNames if server.ts can pass it typed
  args: any, // Ideally, this would be parsed against the specific tool's Zod schema first
  context: ToolContext
): Promise<any> {
  const toolDefinition = tools[toolName as KnownToolNames];

  if (!toolDefinition) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  // Type assertion for args based on toolName - this is a simplification
  // A more robust solution would involve Zod parsing before calling this master handler

  if (toolName === 'validate_tailwind_classes') {
    // Explicitly cast args and call with the specific signature
    const specificHandler = toolDefinition.handler as typeof handleValidateTailwindClasses;
    return specificHandler(
      args as { classes_string: string }, // Cast to expected args type
      context.validTailwindClassesData,
      context.validTailwindClassesLoadError
    );
  } else if (toolName === 'get_sveltekit_tailwind_setup_guide' || 
             toolName === 'get_headlessui_svelte_component' ||
             toolName === 'get_shadcn_ui_svelte_component' ||
             toolName === 'get_heroicon') {
    // These handlers expect only 'args' (or 'input')
    const specificHandler = toolDefinition.handler as (inputArgs: any) => Promise<any>;
    return specificHandler(args);
  }
  // TODO: Add cases for other tools as they are implemented and their handler signatures are known
  
  // Fallback or error for unhandled tool types within this master handler
  throw new Error(`Handler logic not implemented for tool: ${toolName}`);
}
