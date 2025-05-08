<script lang="ts">
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
</Dialog>