# Catalyst Navbar Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's Navbar component family. These examples are intended for AI consumption and may need adaptation. The Navbar components use Headless UI for interactive elements and Framer Motion for animations.

## Overview

The Catalyst Navbar system provides components to build flexible navigation bars. It includes:
- **`Navbar`**: The main `<nav>` container.
- **`NavbarDivider`**: A visual separator.
- **`NavbarSection`**: A `<div>` for grouping navigation items. It uses Framer Motion's `LayoutGroup` for potential animation coordination.
- **`NavbarSpacer`**: A `<div>` that expands to create space, useful for pushing sections to opposite ends.
- **`NavbarItem`**: An individual navigation item, which can be a link or a button. It features an animated indicator for the `current` item using Framer Motion.
- **`NavbarLabel`**: A `<span>` for the text content of a `NavbarItem`, often with truncation.

## HTML Structure Example (Conceptual)

A functional Navbar with animated indicators and interactive states requires JavaScript (Headless UI, Framer Motion). This HTML is a conceptual representation.

```html
<nav class="flex flex-1 items-center gap-4 py-2.5">
  
  <!-- NavbarSection 1 -->
  <div class="flex items-center gap-3"> <!-- Represents NavbarSection -->
    <!-- NavbarItem (Link, current) -->
    <span class="relative">
      <!-- Current indicator (Framer Motion span) -->
      <span class="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"></span>
      <a href="#" class="relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 ... (other NavbarItem classes) ..." data-current="true">
        <!-- Optional Icon -->
        <svg data-slot="icon" class="size-6 shrink-0 fill-zinc-500 sm:size-5" viewBox="0 0 20 20"><path d="..."/></svg>
        <span class="truncate">Dashboard</span> <!-- NavbarLabel -->
        <!-- TouchTarget (conceptual) -->
        <span class="absolute inset-0 rounded-lg" aria-hidden="true"></span> 
      </a>
    </span>

    <!-- NavbarItem (Link) -->
    <span class="relative">
      <a href="#" class="relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 ...">
        <span class="truncate">Settings</span>
        <span class="absolute inset-0 rounded-lg" aria-hidden="true"></span>
      </a>
    </span>
  </div>

  <!-- NavbarSpacer -->
  <div aria-hidden="true" class="-ml-4 flex-1"></div>

  <!-- NavbarSection 2 -->
  <div class="flex items-center gap-3">
    <!-- NavbarItem (Button with Avatar) -->
    <span class="relative">
      <button type="button" class="cursor-default relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5 ...">
        <img data-slot="avatar" src="avatar.jpg" alt="" class="-m-0.5 size-7 [--avatar-radius:var(--radius-md)] sm:size-6 rounded-[var(--radius-md)]" />
        <span class="absolute inset-0 rounded-lg" aria-hidden="true"></span>
      </button>
    </span>
  </div>
</nav>
```

## Tailwind CSS Classes

### `Navbar` (`<nav>`)
```plaintext
flex flex-1 items-center gap-4 py-2.5
```

### `NavbarDivider` (`<div>`)
```plaintext
h-6 w-px bg-zinc-950/10 dark:bg-white/10
```
- `aria-hidden="true"` is typically applied.

### `NavbarSection` (`<div>`)
```plaintext
flex items-center gap-3
```
- Note: In React, this component wraps its children in Framer Motion's `LayoutGroup`.

### `NavbarSpacer` (`<div>`)
```plaintext
-ml-4 flex-1
```
- `aria-hidden="true"` is typically applied. `flex-1` allows it to grow and push other sections apart.

### `NavbarItem` (renders as `<a>` or `<button>` wrapped in a `<span>`)
Outer `<span>` wrapper (for current indicator positioning):
```plaintext
relative
```
Current indicator `<span>` (Framer Motion `motion.span`, only if `current` is true):
```plaintext
absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white
```
Classes for the inner `<a>` or `<button>` element:
```plaintext
relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5
*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5
*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4
*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6
data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950
data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950
dark:text-white dark:*:data-[slot=icon]:fill-zinc-400
dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white
dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white
```
- If it's a button (not a link), `cursor-default` is also added.
- `data-current="true"` is added if the item is current.
- `*:data-[slot=icon/avatar]:...`: Styles for child elements marked with `data-slot="icon"` or `data-slot="avatar"`.
- `*:not-nth-2:last:data-[slot=icon]:...`: Complex selector for styling a trailing icon (e.g., a dropdown chevron) if it's not the second child and is the last icon.

### `NavbarLabel` (`<span>`)
```plaintext
truncate
```
- Used inside `NavbarItem` for its text content.

## Notes for Usage
*   **JavaScript & Animation:** This component system uses Headless UI for interactive elements and Framer Motion for the `current` item indicator and potentially for `NavbarSection` layouts. These are React-specific libraries.
*   **`TouchTarget`:** `NavbarItem` wraps its children in a `TouchTarget` component (from Catalyst's Button) to improve touch accessibility.
*   **`Link` Component:** `NavbarItem` uses the Catalyst `Link` component when an `href` is provided.
*   **Data Attributes:** Styling relies on `data-hover`, `data-active`, and `data-current` attributes, which would be managed by JavaScript.
*   **CSS Variables:** Uses CSS variables like `--avatar-radius` (likely `var(--radius-md)`).

This Markdown file provides the HTML structure and class details from Catalyst's Navbar components for analysis and adaptation.
