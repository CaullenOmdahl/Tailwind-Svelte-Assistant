// Handler for validate_tailwind_classes tool

import { validateTailwindClasses, ValidTailwindClassesData } from "../../tailwind-class-validator.js";

export function handleValidateTailwindClasses(
  args: { classes_string: string },
  validTailwindClassesData: ValidTailwindClassesData | null,
  validTailwindClassesLoadError: string | null
) {
  if (!validTailwindClassesData) {
    return {
      error: {
        code: "DataUnavailable",
        message: validTailwindClassesLoadError || "Tailwind class data not loaded.",
      },
    };
  }
  try {
    return validateTailwindClasses(args.classes_string, validTailwindClassesData);
  } catch (err: any) {
    return {
      error: {
        code: "InternalError",
        message: "Validation failed: " + (err.message || String(err)),
      },
    };
  }
}