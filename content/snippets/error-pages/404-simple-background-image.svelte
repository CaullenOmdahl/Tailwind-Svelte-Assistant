<!-- Last updated: 2025-07-30T11:02:12.771Z -->
<!--
@description: A full-page 404 error page with a background image and centered content. Based on Tailwind UI.
@props:
  imageUrl: string - URL for the full-page background image.
  errorCode: string - The error code to display (e.g., "404").
  title: string - The main title of the error page (e.g., "Page not found").
  message: string - The descriptive message for the error.
  backLinkText: string - Text for the "back to home" link.
  backLinkHref: string - Href for the "back to home" link.
@theme_vars:
  --theme-text-base (text-white for this example)
  --theme-text-muted (text-white/70 for this example)
  --theme-primary (text-white for link, could be themed)
  Note: This example assumes a dark background image where white text is appropriate.
-->
<script lang="ts">
  export let imageUrl: string = "https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75";
  export let errorCode: string = "404";
  export let title: string = "Page not found";
  export let message: string = "Sorry, we couldn’t find the page you’re looking for.";
  export let backLinkText: string = "Back to home";
  export let backLinkHref: string = "#";

  // Note: The original HTML suggests class="h-full" on html and body.
  // This component assumes it will be placed in a container that allows it to fill the viewport if desired.
</script>

<main class="relative isolate min-h-full">
  <img src={imageUrl} alt="Background" class="absolute inset-0 -z-10 size-full object-cover object-top" />
  <div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
    <p class="text-base/8 font-semibold text-white">{errorCode}</p> {/* Themeable: text-theme-primary or text-theme-text-base on dark bg */}
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">{title}</h1> {/* Themeable: text-theme-text-base on dark bg */}
    <p class="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">{message}</p> {/* Themeable: text-theme-text-muted on dark bg */}
    <div class="mt-10 flex justify-center">
      <a href={backLinkHref} class="text-sm/7 font-semibold text-white hover:opacity-80"> {/* Themeable: text-theme-primary or text-theme-text-base on dark bg */}
        <span aria-hidden="true">&larr;</span> {backLinkText}
      </a>
    </div>
  </div>
</main>
