# Catalyst Checkbox Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `CheckboxGroup`, `CheckboxField`, and `Checkbox` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks. These components rely on Headless UI for functionality.

## Overview

The Catalyst Checkbox system consists of three main parts:
- `CheckboxGroup`: A container for a set of related checkboxes.
- `CheckboxField`: A wrapper for a single checkbox input along with its label and optional description, providing layout.
- `Checkbox`: The visual checkbox element itself, including styles for different states and colors.

## HTML Structure Example (Conceptual)

This example shows how the components might be structured in HTML. JavaScript would be needed to manage states (checked, indeterminate, disabled) and ARIA attributes, which Headless UI handles in React.

```html
<!-- CheckboxGroup -->
<div class="space-y-3 has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium">

  <!-- CheckboxField 1 -->
  <div data-slot="field" class="grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr] *:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1 *:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1 *:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2 has-data-[slot=description]:**:data-[slot=label]:font-medium">
    
    <!-- Checkbox (control) -->
    <!-- Add 'data-checked' or 'data-indeterminate' or 'data-disabled' to the 'group' span for different states -->
    <span data-slot="control" class="group inline-flex focus:outline-hidden"> <!-- This would be Headless.Checkbox -->
      <span class="... (base checkbox classes) ... ... (color classes) ...">
        <svg class="size-4 stroke-[var(--checkbox-check)] opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5" viewBox="0 0 14 14" fill="none">
          <path class="opacity-100 group-data-indeterminate:opacity-0" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path class="opacity-0 group-data-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>

    <!-- Label -->
    <label data-slot="label" class="text-sm text-zinc-900 dark:text-white cursor-pointer">Option 1</label>
    
    <!-- Optional Description -->
    <p data-slot="description" class="text-sm text-zinc-600 dark:text-zinc-400">Description for option 1.</p>
  </div>

  <!-- CheckboxField 2 (similar structure) ... -->

</div>
```

## Tailwind CSS Classes

### `CheckboxGroup`
Applied to the main `<div>` container for a group of checkboxes.
```plaintext
space-y-3
has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- `space-y-3`: Vertical spacing between checkbox fields.
- `has-data-[slot=description]:...`: Conditional styles applied if any child `CheckboxField` has a description. Increases spacing and makes labels medium weight. This relies on a parent element having `data-slot="description"` to trigger.

### `CheckboxField`
Applied to the `<div data-slot="field">` wrapping a single checkbox and its label/description.
```plaintext
grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]
*:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1
*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1
*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2
has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- Defines a grid for laying out the checkbox (`control`), label, and description.
- `*:data-[slot=...]`: Styles to position child elements marked with `data-slot` attributes.

### `Checkbox`
This is the visual checkbox element, typically a `<span>` wrapping an SVG icon. The outer `<span>` (from `Headless.Checkbox`) gets `group inline-flex focus:outline-hidden`. The inner styled `<span>` gets the following:

**Base visual classes (`base` array from `checkbox.tsx`):**
```plaintext
relative isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4
before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm
group-data-checked:before:bg-(--checkbox-checked-bg)
dark:before:hidden
dark:bg-white/5 dark:group-data-checked:bg-(--checkbox-checked-bg)
border border-zinc-950/15 group-data-checked:border-transparent group-data-hover:group-data-checked:border-transparent group-data-hover:border-zinc-950/30 group-data-checked:bg-(--checkbox-checked-border)
dark:border-white/15 dark:group-data-checked:border-white/5 dark:group-data-hover:group-data-checked:border-white/5 dark:group-data-hover:border-white/30
after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]
dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-data-checked:after:block
group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-blue-500
group-data-disabled:opacity-50
group-data-disabled:border-zinc-950/25 group-data-disabled:bg-zinc-950/5 group-data-disabled:[--checkbox-check:var(--color-zinc-950)]/50 group-data-disabled:before:bg-transparent
dark:group-data-disabled:border-white/20 dark:group-data-disabled:bg-white/[2.5%] dark:group-data-disabled:[--checkbox-check:var(--color-white)]/50 dark:group-data-checked:group-data-disabled:after:hidden
forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-data-disabled:[--checkbox-check:Highlight]
dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-data-disabled:[--checkbox-check:Highlight]
```

**Color Variant Classes (`colors` object from `checkbox.tsx`):**
These define CSS variables like `--checkbox-check`, `--checkbox-checked-bg`, `--checkbox-checked-border`. Default color is `dark/zinc`.
```javascript
const colors = {
  'dark/zinc': [
    '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-900)] [--checkbox-checked-border:var(--color-zinc-950)]/90',
    'dark:[--checkbox-checked-bg:var(--color-zinc-600)]',
  ],
  'dark/white': [ /* ... */ ],
  white:  '[--checkbox-check:var(--color-zinc-900)] [--checkbox-checked-bg:var(--color-white)] [--checkbox-checked-border:var(--color-zinc-950)]/15',
  // ... (all other color definitions from checkbox.tsx)
  rose: '[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-rose-500)] [--checkbox-checked-border:var(--color-rose-600)]/90',
};
```
*(Full list omitted for brevity)*

**SVG Icon (inside the styled `<span>`):**
```html
<svg class="size-4 stroke-(--checkbox-check) opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5" viewBox="0 0 14 14" fill="none">
  <!-- Checkmark icon -->
  <path class="opacity-100 group-data-indeterminate:opacity-0" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Indeterminate icon -->
  <path class="opacity-0 group-data-indeterminate:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
```
- `stroke-(--checkbox-check)`: Stroke color from CSS variable.
- `opacity-0 group-data-checked:opacity-100`: Checkmark visible when checked.
- `opacity-100 group-data-indeterminate:opacity-0` (on checkmark path): Hides checkmark if indeterminate.
- `opacity-0 group-data-indeterminate:opacity-100` (on indeterminate path): Shows line if indeterminate.

## Notes for Usage

*   **JavaScript for State:** Functionality (checked, indeterminate, disabled states, ARIA attributes) is heavily reliant on JavaScript (Headless UI in the original).
*   **Data Attributes:** `group-data-checked`, `group-data-indeterminate`, `group-data-focus`, `group-data-disabled` on the styled `<span>` (or its parent `group`) control the visual appearance.
*   **CSS Variables:** Catalyst's specific CSS variable patterns (e.g., `var(--color-zinc-900)`) are used. These would need to be defined or replaced with standard Tailwind utilities.
*   **Label and Description:** Assumed to be standard HTML `<label>` and `<p>` (or `<span>`) elements, styled and positioned by `CheckboxField`.

This Markdown file provides the HTML structure and class details from Catalyst's Checkbox components for analysis and adaptation.
