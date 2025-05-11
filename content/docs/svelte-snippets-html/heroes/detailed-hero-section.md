# Detailed Hero Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `detailed-hero-section.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component creates a comprehensive hero section with navigation, an optional announcement, main content, and decorative background elements.

## Overview

This component creates a detailed hero section, often used as the primary landing view of a webpage. It includes:
-   A navigation bar with a logo, desktop links, and a mobile menu.
-   An optional announcement banner.
-   A main headline and sub-headline.
-   Primary and secondary call-to-action buttons.
-   Optional decorative gradient blurs in the background.

## Original Svelte Component Props

-   `companyName: string` (default: "Your Company")
-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `logoLinkHref: string` (default: "#")
-   `navLinks: Array<{ text: string, href: string }>` (default: Product, Features, etc.)
-   `loginLinkText: string` (default: "Log in")
-   `loginLinkHref: string` (default: "#")
-   `showAnnouncement: boolean` (default: true)
-   `announcementText: string` (default: "Announcing our next round of funding.")
-   `announcementLinkText: string` (default: "Read more")
-   `announcementLinkHref: string` (default: "#")
-   `headline: string` (default: "Data to enrich your online business")
-   `subHeadline: string` (default: "Anim aute id magna aliqua...")
-   `primaryCtaText: string` (default: "Get started")
-   `primaryCtaLink: string` (default: "#")
-   `secondaryCtaText: string` (default: "Learn more")
-   `secondaryCtaLink: string` (default: "#")
-   `showDecorativeGradients: boolean` (default: true)

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base`
-   `--theme-text-base`
-   `--theme-text-muted`
-   `--theme-primary`
-   `--theme-primary-hover`
-   `--theme-text-on-primary`
-   `--theme-border`
-   `--theme-bg-alt`
-   `--theme-border-radius-md`
-   `--theme-border-radius-full`

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props. Mobile menu functionality requires JavaScript.

```html
<div class="bg-white"> <!-- theme: bg-theme-bg-base -->
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company Logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" aria-expanded="false" aria-controls="mobile-menu-main">
          <span class="sr-only">Open main menu</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#" class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600">Product</a> <!-- theme: text-theme-text-base hover:text-theme-primary -->
        <!-- More nav links -->
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>

    <!-- Mobile menu (shown conditionally in Svelte) -->
    <!-- Example: Shown state for static HTML -->
    <!-- 
    <div class="lg:hidden" role="dialog" aria-modal="true" id="mobile-menu-main">
      <div class="fixed inset-0 z-50 bg-black/25"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company Logo" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Product</a>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->
  </header>

  <div class="relative isolate px-6 pt-14 lg:px-8">
    <!-- Decorative Gradients (optional) -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <!-- Announcement Banner (optional) -->
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Data to enrich your online business</h1>
        <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" class="text-sm/6 font-semibold text-gray-900 hover:text-gray-700">Learn more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </div>

    <!-- Second Decorative Gradient (optional) -->
    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component is highly configurable via props.
- Internal state `isMobileMenuOpen` and `toggleMobileMenu()` manage the mobile navigation.
- Conditional rendering (`{#if showAnnouncement}`, `{#if showDecorativeGradients}`, `{#if isMobileMenuOpen}`) is used extensively.

## CSS Notes
- **Layout:** Uses Flexbox for navigation and centered content.
- **Decorative Gradients:** Complex SVG elements with `clip-path` and `blur-3xl` create background visual effects.
- **Themeable Classes:** Many classes are designed to be themeable (e.g., `bg-theme-bg-base`, `text-theme-text-base`). The example uses some direct Tailwind UI colors for fidelity, which could be replaced by theme variables.

This Markdown file provides an HTML structure and class details based on the `detailed-hero-section.svelte` snippet.
