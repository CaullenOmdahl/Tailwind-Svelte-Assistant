import { headlessuiSvelteComponents, type ComponentMeta } from "../data/headlessui-svelte-components.js";

/**
 * Retrieves a Headless UI Svelte component by name (case-insensitive).
 * @param name The name of the component to retrieve.
 * @returns The ComponentMeta if found, otherwise undefined.
 */
export function getHeadlessUiSvelteComponentByName(name: string): ComponentMeta | undefined {
  const lower = name.trim().toLowerCase();
  return headlessuiSvelteComponents.find(
    (c) => c.name.trim().toLowerCase() === lower
  );
}