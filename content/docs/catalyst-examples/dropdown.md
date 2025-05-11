# Catalyst Dropdown Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's Dropdown component family. These examples are intended for AI consumption and may need adaptation for specific projects or frameworks. The Catalyst Dropdown system is built upon Headless UI's Menu components.

## Overview

The Catalyst Dropdown provides a flexible system for creating dropdown menus. It consists of several components:

- **`Dropdown`**: The main container, typically wrapping `Headless.Menu`.
- **`DropdownButton`**: The trigger element, often a Catalyst `Button` or `Link`. Wraps `Headless.MenuButton`.
- **`DropdownMenu`**: The floating panel that contains the menu items. Wraps `Headless.MenuItems`.
- **`DropdownItem`**: A selectable item within the menu. Can be a button or a link. Wraps `Headless.MenuItem`.
- **`DropdownHeader`**: A `div` for custom content at the top of the menu, outside of scrollable items.
- **`DropdownSection`**: A logical grouping of items. Wraps `Headless.MenuSection`.
- **`DropdownHeading`**: A heading for a section. Wraps `Headless.MenuHeading`.
- **`DropdownDivider`**: A visual separator between items or sections. Wraps `Headless.MenuSeparator`.
- **`DropdownLabel`**: For the main text within a `DropdownItem`. Wraps `Headless.Label`.
- **`DropdownDescription`**: For secondary text within a `DropdownItem`. Wraps `Headless.Description`.
- **`DropdownShortcut`**: Displays keyboard shortcuts associated with a `DropdownItem`.

## HTML Structure Example (Conceptual)

A functional dropdown requires JavaScript for state management, positioning, keyboard navigation, and ARIA attributes. This HTML is a conceptual representation.

```html
<!-- Dropdown (Headless.Menu container) -->
<div class="relative inline-block text-left">
  
  <!-- DropdownButton (e.g., Catalyst Button) -->
  <button type="button" class="... (classes for Catalyst Button) ..." id="menu-button" aria-expanded="true" aria-haspopup="true">
    Options
    <!-- Optional: dropdown icon -->
  </button>

  <!-- DropdownMenu (Headless.MenuItems panel) - shown/hidden by JS -->
  <div 
    class="isolate w-max rounded-xl p-1 outline outline-transparent focus:outline-hidden overflow-y-auto bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75 shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset ... (anchor & transition classes) ..."
    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
    style="position: absolute; ... (positioning styles from Headless UI) ...">
    
    <!-- Optional DropdownHeader -->
    <div class="col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3">
      <p class="text-sm text-zinc-700 dark:text-zinc-300">Header Content</p>
    </div>

    <!-- DropdownSection (Headless.MenuSection) -->
    <div role="none" class="col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]">
      
      <!-- Optional DropdownHeading -->
      <div role="presentation" class="col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400">
        Section Title
      </div>

      <!-- DropdownItem (as button) -->
      <button type="button" role="menuitem" tabindex="-1"
        class="group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5 text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white ... (grid & icon/avatar classes) ...">
        <span data-slot="label" class="col-start-2 row-start-1">Edit</span>
        <span data-slot="description" class="col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 ...">Edit this item</span>
        <kbd class="col-start-5 row-start-1 flex justify-self-end">
          <kbd class="min-w-[2ch] text-center font-sans text-zinc-400 capitalize ...">⌘</kbd>
          <kbd class="min-w-[2ch] text-center font-sans text-zinc-400 capitalize ...">E</kbd>
        </kbd>
      </button>

      <!-- DropdownItem (as link) -->
      <a href="#" role="menuitem" tabindex="-1"
        class="group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5 text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white ...">
        <span data-slot="label" class="col-start-2 row-start-1">View Profile</span>
      </a>
      
      <!-- DropdownDivider -->
      <hr role="separator" aria-orientation="horizontal" class="col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]" />
      
      <!-- Another DropdownItem -->
    </div>
  </div>
</div>
```

## Tailwind CSS Classes

### `DropdownMenu` (Panel)
```plaintext
[--anchor-gap:var(--spacing-2)] [--anchor-padding:var(--spacing-1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]
isolate w-max rounded-xl p-1
outline outline-transparent focus:outline-hidden
overflow-y-auto
bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75
shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset
supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]
transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0
```
- Anchor classes define positioning relative to `DropdownButton`.
- `supports-[...]`: Conditional grid layout for subgrid support.

### `DropdownItem`
```plaintext
group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5
text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]
data-focus:bg-blue-500 data-focus:text-white
data-disabled:opacity-50
forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:data-[slot=icon]:text-[HighlightText]
col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid
*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:mr-2 sm:*:data-[slot=icon]:size-4
*:data-[slot=icon]:text-zinc-500 data-focus:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400 dark:data-focus:*:data-[slot=icon]:text-white
*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5
```
- Complex grid and subgrid setup for aligning icons, labels, descriptions, and shortcuts.
- `data-slot` attributes are used to style child elements like icons and avatars.

### `DropdownHeader`
```plaintext
col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3
```

### `DropdownSection`
```plaintext
col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]
```

### `DropdownHeading`
```plaintext
col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400
```

### `DropdownDivider`
```plaintext
col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]
```

### `DropdownLabel`
```plaintext
col-start-2 row-start-1 
```
- (Additional classes like `truncate` might be applied directly on the element using this component).

### `DropdownDescription`
```plaintext
col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-focus:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-focus:text-[HighlightText]
```

### `DropdownShortcut` (Outer `kbd` element)
```plaintext
col-start-5 row-start-1 flex justify-self-end
```
Inner `kbd` elements for individual characters:
```plaintext
min-w-[2ch] text-center font-sans text-zinc-400 capitalize group-data-focus:text-white forced-colors:group-data-focus:text-[HighlightText]
index > 0 && char.length > 1 && 'pl-1' // Logic for padding longer key names
```

## Notes for Usage
*   **JavaScript is Crucial:** All interactive aspects (opening, closing, selection, keyboard navigation, ARIA states) are managed by JavaScript (Headless UI).
*   **Data Attributes:** Styling relies heavily on `data-` attributes (e.g., `data-focus`, `data-selected`, `data-disabled`, `data-anchor`) set by Headless UI.
*   **CSS Variables & Subgrid:** Uses CSS variables like `--spacing(...)` and `supports-[grid-template-columns:subgrid]` for advanced layout, indicating modern CSS features.
*   **Composition:** The components are designed to be composed together to build various dropdown menu layouts.

This Markdown file provides the HTML structure and class details from Catalyst's Dropdown components for analysis and adaptation.
