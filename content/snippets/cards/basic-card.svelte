<script lang="ts">
  export let imageUrl: string = "https://via.placeholder.com/400x200"; // Default placeholder
  export let title: string = "Card Title";
  export let description: string = "This is a brief description of the card content. It can span multiple lines if needed.";
  export let linkUrl: string = "#";
  export let linkText: string = "Learn More";
</script>

<div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
  <a href={linkUrl} aria-label={title}>
    <img class="rounded-t-lg w-full h-48 object-cover" src={imageUrl} alt={title} />
  </a>
  <div class="p-5">
    <a href={linkUrl}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700">{description}</p>
    <a
      href={linkUrl}
      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
