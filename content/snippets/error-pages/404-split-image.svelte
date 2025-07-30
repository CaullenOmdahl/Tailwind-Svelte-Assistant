<!-- Last updated: 2025-07-30T11:02:12.771Z -->
<!--
@description: A 404 error page with a split layout: content on the left, and a full-height image on the right. Includes a header and footer. Based on Tailwind UI.
@props:
  logoSrc: string - URL for the company logo.
  logoAlt: string - Alt text for the logo.
  errorCode: string - The error code (e.g., "404").
  title: string - Main title of the error page.
  message: string - Descriptive error message.
  backLinkText: string - Text for the "back to home" link.
  backLinkHref: string - Href for the "back to home" link.
  footerLinks: Array<{ text: string, href: string }> - Links for the footer.
  imageUrl: string - URL for the image on the right side.
  imageAlt: string - Alt text for the image.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-500, text-gray-600, fill-gray-300)
  --theme-primary (text-indigo-600)
  --theme-border-color (border-gray-100)
-->
<script lang="ts">
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600";
  export let logoAlt: string = "Your Company";
  export let errorCode: string = "404";
  export let title: string = "Page not found";
  export let message: string = "Sorry, we couldn’t find the page you’re looking for.";
  export let backLinkText: string = "Back to home";
  export let backLinkHref: string = "#";
  export let footerLinks: Array<{ text: string, href: string }> = [
    { text: "Contact support", href: "#" },
    { text: "Status", href: "#" },
  ];
  export let imageUrl: string = "https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80";
  export let imageAlt: string = "Scenic landscape";

  // Note: The original HTML suggests class="h-full" on html and body for full page layout.
</script>

<div class="grid min-h-full grid-cols-1 grid-rows-[auto_1fr_auto] bg-theme-bg-base lg:grid-cols-[max(50%,36rem)_1fr]">
  <header class="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
    <a href={backLinkHref}> {/* Assuming logo links home */}
      <span class="sr-only">{logoAlt}</span>
      <img class="h-10 w-auto sm:h-12" src={logoSrc} alt={logoAlt} />
    </a>
  </header>

  <main class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
    <div class="max-w-lg">
      <p class="text-base/8 font-semibold text-indigo-600">{errorCode}</p> {/* Themeable: text-theme-primary */}
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">{title}</h1> {/* Themeable: text-theme-text-base */}
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{message}</p> {/* Themeable: text-theme-text-muted */}
      <div class="mt-10">
        <a href={backLinkHref} class="text-sm/7 font-semibold text-indigo-600 hover:text-indigo-500"> {/* Themeable: text-theme-primary hover:text-theme-primary-hover */}
          <span aria-hidden="true">&larr;</span> {backLinkText}
        </a>
      </div>
    </div>
  </main>

  <footer class="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
    <div class="border-t border-gray-100 bg-gray-50 py-10"> {/* Themeable: border-theme-border, bg-theme-bg-alt */}
      <nav class="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8"> {/* Themeable: text-theme-text-muted */}
        {#each footerLinks as link, i}
          <a href={link.href} class="hover:text-gray-700">{link.text}</a> {/* Themeable: hover:text-theme-text-base */}
          {#if i < footerLinks.length - 1}
            <svg viewBox="0 0 2 2" aria-hidden="true" class="size-0.5 fill-gray-300"> {/* Themeable: fill-theme-border-color */}
              <circle cx="1" cy="1" r="1" />
            </svg>
          {/if}
        {/each}
      </nav>
    </div>
  </footer>

  <div class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
    <img src={imageUrl} alt={imageAlt} class="absolute inset-0 size-full object-cover" />
  </div>
</div>
