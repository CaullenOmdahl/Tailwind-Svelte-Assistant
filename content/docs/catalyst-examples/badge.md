# Catalyst Badge Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Badge` and `BadgeButton` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks.

## `Badge` Component

The `Badge` component is typically a small `<span>` used to highlight information, such as a status or category.

### Basic HTML Structure

```html
<span class="... (base classes + color classes) ...">
  Badge Text
</span>
```
If the badge contains an icon and text, it might look like:
```html
<span class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10">
  <!-- Optional icon -->
  <svg class="size-3.5" viewBox="0 0 14 14" fill="currentColor">
    <path d="..." />
  </svg>
  Badge Text
</span>
```

### Tailwind CSS Classes for `Badge`

**Base classes (applied to the `<span>`):**
```plaintext
inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline
```
- `inline-flex items-center gap-x-1.5`: For layout if the badge contains an icon and text.
- `rounded-md px-1.5 py-0.5`: Padding and border radius.
- `text-sm/5 font-medium sm:text-xs/5`: Typography.
- `forced-colors:outline`: Styling for Windows High Contrast mode.

**Color Variant Classes:**
One of these class strings is added to the base classes, based on the chosen `color` prop (default is `zinc`).
The `group-data-hover` classes are for when the badge is part of a clickable `BadgeButton`.

```javascript
const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-hover:bg-red-500/20',
  orange: 'bg-orange-500/15 text-orange-700 group-data-hover:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-hover:bg-orange-500/20',
  amber: 'bg-amber-400/20 text-amber-700 group-data-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-hover:bg-amber-400/15',
  yellow: 'bg-yellow-400/20 text-yellow-700 group-data-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-hover:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15',
  green: 'bg-green-500/15 text-green-700 group-data-hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-hover:bg-green-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-700 group-data-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-hover:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-hover:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-hover:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-hover:bg-cyan-400/15',
  sky: 'bg-sky-500/15 text-sky-700 group-data-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-hover:bg-sky-500/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-hover:bg-blue-500/25 dark:text-blue-400 dark:group-data-hover:bg-blue-500/25', // Note: dark:bg-blue-500/15 seems missing in original for dark:text-blue-400
  indigo: 'bg-indigo-500/15 text-indigo-700 group-data-hover:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-hover:bg-indigo-500/20',
  violet: 'bg-violet-500/15 text-violet-700 group-data-hover:bg-violet-500/25 dark:text-violet-400 dark:group-data-hover:bg-violet-500/20',
  purple: 'bg-purple-500/15 text-purple-700 group-data-hover:bg-purple-500/25 dark:text-purple-400 dark:group-data-hover:bg-purple-500/20',
  fuchsia: 'bg-fuchsia-400/15 text-fuchsia-700 group-data-hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-hover:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-hover:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-hover:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-hover:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10', // Default
}
```

**Example: Zinc Badge (Default)**
```html
<span class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10">
  Default Badge
</span>
```

## `BadgeButton` Component

Wraps a `Badge` to make it clickable.

### HTML Structure Example

**As a button:**
```html
<button type="button" class="group relative inline-flex rounded-md focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500">
  <!-- TouchTarget wrapper -->
  <span> <!-- In React, this is TouchTarget component -->
    <!-- Badge component as above -->
    <span class="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10">
      Clickable Badge
    </span>
    <span class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden" aria-hidden="true"></span>
  </span>
</button>
```

### Tailwind CSS Classes for `BadgeButton`

Applied to the root `<button>` or `<a>` element:
```plaintext
group relative inline-flex rounded-md focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500
```
- `group`: Essential for the `group-data-hover:` variants in the `Badge`'s color classes to work.
- `relative inline-flex rounded-md`: Basic layout and shaping.
- `focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500`: Focus styling.

## Notes for Usage

*   **TouchTarget:** The `BadgeButton` uses a `TouchTarget` concept for accessibility.
*   **JavaScript for State:** Data attributes like `data-focus` and `data-hover` (implicitly for `group-data-hover`) would be managed by JavaScript.
*   **Interactivity:** The `group-data-hover` classes on the badge rely on the parent `BadgeButton` having a `data-hover` attribute when hovered.

This Markdown file provides the HTML structure and class details from Catalyst's Badge components for analysis and adaptation.
