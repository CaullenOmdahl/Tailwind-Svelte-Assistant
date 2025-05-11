# Newsletter Signup with Centered Input on Newline - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `newsletter-centered-input-newline.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a newsletter signup form with centered text, and the input field/button typically on a new line on smaller screens.

## Overview

This component creates a centered newsletter signup section. It includes a title, description, an email input field with a submit button, and optional fine print text. A decorative radial gradient is used as a background effect within a container.

## Original Svelte Component Props

-   `title: string` (default: "Want product news and updates?")
-   `description: string` (default: "Sign up for our newsletter...")
-   `emailInputLabel: string` (default: "Email address") - Used as sr-only label.
-   `emailInputPlaceholder: string` (default: "Enter your email")
-   `submitButtonText: string` (default: "Subscribe")
-   `finePrint: string` (default: "We care about your data... <a href='...'>privacy&nbsp;policy</a>.") - Can contain HTML.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white` for the page)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for the inner card)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-primary` (e.g., `bg-indigo-600` for button, `text-indigo-600` for link in finePrint)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500` for button)
-   `--theme-input-border` (e.g., `ring-gray-300`)
-   `--theme-input-focus-ring` (e.g., `focus:ring-indigo-600`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)
-   Gradient stop colors: `#7775D6` (indigo-ish), `#E935C1` (pink-ish) for the SVG gradient.

## HTML Structure Example (Conceptual)

This static HTML represents the structure with default props.

```html
<div class="bg-white py-16 sm:py-24"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="relative isolate overflow-hidden bg-gray-50 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"> <!-- theme: bg-theme-bg-alt -->
      <h2 class="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Want product news and updates?</h2> <!-- title, theme: text-theme-text-base -->
      <p class="mx-auto mt-2 max-w-xl text-center text-lg/8 text-gray-600">Sign up for our newsletter to stay up to date.</p> <!-- description, theme: text-theme-text-muted -->
      
      <form action="#" method="POST" class="mx-auto mt-10 flex max-w-md flex-col gap-y-4 sm:flex-row sm:gap-x-3 sm:gap-y-0">
        <label for="email-address-centered" class="sr-only">Email address</label>
        <input 
          id="email-address-centered" 
          name="email" 
          type="email" 
          autocomplete="email" 
          required 
          class="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm/6" 
          placeholder="Enter your email"
        /> <!-- theme: input styles -->
        <button 
          type="submit" 
          class="inline-flex flex-none items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Subscribe</button> <!-- theme: button primary -->
      </form>
      
      <p class="mx-auto mt-4 max-w-xl text-center text-sm/6 text-gray-600">We care about your data. Read our <a href='#' class='font-semibold text-indigo-600 hover:text-indigo-500'>privacy&nbsp;policy</a>.</p> <!-- finePrint (HTML rendered), theme: text-theme-text-muted, link text-theme-primary -->
      
      <!-- Decorative SVG Gradient -->
      <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
        <circle cx="512" cy="512" r="512" fill="url(#gradient-newsletter-centered)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="gradient-newsletter-centered">
            <stop stop-color="#7775D6" /> <!-- Indigo-ish -->
            <stop offset="1" stop-color="#E935C1" /> <!-- Pink-ish -->
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props for dynamic content.
- Internal state `emailValue` is bound to the email input.
- `handleSubmit` function simulates form submission.
- The `finePrint` prop can contain HTML, rendered using `{@html ...}`.

## CSS Notes
- **Layout:** Centered text content with the form below. The form itself uses Flexbox and can switch from column to row layout on `sm` screens.
- **Decorative Gradient:** An SVG with a radial gradient is used as a background effect, masked to create a soft circular appearance.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `newsletter-centered-input-newline.svelte` snippet.
