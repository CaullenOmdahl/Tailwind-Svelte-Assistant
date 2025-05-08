<script lang="ts">
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
</Menu>