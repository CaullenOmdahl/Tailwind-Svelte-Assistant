# Catalyst StackedLayout Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `StackedLayout` component. These examples are intended for AI consumption and may need adaptation. The mobile sidebar functionality relies on Headless UI's Dialog component and JavaScript for state management.

## Overview

The `StackedLayout` component creates a common application layout with a top navigation bar and a main content area. It also includes a slide-out sidebar for mobile navigation, similar to `SidebarLayout`, but without a persistent desktop sidebar.

It internally uses:
- `MobileSidebar`: A component built with `Headless.Dialog` for the mobile off-canvas sidebar (identical to the one in `SidebarLayout`).
- `OpenMenuIcon` and `CloseMenuIcon`: SVG icons (identical to the ones in `SidebarLayout`).
- `NavbarItem`: From Catalyst's Navbar components, used for the mobile menu toggle.

## HTML Structure Example (Conceptual)

JavaScript is essential for toggling the mobile sidebar and for Headless UI's dialog functionality.

```html
<!-- Main Layout Wrapper -->
<div class="relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">

  <!-- Mobile Sidebar (Headless.Dialog) - shown/hidden by JS -->
  <!-- This is the same MobileSidebar component used in SidebarLayout -->
  <div class="lg:hidden" role="dialog" aria-modal="true"> <!-- Wrapper for MobileSidebar -->
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>
    
    <!-- Panel -->
    <div class="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full">
      <div class="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
        <div class="-mb-3 px-4 pt-3">
          <!-- Close Button (NavbarItem) -->
          <button type="button" class="... (NavbarItem classes) ..." aria-label="Close navigation">
            <!-- CloseMenuIcon SVG -->
          </button>
        </div>
        <!-- Sidebar content (passed as 'sidebar' prop) goes here -->
        <div class="p-4">Mobile Sidebar Content</div>
      </div>
    </div>
  </div>

  <!-- Navbar Area (Header) -->
  <header class="flex items-center px-4">
    <!-- Mobile Menu Toggle (only on mobile) -->
    <div class="py-2.5 lg:hidden">
      <button type="button" class="... (NavbarItem classes) ..." aria-label="Open navigation">
        <!-- OpenMenuIcon SVG -->
      </button>
    </div>
    <!-- Navbar content (passed as 'navbar' prop) -->
    <div class="min-w-0 flex-1">
      <div class="p-4 text-center">Navbar Content (e.g., Catalyst Navbar components)</div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="flex flex-1 flex-col pb-2 lg:px-2">
    <div class="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
      <div class="mx-auto max-w-6xl">
        <!-- Page content (children prop) goes here -->
        <p>Main page content.</p>
      </div>
    </div>
  </main>
</div>
```

## Tailwind CSS Classes

### `StackedLayout` (Main Wrapper `<div>`)
```plaintext
relative isolate flex min-h-svh w-full flex-col bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950
```

### `MobileSidebar`
- The classes for `MobileSidebar`, its `DialogBackdrop`, and `DialogPanel` are identical to those in the `SidebarLayout` component. Please refer to `sidebar-layout.md` for those details.
- The Open/Close icons are also identical.

### Navbar Area (`<header>`)
```plaintext
flex items-center px-4
```
Mobile menu toggle container (`<div>`):
```plaintext
py-2.5 lg:hidden
```
- The toggle button uses `NavbarItem` with `OpenMenuIcon`.
Navbar content container (`<div>`):
```plaintext
min-w-0 flex-1
```

### Main Content Area (`<main>`)
```plaintext
flex flex-1 flex-col pb-2 lg:px-2
```
Inner content wrapper `<div>`:
```plaintext
grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10
```
Innermost content constraint `<div>`:
```plaintext
mx-auto max-w-6xl
```

## Notes for Usage
*   **JavaScript Required:** The mobile sidebar's open/close state and the underlying `Headless.Dialog` functionality are controlled by JavaScript.
*   **Props for Content:** The `StackedLayout` takes `navbar`, `sidebar` (for mobile), and `children` props to populate the respective areas.
*   **No Desktop Sidebar:** Unlike `SidebarLayout`, this layout does not feature a persistent sidebar on desktop screens. The `sidebar` prop is only used for the mobile slide-out menu.

This Markdown file provides the HTML structure and class details from Catalyst's StackedLayout component for analysis and adaptation.
