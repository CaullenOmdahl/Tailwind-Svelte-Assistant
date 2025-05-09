import { headlessuiSvelteComponents, type ComponentMeta as HeadlessUiComponentMeta } from "../data/headlessui-svelte-components.js";
import { shadcnUiSvelteComponents, type ComponentMeta as ShadcnComponentMeta } from "../data/shadcn-ui-svelte-components.js";

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