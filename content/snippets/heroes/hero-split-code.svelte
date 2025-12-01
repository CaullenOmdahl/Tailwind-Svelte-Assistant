<!-- Last updated: 2025-12-01T02:47:34.657Z -->
<!--
@description: Hero section with a split layout, text content on the left, and a stylized code example block on the right. Based on Tailwind UI.
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
  codeFileName1: string - Name of the first code file tab.
  codeFileName2: string - Name of the second code file tab.
  codeExampleContent: string - Placeholder for the actual code to be displayed.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-indigo-100/20, bg-indigo-100 opacity-20)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600, text-gray-500, text-gray-400)
  --theme-primary (text-indigo-600, bg-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-text-on-primary (text-white)
  --theme-border-color (ring-indigo-600/10, ring-indigo-50, ring-white/5, ring-black/10)
  --theme-border-radius-md (rounded-md)
  --theme-border-radius-xl (rounded-xl)
  --radius-3xl (used in clip-path, typically a Tailwind var or custom prop)
-->
<script lang="ts">
  export let logoSrc: string = "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600";
  export let logoAlt: string = "Your Company";
  export let announcementBadgeText: string = "What's new";
  export let announcementText: string = "Just shipped v0.1.0";
  export let announcementLinkHref: string = "#";
  export let headline: string = "Supercharge your web app";
  export let subHeadline: string = "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.";
  export let primaryCtaText: string = "Documentation";
  export let primaryCtaLink: string = "#";
  export let secondaryCtaText: string = "View on GitHub";
  export let secondaryCtaLink: string = "#";
  export let codeFileName1: string = "NotificationSetting.jsx";
  export let codeFileName2: string = "App.jsx";
  export let codeExampleContent: string = "// Your code example here...\nconsole.log('Hello, world!');";
</script>

<div class="bg-theme-bg-base">
  <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"> {/* Consider from-theme-bg-alt/20 */}
    <div class="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="mx-auto max-w-2xl">
          <div class="max-w-lg">
            <img class="h-11" src={logoSrc} alt={logoAlt} />
            <div class="mt-24 sm:mt-32 lg:mt-16">
              <a href={announcementLinkHref} class="inline-flex space-x-6">
                <span class="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-600/10">{announcementBadgeText}</span> {/* Themeable */}
                <span class="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600"> {/* Themeable */}
                  <span>{announcementText}</span>
                  <svg class="size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable */}
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </span>
              </a>
            </div>
            <h1 class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">{headline}</h1> {/* Themeable */}
            <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{subHeadline}</p> {/* Themeable */}
            <div class="mt-10 flex items-center gap-x-6">
              <a href={primaryCtaLink} class="rounded-theme-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{primaryCtaText}</a> {/* Themeable */}
              <a href={secondaryCtaLink} class="text-sm/6 font-semibold text-gray-900">{secondaryCtaText} <span aria-hidden="true">→</span></a> {/* Themeable */}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
        <div class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true"></div> {/* bg-theme-bg-base, shadow-theme-primary/10, ring-theme-primary-lightest */}
        <div class="shadow-lg md:rounded-3xl"> {/* Consider rounded-theme-3xl */}
          <div class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]"> {/* bg-theme-primary. --radius-3xl would need to be defined or use a Tailwind equivalent like rounded-3xl if available and configured */}
            <div class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-white ring-inset md:ml-20 lg:ml-36" aria-hidden="true"></div> {/* bg-theme-bg-alt opacity-20 ring-theme-bg-base */}
            <div class="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
              <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                <div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900"> {/* bg-gray-900 or a dark theme variable */}
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5"> {/* bg-gray-800/40 or dark theme alt, ring-white/5 or theme border on dark */}
                    <div class="-mb-px flex text-sm/6 font-medium text-gray-400"> {/* text-theme-text-muted on dark */}
                      <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">{codeFileName1}</div> {/* Themeable borders, bg, text */}
                      <div class="border-r border-gray-600/10 px-4 py-2">{codeFileName2}</div> {/* Themeable border */}
                    </div>
                  </div>
                  <div class="px-6 pt-6 pb-14">
                    <pre class="text-sm text-white overflow-x-auto"><code>{codeExampleContent}</code></pre> {/* text-white or themeable */}
                  </div>
                </div>
              </div>
              <div class="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl" aria-hidden="true"></div> {/* ring-black/10 or theme border */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div> {/* from-theme-bg-base */}
  </div>
</div>
