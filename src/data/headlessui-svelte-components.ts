// Headless UI Svelte component metadata

export interface PropMeta {
  name: string;
  type: string;
  defaultValue?: any;
  description?: string;
}

export interface SlotMeta {
  name?: string;
  description?: string;
  props?: Record<string, string>;
}

export interface ComponentMeta {
  name: string;
  type: "headlessui-svelte";
  sourceFilePath: string;
  code: string;
  props: PropMeta[];
  slots: SlotMeta[];
  description?: string;
}

export const headlessuiSvelteComponents: ComponentMeta[] = [
  {
    name: "Menu",
    type: "headlessui-svelte",
    sourceFilePath: "src/templates/headlessui-menu.svelte",
    code: `<script lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/svelte';
  // State is managed internally by Headless UI
  const disabled: boolean = true;
</script>

<Menu as="div" class="relative inline-block text-left">
  <div>
    <MenuButton class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
      Options
      <!-- Heroicon: chevron-down -->
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </MenuButton>
  </div>

  <!-- Use Transition component if available/desired -->
  <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div class="py-1">
      <MenuItem let:active>
        <a href="#account-settings" class="{active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm">Account settings</a>
      </MenuItem>
      <MenuItem let:active>
        <button type="button" class="{active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm {disabled ? 'opacity-50 cursor-not-allowed' : ''}" disabled={disabled}>
          Support (Disabled)
        </button>
      </MenuItem>
      <!-- Add more menu items as needed -->
    </div>
  </MenuItems>
</Menu>`,
    props: [],
    slots: [],
    description: "A dropdown menu component using Headless UI for Svelte. State is managed internally by Headless UI. No custom props or slots."
  },
  {
    name: "Dialog",
    type: "headlessui-svelte",
    sourceFilePath: "src/templates/headlessui-dialog.svelte",
    code: `<script lang="ts">
  import { Dialog } from '@headlessui/svelte';
  let isOpen: boolean = false;
</script>

<button
  class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  on:click={() => isOpen = true}
>
  Open Dialog
</button>

<Dialog open={isOpen} on:close={() => isOpen = false} class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <Dialog.Overlay class="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6 z-20">
      <Dialog.Title class="text-lg font-medium text-gray-900">Modal Title</Dialog.Title>
      <Dialog.Description class="mt-2 text-sm text-gray-500">
        This is a modal dialog using Headless UI and Tailwind CSS.
      </Dialog.Description>
      <!-- Modal content goes here -->
      <div class="mt-4 flex justify-end">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
          on:click={() => isOpen = false}
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          on:click={() => isOpen = false}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</Dialog>`,
    props: [],
    slots: [],
    description: "A modal dialog component using Headless UI for Svelte. State is managed locally. No custom props or slots."
  },
  {
    name: "Switch",
    type: "headlessui-svelte",
    sourceFilePath: "src/templates/headlessui-switch.svelte",
    code: `<script lang="ts">
  import { Switch } from '@headlessui/svelte';
  let enabled: boolean = false;
</script>

<Switch
  checked={enabled}
  on:change={() => enabled = !enabled}
  class="{enabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
  <span class="sr-only">Enable notifications</span>
  <span
    class="{enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform"
  />
</Switch>
<!-- Optionally display state -->
<span class="ml-3 text-sm text-gray-700">{enabled ? 'Enabled' : 'Disabled'}</span>`,
    props: [],
    slots: [],
    description: "A toggle switch component using Headless UI for Svelte. State is managed locally. No custom props or slots."
  }
];