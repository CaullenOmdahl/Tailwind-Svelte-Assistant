# Catalyst Select Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Select` component. These examples are intended for AI consumption and may need adaptation. The `Select` component wraps `Headless.Select` to style a native HTML `<select>` element.

## Overview

The Catalyst `Select` component provides styling for the native browser `<select>` element, making it consistent with the Catalyst design system. It supports both single and multiple selection.

## HTML Structure Example (Conceptual)

The component consists of an outer `<span>` wrapper (for focus ring and background effects) and the `<select>` element itself. For single selects, a dropdown arrow icon is also included.

**Single Select:**
```html
<!-- Outer span wrapper -->
<span 
  data-slot="control" 
  class="group relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-blue-500 ... (state classes) ..."
>
  <!-- Native select element (Headless.Select) -->
  <select 
    class="relative block w-full appearance-none rounded-lg py-[calc(var(--spacing-2-5)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)] pr-[calc(var(--spacing-10)-1px)] pl-[calc(var(--spacing-3-5)-1px)] sm:pr-[calc(var(--spacing-9)-1px)] sm:pl-[calc(var(--spacing-3)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white dark:*:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 dark:*:bg-zinc-800 focus:outline-hidden ... (state classes) ..."
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <optgroup label="Group Label">
      <option value="3">Option 3</option>
    </optgroup>
  </select>

  <!-- Dropdown arrow icon (for single select only) -->
  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    <svg class="size-5 stroke-zinc-500 group-has-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]" viewBox="0 0 16 16" aria-hidden="true" fill="none">
      <path d="M5.75 10.75L8 13L10.25 10.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.25 5.25L8 3L5.75 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
</span>
```

**Multiple Select:**
(Similar structure, but the `<select>` would have the `multiple` attribute, different padding, and no dropdown arrow icon)
```html
<select multiple class="... px-[calc(var(--spacing-3.5)-1px)] sm:px-[calc(var(--spacing-3)-1px)] ...">
  <!-- options -->
</select>
```

## Tailwind CSS Classes

### Outer `<span data-slot="control">` Wrapper
```plaintext
group relative block w-full
before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm
dark:before:hidden
after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-blue-500
has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none
```
- Provides background/shadow effects and focus ring.
- `has-data-focus` and `has-data-disabled` classes change appearance based on the select's state (requires JS to set these data attributes on this span or the select).

### `<select>` Element (from `Headless.Select`)
Base classes:
```plaintext
relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]
text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white dark:*:text-white
border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20
bg-transparent dark:bg-white/5 dark:*:bg-zinc-800
focus:outline-hidden
```
Conditional padding based on `multiple` prop:
- If `multiple` is true: `px-[calc(--spacing(3.5)-1px)] sm:px-[calc(--spacing(3)-1px)]`
- If `multiple` is false (default): `pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]` (to make space for the dropdown arrow)

Styling for `<optgroup>`:
```plaintext
[&_optgroup]:font-semibold
```

State-specific classes for the `<select>`:
- Invalid state: `data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600`
- Disabled state: `data-disabled:border-zinc-950/20 data-disabled:opacity-100 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15`

### Dropdown Arrow Icon (for single select only)
Outer `<span>` for positioning:
```plaintext
pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2
```
`<svg>` element:
```plaintext
size-5 stroke-zinc-500 group-has-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]
```
- `group-has-data-disabled`: Changes stroke color if the parent `group` (the outer span) has `data-disabled`.

## Notes for Usage

*   **Native Element:** This component styles the native HTML `<select>` element. While `appearance-none` is used to remove most browser default styling, some aspects of behavior and appearance (especially for the dropdown options panel) are still controlled by the browser/OS.
*   **State Management:** Data attributes like `data-hover`, `data-focus`, `data-disabled`, `data-invalid` on the select element and its wrapper control styling. These would typically be managed by JavaScript or through Headless UI.
*   **CSS Variables:** Uses CSS variables like `--spacing(...)` and `--radius-lg`.
*   **Headless UI:** The component wraps `Headless.Select`, which can provide enhanced accessibility and state management.

This Markdown file provides the HTML structure and class details from Catalyst's Select component for analysis and adaptation.
