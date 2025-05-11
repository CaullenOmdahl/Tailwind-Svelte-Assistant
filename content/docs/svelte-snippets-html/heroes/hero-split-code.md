# Hero Section with Split Code Block - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `hero-split-code.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a hero section with text content on one side and a stylized code example on the other.

## Overview

This component creates a hero section featuring a split layout. The left side typically contains a logo, an announcement banner, a main headline, sub-headline, and call-to-action buttons. The right side features a stylized code block example, often with pseudo-tabs for file names.

## Original Svelte Component Props

-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `logoAlt: string` (default: "Your Company")
-   `announcementBadgeText: string` (default: "What's new")
-   `announcementText: string` (default: "Just shipped v0.1.0")
-   `announcementLinkHref: string` (default: "#")
-   `headline: string` (default: "Supercharge your web app")
-   `subHeadline: string` (default: "Anim aute id magna aliqua...")
-   `primaryCtaText: string` (default: "Documentation")
-   `primaryCtaLink: string` (default: "#")
-   `secondaryCtaText: string` (default: "View on GitHub")
-   `secondaryCtaLink: string` (default: "#")
-   `codeFileName1: string` (default: "NotificationSetting.jsx")
-   `codeFileName2: string` (default: "App.jsx")
-   `codeExampleContent: string` (default: "// Your code example here...")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-indigo-100/20` for gradient, `bg-indigo-100 opacity-20` for skewed bg)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`, `text-gray-400`)
-   `--theme-primary` (e.g., `text-indigo-600`, `bg-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500`)
-   `--theme-text-on-primary` (e.g., `text-white`)
-   `--theme-border-color` (e.g., `ring-indigo-600/10`, `ring-white/5`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)
-   `--theme-border-radius-xl` (e.g., `rounded-xl`)
-   `--radius-3xl` (Used in `clip-path`, e.g., `rounded-3xl` if available)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white"> <!-- theme: bg-theme-bg-base -->
  <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"> <!-- theme: from-theme-bg-alt/20 -->
    <div class="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
      <!-- Left Column: Text Content -->
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="mx-auto max-w-2xl">
          <div class="max-w-lg">
            <img class="h-11" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <div class="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" class="inline-flex space-x-6">
                <span class="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/10">What's new</span> <!-- theme: bg-theme-primary/10, text-theme-primary, ring-theme-primary/10 -->
                <span class="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600"> <!-- theme: text-theme-text-muted -->
                  <span>Just shipped v0.1.0</span>
                  <svg class="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <!-- theme: text-theme-text-muted (lighter) -->
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </span>
              </a>
            </div>
            <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">Supercharge your web app</h1> <!-- theme: text-theme-text-base -->
            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p> <!-- theme: text-theme-text-muted -->
            <div class="mt-10 flex items-center gap-x-6">
              <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Documentation</a> <!-- theme: primary button -->
              <a href="#" class="text-sm/6 font-semibold text-gray-900">View on GitHub <span aria-hidden="true">&rarr;</span></a> <!-- theme: text-theme-text-base -->
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Stylized Code Block -->
      <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
        <div class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true"></div> <!-- theme: bg-theme-bg-base, shadow-theme-primary/10, ring-theme-primary-lightest -->
        <div class="shadow-lg md:rounded-3xl"> <!-- theme: rounded-theme-3xl -->
          <div class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]"> <!-- theme: bg-theme-primary -->
            <div class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-white ring-inset md:ml-20 lg:ml-36" aria-hidden="true"></div> <!-- theme: bg-theme-bg-alt opacity-20 ring-theme-bg-base -->
            <div class="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
              <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                <div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900"> <!-- Dark background for code -->
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">NotificationSetting.jsx</div>
                      <div class="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div class="px-6 pt-6 pb-14">
                    <pre class="text-sm text-white overflow-x-auto"><code>// Your code example here...
console.log('Hello, world!');</code></pre>
                  </div>
                </div>
              </div>
              <div class="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl" aria-hidden="true"></div> <!-- theme: ring-theme-border-color -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div> <!-- theme: from-theme-bg-base -->
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all textual content, links, logo, and the code example.
- For static HTML, this content would be hardcoded.

## CSS Notes
- **Layout:** Uses CSS Grid (`lg:grid-cols-2`) for the main split layout.
- **Code Block Styling:** The right column containing the code example has a complex visual treatment involving:
    - Absolutely positioned, skewed background `div`s to create a layered, angled effect.
    - `clip-path: inset(0_round_var(--radius-3xl))` to clip the content to a rounded shape (requires `--radius-3xl` CSS variable or a Tailwind equivalent like `rounded-3xl`).
    - Pseudo-tabs for file names.
- **Themeable Classes:** Comments indicate where theme variables could be applied. Many specific colors from the Tailwind UI example are used directly for fidelity.

This Markdown file provides an HTML structure and class details based on the `hero-split-code.svelte` snippet.
