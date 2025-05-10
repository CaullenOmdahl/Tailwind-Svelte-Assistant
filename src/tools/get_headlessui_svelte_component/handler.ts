import { getHeadlessUiSvelteComponentByName } from "../../modules/component-service.js";
import { GetHeadlessUiSvelteComponentInputSchema, GetHeadlessUiSvelteComponentOutput } from "./schema.js"; // Corrected type import
import { z } from "zod"; // Added z import for type inference

/**
 * Handler for get_headlessui_svelte_component MCP tool.
 */
export async function handler(
  input: z.infer<typeof GetHeadlessUiSvelteComponentInputSchema> // Used z.infer
): Promise<GetHeadlessUiSvelteComponentOutput> {
  return getHeadlessUiSvelteComponentByName(input.componentName);
}
