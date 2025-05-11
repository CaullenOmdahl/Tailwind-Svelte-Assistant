# Catalyst Combobox Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Combobox`, `ComboboxOption`, `ComboboxLabel`, and `ComboboxDescription` components. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks. These components are heavily reliant on Headless UI for functionality.

## Overview

The Catalyst Combobox is a complex input control that combines a text input with a dropdown list of selectable options, allowing users to type to filter options or select from the list. It consists of:
- `Combobox`: The main container, including the input field and the dropdown button.
- `ComboboxOptions`: The floating panel that displays the list of selectable options.
- `ComboboxOption`: An individual item within the options list.
- `ComboboxLabel`: Used within a `ComboboxOption` for the primary display text.
- `ComboboxDescription`: Used within a `ComboboxOption` for secondary, descriptive text.

## HTML Structure Example (Conceptual)

This is a simplified conceptual HTML structure. A real implementation requires significant JavaScript for filtering, keyboard navigation, state management (open/closed, selected item, active item), ARIA attributes, and transitions, all of which Headless UI handles in the React version.

```html
<!-- Combobox container (from Headless.Combobox) -->
<div class="relative">

  <!-- Control wrapper span (data-slot="control") -->
  <span class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500 ...">
    
    <!-- Input field (Headless.ComboboxInput) -->
    <input 
      type="text" 
      aria-label="Assignee" 
      placeholder="Select person..."
      class="relative block w-full appearance-none rounded-lg py-[calc(var(--spacing-2-5)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)] pr-[calc(var(--spacing-10)-1px)] pl-[calc(var(--spacing-3-5)-1px)] sm:pr-[calc(var(--spacing-9)-1px)] sm:pl-[calc(var(--spacing-3)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-hidden ..." 
    />

    <!-- Combobox Button (dropdown arrow) -->
    <button type="button" class="group absolute inset-y-0 right-0 flex items-center px-2">
      <svg class="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 group-data-hover:stroke-zinc-700 sm:size-4 dark:stroke-zinc-400 dark:group-data-hover:stroke-zinc-300 forced-colors:stroke-[CanvasText]" viewBox="0 0 16 16" aria-hidden="true" fill="none">
        <path d="M5.75 10.75L8 13L10.25 10.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.25 5.25L8 3L5.75 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </span>

  <!-- Options Panel (Headless.ComboboxOptions) - shown/hidden by JS -->
  <div class="isolate min-w-[calc(var(--input-width)+8px)] scroll-py-1 rounded-xl p-1 select-none empty:invisible outline outline-transparent focus:outline-hidden overflow-y-scroll overscroll-contain bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75 shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 ..."
    style="position: absolute; left: 0px; top: 100%; --anchor-gap:var(--spacing-2); ..."> <!-- Anchor positioning classes and style set by Headless UI -->
    
    <!-- ComboboxOption 1 -->
    <div class="group/option grid w-full cursor-default grid-cols-[1fr_var(--spacing-5)] items-baseline gap-x-2 rounded-lg py-2.5 pr-2 pl-3.5 sm:grid-cols-[1fr_var(--spacing-4)] sm:py-1.5 sm:pr-2 sm:pl-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText] outline-hidden data-focus:bg-blue-500 data-focus:text-white ..."
      role="option" tabindex="-1" aria-selected="false">
      <span class="flex min-w-0 items-center ... (shared option classes) ...">
        <!-- Optional icon/avatar -->
        <span data-slot="label" class="ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0">Option Text 1</span>
        <span class="flex flex-1 overflow-hidden text-zinc-500 group-data-focus/option:text-white before:w-2 before:min-w-0 before:shrink dark:text-zinc-400">
          <span data-slot="description" class="flex-1 truncate">Description for option 1</span>
        </span>
      </span>
      <svg class="relative col-start-2 hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 8.5l3 3L12 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <!-- More ComboboxOption elements... -->
  </div>
</div>
```

## Tailwind CSS Classes

### `Combobox` - Outer Control Wrapper (`<span data-slot="control">`)
```plaintext
relative block w-full
before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm
dark:before:hidden
after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500
has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none
has-data-invalid:before:shadow-red-500/10
```

### `ComboboxInput` (`<input>`)
```plaintext
relative block w-full appearance-none rounded-lg py-[calc(var(--spacing-2-5)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)]
pr-[calc(var(--spacing-10)-1px)] pl-[calc(var(--spacing-3-5)-1px)] sm:pr-[calc(var(--spacing-9)-1px)] sm:pl-[calc(var(--spacing-3)-1px)]
text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white
border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20
bg-transparent dark:bg-white/5
focus:outline-hidden
data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500
data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15
dark:scheme-dark
```

### `ComboboxButton` (Dropdown Arrow `<button>`)
```plaintext
group absolute inset-y-0 right-0 flex items-center px-2
```
SVG inside button:
```plaintext
size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 group-data-hover:stroke-zinc-700 sm:size-4 dark:stroke-zinc-400 dark:group-data-hover:stroke-zinc-300 forced-colors:stroke-[CanvasText]
```

### `ComboboxOptions` (Dropdown Panel `<div>`)
```plaintext
[--anchor-gap:var(--spacing-2)] [--anchor-padding:var(--spacing-4)] sm:data-[anchor~=start]:[--anchor-offset:-4px]
isolate min-w-[calc(var(--input-width)+8px)] scroll-py-1 rounded-xl p-1 select-none empty:invisible
outline outline-transparent focus:outline-hidden
overflow-y-scroll overscroll-contain
bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75
shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset
transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 data-transition:pointer-events-none
```
- Anchor positioning classes (e.g., `[--anchor-gap:...]`) are used by Headless UI's positioning logic.

### `ComboboxOption` (`<div>`)
Base classes for each option:
```plaintext
group/option grid w-full cursor-default grid-cols-[1fr_var(--spacing-5)] items-baseline gap-x-2 rounded-lg py-2.5 pr-2 pl-3.5 sm:grid-cols-[1fr_var(--spacing-4)] sm:py-1.5 sm:pr-2 sm:pl-3
text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]
outline-hidden data-focus:bg-blue-500 data-focus:text-white
forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]
data-disabled:opacity-50
```
Shared classes for content wrapper span inside option:
```plaintext
flex min-w-0 items-center
*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 sm:*:data-[slot=icon]:size-4
*:data-[slot=icon]:text-zinc-500 group-data-focus/option:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400
forced-colors:*:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focus/option:*:data-[slot=icon]:text-[Canvas]
*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5
```
Selected checkmark SVG (inside option):
```plaintext
relative col-start-2 hidden size-5 self-center stroke-current group-data-selected/option:inline sm:size-4
```

### `ComboboxLabel` (`<span>`)
```plaintext
ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0
```

### `ComboboxDescription` (`<span>`)
Outer span:
```plaintext
flex flex-1 overflow-hidden text-zinc-500 group-data-focus/option:text-white before:w-2 before:min-w-0 before:shrink dark:text-zinc-400
```
Inner span for truncation:
```plaintext
flex-1 truncate
```

## Notes for Usage

*   **Heavy JavaScript Dependence:** This component is highly interactive and relies almost entirely on JavaScript (Headless UI) for its behavior, including option filtering, keyboard navigation, ARIA attributes, managing open/closed states, and handling selection. The HTML and CSS provide the appearance.
*   **Data Attributes:** State-based styling (focus, disabled, selected, invalid, open/closed) is driven by data attributes set by Headless UI.
*   **CSS Variables:** Uses Catalyst-specific CSS variables (e.g., `var(--radius-lg)`, `var(--spacing-...)`). These would need to be defined in a global stylesheet or replaced.
*   **Render Props:** The React component uses render props for `children` in `Combobox` and `ComboboxOptions`, allowing flexible rendering of options. This is a React pattern.

This Markdown file provides the HTML structure and class details from Catalyst's Combobox components for analysis and adaptation.
