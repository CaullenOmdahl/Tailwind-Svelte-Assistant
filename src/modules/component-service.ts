import { headlessuiSvelteComponents, type ComponentMeta as HeadlessUiComponentMeta } from "../data/headlessui-svelte-components.js";
import { shadcnUiSvelteComponents, type ComponentMeta as ShadcnComponentMeta } from "../data/shadcn-ui-svelte-components.js";
import { heroiconsData, type IconMeta } from "../data/heroicons-data.js";

/**
 * Retrieves a Headless UI Svelte component by name (case-insensitive).
 * @param name The name of the component to retrieve.
 * @returns The ComponentMeta if found, otherwise undefined.
 */
export function getHeadlessUiSvelteComponentByName(name: string): HeadlessUiComponentMeta | undefined {
  const lower = name.trim().toLowerCase();
  return headlessuiSvelteComponents.find(
    (c) => c.name.trim().toLowerCase() === lower
  );
}

/**
 * Retrieves a shadcn/ui Svelte component by name (case-insensitive).
 * @param name The name of the component to retrieve.
 * @returns The ComponentMeta if found, otherwise undefined.
 */
export function getShadcnUiSvelteComponentByName(name: string): ShadcnComponentMeta | undefined {
  const lower = name.trim().toLowerCase();
  return shadcnUiSvelteComponents.find(
    (c) => c.name.trim().toLowerCase() === lower
  );
}

/**
 * Retrieves Heroicons by name, style, and size.
 * @param iconName The name of the Heroicon to retrieve (case-insensitive).
 * @param style Optional: "outline" | "solid". If omitted, returns all styles.
 * @param size Optional: currently only 24 is supported.
 * @returns Array of matching IconMeta objects.
 */
export function getHeroicons(
  iconName: string,
  style?: "outline" | "solid",
  size?: 24
): IconMeta[] {
  const lower = iconName.trim().toLowerCase();
  let results = heroiconsData.filter(
    (icon) => icon.name.trim().toLowerCase() === lower
  );
  if (style) {
    results = results.filter((icon) => icon.style === style);
  }
  // Only size 24 is supported for now; future-proofing for additional sizes.
  if (size && size !== 24) {
    return [];
  }
  return results;
}