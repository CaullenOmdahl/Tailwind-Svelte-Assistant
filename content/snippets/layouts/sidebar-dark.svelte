<!-- Last updated: 2025-12-01T02:47:34.659Z -->
<!--
@description: A dark-themed sidebar layout with a mobile off-canvas menu and a fixed desktop sidebar. Based on Tailwind UI.
@props:
  companyName: string - Alt text for logo, sr-only text.
  logoSrc: string - URL for the logo.
  navigation: Array<{ name: string, href: string, icon: string, current: boolean }> - Main navigation items. Each icon is SVG path data.
  teams: Array<{ id: string, name: string, href: string, initial: string, current: boolean }> - Team navigation items.
  userProfile: { name: string, imageUrl: string, href: string } - User profile info for bottom link.
  pageTitle: string - Title for the main content area header.
  initialMobileMenuOpen: boolean (default: false) - Initial state of mobile menu.
@theme_vars:
  --theme-bg-base (bg-gray-900)
  --theme-bg-alt (bg-gray-800, bg-black/10)
  --theme-text-base (text-white)
  --theme-text-muted (text-gray-400, text-gray-500, text-gray-600)
  --theme-primary (text-indigo-400)
  --theme-border-color (border-white/5, ring-white/5, ring-white/10)
  --theme-border-radius-md (rounded-md)
  --theme-border-radius-lg (rounded-lg)
-->
<script lang="ts">
  export let companyName: string = "Your Company";
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500";
  export let navigation: Array<{ name: string, href: string, icon: string, current: boolean }> = [
    { name: 'Projects', href: '#', icon: 'M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z', current: false },
    { name: 'Deployments', href: '#', icon: 'M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z', current: true },
    { name: 'Activity', href: '#', icon: 'M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z', current: false },
    { name: 'Domains', href: '#', icon: 'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418', current: false },
    { name: 'Usage', href: '#', icon: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z', current: false },
    { name: 'Settings', href: '#', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', current: false },
  ];
  export let teams: Array<{ id: string, name: string, href: string, initial: string, current: boolean }> = [
    { id: '1', name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: '2', name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: '3', name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  ];
  export let userProfile = {
    name: "Tom Cook",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#"
  };
  export let pageTitle: string = "Deployments";
  export let initialMobileMenuOpen: boolean = false; // For controlling menu from parent if needed

  let mobileMenuOpen = initialMobileMenuOpen;

  // Reactive statement to sync with prop if it changes from outside
  $: mobileMenuOpen = initialMobileMenuOpen;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    // If controlled from parent, emit an event instead:
    // import { createEventDispatcher } from 'svelte';
    // const dispatch = createEventDispatcher();
    // dispatch('toggleMenu', !mobileMenuOpen);
  }

  // Note: Original HTML has transition classes for enter/leave.
  // Svelte transitions would be used for a more idiomatic approach.
  // For simplicity, this adaptation uses a boolean flag.
</script>

<!-- Assumes h-full on html and body as per Tailwind UI comment -->
<div>
  <!-- Off-canvas menu for mobile -->
  {#if mobileMenuOpen}
    <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true" on:click={toggleMobileMenu}></div> {/* Backdrop */}
      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
            <button type="button" class="-m-2.5 p-2.5" on:click={toggleMobileMenu}>
              <span class="sr-only">Close sidebar</span>
              <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Mobile Sidebar component -->
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10"> {/* Themeable: bg-theme-bg-base, ring-theme-border-color/10 */}
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto" src={logoSrc} alt={companyName} />
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    {#each navigation as item}
                      <li>
                        <a
                          href={item.href}
                          class:bg-gray-800={item.current} class:text-white={item.current}
                          class:text-gray-400={!item.current} class:hover:text-white={!item.current} class:hover:bg-gray-800={!item.current}
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        > {/* Themeable classes */}
                          <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                          </svg>
                          {item.name}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </li>
                <li>
                  <div class="text-xs/6 font-semibold text-gray-400">Your teams</div> {/* Themeable */}
                  <ul role="list" class="-mx-2 mt-2 space-y-1">
                    {#each teams as team}
                      <li>
                        <a
                          href={team.href}
                          class:bg-gray-800={team.current} class:text-white={team.current}
                          class:text-gray-400={!team.current} class:hover:text-white={!team.current} class:hover:bg-gray-800={!team.current}
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        > {/* Themeable classes */}
                          <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{team.initial}</span> {/* Themeable */}
                          <span class="truncate">{team.name}</span>
                        </a>
                      </li>
                    {/each}
                  </ul>
                </li>
                <li class="-mx-6 mt-auto">
                  <a href={userProfile.href} class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"> {/* Themeable */}
                    <img class="size-8 rounded-full bg-gray-800" src={userProfile.imageUrl} alt="{userProfile.name} profile" /> {/* Themeable */}
                    <span class="sr-only">Your profile</span>
                    <span aria-hidden="true">{userProfile.name}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5"> {/* Themeable: bg-theme-bg-alt/10, ring-theme-border-color/5 */}
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src={logoSrc} alt={companyName} />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              {#each navigation as item}
                <li>
                  <a
                    href={item.href}
                    class:bg-gray-800={item.current} class:text-white={item.current}
                    class:text-gray-400={!item.current} class:hover:text-white={!item.current} class:hover:bg-gray-800={!item.current}
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  > {/* Themeable classes */}
                    <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                    </svg>
                    {item.name}
                  </a>
                </li>
              {/each}
            </ul>
          </li>
          <li>
            <div class="text-xs/6 font-semibold text-gray-400">Your teams</div> {/* Themeable */}
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              {#each teams as team}
                <li>
                  <a
                    href={team.href}
                    class:bg-gray-800={team.current} class:text-white={team.current}
                    class:text-gray-400={!team.current} class:hover:text-white={!team.current} class:hover:bg-gray-800={!team.current}
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  > {/* Themeable classes */}
                    <span class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{team.initial}</span> {/* Themeable */}
                    <span class="truncate">{team.name}</span>
                  </a>
                </li>
              {/each}
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a href={userProfile.href} class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"> {/* Themeable */}
              <img class="size-8 rounded-full bg-gray-800" src={userProfile.imageUrl} alt="{userProfile.name} profile" /> {/* Themeable */}
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">{userProfile.name}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="xl:pl-72">
    <!-- Sticky search header -->
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-xs sm:px-6 lg:px-8"> {/* Themeable */}
      <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" on:click={toggleMobileMenu}>
        <span class="sr-only">Open sidebar</span>
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>
      </button>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="grid flex-1 grid-cols-1" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <input id="search-field" type="search" name="search" class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white outline-none placeholder:text-gray-500 sm:text-sm/6" placeholder="Search..." /> {/* Themeable */}
          <svg class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable */}
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
          </svg>
        </form>
      </div>
    </div>

    <main class="lg:pr-96">
      <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"> {/* Themeable */}
        <h1 class="text-base/7 font-semibold text-white">{pageTitle}</h1> {/* Themeable */}
        <!-- Slot for sort dropdown or other header actions -->
        <slot name="header-actions"></slot>
      </header>

      <!-- Main content slot -->
      <slot></slot>
    </main>

    <!-- Activity feed slot (right sidebar on desktop) -->
    <aside class="bg-black/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5"> {/* Themeable */}
      <slot name="activity-feed"></slot>
    </aside>
  </div>
</div>
