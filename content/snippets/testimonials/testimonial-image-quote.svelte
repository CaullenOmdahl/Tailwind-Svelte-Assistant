<!-- Last updated: 2025-07-30T11:02:12.782Z -->
<!--
@description: A testimonial section featuring a prominent quote, author details, and a company logo. Includes decorative background elements. Based on Tailwind UI.
@props:
  companyLogoSrc: string - URL for the company logo displayed above the quote.
  companyLogoAlt: string - Alt text for the company logo.
  quote: string - The main testimonial quote.
  authorName: string - Name of the person giving the testimonial.
  authorTitle: string - Title/role of the person.
  authorImageUrl: string - URL for the author's avatar.
  decorativeGradient: boolean - Whether to show the decorative background gradient.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-indigo-100 for gradient part)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-border-color (ring-indigo-50 for gradient part, shadow-indigo-600/10 for gradient part)
-->
<script lang="ts">
  export let companyLogoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg";
  export let companyLogoAlt: string = "Workcation";
  export let quote: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.";
  export let authorName: string = "Judith Black";
  export let authorTitle: string = "CEO of Workcation";
  export let authorImageUrl: string = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  export let decorativeGradient: boolean = true;
</script>

<section class="relative isolate overflow-hidden bg-theme-bg-base px-6 py-24 sm:py-32 lg:px-8">
  {#if decorativeGradient}
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div> {/* Consider theme-bg-alt for --color-indigo-100 */}
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div> {/* Themeable bg-theme-bg-base, shadow-theme-primary/10, ring-theme-primary-lightest */}
  {/if}
  <div class="mx-auto max-w-2xl lg:max-w-4xl">
    <img class="mx-auto h-12" src={companyLogoSrc} alt={companyLogoAlt} />
    <figure class="mt-10">
      <blockquote class="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"> {/* Themeable text-theme-text-base */}
        <p>“{quote}”</p>
      </blockquote>
      <figcaption class="mt-10">
        <img class="mx-auto size-10 rounded-full" src={authorImageUrl} alt="{authorName} avatar" />
        <div class="mt-4 flex items-center justify-center space-x-3 text-base">
          <div class="font-semibold text-gray-900">{authorName}</div> {/* Themeable text-theme-text-base */}
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900"> {/* Themeable fill-theme-text-base */}
            <circle cx="1" cy="1" r="1" />
          </svg>
          <div class="text-gray-600">{authorTitle}</div> {/* Themeable text-theme-text-muted */}
        </div>
      </figcaption>
    </figure>
  </div>
</section>
