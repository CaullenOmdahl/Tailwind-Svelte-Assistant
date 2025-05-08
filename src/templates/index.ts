// Aggregator for Svelte template strings

import fs from "node:fs";
import path from "node:path";

const templatesDir = __dirname;

// Helper to read a template file as a string
function readTemplate(name: string): string {
  return fs.readFileSync(path.join(templatesDir, name), "utf8");
}

export const shadcnButtonSvelte = readTemplate("shadcn-button.svelte");
export const shadcnCardSvelte = readTemplate("shadcn-card.svelte");
export const shadcnAlertSvelte = readTemplate("shadcn-alert.svelte");
export const shadcnDialogSvelte = readTemplate("shadcn-dialog.svelte");
export const HEADLESSUI_MENU_TEMPLATE = readTemplate("headlessui-menu.svelte");
export const HEADLESSUI_DIALOG_TEMPLATE = readTemplate("headlessui-dialog.svelte");
export const HEADLESSUI_SWITCH_TEMPLATE = readTemplate("headlessui-switch.svelte");