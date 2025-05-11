# Advanced Dark Footer - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `footer-advanced-dark.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component creates a comprehensive, dark-themed footer.

## Overview

This component generates an advanced footer suitable for a dark theme. It includes a company logo, tagline, social media links, multiple columns of navigation links (organized into sections), and a copyright notice.

## Original Svelte Component Props

-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `logoAlt: string` (default: "Your Company")
-   `tagline: string` (default: "Making the world a better place...")
-   `socialLinks: Array<{ name: string, href: string, iconPathData: string }>` - Array for social media icons and links.
-   `linkSections: Array<{ title: string, links: Array<{ name: string, href: string }> }>` - Array of sections, each containing a title and a list of links.
-   `copyrightText: string` (default: "© [Current Year] Your Company, Inc. All rights reserved.")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-gray-900` for this dark example)
-   `--theme-text-base` (e.g., `text-white` for section titles)
-   `--theme-text-muted` (e.g., `text-gray-300`, `text-gray-400` for tagline, links, copyright)
-   `--theme-border-color` (e.g., `border-white/10` for the top border of the copyright section)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<footer class="bg-gray-900"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <!-- Logo, Tagline, Social Links -->
      <div class="space-y-8">
        <img class="h-9" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <p class="text-sm/6 text-balance text-gray-300">Making the world a better place through constructing elegant hierarchies.</p> <!-- theme: text-theme-text-muted -->
        <div class="flex gap-x-6">
          <!-- Example Social Link (Facebook) -->
          <a href="#" class="text-gray-400 hover:text-gray-300"> <!-- theme: text-theme-text-muted, hover:text-theme-text-base -->
            <span class="sr-only">Facebook</span>
            <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <!-- Other social links would follow -->
        </div>
      </div>

      <!-- Navigation Links Grid -->
      <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <!-- Row of Link Sections -->
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <!-- Example Link Section 1 -->
          <div>
            <h3 class="text-sm/6 font-semibold text-white">Solutions</h3> <!-- theme: text-theme-text-base -->
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a href="#" class="text-sm/6 text-gray-400 hover:text-white">Marketing</a> <!-- theme: text-theme-text-muted, hover:text-theme-text-base -->
              </li>
              <!-- More links in this section -->
            </ul>
          </div>
          <!-- Example Link Section 2 -->
          <div class="mt-10 md:mt-0">
            <h3 class="text-sm/6 font-semibold text-white">Support</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a href="#" class="text-sm/6 text-gray-400 hover:text-white">Submit ticket</a>
              </li>
              <!-- More links -->
            </ul>
          </div>
        </div>
        <!-- Another Row of Link Sections (Company, Legal) -->
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <!-- Example Link Section 3 -->
          <div class="mt-10 md:mt-0"> <!-- Svelte applies mt-10 conditionally -->
            <h3 class="text-sm/6 font-semibold text-white">Company</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li><a href="#" class="text-sm/6 text-gray-400 hover:text-white">About</a></li>
            </ul>
          </div>
          <!-- Example Link Section 4 -->
          <div class="mt-10 md:mt-0">
            <h3 class="text-sm/6 font-semibold text-white">Legal</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li><a href="#" class="text-sm/6 text-gray-400 hover:text-white">Terms of service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Copyright Section -->
    <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24"> <!-- theme: border-theme-border-color -->
      <p class="text-sm/6 text-gray-400">&copy; 2024 Your Company, Inc. All rights reserved.</p> <!-- copyrightText, theme: text-theme-text-muted -->
    </div>
  </div>
</footer>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all content: logo, tagline, social media links (including SVG icon paths), navigation link sections, and copyright text.
- The `linkSections` are rendered in a nested grid structure. The Svelte code uses `slice` to arrange them into two main groups for the `md:grid-cols-2` layout.

## CSS Notes
- **Dark Theme:** Designed for a dark background (`bg-gray-900`), with text colors adjusted for readability (e.g., `text-white`, `text-gray-300`, `text-gray-400`).
- **Layout:** Uses CSS Grid for the main footer layout (`xl:grid-cols-3`) and for the navigation link columns (`md:grid-cols-2`).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `footer-advanced-dark.svelte` snippet.
