<!-- Last updated: 2025-11-06T05:40:53.471Z -->
<!--
@description: A stats section with a title, description, key metrics, and a strip of company logos. Based on Tailwind UI.
@props:
  title: string - Main title for the stats section.
  description: string - Introductory paragraph.
  stats: Array<{ id: number, name: string, value: string }> - Array of stat objects.
  logos: Array<{ name: string, src: string, alt: string }> - Array of company logo objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-border-color (divide-gray-900/5)
  --theme-logo-filter (filter-none, can be used for grayscale or color inversion for dark mode)
-->
<script lang="ts">
  export let title: string = "Trusted by creators worldwide";
  export let description: string = "Lorem ipsum dolor sit amet consect adipisicing possimus.";
  
  export let stats: Array<{ id: number, name: string, value: string }> = [
    { id: 1, name: 'Creators on the platform', value: '8,000+' },
    { id: 2, name: 'Flat platform fee', value: '3%' },
    { id: 3, name: 'Uptime guarantee', value: '99.9%' },
    { id: 4, name: 'Paid out to creators', value: '$70M' },
  ];

  export let logos: Array<{ name: string, src: string, alt: string }> = [
    { name: 'Transistor', src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg', alt: 'Transistor' },
    { name: 'Tuple', src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg', alt: 'Tuple' },
    { name: 'StaticKit', src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/statickit-logo-gray-900.svg', alt: 'StaticKit' },
    { name: 'Mirage', src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/mirage-logo-gray-900.svg', alt: 'Mirage' },
    { name: 'Laravel', src: 'https://tailwindcss.com/plus-assets/img/logos/158x48/laravel-logo-gray-900.svg', alt: 'Laravel' },
  ];
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:max-w-none">
      <div class="text-center">
        <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
        <p class="mt-4 text-lg/8 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
      </div>
      <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        {#each stats as stat}
          <div class="flex flex-col bg-gray-400/5 p-8"> {/* Themeable bg-theme-bg-alt/5 or similar */}
            <dt class="text-sm/6 font-semibold text-gray-600">{stat.name}</dt> {/* Themeable text-theme-text-muted */}
            <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd> {/* Themeable text-theme-text-base */}
          </div>
        {/each}
      </dl>
      <div class="mt-16 flex justify-center">
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-10 lg:gap-x-12">
          {#each logos as logo}
            <img class="max-h-10 w-auto object-contain filter-none" src={logo.src} alt={logo.alt} /> {/* Themeable filter-theme-logo-filter */}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
