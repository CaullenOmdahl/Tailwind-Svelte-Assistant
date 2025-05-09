// src/tools/get_heroicon/handler.ts
import { getHeroicons } from "../../../modules/component-service.js";
import { GetHeroiconInputSchema, GetHeroiconOutput } from "./schema.js";
import { z } from "zod";

/**
 * Handler for the get_heroicon MCP tool.
 * @param input - Input validated by GetHeroiconInputSchema
 * @returns Promise<GetHeroiconOutput>
 */
export async function handler(
  input: z.infer<typeof GetHeroiconInputSchema>
): Promise<GetHeroiconOutput> {
  return getHeroicons(input.iconName, input.style, input.size);
}