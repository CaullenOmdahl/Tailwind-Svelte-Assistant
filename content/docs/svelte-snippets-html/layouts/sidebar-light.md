# Light Sidebar Layout - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `sidebar-light.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component creates a full-page application layout with a light-themed sidebar, often used for settings pages.

## Overview

This component provides a light-themed layout for application pages, typically settings or dashboards. It includes:
-   A main header with a logo, mobile menu toggle, a condensed desktop navigation, and user profile/notification icons.
-   A mobile off-canvas menu containing the full navigation.
-   A main content area structured with a fixed desktop sidebar (containing full navigation) on the left and the main page content on the right.

## Original Svelte Component Props

-   `companyName: string` (default: "Your Company")
-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `navigation: Array<{ name: string, href: string, iconPathData: string, current: boolean }>` - Main navigation items with SVG icon paths.
-   `pageTitle: string` (default: "General Settings") - Title for the main content area (used as sr-only in this specific template).
-   `initialMobileMenuOpen: boolean` (default: false) - Initial state for the mobile menu.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50`)
-   `--theme-text-base` (e.g., `text-gray-900`, `text-gray-700`)
-   `--theme-text-muted` (e.g., `text-gray-400`, `text-gray-500`)
-   `--theme-primary` (e.g., `text-indigo-600`)
-   `--theme-primary-hover` (e.g., `hover:text-indigo-500`)
-   `--theme-border-color` (e.g., `border-gray-900/10`, `border-gray-200`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)

## HTML Structure Example (Conceptual)

This static HTML represents the layout. Mobile menu and dynamic content require JavaScript.

```html
<!-- Assumes h-full on html and body -->
<div class="flex min-h-full flex-col">
  <!-- Main Header -->
  <header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10"> <!-- theme: border-theme-border-color -->
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center gap-x-6">
        <button type="button" class="-m-3 p-3 md:hidden"> <!-- Mobile menu toggle -->
          <span class="sr-only">Open main menu</span>
          <svg class="size-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>
        </button>
        <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
      <nav class="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700"> <!-- theme: text-theme-text-base -->
        <a href="#" class="text-indigo-600">General</a> <!-- Example current link, theme: text-theme-primary -->
        <a href="#" class="hover:text-indigo-600">Security</a> <!-- theme: hover:text-theme-primary -->
        <!-- More desktop nav links (first 4 from navigation prop) -->
      </nav>
      <div class="flex flex-1 items-center justify-end gap-x-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"> <!-- theme: text-theme-text-muted hover:text-theme-text-muted (darker) -->
          <span class="sr-only">View notifications</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
        </button>
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your profile</span>
          <img class="size-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..." alt="" /> <!-- theme: bg-theme-bg-alt (darker for contrast) -->
        </a>
      </div>
    </div>

    <!-- Mobile menu (shown conditionally) -->
    <!-- To show: remove 'hidden' or implement JS toggle -->
    <div class="lg:hidden hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50 bg-black/25"></div> <!-- Backdrop -->
      <div class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10"> <!-- theme: bg-theme-bg-base, ring-theme-border-color -->
        <div class="-ml-0.5 flex h-16 items-center gap-x-6">
          <button type="button" class="-m-2.5 p-2.5 text-gray-700"><span class="sr-only">Close menu</span><svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
          <div class="-ml-0.5"><a href="#" class="-m-1.5 block p-1.5"><span class="sr-only">Your Company</span><img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /></a></div>
        </div>
        <div class="mt-2 space-y-2">
          <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">General</a> <!-- theme: text-theme-text-base hover:bg-theme-bg-alt -->
          <!-- More mobile nav links -->
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content Area with Sidebar -->
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">General Settings</h1> <!-- pageTitle prop -->

    <!-- Desktop Sidebar -->
    <aside class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"> <!-- theme: border-theme-border-color -->
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <!-- Example Desktop Nav Item (Current) -->
          <li>
            <a href="#" class="bg-gray-50 text-indigo-600 group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold"> <!-- theme: bg-theme-bg-alt text-theme-primary -->
              <svg class="text-indigo-600 size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488..." /></svg>
              General
            </a>
          </li>
          <!-- Other desktop nav items -->
        </ul>
      </nav>
    </aside>

    <!-- Page Content -->
    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <!-- Slot for main content (e.g., settings forms) -->
        <div>
          <h2 class="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p class="mt-1 text-sm/6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>
          <!-- ... Profile form content ... -->
        </div>
      </div>
    </main>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props for dynamic content (logo, navigation items, page title).
- Internal state `mobileMenuOpen` (synced with `initialMobileMenuOpen` prop) and `toggleMobileMenu()` manage the mobile sidebar.
- Conditional classes are used for active navigation items.

## CSS Notes
- **Light Theme:** Styled with a light background (`bg-white`, `bg-gray-50`) and dark text.
- **Layout:** Uses Flexbox and Grid. The main content area is structured with a fixed desktop sidebar on the left.
- **Header:** The main header is sticky and contains a condensed version of the navigation for desktop.
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `sidebar-light.svelte` snippet.
