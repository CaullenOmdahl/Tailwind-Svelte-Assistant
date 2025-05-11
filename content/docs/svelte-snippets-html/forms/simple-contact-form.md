# Simple Contact Form - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `simple-contact-form.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a basic contact form.

## Overview

This component creates a simple contact form with fields for Full Name, Email Address, and a Message. It includes a submit button and displays submission status messages (success/error).

## Original Svelte Component Props

This component does not define any props for external configuration. It manages its form data and submission state internally.

## HTML Structure Example (Conceptual)

This static HTML represents the form structure. Form submission, data handling, and status messages require JavaScript.

```html
<form class="space-y-6 p-6 bg-white shadow-md rounded-lg">
  <h2 class="text-2xl font-semibold text-gray-800">Contact Us</h2>

  <div>
    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
    <input
      type="text"
      id="name"
      name="name" <!-- Added name attribute for standard HTML forms -->
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="John Doe"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      id="message"
      name="message"
      rows="4"
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Your message..."
    ></textarea>
  </div>

  <div>
    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      Send Message <!-- Text changes to "Sending..." when submitting in Svelte -->
    </button>
  </div>

  <!-- Example Success Message (conditionally shown) -->
  <p class="text-sm text-green-600">Message sent successfully!</p>
  
  <!-- Example Error Message (conditionally shown) -->
  <!-- 
  <p class="text-sm text-red-600">Failed to send message. Please fill all fields and try again.</p>
  -->
</form>
```

## JavaScript Notes
- The original Svelte component uses internal variables (`name`, `email`, `message`) bound to the form inputs using `bind:value`.
- It has a `submitting` boolean state to disable the button during submission and change its text.
- A `submissionStatus` string ('success' or 'error') controls the display of feedback messages.
- The `handleSubmit` function simulates an asynchronous API call and updates `submissionStatus`. In a real application, this would contain actual form submission logic.

## CSS Notes
- The `<style lang="postcss">` block in the original `.svelte` file is empty. All styling is achieved using Tailwind CSS utility classes.
- Input fields have focus styling (`focus:ring-indigo-500 focus:border-indigo-500`).
- The submit button has hover and focus styles, and an opacity change when disabled.

This Markdown file provides an HTML structure and class details based on the `simple-contact-form.svelte` snippet.
