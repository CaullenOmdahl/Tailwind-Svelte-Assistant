# Catalyst Textarea Component - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's `Textarea` component. These examples are intended for AI consumption and may need adaptation. The `Textarea` component wraps `Headless.Textarea` to style a native HTML `<textarea>` element.

## Overview

The Catalyst `Textarea` component provides styling for the native HTML `<textarea>` element, making its appearance consistent with other Catalyst form controls. It supports a `resizable` prop (defaulting to `true`).

## HTML Structure Example (Conceptual)

The component consists of an outer `<span>` wrapper (for focus ring and background effects) and the `<textarea>` element itself.

```html
<!-- Outer span wrapper -->
<span 
  data-slot="control" 
  class="relative block w-full before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500 ... (state classes like has-data-disabled) ..."
>
  <!-- Native textarea element (Headless.Textarea) -->
  <textarea 
    class="relative block h-full w-full appearance-none rounded-lg px-[calc(var(--spacing-3-5)-1px)] py-[calc(var(--spacing-2-5)-1px)] sm:px-[calc(var(--spacing-3)-1px)] sm:py-[calc(var(--spacing-1-5)-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-hidden resize-y ... (state classes) ..."
    rows="3"
    placeholder="Enter your message..."
  ></textarea>
</span>
```

## Tailwind CSS Classes

### Outer `<span data-slot="control">` Wrapper
```plaintext
relative block w-full
before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm
dark:before:hidden
after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500
has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none
```
- This wrapper provides background/shadow effects and the focus ring, similar to the `Input` component.
- `has-data-disabled` class changes appearance based on the textarea's state.

### `<textarea>` Element (from `Headless.Textarea`)
Base classes:
```plaintext
relative block h-full w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]
text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white
border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20
bg-transparent dark:bg-white/5
focus:outline-hidden
```
State-specific classes for the `<textarea>`:
- Invalid state: `data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600`
- Disabled state: `disabled:border-zinc-950/20 dark:disabled:border-white/15 dark:disabled:bg-white/[2.5%] dark:data-hover:disabled:border-white/15` (Note: uses `disabled:` variant directly on textarea, while wrapper uses `has-data-disabled:`)

Resizable class (based on `resizable` prop, default `true`):
- If `resizable` is `true`: `resize-y`
- If `resizable` is `false`: `resize-none`

## Notes for Usage

*   **Native Element:** This component styles the native HTML `<textarea>` element.
*   **State Management:** Data attributes like `data-hover`, `data-focus`, `data-invalid` on the textarea and `has-data-disabled` on its wrapper control styling. These would typically be managed by JavaScript or through Headless UI.
*   **CSS Variables:** Uses CSS variables like `--spacing(...)` and `--radius-lg`.
*   **Headless UI:** The component wraps `Headless.Textarea`, which can provide enhanced accessibility and state management.

This Markdown file provides the HTML structure and class details from Catalyst's Textarea component for analysis and adaptation.
