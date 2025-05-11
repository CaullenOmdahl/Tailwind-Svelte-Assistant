# Simple Navbar - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `simple-navbar.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component creates a basic responsive navigation bar.

## Overview

This component creates a simple navigation bar with a logo, a desktop menu, and a mobile menu that can be toggled. It's styled with a dark background.

## Original Svelte Component Props

This component does not define any props for external configuration. It manages the mobile menu's open/closed state internally.

## HTML Structure Example (Conceptual)

This static HTML represents the navbar structure. The mobile menu's visibility and the hamburger/close icon state require JavaScript. The example below shows the mobile menu closed.

```html
<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-white text-xl font-bold">Logo</a>

    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button type="button" class="text-white focus:outline-none" aria-expanded="false" aria-controls="mobile-menu">
        <!-- Svelte: on:click={toggleMobileMenu} -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <!-- Hamburger icon (when mobileMenuOpen is false) -->
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          <!-- Close icon (when mobileMenuOpen is true) -->
          <!-- <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> -->
        </svg>
      </button>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex space-x-4">
      <a href="/about" class="text-gray-300 hover:text-white">About</a>
      <a href="/services" class="text-gray-300 hover:text-white">Services</a>
      <a href="/contact" class="text-gray-300 hover:text-white">Contact</a>
    </div>
  </div>

  <!-- Mobile Menu -->
  <!-- In Svelte: class:hidden={!mobileMenuOpen} -->
  <!-- For static HTML, to show open, remove 'hidden' class. -->
  <div id="mobile-menu" class="hidden md:hidden mt-2">
    <a href="/about" class="block px-2 py-1 text-gray-300 hover:text-white">About</a>
    <a href="/services" class="block px-2 py-1 text-gray-300 hover:text-white">Services</a>
    <a href="/contact" class="block px-2 py-1 text-gray-300 hover:text-white">Contact</a>
  </div>
</nav>
```

## JavaScript Notes
- The original Svelte component uses an internal boolean state `mobileMenuOpen` (defaulting to `false`) to control the visibility of the mobile menu.
- A `toggleMobileMenu` function flips this state when the mobile menu button is clicked.
- The `d` attribute of the SVG path for the mobile menu button icon changes based on the `mobileMenuOpen` state to switch between a hamburger and a close (X) icon.
- The `hidden` class on the mobile menu `div` is conditionally applied based on `!mobileMenuOpen`.
- For static HTML or other JavaScript frameworks, similar logic would be needed to manage the mobile menu's state and icon.

## CSS Notes
- The `<style lang="postcss">` block in the original `.svelte` file is empty. All styling is achieved using Tailwind CSS utility classes.
- The navbar has a dark background (`bg-gray-800`) with light text (`text-white`, `text-gray-300`).
- Responsive classes (`md:hidden`, `md:flex`) are used to show/hide elements based on screen size.

This Markdown file provides an HTML structure and class details based on the `simple-navbar.svelte` snippet.
