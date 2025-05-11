# Catalyst Fieldset Components - HTML & Tailwind CSS Examples

This document provides HTML structure and Tailwind CSS class examples derived from the React-based Catalyst UI Kit's components for creating forms with fieldsets: `Fieldset`, `Legend`, `FieldGroup`, `Field`, `Label`, `Description`, and `ErrorMessage`. These examples are intended for AI consumption and may need adaptation. These components often wrap Headless UI components.

## Overview

The Catalyst fieldset system helps structure forms semantically and visually.
- **`Fieldset`**: The main container, typically a `<fieldset>` element.
- **`Legend`**: The title for a `Fieldset`, typically a `<legend>` element.
- **`FieldGroup`**: A `<div>` to group multiple `Field` components, adding vertical spacing.
- **`Field`**: A container for a single form control (like an input) along with its `Label`, `Description`, and `ErrorMessage`. Wraps `Headless.Field`.
- **`Label`**: The label for a form control. Wraps `Headless.Label`.
- **`Description`**: Additional help text for a field. Wraps `Headless.Description`.
- **`ErrorMessage`**: Displays validation errors for a field. Wraps `Headless.Description`.

## HTML Structure Example (Conceptual)

JavaScript and Headless UI handle the association between labels, descriptions, errors, and input elements for accessibility.

```html
<form>
  <!-- Fieldset -->
  <fieldset class="*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6">
    <!-- Legend -->
    <legend class="text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
      User Profile
    </legend>
    <p data-slot="text" class="text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400">Update your personal information.</p> <!-- Example of text styled by Fieldset -->

    <!-- FieldGroup -->
    <div data-slot="control" class="space-y-8"> <!-- FieldGroup is a div with data-slot="control" for Fieldset spacing -->
      
      <!-- Field 1 -->
      <div class="[&>[data-slot=label]+[data-slot=control]]:mt-3 [&>[data-slot=label]+[data-slot=description]]:mt-1 [&>[data-slot=description]+[data-slot=control]]:mt-3 [&>[data-slot=control]+[data-slot=description]]:mt-3 [&>[data-slot=control]+[data-slot=error]]:mt-3 *:data-[slot=label]:font-medium">
        <!-- Label -->
        <label data-slot="label" for="username" class="text-base/6 text-zinc-950 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
          Username
        </label>
        <!-- Description -->
        <p data-slot="description" class="text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400">
          Your public display name.
        </p>
        <!-- Control (e.g., Catalyst Input component) -->
        <div data-slot="control">
          <input type="text" id="username" name="username" class="... (classes for Catalyst Input) ..." />
        </div>
        <!-- ErrorMessage -->
        <p data-slot="error" class="text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500">
          Username is required.
        </p>
      </div>

      <!-- Field 2 (similar structure) ... -->

    </div> <!-- End FieldGroup -->
  </fieldset>
</form>
```

## Tailwind CSS Classes

### `Fieldset` (`<fieldset>`)
```plaintext
*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6
```
- `*:data-[slot=text]:mt-1`: Adds margin-top to child elements marked with `data-slot="text"` (e.g., a paragraph below a `Legend`).
- `[&>*+[data-slot=control]]:mt-6`: Adds margin-top to a `FieldGroup` (marked with `data-slot="control"`) if it follows another element (like `Legend` or text).

### `Legend` (`<legend>`)
```plaintext
text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white
```

### `FieldGroup` (`<div data-slot="control">`)
```plaintext
space-y-8
```
- Provides vertical spacing between `Field` components within it.

### `Field` (`<div>` wrapping a single form control and its related elements)
```plaintext
[&>[data-slot=label]+[data-slot=control]]:mt-3
[&>[data-slot=label]+[data-slot=description]]:mt-1
[&>[data-slot=description]+[data-slot=control]]:mt-3
[&>[data-slot=control]+[data-slot=description]]:mt-3
[&>[data-slot=control]+[data-slot=error]]:mt-3
*:data-[slot=label]:font-medium
```
- These classes use complex child selectors (`[&>...]`) to manage spacing between `Label`, `Description`, `ErrorMessage`, and the form `control` itself, based on their order.
- `*:data-[slot=label]:font-medium`: Makes labels inside this field medium font weight.

### `Label` (`<label data-slot="label">`)
```plaintext
text-base/6 text-zinc-950 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white
```

### `Description` (`<p data-slot="description">` or similar)
```plaintext
text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400
```

### `ErrorMessage` (`<p data-slot="error">` or similar)
```plaintext
text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500
```

## Notes for Usage

*   **Accessibility:** Headless UI (which these components wrap) typically handles ARIA attributes and associations between inputs, labels, descriptions, and errors. A static HTML implementation would require manual addition of these ARIA properties (e.g., `aria-describedby`, `aria-labelledby`, `aria-invalid`).
*   **`data-slot` Attributes:** Styling heavily relies on `data-slot` attributes on child elements to identify them (e.g., `data-slot="label"`, `data-slot="control"`).
*   **Complex Selectors:** The spacing logic within `Field` uses Tailwind's arbitrary variant selectors (`[&>...]`) to apply margins based on the sibling order of slotted elements.
*   **Form Controls:** The actual input elements (text inputs, checkboxes, etc.) are separate components (like Catalyst `Input`, `Checkbox`) and would be placed inside the `div` marked with `data-slot="control"` within a `Field`.

This Markdown file provides the HTML structure and class details from Catalyst's Fieldset components for analysis and adaptation.
