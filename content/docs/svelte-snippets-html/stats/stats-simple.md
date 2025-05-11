# Simple Stats Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `stats-simple.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a simple grid of key statistics.

## Overview

This component creates a section to display key metrics or statistics in a clean, responsive grid layout. Each stat consists of a value and a descriptive name.

## Original Svelte Component Props

-   `stats: Array<{ name: string, value: string }>` (default: Array of 3 stats like "Transactions every 24 hours", "Assets under holding", "New users annually")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900` for stat values)
-   `--theme-text-muted` (e.g., `text-gray-600` for stat names)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      
      <!-- Example Stat Item 1 -->
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base/7 text-gray-600">Transactions every 24 hours</dt> <!-- stat.name, theme: text-theme-text-muted -->
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd> <!-- stat.value, theme: text-theme-text-base -->
      </div>

      <!-- Example Stat Item 2 -->
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base/7 text-gray-600">Assets under holding</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
      </div>

      <!-- Example Stat Item 3 -->
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base/7 text-gray-600">New users annually</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
      </div>
      
      <!-- More stat items would be generated here by the Svelte #each block -->
    </dl>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses the `stats` prop (an array of objects) to dynamically generate each statistic item.
- For static HTML, these statistics would be hardcoded.

## CSS Notes
- **Layout:** Uses a CSS Grid (`grid-cols-1 lg:grid-cols-3`) for a responsive layout of the statistics.
- **Typography:** Stat values are large and bold (`text-3xl sm:text-5xl font-semibold`), while names are smaller and muted (`text-base/7 text-gray-600`).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `stats-simple.svelte` snippet.
