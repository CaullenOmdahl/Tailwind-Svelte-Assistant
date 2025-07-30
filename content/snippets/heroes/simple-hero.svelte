<!-- Last updated: 2025-07-30T11:02:12.777Z -->
<script lang="ts">
  export let title: string = "Welcome to Our Awesome Website";
  export let subtitle: string = "Discover amazing things and join our community. We provide the best services for your needs.";
  export let ctaText: string = "Get Started";
  export let ctaLink: string = "#";
  export let secondaryCtaText: string = "Learn More";
  export let secondaryCtaLink: string = "#";
</script>

<section class="bg-gray-900 text-white">
  <div class="container mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl font-bold mb-6 md:text-5xl lg:text-6xl">
      {title}
    </h1>
    <p class="text-lg mb-10 md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
      {subtitle}
    </p>
    <div class="flex justify-center space-x-4">
      <a
        href={ctaLink}
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        {ctaText}
      </a>
      {#if secondaryCtaText}
      <a
        href={secondaryCtaLink}
        class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out"
      >
        {secondaryCtaText}
      </a>
      {/if}
    </div>
  </div>
</section>

<style lang="postcss">
  /* Hero section specific styles if needed */
</style>
