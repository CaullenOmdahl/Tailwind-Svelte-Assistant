# Dark Sidebar Layout - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `sidebar-dark.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component creates a full-page application layout with a dark-themed sidebar, mobile off-canvas menu, sticky header, and content areas.

## Overview

This component provides a comprehensive, dark-themed layout for applications. It includes:
-   A responsive sidebar: fixed on desktop, off-canvas on mobile.
-   Navigation sections within the sidebar for main links and "teams" or similar grouped links.
-   A user profile link at the bottom of the sidebar.
-   A sticky header above the main content area, containing a mobile menu toggle and a search bar.
-   A header for the main content area displaying a page title and a slot for actions.
-   Slots for the main page content and an optional "activity feed" sidebar on the right for desktop.

## Original Svelte Component Props

-   `companyName: string` (default: "Your Company")
-   `logoSrc: string` (default: Tailwind Mark SVG)
-   `navigation: Array<{ name: string, href: string, icon: string, current: boolean }>` - Main navigation items with SVG path data for icons.
-   `teams: Array<{ id: string, name: string, href: string, initial: string, current: boolean }>` - Secondary navigation items (e.g., teams).
-   `userProfile: { name: string, imageUrl: string, href: string }` - User profile data.
-   `pageTitle: string` (default: "Deployments") - Title for the main content area.
-   `initialMobileMenuOpen: boolean` (default: false) - Initial state for the mobile menu.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-gray-900`)
-   `--theme-bg-alt` (e.g., `bg-gray-800`, `bg-black/10`)
-   `--theme-text-base` (e.g., `text-white`)
-   `--theme-text-muted` (e.g., `text-gray-400`, `text-gray-500`)
-   `--theme-primary` (e.g., `text-indigo-400`)
-   `--theme-border-color` (e.g., `border-white/5`, `ring-white/5`, `ring-white/10`)
-   `--theme-border-radius-md` (e.g., `rounded-md`)
-   `--theme-border-radius-lg` (e.g., `rounded-lg`)

## HTML Structure Example (Conceptual)

This static HTML represents the layout structure. Mobile menu and dynamic content require JavaScript.

```html
<!-- Assumes h-full on html and body -->
<div>
  <!-- Off-canvas menu for mobile (shown conditionally) -->
  <!-- To show: remove 'hidden' from the main div, or implement JS toggle -->
  <div class="relative z-50 xl:hidden hidden" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div> <!-- Backdrop -->
    <div class="fixed inset-0 flex">
      <div class="relative mr-16 flex w-full max-w-xs flex-1">
        <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
          <button type="button" class="-m-2.5 p-2.5">
            <span class="sr-only">Close sidebar</span>
            <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Mobile Sidebar Content -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
          <div class="flex h-16 shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <!-- Example Nav Item (Current) -->
                  <li>
                    <a href="#" class="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                      <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228..." /> <!-- Deployments icon path -->
                      </svg>
                      Deployments
                    </a>
                  </li>
                  <!-- Other nav items -->
                </ul>
              </li>
              <li>
                <div class="text-xs/6 font-semibold text-gray-400">Your teams</div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <!-- Example Team Item -->
                  <li>
                    <a href="#" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                      <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">P</span>
                      <span class="truncate">Planetaria</span>
                    </a>
                  </li>
                  <!-- Other team items -->
                </ul>
              </li>
              <li class="-mx-6 mt-auto">
                <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800">
                  <img class="size-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..." alt="Tom Cook profile" />
                  <span class="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
      <!-- Desktop Sidebar Content (similar to mobile, but with bg-black/10) -->
    </div>
  </div>

  <div class="xl:pl-72">
    <!-- Sticky search header -->
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-xs sm:px-6 lg:px-8">
      <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden">
        <span class="sr-only">Open sidebar</span>
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="grid flex-1 grid-cols-1" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <input id="search-field" type="search" name="search" class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white outline-none placeholder:text-gray-500 sm:text-sm/6" placeholder="Search..." />
          <svg class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
          </svg>
        </form>
      </div>
    </div>

    <main class="lg:pr-96">
      <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 class="text-base/7 font-semibold text-white">Deployments</h1> <!-- pageTitle prop -->
        <!-- Slot for header-actions -->
      </header>
      <!-- Slot for main content -->
      <div class="p-6 text-white">Main content goes here...</div>
    </main>

    <!-- Activity feed (right sidebar on desktop) -->
    <aside class="bg-black/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <!-- Slot for activity-feed -->
      <div class="p-6 text-white">Activity feed content...</div>
    </aside>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses props for dynamic content (logo, navigation, user info, page title).
- Internal state `mobileMenuOpen` and `toggleMobileMenu()` manage the mobile sidebar.
- Conditional classes (`class:bg-gray-800={item.current}`) are used for active navigation items.

## CSS Notes
- **Dark Theme:** The layout is styled with a dark theme (`bg-gray-900`, `bg-black/10`, light text colors).
- **Layout:** Uses Flexbox and Grid extensively. The main layout is a fixed desktop sidebar, a main content area offset by the sidebar width, and a fixed right "activity feed" sidebar on large screens.
- **Sticky Header:** The search header is sticky (`sticky top-0`).
- **Themeable Classes:** Comments indicate where theme variables could be applied.

This Markdown file provides an HTML structure and class details based on the `sidebar-dark.svelte` snippet.
