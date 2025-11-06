<!-- Last updated: 2025-11-06T05:40:53.466Z -->
<!--
@description: Feature section with a large screenshot on the left and text content with a list of features on the right, on a dark background. Based on Tailwind UI.
@props:
  accentText: string - Small text above the main title (e.g., "Deploy faster").
  title: string - The main title of the feature section.
  description: string - Introductory paragraph.
  features: Array<{ name: string, description: string, iconPathData: string }> - List of features.
  imageUrl: string - URL for the main image/screenshot.
  imageAlt: string - Alt text for the image.
@theme_vars:
  --theme-bg-base (bg-gray-900 for this dark example)
  --theme-text-base (text-white)
  --theme-text-muted (text-gray-300)
  --theme-primary (text-indigo-400 for accent, text-indigo-500 for icons)
  --theme-border-color (ring-white/10)
  --theme-border-radius-xl (rounded-xl)
-->
<script lang="ts">
  export let accentText: string = "Deploy faster";
  export let title: string = "A better workflow";
  export let description: string = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.";
  export let features: Array<{ name: string, description: string, iconPathData: string }> = [
    {
      name: "Push to deploy.",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      iconPathData: "M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
    },
    {
      name: "SSL certificates.",
      description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
      iconPathData: "M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
    },
    {
      name: "Database backups.",
      description: "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
      iconPathData: "M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234ZM4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
    },
  ];
  export let imageUrl: string = "https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"; // Same image as light version, but context is dark
  export let imageAlt: string = "Product screenshot";
</script>

<div class="overflow-hidden bg-gray-900 py-24 sm:py-32"> {/* Themeable: bg-theme-bg-base (dark variant) */}
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pt-4 lg:pr-8 order-last lg:order-first"> {/* Order changed for image left */}
        <div class="lg:max-w-lg">
          <h2 class="text-base/7 font-semibold text-indigo-400">{accentText}</h2> {/* Themeable: text-theme-primary (darker shade) */}
          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">{title}</p> {/* Themeable: text-theme-text-base (on dark) */}
          <p class="mt-6 text-lg/8 text-gray-300">{description}</p> {/* Themeable: text-theme-text-muted (on dark) */}
          <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none"> {/* Themeable: text-theme-text-muted (on dark) */}
            {#each features as feature}
              <div class="relative pl-9">
                <dt class="inline font-semibold text-white"> {/* Themeable: text-theme-text-base (on dark) */}
                  <svg class="absolute top-1 left-1 size-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable: text-theme-primary */}
                    <path fill-rule="evenodd" d={feature.iconPathData} clip-rule="evenodd" />
                  </svg>
                  {feature.name}
                </dt>
                <dd class="inline"> {feature.description}</dd>
              </div>
            {/each}
          </dl>
        </div>
      </div>
      <img src={imageUrl} alt={imageAlt} class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" /> {/* Themeable: ring-theme-border-color/10 (on dark) */}
    </div>
  </div>
</div>
