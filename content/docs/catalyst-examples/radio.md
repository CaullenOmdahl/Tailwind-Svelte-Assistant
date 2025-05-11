# Catalyst Radio Button Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `RadioGroup`, `RadioField`, and `Radio` components. These examples are intended for AI consumption and may need adaptation. These components rely on Headless UI for functionality.

## Overview

The Catalyst Radio Button system provides accessible and styled radio inputs:
- **`RadioGroup`**: A container for a set of related radio buttons, ensuring only one can be selected. Wraps `Headless.RadioGroup`.
- **`RadioField`**: A wrapper for a single radio input along with its label and optional description. Wraps `Headless.Field`.
- **`Radio`**: The visual radio button element itself. Wraps `Headless.Radio`.

## HTML Structure Example (Conceptual)

JavaScript (Headless UI) is crucial for managing selection state, keyboard navigation, and ARIA attributes.

```html
<!-- RadioGroup -->
<div role="radiogroup" aria-labelledby="radio-group-label" class="space-y-3 **:data-[slot=label]:font-normal has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium">
  <!-- Optional: <label id="radio-group-label">Group Label</label> -->

  <!-- RadioField 1 -->
  <div data-slot="field" class="grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr] *:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1 *:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1 *:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2 has-data-[slot=description]:**:data-[slot=label]:font-medium">
    
    <!-- Radio Control (Headless.Radio wrapped in a span) -->
    <!-- Add 'data-checked' or 'data-disabled' to the 'group' span for different states -->
    <span data-slot="control" class="group inline-flex focus:outline-hidden" role="radio" aria-checked="false" tabindex="-1">
      <!-- Visual part of the radio button -->
      <span class="... (base radio classes) ... ... (color classes) ...">
        <span class="size-full rounded-full border-[4.5px] border-transparent bg-[var(--radio-indicator)] bg-clip-padding forced-colors:border-[Canvas] forced-colors:group-data-checked:border-[Highlight]"></span>
      </span>
    </span>

    <!-- Label (associated with the radio control) -->
    <label data-slot="label" class="text-sm text-zinc-900 dark:text-white cursor-pointer">Option A</label>
    
    <!-- Optional Description -->
    <p data-slot="description" class="text-sm text-zinc-600 dark:text-zinc-400">Description for option A.</p>
  </div>

  <!-- RadioField 2 (similar structure, aria-checked="true" if selected) ... -->

</div>
```

## Tailwind CSS Classes

### `RadioGroup` (`<div role="radiogroup">`)
```plaintext
space-y-3 **:data-[slot=label]:font-normal
has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- `space-y-3`: Vertical spacing between radio fields.
- `**:data-[slot=label]:font-normal`: Default font weight for labels within the group.
- `has-data-[slot=description]:...`: Conditional styles if descriptions are present, increasing spacing and making labels medium weight.

### `RadioField` (`<div data-slot="field">`)
```plaintext
grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]
*:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1
*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1
*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2
has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- Grid layout for the radio control, label, and description.

### `Radio` (Visual Element)
The `Headless.Radio` component (conceptualized as `<span data-slot="control" class="group...">` above) wraps the visual styled `<span>`.

**Outer styled `<span>` classes (combines `base` and a `colors` entry):**
Base classes (`base` array from `radio.tsx`):
```plaintext
relative isolate flex size-[1.1875rem] shrink-0 rounded-full sm:size-[1.0625rem]
before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:shadow-sm
group-data-checked:before:bg-(--radio-checked-bg)
dark:before:hidden
dark:bg-white/5 dark:group-data-checked:bg-(--radio-checked-bg)
border border-zinc-950/15 group-data-checked:border-transparent group-data-hover:group-data-checked:border-transparent group-data-hover:border-zinc-950/30 group-data-checked:bg-(--radio-checked-border)
dark:border-white/15 dark:group-data-checked:border-white/5 dark:group-data-hover:group-data-checked:border-white/5 dark:group-data-hover:border-white/30
after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_1px_--theme(--color-white/15%)]
dark:after:-inset-px dark:after:hidden dark:after:rounded-full dark:group-data-checked:after:block
[--radio-indicator:transparent] group-data-checked:[--radio-indicator:var(--radio-checked-indicator)] group-data-hover:group-data-checked:[--radio-indicator:var(--radio-checked-indicator)] group-data-hover:[--radio-indicator:var(--color-zinc-900)]/10
dark:group-data-hover:group-data-checked:[--radio-indicator:var(--radio-checked-indicator)] dark:group-data-hover:[--radio-indicator:var(--color-zinc-700)]
group-data-focus:outline group-data-focus:outline-2 group-data-focus:outline-offset-2 group-data-focus:outline-blue-500
group-data-disabled:opacity-50
group-data-disabled:border-zinc-950/25 group-data-disabled:bg-zinc-950/5 group-data-disabled:[--radio-checked-indicator:var(--color-zinc-950)]/50 group-data-disabled:before:bg-transparent
dark:group-data-disabled:border-white/20 dark:group-data-disabled:bg-white/[2.5%] dark:group-data-disabled:[--radio-checked-indicator:var(--color-white)]/50 dark:group-data-checked:group-data-disabled:after:hidden
```

**Color Variant Classes (`colors` object from `radio.tsx`):**
These define CSS variables like `--radio-checked-bg`, `--radio-checked-border`, `--radio-checked-indicator`. Default color is `dark/zinc`.
```javascript
const colors = {
  'dark/zinc': [
    '[--radio-checked-bg:var(--color-zinc-900)] [--radio-checked-border:var(--color-zinc-950)]/90 [--radio-checked-indicator:var(--color-white)]',
    'dark:[--radio-checked-bg:var(--color-zinc-600)]',
  ],
  // ... (all other color definitions from radio.tsx, full list omitted for brevity)
  rose: '[--radio-checked-indicator:var(--color-white)] [--radio-checked-bg:var(--color-rose-500)] [--radio-checked-border:var(--color-rose-600)]/90',
};
```

**Inner indicator `<span>` (the dot):**
```plaintext
size-full rounded-full border-[4.5px] border-transparent bg-[var(--radio-indicator)] bg-clip-padding
forced-colors:border-[Canvas] forced-colors:group-data-checked:border-[Highlight]
```
- `bg-[var(--radio-indicator)]`: The dot's color is controlled by the `--radio-indicator` CSS variable, which is set by the base and color classes on the parent.

## Notes for Usage
*   **JavaScript for Functionality:** Headless UI manages the core logic (selection, keyboard support, ARIA states).
*   **Data Attributes:** Styling relies on `group-data-checked`, `group-data-focus`, `group-data-disabled` on the parent `group` (the `Headless.Radio` element) to style the visual parts.
*   **CSS Variables:** Catalyst's specific CSS variable patterns are used extensively.
*   **Label and Description:** These are typically associated with the radio input via `RadioField` and Headless UI's context.

This Markdown file provides the HTML structure and class details from Catalyst's Radio Button components for analysis and adaptation.
