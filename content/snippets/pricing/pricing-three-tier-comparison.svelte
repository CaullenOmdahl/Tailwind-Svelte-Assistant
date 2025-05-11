<!--
@description: A three-tier pricing section with a feature comparison table. Includes a "most popular" highlight. Based on Tailwind UI.
@props:
  accentText: string - Small text above the main title (e.g., "Pricing").
  title: string - The main title of the pricing section.
  description: string - Introductory paragraph.
  frequencyOptions: Array<{ value: string, label: string }> - Options for frequency toggle (e.g., monthly, annually).
  defaultFrequency: string - The default selected frequency value.
  tiers: Array<{ 
    name: string, 
    id: string, 
    href: string, 
    price: { monthly: string, annually: string } | string, // Can be object or simple string if no toggle
    description: string, 
    features: string[], 
    mostPopular?: boolean 
  }> - Array of pricing tier objects.
  featureSections: Array<{ 
    name: string, 
    features: Array<{ name: string, tiers: { [tierId: string]: boolean | string } }> 
  }> - Feature comparison data.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50)
  --theme-text-base (text-gray-900, text-gray-950)
  --theme-text-muted (text-gray-600, text-gray-500, text-gray-400)
  --theme-primary (text-indigo-600, bg-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-primary-ring (ring-indigo-200, hover:ring-indigo-300, focus-visible:outline-indigo-600)
  --theme-primary-highlight-ring (ring-indigo-600 for most popular)
  --theme-text-on-primary (text-white)
  --theme-border-color (divide-gray-100, ring-gray-200, border-gray-900/10, border-gray-100)
  --theme-border-radius-md (rounded-md)
  --theme-border-radius-xl (rounded-xl)
  --theme-border-radius-3xl (rounded-3xl)
  --theme-icon-check (text-indigo-600)
  --theme-icon-minus (text-gray-400)
-->
<script lang="ts">
  import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'; // Placeholder, replace with Svelte-friendly icons or SVG paths

  export let accentText: string = "Pricing";
  export let title: string = "Pricing that grows with you";
  export let description: string = "Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.";
  
  export let frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually' },
  ];
  export let defaultFrequency: string = 'monthly';
  
  let selectedFrequency = defaultFrequency;

  export let tiers = [
    {
      name: 'Freelancer',
      id: 'tier-freelancer',
      href: '#',
      price: { monthly: '$19', annually: '$15' },
      description: 'The essentials to provide your best work for clients.',
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
      mostPopular: false,
    },
    {
      name: 'Startup',
      id: 'tier-startup',
      href: '#',
      price: { monthly: '$29', annually: '$25' }, // Example annual price
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      price: { monthly: '$59', annually: '$49' }, // Example annual price
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom reporting tools',
      ],
      mostPopular: false,
    },
  ];

  export let featureSections = [
    {
      name: 'Features',
      features: [
        { name: 'Edge content delivery', tiers: { freelancer: true, startup: true, enterprise: true } },
        { name: 'Custom domains', tiers: { freelancer: '1', startup: '3', enterprise: 'Unlimited' } },
        { name: 'Team members', tiers: { freelancer: '3', startup: '20', enterprise: 'Unlimited' } },
        { name: 'Single sign-on (SSO)', tiers: { freelancer: false, startup: false, enterprise: true } },
      ],
    },
    {
      name: 'Reporting',
      features: [
        { name: 'Advanced analytics', tiers: { freelancer: true, startup: true, enterprise: true } },
        { name: 'Basic reports', tiers: { freelancer: false, startup: true, enterprise: true } },
        { name: 'Professional reports', tiers: { freelancer: false, startup: false, enterprise: true } },
        { name: 'Custom report builder', tiers: { freelancer: false, startup: false, enterprise: true } },
      ],
    },
    {
      name: 'Support',
      features: [
        { name: '24/7 online support', tiers: { freelancer: true, startup: true, enterprise: true } },
        { name: 'Quarterly workshops', tiers: { freelancer: false, startup: true, enterprise: true } },
        { name: 'Priority phone support', tiers: { freelancer: false, startup: false, enterprise: true } },
        { name: '1:1 onboarding tour', tiers: { freelancer: false, startup: false, enterprise: true } },
      ],
    },
  ];

  // Helper to get price based on frequency
  function getPrice(priceData: { monthly: string, annually: string } | string) {
    if (typeof priceData === 'string') return priceData;
    return priceData[selectedFrequency as keyof typeof priceData] || priceData.monthly;
  }
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base/7 font-semibold text-indigo-600">{accentText}</h2> {/* Themeable */}
      <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">{title}</p> {/* Themeable */}
    </div>
    <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">{description}</p> {/* Themeable */}
    
    {#if typeof tiers[0].price !== 'string'}
    <div class="mt-16 flex justify-center">
      <fieldset aria-label="Payment frequency" class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-gray-200 ring-inset"> {/* Themeable ring */}
        {#each frequencyOptions as option}
          <label class="cursor-pointer rounded-full px-2.5 py-1 {selectedFrequency === option.value ? 'bg-indigo-600 text-white' : 'text-gray-500'}"> {/* Themeable selected/unselected */}
            <input type="radio" name="frequency" value={option.value} bind:group={selectedFrequency} class="sr-only" />
            <span>{option.label}</span>
          </label>
        {/each}
      </fieldset>
    </div>
    {/if}

    <!-- Pricing cards (xs to lg) -->
    <div class="isolate mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
      {#each tiers as tier}
      <section class="p-8 {tier.mostPopular ? 'rounded-xl bg-gray-400/5 ring-1 ring-gray-200 ring-inset' : ''}"> {/* Themeable */}
        <h3 id="tier-{tier.id}-mobile" class="text-sm/6 font-semibold {tier.mostPopular ? 'text-indigo-600' : 'text-gray-900'}">{tier.name}</h3> {/* Themeable */}
        <p class="mt-2 flex items-baseline gap-x-1 text-gray-900"> {/* Themeable */}
          <span class="text-4xl font-semibold">{getPrice(tier.price)}</span>
          {#if typeof tier.price !== 'string'}
          <span class="text-sm font-semibold">/{selectedFrequency === 'monthly' ? 'month' : 'year'}</span>
          {/if}
        </p>
        <a href={tier.href} aria-describedby="tier-{tier.id}-mobile" class="mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold {tier.mostPopular ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600'}">Buy plan</a> {/* Themeable */}
        
        {#each featureSections as section, sectionIndex}
          {#if sectionIndex === 0} <!-- Only show first section of features for brevity on mobile -->
            <ul role="list" class="mt-10 space-y-4 text-sm/6 text-gray-900"> {/* Themeable */}
              {#each section.features.slice(0,4) as featureItem}
                <li class="flex gap-x-3">
                  {#if typeof featureItem.tiers[tier.id] === 'boolean' && featureItem.tiers[tier.id]}
                    <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                      <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    <span>{featureItem.name}</span>
                  {:else if typeof featureItem.tiers[tier.id] === 'string'}
                    <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                       <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                    </svg>
                    <span>{featureItem.name} <span class="text-sm/6 text-gray-500">({featureItem.tiers[tier.id]})</span></span> {/* Themeable muted */}
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        {/each}
      </section>
      {/each}
    </div>

    <!-- Pricing table (lg+) -->
    <div class="isolate mt-20 hidden lg:block">
      <div class="relative -mx-8">
        {#if tiers.find(t => t.mostPopular)}
        <div class="absolute inset-x-4 inset-y-0 -z-10 flex">
          <div class="flex w-1/4 px-4" style="margin-left: {tiers.findIndex(t => t.mostPopular) * 25}%" aria-hidden="true">
            <div class="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5"></div> {/* Themeable */}
          </div>
        </div>
        {/if}
        <table class="w-full table-fixed border-separate border-spacing-x-8 text-left">
          <caption class="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col class="w-1/4" />
            <col class="w-1/4" />
            <col class="w-1/4" />
            <col class="w-1/4" />
          </colgroup>
          <thead>
            <tr>
              <td></td>
              {#each tiers as tier}
              <th scope="col" class="px-6 pt-6 xl:px-8 xl:pt-8">
                <div class="text-sm/7 font-semibold {tier.mostPopular ? 'text-indigo-600' : 'text-gray-900'}">{tier.name}</div> {/* Themeable */}
              </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><span class="sr-only">Price</span></th>
              {#each tiers as tier}
              <td class="px-6 pt-2 xl:px-8">
                <div class="flex items-baseline gap-x-1 text-gray-900"> {/* Themeable */}
                  <span class="text-4xl font-semibold">{getPrice(tier.price)}</span>
                  {#if typeof tier.price !== 'string'}
                  <span class="text-sm/6 font-semibold">/{selectedFrequency === 'monthly' ? 'month' : 'year'}</span>
                  {/if}
                </div>
                <a href={tier.href} class="mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold {tier.mostPopular ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600'}">Buy plan</a> {/* Themeable */}
              </td>
              {/each}
            </tr>
            {#each featureSections as section}
            <tr>
              <th scope="colgroup" colspan="4" class="pt-8 pb-4 text-sm/6 font-semibold text-gray-900"> {/* Themeable */}
                {section.name}
                <div class="absolute inset-x-8 mt-4 h-px bg-gray-900/10"></div> {/* Themeable */}
              </th>
            </tr>
              {#each section.features as featureItem}
              <tr>
                <th scope="row" class="py-4 text-sm/6 font-normal text-gray-900"> {/* Themeable */}
                  {featureItem.name}
                  <div class="absolute inset-x-8 mt-4 h-px bg-gray-900/5"></div> {/* Themeable */}
                </th>
                {#each tiers as tier}
                <td class="px-6 py-4 xl:px-8">
                  {#if typeof featureItem.tiers[tier.id] === 'boolean'}
                    {#if featureItem.tiers[tier.id]}
                      <svg class="mx-auto size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                      </svg>
                      <span class="sr-only">Included in {tier.name}</span>
                    {:else}
                      <svg class="mx-auto size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                      </svg>
                      <span class="sr-only">Not included in {tier.name}</span>
                    {/if}
                  {:else if typeof featureItem.tiers[tier.id] === 'string'}
                    <div class="text-center text-sm/6 text-gray-500">{featureItem.tiers[tier.id]}</div> {/* Themeable */}
                  {/if}
                </td>
                {/each}
              </tr>
              {/each}
            {/each}
          </tbody>
        </table>
        <!-- Fake card borders -->
        {#if tiers.find(t => t.mostPopular)}
        <div class="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block" aria-hidden="true">
          {#each tiers as tier, i}
            <div class="rounded-lg {tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10'}"></div> {/* Themeable */}
          {/each}
        </div>
        {/if}
      </div>
    </div>
  </div>
</div>
