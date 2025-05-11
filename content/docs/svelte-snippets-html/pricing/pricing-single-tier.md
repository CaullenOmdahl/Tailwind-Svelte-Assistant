# Single-Tier Pricing Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `pricing-single-tier.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a pricing section for a single product tier.

## Overview

This component creates a pricing section focused on a single offering, such as a "Lifetime membership" or a single product. It includes a main title, description, and a detailed card showing the tier name, features, price, and a call-to-action button.

## Original Svelte Component Props

-   `title: string` (default: "Simple no-tricks pricing")
-   `description: string` (default: "Distinctio et nulla eum soluta...")
-   `tierName: string` (default: "Lifetime membership")
-   `price: string` (default: "$349")
-   `priceSuffix: string` (default: "USD")
-   `ctaText: string` (default: "Get access")
-   `ctaHref: string` (default: "#")
-   `finePrint: string` (default: "Invoices and receipts available...")
-   `featuresIncludedTitle: string` (default: "What’s included")
-   `features: string[]` (default: ['Private forum access', ...])

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for price box)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`, `text-gray-500`)
-   `--theme-primary` (e.g., `text-indigo-600` for features title, `bg-indigo-600` for button)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500` for button)
-   `--theme-text-on-primary` (e.g., `text-white`)
-   `--theme-border-color` (e.g., `ring-gray-200` for card, `ring-gray-900/5` for price box)
-   `--theme-border-radius-md` (e.g., `rounded-md` for button)
-   `--theme-border-radius-2xl` (e.g., `rounded-2xl` for price box)
-   `--theme-icon-check` (e.g., `text-indigo-600` for feature checkmarks)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Section Header -->
    <div class="mx-auto max-w-4xl sm:text-center">
      <h2 class="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">Simple no-tricks pricing</h2> <!-- theme: text-theme-text-base -->
      <p class="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p> <!-- theme: text-theme-text-muted -->
    </div>

    <!-- Pricing Card -->
    <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"> <!-- theme: ring-theme-border-color -->
      <!-- Left Part: Tier Details & Features -->
      <div class="p-8 sm:p-10 lg:flex-auto">
        <h3 class="text-3xl font-semibold tracking-tight text-gray-900">Lifetime membership</h3> <!-- theme: text-theme-text-base -->
        <p class="mt-6 text-base/7 text-gray-600">Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.</p> <!-- theme: text-theme-text-muted -->
        <div class="mt-10 flex items-center gap-x-4">
          <h4 class="flex-none text-sm/6 font-semibold text-indigo-600">What’s included</h4> <!-- theme: text-theme-primary -->
          <div class="h-px flex-auto bg-gray-100"></div> <!-- theme: bg-theme-bg-alt or border-theme-border-color -->
        </div>
        <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6"> <!-- theme: text-theme-text-muted -->
          <!-- Example Feature Item -->
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <!-- theme: text-theme-icon-check -->
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
            Private forum access
          </li>
          <!-- More features would be listed here -->
        </ul>
      </div>
      
      <!-- Right Part: Price & CTA -->
      <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
        <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16"> <!-- theme: bg-theme-bg-alt, ring-theme-border-color -->
          <div class="mx-auto max-w-xs px-8">
            <p class="text-base font-semibold text-gray-600">Pay once, own it forever</p> <!-- theme: text-theme-text-muted -->
            <p class="mt-6 flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-semibold tracking-tight text-gray-900">$349</span> <!-- price, theme: text-theme-text-base -->
              <span class="text-sm/6 font-semibold tracking-wide text-gray-600">USD</span> <!-- priceSuffix, theme: text-theme-text-muted -->
            </p>
            <a href="#" class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get access</a> <!-- theme: button primary -->
            <p class="mt-6 text-xs/5 text-gray-600">Invoices and receipts available for easy company reimbursement</p> <!-- finePrint, theme: text-theme-text-muted -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate all textual content, price, and features list.
- For static HTML, this content would be hardcoded.

## CSS Notes
- **Layout:** The main pricing card uses Flexbox on large screens (`lg:flex`) to arrange the details/features part and the price/CTA part side-by-side.
- **Styling:** The price/CTA part has a distinct background (`bg-gray-50`) and rounded corners (`rounded-2xl`).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `pricing-single-tier.svelte` snippet.
