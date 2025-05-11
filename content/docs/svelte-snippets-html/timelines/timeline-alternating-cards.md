# Timeline with Alternating Cards - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `timeline-alternating-cards.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a timeline of events, where events are presented in a grid that can appear as alternating or connected cards.

## Overview

This component creates a timeline section to display a series of historical events or milestones. It includes a main title and a responsive grid where each event is presented with its date, title, and description. A visual line connects the events, creating a timeline effect.

## Original Svelte Component Props

-   `title: string` (default: "Our history")
-   `events: Array<{ date: string, title: string, description: string }>` - Array of event objects.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900` for titles)
-   `--theme-text-muted` (e.g., `text-gray-600` for descriptions)
-   `--theme-primary-accent` (e.g., `text-indigo-600` for dates)
-   `--theme-border-color` (e.g., `bg-gray-900/10` for the timeline line)
-   `--theme-icon-fill` (e.g., `fill-indigo-600` for the timeline dot)

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props, showing one event item.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <!-- Section Header -->
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Our history</h2> <!-- theme: text-theme-text-base -->
    </div>
    
    <!-- Timeline Grid -->
    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
      <!-- Example Event Item -->
      <div>
        <time datetime="2021-08" class="flex items-center text-sm/6 font-semibold text-indigo-600"> <!-- theme: text-theme-primary-accent -->
          <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
            <circle cx="2" cy="2" r="2" fill="currentColor" /> <!-- theme: fill-theme-icon-fill -->
          </svg>
          Aug 2021
          <!-- Timeline Connector Line -->
          <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div> <!-- theme: bg-theme-border-color -->
        </time>
        <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">Founded company</p> <!-- theme: text-theme-text-base -->
        <p class="mt-1 text-base/7 text-gray-600">Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.</p> <!-- theme: text-theme-text-muted -->
      </div>

      <!-- More event items would be generated here by the Svelte #each block -->
      
    </dl>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses the `events` prop (an array of objects) to dynamically generate each timeline item.
- The `datetime` attribute for the `<time>` tag is formatted from the `event.date` string.

## CSS Notes
- **Layout:** Uses a CSS Grid (`grid-cols-1 lg:grid-cols-4`) for a responsive layout of timeline events.
- **Timeline Connector:** A `div` element is styled to act as a horizontal line connecting the events. Its positioning and width change based on screen size (`absolute -ml-2 ... lg:static lg:w-auto ...`).
- **Themeable Classes:** Comments indicate where theme variables could be applied for colors and borders.

This Markdown file provides an HTML structure and class details based on the `timeline-alternating-cards.svelte` snippet.
