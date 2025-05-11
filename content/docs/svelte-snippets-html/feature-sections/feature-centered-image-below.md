# Feature Section with Centered Image Below - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `feature-centered-image-below.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a feature section with centered text, an image below, and a grid of features.

## Overview

This component creates a feature section that includes:
-   Centered introductory text (accent text, main title, description).
-   A prominent app screenshot or image displayed below the introductory text, with an optional decorative gradient effect.
-   A grid of individual features, each with an icon, name, and description.

## Original Svelte Component Props

-   `accentText: string` (default: "Everything you need")
-   `title: string` (default: "No server? No problem.")
-   `description: string` (default: "Lorem ipsum, dolor sit amet...")
-   `imageUrl: string` (default: Tailwind UI placeholder image)
-   `imageAlt: string` (default: "App screenshot")
-   `features: Array<{ name: string, description: string, iconPathData: string }>` - List of features, each with SVG path data for an icon.
-   `showDecorativeGradient: boolean` (default: true) - Toggles a decorative gradient behind/below the image.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-primary` (e.g., `text-indigo-600` for accent text and feature icons)
-   `--theme-border-color` (e.g., `ring-gray-900/10` for image ring)
-   `--theme-border-radius-xl` (e.g., `rounded-xl` for image)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <!-- Introductory Text -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-base/7 font-semibold text-indigo-600">Everything you need</h2> <!-- accentText, theme: text-theme-primary -->
      <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">No server? No problem.</p> <!-- title, theme: text-theme-text-base -->
      <p class="mt-6 text-lg/8 text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis.</p> <!-- description, theme: text-theme-text-muted -->
    </div>
  </div>

  <!-- Image Section with Optional Decorative Gradient -->
  <div class="relative overflow-hidden pt-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <img src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png" alt="App screenshot" class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10" width="2432" height="1442" /> <!-- imageUrl, imageAlt, theme: ring-theme-border-color, rounded-theme-border-radius-xl -->
      <div class="relative" aria-hidden="true">
        <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]"></div> <!-- theme: from-theme-bg-base -->
      </div>
    </div>
  </div>

  <!-- Features Grid -->
  <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
    <dl class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"> <!-- theme: text-theme-text-muted -->
      
      <!-- Example Feature Item -->
      <div class="relative pl-9">
        <dt class="inline font-semibold text-gray-900"> <!-- theme: text-theme-text-base -->
          <svg class="absolute top-1 left-1 size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <!-- theme: text-theme-primary -->
            <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
          </svg>
          Push to deploy.
        </dt>
        <dd class="inline"> Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.</dd>
      </div>

      <!-- More feature items would be generated here by the Svelte #each block -->
    </dl>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props (`accentText`, `title`, `description`, `imageUrl`, `features`) to dynamically populate the section.
- The `features` array is iterated to create the grid of feature items, each with an icon (defined by `iconPathData`), name, and description.
- The `showDecorativeGradient` prop controls the visibility of the gradient effect under the image.

## CSS Notes
- **Layout:** The section uses centered text for the header, followed by the image, and then a responsive grid for features (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- **Image Styling:** The main image has a negative bottom margin (`mb-[-12%]`) to create an overlap effect with the decorative gradient. It also includes `rounded-xl`, `shadow-2xl`, and `ring-1 ring-gray-900/10`.
- **Decorative Gradient:** A `div` with `bg-gradient-to-t` is positioned absolutely to create a fading effect from the background color, enhancing the image presentation.
- **Feature Icons:** SVGs are used for feature icons, with their `d` attribute for the path data coming from the `features` prop.

This Markdown file provides an HTML structure and class details based on the `feature-centered-image-below.svelte` snippet.
