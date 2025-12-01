<!-- Last updated: 2025-12-01T02:47:34.650Z -->
<!--
@description: A simple, centered 404 error page. Based on Tailwind UI.
@props:
  errorCode: string - The error code (e.g., "404").
  title: string - Main title of the error page.
  message: string - Descriptive error message.
  primaryCtaText: string - Text for the primary CTA (e.g., "Go back home").
  primaryCtaLink: string - Href for the primary CTA.
  secondaryCtaText: string - Text for the secondary CTA (e.g., "Contact support").
  secondaryCtaLink: string - Href for the secondary CTA.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-500)
  --theme-primary (text-indigo-600, bg-indigo-600, focus-visible:outline-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-text-on-primary (text-white)
  --theme-border-radius-md (rounded-md)
-->
<script lang="ts">
  export let errorCode: string = "404";
  export let title: string = "Page not found";
  export let message: string = "Sorry, we couldn’t find the page you’re looking for.";
  export let primaryCtaText: string = "Go back home";
  export let primaryCtaLink: string = "#";
  export let secondaryCtaText: string = "Contact support";
  export let secondaryCtaLink: string = "#";

  // Note: The original HTML suggests class="h-full" on html and body for full page layout.
</script>

<main class="grid min-h-full place-items-center bg-theme-bg-base px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">{errorCode}</p> {/* Themeable: text-theme-primary */}
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">{title}</h1> {/* Themeable: text-theme-text-base */}
    <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{message}</p> {/* Themeable: text-theme-text-muted */}
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a
        href={primaryCtaLink}
        class="rounded-theme-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >{primaryCtaText}</a> {/* Themeable: bg-theme-primary, text-theme-text-on-primary, hover:bg-theme-primary-hover, focus-visible:outline-theme-primary */}
      <a href={secondaryCtaLink} class="text-sm font-semibold text-gray-900 hover:text-gray-700">{secondaryCtaText} <span aria-hidden="true">&rarr;</span></a> {/* Themeable: text-theme-text-base, hover:text-theme-text-muted */}
    </div>
  </div>
</main>
