# Catalyst Divider Component - HTML & Tailwind CSS Examples

This document provides the HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Divider` component. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## Overview

The `Divider` component renders a horizontal rule (`<hr>`) used to separate content. It has a `soft` variant for a lighter border.

## HTML Structure Example

```html
<!-- Default Divider -->
<hr role="presentation" class="w-full border-t border-zinc-950/10 dark:border-white/10" />

<!-- Soft Divider -->
<hr role="presentation" class="w-full border-t border-zinc-950/5 dark:border-white/5" />
```

## Tailwind CSS Classes

The component is an `<hr>` element with the following classes:

**Base classes:**
```plaintext
w-full border-t
```
- `w-full`: Makes the divider span the full width of its container.
- `border-t`: Applies a top border, which visually acts as the horizontal line.

**Conditional classes based on `soft` prop:**

- **If `soft` is `true`:**
  ```plaintext
  border-zinc-950/5 dark:border-white/5
  ```
  (Lighter border opacity)

- **If `soft` is `false` (default):**
  ```plaintext
  border-zinc-950/10 dark:border-white/10
  ```
  (Standard border opacity)

The `role="presentation"` attribute indicates that the divider is purely presentational.

## Notes for Usage

*   This is a simple presentational component.
*   The color and opacity of the border change based on the `soft` prop and dark mode.

This Markdown file provides the HTML structure and class details from Catalyst's Divider component for analysis and adaptation.
