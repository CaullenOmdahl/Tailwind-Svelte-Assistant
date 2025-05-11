# Catalyst Switch Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `SwitchGroup`, `SwitchField`, and `Switch` components. These examples are intended for AI consumption and may need adaptation. These components rely on Headless UI for functionality.

## Overview

The Catalyst Switch system provides accessible and styled toggle switches:
- **`SwitchGroup`**: A container for a set of related switches.
- **`SwitchField`**: A wrapper for a single switch along with its label and optional description, providing layout. Wraps `Headless.Field`.
- **`Switch`**: The visual toggle switch element itself. Wraps `Headless.Switch`.

## HTML Structure Example (Conceptual)

JavaScript (Headless UI) is crucial for managing on/off state, keyboard navigation, and ARIA attributes.

```html
<!-- SwitchGroup -->
<div class="space-y-3 **:data-[slot=label]:font-normal has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium">

  <!-- SwitchField 1 -->
  <div data-slot="field" class="grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto] *:data-[slot=control]:col-start-2 *:data-[slot=control]:self-start sm:*:data-[slot=control]:mt-0.5 *:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1 *:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2 has-data-[slot=description]:**:data-[slot=label]:font-medium">
    
    <!-- Label -->
    <label data-slot="label" class="text-sm text-zinc-900 dark:text-white cursor-pointer">Enable Feature</label>
    
    <!-- Optional Description -->
    <p data-slot="description" class="text-sm text-zinc-600 dark:text-zinc-400">Turn this feature on or off.</p>

    <!-- Switch Control (Headless.Switch) -->
    <!-- Add 'data-checked' or 'data-disabled' to the button for different states -->
    <button 
      type="button" 
      data-slot="control" 
      role="switch" 
      aria-checked="false" 
      class="group relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-[3px] sm:h-5 sm:w-8 transition duration-0 ease-in-out data-changing:duration-200 forced-colors:outline forced-colors:[--switch-bg:Highlight] dark:forced-colors:[--switch-bg:Highlight] bg-zinc-200 ring-1 ring-black/5 ring-inset dark:bg-white/5 dark:ring-white/15 ... (color classes) ..."
    >
      <span aria-hidden="true" class="pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5 translate-x-0 transition duration-200 ease-in-out border border-transparent bg-white shadow-sm ring-1 ring-black/5 group-data-checked:bg-[var(--switch)] group-data-checked:shadow-[var(--switch-shadow)] group-data-checked:ring-[var(--switch-ring)] group-data-checked:translate-x-4 sm:group-data-checked:translate-x-3 ..."></span>
    </button>
  </div>

  <!-- SwitchField 2 (similar structure) ... -->

</div>
```

## Tailwind CSS Classes

### `SwitchGroup` (`<div>`)
```plaintext
space-y-3 **:data-[slot=label]:font-normal
has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- Similar to `CheckboxGroup` and `RadioGroup`.

### `SwitchField` (`<div data-slot="field">`)
```plaintext
grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]
*:data-[slot=control]:col-start-2 *:data-[slot=control]:self-start sm:*:data-[slot=control]:mt-0.5
*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1
*:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2
has-data-[slot=description]:**:data-[slot=label]:font-medium
```
- Grid layout typically places the label/description on the left and the switch control on the right.

### `Switch` (Visual Element - `Headless.Switch` typically rendered as a `button`)
**Outer `button` (track):**
Base classes:
```plaintext
group relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-[3px] sm:h-5 sm:w-8
transition duration-0 ease-in-out data-changing:duration-200
forced-colors:outline forced-colors:[--switch-bg:Highlight] dark:forced-colors:[--switch-bg:Highlight]
```
Unchecked state classes:
```plaintext
bg-zinc-200 ring-1 ring-black/5 ring-inset dark:bg-white/5 dark:ring-white/15
```
Checked state classes (these define CSS variables used by color classes):
```plaintext
data-checked:bg-(--switch-bg) data-checked:ring-(--switch-bg-ring) dark:data-checked:bg-(--switch-bg) dark:data-checked:ring-(--switch-bg-ring)
```
Focus state classes:
```plaintext
focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500
```
Hover state classes:
```plaintext
data-hover:ring-black/15 data-hover:data-checked:ring-(--switch-bg-ring)
dark:data-hover:ring-white/25 dark:data-hover:data-checked:ring-(--switch-bg-ring)
```
Disabled state classes:
```plaintext
data-disabled:bg-zinc-200 data-disabled:opacity-50 data-disabled:data-checked:bg-zinc-200 data-disabled:data-checked:ring-black/5
dark:data-disabled:bg-white/15 dark:data-disabled:data-checked:bg-white/15 dark:data-disabled:data-checked:ring-white/15
```
Color-specific classes (from `colors` object, applied to the track, defining CSS variables):
```javascript
const colors = {
  'dark/zinc': [
    '[--switch-bg-ring:var(--color-zinc-950)]/90 [--switch-bg:var(--color-zinc-900)] dark:[--switch-bg-ring:transparent] dark:[--switch-bg:var(--color-white)]/25',
    '[--switch-ring:var(--color-zinc-950)]/90 [--switch-shadow:var(--color-black)]/10 [--switch:white] dark:[--switch-ring:var(--color-zinc-700)]/90',
  ],
  // ... (all other color definitions from switch.tsx, full list omitted for brevity)
  rose: [
    '[--switch-bg-ring:var(--color-rose-600)]/90 [--switch-bg:var(--color-rose-500)] dark:[--switch-bg-ring:transparent]',
    '[--switch:white] [--switch-ring:var(--color-rose-600)]/90 [--switch-shadow:var(--color-rose-900)]/20',
  ],
};
```

**Inner `<span>` (knob):**
Base classes:
```plaintext
pointer-events-none relative inline-block size-[1.125rem] rounded-full sm:size-3.5
translate-x-0 transition duration-200 ease-in-out
border border-transparent
```
Unchecked state classes for knob:
```plaintext
bg-white shadow-sm ring-1 ring-black/5
```
Checked state classes for knob:
```plaintext
group-data-checked:bg-(--switch) group-data-checked:shadow-(--switch-shadow) group-data-checked:ring-(--switch-ring)
group-data-checked:translate-x-4 sm:group-data-checked:translate-x-3
```
Disabled state classes for knob when checked:
```plaintext
group-data-checked:group-data-disabled:bg-white group-data-checked:group-data-disabled:shadow-sm group-data-checked:group-data-disabled:ring-black/5
```

## Notes for Usage
*   **JavaScript for State:** Headless UI manages the on/off state, ARIA attributes, and transitions.
*   **Data Attributes:** Styling relies on `data-checked`, `data-focus`, `data-hover`, `data-disabled`, and `data-changing` on the switch element (the `group`).
*   **CSS Variables:** Catalyst's specific CSS variable patterns are used for theming colors and shadows.
*   **Label and Description:** Typically associated via `SwitchField` and Headless UI.

This Markdown file provides the HTML structure and class details from Catalyst's Switch components for analysis and adaptation.
