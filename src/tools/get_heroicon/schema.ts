// src/tools/get_heroicon/schema.ts
import { z } from "zod";

export const IconMetaSchema = z.object({
  name: z.string(),
  style: z.enum(["outline", "solid"]),
  svgContent: z.string(),
  sourceFilePath: z.string(),
  size: z.literal(24),
  type: z.literal("heroicon-svg"),
});

export const GetHeroiconInputSchema = z.object({
  iconName: z.string().describe("The name of the Heroicon to retrieve (e.g., 'arrow-left')."),
  style: z.enum(["outline", "solid"]).optional().describe("Specify 'outline' or 'solid'. If omitted, both styles are returned if available."),
  size: z.literal(24).optional().describe("Specify icon size. Currently only 24 is supported."),
});

export const GetHeroiconOutputSchema = z.array(IconMetaSchema);

export const GetHeroiconToolSchema = z.object({
  name: z.literal("get_heroicon"),
  description: z.string().describe("Retrieves Heroicon SVG data and metadata by name, style, and size."),
  inputSchema: z.lazy(() => GetHeroiconInputSchema),
  outputSchema: z.lazy(() => GetHeroiconOutputSchema),
});

export type GetHeroiconOutput = z.infer<typeof GetHeroiconOutputSchema>;