<!-- Last updated: 2025-07-30T11:02:12.783Z -->
<!--
@description: A timeline section with alternating cards for historical events. Based on Tailwind UI.
@props:
  title: string - The main title for the timeline section (e.g., "Our history").
  events: Array<{ date: string, title: string, description: string }> - Array of event objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600)
  --theme-primary-accent (text-indigo-600)
  --theme-border-color (bg-gray-900/10 for the timeline line)
  --theme-icon-fill (fill-indigo-600 for the dot)
-->
<script lang="ts">
  export let title: string = "Our history";
  export let events: Array<{ date: string, title: string, description: string }> = [
    {
      date: "Aug 2021",
      title: "Founded company",
      description: "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae."
    },
    {
      date: "Dec 2021",
      title: "Secured $65m in funding",
      description: "Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil."
    },
    {
      date: "Feb 2022",
      title: "Released beta",
      description: "Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et."
    },
    {
      date: "Dec 2022",
      title: "Global launch of product",
      description: "Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit."
    }
  ];
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
      {#each events as event}
        <div>
          <time datetime={event.date.replace(' ', '-')} class="flex items-center text-sm/6 font-semibold text-indigo-600"> {/* Themeable text-theme-primary-accent */}
            <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
              <circle cx="2" cy="2" r="2" fill="currentColor" /> {/* Themeable fill-theme-icon-fill */}
            </svg>
            {event.date}
            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div> {/* Themeable bg-theme-border-color */}
          </time>
          <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">{event.title}</p> {/* Themeable text-theme-text-base */}
          <p class="mt-1 text-base/7 text-gray-600">{event.description}</p> {/* Themeable text-theme-text-muted */}
        </div>
      {/each}
    </div>
  </div>
</div>
