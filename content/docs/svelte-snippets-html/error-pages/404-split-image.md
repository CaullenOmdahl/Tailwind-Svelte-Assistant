# 404 Error Page with Split Image Layout - HTML & Tailwind CSS Example

Derived from `404-split-image.svelte`. Displays a 404 error page with a split layout: content on the left, and a full-height image on the right. Includes a header and footer.

## Overview

This component creates a full-page 404 error display. It features a two-column layout on larger screens, with the error message, logo, and footer links on one side, and a full-height image on the other.

## Original Svelte Component Props

-   `logoSrc: string` (default: Tailwind logo)
-   `logoAlt: string` (default: "Your Company")
-   `errorCode: string` (default: "404")
-   `title: string` (default: "Page not found")
-   `message: string` (default: "Sorry, we couldn’t find the page you’re looking for.")
-   `backLinkText: string` (default: "Back to home")
-   `backLinkHref: string` (default: "#")
-   `footerLinks: Array<{ text: string, href: string }>` (default: Contact and Status links)
-   `imageUrl: string` (default: Unsplash placeholder)
-   `imageAlt: string` (default: "Scenic landscape")

## HTML Structure Example (Conceptual)

Assumes `<html>` and `<body>` have `class="h-full"` for `min-h-full` to work correctly.

```html
<div class="grid min-h-full grid-cols-1 grid-rows-[auto_1fr_auto] bg-white lg:grid-cols-[max(50%,36rem)_1fr]"> <!-- theme: bg-theme-bg-base -->
  <header class="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
    <a href="#"> <!-- backLinkHref -->
      <span class="sr-only">Your Company</span> <!-- logoAlt -->
      <img class="h-10 w-auto sm:h-12" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> <!-- logoSrc, logoAlt -->
    </a>
  </header>

  <main class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
    <div class="max-w-lg">
      <p class="text-base/8 font-semibold text-indigo-600">404</p> <!-- errorCode, theme: text-theme-primary -->
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">Page not found</h1> <!-- title, theme: text-theme-text-base -->
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p> <!-- message, theme: text-theme-text-muted -->
      <div class="mt-10">
        <a href="#" class="text-sm/7 font-semibold text-indigo-600 hover:text-indigo-500"> <!-- backLinkHref, theme: text-theme-primary hover:text-theme-primary-hover -->
          <span aria-hidden="true">&larr;</span> Back to home <!-- backLinkText -->
        </a>
      </div>
    </div>
  </main>

  <footer class="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
    <div class="border-t border-gray-100 bg-gray-50 py-10"> <!-- theme: border-theme-border-color, bg-theme-bg-alt -->
      <nav class="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8"> <!-- theme: text-theme-text-muted -->
        <a href="#" class="hover:text-gray-700">Contact support</a> <!-- theme: hover:text-theme-text-base -->
        <svg viewBox="0 0 2 2" aria-hidden="true" class="size-0.5 fill-gray-300"> <!-- theme: fill-theme-border-color -->
          <circle cx="1" cy="1" r="1" />
        </svg>
        <a href="#" class="hover:text-gray-700">Status</a>
      </nav>
    </div>
  </footer>

  <div class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
    <img src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80" alt="Scenic landscape" class="absolute inset-0 size-full object-cover" /> <!-- imageUrl, imageAlt -->
  </div>
</div>
```

## Notes
-   The Svelte component uses props for all dynamic content.
-   The layout uses CSS Grid to achieve the split screen effect on larger views (`lg:` prefixes).
-   The right-side image is hidden on smaller screens (`hidden lg:block`).
-   Theme variables are noted for colors and backgrounds.
