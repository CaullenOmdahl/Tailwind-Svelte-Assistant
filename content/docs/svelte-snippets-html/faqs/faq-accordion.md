# FAQ Accordion Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `faq-accordion.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a list of frequently asked questions in an accordion style.

## Overview

This component creates an FAQ section where each question can be clicked to reveal its answer. Only one answer is visible at a time.

## Original Svelte Component Props

-   `title: string` (default: "Frequently asked questions") - The main title for the FAQ section.
-   `faqs: Array<{ id: string | number, question: string, answer: string }>` - An array of FAQ objects, each containing an `id`, `question`, and `answer`.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-border-color` (e.g., `divide-gray-900/10`)
-   `--theme-icon-color` (e.g., `text-gray-400`, `hover:text-gray-500`)

## HTML Structure Example (Conceptual)

This static HTML represents the structure for the FAQ section and one example FAQ item (shown closed). JavaScript is required for the accordion functionality (toggling open/closed states).

```html
<div class="bg-white"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
    <div class="mx-auto max-w-4xl">
      <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Frequently asked questions</h2> <!-- title prop, theme: text-theme-text-base -->
      <dl class="mt-16 divide-y divide-gray-900/10"> <!-- theme: divide-theme-border-color -->
        
        <!-- Example FAQ Item (Closed State) -->
        <div class="py-6 first:pt-0 last:pb-0">
          <dt>
            <button 
              type="button" 
              class="flex w-full items-start justify-between text-left text-gray-900" 
              aria-controls="faq-panel-faq1" 
              aria-expanded="false" 
              <!-- Svelte: on:click={() => toggleFaq(faq.id)} -->
            > <!-- theme: text-theme-text-base -->
              <span class="text-base/7 font-semibold">What's the best thing about Switzerland?</span> <!-- faq.question -->
              <span class="ml-6 flex h-7 items-center">
                <!-- Plus icon (shown when closed) -->
                <svg class="size-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <!-- theme: icon color -->
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                <!-- Minus icon (shown when open, Svelte: {#if openFaqId === faq.id}) -->
                <!-- 
                <svg class="size-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
                -->
              </span>
            </button>
          </dt>
          <!-- Answer Panel (conditionally rendered in Svelte with #if) -->
          <!-- To show open: remove 'hidden' or add display style, set aria-expanded on button to true -->
          <dd class="mt-2 pr-12 hidden" id="faq-panel-faq1">
            <p class="text-base/7 text-gray-600">I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p> <!-- faq.answer, theme: text-theme-text-muted -->
          </dd>
        </div>

        <!-- More FAQ items would be generated here by the Svelte #each block -->
      </dl>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses an `faqs` prop (array of objects) to dynamically generate each question-answer pair.
- An internal state variable `openFaqId` tracks which FAQ item is currently open. Only one item can be open at a time.
- The `toggleFaq(id)` function updates `openFaqId` when a question is clicked.
- The visibility of the answer (`<dd>`) and the icon (plus/minus) are conditional based on `openFaqId === faq.id`.
- For static HTML or other JavaScript frameworks, similar logic would be needed to manage the accordion state.

## CSS Notes
- **Layout:** Uses a definition list (`<dl>`, `<dt>`, `<dd>`) for semantic structure.
- **Dividers:** `divide-y` and `divide-gray-900/10` create horizontal lines between FAQ items.
- **Icons:** SVGs are used for the plus/minus icons, and their visibility is toggled by JavaScript.
- **No Custom Transitions:** Unlike `accordion-item.svelte`, this component does not use `max-height` transitions for the answer panel by default; it relies on conditional rendering (`{#if}`). If smooth transitions are desired, they would need to be added (e.g., similar to `accordion-item.svelte`).

This Markdown file provides an HTML structure and class details based on the `faq-accordion.svelte` snippet.
