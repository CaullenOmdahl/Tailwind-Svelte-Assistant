# Catalyst AuthLayout Component - HTML & Tailwind CSS Examples

This document provides the HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `AuthLayout` component. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## Overview

The `AuthLayout` component is designed as a container for authentication-related pages (e.g., login, signup forms). It typically centers content on the page within a styled panel on larger screens.

## HTML Structure and Tailwind CSS Classes

The component consists of a `<main>` element and a nested `<div>`.

```html
<main class="flex min-h-dvh flex-col p-2">
  <div class="flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
    <!-- Children content (e.g., login form, signup form) goes here -->
    <!-- Example: -->
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold text-center">Sign In</h1>
      <!-- Form elements etc. -->
    </div>
  </div>
</main>
```

### Classes Applied:

**Outer `<main>` element:**
```plaintext
flex min-h-dvh flex-col p-2
```
- `flex`: Enables flexbox layout.
- `min-h-dvh`: Sets the minimum height to 100% of the dynamic viewport height, ensuring it fills at least the screen.
- `flex-col`: Arranges children (the inner div) in a column.
- `p-2`: Adds padding around the main container.

**Inner `<div>` element (content wrapper):**
```plaintext
flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10
```
- `flex`: Enables flexbox for its children (the content you place inside).
- `grow`: Allows this div to grow and take available space within the `main` flex container.
- `items-center`: Aligns children vertically to the center.
- `justify-center`: Aligns children horizontally to the center.
- `p-6`: Padding within this content wrapper.
- `lg:rounded-lg`: On large screens and up, applies rounded corners.
- `lg:bg-white`: On large screens, sets a white background.
- `lg:p-10`: On large screens, increases padding.
- `lg:shadow-xs`: On large screens, adds a small box shadow.
- `lg:ring-1 lg:ring-zinc-950/5`: On large screens, adds a ring (border-like outline).
- `dark:lg:bg-zinc-900`: In dark mode on large screens, sets background to dark zinc.
- `dark:lg:ring-white/10`: In dark mode on large screens, adjusts the ring color.

## Notes for Usage

*   This layout provides a responsive container that is simple on small screens and becomes a centered, card-like panel on large screens.
*   The actual form elements or content for authentication would be placed inside the inner `<div>`.
*   The `min-h-dvh` class uses the dynamic viewport height unit, which is well-supported in modern browsers.

This Markdown file provides the HTML structure and class details from Catalyst's AuthLayout for analysis and adaptation.
