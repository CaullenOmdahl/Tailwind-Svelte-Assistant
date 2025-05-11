# Catalyst Heading & Subheading Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Heading` and `Subheading` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## `Heading` Component

The `Heading` component renders a semantic HTML heading element (`<h1>` to `<h6>`) with specific styling. The heading level defaults to `1`.

### HTML Structure Example

The `level` prop determines the tag (`h1`, `h2`, etc.).

**Level 1 Heading (Default):**
```html
<h1 class="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
  Main Heading Text
</h1>
```

**Level 2 Heading:**
```html
<h2 class="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
  Section Heading Text
</h2>
```
*(And so on for `h3` through `h6`)*

### Tailwind CSS Classes for `Heading`
Applied to the `<h1>` - `<h6>` element:
```plaintext
text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white
```
- `text-2xl/8 sm:text-xl/8`: Sets font size and line height (responsive). `2xl` leading `8` (32px/32px) on small screens, `xl` leading `8` (24px/32px) on `sm` screens and up.
- `font-semibold`: Sets font weight.
- `text-zinc-950 dark:text-white`: Text color with dark mode variant.

## `Subheading` Component

The `Subheading` component is similar to `Heading` but uses a slightly smaller set of typography styles. The heading level defaults to `2`.

### HTML Structure Example

**Level 2 Subheading (Default):**
```html
<h2 class="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
  Subheading Text
</h2>
```

**Level 3 Subheading:**
```html
<h3 class="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
  Smaller Subheading Text
</h3>
```

### Tailwind CSS Classes for `Subheading`
Applied to the `<h1>` - `<h6>` element:
```plaintext
text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white
```
- `text-base/7 sm:text-sm/6`: Sets font size and line height (responsive). `base` leading `7` (16px/28px) on small screens, `sm` leading `6` (14px/24px) on `sm` screens and up.
- `font-semibold`: Sets font weight.
- `text-zinc-950 dark:text-white`: Text color with dark mode variant.

## Notes for Usage

*   **Semantic Levels:** Choose the appropriate `level` prop (1-6) to maintain correct document semantics for accessibility and SEO. The styling is independent of the chosen level for `Heading` and `Subheading` respectively, but the HTML tag changes.
*   **Customization:** Additional classes can be passed via the `className` prop to customize further.

This Markdown file provides the HTML structure and class details from Catalyst's Heading components for analysis and adaptation.
