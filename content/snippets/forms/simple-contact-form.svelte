<!-- Last updated: 2025-07-30T11:02:12.775Z -->
<script lang="ts">
  let name = '';
  let email = '';
  let message = '';
  let submitting = false;
  let submissionStatus = ''; // 'success' or 'error'

  async function handleSubmit() {
    submitting = true;
    submissionStatus = '';
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Replace with actual form submission logic
    if (name && email && message) {
      console.log('Form submitted:', { name, email, message });
      submissionStatus = 'success';
      // Reset form
      name = '';
      email = '';
      message = '';
    } else {
      submissionStatus = 'error';
    }
    submitting = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6 p-6 bg-white shadow-md rounded-lg">
  <h2 class="text-2xl font-semibold text-gray-800">Contact Us</h2>

  <div>
    <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
    <input
      type="text"
      id="name"
      bind:value={name}
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="John Doe"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      id="message"
      rows="4"
      bind:value={message}
      required
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Your message..."
    ></textarea>
  </div>

  <div>
    <button
      type="submit"
      disabled={submitting}
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {#if submitting}
        Sending...
      {:else}
        Send Message
      {/if}
    </button>
  </div>

  {#if submissionStatus === 'success'}
    <p class="text-sm text-green-600">Message sent successfully!</p>
  {:else if submissionStatus === 'error'}
    <p class="text-sm text-red-600">Failed to send message. Please fill all fields and try again.</p>
  {/if}
</form>

<style lang="postcss">
  /* Add any additional styles if Tailwind utilities are not sufficient */
</style>
