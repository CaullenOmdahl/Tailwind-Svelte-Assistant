# Feature Section with Image Left (Dark Theme) - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `feature-image-left-dark.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a feature section with an image on the left and textual content on the right, on a dark background.

## Overview

This component creates a feature section suitable for a dark theme. It features a two-column layout where a large image or screenshot is displayed on the left, and the main textual content (accent text, title, description, and a list of features with icons) is on the right.

## Original Svelte Component Props

-   `accentText: string` (default: "Deploy faster")
-   `title: string` (default: "A better workflow")
-   `description: string` (default: "Lorem ipsum, dolor sit amet...")
-   `features: Array<{ name: string, description: string, iconPathData: string }>` - List of features, each with SVG path data.
-   `imageUrl: string` (default: Tailwind UI placeholder image for dark background)
-   `imageAlt: string` (default: "Product screenshot")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-gray-900` for this dark example)
-   `--theme-text-base` (e.g., `text-white`)
-   `--theme-text-muted` (e.g., `text-gray-300`)
-   `--theme-primary` (e.g., `text-indigo-400` for accent, `text-indigo-500` for icons)
-   `--theme-border-color` (e.g., `ring-white/10` for image ring)
-   `--theme-border-radius-xl` (e.g., `rounded-xl` for image)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="overflow-hidden bg-gray-900 py-24 sm:py-32"> <!-- theme: bg-theme-bg-base (dark) -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      
      <!-- Text Content Column (Left on large screens due to lg:order-first) -->
      <div class="lg:pt-4 lg:pr-8 order-last lg:order-first">
        <div class="lg:max-w-lg">
          <h2 class="text-base/7 font-semibold text-indigo-400">Deploy faster</h2> <!-- accentText, theme: text-theme-primary (darker shade) -->
          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">A better workflow</p> <!-- title, theme: text-theme-text-base (on dark) -->
          <p class="mt-6 text-lg/8 text-gray-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p> <!-- description, theme: text-theme-text-muted (on dark) -->
          <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-300 lg:max-w-none"> <!-- theme: text-theme-text-muted (on dark) -->
            
            <!-- Example Feature Item -->
            <div class="relative pl-9">
              <dt class="inline font-semibold text-white"> <!-- theme: text-theme-text-base (on dark) -->
                <svg class="absolute top-1 left-1 size-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <!-- theme: text-theme-primary -->
                  <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
                </svg>
                Push to deploy.
              </dt>
              <dd class="inline"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</dd>
            </div>

            <!-- More feature items would be generated here -->
          </dl>
        </div>
      </div>
      
      <!-- Image Column (Right on large screens) -->
      <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" /> <!-- imageUrl, imageAlt, theme: ring-theme-border-color/10 (on dark), rounded-theme-border-radius-xl -->
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props (`accentText`, `title`, `description`, `features`, `imageUrl`, `imageAlt`) to dynamically populate the section.
- The `features` array is iterated to create the list of feature items, each with an icon.

## CSS Notes
- **Layout:** A two-column grid layout is used (`lg:grid-cols-2`). The visual order of columns is changed on large screens using `order-last lg:order-first` to place the text content on the left and the image on the right.
- **Dark Theme:** The component is styled for a dark background (`bg-gray-900`), with text and icon colors adjusted for contrast (e.g., `text-white`, `text-gray-300`, `text-indigo-400`).
- **Image Styling:** The image has `rounded-xl`, `shadow-xl`, and a `ring-1 ring-white/10`.

This Markdown file provides an HTML structure and class details based on the `feature-image-left-dark.svelte` snippet.
