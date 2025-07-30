<!-- Last updated: 2025-07-30T11:02:12.769Z -->
<!--
@description: A simple contact form with a background pattern. Includes fields for name, email, phone, and message. Based on Tailwind UI.
@props:
  title: string - Main title for the contact section.
  description: string - Introductory paragraph.
  formFields: Array<{ id: string, name: string, label: string, type: string, autocomplete?: string, isTextarea?: boolean, rows?: number, colSpan?: number }> - Configuration for form fields.
  agreementText: string - Text for the privacy policy agreement, can include HTML for links.
  submitButtonText: string - Text for the submit button.
  showDecorativePattern: boolean - Whether to show the background SVG pattern.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary (text-indigo-600, bg-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-input-border (ring-gray-300)
  --theme-input-focus-ring (focus:ring-indigo-600)
  --theme-border-radius-md (rounded-md)
  --theme-switch-bg-enabled (bg-indigo-600)
  --theme-switch-bg-disabled (bg-gray-200)
  --theme-switch-thumb-bg (bg-white)
  --theme-pattern-fill (fill-gray-50 for SVG pattern)
-->
<script lang="ts">
  export let title: string = "Contact sales";
  export let description: string = "Aute magna irure deserunt veniam aliqua magna enim voluptate.";
  
  export let formFields = [
    { id: "first-name", name: "first-name", label: "First name", type: "text", autocomplete: "given-name" },
    { id: "last-name", name: "last-name", label: "Last name", type: "text", autocomplete: "family-name" },
    { id: "company", name: "company", label: "Company", type: "text", autocomplete: "organization", colSpan: 2 },
    { id: "email", name: "email", label: "Email", type: "email", autocomplete: "email", colSpan: 2 },
    { 
      id: "phone-number", 
      name: "phone-number", 
      label: "Phone number", 
      type: "tel", 
      autocomplete: "tel", 
      colSpan: 2,
      countrySelect: [ // Optional: for phone input with country code
        { value: 'US', label: 'US' },
        { value: 'CA', label: 'CA' },
        { value: 'EU', label: 'EU' },
      ]
    },
    { id: "message", name: "message", label: "Message", type: "text", isTextarea: true, rows: 4, colSpan: 2 },
  ];

  export let agreementText: string = "By selecting this, you agree to our <a href='#' class='font-semibold text-indigo-600'>privacy&nbsp;policy</a>."; // Themeable link
  export let submitButtonText: string = "Let's talk";
  export let showDecorativePattern: boolean = true;

  let formData: { [key: string]: string } = {};
  formFields.forEach(field => formData[field.id] = "");
  let agreeToPolicies: boolean = false;
  let selectedCountry: string = formFields.find(f => f.countrySelect)?.countrySelect?.[0]?.value || 'US';


  function handleSubmit() {
    console.log("Form submitted:", { ...formData, agreeToPolicies, selectedCountry });
  }
</script>

<div class="isolate bg-theme-bg-base px-6 py-24 sm:py-32 lg:px-8">
  {#if showDecorativePattern}
  <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
    <div class="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
  {/if}
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
    <p class="mt-2 text-lg/8 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
  </div>
  <form on:submit|preventDefault={handleSubmit} class="mx-auto mt-16 max-w-xl sm:mt-20">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      {#each formFields as field}
        <div class="{field.colSpan === 2 ? 'sm:col-span-2' : ''}">
          <label for={field.id} class="block text-sm/6 font-semibold text-gray-900">{field.label}</label> {/* Themeable text-theme-text-base */}
          <div class="mt-2.5">
            {#if field.isTextarea}
              <textarea name={field.name} id={field.id} rows={field.rows || 4} bind:value={formData[field.id]} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea> {/* Themeable input styles */}
            {:else if field.countrySelect}
              <div class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"> {/* Themeable input styles */}
                <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select id="{field.id}-country" name="{field.name}-country" autocomplete="country" aria-label="Country" bind:value={selectedCountry} class="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"> {/* Themeable select styles */}
                    {#each field.countrySelect as countryOpt}
                      <option value={countryOpt.value}>{countryOpt.label}</option>
                    {/each}
                  </select>
                  <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"> {/* Themeable icon */}
                    <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input type={field.type} name={field.name} id={field.id} autocomplete={field.autocomplete || ''} bind:value={formData[field.id]} class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"> {/* Themeable input styles */}
              </div>
            {:else}
              <input type={field.type} name={field.name} id={field.id} autocomplete={field.autocomplete || ''} bind:value={formData[field.id]} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"> {/* Themeable input styles */}
            {/if}
          </div>
        </div>
      {/each}
      <div class="flex gap-x-4 sm:col-span-2">
        <div class="flex h-6 items-center">
          <button 
            type="button" 
            class="flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 {agreeToPolicies ? 'bg-indigo-600' : 'bg-gray-200'}" 
            role="switch" 
            aria-checked={agreeToPolicies} 
            on:click={() => agreeToPolicies = !agreeToPolicies}
            aria-labelledby="switch-policy-label"
          > {/* Themeable switch bg */}
            <span class="sr-only">Agree to policies</span>
            <span aria-hidden="true" class="size-4 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out {agreeToPolicies ? 'translate-x-3.5' : 'translate-x-0'}"></span> {/* Themeable switch thumb */}
          </button>
        </div>
        <label class="text-sm/6 text-gray-600" id="switch-policy-label">{@html agreementText}</label> {/* Themeable text-theme-text-muted */}
      </div>
    </div>
    <div class="mt-10">
      <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{submitButtonText}</button> {/* Themeable button */}
    </div>
  </form>
</div>
