# Simple Footer - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `simple-footer.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a basic, centered footer.

## Overview

This component creates a simple footer with a copyright notice and a few links (e.g., Privacy Policy, Terms of Service). It's styled with a dark background and light text.

## Original Svelte Component Props

This component does not define any props in a `<script>` tag. The copyright year is generated dynamically in the Svelte template.

## HTML Structure Example (Conceptual)

This static HTML represents the structure. The year in the copyright notice would be static here, unlike the Svelte version which uses `new Date().getFullYear()`.

```html
<footer class="bg-gray-700 text-gray-300 p-8 text-center">
  <div class="container mx-auto">
    <p>&copy; 2024 Your Company Name. All rights reserved.</p> <!-- Year is dynamic in Svelte -->
    <div class="mt-4 space-x-4">
      <a href="/privacy-policy" class="hover:text-white">Privacy Policy</a>
      <a href="/terms-of-service" class="hover:text-white">Terms of Service</a>
    </div>
  </div>
</footer>
```

### Tailwind CSS Classes Used:
- **`<footer>`**:
  - `bg-gray-700`: Background color.
  - `text-gray-300`: Default text color.
  - `p-8`: Padding.
  - `text-center`: Centers the text content.
- **Inner `<div>`**:
  - `container mx-auto`: Centers the content block and applies max-width based on screen size.
- **Links `<a>`**:
  - `hover:text-white`: Changes text color on hover.
- **Link container `<div>`**:
  - `mt-4`: Margin top.
  - `space-x-4`: Horizontal spacing between child elements (links).

## JavaScript Notes
- The original Svelte component dynamically inserts the current year into the copyright notice using `{new Date().getFullYear()}`. In a static HTML version, this would typically be a static year or updated by server-side rendering/JavaScript.

## CSS Notes
- The `<style lang="postcss">` block in the original `.svelte` file is empty, indicating all styling is done via Tailwind utility classes.

This Markdown file provides an HTML structure and class details based on the `simple-footer.svelte` snippet.
