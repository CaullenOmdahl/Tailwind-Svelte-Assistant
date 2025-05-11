# Simple Hero Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `simple-hero.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a basic hero section with a title, subtitle, and call-to-action buttons.

## Overview

This component creates a simple, centered hero section, typically used at the top of a webpage to grab attention. It includes a main title, a subtitle, and one or two call-to-action (CTA) buttons. It's styled with a dark background and light text.

## Original Svelte Component Props

-   `title: string` (default: "Welcome to Our Awesome Website")
-   `subtitle: string` (default: "Discover amazing things and join our community...")
-   `ctaText: string` (default: "Get Started") - Text for the primary CTA.
-   `ctaLink: string` (default: "#") - Href for the primary CTA.
-   `secondaryCtaText: string` (default: "Learn More") - Text for the optional secondary CTA.
-   `secondaryCtaLink: string` (default: "#") - Href for the optional secondary CTA.

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props. The secondary CTA is shown as it would be if `secondaryCtaText` is provided.

```html
<section class="bg-gray-900 text-white">
  <div class="container mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 md:text-5xl lg:text-6xl">
      Welcome to Our Awesome Website
    </h1>
    <p class="text-lg mb-10 md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
      Discover amazing things and join our community. We provide the best services for your needs.
    </p>
    <div class="flex justify-center space-x-4">
      <a
        href="#"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started
      </a>
      <!-- Secondary CTA (conditionally rendered in Svelte if secondaryCtaText is truthy) -->
      <a
        href="#"
        class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
      >
        Learn More
      </a>
    </div>
  </div>
</section>
```

### Tailwind CSS Classes Used:
- **`<section>`**:
  - `bg-gray-900`: Dark background color.
  - `text-white`: Default text color for the section.
- **Container `<div>`**:
  - `container mx-auto`: Centers content and applies max-width.
  - `px-6 py-20`: Padding.
  - `text-center`: Centers all inline/text content.
- **`<h1>` (title)**:
  - `text-4xl md:text-5xl lg:text-6xl`: Responsive font size.
  - `font-bold mb-6`: Font weight and bottom margin.
- **`<p>` (subtitle)**:
  - `text-lg md:text-xl lg:text-2xl`: Responsive font size.
  - `mb-10 text-gray-300 max-w-3xl mx-auto`: Margin, muted text color, max-width, and horizontal centering.
- **CTA container `<div>`**:
  - `flex justify-center space-x-4`: Flexbox for button layout.
- **CTA `<a>` buttons**:
  - Common: `font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out`
  - Primary CTA: `bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105`
  - Secondary CTA: `bg-gray-700 hover:bg-gray-600 text-white`

## JavaScript Notes
- The Svelte component uses props to dynamically set the title, subtitle, and CTA button text/links.
- The secondary CTA button is conditionally rendered using `{#if secondaryCtaText}`.

## CSS Notes
- The `<style lang="postcss">` block in the original `.svelte` file is empty. All styling is achieved using Tailwind CSS utility classes.

This Markdown file provides an HTML structure and class details based on the `simple-hero.svelte` snippet.
