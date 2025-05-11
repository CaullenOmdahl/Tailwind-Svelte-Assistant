# Hero Section with Split Layout (Dark Theme) - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `hero-split-dark.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a hero section with text on the left, an image on the right, on a dark background, with decorative elements.

## Overview

This component creates a hero section designed for a dark theme. It features a split layout:
-   The left side contains a logo, an announcement banner, the main headline, sub-headline, and call-to-action buttons.
-   The right side displays an app screenshot or image.
-   Optional decorative elements include an SVG background pattern and a gradient blur effect.

## Original Svelte Component Props

-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `logoAlt: string` (default: "Your Company")
-   `announcementBadgeText: string` (default: "What's new")
-   `announcementText: string` (default: "Just shipped v1.0")
-   `announcementLinkHref: string` (default: "#")
-   `headline: string` (default: "Deploy to the cloud with confidence")
-   `subHeadline: string` (default: "Anim aute id magna aliqua...")
-   `primaryCtaText: string` (default: "Get started")
-   `primaryCtaLink: string` (default: "#")
-   `secondaryCtaText: string` (default: "Learn more")
-   `secondaryCtaLink: string` (default: "#")
-   `screenshotSrc: string` (default: Tailwind UI dark placeholder image)
-   `screenshotAlt: string` (default: "App screenshot")
-   `showDecorativePattern: boolean` (default: true)
-   `showDecorativeBlur: boolean` (default: true)

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-gray-900`)
-   `--theme-text-base` (e.g., `text-white`)
-   `--theme-text-muted` (e.g., `text-gray-300`, `text-gray-400`)
-   `--theme-primary` (e.g., `text-indigo-400` for badge text, `bg-indigo-500` for button)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-400` for button)
-   `--theme-border-color` (e.g., `ring-indigo-500/20` for badge ring, `ring-white/10` for image ring)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="relative isolate overflow-hidden bg-gray-900"> <!-- theme: bg-theme-bg-base (dark) -->
  <!-- Optional Decorative SVG Pattern -->
  <svg class="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-white/10" aria-hidden="true">
    <defs>
      <pattern id="hero-split-dark-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
        <path d="M.5 200V.5H200" fill="none" />
      </pattern>
    </defs>
    <!-- SVG content for pattern was commented out in original, placeholder rect shown -->
    <rect width="100%" height="100%" stroke-width="0" fill="url(#hero-split-dark-pattern)" />
  </svg>

  <!-- Optional Decorative Gradient Blur -->
  <div class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]" aria-hidden="true">
    <div class="aspect-1108/632 w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
  </div>

  <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
    <!-- Left Column: Text Content -->
    <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
      <img class="h-11" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
      <div class="mt-24 sm:mt-32 lg:mt-16">
        <a href="#" class="inline-flex space-x-6">
          <span class="rounded-full bg-indigo-500/10 px-3 py-1 text-sm/6 font-semibold text-indigo-400 ring-1 ring-indigo-500/20 ring-inset">What's new</span> <!-- theme: bg-theme-primary/10 text-theme-primary ring-theme-border-color -->
          <span class="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300"> <!-- theme: text-theme-text-muted -->
            <span>Just shipped v1.0</span>
            <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <!-- theme: text-theme-text-muted (lighter) -->
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </span>
        </a>
      </div>
      <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">Deploy to the cloud with confidence</h1> <!-- theme: text-theme-text-base (on dark) -->
      <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p> <!-- theme: text-theme-text-muted (on dark) -->
      <div class="mt-10 flex items-center gap-x-6">
        <a href="#" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Get started</a> <!-- theme: primary button (dark theme variant) -->
        <a href="#" class="text-sm/6 font-semibold text-white">Learn more <span aria-hidden="true">&rarr;</span></a> <!-- theme: text-theme-text-base (on dark) -->
      </div>
    </div>
    <!-- Right Column: Screenshot -->
    <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
      <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <img src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" width="2432" height="1442" class="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10" /> <!-- theme: bg-white/5, ring-theme-border-color -->
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all content and toggle decorative elements.
- For static HTML, this content would be hardcoded.

## CSS Notes
- **Dark Theme:** The component is styled with a dark background (`bg-gray-900`) and light text.
- **Layout:** Uses Flexbox and Grid for the two-column layout.
- **Decorative Elements:** Includes optional SVG background pattern (path data was commented out in original, so a placeholder `rect` is shown) and a gradient blur effect with `clip-path`.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `hero-split-dark.svelte` snippet.
