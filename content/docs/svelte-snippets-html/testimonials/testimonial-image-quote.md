# Testimonial with Image and Quote - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `testimonial-image-quote.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a single testimonial featuring a company logo, a prominent quote, and author details with an avatar.

## Overview

This component creates a testimonial section designed to highlight a single, impactful quote. It includes:
-   A company logo displayed above the testimonial.
-   The main testimonial quote.
-   An author avatar, name, and title.
-   Decorative background elements (gradients and skewed shapes).

## Original Svelte Component Props

-   `companyLogoSrc: string` (default: Workcation logo SVG)
-   `companyLogoAlt: string` (default: "Workcation")
-   `quote: string` (default: "Lorem ipsum dolor sit amet...")
-   `authorName: string` (default: "Judith Black")
-   `authorTitle: string` (default: "CEO of Workcation")
-   `authorImageUrl: string` (default: Unsplash placeholder avatar)
-   `decorativeGradient: boolean` (default: true) - Toggles visibility of background decorative elements.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-indigo-100` for gradient part)
-   `--theme-text-base` (e.g., `text-gray-900` for quote and author name)
-   `--theme-text-muted` (e.g., `text-gray-600` for author title)
-   `--theme-border-color` (e.g., `ring-indigo-50` for gradient part, `shadow-indigo-600/10` for gradient part)
-   SVG fill for separator dot: `fill-gray-900` (could be `fill-theme-text-base`)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<section class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"> <!-- theme: bg-theme-bg-base -->
  <!-- Decorative Background Elements (shown if decorativeGradient is true) -->
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div> <!-- theme: --color-indigo-100 could be theme-bg-alt -->
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div> <!-- theme: bg-theme-bg-base, shadow-theme-border-color, ring-theme-border-color -->
  
  <div class="mx-auto max-w-2xl lg:max-w-4xl">
    <img class="mx-auto h-12" src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg" alt="Workcation" />
    <figure class="mt-10">
      <blockquote class="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"> <!-- theme: text-theme-text-base -->
        <p>&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.&rdquo;</p>
      </blockquote>
      <figcaption class="mt-10">
        <img class="mx-auto size-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?..." alt="Judith Black avatar" />
        <div class="mt-4 flex items-center justify-center space-x-3 text-base">
          <div class="font-semibold text-gray-900">Judith Black</div> <!-- theme: text-theme-text-base -->
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900"> <!-- theme: fill-theme-text-base -->
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div class="text-gray-600">CEO of Workcation</div> <!-- theme: text-theme-text-muted -->
        </div>
      </figcaption>
    </figure>
  </div>
</section>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all content (logos, quote, author details).
- The `decorativeGradient` prop controls the visibility of the background visual effects.

## CSS Notes
- **Layout:** The content is centered using `mx-auto`. The author details are laid out using Flexbox.
- **Decorative Elements:** Includes complex absolute positioned `div`s with radial gradients, skew transforms, shadows, and rings for background visual effects.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `testimonial-image-quote.svelte` snippet.
