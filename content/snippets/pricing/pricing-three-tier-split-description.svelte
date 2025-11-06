<!-- Last updated: 2025-11-06T05:40:53.470Z -->
<!--
@description: A three-tier pricing section where each tier has a description and a separate feature list. One tier is highlighted. Based on Tailwind UI.
@props:
  accentText: string - Small text above the main title.
  title: string - The main title of the pricing section.
  description: string - Introductory paragraph.
  tiers: Array<{ 
    name: string, 
    id: string, 
    href: string, 
    priceMonthly: string, 
    tierDescription: string, 
    features: string[], 
    featured?: boolean 
  }> - Array of pricing tier objects.
  decorativeGradient: boolean - Whether to show the decorative background gradient.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-white/60 or bg-gray-900 for featured)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600, text-gray-500, text-gray-400, text-gray-300 for featured)
  --theme-primary (text-indigo-600, bg-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-primary-accent (text-indigo-400 for featured accent)
  --theme-text-on-primary (text-white)
  --theme-border-color (ring-gray-900/10)
  --theme-border-radius-md (rounded-md)
  --theme-border-radius-3xl (rounded-3xl)
  --theme-icon-check (text-indigo-600 or text-indigo-400 for featured)
-->
<script lang="ts">
  // Placeholder for icons, replace with actual Svelte icon components or SVG paths
  // For example, using heroicons:
  // import { CheckIcon } from '@heroicons/react/20/solid'; 

  export let accentText: string = "Pricing";
  export let title: string = "Choose the right plan for you";
  export let description: string = "Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.";
  
  export let tiers = [
    {
      name: 'Hobby',
      id: 'tier-hobby',
      href: '#',
      priceMonthly: '$29',
      tierDescription: "The perfect plan if you're just getting started with our product.",
      features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
      featured: false,
    },
    {
      name: 'Enterprise', // Tailwind UI example has this as "Enterprise" but it's the featured one
      id: 'tier-enterprise',
      href: '#',
      priceMonthly: '$99',
      tierDescription: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        'Dedicated support representative',
        'Marketing automations',
        'Custom integrations',
      ],
      featured: true,
    },
     {
      name: 'Team', // This was the third one in the example, placed to match visual order
      id: 'tier-team',
      href: '#',
      priceMonthly: '$49', // Example price, adjust as needed
      tierDescription: 'A plan that scales with your rapidly growing business.',
      features: [
        'Priority support', 
        'Single sign-on',
        'Enterprise integrations', // Example, adjust
        'Custom reporting tools' // Example, adjust
      ],
      featured: false,
    },
  ];
  export let decorativeGradient: boolean = true;
</script>

<div class="relative isolate bg-theme-bg-base px-6 py-24 sm:py-32 lg:px-8">
  {#if decorativeGradient}
  <div class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl" aria-hidden="true">
    <div class="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
  {/if}
  <div class="mx-auto max-w-4xl text-center">
    <h2 class="text-base/7 font-semibold text-indigo-600">{accentText}</h2> {/* Themeable */}
    <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">{title}</p> {/* Themeable */}
  </div>
  <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">{description}</p> {/* Themeable */}
  
  <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
    {#each tiers as tier, index}
      {@const isFeatured = tier.featured}
      {@const isFirst = index === 0}
      {@const isLast = index === tiers.length - 1 && tiers.length > 1} 
      {@const isMiddle = !isFirst && !isLast && tiers.length === 3}


      <div class="relative p-8 shadow-2xl ring-1 sm:p-10
        {isFeatured ? 'rounded-3xl bg-gray-900 ring-gray-900/10' : 'bg-white/60 ring-gray-900/10'}
        {isFirst && !isFeatured ? 'rounded-t-3xl sm:mx-8 sm:rounded-b-none lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl' : ''}
        {isLast && !isFeatured && tiers.length === 2 ? 'rounded-b-3xl sm:mx-8 sm:rounded-t-none lg:mx-0 lg:rounded-tl-none lg:rounded-br-3xl' : ''}
        {isMiddle && !isFeatured ? 'rounded-3xl sm:mx-8 lg:mx-0' : ''} 
        {tiers.length === 3 && isLast && !isFeatured ? 'rounded-b-3xl sm:mx-8 sm:rounded-t-none lg:mx-0 lg:rounded-tl-none lg:rounded-br-3xl' : ''}
      ">
        <h3 id={tier.id} class="text-base/7 font-semibold {isFeatured ? 'text-indigo-400' : 'text-indigo-600'}">{tier.name}</h3> {/* Themeable */}
        <p class="mt-4 flex items-baseline gap-x-2">
          <span class="text-5xl font-semibold tracking-tight {isFeatured ? 'text-white' : 'text-gray-900'}">{tier.priceMonthly}</span> {/* Themeable */}
          <span class="text-base {isFeatured ? 'text-gray-400' : 'text-gray-500'}">/month</span> {/* Themeable */}
        </p>
        <p class="mt-6 text-base/7 {isFeatured ? 'text-gray-300' : 'text-gray-600'}">{tier.tierDescription}</p> {/* Themeable */}
        <ul role="list" class="mt-8 space-y-3 text-sm/6 {isFeatured ? 'text-gray-300' : 'text-gray-600'} sm:mt-10"> {/* Themeable */}
          {#each tier.features as feature}
            <li class="flex gap-x-3">
              <svg class="h-6 w-5 flex-none {isFeatured ? 'text-indigo-400' : 'text-indigo-600'}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
              </svg>
              {feature}
            </li>
          {/each}
        </ul>
        <a 
          href={tier.href} 
          aria-describedby={tier.id} 
          class="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold sm:mt-10
          {isFeatured ? 
            'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500' : 
            'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600'}"
        >Get started today</a> {/* Themeable */}
      </div>
    {/each}
  </div>
</div>
