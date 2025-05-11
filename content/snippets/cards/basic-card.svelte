<!--
@description: A basic card component with an image, title, description, and a call-to-action link. Designed to be themeable.
@props:
  - imageUrl: string - URL for the card image.
  - title: string - The title of the card.
  - description: string - A brief description for the card.
  - linkUrl: string - The URL the card's link/button should point to.
  - linkText: string - The text for the call-to-action link/button.
  - customClasses: string (optional) - Custom Tailwind classes for the root div.
  - imageClasses: string (optional) - Custom Tailwind classes for the image.
  - contentClasses: string (optional) - Custom Tailwind classes for the content padding div.
  - titleClasses: string (optional) - Custom Tailwind classes for the title.
  - descriptionClasses: string (optional) - Custom Tailwind classes for the description.
  - buttonClasses: string (optional) - Custom Tailwind classes for the button.
@theme_vars:
  - --theme-bg-base (via bg-theme-bg-base)
  - --theme-border-color (via border-theme-border)
  - --theme-border-radius-lg (via rounded-theme-lg)
  - --theme-text-base (via text-theme-text-base)
  - --theme-text-muted (via text-theme-text-muted)
  - --theme-color-primary (via bg-theme-primary, focus:ring-theme-primary/50)
  - --theme-color-primary-hover (via hover:bg-theme-primary-hover)
  - --theme-text-on-primary (via text-theme-text-on-primary)
-->
<script lang="ts">
  export let imageUrl: string = "https://via.placeholder.com/400x200"; // Default placeholder
  export let title: string = "Card Title";
  export let description: string = "This is a brief description of the card content. It can span multiple lines if needed.";
  export let linkUrl: string = "#";
  export let linkText: string = "Learn More";

  // Props for deeper customization if needed, falling back to themeable defaults
  export let customClasses: string = "bg-theme-bg-base border-theme-border shadow-md";
  export let imageClasses: string = "w-full h-48 object-cover";
  export let contentClasses: string = "p-5";
  export let titleClasses: string = "mb-2 text-2xl font-bold tracking-tight text-theme-text-base";
  export let descriptionClasses: string = "mb-3 font-normal text-theme-text-muted";
  export let buttonClasses: string = 
    "inline-flex items-center py-2 px-3 text-sm font-medium text-center text-theme-text-on-primary bg-theme-primary rounded-theme-md hover:bg-theme-primary-hover focus:ring-4 focus:outline-none focus:ring-theme-primary/30 theme-transition";
</script>

<div class="max-w-sm rounded-theme-lg border overflow-hidden {customClasses}">
  <a href={linkUrl} aria-label={title}>
    <img class="rounded-t-theme-lg {imageClasses}" src={imageUrl} alt={title} />
  </a>
  <div class="{contentClasses}">
    <a href={linkUrl}>
      <h5 class="{titleClasses}">{title}</h5>
    </a>
    <p class="{descriptionClasses}">{description}</p>
    <a
      href={linkUrl}
      class="{buttonClasses}"
    >
      {linkText}
      <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </a>
  </div>
</div>

<style lang="postcss">
  /* Card specific styles if needed */
</style>
