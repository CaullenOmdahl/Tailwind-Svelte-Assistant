<!--
@description: A testimonial section with alternating quotes, author details, and a background image. Based on Tailwind UI.
@props:
  testimonials: Array<{ quote: string, authorName: string, authorTitle: string, authorImageUrl: string }> - Array of testimonial objects.
  backgroundImageUrl: string - URL for the background image (used in the complex decorative element).
  decorativeGradient: boolean - Whether to show the decorative background gradient.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-500)
  --theme-border-color (ring-indigo-50, shadow-indigo-600/10)
-->
<script lang="ts">
  export let testimonials = [
    {
      quote: "Commodo amet fugiat excepteur sunt qui ea elit cupidatat ullamco consectetur ipsum elit consequat. Elit sunt proident ea nulla ad nulla dolore ad pariatur tempor non. Sint veniam minim et ea.",
      authorName: "Judith Black",
      authorTitle: "CEO of Workcation",
      authorImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80",
    },
    // Add more testimonials here as needed for the alternating layout
    {
      quote: "Another great quote about how amazing this product is. It really changed my workflow for the better!",
      authorName: "John Doe",
      authorTitle: "Developer at SomeCompany",
      authorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
  ];
  // The original HTML implies a specific structure for alternating, which might need more complex logic if the number of testimonials is dynamic.
  // For simplicity, this Svelte component will just iterate. The alternating visual effect is achieved by CSS in the original.
  // The example shows one main quote and then implies others could follow. This component will render all provided.

  export let backgroundImageUrl: string = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=576&h=576&q=80"; // Placeholder, used in the complex SVG quote mark
  export let decorativeGradient: boolean = true;
</script>

<section class="relative isolate overflow-hidden bg-theme-bg-base px-6 py-24 sm:py-32 lg:px-8">
  {#if decorativeGradient}
  <div class="absolute top-0 left-1/2 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,var(--color-indigo-100),white)] opacity-20"></div> {/* Themeable */}
  <div class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center"></div> {/* Themeable */}
  {/if}

  <div class="relative mx-auto max-w-2xl lg:max-w-4xl">
    {#each testimonials as testimonial, i}
      <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10 {i > 0 ? 'mt-12 sm:mt-16 lg:mt-20' : ''}">
        {#if i % 2 === 0} <!-- Image on left for even, right for odd (or vice-versa) -->
          <div class="col-end-1 w-16 lg:row-span-4 lg:w-72">
            <img class="rounded-xl bg-indigo-50 lg:rounded-3xl" src={testimonial.authorImageUrl} alt="{testimonial.authorName} avatar"> {/* Themeable bg */}
          </div>
          <div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
            <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" class="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"> {/* Themeable stroke */}
              <path id="quote-svg-path-{i}" d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
              <use href="#quote-svg-path-{i}" x="86" />
            </svg>
            <blockquote class="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"> {/* Themeable */}
              <p>{testimonial.quote}</p>
            </blockquote>
          </div>
          <figcaption class="text-base lg:col-start-1 lg:row-start-3">
            <div class="font-semibold text-gray-900">{testimonial.authorName}</div> {/* Themeable */}
            <div class="mt-1 text-gray-500">{testimonial.authorTitle}</div> {/* Themeable */}
          </figcaption>
        {:else}
          <div class="relative col-span-2 lg:col-start-2 lg:row-start-2">
             <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" class="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"> {/* Themeable stroke */}
              <path id="quote-svg-path-{i}" d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
              <use href="#quote-svg-path-{i}" x="86" />
            </svg>
            <blockquote class="text-xl/8 font-semibold text-gray-900 sm:text-2xl/9"> {/* Themeable */}
              <p>{testimonial.quote}</p>
            </blockquote>
          </div>
          <figcaption class="text-base lg:col-start-2 lg:row-start-3">
            <div class="font-semibold text-gray-900">{testimonial.authorName}</div> {/* Themeable */}
            <div class="mt-1 text-gray-500">{testimonial.authorTitle}</div> {/* Themeable */}
          </figcaption>
          <div class="col-start-1 col-end-2 row-start-1 w-16 lg:row-span-4 lg:w-72 lg:col-start-2 lg:row-start-1">
             <img class="rounded-xl bg-indigo-50 lg:rounded-3xl" src={testimonial.authorImageUrl} alt="{testimonial.authorName} avatar"> {/* Themeable bg */}
          </div>
        {/if}
      </figure>
    {/each}
  </div>
</section>
