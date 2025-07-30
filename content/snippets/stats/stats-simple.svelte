<!-- Last updated: 2025-07-30T11:02:12.781Z -->
<!--
@description: A simple stats section displaying key metrics with descriptions. Based on Tailwind UI.
@props:
  stats: Array<{ name: string, value: string }> - Array of stat objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
-->
<script lang="ts">
  export let stats: Array<{ name: string, value: string }> = [
    { name: 'Transactions every 24 hours', value: '44 million' },
    { name: 'Assets under holding', value: '$119 trillion' },
    { name: 'New users annually', value: '46,000' },
  ];
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      {#each stats as stat}
        <div class="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt class="text-base/7 text-gray-600">{stat.name}</dt> {/* Themeable text-theme-text-muted */}
          <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{stat.value}</dd> {/* Themeable text-theme-text-base */}
        </div>
      {/each}
    </dl>
  </div>
</div>
