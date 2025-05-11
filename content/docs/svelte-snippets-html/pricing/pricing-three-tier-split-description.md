# Three-Tier Pricing with Split Descriptions - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `pricing-three-tier-split-description.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a three-tier pricing section where each tier's description and features are presented within its card.

## Overview

This component creates a pricing section with three distinct tiers. Each tier card includes its name, monthly price, a description, and a list of features. One tier can be highlighted as "featured," typically with different styling. A decorative gradient can be shown in the background.

## Original Svelte Component Props

-   `accentText: string` (default: "Pricing")
-   `title: string` (default: "Choose the right plan for you")
-   `description: string` (default: "Choose an affordable plan...")
-   `tiers: Array<{ name: string, id: string, href: string, priceMonthly: string, tierDescription: string, features: string[], featured?: boolean }>` - Array of pricing tier objects.
-   `decorativeGradient: boolean` (default: true) - Whether to show the decorative background gradient.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-white/60` for regular tiers, `bg-gray-900` for featured)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`, `text-gray-300` for featured)
-   `--theme-primary` (e.g., `text-indigo-600`, `bg-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500`)
-   `--theme-primary-accent` (e.g., `text-indigo-400` for featured tier accent)
-   `--theme-text-on-primary` (e.g., `text-white`)
-   `--theme-border-color` (e.g., `ring-gray-900/10`)
-   `--theme-border-radius-3xl` (e.g., `rounded-3xl`)
-   `--theme-icon-check` (e.g., `text-indigo-600` or `text-indigo-400` for featured)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props, showing one regular and one featured tier.

```html
<div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8"> <!-- theme: bg-theme-bg-base -->
  <!-- Optional Decorative Gradient -->
  <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
    <div class="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
  
  <!-- Header -->
  <div class="mx-auto max-w-4xl text-center">
    <h2 class="text-base/7 font-semibold text-indigo-600">Pricing</h2> <!-- theme: text-theme-primary -->
    <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Choose the right plan for you</p> <!-- theme: text-theme-text-base -->
  </div>
  <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an affordable plan that’s packed with the best features...</p> <!-- theme: text-theme-text-muted -->
  
  <!-- Pricing Tiers Grid -->
  <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
    <!-- Example Regular Tier (Hobby) -->
    <div class="relative p-8 shadow-2xl ring-1 bg-white/60 ring-gray-900/10 rounded-t-3xl sm:mx-8 sm:rounded-b-none lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
      <h3 id="tier-hobby" class="text-base/7 font-semibold text-indigo-600">Hobby</h3>
      <p class="mt-4 flex items-baseline gap-x-2">
        <span class="text-5xl font-semibold tracking-tight text-gray-900">$29</span>
        <span class="text-base text-gray-500">/month</span>
      </p>
      <p class="mt-6 text-base/7 text-gray-600">The perfect plan if you're just getting started...</p>
      <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
        <li class="flex gap-x-3">
          <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153..." clip-rule="evenodd" /></svg>
          25 products
        </li>
        <!-- More features -->
      </ul>
      <a href="#" aria-describedby="tier-hobby" class="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600 sm:mt-10">Get started today</a>
    </div>

    <!-- Example Featured Tier (Enterprise) -->
    <div class="relative p-8 shadow-2xl ring-1 rounded-3xl bg-gray-900 ring-gray-900/10"> <!-- theme: bg-theme-bg-alt (dark for featured) -->
      <h3 id="tier-enterprise" class="text-base/7 font-semibold text-indigo-400">Enterprise</h3> <!-- theme: text-theme-primary-accent -->
      <p class="mt-4 flex items-baseline gap-x-2">
        <span class="text-5xl font-semibold tracking-tight text-white">$99</span> <!-- theme: text-theme-text-base (on dark) -->
        <span class="text-base text-gray-400">/month</span> <!-- theme: text-theme-text-muted (on dark) -->
      </p>
      <p class="mt-6 text-base/7 text-gray-300">Dedicated support and infrastructure...</p>
      <ul role="list" class="mt-8 space-y-3 text-sm/6 text-gray-300 sm:mt-10">
        <li class="flex gap-x-3">
          <svg class="h-6 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153..." clip-rule="evenodd" /></svg>
          Unlimited products
        </li>
        <!-- More features -->
      </ul>
      <a href="#" aria-describedby="tier-enterprise" class="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500 sm:mt-10">Get started today</a> <!-- theme: button primary (darker variant) -->
    </div>
    
    <!-- Third tier would be here -->
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses the `tiers` prop (an array of objects) to dynamically generate each pricing card.
- The `featured` property in a tier object controls its special styling.
- Conditional classes in Svelte handle the specific rounded corners for tiers in a 2-column layout to create a visually connected or distinct appearance.

## CSS Notes
- **Layout:** Uses CSS Grid for the responsive layout of pricing cards.
- **Featured Tier:** The featured tier has distinct background and text colors.
- **Conditional Rounded Corners:** The Svelte component applies complex conditional classes for `rounded-t-3xl`, `rounded-b-3xl`, etc., to achieve specific visual effects when there are 2 or 3 tiers, especially on `sm` screens before they stack into a single column or go to `lg:grid-cols-2`. This is simplified in the static HTML example.
- **Decorative Gradient:** An SVG with a radial gradient is used as a background effect.

This Markdown file provides an HTML structure and class details based on the `pricing-three-tier-split-description.svelte` snippet.
