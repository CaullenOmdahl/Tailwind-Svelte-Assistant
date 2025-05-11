# Catalyst Link Component - HTML & Tailwind CSS Examples

This document provides information about the React-based Catalyst UI Kit's `Link` component. These examples are intended for AI consumption and may need adaptation.

## Overview

The `Link` component in Catalyst is a wrapper around a standard HTML `<a>` (anchor) tag. It uses `Headless.DataInteractive` from Headless UI, which helps manage data attributes for interactive states (like hover, focus) for accessibility.

**Important Note from Source Code:**
The Catalyst `Link` component is often intended as a placeholder. Users are encouraged to update this component to use their client-side framework's specific link component (e.g., for Next.js, Remix, Inertia.js) to enable client-side routing. See the Catalyst documentation for more details: [https://catalyst.tailwindui.com/docs#client-side-router-integration](https://catalyst.tailwindui.com/docs#client-side-router-integration)

## HTML Structure Example

For basic HTML representation, the `Link` component renders an `<a>` tag. The `Headless.DataInteractive` wrapper typically doesn't render a DOM element itself but provides context or applies data attributes to its children.

```html
<!-- 
  In React, this would be:
  <Headless.DataInteractive>
    <a href="/example" class="...">Link Text</a>
  </Headless.DataInteractive>

  For a static HTML example, it's essentially:
-->
<a href="/example" class="... (any applied classes) ..." data-headlessui-state="... (managed by Headless UI)">
  Link Text
</a>
```

## Tailwind CSS Classes

The `Link` component itself does not define a specific set of Tailwind CSS classes. Instead, classes are typically passed to it when it's used by other components (like `Button` or `DropdownItem` when they have an `href` prop).

For example, if a `Button` component uses `Link` internally, the `Button`'s styling classes would be applied to the `<a>` tag rendered by `Link`.

Example (conceptual, if a link needs to look like a plain text link):
```html
<a href="#" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
  A Standard Link
</a>
```

## Notes for Usage

*   **Client-Side Routing:** This component is a prime candidate for integration with framework-specific routing links (e.g., `next/link`, Remix `Link`).
*   **Styling:** Style the link by passing Tailwind CSS classes via the `className` prop. Many Catalyst components (like `Button`, `DropdownItem`) do this automatically when an `href` is provided.
*   **Accessibility:** `Headless.DataInteractive` helps ensure that data attributes reflecting the element's state (hover, focus) are correctly applied, which can be used for styling and by assistive technologies.

This Markdown file provides information on Catalyst's Link component for analysis and adaptation.
