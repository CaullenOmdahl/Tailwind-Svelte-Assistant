# Catalyst Button Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Button` component. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## Basic HTML Structure

The button can render as a `<button>` or an `<a>` tag if an `href` is provided.

**Button Element:**
```html
<button type="button" class="...">
  <!-- Optional: Icon with data-slot -->
  <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="..." />
  </svg>
  Button Text
  <!-- TouchTarget (for accessibility, increases hit area on touch devices) -->
  <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
</button>
```

**Anchor Element:**
```html
<a href="#" class="...">
  <!-- Optional: Icon with data-slot -->
  <svg data-slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="..." />
  </svg>
  Link Text
  <!-- TouchTarget -->
  <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
</a>
```

## Tailwind CSS Classes from Catalyst

The following classes are defined in the Catalyst `button.tsx` component's `styles` object. Note that Catalyst uses specific CSS variable conventions (e.g., `text-(--btn-icon)`, `bg-(--btn-border)`) which might require a corresponding Tailwind/CSS setup or be replaced with standard Tailwind utility classes.

### Base Styles (`styles.base`)
Applied to all buttons:
```plaintext
relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold
px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6
focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500
data-disabled:opacity-50
*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]
```

### Solid Variant Styles (`styles.solid`)
Used for solid buttons, combined with a color style.
```plaintext
border-transparent bg-(--btn-border)
dark:bg-(--btn-bg)
before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)
before:shadow-sm
dark:before:hidden
dark:border-white/5
after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]
after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]
data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)
dark:after:-inset-px dark:after:rounded-lg
data-disabled:before:shadow-none data-disabled:after:shadow-none
```

### Outline Variant Styles (`styles.outline`)
```plaintext
border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/[2.5%] data-hover:bg-zinc-950/[2.5%]
dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5
[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]
```

### Plain Variant Styles (`styles.plain`)
```plaintext
border-transparent text-zinc-950 data-active:bg-zinc-950/5 data-hover:bg-zinc-950/5
dark:text-white dark:data-active:bg-white/10 dark:data-hover:bg-white/10
[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]
```

### Color Variant Styles (`styles.colors`)
These are combined with `styles.solid` for solid buttons. Each color has its own set of classes.

**Example: `dark/zinc` color**
```plaintext
text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10
dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5
[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]
```

**Example: `indigo` color**
```plaintext
text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)]/90
[--btn-icon:var(--color-indigo-300)] data-active:[--btn-icon:var(--color-indigo-200)] data-hover:[--btn-icon:var(--color-indigo-200)]
```

**(Full list of colors from `button.tsx` `styles.colors` object):**
```javascript
{
  'dark/zinc': [
    'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
    'dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5',
    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
  ],
  light: [
    'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/[2.5%] data-active:[--btn-border:var(--color-zinc-950)]/15 data-hover:[--btn-border:var(--color-zinc-950)]/15',
    'dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ],
  'dark/white': [
    'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
    'dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:var(--color-zinc-950)]/5',
    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ],
  dark: [
    'text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10',
    'dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]',
    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
  ],
  white: [
    'text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/[2.5%] data-active:[--btn-border:var(--color-zinc-950)]/15 data-hover:[--btn-border:var(--color-zinc-950)]/15',
    'dark:[--btn-hover-overlay:var(--color-zinc-950)]/5',
    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-500)] data-hover:[--btn-icon:var(--color-zinc-500)]',
  ],
  zinc: [
    'text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-zinc-600)] [--btn-border:var(--color-zinc-700)]/90',
    'dark:[--btn-hover-overlay:var(--color-white)]/5',
    '[--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]',
  ],
  indigo: [ /* ...omitted for brevity, see full list in button.tsx ... */ ],
  cyan: [ /* ... */ ],
  red: [ /* ... */ ],
  orange: [ /* ... */ ],
  amber: [ /* ... */ ],
  yellow: [ /* ... */ ],
  lime: [ /* ... */ ],
  green: [ /* ... */ ],
  emerald: [ /* ... */ ],
  teal: [ /* ... */ ],
  sky: [ /* ... */ ],
  blue: [ /* ... */ ],
  violet: [ /* ... */ ],
  purple: [ /* ... */ ],
  fuchsia: [ /* ... */ ],
  pink: [ /* ... */ ],
  rose: [ /* ... */ ],
}
```
*(Note: The full list of color classes is extensive and has been truncated here for display. The actual `button.tsx` contains all definitions.)*

## Combining Classes (Example)

To create a **solid button** with the **`dark/zinc` color**:
The classes would be a combination of `styles.base`, `styles.solid`, and `styles.colors['dark/zinc']`.

```html
<button 
  class="
    relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold
    px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6
    focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500
    data-disabled:opacity-50
    *:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]
    border-transparent bg-(--btn-border)
    dark:bg-(--btn-bg)
    before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)
    before:shadow-sm
    dark:before:hidden
    dark:border-white/5
    after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]
    after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]
    data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)
    dark:after:-inset-px dark:after:rounded-lg
    data-disabled:before:shadow-none data-disabled:after:shadow-none
    text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10
    dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5
    [--btn-icon:var(--color-zinc-400)] data-active:[--btn-icon:var(--color-zinc-300)] data-hover:[--btn-icon:var(--color-zinc-300)]
  "
>
  Solid Dark/Zinc Button
  <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
</button>
```

## Notes for Usage

*   **CSS Variables & Catalyst Specifics:** The classes use CSS variables like `--btn-bg`, `--btn-border`, `--btn-hover-overlay`, and `--btn-icon`. These are typically defined by the color variant classes (e.g., `[--btn-bg:var(--color-zinc-900)]`). The `var(--color-...)` syntax implies these color variables are expected to be defined globally or through a theming system. The `px-[calc(--spacing(3.5)-1px)]` syntax is also specific to Catalyst's setup. When adapting these, you might replace these with standard Tailwind utilities or your own design tokens.
*   **Data Attributes for State:** Styling for hover, focus, and active states often relies on data attributes like `data-hover`, `data-focus`, `data-active`, `data-disabled`. These would need to be applied dynamically with JavaScript in a real application.
*   **Icons:** Icons are expected to have `data-slot="icon"`. The base styles include selectors like `*:data-[slot=icon]:...` to style them.
*   **TouchTarget:** The `<span>` with class `absolute top-1/2...` is for improving touch accessibility. It should be included within the button/anchor.

This Markdown file provides the raw HTML and class structures from Catalyst's Button for analysis and adaptation.
