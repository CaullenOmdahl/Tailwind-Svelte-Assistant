# Catalyst Sidebar Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's Sidebar component family. These examples are intended for AI consumption and may need adaptation. Sidebar components use Headless UI for interactive elements and Framer Motion for animations.

## Overview

The Catalyst Sidebar system provides components to build the content and structure of a sidebar, typically used within a `SidebarLayout`. It includes:

- **`Sidebar`**: The main `<nav>` container for all sidebar content.
- **`SidebarHeader`**: A `<div>` for content at the top of the sidebar (e.g., logo, user profile).
- **`SidebarBody`**: A `<div>` for the main, often scrollable, list of navigation items.
- **`SidebarFooter`**: A `<div>` for content at the bottom of the sidebar.
- **`SidebarSection`**: A `<div>` for grouping `SidebarItem`s. Uses Framer Motion's `LayoutGroup`.
- **`SidebarDivider`**: An `<hr>` for visually separating sections or items.
- **`SidebarSpacer`**: A `<div>` that expands to fill space, useful for pushing a footer to the bottom.
- **`SidebarHeading`**: An `<h3>` for titling sections within the sidebar.
- **`SidebarItem`**: An individual navigation item (link or button), with an animated indicator for the `current` state using Framer Motion.
- **`SidebarLabel`**: A `<span>` for the text content of a `SidebarItem`.

## HTML Structure Example (Conceptual)

JavaScript (Headless UI, Framer Motion) is required for full functionality, especially for the current item indicator and interactive states.

```html
<!-- Sidebar (nav container) -->
<nav class="flex h-full min-h-0 flex-col">
  
  <!-- SidebarHeader -->
  <div class="flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
    <!-- Header content, e.g., Logo or User Info -->
    <div data-slot="section">Logo Area</div>
  </div>

  <!-- SidebarBody -->
  <div class="flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8">
    
    <!-- SidebarSection 1 -->
    <div data-slot="section" class="flex flex-col gap-0.5">
      <h3 class="mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400">Main Navigation</h3>
      
      <!-- SidebarItem (current) -->
      <span class="relative">
        <!-- Current indicator (Framer Motion) -->
        <span class="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"></span>
        <a href="#" class="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 ... (other SidebarItem classes) ..." data-current="true">
          <svg data-slot="icon" class="size-6 shrink-0 fill-zinc-500 sm:size-5" viewBox="0 0 20 20"><path d="..."/></svg>
          <span class="truncate">Dashboard</span> <!-- SidebarLabel -->
          <span class="absolute inset-0 rounded-lg" aria-hidden="true"></span> <!-- TouchTarget -->
        </a>
      </span>

      <!-- SidebarItem -->
      <span class="relative">
        <a href="#" class="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 ...">
          <svg data-slot="icon" class="size-6 shrink-0 fill-zinc-500 sm:size-5" viewBox="0 0 20 20"><path d="..."/></svg>
          <span class="truncate">Analytics</span>
          <span class="absolute inset-0 rounded-lg" aria-hidden="true"></span>
        </a>
      </span>
    </div>

    <hr class="my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5" /> <!-- SidebarDivider -->
    
    <!-- SidebarSpacer to push footer down -->
    <div aria-hidden="true" class="mt-8 flex-1"></div>
  </div>

  <!-- SidebarFooter -->
  <div class="flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
    <!-- Footer content, e.g., settings link or user avatar -->
    <div data-slot="section">Footer Item</div>
  </div>
</nav>
```

## Tailwind CSS Classes

### `Sidebar` (`<nav>`)
```plaintext
flex h-full min-h-0 flex-col
```

### `SidebarHeader` (`<div>`)
```plaintext
flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5
```

### `SidebarBody` (`<div>`)
```plaintext
flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8
```

### `SidebarFooter` (`<div>`)
```plaintext
flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5
```

### `SidebarSection` (`<div data-slot="section">`)
```plaintext
flex flex-col gap-0.5
```
- In React, this wraps children in Framer Motion's `LayoutGroup`.

### `SidebarDivider` (`<hr>`)
```plaintext
my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5
```

### `SidebarSpacer` (`<div>`)
```plaintext
mt-8 flex-1
```
- `aria-hidden="true"` is applied.

### `SidebarHeading` (`<h3>`)
```plaintext
mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400
```

### `SidebarItem` (renders as `<a>` or `<button>` wrapped in a `<span>`)
Outer `<span>` wrapper (for current indicator):
```plaintext
relative
```
Current indicator `<span>` (Framer Motion `motion.span`, if `current` is true):
```plaintext
absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white
```
Classes for the inner `<a>` or `<button>` element:
```plaintext
flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5
*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5
*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4
*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6
data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950
data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950
data-current:*:data-[slot=icon]:fill-zinc-950
dark:text-white dark:*:data-[slot=icon]:fill-zinc-400
dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white
dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white
dark:data-current:*:data-[slot=icon]:fill-white
```
- If it's a button (not a link), `cursor-default` is also added.
- `data-current="true"` is added if the item is current.

### `SidebarLabel` (`<span>`)
```plaintext
truncate
```

## Notes for Usage
*   **JavaScript & Animation:** Uses Headless UI for interactive elements and Framer Motion for the `current` item indicator and `SidebarSection`'s `LayoutGroup`.
*   **`TouchTarget` & `Link`:** `SidebarItem` uses `TouchTarget` and the Catalyst `Link` component.
*   **Data Attributes:** Styling relies on `data-hover`, `data-active`, `data-current`, and `data-slot` attributes.

This Markdown file provides the HTML structure and class details from Catalyst's Sidebar components for analysis and adaptation.
