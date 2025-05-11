# Catalyst Table Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's Table component family. These examples are intended for AI consumption and may need adaptation. The components use React Context to propagate styling options.

## Overview

The Catalyst Table system provides components to build styled and responsive tables:
- **`Table`**: The main wrapper `<div>` that sets up context for styling options (`bleed`, `dense`, `grid`, `striped`) and contains the actual `<table>` element.
- **`TableHead`**: The `<thead>` element.
- **`TableBody`**: The `<tbody>` element.
- **`TableRow`**: The `<tr>` element. Can be made clickable by providing an `href`.
- **`TableHeader`**: The `<th>` (header cell) element.
- **`TableCell`**: The `<td>` (data cell) element. If its row has an `href`, the cell content is wrapped by an invisible link.

## HTML Structure Example (Conceptual)

This example demonstrates a basic table structure. In React, props like `bleed`, `dense`, `grid`, and `striped` on the `Table` component, and `href` on `TableRow`, would dynamically alter classes or behavior. For static HTML, these variations would be applied by choosing the correct set of classes.

```html
<!-- Table wrapper (provides context and overflow handling) -->
<div class="flow-root">
  <div class="-mx-[var(--gutter)] overflow-x-auto whitespace-nowrap"> <!-- Assuming --gutter is defined, e.g. theme(spacing.6) -->
    <div class="inline-block min-w-full align-middle sm:px-[var(--gutter)]">
      <table class="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
        
        <!-- TableHead -->
        <thead class="text-zinc-500 dark:text-zinc-400">
          <tr>
            <!-- TableHeader -->
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Name</th>
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Title</th>
            <th class="border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10 sm:first:pl-1 sm:last:pr-1">Email</th>
          </tr>
        </thead>

        <!-- TableBody -->
        <tbody>
          <!-- TableRow (example of a clickable row) -->
          <tr class="hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5% আনুগত্য"> <!-- Add striped classes if applicable -->
            <!-- TableCell -->
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 sm:first:pl-1 sm:last:pr-1">
              <a href="#user1" data-row-link class="absolute inset-0 focus:outline-hidden" aria-label="View John Doe" tabindex="0"></a>
              John Doe
            </td>
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 sm:first:pl-1 sm:last:pr-1">Developer</td>
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] border-b border-zinc-950/5 dark:border-white/5 sm:first:pl-1 sm:last:pr-1">john.doe@example.com</td>
          </tr>
          
          <!-- Another TableRow (not clickable, striped example) -->
          <tr class="even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5% আনুগত্য">
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] sm:first:pl-1 sm:last:pr-1">Jane Smith</td> <!-- No border-b if striped=true -->
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] sm:first:pl-1 sm:last:pr-1">Designer</td>
            <td class="relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] sm:first:pl-1 sm:last:pr-1">jane.smith@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## Tailwind CSS Classes

### `Table` (Outer `<div>` wrappers)
First wrapper (`<div class="flow-root">`): No specific classes beyond `flow-root`.
Second wrapper (`<div class="-mx-(--gutter) ...">`):
```plaintext
-mx-(--gutter) overflow-x-auto whitespace-nowrap
```
- `(--gutter)` is a CSS variable, likely representing horizontal padding (e.g., `theme(spacing.6)`).
Third wrapper (`<div class="inline-block ...">`):
```plaintext
inline-block min-w-full align-middle
// Conditional padding if not 'bleed':
sm:px-(--gutter) 
```
Innermost `<table>` element:
```plaintext
min-w-full text-left text-sm/6 text-zinc-950 dark:text-white
```

### `TableHead` (`<thead>`)
```plaintext
text-zinc-500 dark:text-zinc-400
```

### `TableBody` (`<tbody>`)
- No specific classes by default.

### `TableRow` (`<tr>`)
Base: No specific classes by default.
Conditional classes:
- If `href` is provided (clickable row):
  ```plaintext
  has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]
  ```
  (Plus hover effects below)
- If `striped` is true:
  ```plaintext
  even:bg-zinc-950/[2.5%] dark:even:bg-white/[2.5%]
  ```
- Hover effects if `href` is provided:
  - If `striped`: `hover:bg-zinc-950/5 dark:hover:bg-white/5`
  - If not `striped`: `hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]`

### `TableHeader` (`<th>`)
```plaintext
border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10
// Conditional if 'grid' is true:
border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5
// Conditional if not 'bleed':
sm:first:pl-1 sm:last:pr-1
```
- `first:pl-(--gutter,--spacing(2))`: Uses a CSS variable `--gutter` if available, otherwise defaults to `theme(spacing.2)`. This syntax for fallback in a class name is specific to Catalyst's setup.

### `TableCell` (`<td>`)
Base classes:
```plaintext
relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))
```
Conditional classes:
- If not `striped`: `border-b border-zinc-950/5 dark:border-white/5`
- If `grid` is true: `border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5`
- If `dense` is true: `py-2.5` (otherwise `py-4`)
- If not `bleed`: `sm:first:pl-1 sm:last:pr-1`

If `href` is provided on the parent `TableRow`, an `<a>` tag is rendered inside the `<td>`:
```html
<a data-row-link href="..." target="..." aria-label="..." tabindex="..." class="absolute inset-0 focus:outline-hidden"></a>
```
- `tabindex` is `0` for the first cell in a clickable row, `-1` for others.

## Notes for Usage
*   **React Context:** Styling options (`bleed`, `dense`, `grid`, `striped`) are passed via React Context from `Table` to child components. In static HTML, these would translate to manually applying the correct conditional classes.
*   **Clickable Rows:** If `href` is provided to `TableRow`, each `TableCell` within that row becomes part of a larger link.
*   **CSS Variables & Fallbacks:** Uses CSS variables like `(--gutter)` with a fallback syntax `first:pl-(--gutter,--spacing(2))`. This implies `--gutter` might be defined by a parent layout component, or it falls back to a theme spacing value.
*   **Modern CSS:** Uses `:has()` pseudo-class for some conditional styling.

This Markdown file provides the HTML structure and class details from Catalyst's Table components for analysis and adaptation.
