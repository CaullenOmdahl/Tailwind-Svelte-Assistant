<!-- Last updated: 2025-07-30T11:02:12.779Z -->
<!--
@description: A newsletter signup section with centered text, and the email input field and submit button on a new line below. Based on Tailwind UI.
@props:
  title: string - The main title for the newsletter section.
  description: string - A short description encouraging sign-ups.
  emailInputLabel: string - Label for the email input (sr-only).
  emailInputPlaceholder: string - Placeholder text for the email input.
  submitButtonText: string - Text for the submit button.
  finePrint: string - Small text below the form (e.g., privacy notice).
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary (bg-indigo-600 for button)
  --theme-primary-hover (hover:bg-indigo-500 for button)
  --theme-input-border (ring-gray-300)
  --theme-input-focus-ring (focus:ring-indigo-600)
  --theme-border-radius-md (rounded-md)
-->
<script lang="ts">
  export let title: string = "Want product news and updates?";
  export let description: string = "Sign up for our newsletter to stay up to date.";
  export let emailInputLabel: string = "Email address";
  export let emailInputPlaceholder: string = "Enter your email";
  export let submitButtonText: string = "Subscribe";
  export let finePrint: string = "We care about your data. Read our <a href='#' class='font-semibold text-indigo-600 hover:text-indigo-500'>privacy&nbsp;policy</a>."; // Themeable link

  let emailValue: string = "";

  function handleSubmit() {
    // Handle form submission
    console.log("Email submitted:", emailValue);
  }
</script>

<div class="bg-theme-bg-base py-16 sm:py-24">
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="relative isolate overflow-hidden bg-gray-50 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"> {/* Themeable bg-theme-bg-alt, shadow */}
      <h2 class="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable */}
      <p class="mx-auto mt-2 max-w-xl text-center text-lg/8 text-gray-600">{description}</p> {/* Themeable */}
      <form on:submit|preventDefault={handleSubmit} class="mx-auto mt-10 flex max-w-md flex-col gap-y-4 sm:flex-row sm:gap-x-3 sm:gap-y-0">
        <label for="email-address-centered" class="sr-only">{emailInputLabel}</label>
        <input 
          id="email-address-centered" 
          name="email" 
          type="email" 
          autocomplete="email" 
          required 
          bind:value={emailValue}
          class="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm/6" 
          placeholder={emailInputPlaceholder}
        /> {/* Themeable input */}
        <button 
          type="submit" 
          class="inline-flex flex-none items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >{submitButtonText}</button> {/* Themeable button */}
      </form>
      {#if finePrint}
      <p class="mx-auto mt-4 max-w-xl text-center text-sm/6 text-gray-600">{@html finePrint}</p> {/* Themeable */}
      {/if}
      <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
        <circle cx="512" cy="512" r="512" fill="url(#gradient-newsletter-centered)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="gradient-newsletter-centered">
            <stop stop-color="#7775D6" /> {/* Themeable gradient stop (indigo-ish) */}
            <stop offset="1" stop-color="#E935C1" /> {/* Themeable gradient stop (pink-ish) */}
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</div>
