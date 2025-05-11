# Catalyst Input Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Input` and `InputGroup` components. These examples are intended for AI consumption and may need adaptation. The `Input` component wraps `Headless.Input`.

## `Input` Component

The `Input` component is a styled text input field.

### HTML Structure Example (Conceptual)

The Catalyst `Input` component has an outer `<span>` wrapper for effects like focus rings and background shadows, and an inner `<input>` element (from `Headless.Input`).

```html
<!-- Outer span wrapper -->
<span 
  data-slot="control" 
  class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500 ... (state classes like has-data-disabled, has-data-invalid) ..."
>
  <!-- Actual input element -->
  <input 
    type="text" 
    class="relative block w-full appearance-none rounded-lg px-[calc(var(--spacing-3-5)-1px)] py-[calc(var(--spacing-2-5)-1px)] sm:px-[calc(var(--spacing-3)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-hidden ... (state classes like data-invalid, data-disabled) ..." 
    placeholder="Enter text..." 
  />
</span>
```

### Tailwind CSS Classes

**Outer `<span data-slot="control">` wrapper:**
```plaintext
relative block w-full
before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm
dark:before:hidden
after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500
has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none
has-data-invalid:before:shadow-red-500/10
```
- This wrapper provides background/shadow effects and the focus ring.
- `has-data-disabled` and `has-data-invalid` classes change appearance based on the input's state (requires JS to set these data attributes on this span or the input).

**Inner `<input>` element (from `Headless.Input`):**
Base classes:
```plaintext
relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]
text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white
border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20
bg-transparent dark:bg-white/5
focus:outline-hidden
dark:scheme-dark
```
State-specific classes for the `<input>`:
- Invalid state: `data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500`
- Disabled state: `data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15`

Classes for date/time input types (to reset WebKit styles):
```plaintext
[&::-webkit-datetime-edit-fields-wrapper]:p-0
[&::-webkit-date-and-time-value]:min-h-[1.5em]
[&::-webkit-datetime-edit]:inline-flex
[&::-webkit-datetime-edit]:p-0
[&::-webkit-datetime-edit-year-field]:p-0
[&::-webkit-datetime-edit-month-field]:p-0
[&::-webkit-datetime-edit-day-field]:p-0
[&::-webkit-datetime-edit-hour-field]:p-0
[&::-webkit-datetime-edit-minute-field]:p-0
[&::-webkit-datetime-edit-second-field]:p-0
[&::-webkit-datetime-edit-millisecond-field]:p-0
[&::-webkit-datetime-edit-meridiem-field]:p-0
```

## `InputGroup` Component

The `InputGroup` component is a `<span>` used to wrap an `Input` and optional leading/trailing icons.

### HTML Structure Example (Input with Leading Icon)

```html
<span 
  data-slot="control" 
  class="relative isolate block has-[[data-slot=icon]:first-child]:[&_input]:pl-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 *:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4 [&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 *:data-[slot=icon]:text-zinc-500 dark:*:data-[slot=icon]:text-zinc-400"
>
  <!-- Leading Icon -->
  <svg data-slot="icon" class="..." viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="..." />
  </svg>
  
  <!-- Catalyst Input component (structure as above) -->
  <span data-slot="control" class="... outer input span classes ...">
    <input type="text" class="... inner input classes ..." placeholder="Search..." />
  </span>
</span>
```

### Tailwind CSS Classes for `InputGroup` (`<span>`)
```plaintext
relative isolate block
has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8
*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4
[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5
*:data-[slot=icon]:text-zinc-500 dark:*:data-[slot=icon]:text-zinc-400
```
- `has-[...]:[&_input]:pl-10 / pr-10`: Uses the `:has()` pseudo-class to check for child icons with `data-slot="icon"` and adjusts the padding of the nested `input` accordingly. This is a modern CSS feature.
- `*:data-[slot=icon]:...`: Styles for any child element marked with `data-slot="icon"`, positioning it absolutely.

## Notes for Usage

*   **State Management:** Data attributes like `data-hover`, `data-focus`, `data-disabled`, `data-invalid` on the input element and its wrapper control styling. These would typically be managed by JavaScript.
*   **CSS Variables:** Classes like `px-[calc(var(--spacing-3.5)-1px)]` and `before:rounded-[calc(var(--radius-lg)-1px)]` use CSS variables that need to be defined (e.g., `--spacing-3.5`, `--radius-lg`).
*   **Icons in `InputGroup`:** Icons should have `data-slot="icon"` to be styled and positioned correctly by `InputGroup`.
*   **Headless UI:** The core `Input` component in Catalyst wraps `Headless.Input`, which provides accessibility benefits.

This Markdown file provides the HTML structure and class details from Catalyst's Input components for analysis and adaptation.
