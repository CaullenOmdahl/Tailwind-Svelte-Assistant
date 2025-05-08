<script lang="ts">
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
<span class="ml-3 text-sm text-gray-700">{enabled ? 'Enabled' : 'Disabled'}</span>