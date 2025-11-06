<!-- Last updated: 2025-11-06T05:40:53.467Z -->
<script lang="ts">
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-white text-xl font-bold">Logo</a>

    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button on:click={toggleMobileMenu} class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>
    </div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex space-x-4">
      <a href="/about" class="text-gray-300 hover:text-white">About</a>
      <a href="/services" class="text-gray-300 hover:text-white">Services</a>
      <a href="/contact" class="text-gray-300 hover:text-white">Contact</a>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class:hidden={!mobileMenuOpen} class="md:hidden mt-2">
    <a href="/about" class="block px-2 py-1 text-gray-300 hover:text-white">About</a>
    <a href="/services" class="block px-2 py-1 text-gray-300 hover:text-white">Services</a>
    <a href="/contact" class="block px-2 py-1 text-gray-300 hover:text-white">Contact</a>
  </div>
</nav>

<style lang="postcss">
  /* Additional component-specific styles can go here if needed, */
  /* but Tailwind utility classes should cover most cases. */
</style>
