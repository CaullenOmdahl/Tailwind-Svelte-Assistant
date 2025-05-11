# Catalyst SidebarLayout Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `SidebarLayout` component. These examples are intended for AI consumption and may need adaptation. The mobile sidebar functionality relies on Headless UI's Dialog component and JavaScript for state management.

## Overview

The `SidebarLayout` component creates a common application layout with a fixed sidebar on larger screens and a slide-out sidebar on mobile, along with a main content area and a mobile-specific navbar area.

It internally uses:
- `MobileSidebar`: A component built with `Headless.Dialog` for the mobile off-canvas sidebar.
- `OpenMenuIcon` and `CloseMenuIcon`: SVG icons.
- `NavbarItem`: From Catalyst's Navbar components, used for the mobile menu toggle and close button.

## HTML Structure Example (Conceptual)

This is a conceptual representation. JavaScript is essential for toggling the mobile sidebar and for Headless UI's dialog functionality.

```html
<!-- Main Layout Wrapper -->
<div class="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">

  <!-- Sidebar on desktop (fixed) -->
  <div class="fixed inset-y-0 left-0 w-64 max-lg:hidden">
    <!-- Sidebar content (passed as 'sidebar' prop) goes here -->
    <div class="p-4 bg-gray-200 h-full">Desktop Sidebar Content</div>
  </div>

  <!-- Mobile Sidebar (Headless.Dialog) - shown/hidden by JS -->
  <div class="lg:hidden" role="dialog" aria-modal="true"> <!-- Wrapper for MobileSidebar -->
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>
    
    <!-- Panel -->
    <div class="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full">
      <div class="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
        <div class="-mb-3 px-4 pt-3">
          <!-- Close Button (NavbarItem) -->
          <button type="button" class="... (NavbarItem classes) ..." aria-label="Close navigation">
            <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
          </button>
        </div>
        <!-- Sidebar content (passed as 'sidebar' prop) goes here -->
        <div class="p-4">Mobile Sidebar Content</div>
      </div>
    </div>
  </div>

  <!-- Navbar on mobile -->
  <header class="flex items-center px-4 lg:hidden">
    <div class="py-2.5">
      <!-- Open Mobile Sidebar Button (NavbarItem) -->
      <button type="button" class="... (NavbarItem classes) ..." aria-label="Open navigation">
        <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" /></svg>
      </button>
    </div>
    <div class="min-w-0 flex-1">
      <!-- Navbar content (passed as 'navbar' prop) goes here -->
      <div class="p-4 text-center">Mobile Navbar Content</div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
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

### `SidebarLayout` (Main Wrapper `<div>`)
```plaintext
relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950
```

### Desktop Sidebar (`<div class="fixed ...">`)
```plaintext
fixed inset-y-0 left-0 w-64 max-lg:hidden
```
- `max-lg:hidden`: Hides this sidebar on screens smaller than `lg`.

### `MobileSidebar` (Dialog)
**`DialogBackdrop`:**
```plaintext
fixed inset-0 bg-black/30 transition data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in
```
**`DialogPanel`:**
```plaintext
fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-closed:-translate-x-full
```
Inner wrapper of `DialogPanel`:
```plaintext
flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10
```
Close button container within `DialogPanel`:
```plaintext
-mb-3 px-4 pt-3
```
- The close button itself uses `NavbarItem` with `CloseMenuIcon`.

### Mobile Header (`<header>`)
```plaintext
flex items-center px-4 lg:hidden
```
- `lg:hidden`: This header is only visible on screens smaller than `lg`.
Container for mobile menu toggle:
```plaintext
py-2.5
```
- The open button uses `NavbarItem` with `OpenMenuIcon`.
Container for mobile navbar content:
```plaintext
min-w-0 flex-1
```

### Main Content Area (`<main>`)
```plaintext
flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64
```
- `lg:pl-64`: Left padding on large screens to account for the fixed desktop sidebar width.
Inner content wrapper `<div>`:
```plaintext
grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10
```
Innermost content constraint `<div>`:
```plaintext
mx-auto max-w-6xl
```

### Icons
**`OpenMenuIcon` SVG:**
```html
<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
  <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
</svg>
```
**`CloseMenuIcon` SVG:**
```html
<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
</svg>
```

## Notes for Usage
*   **JavaScript Required:** The mobile sidebar's open/close state and the underlying `Headless.Dialog` functionality are controlled by JavaScript.
*   **Props for Content:** The `SidebarLayout` takes `navbar`, `sidebar`, and `children` props to populate the respective areas.
*   **Responsive Design:** The layout adapts significantly between mobile (`max-lg`) and desktop (`lg`) views.

This Markdown file provides the HTML structure and class details from Catalyst's SidebarLayout component for analysis and adaptation.
