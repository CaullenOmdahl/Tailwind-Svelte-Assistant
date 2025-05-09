// Zod schemas for shadcn/ui Svelte component MCP tool

import { z } from "zod";

// PropMeta schema
export const ShadcnPropMetaSchema = z.object({
  name: z.string(),
  type: z.string(),
  defaultValue: z.any().optional(),
  description: z.string().optional(),
});

// SlotMeta schema
export const ShadcnSlotMetaSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  props: z.record(z.string()).optional(),
});

// RelatedFile schema
export const ShadcnRelatedFileSchema = z.object({
  path: z.string(),
  content: z.string(),
  language: z.string(),
});

// Enhanced ComponentMeta schema
export const ShadcnComponentMetaSchema = z.object({
  name: z.string(),
  type: z.literal("shadcn-ui-svelte"),
  sourceFilePath: z.string(),
  code: z.string(),
  props: z.array(ShadcnPropMetaSchema),
  slots: z.array(ShadcnSlotMetaSchema),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  relatedFiles: z.array(ShadcnRelatedFileSchema).optional(),
});

// Input schema
export const GetShadcnUiSvelteComponentInputSchema = z.object({
  componentName: z.string().describe("The name of the shadcn/ui Svelte component to retrieve."),
});

// Output schema
export const GetShadcnUiSvelteComponentOutputSchema = ShadcnComponentMetaSchema.optional();

// Tool schema
export const GetShadcnUiSvelteComponentToolSchema = z.object({
  name: z.literal("get_shadcn_ui_svelte_component"),
  description: z.string().describe(
    "Retrieves a shadcn/ui Svelte component template, its metadata, dependencies, and related files."
  ),
  inputSchema: z.lazy(() => GetShadcnUiSvelteComponentInputSchema),
  outputSchema: z.lazy(() => GetShadcnUiSvelteComponentOutputSchema),
});

// Output type alias
export type GetShadcnUiSvelteComponentOutput = z.infer<typeof GetShadcnUiSvelteComponentOutputSchema>;