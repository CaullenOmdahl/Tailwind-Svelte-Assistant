<!--
@description: An FAQ section with questions and answers arranged in three columns. Based on Tailwind UI.
@props:
  title: string - The main title for the FAQ section.
  description: string - A short description or introductory paragraph.
  faqs: Array<{ question: string, answer: string }> - Array of FAQ objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-border-color (border-gray-900/10 for the top border)
-->
<script lang="ts">
  export let title: string = "Frequently asked questions";
  export let description: string = "Have a different question and can’t find the answer you’re looking for? Reach out to our support team by <a href='#' class='font-semibold text-indigo-600 hover:text-indigo-500'>sending us an email</a> and we’ll get back to you as soon as we can."; // Themeable link

  export let faqs = [
    {
      question: "What's the best thing about Switzerland?",
      answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "How do you make holy water?",
      answer: "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "What do you call someone with no body and no nose?",
      answer: "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "Why do you never see elephants hiding in trees?",
      answer: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "Why did the invisible man turn down the job offer?",
      answer: "He couldn't see himself doing it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    },
    {
      question: "What's red and bad for your teeth?",
      answer: "A brick. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
    }
  ];
</script>

<div class="bg-theme-bg-base">
  <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
    <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
    <p class="mt-6 max-w-2xl text-base/7 text-gray-600">{@html description}</p> {/* Themeable text-theme-text-muted */}
    <div class="mt-20">
      <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
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
