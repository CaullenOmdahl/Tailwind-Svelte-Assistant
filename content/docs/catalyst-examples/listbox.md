# Catalyst Listbox Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Listbox`, `ListboxOption`, `ListboxLabel`, and `ListboxDescription` components. These examples are intended for AI consumption and may need adaptation. These components are built upon Headless UI's Listbox components.

## Overview

The Catalyst Listbox is a custom-styled select dropdown, allowing users to choose a single option from a list. It consists of:
- `Listbox`: The main container, wrapping `Headless.Listbox`.
- `ListboxButton`: The button element that displays the currently selected value (or a placeholder) and toggles the dropdown.
- `ListboxOptions`: The floating panel that displays the list of selectable options.
- `ListboxOption`: An individual item within the options list.
- `ListboxLabel`: Used within a `ListboxOption` for the primary display text.
- `ListboxDescription`: Used within a `ListboxOption` for secondary, descriptive text.

## HTML Structure Example (Conceptual)

Significant JavaScript (from Headless UI) is required for functionality (state management, keyboard navigation, ARIA attributes, transitions).

```html
<!-- Listbox container (from Headless.Listbox) -->
<div class="relative">

  <!-- ListboxButton (Headless.ListboxButton) -->
  <button 
    type="button" 
    data-slot="control" 
    aria-haspopup="listbox" 
    aria-expanded="false" 
    class="group relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden focus:outline-hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset data-focus:after:ring-2 data-focus:after:ring-blue-500 ..."
  >
    <!-- Selected Option Display (Headless.ListboxSelectedOption) -->
    <span class="relative block w-full appearance-none rounded-lg py-[calc(var(--spacing-2-5)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)] min-h-11 sm:min-h-9 pr-[calc(var(--spacing-7)-1px)] pl-[calc(var(--spacing-3-5)-1px)] sm:pl-[calc(var(--spacing-3)-1px)] text-left text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText] border border-zinc-950/10 group-data-active:border-zinc-950/20 group-data-hover:border-zinc-950/20 dark:border-white/10 dark:group-data-active:border-white/20 dark:group-data-hover:border-white/20 bg-transparent dark:bg-white/5 ...">
      <!-- Selected value or placeholder -->
      <span class="block truncate">Selected Value</span> 
      <!-- Placeholder example: <span class="block truncate text-zinc-500">Select an option</span> -->
    </span>
    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <svg class="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]" viewBox="0 0 16 16" aria-hidden="true" fill="none">
        <path d="M5.75 10.75L8 13L10.25 10.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.25 5.25L8 3L5.75 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </button>

  <!-- ListboxOptions (Headless.ListboxOptions panel) - shown/hidden by JS -->
  <ul 
    class="isolate w-max min-w-[calc(var(--button-width)+1.75rem)] scroll-py-1 rounded-xl p-1 select-none outline outline-transparent focus:outline-hidden overflow-y-scroll overscroll-contain bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75 shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 ..."
    role="listbox" tabindex="-1"
    style="position: absolute; ... (positioning styles from Headless UI) ...">
    
    <!-- ListboxOption 1 -->
    <li 
      class="group/option grid cursor-default grid-cols-[var(--spacing-5)_1fr] items-baseline gap-x-2 rounded-lg py-2.5 pr-3.5 pl-2 sm:grid-cols-[var(--spacing-4)_1fr] sm:py-1.5 sm:pr-3 sm:pl-1.5 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText] outline-hidden data-focus:bg-blue-500 data-focus:text-white ..."
      role="option" tabindex="-1" aria-selected="true"> <!-- aria-selected dynamically set -->
      <svg class="relative hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 8.5l3 3L12 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="flex min-w-0 items-center col-start-2 ... (shared option classes) ...">
        <span class="ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0">Option Text 1</span>
        <!-- Optional description -->
      </span>
    </li>

    <!-- More ListboxOption elements... -->
  </ul>
</div>
```

## Tailwind CSS Classes

### `ListboxButton` (`<button data-slot="control">`)
Outer button element:
```plaintext
group relative block w-full
before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm
dark:before:hidden
focus:outline-hidden
after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset data-focus:after:ring-2 data-focus:after:ring-blue-500
data-disabled:opacity-50 data-disabled:before:bg-zinc-950/5 data-disabled:before:shadow-none
```
Inner `<span>` for selected option display (`Headless.ListboxSelectedOption`):
```plaintext
relative block w-full appearance-none rounded-lg py-[calc(var(--spacing-2-5)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)]
min-h-11 sm:min-h-9
pr-[calc(var(--spacing-7)-1px)] pl-[calc(var(--spacing-3-5)-1px)] sm:pl-[calc(var(--spacing-3)-1px)]
text-left text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]
border border-zinc-950/10 group-data-active:border-zinc-950/20 group-data-hover:border-zinc-950/20 dark:border-white/10 dark:group-data-active:border-white/20 dark:group-data-hover:border-white/20
bg-transparent dark:bg-white/5
group-data-invalid:border-red-500 group-data-hover:group-data-invalid:border-red-500 dark:group-data-invalid:border-red-600 dark:data-hover:group-data-invalid:border-red-600
group-data-disabled:border-zinc-950/20 group-data-disabled:opacity-100 dark:group-data-disabled:border-white/15 dark:group-data-disabled:bg-white/[2.5%] dark:group-data-disabled:data-hover:border-white/15
```
Dropdown arrow `<span>` and `<svg>`:
```plaintext
pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2
size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]
```

### `ListboxOptions` (Dropdown Panel `<ul>`)
```plaintext
[--anchor-offset:-1.625rem] [--anchor-padding:var(--spacing(4))] sm:[--anchor-offset:-1.375rem]
isolate w-max min-w-[calc(var(--button-width)+1.75rem)] scroll-py-1 rounded-xl p-1 select-none
outline outline-transparent focus:outline-hidden
overflow-y-scroll overscroll-contain
bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75
shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset
transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 data-transition:pointer-events-none
```

### `ListboxOption` (`<li>` or `<div>`)
Base classes for each option:
```plaintext
group/option grid cursor-default grid-cols-[var(--spacing-5)_1fr] items-baseline gap-x-2 rounded-lg py-2.5 pr-3.5 pl-2 sm:grid-cols-[var(--spacing-4)_1fr] sm:py-1.5 sm:pr-3 sm:pl-1.5
text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]
outline-hidden data-focus:bg-blue-500 data-focus:text-white
forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]
data-disabled:opacity-50
```
Shared classes for content wrapper `<span>` inside option:
```plaintext
flex min-w-0 items-center
*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-4
*:data-[slot=icon]:text-zinc-500 group-data-focus/option:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400
forced-colors:*:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focus/option:*:data-[slot=icon]:text-[Canvas]
*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5
```
Selected checkmark SVG (inside option):
```plaintext
relative hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4
```

### `ListboxLabel` (`<span>`)
```plaintext
ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0
```

### `ListboxDescription` (`<span>`)
Outer span:
```plaintext
flex flex-1 overflow-hidden text-zinc-500 group-data-focus/option:text-white before:w-2 before:min-w-0 before:shrink dark:text-zinc-400
```
Inner span for truncation:
```plaintext
flex-1 truncate
```

## Notes for Usage
*   **JavaScript Essential:** Functionality is heavily dependent on JavaScript (Headless UI).
*   **Data Attributes:** Styling relies on `data-` attributes (e.g., `data-focus`, `data-selected`, `data-disabled`, `data-open` on the button, `data-closed` on options panel) set by Headless UI.
*   **CSS Variables:** Uses Catalyst-specific CSS variables (e.g., `var(--radius-lg)`, `var(--spacing-...)`, `var(--button-width)`).

This Markdown file provides the HTML structure and class details from Catalyst's Listbox components for analysis and adaptation.
