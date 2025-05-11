# Catalyst Text Styling Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's text styling components: `Text`, `TextLink`, `Strong`, and `Code`. These examples are intended for AI consumption and may need adaptation.

## Overview

Catalyst provides several utility components for common text styling needs:
- **`Text`**: For general paragraph text with default styling.
- **`TextLink`**: For inline links with specific styling.
- **`Strong`**: For bold text with specific styling.
- **`Code`**: For styling inline code snippets.

## `Text` Component

Renders a `<p>` tag with base text styling, often used for descriptions or secondary text.

### HTML Structure Example
```html
<p data-slot="text" class="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
  This is a paragraph of text using the Text component styling.
</p>
```

### Tailwind CSS Classes for `Text`
```plaintext
text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400
```
- `data-slot="text"` is often added for contextual styling by parent components.
- `text-base/6 sm:text-sm/6`: Responsive typography (font size and line height).
- `text-zinc-500 dark:text-zinc-400`: Text color with dark mode variant.

## `TextLink` Component

Renders an `<a>` tag (via Catalyst's `Link` component) styled as an inline text link.

### HTML Structure Example
```html
<a href="#" class="text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white">
  This is a text link.
</a>
```

### Tailwind CSS Classes for `TextLink`
```plaintext
text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white
```
- `text-zinc-950 dark:text-white`: Base text color.
- `underline`: Adds an underline.
- `decoration-zinc-950/50 dark:decoration-white/50`: Sets the underline color and opacity.
- `data-hover:decoration-zinc-950 dark:data-hover:decoration-white`: Changes underline on hover (requires JS to set `data-hover` or use of `:hover` variant if preferred).

## `Strong` Component

Renders a `<strong>` tag for semantically important bold text.

### HTML Structure Example
```html
<strong class="font-medium text-zinc-950 dark:text-white">
  Important text
</strong>
```

### Tailwind CSS Classes for `Strong`
```plaintext
font-medium text-zinc-950 dark:text-white
```
- `font-medium`: Sets font weight.
- `text-zinc-950 dark:text-white`: Text color.

## `Code` Component

Renders a `<code>` tag for styling inline code snippets.

### HTML Structure Example
```html
<code class="rounded-sm border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white">
  inlineCodeExample()
</code>
```

### Tailwind CSS Classes for `Code`
```plaintext
rounded-sm border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white
```
- `rounded-sm`: Small border radius.
- `border border-zinc-950/10 dark:border-white/20`: Border styling.
- `bg-zinc-950/[2.5%] dark:bg-white/5`: Background color.
- `px-0.5`: Horizontal padding.
- `text-sm font-medium sm:text-[0.8125rem]`: Typography. Note the specific font size `sm:text-[0.8125rem]`.
- `text-zinc-950 dark:text-white`: Text color.

## Notes for Usage
*   These components provide consistent text styling across an application.
*   `TextLink` relies on the Catalyst `Link` component, which is a wrapper around `Headless.DataInteractive` and `<a>`.
*   The `data-hover` attributes on `TextLink` would typically be managed by JavaScript if not using `:hover` variants in Tailwind.

This Markdown file provides the HTML structure and class details from Catalyst's Text components for analysis and adaptation.
