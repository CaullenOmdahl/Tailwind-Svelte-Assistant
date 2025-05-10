// src/tools/get_sveltekit_tailwind_setup_guide/handler.ts
import { getSvelteKitTailwindSetup } from "../../modules/setup-service.js";
import {
  GetSveltekitTailwindSetupGuideInputSchema,
  type GetSveltekitTailwindSetupGuideOutput
} from "./schema.js";
import { z } from "zod";

export async function handler(
  input: z.infer<typeof GetSveltekitTailwindSetupGuideInputSchema>
): Promise<GetSveltekitTailwindSetupGuideOutput> {
  // Input is empty for this tool, but good practice to include it
  console.log("Handling get_sveltekit_tailwind_setup_guide request with input:", input);
  const setupGuide = await getSvelteKitTailwindSetup();
  return setupGuide;
}
