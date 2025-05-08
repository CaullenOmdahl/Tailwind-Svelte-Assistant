// Handler for validate_tailwind_classes tool
import { validateTailwindClasses } from "../../tailwind-class-validator.js";
export function handleValidateTailwindClasses(args, validTailwindClassesData, validTailwindClassesLoadError) {
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
    }
    catch (err) {
        return {
            error: {
                code: "InternalError",
                message: "Validation failed: " + (err.message || String(err)),
            },
        };
    }
}
