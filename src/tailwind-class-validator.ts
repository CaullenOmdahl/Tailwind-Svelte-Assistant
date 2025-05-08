/**
 * Represents the result of validating a single Tailwind CSS class.
 */
export interface ValidationResult {
  class: string;
  isValid: boolean;
  notes: string[];
  suggestions?: string[];
}

/**
 * Represents the output of validating a string of Tailwind CSS classes.
 */
export interface ValidationOutput {
  results: ValidationResult[];
  summary: {
    allValid: boolean;
    invalidCount: number;
  };
}

/**
 * Valid Tailwind CSS class data structure.
 */
export interface ValidTailwindClassesData {
  exactClasses: string[];
  arbitraryValueStems: string[];
  responsivePrefixes: string[];
  statePrefixes: string[];
  colorNames: string[];
  colorShades: string[];
}

/**
 * Validate a string of Tailwind CSS classes against a set of valid classes.
 *
 * @param classesString - A string containing Tailwind CSS classes separated by spaces.
 * @param validClassesData - The valid Tailwind CSS class data (from valid_tailwind_classes.json).
 * @returns ValidationOutput containing results for each class and a summary.
 */
export function validateTailwindClasses(
  classesString: string,
  validClassesData: any // Accepts the full JSON structure
): { results: { class: string; isValid: boolean }[] } {
  const classes = classesString.split(/\s+/);
  const results: { class: string; isValid: boolean }[] = [];

  // Prepare sets for fast lookup
  const classNamesSet = new Set(validClassesData.classNames || []);
  const utilitiesSet = new Set(Object.keys(validClassesData.utilities || {}));
  const componentsSet = new Set(Object.keys(validClassesData.components || {}));
  const variantsSet = new Set(validClassesData.variants || []);

  for (const className of classes) {
    let isValid = false;
    let variant: string | null = null;
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
    if (
      classNamesSet.has(baseClass) ||
      utilitiesSet.has(baseClass) ||
      componentsSet.has(baseClass)
    ) {
      isValid = true;
    } else if (/^\w+-\[[^\]]+\]$/.test(baseClass)) {
      // Allow arbitrary value usage (e.g., text-[12px])
      isValid = true;
    } else {
      isValid = false;
    }

    results.push({ class: className, isValid });
  }

  return { results };
}