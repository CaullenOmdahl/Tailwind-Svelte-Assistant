// src/tools/get_sveltekit_tailwind_setup_guide/schema.ts
import { z } from "zod";

export const VersionInfoSchema = z.object({
  svelte: z.string(),
  tailwind: z.string(),
});

export const SetupStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
  command: z.string().optional(),
  filePath: z.string().optional(),
  content: z.string().optional(),
  language: z.string().optional(),
  docRef: z.string().optional(),
});

export const GetSveltekitTailwindSetupGuideOutputSchema = z.object({
  versions: VersionInfoSchema,
  steps: z.array(SetupStepSchema),
});

export const GetSveltekitTailwindSetupGuideInputSchema = z.object({}); // No input parameters

export const GetSveltekitTailwindSetupGuideToolSchema = z.object({
  name: z.literal("get_sveltekit_tailwind_setup_guide"),
  description: z.literal(
    "Provides a step-by-step guide for setting up a new SvelteKit project with Tailwind CSS, including latest version information and configuration snippets."
  ),
  inputSchema: z.lazy(() => GetSveltekitTailwindSetupGuideInputSchema),
  outputSchema: z.lazy(() => GetSveltekitTailwindSetupGuideOutputSchema),
});

// Type alias for the output, can be useful for the handler
export type GetSveltekitTailwindSetupGuideOutput = z.infer<typeof GetSveltekitTailwindSetupGuideOutputSchema>;