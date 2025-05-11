# 404 Error Page with Background Image - HTML & Tailwind CSS Example

Derived from `404-simple-background-image.svelte`. Displays a full-page 404 error with a background image.

## Overview

A full-page error display featuring a background image, an error code, title, message, and a "back to home" link. Designed for situations where a visually impactful error page is desired.

## Original Svelte Component Props

-   `imageUrl: string` (default: Unsplash placeholder)
-   `errorCode: string` (default: "404")
-   `title: string` (default: "Page not found")
-   `message: string` (default: "Sorry, we couldn’t find the page you’re looking for.")
-   `backLinkText: string` (default: "Back to home")
-   `backLinkHref: string` (default: "#")

## HTML Structure Example (Conceptual)

Assumes `<html>` and `<body>` have `class="h-full"` for `min-h-full` to work correctly.

```html
<main class="relative isolate min-h-full">
  <img src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75" alt="Background" class="absolute inset-0 -z-10 size-full object-cover object-top" />
  <div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
    <p class="text-base/8 font-semibold text-white">404</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Page not found</h1>
    <p class="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
    <div class="mt-10 flex justify-center">
      <a href="#" class="text-sm/7 font-semibold text-white hover:opacity-80">
        <span aria-hidden="true">&larr;</span> Back to home
      </a>
    </div>
  </div>
</main>
```

## Notes
-   The Svelte component uses props for dynamic content.
-   Styling assumes a dark background image where white text provides good contrast. Theme variables for text colors are noted in the original component for customization.
-   The `min-h-full` class on `<main>` aims for a full-viewport height.
