<!-- Last updated: 2025-11-06T05:40:53.463Z -->
<!--
@description: A contact section with a form on one side and office locations with an image on the other. Based on Tailwind UI.
@props:
  title: string - Main title for the contact section.
  description: string - Introductory paragraph.
  imageUrl: string - URL for the image displayed above office locations.
  imageAlt: string - Alt text for the image.
  offices: Array<{ city: string, addressLines: string[] }> - Array of office location objects.
  formFields: Array<{ id: string, name: string, label: string, type: string, autocomplete?: string, isTextarea?: boolean, rows?: number, colSpan?: number }> - Configuration for form fields.
  agreementText: string - Text for the privacy policy agreement, can include HTML for links.
  submitButtonText: string - Text for the submit button.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50 for image background)
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
-->
<script lang="ts">
  export let title: string = "Let's work together";
  export let description: string = "Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu sed ut tincidunt magna.";
  export let imageUrl: string = "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80";
  export let imageAlt: string = "Office interior";

  export let offices = [
    { city: "Los Angeles", addressLines: ["4556 Brendan Ferry", "Los Angeles, CA 90210"] },
    { city: "New York", addressLines: ["886 Walter Street", "New York, NY 12345"] },
    { city: "Toronto", addressLines: ["7363 Cynthia Pass", "Toronto, ON N3Y 4H8"] },
    { city: "Chicago", addressLines: ["726 Mavis Island", "Chicago, IL 60601"] },
  ];

  export let formFields = [
    { id: "first-name", name: "first-name", label: "First name", type: "text", autocomplete: "given-name" },
    { id: "last-name", name: "last-name", label: "Last name", type: "text", autocomplete: "family-name" },
    { id: "email", name: "email", label: "Email", type: "email", autocomplete: "email", colSpan: 2 },
    { id: "company", name: "company", label: "Company", type: "text", autocomplete: "organization", colSpan: 2 },
    { 
      id: "phone", 
      name: "phone", 
      label: "Phone", 
      type: "tel", 
      autocomplete: "tel", 
      colSpan: 2,
      optional: true 
    },
    { 
      id: "message", 
      name: "message", 
      label: "How can we help you?", 
      type: "text", 
      isTextarea: true, 
      rows: 4, 
      colSpan: 2,
      maxLength: 500
    },
  ];
  
  export let agreementText: string = ""; // Not present in this specific Tailwind UI example, but can be added
  export let submitButtonText: string = "Send message";

  let formData: { [key: string]: string } = {};
  formFields.forEach(field => formData[field.id] = "");

  function handleSubmit() {
    console.log("Form submitted:", formData);
  }
</script>

<div class="relative bg-theme-bg-base">
  <div class="lg:absolute lg:inset-0 lg:left-1/2">
    <img class="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full" src={imageUrl} alt={imageAlt}> {/* Themeable bg-theme-bg-alt */}
  </div>
  <div class="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
    <div class="px-6 lg:px-8">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
        <p class="mt-2 text-lg/8 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
        <form on:submit|preventDefault={handleSubmit} class="mt-16">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {#each formFields as field}
              <div class="{field.colSpan === 2 ? 'sm:col-span-2' : ''}">
                <div class="flex justify-between text-sm/6">
                  <label for={field.id} class="block font-semibold text-gray-900">{field.label}</label> {/* Themeable text-theme-text-base */}
                  {#if field.optional}
                    <p id="{field.id}-description" class="text-gray-400">Optional</p> {/* Themeable text-theme-text-muted */}
                  {/if}
                  {#if field.maxLength}
                     <p id="{field.id}-description" class="text-gray-400">Max {field.maxLength} characters</p> {/* Themeable text-theme-text-muted */}
                  {/if}
                </div>
                <div class="mt-2.5">
                  {#if field.isTextarea}
                    <textarea 
                      name={field.name} 
                      id={field.id} 
                      rows={field.rows || 4} 
                      bind:value={formData[field.id]}
                      aria-describedby={field.optional || field.maxLength ? `${field.id}-description` : undefined}
                      class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    ></textarea> {/* Themeable input styles */}
                  {:else}
                    <input 
                      type={field.type} 
                      name={field.name} 
                      id={field.id} 
                      autocomplete={field.autocomplete || ''} 
                      bind:value={formData[field.id]}
                      aria-describedby={field.optional || field.maxLength ? `${field.id}-description` : undefined}
                      class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    > {/* Themeable input styles */}
                  {/if}
                </div>
              </div>
            {/each}
            
            {#if agreementText}
            <fieldset class="sm:col-span-2">
              <!-- Agreement switch can be added here if needed, similar to contact-simple-bg-pattern.svelte -->
            </fieldset>
            {/if}
          </div>
          <div class="mt-10 flex justify-end border-t border-gray-900/10 pt-8"> {/* Themeable border-theme-border-color */}
            <button type="submit" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{submitButtonText}</button> {/* Themeable button */}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
