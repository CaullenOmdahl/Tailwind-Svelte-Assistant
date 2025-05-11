# Testimonial with Logo, Quote, and Background Image - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `testimonial-logo-quote-bg-image.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a testimonial with a company logo, quote, author details, all overlaid on a background image.

## Overview

This component creates a visually rich testimonial section. It features:
-   A full-width background image for the section.
-   A distinct box (typically dark) containing the testimonial content.
-   The author's image positioned to overlap the testimonial box and the background.
-   A company logo (optional, though not explicitly shown in the Svelte template's visual output but present in props).
-   A prominent quote with decorative SVG quote marks.
-   Author's name and title.

## Original Svelte Component Props

-   `companyLogoSrc: string` (default: Workcation white logo SVG) - *Note: This prop is defined but not used in the provided Svelte template's visual output area for the logo itself, though it might be intended for other uses or was part of an earlier version.*
-   `companyLogoAlt: string` (default: "Workcation")
-   `quote: string` (default: "Gravida quam mi erat tortor...")
-   `authorName: string` (default: "Judith Black")
-   `authorTitle: string` (default: "CEO of Workcation")
-   `authorImageUrl: string` (default: Unsplash placeholder avatar) - This is the image used for the background in the Svelte example.
-   `backgroundImageUrl: string` (default: Unsplash placeholder, same as author for example) - This is the image used for the main background of the section.
-   `backgroundImageAlt: string` (default: "Background")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white` for the overall section wrapper, though often covered by image)
-   `--theme-bg-alt` (e.g., `bg-gray-900` for the quote box)
-   `--theme-text-base` (e.g., `text-white` for quote and author name on dark quote box)
-   `--theme-text-muted` (e.g., `text-gray-400` for author title on dark quote box)
-   `--theme-border-radius-2xl` (e.g., `rounded-2xl` for the background image container)
-   SVG quote mark stroke: `stroke-white/20`

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32"> <!-- theme: bg-theme-bg-base -->
  <div class="bg-gray-900 pb-20 sm:pb-24 xl:pb-0"> <!-- theme: bg-theme-bg-alt (dark variant for quote box area) -->
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
      <!-- Background Image / Author Image (as per Svelte example) -->
      <div class="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
        <div class="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
          <img class="absolute inset-0 size-full rounded-2xl bg-gray-800 object-cover shadow-2xl" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?..." alt="Background"> <!-- theme: bg-theme-bg-alt (darker) -->
        </div>
      </div>
      
      <!-- Testimonial Content -->
      <div class="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
        <figure class="relative isolate pt-6 sm:pt-12">
          <!-- Company Logo (prop exists, but not explicitly placed in example HTML structure for quote area) -->
          <!-- <img class="mx-auto h-12" src="[companyLogoSrc]" alt="[companyLogoAlt]" /> -->

          <!-- SVG Quote Mark -->
          <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" class="absolute top-0 left-0 -z-10 h-32 stroke-white/20"> <!-- theme: stroke-theme-text-muted (on dark) -->
            <path id="testimonial-logo-quote-path" d="M65.5697 118.507L65.8918 118.89C68.9503...L65.5697 118.507Z" />
            <use href="#testimonial-logo-quote-path" x="86" />
          </svg>
          
          <blockquote class="text-xl/8 font-semibold text-white sm:text-2xl/9"> <!-- theme: text-theme-text-base (on dark) -->
            <p>&ldquo;Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere. Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum.&rdquo;</p>
          </blockquote>
          <figcaption class="mt-8 text-base">
            <div class="font-semibold text-white">Judith Black</div> <!-- theme: text-theme-text-base (on dark) -->
            <div class="mt-1 text-gray-400">CEO of Workcation</div> <!-- theme: text-theme-text-muted (on dark) -->
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all content.
- The `quoteMarkPath` is a constant SVG path data used for the decorative quote marks.

## CSS Notes
- **Layout:** A two-column layout is used on extra-large screens (`xl:`), with the image on one side and the quote box on the other. On smaller screens, they stack.
- **Layering:** The author's image (used as `backgroundImageUrl` in the Svelte example) is positioned to create an overlap effect with the quote box.
- **Dark Theme for Quote Box:** The quote box itself (`bg-gray-900`) is dark, with light text for contrast.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `testimonial-logo-quote-bg-image.svelte` snippet.
