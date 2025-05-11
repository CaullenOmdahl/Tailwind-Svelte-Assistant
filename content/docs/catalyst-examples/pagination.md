# Catalyst Pagination Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's Pagination component family. These examples are intended for AI consumption and may need adaptation. The components internally use the Catalyst `Button` component for styling interactive elements.

## Overview

The Catalyst Pagination system provides components to build navigation for paginated content. It includes:
- **`Pagination`**: The main `<nav>` container.
- **`PaginationPrevious`**: A button/link for navigating to the previous page.
- **`PaginationNext`**: A button/link for navigating to the next page.
- **`PaginationList`**: A container for the list of page number links, typically hidden on small screens.
- **`PaginationPage`**: An individual page number button/link.
- **`PaginationGap`**: A separator (e.g., ellipsis "...") indicating skipped page numbers.

## HTML Structure Example (Conceptual)

Functionality like disabling previous/next buttons or setting the current page requires JavaScript logic.

```html
<nav aria-label="Page navigation" class="flex gap-x-2">
  
  <!-- PaginationPrevious -->
  <span class="grow basis-0">
    <!-- Uses Catalyst Button with 'plain' variant. Disabled if no previous page. -->
    <a href="#prev" class="... (classes from plain Button) ..." aria-label="Previous page">
      <svg class="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      Previous
    </a>
  </span>

  <!-- PaginationList (for page numbers) -->
  <span class="hidden items-baseline gap-x-2 sm:flex">
    <!-- PaginationPage (current) -->
    <a href="#1" class="min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg before:bg-zinc-950/5 dark:before:bg-white/10 ... (classes from plain Button) ..." aria-label="Page 1" aria-current="page">
      <span class="-mx-0.5">1</span>
    </a>
    
    <!-- PaginationPage -->
    <a href="#2" class="min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg ... (classes from plain Button) ..." aria-label="Page 2">
      <span class="-mx-0.5">2</span>
    </a>

    <!-- PaginationGap -->
    <span aria-hidden="true" class="w-[2.25rem] text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white">
      &hellip;
    </span>
    
    <!-- More PaginationPage items... -->
  </span>

  <!-- PaginationNext -->
  <span class="flex grow basis-0 justify-end">
    <!-- Uses Catalyst Button with 'plain' variant. Disabled if no next page. -->
    <a href="#next" class="... (classes from plain Button) ..." aria-label="Next page">
      Next
      <svg class="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  </span>
</nav>
```

## Tailwind CSS Classes

### `Pagination` (`<nav>`)
```plaintext
flex gap-x-2
```
- `aria-label` defaults to "Page navigation".

### `PaginationPrevious` (`<span>` wrapping a Catalyst `Button`)
Outer `<span>`:
```plaintext
grow basis-0
```
- The inner Catalyst `Button` is used with the `plain` variant. It's disabled if `href` is `null`.
- Contains an SVG icon for the previous arrow.

### `PaginationNext` (`<span>` wrapping a Catalyst `Button`)
Outer `<span>`:
```plaintext
flex grow basis-0 justify-end
```
- The inner Catalyst `Button` is used with the `plain` variant. It's disabled if `href` is `null`.
- Contains an SVG icon for the next arrow.

### `PaginationList` (`<span>`)
```plaintext
hidden items-baseline gap-x-2 sm:flex
```
- This container for page numbers is hidden on small screens (`hidden`) and becomes a flex container on `sm` screens and up (`sm:flex`).

### `PaginationPage` (Catalyst `Button` component)
Uses Catalyst `Button` with `plain` variant.
Additional classes applied:
```plaintext
min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg
```
If `current` is `true`, these classes are also added to the button:
```plaintext
before:bg-zinc-950/5 dark:before:bg-white/10
```
- `aria-label` is set to "Page {children}".
- `aria-current` is set to "page" if `current` is true.
- The page number (`children`) is wrapped in a `<span class="-mx-0.5">`.

### `PaginationGap` (`<span>`)
```plaintext
w-[2.25rem] text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white
```
- `aria-hidden="true"` is applied.
- Default content is an ellipsis `&hellip;`.

## Notes for Usage

*   **Catalyst Button Dependency:** These components rely on the Catalyst `Button` component (specifically its `plain` variant) for styling the interactive elements.
*   **JavaScript for Logic:** Determining the current page, generating `href`s for page links, and disabling Previous/Next buttons based on the current page and total pages requires JavaScript logic.
*   **Responsiveness:** The `PaginationList` (containing page numbers) is hidden on small screens by default.

This Markdown file provides the HTML structure and class details from Catalyst's Pagination components for analysis and adaptation.
