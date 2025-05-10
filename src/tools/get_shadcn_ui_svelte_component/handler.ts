// Handler for get_shadcn_ui_svelte_component MCP tool

import { getShadcnUiSvelteComponentByName } from "../../modules/component-service.js";
import {
  GetShadcnUiSvelteComponentInputSchema,
  GetShadcnUiSvelteComponentOutput,
} from "./schema.js";
import { z } from "zod";

/**
 * Handler for retrieving a shadcn/ui Svelte component by name.
 * @param input - The input object containing the componentName.
 * @returns The ComponentMeta object or undefined.
 */
export async function handler(
  input: z.infer<typeof GetShadcnUiSvelteComponentInputSchema>
): Promise<GetShadcnUiSvelteComponentOutput> {
  return getShadcnUiSvelteComponentByName(input.componentName);
}
