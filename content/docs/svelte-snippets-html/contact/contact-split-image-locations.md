# Contact Section with Split Image & Locations - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `contact-split-image-locations.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a contact form alongside an image and list of office locations in a split layout.

## Overview

This component creates a contact section featuring a split layout. On one side (typically left), it displays a contact form with a title and description. On the other side (typically right, and often an absolutely positioned image on larger screens), it shows an image and a list of office locations.

## Original Svelte Component Props

-   `title: string` (default: "Let's work together")
-   `description: string` (default: "Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu sed ut tincidunt magna.")
-   `imageUrl: string` (default: Unsplash placeholder image URL)
-   `imageAlt: string` (default: "Office interior")
-   `offices: Array<{ city: string, addressLines: string[] }>` - Array of office location objects.
-   `formFields: Array<{ id: string, name: string, label: string, type: string, autocomplete?: string, isTextarea?: boolean, rows?: number, colSpan?: number, optional?: boolean, maxLength?: number }>` - Configuration for form fields.
-   `agreementText: string` (default: "") - Optional text for a privacy policy agreement (not fully implemented in this snippet's default template but prop exists).
-   `submitButtonText: string` (default: "Send message")

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for image background)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`)
-   `--theme-primary` (e.g., `text-indigo-600`, `bg-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:bg-indigo-500`)
-   `--theme-input-border` (e.g., `ring-gray-300`)
-   `--theme-input-focus-ring` (e.g., `focus:ring-indigo-600`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)

## HTML Structure Example (Conceptual)

This static HTML represents the structure. Form submission and dynamic content require JavaScript.

```html
<div class="relative bg-white"> <!-- theme: bg-theme-bg-base -->
  <!-- Image section for large screens -->
  <div class="lg:absolute lg:inset-0 lg:left-1/2">
    <img class="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?..." alt="Office interior"> <!-- theme: bg-theme-bg-alt -->
  </div>

  <div class="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
    <!-- Contact Form Section -->
    <div class="px-6 lg:px-8">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Let's work together</h2> <!-- title prop, theme: text-theme-text-base -->
        <p class="mt-2 text-lg/8 text-gray-600">Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu sed ut tincidunt magna.</p> <!-- description prop, theme: text-theme-text-muted -->
        
        <form action="#" method="POST" class="mt-16">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <!-- Example: First Name -->
            <div>
              <div class="flex justify-between text-sm/6">
                <label for="first-name" class="block font-semibold text-gray-900">First name</label>
              </div>
              <div class="mt-2.5">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
              </div>
            </div>
            <!-- Other form fields (last name, email, company, phone, message) would follow similar structure -->
            
            <!-- Example: Message Textarea (col-span-2) -->
            <div class="sm:col-span-2">
              <div class="flex justify-between text-sm/6">
                <label for="message" class="block font-semibold text-gray-900">How can we help you?</label>
                <p id="message-description" class="text-gray-400">Max 500 characters</p>
              </div>
              <div class="mt-2.5">
                <textarea name="message" id="message" rows="4" aria-describedby="message-description" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
              </div>
            </div>
          </div>
          <div class="mt-10 flex justify-end border-t border-gray-900/10 pt-8"> <!-- theme: border-theme-border-color -->
            <button type="submit" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send message</button> <!-- theme: button primary -->
          </div>
        </form>
      </div>
    </div>
    
    <!-- Office Locations Section (only visible on large screens due to parent grid structure) -->
    <!-- In the Svelte component, this content is not explicitly rendered, but the image takes the full right side. -->
    <!-- The provided Svelte code doesn't render the office list in the split view. -->
    <!-- If office locations were to be displayed here, they would be in the second column of the lg:grid-cols-2 -->
    <!-- For example: -->
    <!-- 
    <div class="px-6 lg:px-8 lg:pt-0"> <!-- This div would be the second column -->
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg lg:pt-8"> <!-- Adjust pt as needed -->
        <h3 class="text-2xl font-semibold text-gray-900">Our Offices</h3>
        <div class="mt-6 space-y-8">
          <div>
            <h4 class="font-semibold text-gray-700">Los Angeles</h4>
            <address class="not-italic text-gray-600">
              <p>4556 Brendan Ferry</p>
              <p>Los Angeles, CA 90210</p>
            </address>
          </div>
          <!-- More offices -->
        </div>
      </div>
    </div>
    -->
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props (`title`, `description`, `imageUrl`, `offices`, `formFields`, etc.) to dynamically populate content.
- Form fields are generated from the `formFields` array. Optional fields or fields with max length can have descriptive text next to the label.
- The `handleSubmit` function and form data binding (`bind:value`) are present in the Svelte script for basic form handling.
- The provided Svelte snippet focuses the right column on the image; office locations are not explicitly rendered in the split view part of the template but are available in props.

## CSS Notes
- **Split Layout:** Uses CSS Grid (`lg:grid-cols-2`) for the two-column layout on large screens. The right column (`lg:absolute lg:inset-0 lg:left-1/2`) is designed to hold the image.
- **Input Styling:** Form inputs and textareas have specific styling for borders, focus states, and placeholder text.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `contact-split-image-locations.svelte` snippet.
