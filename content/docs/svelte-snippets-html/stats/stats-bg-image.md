# Stats Section with Background Image - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `stats-bg-image.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays key metrics with a title, description, and a background image, typically on a dark theme.

## Overview

This component creates a section to showcase key statistics or metrics. It features:
-   A full-bleed background image.
-   A decorative gradient blur effect.
-   An introductory header with accent text, a main title, and a description.
-   A grid displaying several statistics, each with a name and value.
-   Styled for a dark theme, ensuring text readability over the background image.

## Original Svelte Component Props

-   `accentText: string` (default: "Our track record")
-   `title: string` (default: "Trusted by thousands of creators worldwide")
-   `description: string` (default: "Lorem ipsum, dolor sit amet...")
-   `stats: Array<{ name: string, value: string }>` (default: Array of 4 stats)
-   `backgroundImageSrc: string` (default: Unsplash placeholder image)
-   `backgroundImageAlt: string` (default: "Background image of a team working")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-gray-900` for the main container, though image often covers it)
-   `--theme-text-base` (e.g., `text-white` for title and stat values)
-   `--theme-text-muted` (e.g., `text-gray-300` for description, `text-sm/6` for stat names)
-   `--theme-primary-accent` (e.g., `text-indigo-400` for accent text)
-   `--theme-border-color` (e.g., `border-white/10` for stat item left border)
-   Gradient colors for blur: `#ff4694` to `#776fff`

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?..." alt="Background image of a team working" class="absolute inset-0 -z-10 size-full object-cover" />
  
  <!-- Decorative Gradient Blur -->
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <div class="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10" aria-hidden="true">
      <div class="aspect-1266/975 w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>

    <!-- Header Content -->
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
      <h2 class="text-base/8 font-semibold text-indigo-400">Our track record</h2> <!-- theme: text-theme-primary-accent -->
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Trusted by thousands of creators worldwide</p> <!-- theme: text-theme-text-base -->
      <p class="mt-6 text-lg/8 text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.</p> <!-- theme: text-theme-text-muted -->
    </div>

    <!-- Stats Grid -->
    <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"> <!-- theme: text-theme-text-base -->
      <!-- Example Stat Item -->
      <div class="flex flex-col gap-y-3 border-l border-white/10 pl-6"> <!-- theme: border-theme-border-color -->
        <dt class="text-sm/6">Creators on the platform</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight">8,000+</dd>
      </div>
      
      <!-- More stat items would be generated here -->
      <div class="flex flex-col gap-y-3 border-l border-white/10 pl-6">
        <dt class="text-sm/6">Flat platform fee</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight">3%</dd>
      </div>
      <div class="flex flex-col gap-y-3 border-l border-white/10 pl-6">
        <dt class="text-sm/6">Uptime guarantee</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight">99.9%</dd>
      </div>
      <div class="flex flex-col gap-y-3 border-l border-white/10 pl-6">
        <dt class="text-sm/6">Paid out to creators</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight">$70M</dd>
      </div>
    </dl>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate the textual content, statistics, and background image.
- The `stats` array is iterated to create the grid of stat items.

## CSS Notes
- **Background:** A full-bleed background image is used, with a decorative gradient blur positioned to add visual interest.
- **Dark Theme:** Styled for a dark background, ensuring text is light and readable.
- **Layout:** The stats are displayed in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- **Stat Item Styling:** Each stat item has a left border.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `stats-bg-image.svelte` snippet.
