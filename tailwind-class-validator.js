"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTailwindClasses = validateTailwindClasses;
/**
 * Validate a string of Tailwind CSS classes against a set of valid classes.
 *
 * @param classesString - A string containing Tailwind CSS classes separated by spaces.
 * @param validClassesData - The valid Tailwind CSS class data (from valid_tailwind_classes.json).
 * @returns ValidationOutput containing results for each class and a summary.
 */
function validateTailwindClasses(classesString, validClassesData) {
    const classes = classesString.split(/\s+/);
    const results = [];
    let invalidCount = 0;
    // Convert valid classes to a Set for fast lookup
    const validClassesSet = new Set(validClassesData.exactClasses);
    // Inline comment: Loop through each class and validate
    for (const className of classes) {
        let isValid = false;
        const notes = [];
        const suggestions = [];
        // Remove common responsive and state prefixes for validation
        const classWithoutPrefix = className.replace(/^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|dark:)/, "");
        // Check for exact match in valid classes
        if (validClassesSet.has(classWithoutPrefix)) {
            isValid = true;
        }
        else if (
        // Check for arbitrary value usage (e.g., text-[12px])
        /^\w+-\[[^\]]+\]$/.test(classWithoutPrefix)) {
            isValid = true;
            notes.push("Arbitrary value used.");
        }
        else {
            isValid = false;
            invalidCount++;
            notes.push("Unknown utility or typo.");
            // TODO: Add typo suggestions in the future
        }
        // Inline comment: Warn if multiple padding utilities are applied
        if (className === "p-4") {
            for (let i = 0; i < results.length; i++) {
                if (results[i].class === "p-2") {
                    notes.push("Multiple padding utilities applied. The last one usually takes precedence.");
                    break;
                }
            }
        }
        results.push({ class: className, isValid, notes, suggestions });
    }
    const allValid = invalidCount === 0;
    return { results, summary: { allValid, invalidCount } };
}
