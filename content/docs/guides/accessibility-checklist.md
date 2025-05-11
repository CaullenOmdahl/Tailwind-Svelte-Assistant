# Web Accessibility Checklist for Svelte & Tailwind CSS Components

Ensuring web accessibility (a11y) is crucial for creating inclusive and usable web experiences for everyone, including people with disabilities. This checklist provides guidelines and best practices for developing accessible Svelte components styled with Tailwind CSS.

## I. Keyboard Navigation & Focus Management

-   **[ ] Focus Visible:** Ensure all interactive elements (links, buttons, form fields, custom controls) have a clear and visible focus indicator.
    -   Tailwind: Use `focus:ring`, `focus:outline`, or other `focus:` variants. Do not disable default browser outlines without providing a better alternative.
    -   Test: Navigate using the Tab key. Is it always clear which element has focus?
-   **[ ] Logical Tab Order:** Ensure the tab order follows a logical sequence, typically matching the visual reading order.
    -   Check DOM order. Avoid using `tabindex` with positive values. Use `tabindex="0"` for custom controls that should be focusable and `tabindex="-1"` to remove elements from tab order programmatically.
-   **[ ] Interactive Elements are Focusable:** All clickable or interactive elements must be focusable.
    -   Use native HTML elements like `<button>`, `<a>`, `<input>`, `<select>`, `<textarea>` where possible, as they are focusable by default.
    -   If using `div` or `span` for custom interactive elements, add `tabindex="0"` and appropriate ARIA roles and keyboard event handlers.
-   **[ ] Keyboard Operability:** All functionality must be operable via keyboard alone.
    -   Custom components (sliders, dropdowns, modals) must have full keyboard support (e.g., arrow keys for sliders/menus, Enter/Space for activation, Escape to close modals/dropdowns).
    -   Refer to ARIA Authoring Practices Guide (APG) for keyboard interaction patterns for common widgets.
-   **[ ] Skip Links:** For pages with extensive navigation, provide a "Skip to main content" link that becomes visible on focus.
    -   Tailwind: Use `sr-only focus:not-sr-only` classes.

## II. Semantic HTML & ARIA

-   **[ ] Use Semantic HTML:** Use HTML elements according to their semantic meaning.
    -   `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<h1>`-`<h6>`, `<p>`, `<ul>`, `<ol>`, `<li>`, etc.
-   **[ ] ARIA Roles, States, and Properties:** Use ARIA attributes to enhance accessibility for custom components or when HTML semantics are insufficient.
    -   **Roles:** `role="button"`, `role="dialog"`, `role="menuitem"`, etc.
    -   **States & Properties:** `aria-expanded`, `aria-haspopup`, `aria-labelledby`, `aria-describedby`, `aria-current`, `aria-live`, `aria-hidden`, `aria-invalid`, `aria-required`.
    -   Ensure ARIA attributes are updated dynamically with JavaScript as component states change.
    -   Validate ARIA usage; incorrect ARIA is worse than no ARIA.
-   **[ ] Accessible Names:** All interactive elements and form inputs must have accessible names.
    -   Buttons: Text content or `aria-label`.
    -   Links: Meaningful text content or `aria-label`.
    -   Inputs: Associated `<label>` element, `aria-label`, or `aria-labelledby`.
-   **[ ] Landmarks:** Use landmark roles/elements to define regions of a page (`<main>`, `<nav>`, `role="search"`).
-   **[ ] Page Titles:** Each page should have a unique and descriptive `<title>` element.
    -   Svelte: Use `<svelte:head><title>Descriptive Title</title></svelte:head>`.
-   **[ ] Language Declaration:** Specify the language of the page using `<html lang="en">`.

## III. Forms

-   **[ ] Labels:** All form inputs must have programmatically associated labels.
    -   Use `<label for="inputId">` or wrap the input with the label. `aria-label` or `aria-labelledby` can be used as alternatives if a visible label is not feasible.
-   **[ ] Required Fields:** Clearly indicate required fields visually and programmatically (e.g., `required` attribute, `aria-required="true"`).
-   **[ ] Error Handling:**
    -   Provide clear, specific error messages when form validation fails.
    -   Associate error messages with their respective inputs using `aria-describedby`.
    -   Indicate invalid fields using `aria-invalid="true"`.
    -   Move focus to the first invalid field on submission failure, if appropriate.
    -   Use `aria-live` regions to announce errors dynamically.
-   **[ ] Grouping Related Controls:** Use `<fieldset>` and `<legend>` to group related form controls (e.g., radio buttons, checkboxes).

## IV. Images & Multimedia

-   **[ ] Alt Text:** All `<img>` elements must have an `alt` attribute.
    -   Descriptive alt text for informative images.
    -   Empty `alt=""` for decorative images.
    -   For complex images like charts or graphs, provide a longer description nearby or via a link.
-   **[ ] SVGs:**
    -   If an SVG is decorative: `aria-hidden="true"`.
    -   If an SVG is informative: provide an accessible name using `<title>` and `<desc>` elements within the SVG, and reference them with `aria-labelledby`.
-   **[ ] Video & Audio:**
    -   Provide captions for videos with audio.
    -   Provide transcripts for audio-only content and for videos where visual information is important.
    -   Provide audio descriptions for videos where visual information is not conveyed through the main audio track.
    -   Ensure media players are keyboard accessible and have accessible controls.

## V. Content & Readability

-   **[ ] Color Contrast:** Ensure sufficient color contrast between text and background.
    -   WCAG AA: 4.5:1 for normal text, 3:1 for large text (18pt or 14pt bold).
    -   Use contrast checker tools.
    -   Tailwind: Choose color combinations carefully. Be mindful of `opacity`.
-   **[ ] Responsive Design:** Ensure content is readable and functional at various screen sizes and zoom levels (up to 200% zoom without loss of content/functionality).
    -   Tailwind: Use responsive prefixes (`sm:`, `md:`, `lg:`) effectively.
-   **[ ] Text Resizing:** Users should be able to resize text up to 200% without breaking the layout or losing content.
-   **[ ] Clear Language:** Use clear and concise language. Avoid jargon where possible or provide explanations.
-   **[ ] Headings:** Use headings (`<h1>`-`<h6>`) to structure content hierarchically. Do not skip heading levels.
-   **[ ] Links:** Link text should be descriptive and make sense out of context (avoid "click here").

## VI. Dynamic Content & Interactions

-   **[ ] Modals & Dialogs:**
    -   Manage focus: When a modal opens, focus should move into the modal. When it closes, focus should return to the element that triggered it.
    -   Trap focus: Keyboard focus should be trapped within the modal while it is open.
    -   Close mechanism: Provide a clear way to close the modal (e.g., Escape key, close button).
    -   Use `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.
-   **[ ] Notifications & Alerts:** Use `aria-live` regions (`polite` or `assertive`) to announce dynamic changes or feedback to screen reader users.
-   **[ ] Custom Controls:** Ensure custom JavaScript-powered controls are fully accessible (e.g., custom select, date picker). Follow ARIA APG patterns.
    -   Svelte: Use actions for reusable accessibility enhancements.
-   **[ ] Transitions & Animations:**
    -   Ensure animations do not cause flashing or flickering that could trigger seizures (avoid flashing more than 3 times per second).
    -   Provide a mechanism to pause, stop, or hide animations if they are not essential (`prefers-reduced-motion` media query).
    -   Tailwind: `motion-safe:` and `motion-reduce:` variants.

## VII. Svelte Specifics

-   **[ ] `{#each}` blocks:** When rendering lists, ensure keys are unique and meaningful if the list can be reordered or filtered.
-   **[ ] `on:click` on non-interactive elements:** If adding click handlers to `div`s or `span`s, also add `role="button"` (or appropriate role), `tabindex="0"`, and keyboard event handlers (Enter, Space) for activation.
-   **[ ] A11y Linter:** Use `eslint-plugin-svelte3-jsx-a11y` or similar tools to catch common accessibility issues during development.
-   **[ ] Svelte Actions:** Use Svelte actions to encapsulate reusable accessibility logic (e.g., focus trapping for modals, keyboard interactions for custom dropdowns).

## VIII. Testing & Tools

-   **[ ] Manual Keyboard Testing:** Navigate and operate all functionality using only the keyboard.
-   **[ ] Screen Reader Testing:** Test with common screen readers (NVDA, JAWS, VoiceOver).
-   **[ ] Automated Tools:** Use tools like Axe, Lighthouse, WAVE to catch common issues. Remember these tools don't catch everything.
-   **[ ] User Testing:** If possible, involve users with disabilities in testing.

This checklist is a starting point. Always refer to the latest Web Content Accessibility Guidelines (WCAG) for comprehensive standards.
