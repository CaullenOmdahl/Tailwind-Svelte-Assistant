/**
 * Validate a string of Tailwind CSS classes against a set of valid classes.
 *
 * @param classesString - A string containing Tailwind CSS classes separated by spaces.
 * @param validClassesData - The valid Tailwind CSS class data (from valid_tailwind_classes.json).
 * @returns ValidationOutput containing results for each class and a summary.
 */
export function validateTailwindClasses(classesString, validClassesData // Accepts the full JSON structure
) {
    const classes = classesString.split(/\s+/);
    const results = [];
    // Prepare sets for fast lookup
    const classNamesSet = new Set(validClassesData.classNames || []);
    const utilitiesSet = new Set(Object.keys(validClassesData.utilities || {}));
    const componentsSet = new Set(Object.keys(validClassesData.components || {}));
    const variantsSet = new Set(validClassesData.variants || []);
    for (const className of classes) {
        let isValid = false;
        let variant = null;
        let baseClass = className;
        // Check for variant prefix (e.g., hover:text-blue-500)
        const idx = className.indexOf(":");
        if (idx > 0) {
            variant = className.slice(0, idx);
            baseClass = className.slice(idx + 1);
        }
        // Validate variant if present
        if (variant) {
            if (!variantsSet.has(variant)) {
                results.push({ class: className, isValid: false });
                continue;
            }
        }
        // Validate base class
        if (classNamesSet.has(baseClass) ||
            utilitiesSet.has(baseClass) ||
            componentsSet.has(baseClass)) {
            isValid = true;
        }
        else if (/^\w+-\[[^\]]+\]$/.test(baseClass)) {
            // Allow arbitrary value usage (e.g., text-[12px])
            isValid = true;
        }
        else {
            isValid = false;
        }
        results.push({ class: className, isValid });
    }
    return { results };
}
