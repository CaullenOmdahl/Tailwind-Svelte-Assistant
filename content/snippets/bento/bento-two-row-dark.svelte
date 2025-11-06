<!-- Last updated: 2025-11-06T05:40:53.460Z -->
<!--
@description: A two-row bento grid layout on a dark background, suitable for showcasing features or grouped content. Based on Tailwind UI.
@props:
  mainTitle: string - The main title above the grid.
  subTitle: string - The subtitle or introductory text (e.g., "Deploy faster").
  items: Array<{ title: string, description: string, subCategory?: string, imageUrl?: string, imageAlt?: string, colSpan?: number, rowSpan?: number, imageClasses?: string, textContainerClasses?: string }> - Data for grid items.
    - colSpan: How many columns the item should span (e.g., 4 in a 6-col grid).
    - rowSpan: (Not used in this specific 2-row example, but could be for more complex bento)
    - imageClasses: e.g., "h-80 object-cover object-left"
    - textContainerClasses: e.g., "p-10"
@theme_vars:
  --theme-bg-base (bg-gray-900 in this dark example)
  --theme-bg-alt (bg-gray-800)
  --theme-text-base (text-white)
  --theme-text-muted (text-gray-400)
  --theme-primary (text-indigo-400)
  --theme-border-color (ring-white/15)
  --theme-border-radius-2xl (rounded-[2rem]) - Note: Tailwind UI uses specific [2rem] rounding.
-->
<script lang="ts">
  export let mainTitle: string = "Everything you need to deploy your app";
  export let subTitle: string = "Deploy faster";

  export let items: Array<{
    title: string;
    description: string;
    subCategory?: string; // e.g., "Releases", "Integrations"
    imageUrl?: string;
    imageAlt?: string;
    colSpan?: number; // In a 6-column grid base for this example
    imageClasses?: string;
    textContainerClasses?: string;
  }> = [
    {
      subCategory: "Releases",
      title: "Push to deploy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus egestas sem pellentesque.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-02-releases.png",
      imageAlt: "Releases illustration",
      colSpan: 4,
      imageClasses: "h-80 object-cover object-left",
    },
    {
      subCategory: "Integrations",
      title: "Connect your favorite tools",
      description: "Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-02-integrations.png",
      imageAlt: "Integrations illustration",
      colSpan: 2,
      imageClasses: "h-80 object-cover",
    },
    {
      subCategory: "Security",
      title: "Advanced access control",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-02-security.png",
      imageAlt: "Security illustration",
      colSpan: 2,
      imageClasses: "h-80 object-cover",
    },
    {
      subCategory: "Performance",
      title: "Lightning-fast builds",
      description: "Sed congue eros non finibus molestie. Vestibulum euismod augue vel commodo vulputate. Maecenas at augue sed elit dictum vulputate.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-02-performance.png",
      imageAlt: "Performance illustration",
      colSpan: 4,
      imageClasses: "h-80 object-cover object-left",
    },
  ];
</script>

<div class="bg-gray-900 py-24 sm:py-32"> {/* Themeable: bg-theme-bg-base */}
  <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    <h2 class="text-base/7 font-semibold text-indigo-400">{subTitle}</h2> {/* Themeable: text-theme-primary */}
    <p class="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">{mainTitle}</p> {/* Themeable: text-theme-text-base */}
    
    <div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
      {#each items as item, i}
        <div class="flex p-px lg:col-span-{item.colSpan || 3}"> {/* Default to 3 if colSpan not provided for a 6-col grid */}
          <div 
            class="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 
                   {i === 0 ? 'max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]' : ''}
                   {i === 1 ? 'lg:rounded-tr-[2rem]' : ''}
                   {i === 2 ? 'lg:rounded-bl-[2rem]' : ''}
                   {i === 3 ? 'max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]' : ''}"
          > {/* Themeable: bg-theme-bg-alt, ring-theme-border. Conditional rounding based on Tailwind UI structure. */}
            {#if item.imageUrl}
              <img class={item.imageClasses || 'h-80 object-cover'} src={item.imageUrl} alt={item.imageAlt || item.title} />
            {/if}
            <div class={item.textContainerClasses || 'p-10'}>
              {#if item.subCategory}
                <h3 class="text-sm/4 font-semibold text-gray-400">{item.subCategory}</h3> {/* Themeable: text-theme-text-muted */}
              {/if}
              <p class="mt-2 text-lg font-medium tracking-tight text-white">{item.title}</p> {/* Themeable: text-theme-text-base */}
              <p class="mt-2 max-w-lg text-sm/6 text-gray-400">{item.description}</p> {/* Themeable: text-theme-text-muted */}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
