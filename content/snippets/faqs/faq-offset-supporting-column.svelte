<!-- Last updated: 2025-12-01T02:47:34.652Z -->
<!--
@description: An FAQ section with a main column for questions and answers, and an offset supporting column for a title and description. Based on Tailwind UI.
@props:
  mainTitle: string - The main title for the FAQ section (e.g., "Frequently asked questions").
  supportingTitle: string - Title for the supporting column.
  supportingDescription: string - Description for the supporting column.
  supportingLinkText: string - Text for the link in the supporting column.
  supportingLinkHref: string - Href for the link.
  faqs: Array<{ question: string, answer: string }> - Array of FAQ objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary (text-indigo-600 for link)
  --theme-primary-hover (hover:text-indigo-500 for link)
  --theme-border-color (divide-gray-900/10)
-->
<script lang="ts">
  export let mainTitle: string = "Frequently asked questions";
  export let supportingTitle: string = "Can’t find the answer you’re looking for?";
  export let supportingDescription: string = "Reach out to our <a href='#' class='font-semibold text-indigo-600 hover:text-indigo-500'>customer support</a> team."; // Themeable link
  export let faqs = [
    {
      question: "How do you make holy water?",
      answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "What's the best thing about Switzerland?",
      answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    // Add more FAQs as needed
  ];
</script>

<div class="bg-theme-bg-base">
  <div class="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
    <div class="lg:grid lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-5">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900">{mainTitle}</h2> {/* Themeable text-theme-text-base */}
        <p class="mt-4 text-base/7 text-pretty text-gray-600">{@html supportingDescription}</p> {/* Themeable text-theme-text-muted */}
      </div>
      <div class="mt-10 lg:col-span-7 lg:mt-0">
        <dl class="space-y-10">
          {#each faqs as faq}
            <div>
              <dt class="text-base/7 font-semibold text-gray-900">{faq.question}</dt> {/* Themeable text-theme-text-base */}
              <dd class="mt-2 text-base/7 text-gray-600">{@html faq.answer}</dd> {/* Themeable text-theme-text-muted */}
            </div>
          {/each}
        </dl>
      </div>
    </div>
  </div>
</div>
