# Contact Section with Two Columns & Image - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `contact-two-column-image.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a contact section with a form on one side and contact details with an image on the other.

## Overview

This component creates a contact section featuring a two-column layout. One column typically contains introductory text, contact details (address, phone, email with icons), and an image with a decorative background pattern. The other column contains a contact form.

## Original Svelte Component Props

-   `title: string` (default: "Get in touch")
-   `description: string` (default: "Proin volutpat consequat porttitor...")
-   `imageUrl: string` (default: Unsplash placeholder)
-   `imageAlt: string` (default: "Contact image")
-   `contactDetails: Array<{ iconPath: string, label: string, value: string, href?: string }>` - Array for contact details like address, phone, email.
-   `formFields: Array<{ id: string, name: string, label: string, type: string, autocomplete?: string, isTextarea?: boolean, rows?: number, colSpan?: number, optional?: boolean, maxLength?: number }>` - Configuration for form fields.
-   `privacyPolicyLink: string` (default: "#")
-   `submitButtonText: string` (default: "Send message")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-100` for image background pattern)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-primary` (e.g., `text-indigo-600`, `bg-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500`)
-   `--theme-input-border` (e.g., `ring-gray-300`)
-   `--theme-input-focus-ring` (e.g., `focus:ring-indigo-600`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)
-   `--theme-icon-color` (e.g., `text-gray-400`)
-   `--theme-pattern-fill` (e.g., `fill-gray-50` for SVG pattern)

## HTML Structure Example (Conceptual)

This static HTML represents the structure. Form submission and dynamic content require JavaScript.

```html
<div class="relative isolate bg-white"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
    <!-- Left Column: Contact Info & Image -->
    <div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <!-- Decorative SVG Background Pattern -->
        <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2"> <!-- theme: bg-theme-bg-alt, ring-theme-border-color -->
          <svg class="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200" aria-hidden="true"> <!-- theme: stroke -->
            <defs>
              <pattern id="contact-pattern" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" stroke-width="0" fill="white" /> <!-- theme: fill -->
            <svg x="100%" y="-1" class="overflow-visible fill-gray-50"> <!-- theme: fill-theme-pattern-fill -->
              <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#contact-pattern)" />
          </svg>
        </div>
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Get in touch</h2> <!-- title prop, theme: text-theme-text-base -->
        <p class="mt-6 text-lg/8 text-gray-600">Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.</p> <!-- description prop, theme: text-theme-text-muted -->
        <dl class="mt-10 space-y-4 text-base/7 text-gray-600"> <!-- theme: text-theme-text-muted -->
          <!-- Example Contact Detail: Address -->
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Address</span>
              <svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <!-- theme: text-theme-icon-color -->
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </dt>
            <dd>545 Mavis Island<br>Chicago, IL 99191</dd>
          </div>
          <!-- Other contact details (phone, email) would follow -->
        </dl>
      </div>
    </div>

    <!-- Right Column: Contact Form -->
    <form action="#" method="POST" class="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <!-- Example Form Field: First Name -->
          <div>
            <label for="first-name" class="block text-sm/6 font-semibold text-gray-900">First name</label>
            <div class="mt-2.5">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
            </div>
          </div>
          <!-- Other form fields would be generated here -->
          <!-- Example: Message Textarea (col-span-2) -->
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm/6 font-semibold text-gray-900">Message</label>
            <div class="mt-2.5">
              <textarea name="message" id="message" rows="4" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-end">
          <button type="submit" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send message</button> <!-- theme: button primary -->
        </div>
      </div>
    </form>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props to dynamically populate the title, description, image, contact details, and form fields.
- The `contactDetails` array includes SVG `iconPath` data for icons.
- The `formFields` array configures the inputs and textarea for the form.
- Form submission and data handling are managed by JavaScript in the original component.

## CSS Notes
- **Split Layout:** A CSS Grid (`lg:grid-cols-2`) creates the two-column layout on large screens.
- **Background Pattern:** The left column (contact info side) has a decorative SVG background pattern with a radial gradient mask.
- **Input Styling:** Form inputs and textareas have specific styling for borders, focus states, and placeholders.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `contact-two-column-image.svelte` snippet.
