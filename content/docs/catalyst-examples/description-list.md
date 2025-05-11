# Catalyst Description List Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `DescriptionList`, `DescriptionTerm`, and `DescriptionDetails` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## Overview

The Catalyst Description List is used to display key-value pairs, typically using a `<dl>` (description list) element containing `<dt>` (term) and `<dd>` (details) pairs.

## HTML Structure Example

```html
<dl class="grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,var(--spacing-80))_auto] sm:text-sm/6">
  
  <!-- Item 1 -->
  <dt class="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
    Full name
  </dt>
  <dd class="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5">
    John Doe
  </dd>

  <!-- Item 2 -->
  <dt class="col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5">
    Email address
  </dt>
  <dd class="pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5">
    john.doe@example.com
  </dd>

  <!-- More items... -->
</dl>
```

## Tailwind CSS Classes

### `DescriptionList` (`<dl>`)
The main container for the list.
```plaintext
grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,var(--spacing-80))_auto] sm:text-sm/6
```
- `grid grid-cols-1 sm:grid-cols-[min(50%,var(--spacing-80))_auto]`: Defines a single-column layout on small screens and a two-column layout on `sm` screens and up. The first column's width is the minimum of 50% or the value of a CSS variable `--spacing-80` (likely a fixed max-width like `20rem` or `320px` if `--spacing-80` corresponds to `theme(spacing.80)`). The second column takes the remaining space.
- `text-base/6 sm:text-sm/6`: Sets base font size and line height, responsive.

### `DescriptionTerm` (`<dt>`)
For the term or label part of an item.
```plaintext
col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5
```
- `col-start-1`: Ensures the term is always in the first column in the grid.
- `border-t border-zinc-950/5 dark:border-white/5`: Top border styling.
- `pt-3 sm:py-3`: Padding.
- `text-zinc-500 dark:text-zinc-400`: Text color for the term.
- `first:border-none`: Removes the top border from the very first term in the list.
- `sm:border-t`: On small screens and up, the border behavior might be slightly different due to the `sm:py-3` which applies padding on all sides for the term, effectively making the border appear between rows of dt/dd pairs.

### `DescriptionDetails` (`<dd>`)
For the details or value part of an item.
```plaintext
pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5
```
- `pt-1 pb-3 sm:py-3`: Padding.
- `text-zinc-950 dark:text-white`: Text color for the details.
- `sm:border-t sm:border-zinc-950/5 dark:sm:border-white/5`: On small screens and up, adds a top border, aligning with the term's border.
- `sm:nth-2:border-none`: This is an interesting one. `nth-2` is not a standard Tailwind variant. It might be a custom variant or a typo. If it's intended to target the second `dd` in a group (or similar), it would likely require custom CSS or a plugin. Assuming it might be related to how items are laid out in two columns on `sm` screens, where the `dd` would be in the second column. A more standard way to handle alternating row styling or specific child styling in a grid might involve `odd:` or `even:` variants if applied to direct children of the `dl`, or more complex `:nth-child` selectors in custom CSS. *For the purpose of this documentation, the class is listed as-is from the source.*

## Notes for Usage

*   **Layout:** The component uses a CSS grid to create a responsive two-column layout for terms and details on larger screens, and a stacked layout on smaller screens.
*   **CSS Variables:** The `sm:grid-cols-[min(50%,var(--spacing-80))_auto]` class uses a CSS variable `--spacing-80`. This variable would need to be defined elsewhere (e.g., in global CSS or via a Tailwind plugin) for the layout to work as intended. It likely corresponds to a value from Tailwind's spacing scale.
*   **`sm:nth-2:border-none`:** This class on `DescriptionDetails` is unusual. Its exact effect depends on how `nth-2` is interpreted or implemented in the project's Tailwind setup. It might be intended to remove the top border for the first `dd` element in the second column on `sm` screens, but this is speculative.

This Markdown file provides the HTML structure and class details from Catalyst's Description List components for analysis and adaptation.
