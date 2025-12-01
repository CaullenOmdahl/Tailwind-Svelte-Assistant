<!-- Last updated: 2025-12-01T02:47:34.660Z -->
<!--
@description: A light-themed sidebar layout, often used for settings pages. Includes a mobile off-canvas menu and a fixed desktop sidebar. Based on Tailwind UI.
@props:
  companyName: string - Alt text for logo, sr-only text.
  logoSrc: string - URL for the logo.
  navigation: Array<{ name: string, href: string, icon: string, current: boolean }> - Main navigation items. Each icon is SVG path data.
  pageTitle: string - Title for the main content area (e.g., "General Settings").
  initialMobileMenuOpen: boolean (default: false) - Initial state of mobile menu.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50)
  --theme-text-base (text-gray-900, text-gray-700)
  --theme-text-muted (text-gray-400, text-gray-500)
  --theme-primary (text-indigo-600)
  --theme-primary-hover (hover:text-indigo-500)
  --theme-border-color (border-gray-900/10, border-gray-200)
  --theme-border-radius-md (rounded-md)
-->
<script lang="ts">
  export let companyName: string = "Your Company";
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600";
  export let navigation: Array<{ name: string, href: string, iconPathData: string, current: boolean }> = [
    { name: 'General', href: '#', iconPathData: 'M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', current: true },
    { name: 'Security', href: '#', iconPathData: 'M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33', current: false },
    { name: 'Notifications', href: '#', iconPathData: 'M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0', current: false },
    { name: 'Plan', href: '#', iconPathData: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', current: false },
    { name: 'Billing', href: '#', iconPathData: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z', current: false },
    { name: 'Team members', href: '#', iconPathData: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z', current: false },
  ];
  export let pageTitle: string = "General Settings"; // Example from settings page
  export let initialMobileMenuOpen: boolean = false;

  let mobileMenuOpen = initialMobileMenuOpen;
  $: mobileMenuOpen = initialMobileMenuOpen; // Sync with prop

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<!-- Assumes h-full on html and body -->
<div class="flex min-h-full flex-col"> {/* Modified for standalone sidebar layout */}
  <header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10"> {/* Themeable */}
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center gap-x-6">
        <button type="button" class="-m-3 p-3 md:hidden" on:click={toggleMobileMenu}>
          <span class="sr-only">Open main menu</span>
          <svg class="size-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable */}
            <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
        </button>
        <img class="h-8 w-auto" src={logoSrc} alt={companyName} />
      </div>
      <nav class="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700"> {/* Themeable */}
        {#each navigation.slice(0, 4) as item} {/* Show first 4 for header example */}
          <a href={item.href} class:text-indigo-600={item.current} class:hover:text-indigo-600={!item.current}>{item.name}</a>
        {/each}
      </nav>
      <div class="flex flex-1 items-center justify-end gap-x-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"> {/* Themeable */}
          <span class="sr-only">View notifications</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your profile</span>
          <img class="size-8 rounded-full bg-gray-800" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> {/* Themeable */}
        </a>
      </div>
    </div>
    <!-- Mobile menu -->
    {#if mobileMenuOpen}
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50 bg-black/25" on:click={toggleMobileMenu}/>
      <div class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10"> {/* Themeable */}
        <div class="-ml-0.5 flex h-16 items-center gap-x-6">
          <button type="button" class="-m-2.5 p-2.5 text-gray-700" on:click={toggleMobileMenu}> {/* Themeable */}
            <span class="sr-only">Close menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="-ml-0.5">
            <a href="#" class="-m-1.5 block p-1.5">
              <span class="sr-only">{companyName}</span>
              <img class="h-8 w-auto" src={logoSrc} alt={companyName} />
            </a>
          </div>
        </div>
        <div class="mt-2 space-y-2">
          {#each navigation as item}
            <a href={item.href} class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">{item.name}</a> {/* Themeable */}
          {/each}
        </div>
      </div>
    </div>
    {/if}
  </header>

  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">{pageTitle}</h1>

    <aside class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20"> {/* Themeable */}
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          {#each navigation as item}
          <li>
            <a
              href={item.href}
              class:bg-gray-50={item.current} class:text-indigo-600={item.current} 
              class:text-gray-700={!item.current} class:hover:text-indigo-600={!item.current} class:hover:bg-gray-50={!item.current}
              class="group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm/6 font-semibold"
            > {/* Themeable */}
              <svg 
                class:text-indigo-600={item.current} 
                class:text-gray-400={!item.current} class:group-hover:text-indigo-600={!item.current}
                class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d={item.iconPathData} />
              </svg>
              {item.name}
            </a>
          </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <!-- Content for the page goes here, e.g. settings forms -->
        <slot><!-- Example: General Settings Form from Tailwind UI --></slot>
        <slot name="profile-settings">
            <div>
              <h2 class="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p class="mt-1 text-sm/6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>
              {/* ... rest of profile form ... */}
            </div>
        </slot>
         <slot name="bank-accounts">
            <div>
              <h2 class="text-base/7 font-semibold text-gray-900">Bank accounts</h2>
              <p class="mt-1 text-sm/6 text-gray-500">Connect bank accounts to your account.</p>
              {/* ... rest of bank accounts section ... */}
            </div>
        </slot>
        {/* Add more named slots for other sections like Integrations, Language, etc. */}
      </div>
    </main>
  </div>
</div>
