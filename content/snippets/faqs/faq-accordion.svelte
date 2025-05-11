<!--
@description: An FAQ section with questions that expand/collapse (accordion style) to show answers. Based on Tailwind UI.
@props:
  title: string - The main title for the FAQ section.
  faqs: Array<{ id: string | number, question: string, answer: string }> - Array of FAQ objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-border-color (divide-gray-900/10)
  --theme-icon-color (text-gray-400, hover:text-gray-500)
-->
<script lang="ts">
  export let title: string = "Frequently asked questions";
  
  export let faqs = [
    {
      id: 'faq1',
      question: "What's the best thing about Switzerland?",
      answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      id: 'faq2',
      question: "How do you make holy water?",
      answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      id: 'faq3',
      question: "What do you call someone with no body and no nose?",
      answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    }
    // Add more FAQs as needed
  ];

  let openFaqId: string | number | null = null;

  function toggleFaq(id: string | number) {
    if (openFaqId === id) {
      openFaqId = null;
    } else {
      openFaqId = id;
    }
  }
</script>

<div class="bg-theme-bg-base">
  <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
    <div class="mx-auto max-w-4xl">
      <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
      <dl class="mt-16 divide-y divide-gray-900/10"> {/* Themeable divide-theme-border-color */}
        {#each faqs as faq}
          <div class="py-6 first:pt-0 last:pb-0">
            <dt>
              <button 
                type="button" 
                class="flex w-full items-start justify-between text-left text-gray-900" 
                aria-controls="faq-panel-{faq.id}" 
                aria-expanded={openFaqId === faq.id}
                on:click={() => toggleFaq(faq.id)}
              > {/* Themeable text-theme-text-base */}
                <span class="text-base/7 font-semibold">{faq.question}</span>
                <span class="ml-6 flex h-7 items-center">
                  {#if openFaqId === faq.id}
                    <svg class="size-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> {/* Themeable icon color */}
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>
                  {:else}
                    <svg class="size-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> {/* Themeable icon color */}
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  {/if}
                </span>
              </button>
            </dt>
            {#if openFaqId === faq.id}
              <dd class="mt-2 pr-12" id="faq-panel-{faq.id}">
                <p class="text-base/7 text-gray-600">{@html faq.answer}</p> {/* Themeable text-theme-text-muted */}
              </dd>
            {/if}
          </div>
        {/each}
      </dl>
    </div>
  </div>
</div>
