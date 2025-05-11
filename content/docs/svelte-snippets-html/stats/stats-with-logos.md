# Stats Section with Logos - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `stats-with-logos.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays key statistics along with a strip of company logos.

## Overview

This component creates a section to showcase key metrics or statistics, followed by a strip of logos (e.g., trusted partners or clients). It includes a main title and description for the stats.

## Original Svelte Component Props

-   `title: string` (default: "Trusted by creators worldwide")
-   `description: string` (default: "Lorem ipsum dolor sit amet...")
-   `stats: Array<{ id: number, name: string, value: string }>` (default: Array of 4 stats)
-   `logos: Array<{ name: string, src: string, alt: string }>` (default: Array of 5 company logos)

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900` for stat values and title)
-   `--theme-text-muted` (e.g., `text-gray-600` for stat names and description)
-   `--theme-border-color` (e.g., `divide-gray-900/5` - though not directly used for dividers in this version, could be for stat item backgrounds or borders)
-   `--theme-logo-filter` (e.g., `filter-none`, could be `grayscale` or `invert` for theming)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:max-w-none">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Trusted by creators worldwide</h2> <!-- theme: text-theme-text-base -->
        <p class="mt-4 text-lg/8 text-gray-600">Lorem ipsum dolor sit amet consect adipisicing possimus.</p> <!-- theme: text-theme-text-muted -->
      </div>
      
      <!-- Stats Grid -->
      <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
        <!-- Example Stat Item -->
        <div class="flex flex-col bg-gray-400/5 p-8"> <!-- theme: bg-theme-bg-alt/5 or similar -->
          <dt class="text-sm/6 font-semibold text-gray-600">Creators on the platform</dt> <!-- theme: text-theme-text-muted -->
          <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">8,000+</dd> <!-- theme: text-theme-text-base -->
        </div>
        <!-- More stat items (3 more in default) -->
      </dl>
      
      <!-- Logos Strip -->
      <div class="mt-16 flex justify-center">
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-10 lg:gap-x-12">
          <!-- Example Logo Item -->
          <img class="max-h-10 w-auto object-contain filter-none" src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" /> <!-- theme: filter-theme-logo-filter -->
          <!-- More logos -->
        </div>
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses `stats` and `logos` props (arrays of objects) to dynamically generate the statistics and logo strip.
- For static HTML, this content would be hardcoded.

## CSS Notes
- **Layout:** Stats are in a responsive grid. Logos are in a centered, wrapping flex container.
- **Stat Item Styling:** Each stat item has a light background color (`bg-gray-400/5`) and padding.
- **Logo Styling:** Logos use `max-h-10 w-auto object-contain`. The `filter-none` class is applied, which could be changed for theming (e.g., `grayscale`).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `stats-with-logos.svelte` snippet.
