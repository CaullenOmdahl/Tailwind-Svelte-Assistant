<!-- Last updated: 2025-12-01T02:47:34.663Z -->
<!--
@description: A stats section with a title, description, key metrics, and a background image. Dark themed. Based on Tailwind UI.
@props:
  accentText: string - Small text above the main title.
  title: string - Main title for the stats section.
  description: string - Introductory paragraph.
  stats: Array<{ name: string, value: string }> - Array of stat objects.
  backgroundImageSrc: string - URL for the background image.
  backgroundImageAlt: string - Alt text for the background image.
@theme_vars:
  --theme-bg-base (bg-gray-900 for this dark example)
  --theme-text-base (text-white)
  --theme-text-muted (text-gray-300)
  --theme-primary-accent (text-indigo-400)
  --theme-border-color (border-white/10)
-->
<script lang="ts">
  export let accentText: string = "Our track record";
  export let title: string = "Trusted by thousands of creators worldwide";
  export let description: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.";
  
  export let stats: Array<{ name: string, value: string }> = [
    { name: 'Creators on the platform', value: '8,000+' },
    { name: 'Flat platform fee', value: '3%' },
    { name: 'Uptime guarantee', value: '99.9%' },
    { name: 'Paid out to creators', value: '$70M' },
  ];

  export let backgroundImageUrl: string = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15";
  export let backgroundImageAlt: string = "Background image of a team working";
</script>

<div class="relative isolate overflow-hidden bg-theme-bg-base py-24 sm:py-32">
  <img src={backgroundImageUrl} alt={backgroundImageAlt} class="absolute inset-0 -z-10 size-full object-cover">
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <div class="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10" aria-hidden="true">
      <div class="aspect-1266/975 w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
      <h2 class="text-base/8 font-semibold text-indigo-400">{accentText}</h2> {/* Themeable text-theme-primary-accent */}
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">{title}</p> {/* Themeable text-theme-text-base */}
      <p class="mt-6 text-lg/8 text-gray-300">{description}</p> {/* Themeable text-theme-text-muted */}
    </div>
    <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"> {/* Themeable text-theme-text-base */}
      {#each stats as stat}
        <div class="flex flex-col gap-y-3 border-l border-white/10 pl-6"> {/* Themeable border-theme-border-color */}
          <dt class="text-sm/6">{stat.name}</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
        </div>
      {/each}
    </dl>
  </div>
</div>
