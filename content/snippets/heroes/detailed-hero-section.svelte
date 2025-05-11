<!--
@description: Hero section with centered content, navigation, optional announcement, and decorative gradient blurs. Based on Tailwind UI "Simple Centered" example.
@props:
  companyName: string - Name of the company for sr-only text and logo alt.
  logoSrc: string - URL for the company logo.
  logoLinkHref: string - Href for the logo link.
  navLinks: Array<{ text: string, href: string }> - Array of navigation link objects.
  loginLinkText: string - Text for the login link.
  loginLinkHref: string - Href for the login link.
  showAnnouncement: boolean - Toggle for the announcement banner.
  announcementText: string - Main text for the announcement.
  announcementLinkText: string - Text for the announcement link.
  announcementLinkHref: string - Href for the announcement link.
  headline: string - Main headline text.
  subHeadline: string - Supporting text below the headline.
  primaryCtaText: string - Text for the primary call-to-action button.
  primaryCtaLink: string - Href for the primary CTA.
  secondaryCtaText: string - Text for the secondary call-to-action button.
  secondaryCtaLink: string - Href for the secondary CTA.
  showDecorativeGradients: boolean - Toggle for the decorative gradient blurs.
@theme_vars:
  --theme-bg-base (bg-theme-bg-base)
  --theme-text-base (text-theme-text-base)
  --theme-text-muted (text-theme-text-muted)
  --theme-primary (text-theme-primary, bg-theme-primary, focus-visible:outline-theme-primary)
  --theme-primary-hover (hover:bg-theme-primary-hover)
  --theme-text-on-primary (text-theme-text-on-primary)
  --theme-border (ring-theme-border)
  --theme-bg-alt (hover:bg-theme-bg-alt)
  --theme-border-radius-md (rounded-theme-md)
  --theme-border-radius-full (rounded-full)
-->
<script lang="ts">
  export let companyName: string = "Your Company";
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600";
  export let logoLinkHref: string = "#";
  export let navLinks: Array<{ text: string, href: string }> = [
    { text: "Product", href: "#" },
    { text: "Features", href: "#" },
    { text: "Marketplace", href: "#" },
    { text: "Company", href: "#" },
  ];
  export let loginLinkText: string = "Log in";
  export let loginLinkHref: string = "#";

  export let showAnnouncement: boolean = true;
  export let announcementText: string = "Announcing our next round of funding.";
  export let announcementLinkText: string = "Read more";
  export let announcementLinkHref: string = "#";

  export let headline: string = "Data to enrich your online business";
  export let subHeadline: string =
    "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.";
  export let primaryCtaText: string = "Get started";
  export let primaryCtaLink: string = "#";
  export let secondaryCtaText: string = "Learn more";
  export let secondaryCtaLink: string = "#";
  export let showDecorativeGradients: boolean = true;

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<div class="bg-theme-bg-base"> {/* Uses theme variable for background */}
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href={logoLinkHref} class="-m-1.5 p-1.5">
          <span class="sr-only">{companyName}</span>
          <img class="h-8 w-auto" src={logoSrc} alt="{companyName} Logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" {/* text-gray-700 kept from original, could be text-theme-text-muted */}
          on:click={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-main"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        {#each navLinks as link}
          <a href={link.href} class="text-sm/6 font-semibold text-theme-text-base hover:text-theme-primary">{link.text}</a>
        {/each}
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href={loginLinkHref} class="text-sm/6 font-semibold text-theme-text-base hover:text-theme-primary">
          {loginLinkText} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>

    <!-- Mobile menu -->
    {#if isMobileMenuOpen}
      <div class="lg:hidden" role="dialog" aria-modal="true" id="mobile-menu-main">
        <div class="fixed inset-0 z-50 bg-black/25" on:click={toggleMobileMenu} /> {/* Overlay, could be themeable */}
        <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-theme-bg-base px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"> {/* ring-gray-900/10 kept, could be ring-theme-border */}
          <div class="flex items-center justify-between">
            <a href={logoLinkHref} class="-m-1.5 p-1.5">
              <span class="sr-only">{companyName}</span>
              <img class="h-8 w-auto" src={logoSrc} alt="{companyName} Logo" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" on:click={toggleMobileMenu}> {/* text-gray-700 kept */}
              <span class="sr-only">Close menu</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10"> {/* divide-gray-500/10 kept, could be divide-theme-border */}
              <div class="space-y-2 py-6">
                {#each navLinks as link}
                  <a href={link.href} class="-mx-3 block rounded-theme-md px-3 py-2 text-base/7 font-semibold text-theme-text-base hover:bg-theme-bg-alt">{link.text}</a>
                {/each}
              </div>
              <div class="py-6">
                <a href={loginLinkHref} class="-mx-3 block rounded-theme-md px-3 py-2.5 text-base/7 font-semibold text-theme-text-base hover:bg-theme-bg-alt">{loginLinkText}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </header>

  <div class="relative isolate px-6 pt-14 lg:px-8">
    {#if showDecorativeGradients}
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
    {/if}
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      {#if showAnnouncement}
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"> {/* text-gray-600 and ring colors kept from original */}
            {announcementText} <a href={announcementLinkHref} class="font-semibold text-indigo-600 hover:text-indigo-500"><span class="absolute inset-0" aria-hidden="true"></span>{announcementLinkText} <span aria-hidden="true">&rarr;</span></a> {/* text-indigo-600 kept */}
          </div>
        </div>
      {/if}
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">{headline}</h1> {/* text-gray-900 kept */}
        <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{subHeadline}</p> {/* text-gray-500 kept */}
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href={primaryCtaLink} class="rounded-theme-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> {/* bg-indigo-600, text-white kept */}
            {primaryCtaText}
          </a>
          <a href={secondaryCtaLink} class="text-sm/6 font-semibold text-gray-900 hover:text-gray-700"> {/* text-gray-900 kept */}
            {secondaryCtaText} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
    {#if showDecorativeGradients}
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
    {/if}
  </div>
</div>

<!-- 
Accessibility Notes:
- Mobile menu uses aria-modal="true" and role="dialog". Added aria-expanded and aria-controls to the toggle button.
- Added a basic overlay for the mobile menu that can be clicked to close.
- Sr-only text is used for company name and menu button actions.
- Nav element has aria-label="Global".
- Ensure color contrasts are sufficient. Original Tailwind UI colors are largely preserved for this example.
- `text-balance` and `text-pretty` classes are used for better text rendering.

Theming & Customization:
- This component attempts to balance direct Tailwind UI styling with themeable elements.
- Theme classes like `bg-theme-bg-base`, `text-theme-text-base`, `hover:text-theme-primary`, `hover:bg-theme-bg-alt`, `rounded-theme-md` are used in navigation.
- Core content (headline, subheadline, CTAs) largely retains original Tailwind UI styling (e.g., `text-gray-900`, `bg-indigo-600`) for fidelity to the example, but could be further theme-adapted.
- Decorative gradients are included by default (`showDecorativeGradients={true}`). Their specific colors are hardcoded from the example.
- All text content, links, and logo are configurable via props.
-->
