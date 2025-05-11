# Accordion Item - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `accordion-item.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component represents a single item (question and answer) within an accordion.

## Overview

This component is designed to be a single, collapsible section within an accordion. It displays a question and an answer that can be toggled open or closed.

## Original Svelte Component Props

-   `question: string` - The question text to be displayed.
-   `answer: string` - The answer text that is revealed when the item is open.

## HTML Structure Example (Conceptual)

This static HTML represents one accordion item, shown in a closed state. JavaScript is required to handle the toggle functionality and transitions.

```html
<div class="border-b border-gray-200 py-4">
  <button
    type="button" <!-- In Svelte, on:click={toggleOpen} -->
    class="w-full flex justify-between items-center text-left text-gray-700 hover:text-gray-900 focus:outline-none"
    aria-expanded="false" <!-- Dynamically set based on isOpen state -->
  >
    <span class="font-medium">What is your return policy?</span> <!-- question prop -->
    <span class="ml-6 h-7 flex items-center">
      <svg
        class="h-6 w-6 transform transition-transform duration-200 ease-in-out -rotate-0" 
        <!-- Svelte: class:rotate-180={isOpen} class:-rotate-0={!isOpen} -->
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </button>

  <div
    class="mt-2 pr-12 transition-max-height duration-700 ease-in-out overflow-hidden"
    style="max-height: 0px;" <!-- Svelte: style:max-height={isOpen ? '1000px' : '0px'} -->
    aria-hidden="true" <!-- Svelte: aria-hidden={!isOpen} -->
  >
    <p class="text-gray-500">If you're not satisfied with your purchase, you can return it within 30 days for a full refund.</p> <!-- answer prop -->
  </div>
</div>
```
**To represent an open state in static HTML:**
-   Set `aria-expanded="true"` on the button.
-   Change the SVG class from `-rotate-0` to `rotate-180`.
-   Set `style="max-height: 1000px;"` (or a suitable large value) on the answer `div`.
-   Set `aria-hidden="false"` on the answer `div`.

## JavaScript Notes

-   The original Svelte component has an internal boolean state `isOpen` (defaulting to `false`).
-   A `toggleOpen` function flips the `isOpen` state.
-   This state controls:
    -   The rotation of the chevron icon (`class:rotate-180={isOpen}`).
    -   The `max-height` style of the answer `div` for the expand/collapse animation.
    -   The `aria-hidden` attribute of the answer `div`.
-   In a non-Svelte context, similar JavaScript would be needed to manage the open/closed state and apply corresponding classes/styles.

## CSS Styles

The component defines a custom utility class for the `max-height` transition:
```css
/* From the <style lang="postcss"> block */
.transition-max-height {
  transition-property: max-height;
}
```
This class is used alongside Tailwind's `duration-700` and `ease-in-out` for the expand/collapse animation.

This Markdown file provides an HTML structure and class details based on the `accordion-item.svelte` snippet.
