# Catalyst Dialog Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Dialog` component family. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks. The Catalyst `Dialog` is built upon Headless UI's Dialog component.

## Overview

The Catalyst Dialog is a modal window that can be used for various purposes, such as displaying important information, forms, or confirmations. It consists of:
- A main `Dialog` container.
- A `DialogBackdrop`.
- A `DialogPanel` where the dialog content resides.
- Optional `DialogTitle`, `DialogDescription`, `DialogBody`, and `DialogActions` for structuring content.

## HTML Structure Example (Conceptual)

This is a conceptual HTML structure. JavaScript is essential for managing open/closed states, transitions, focus trapping, and ARIA attributes.

```html
<!-- Dialog container - typically hidden/shown with JS -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="...">
  <!-- Backdrop -->
  <div class="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/25 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50"></div>

  <!-- Centering and scroll container -->
  <div class="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
    <div class="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
      
      <!-- Dialog Panel -->
      <!-- Base classes + size class (e.g., sm:max-w-lg for 'lg' size) -->
      <div class="row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-[var(--gutter)] shadow-lg ring-1 ring-zinc-950/10 [--gutter:var(--spacing-8)] sm:mb-auto sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline transition duration-100 will-change-transform data-closed:translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95 sm:max-w-lg">
        
        <!-- Dialog Title -->
        <h2 id="dialog-title" class="text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white">
          Dialog Title Here
        </h2>

        <!-- Dialog Description -->
        <p class="mt-2 text-pretty /* Additional classes from Text component might apply */">
          This is the dialog description.
        </p>

        <!-- Dialog Body -->
        <div class="mt-6">
          <p>Main content of the dialog.</p>
        </div>

        <!-- Dialog Actions -->
        <div class="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
          <button type="button" class="... (catalyst button classes) ...">Cancel</button>
          <button type="button" class="... (catalyst button classes) ...">Submit</button>
        </div>

      </div> <!-- End Dialog Panel -->
    </div>
  </div>
</div> <!-- End Dialog -->
```

## Tailwind CSS Classes

### `DialogBackdrop`
```plaintext
fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/25 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50
```
- Manages transitions: `transition duration-100 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in`

### `DialogPanel`
Base classes:
```plaintext
row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-[var(--gutter)] shadow-lg ring-1 ring-zinc-950/10 [--gutter:var(--spacing-8)] sm:mb-auto sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline
transition duration-100 will-change-transform data-closed:translate-y-12 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:data-enter:scale-95
```
- `p-[var(--gutter)]` with `[--gutter:var(--spacing-8)]`: Uses CSS variables for padding. `var(--spacing-8)` likely refers to a value from Tailwind's spacing scale (e.g., `2rem` or `32px`).
- Manages transitions: `transition duration-100 ... data-closed:translate-y-12 ... sm:data-closed:data-enter:scale-95` (note the slide-up effect on small screens and scale on larger).

Size variants (applied to `DialogPanel`, default is `lg`):
```javascript
const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg', // Default
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}
```
Example for `lg` size (default): `sm:max-w-lg` is added to the `DialogPanel` classes.

### `DialogTitle`
```plaintext
text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white
```
- Typically rendered as an `<h2>` tag.

### `DialogDescription` (wraps `Text` component)
```plaintext
mt-2 text-pretty
```
- The `Text` component it wraps might add further base styling.
- Typically rendered as a `<p>` tag.

### `DialogBody`
```plaintext
mt-6
```
- A simple `<div>` wrapper for the main dialog content.

### `DialogActions`
```plaintext
mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto
```
- A `<div>` wrapper for action buttons.

## Notes for Usage

*   **JavaScript Essential:** This component relies heavily on JavaScript for modal behavior (visibility, focus, ARIA).
*   **Data Attributes for State:** Headless UI uses data attributes (e.g., `data-closed`, `data-enter`) to control styling during transitions.
*   **CSS Variables:** Uses `--gutter` and `--spacing-8` for padding. These need to be defined or mapped to Tailwind theme values.
*   **`Text` Component:** `DialogDescription` uses a `Text` component from Catalyst, which may contribute its own styling.

This Markdown file provides the HTML structure and class details from Catalyst's Dialog components for analysis and adaptation.
