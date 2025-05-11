# Catalyst Alert Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Alert` component family. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks. The Catalyst `Alert` is built upon Headless UI's Dialog component.

## Overview

The Catalyst Alert typically consists of several parts:
- A main `Alert` container (acting as a dialog).
- A `DialogBackdrop`.
- A `DialogPanel` where the alert content resides.
- Optional `AlertTitle`, `AlertDescription`, `AlertBody`, and `AlertActions` for structuring content within the panel.

## HTML Structure Example

This is a conceptual HTML structure. In a real application, JavaScript would be required to manage the open/closed state, transitions, and ARIA attributes for accessibility, which Headless UI handles in the React version.

```html
<!-- Alert (Dialog) container - typically hidden/shown with JS -->
<div role="dialog" aria-modal="true" aria-labelledby="alert-title" class="...">
  <!-- Backdrop -->
  <div class="fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/15 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50"></div>

  <!-- Centering and scroll container -->
  <div class="fixed inset-0 w-screen overflow-y-auto pt-6 sm:pt-0">
    <div class="grid min-h-full grid-rows-[1fr_auto_1fr] justify-items-center p-8 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
      
      <!-- Dialog Panel (Alert Content Area) -->
      <!-- Base classes + size class (e.g., sm:max-w-md for 'md' size) -->
      <div class="row-start-2 w-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 sm:rounded-2xl sm:p-6 dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline transition duration-100 will-change-transform data-closed:opacity-0 data-enter:ease-out data-closed:data-enter:scale-95 data-leave:ease-in sm:max-w-md">
        
        <!-- Alert Title -->
        <h2 id="alert-title" class="text-center text-base/6 font-semibold text-balance text-zinc-950 sm:text-left sm:text-sm/6 sm:text-wrap dark:text-white">
          Alert Title Here
        </h2>

        <!-- Alert Description -->
        <p class="mt-2 text-center text-pretty sm:text-left /* Additional classes from Text component might apply */">
          This is the alert description.
        </p>

        <!-- Alert Body -->
        <div class="mt-4">
          <!-- Custom content for the alert body -->
          <p>More details or custom elements can go here.</p>
        </div>

        <!-- Alert Actions -->
        <div class="mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:mt-4 sm:flex-row sm:*:w-auto">
          <button type="button" class="... (catalyst button classes for 'Cancel') ...">Cancel</button>
          <button type="button" class="... (catalyst button classes for 'Confirm') ...">Confirm</button>
        </div>

      </div> <!-- End Dialog Panel -->
    </div>
  </div>
</div> <!-- End Alert (Dialog) -->
```

## Tailwind CSS Classes from Catalyst Components

### `Alert` (as `Headless.Dialog`)
The main `Alert` component itself doesn't have direct classes in the example but orchestrates `DialogBackdrop` and `DialogPanel`.

### `DialogBackdrop` (for `Alert`)
```plaintext
fixed inset-0 flex w-screen justify-center overflow-y-auto bg-zinc-950/15 px-2 py-2 transition duration-100 focus:outline-0 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50
```
- Manages transitions: `transition duration-100 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in`

### `DialogPanel` (for `Alert`)
Base classes:
```plaintext
row-start-2 w-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 sm:rounded-2xl sm:p-6 dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline
transition duration-100 will-change-transform data-closed:opacity-0 data-enter:ease-out data-closed:data-enter:scale-95 data-leave:ease-in
```
- Manages transitions: `transition duration-100 will-change-transform data-closed:opacity-0 data-enter:ease-out data-closed:data-enter:scale-95 data-leave:ease-in`

Size variants (applied to `DialogPanel`):
```javascript
const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md', // Default
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
}
```
Example for `md` size (default): `sm:max-w-md` is added to the `DialogPanel` classes.

### `AlertTitle` (as `Headless.DialogTitle`)
```plaintext
text-center text-base/6 font-semibold text-balance text-zinc-950 sm:text-left sm:text-sm/6 sm:text-wrap dark:text-white
```
- Typically rendered as an `<h2>` tag.

### `AlertDescription` (as `Headless.Description` wrapping `Text`)
```plaintext
mt-2 text-center text-pretty sm:text-left
```
- The `Text` component it wraps might add further base styling for typography.
- Typically rendered as a `<p>` tag.

### `AlertBody`
```plaintext
mt-4
```
- A simple `<div>` wrapper for custom content.

### `AlertActions`
```plaintext
mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:mt-4 sm:flex-row sm:*:w-auto
```
- A `<div>` wrapper for action buttons. Uses flexbox for layout.
- The `*:w-full sm:*:w-auto` applies full width to children on small screens (column layout) and auto width on larger screens (row layout).

## Notes for Usage

*   **JavaScript for Interactivity:** This component heavily relies on JavaScript for its modal behavior (showing/hiding, focus trapping, ARIA attributes, transitions). The HTML/CSS alone will not create a functional modal alert.
*   **Data Attributes for State:** Catalyst uses data attributes like `data-closed`, `data-enter`, `data-leave` (from Headless UI) to drive CSS transitions. These are set by JavaScript.
*   **`Text` Component:** `AlertDescription` uses a `Text` component from Catalyst. The specific styling of `Text` would also apply.
*   **Customization:** These classes provide a starting point. They would be customized or replaced based on project-specific design requirements.

This Markdown file provides the HTML structure and class details from Catalyst's Alert components for analysis and adaptation.
