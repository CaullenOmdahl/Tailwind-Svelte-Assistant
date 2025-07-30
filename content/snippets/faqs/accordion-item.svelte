<!-- Last updated: 2025-07-30T11:02:12.772Z -->
<script lang="ts">
  export let question: string;
  export let answer: string;

  let isOpen = false;

  function toggleOpen() {
    isOpen = !isOpen;
  }
</script>

<div class="border-b border-gray-200 py-4">
  <button
    on:click={toggleOpen}
    class="w-full flex justify-between items-center text-left text-gray-700 hover:text-gray-900 focus:outline-none"
  >
    <span class="font-medium">{question}</span>
    <span class="ml-6 h-7 flex items-center">
      <svg
        class="h-6 w-6 transform transition-transform duration-200 ease-in-out"
        class:rotate-180={isOpen}
        class:-rotate-0={!isOpen}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </button>

  <div
    class="mt-2 pr-12 transition-max-height duration-700 ease-in-out overflow-hidden"
    style:max-height={isOpen ? '1000px' : '0px'} 
    aria-hidden={!isOpen}
  >
    <p class="text-gray-500">{answer}</p>
  </div>
</div>

<style lang="postcss">
  .transition-max-height {
    transition-property: max-height;
  }
</style>
