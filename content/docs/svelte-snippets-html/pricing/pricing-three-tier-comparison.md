# Three-Tier Pricing with Comparison Table - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `pricing-three-tier-comparison.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a three-tier pricing section with a frequency toggle and a detailed feature comparison table.

## Overview

This component creates a comprehensive pricing section that includes:
-   An introductory header with title and description.
-   A toggle for selecting pricing frequency (e.g., monthly/annually).
-   Three pricing tiers, each with a name, price, description, features list, and a CTA button. One tier can be marked as "most popular."
-   On smaller screens, tiers are displayed as individual cards.
-   On larger screens (`lg+`), a detailed comparison table shows features across all tiers.

## Original Svelte Component Props

-   `accentText: string` (default: "Pricing")
-   `title: string` (default: "Pricing that grows with you")
-   `description: string` (default: "Choose an affordable plan...")
-   `frequencyOptions: Array<{ value: string, label: string }>` (default: Monthly, Annually)
-   `defaultFrequency: string` (default: 'monthly')
-   `tiers: Array<{ name: string, id: string, href: string, price: { monthly: string, annually: string } | string, description: string, features: string[], mostPopular?: boolean }>`
-   `featureSections: Array<{ name: string, features: Array<{ name: string, tiers: { [tierId: string]: boolean | string } }> }>` - Data for the comparison table.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50`)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-primary` (e.g., `text-indigo-600`, `bg-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500`)
-   `--theme-primary-ring` (e.g., `ring-indigo-200`)
-   `--theme-primary-highlight-ring` (e.g., `ring-indigo-600` for most popular tier)
-   `--theme-text-on-primary` (e.g., `text-white`)
-   `--theme-border-color` (e.g., `divide-gray-100`, `ring-gray-200`)
-   `--theme-icon-check` (e.g., `text-indigo-600`)
-   `--theme-icon-minus` (e.g., `text-gray-400`)

## HTML Structure Example (Conceptual)

This static HTML represents the structure. Frequency toggling and dynamic pricing require JavaScript.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Header -->
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base/7 font-semibold text-indigo-600">Pricing</h2>
      <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">Pricing that grows with you</p>
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">Choose an affordable plan that’s packed with the best features...</p>

    <!-- Frequency Toggle -->
    <div class="mt-16 flex justify-center">
      <fieldset aria-label="Payment frequency" class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-gray-200 ring-inset">
        <label class="cursor-pointer rounded-full px-2.5 py-1 bg-indigo-600 text-white"> <!-- Example: Monthly selected -->
          <input type="radio" name="frequency" value="monthly" class="sr-only" checked />
          <span>Monthly</span>
        </label>
        <label class="cursor-pointer rounded-full px-2.5 py-1 text-gray-500">
          <input type="radio" name="frequency" value="annually" class="sr-only" />
          <span>Annually</span>
        </label>
      </fieldset>
    </div>

    <!-- Pricing cards (xs to lg) - Hidden on lg+ -->
    <div class="isolate mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
      <!-- Example Tier Card (Startup - Most Popular) -->
      <section class="p-8 rounded-xl bg-gray-400/5 ring-1 ring-gray-200 ring-inset">
        <h3 id="tier-tier-startup-mobile" class="text-sm/6 font-semibold text-indigo-600">Startup</h3>
        <p class="mt-2 flex items-baseline gap-x-1 text-gray-900">
          <span class="text-4xl font-semibold">$29</span> <!-- Price based on frequency -->
          <span class="text-sm font-semibold">/month</span>
        </p>
        <a href="#" aria-describedby="tier-tier-startup-mobile" class="mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600">Buy plan</a>
        <ul role="list" class="mt-10 space-y-4 text-sm/6 text-gray-900">
          <li class="flex gap-x-3">
            <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153..." clip-rule="evenodd" /></svg>
            Edge content delivery
          </li>
          <!-- More features for this tier -->
        </ul>
      </section>
      <!-- Other tier cards -->
    </div>

    <!-- Pricing table (lg+) - Hidden below lg -->
    <div class="isolate mt-20 hidden lg:block">
      <div class="relative -mx-8">
        <!-- Highlight for most popular tier -->
        <div class="absolute inset-x-4 inset-y-0 -z-10 flex">
          <div class="flex w-1/4 px-4" style="margin-left: 25%" aria-hidden="true"> <!-- Assuming second tier is most popular -->
            <div class="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5"></div>
          </div>
        </div>
        <table class="w-full table-fixed border-separate border-spacing-x-8 text-left">
          <caption class="sr-only">Pricing plan comparison</caption>
          <thead>
            <tr>
              <td></td>
              <th scope="col" class="px-6 pt-6 xl:px-8 xl:pt-8"><div class="text-sm/7 font-semibold text-gray-900">Freelancer</div></th>
              <th scope="col" class="px-6 pt-6 xl:px-8 xl:pt-8"><div class="text-sm/7 font-semibold text-indigo-600">Startup</div></th>
              <th scope="col" class="px-6 pt-6 xl:px-8 xl:pt-8"><div class="text-sm/7 font-semibold text-gray-900">Enterprise</div></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><span class="sr-only">Price</span></th>
              <td class="px-6 pt-2 xl:px-8"><div class="flex items-baseline gap-x-1 text-gray-900"><span class="text-4xl font-semibold">$19</span><span class="text-sm/6 font-semibold">/month</span></div><a href="#" class="mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600">Buy plan</a></td>
              <!-- Other tier prices and CTAs -->
            </tr>
            <!-- Feature Sections and Rows -->
            <tr>
              <th scope="colgroup" colspan="4" class="pt-8 pb-4 text-sm/6 font-semibold text-gray-900">Features<div class="absolute inset-x-8 mt-4 h-px bg-gray-900/10"></div></th>
            </tr>
            <tr>
              <th scope="row" class="py-4 text-sm/6 font-normal text-gray-900">Edge content delivery<div class="absolute inset-x-8 mt-4 h-px bg-gray-900/5"></div></th>
              <td class="px-6 py-4 xl:px-8"><svg class="mx-auto size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153..." clip-rule="evenodd" /></svg></td>
              <!-- Feature availability for other tiers -->
            </tr>
            <!-- More feature rows and sections -->
          </tbody>
        </table>
        <div class="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block" aria-hidden="true">
          <div class="rounded-lg ring-1 ring-gray-900/10"></div>
          <div class="rounded-lg ring-2 ring-indigo-600"></div> <!-- Most popular highlight -->
          <div class="rounded-lg ring-1 ring-gray-900/10"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props for dynamic content.
- `selectedFrequency` state manages the monthly/annually toggle.
- `getPrice` helper function determines the correct price to display.
- Feature availability in the table (`featureItem.tiers[tier.id]`) can be a boolean or a string.

## CSS Notes
- **Responsive Layout:** Displays cards on small screens and a table on large screens (`lg:`).
- **Most Popular Tier:** Highlighted with different styling (e.g., background, ring).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `pricing-three-tier-comparison.svelte` snippet.
