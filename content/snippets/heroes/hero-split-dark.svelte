<!-- Last updated: 2025-07-30T11:02:12.777Z -->
<!--
@description: Hero section with a split layout, content on the left, and a screenshot placeholder on the right, on a dark background. Based on Tailwind UI.
@props:
  logoSrc: string - URL for the company logo.
  logoAlt: string - Alt text for the logo.
  announcementBadgeText: string - Text for the small badge (e.g., "What's new").
  announcementText: string - Main text for the announcement.
  announcementLinkHref: string - Href for the announcement link.
  headline: string - Main headline text.
  subHeadline: string - Supporting text below the headline.
  primaryCtaText: string - Text for the primary CTA.
  primaryCtaLink: string - Href for the primary CTA.
  secondaryCtaText: string - Text for the secondary CTA.
  secondaryCtaLink: string - Href for the secondary CTA.
  screenshotSrc: string - URL for the app screenshot.
  screenshotAlt: string - Alt text for the screenshot.
  showDecorativePattern: boolean - Toggle for the SVG background pattern.
  showDecorativeBlur: boolean - Toggle for the decorative gradient blur.
@theme_vars:
  --theme-bg-base (bg-gray-900 in this dark example, could be bg-theme-bg-dark)
  --theme-text-base (text-white)
  --theme-text-muted (text-gray-300, text-gray-400)
  --theme-primary (text-indigo-400, bg-indigo-500)
  --theme-primary-hover (hover:bg-indigo-400)
  --theme-border-color (ring-indigo-500/20, ring-white/10)
-->
<script lang="ts">
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500";
  export let logoAlt: string = "Your Company";
  export let announcementBadgeText: string = "What's new";
  export let announcementText: string = "Just shipped v1.0";
  export let announcementLinkHref: string = "#";
  export let headline: string = "Deploy to the cloud with confidence";
  export let subHeadline: string = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.";
  export let primaryCtaText: string = "Get started";
  export let primaryCtaLink: string = "#";
  export let secondaryCtaText: string = "Learn more";
  export let secondaryCtaLink: string = "#";
  export let screenshotSrc: string = "https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png";
  export let screenshotAlt: string = "App screenshot";
  export let showDecorativePattern: boolean = true;
  export let showDecorativeBlur: boolean = true;
</script>

<div class="relative isolate overflow-hidden bg-gray-900"> {/* Consider bg-theme-bg-dark */}
  {#if showDecorativePattern}
    <svg class="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-white/10" aria-hidden="true">
      <defs>
        <pattern id="hero-split-dark-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      {/* <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
        <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#hero-split-dark-pattern)" /> */}
    </svg>
  {/if}

  {#if showDecorativeBlur}
    <div class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]" aria-hidden="true">
      <div class="aspect-1108/632 w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
    </div>
  {/if}

  <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
    <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
      <img class="h-11" src={logoSrc} alt={logoAlt} />
      <div class="mt-24 sm:mt-32 lg:mt-16">
        <a href={announcementLinkHref} class="inline-flex space-x-6">
          <span class="rounded-full bg-indigo-500/10 px-3 py-1 text-sm/6 font-semibold text-indigo-400 ring-1 ring-indigo-500/20 ring-inset">{announcementBadgeText}</span> {/* Themeable: bg-theme-primary/10 text-theme-primary ring-theme-primary/20 */}
          <span class="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-300"> {/* Themeable: text-theme-text-muted */}
            <span>{announcementText}</span>
            <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable: text-theme-text-muted/70 */}
              <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </span>
        </a>
      </div>
      <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">{headline}</h1> {/* Themeable: text-theme-text-base (on dark) */}
      <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">{subHeadline}</p> {/* Themeable: text-theme-text-muted (on dark) */}
      <div class="mt-10 flex items-center gap-x-6">
        <a href={primaryCtaLink} class="rounded-theme-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"> {/* Themeable: bg-theme-primary text-theme-text-on-primary hover:bg-theme-primary-hover focus-visible:outline-theme-primary */}
          {primaryCtaText}
        </a>
        <a href={secondaryCtaLink} class="text-sm/6 font-semibold text-white"> {/* Themeable: text-theme-text-base (on dark) */}
          {secondaryCtaText} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
    <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
      <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <img src={screenshotSrc} alt={screenshotAlt} width="2432" height="1442" class="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10" />
      </div>
    </div>
  </div>
</div>
