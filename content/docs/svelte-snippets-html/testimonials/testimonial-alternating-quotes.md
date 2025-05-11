# Alternating Testimonial Quotes - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `testimonial-alternating-quotes.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays testimonials in an alternating layout with decorative background elements.

## Overview

This component creates a testimonial section where each testimonial (quote, author name, title, and image) is displayed in an alternating layout (e.g., image left, text right, then image right, text left). It includes decorative background gradients and SVG quote marks.

## Original Svelte Component Props

-   `testimonials: Array<{ quote: string, authorName: string, authorTitle: string, authorImageUrl: string }>` - Array of testimonial objects.
-   `backgroundImageUrl: string` (default: Unsplash placeholder) - Used in the SVG quote mark pattern, not as a full background.
-   `decorativeGradient: boolean` (default: true) - Toggles visibility of background decorative elements.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900` for quote and author name)
-   `--theme-text-muted` (e.g., `text-gray-500` for author title)
-   `--theme-border-color` (e.g., `ring-indigo-50` for image ring, `shadow-indigo-600/10` for image shadow, `stroke-gray-900/10` for SVG quote mark)
-   `--theme-bg-alt` (e.g., `bg-indigo-50` for image background) - Used in the Svelte component for the image.
-   Gradient colors for background blur: `var(--color-indigo-100)` to `white`.

## HTML Structure Example (Conceptual)

This static HTML represents the structure for one testimonial item. The alternating layout is achieved by changing the grid column/row start for the image and text elements.

```html
<section class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"> <!-- theme: bg-theme-bg-base -->
  <!-- Decorative Background Elements -->
  <div class="absolute top-0 left-1/2 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,var(--color-indigo-100),white)] opacity-20"></div>
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center"></div> <!-- theme: shadow-theme-border-color ring-theme-border-color -->

  <div class="relative mx-auto max-w-2xl lg:max-w-4xl">
    <!-- Example Testimonial Item (Image Left) -->
    <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
      <!-- Author Image -->
      <div class="col-end-1 w-16 lg:row-span-4 lg:w-72">
        <img class="rounded-xl bg-indigo-50 lg:rounded-3xl" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?..." alt="Judith Black avatar"> <!-- theme: bg-theme-bg-alt -->
      </div>
      <!-- Quote and Author Details -->
      <div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
        <!-- SVG Quote Mark -->
        <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" class="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"> <!-- theme: stroke-theme-border-color -->
          <path id="quote-svg-path-0" d="M65.5697 118.507L65.8918 118.89C68.9503...L65.5697 118.507Z" />
          <use href="#quote-svg-path-0" x="86" />
        </svg>
        <blockquote class="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"> <!-- theme: text-theme-text-base -->
          <p>Commodo amet fugiat excepteur sunt qui ea elit cupidatat ullamco consectetur ipsum elit consequat...</p>
        </blockquote>
      </div>
      <figcaption class="text-base lg:col-start-1 lg:row-start-3">
        <div class="font-semibold text-gray-900">Judith Black</div> <!-- theme: text-theme-text-base -->
        <div class="mt-1 text-gray-500">CEO of Workcation</div> <!-- theme: text-theme-text-muted -->
      </figcaption>
    </figure>

    <!-- Example Testimonial Item (Image Right - structure would be adjusted) -->
    <!-- 
    <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10 mt-12 sm:mt-16 lg:mt-20">
      <div class="relative col-span-2 lg:col-start-2 lg:row-start-2">
         <svg viewBox="0 0 162 128" ...> ... </svg>
         <blockquote><p>Another great quote...</p></blockquote>
      </div>
      <figcaption class="text-base lg:col-start-2 lg:row-start-3">
        <div class="font-semibold text-gray-900">John Doe</div>
        <div class="mt-1 text-gray-500">Developer at SomeCompany</div>
      </figcaption>
      <div class="col-start-1 col-end-2 row-start-1 w-16 lg:row-span-4 lg:w-72 lg:col-start-1 lg:row-start-1"> <!-- Note: Svelte logic places image on right for odd items -->
         <img class="rounded-xl bg-indigo-50 lg:rounded-3xl" src="..." alt="John Doe avatar">
      </div>
    </figure>
    -->
  </div>
</section>
```

## JavaScript Notes
- The Svelte component iterates through the `testimonials` array.
- The alternating layout (image left/right) is determined by the index (`i % 2 === 0`). The Svelte example provided has a slight structural difference for the "image right" case compared to a simple reordering of identical blocks.
- The `backgroundImageUrl` is used within an SVG pattern for the quote mark, not as a full background image for the section.

## CSS Notes
- **Layout:** Uses CSS Grid for each testimonial item to position the image, quote, and author details. The alternating effect is achieved by changing grid column/row start properties based on the item's index.
- **Decorative Elements:** Includes complex absolute positioned `div`s with skew transforms and gradients for background visual effects. An SVG is used for the large quote marks.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `testimonial-alternating-quotes.svelte` snippet.
