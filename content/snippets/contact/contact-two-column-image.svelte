<!-- Last updated: 2025-11-06T05:40:53.463Z -->
<!--
@description: A contact section with a form on one side and contact details with an image on the other. Based on Tailwind UI.
@props:
  title: string - Main title for the contact section.
  description: string - Introductory paragraph.
  imageUrl: string - URL for the image displayed next to contact details.
  imageAlt: string - Alt text for the image.
  contactDetails: Array<{ iconPath: string, label: string, value: string, href?: string }> - Contact details like address, phone, email.
  formFields: Array<{ id: string, name: string, label: string, type: string, autocomplete?: string, isTextarea?: boolean, rows?: number }> - Configuration for form fields.
  privacyPolicyLink: string - URL for the privacy policy.
  submitButtonText: string - Text for the submit button.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-100 for image background pattern)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary (text-indigo-600, bg-indigo-600)
  --theme-primary-hover (hover:bg-indigo-500)
  --theme-input-border (ring-gray-300)
  --theme-input-focus-ring (focus:ring-indigo-600)
  --theme-border-radius-md (rounded-md)
  --theme-icon-color (text-gray-400)
-->
<script lang="ts">
  export let title: string = "Get in touch";
  export let description: string = "Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.";
  export let imageUrl: string = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80";
  export let imageAlt: string = "Contact image";

  export let contactDetails = [
    { iconPath: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z", label: "Address", value: "545 Mavis Island\nChicago, IL 99191" },
    { iconPath: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z", label: "Telephone", value: "+1 (555) 234-5678", href: "tel:+15552345678" },
    { iconPath: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75", label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  ];

  export let formFields = [
    { id: "first-name", name: "first-name", label: "First name", type: "text", autocomplete: "given-name" },
    { id: "last-name", name: "last-name", label: "Last name", type: "text", autocomplete: "family-name" },
    { id: "email", name: "email", label: "Email", type: "email", autocomplete: "email", isTextarea: false, colSpan: 2 },
    { id: "phone-number", name: "phone-number", label: "Phone number", type: "tel", autocomplete: "tel", isTextarea: false, colSpan: 2 },
    { id: "message", name: "message", label: "Message", type: "text", isTextarea: true, rows: 4, colSpan: 2 },
  ];
  export let privacyPolicyLink: string = "#";
  export let submitButtonText: string = "Send message";

  let formData: { [key: string]: string } = {};
  formFields.forEach(field => formData[field.id] = "");

  function handleSubmit() {
    console.log("Form submitted:", formData);
  }
</script>

<div class="relative isolate bg-theme-bg-base">
  <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
    <div class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2"> {/* Themeable bg-theme-bg-alt, ring-theme-border-color */}
          <svg class="absolute inset-0 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200" aria-hidden="true"> {/* Themeable stroke */}
            <defs>
              <pattern id="contact-pattern" width="200" height="200" x="100%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" stroke-width="0" fill="white" /> {/* Themeable fill */}
            <svg x="100%" y="-1" class="overflow-visible fill-gray-50"> {/* Themeable fill */}
              <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#contact-pattern)" />
          </svg>
        </div>
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
        <p class="mt-6 text-lg/8 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
        <dl class="mt-10 space-y-4 text-base/7 text-gray-600"> {/* Themeable text-theme-text-muted */}
          {#each contactDetails as detail}
            <div class="flex gap-x-4">
              <dt class="flex-none">
                <span class="sr-only">{detail.label}</span>
                <svg class="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> {/* Themeable text-theme-icon-color */}
                  <path stroke-linecap="round" stroke-linejoin="round" d={detail.iconPath} />
                </svg>
              </dt>
              {#if detail.href}
                <dd><a class="hover:text-gray-900" href={detail.href}>{@html detail.value.replace(/\n/g, '<br/>')}</a></dd> {/* Themeable hover:text-theme-text-base */}
              {:else}
                <dd>{@html detail.value.replace(/\n/g, '<br/>')}</dd>
              {/if}
            </div>
          {/each}
        </dl>
      </div>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {#each formFields as field}
            <div class="{field.colSpan === 2 ? 'sm:col-span-2' : ''}">
              <label for={field.id} class="block text-sm/6 font-semibold text-gray-900">{field.label}</label> {/* Themeable text-theme-text-base */}
              <div class="mt-2.5">
                {#if field.isTextarea}
                  <textarea name={field.name} id={field.id} rows={field.rows || 4} bind:value={formData[field.id]} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea> {/* Themeable input styles */}
                {:else}
                  <input type={field.type} name={field.name} id={field.id} autocomplete={field.autocomplete || ''} bind:value={formData[field.id]} class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"> {/* Themeable input styles */}
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="mt-8 flex justify-end">
          <button type="submit" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{submitButtonText}</button> {/* Themeable button */}
        </div>
      </div>
    </form>
  </div>
</div>
