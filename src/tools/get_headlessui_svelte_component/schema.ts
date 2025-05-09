import { z } from "zod";

export const PropMetaSchema = z.object({
  name: z.string(),
  type: z.string(),
  defaultValue: z.any().optional(),
  description: z.string().optional(),
});

export const SlotMetaSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  props: z.record(z.string()).optional(),
});

export const ComponentMetaSchema = z.object({
  name: z.string(),
  type: z.literal("headlessui-svelte"),
  sourceFilePath: z.string(),
  code: z.string(),
  props: z.array(PropMetaSchema),
  slots: z.array(SlotMetaSchema),
  description: z.string().optional(),
});

export const GetHeadlessUiSvelteComponentInputSchema = z.object({
  componentName: z.string().describe("The name of the Headless UI Svelte component to retrieve."),
});

export const GetHeadlessUiSvelteComponentOutputSchema = ComponentMetaSchema.optional();

export const GetHeadlessUiSvelteComponentToolSchema = z.object({
  name: z.literal("get_headlessui_svelte_component"),
  description: z.string().describe("Retrieves a Headless UI Svelte component template and its metadata."), // Added description
  inputSchema: z.lazy(() => GetHeadlessUiSvelteComponentInputSchema),
  outputSchema: z.lazy(() => GetHeadlessUiSvelteComponentOutputSchema),
});

export type GetHeadlessUiSvelteComponentOutput = z.infer<typeof GetHeadlessUiSvelteComponentOutputSchema>;