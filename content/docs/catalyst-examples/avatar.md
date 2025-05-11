# Catalyst Avatar Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Avatar` and `AvatarButton` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## `Avatar` Component

The `Avatar` component can display an image or initials, and can be circular (default) or square.

### Basic HTML Structure

The avatar is a `<span>` element that acts as a grid container. Inside, an `<img>` (for image source) or an `<svg>` (for initials) is placed.

**Avatar with Image:**
```html
<span class="inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-full *:rounded-full">
  <img class="size-full rounded-full" src="path/to/image.jpg" alt="User Name" />
</span>
```

**Avatar with Initials:**
```html
<span class="inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-full *:rounded-full">
  <svg class="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none rounded-full" viewBox="0 0 100 100" aria-hidden="true">
    <!-- Optional: <title>User Name</title> if alt text is provided -->
    <text x="50%" y="50%" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" dy=".125em">
      JD
    </text>
  </svg>
</span>
```

**Square Avatar with Image:**
```html
<span class="inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1 outline -outline-offset-1 outline-black/10 dark:outline-white/10 rounded-[--avatar-radius] *:rounded-[--avatar-radius]">
  <img class="size-full rounded-[--avatar-radius]" src="path/to/image.jpg" alt="User Name" />
</span>
```

### Tailwind CSS Classes for `Avatar`

**Outer `<span>`:**
Base classes:
```plaintext
inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1
outline -outline-offset-1 outline-black/10 dark:outline-white/10
```
- `[--avatar-radius:20%]`: Defines a CSS variable for border radius if `square` is true.
- `*:col-start-1 *:row-start-1`: Ensures inner elements (image or SVG) stack correctly in the grid cell.

Conditional shape classes (applied to outer `<span>` and its direct children `*`):
- If `square` is `true`: `rounded-[--avatar-radius] *:rounded-[--avatar-radius]`
- If `square` is `false` (default): `rounded-full *:rounded-full`

**Inner `<svg>` (for initials):**
```plaintext
size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none
```
- `size-full`: Makes SVG take the full size of the parent `<span>`.
- `fill-current`: SVG fill color will be the current text color.
- `p-[5%]`: Padding inside the SVG.
- `text-[48px]`: Sets font size for initials (may need to be adjusted based on overall avatar size).
- This SVG also gets the conditional `rounded-full` or `rounded-[--avatar-radius]` from the parent's `*:` selector.

**Inner `<img>` (for `src`):**
```plaintext
size-full
```
- `size-full`: Makes image take the full size of the parent `<span>`.
- This image also gets the conditional `rounded-full` or `rounded-[--avatar-radius]` from the parent's `*:` selector.

## `AvatarButton` Component

Wraps an `Avatar` to make it clickable, rendering as an `<a>` or `<button>`.

### HTML Structure Example

**As a button:**
```html
<button type="button" class="relative inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500 rounded-full">
  <!-- TouchTarget wrapper -->
  <span> <!-- In React, this is TouchTarget component -->
    <!-- Avatar component as above -->
    <span class="inline-grid shrink-0 align-middle ... rounded-full *:rounded-full">
      <img class="size-full rounded-full" src="path/to/image.jpg" alt="User Name" />
    </span>
    <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
  </span>
</button>
```

**As a link:**
```html
<a href="#" class="relative inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500 rounded-full">
  <!-- TouchTarget wrapper -->
  <span>
    <!-- Avatar component as above -->
    <span class="inline-grid shrink-0 align-middle ... rounded-full *:rounded-full">
      <img class="size-full rounded-full" src="path/to/image.jpg" alt="User Name" />
    </span>
    <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
  </span>
</a>
```

### Tailwind CSS Classes for `AvatarButton`

Applied to the root `<button>` or `<a>` element:
Base classes:
```plaintext
relative inline-grid focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500
```
Conditional shape classes:
- If `square` is `true`: `rounded-[20%]` (Note: Catalyst uses `rounded-[20%]` here, which might differ from `[--avatar-radius]` if that variable is changed elsewhere. For consistency, `rounded-[--avatar-radius]` might be preferred if the CSS variable is reliably available.)
- If `square` is `false` (default): `rounded-full`

## Notes for Usage

*   **TouchTarget:** The `AvatarButton` uses a `TouchTarget` concept (similar to the `Button` component) to increase hit area on touch devices. This is represented by the inner `<span>` with `absolute top-1/2...` classes.
*   **JavaScript for State:** Data attributes like `data-focus` would be managed by JavaScript in a real application to control focus styling.
*   **`Link` Component:** The React version uses a custom `Link` component for `href` scenarios. The example above uses a plain `<a>` tag.
*   **CSS Variables:** The `[--avatar-radius:20%]` defines a local CSS variable. Ensure your Tailwind setup processes this if you use it directly.

This Markdown file provides the HTML structure and class details from Catalyst's Avatar components for analysis and adaptation.
