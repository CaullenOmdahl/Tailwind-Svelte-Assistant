<!-- Last updated: 2025-12-01T02:47:34.644Z -->
<!--
@description: A three-column, two-row bento grid layout for showcasing multiple features or content blocks. Based on Tailwind UI.
@props:
  mainTitle: string - The main title above the grid.
  subTitle: string - The subtitle or introductory text.
  accentText: string - Small accent text above the main title (e.g., "Deploy faster").
  items: Array<{ title: string, description: string, imageUrl?: string, imageAlt?: string, isLargeRow?: boolean, isLargeCol?: boolean, contentSpecificClasses?: string, imageContainerClasses?: string, textContainerClasses?: string, codeContent?: string, codeLang?: string }> - Data for grid items.
    - isLargeRow: Spans two rows.
    - isLargeCol: (Future use, for more complex bento) Spans two columns.
    - contentSpecificClasses: For unique styling of an item if needed.
    - imageContainerClasses: Classes for the div wrapping an image.
    - textContainerClasses: Classes for the div wrapping text.
    - codeContent: If the item is a code block.
    - codeLang: Language for code block styling.
@theme_vars:
  --theme-bg-base (bg-gray-50)
  --theme-bg-alt (bg-white)
  --theme-text-base (text-gray-950)
  --theme-text-muted (text-gray-600)
  --theme-primary (text-indigo-600)
  --theme-border-color (ring-black/5)
  --theme-border-radius-lg (rounded-lg)
  --radius-lg (CSS var for rounded-lg, used in calc)
  --radius-2xl (CSS var for rounded-2xl, used in calc, e.g. rounded-l-[2rem])
-->
<script lang="ts">
  export let mainTitle: string = "Everything you need to deploy your app";
  export let subTitle: string = "Deploy faster"; // This was accentText in original, renamed for clarity
  export let accentText: string = "Deploy faster"; // Kept for consistency if needed, but subTitle is more descriptive for its placement

  // Default items structured for the 3-col, 2-row layout
  export let items: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
    isLargeRow?: boolean; // Spans two rows (item 0 and 3 in the 3-col example)
    contentSpecificClasses?: string; // e.g. for unique padding or alignment
    imageContainerClasses?: string; // For styling the div around the image
    textContainerClasses?: string; // For styling the div around text
    codeContent?: string; // For items that are code blocks
    codeLang?: string; // e.g. 'jsx'
  }> = [
    { // Item 1: Spans 2 rows, typically image-heavy
      title: "Mobile friendly",
      description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png",
      imageAlt: "Mobile friendly design example",
      isLargeRow: true,
      imageContainerClasses: "relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm",
      textContainerClasses: "px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0",
    },
    { // Item 2: Small, top-right
      title: "Performance",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png",
      imageAlt: "Performance illustration",
      imageContainerClasses: "flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2",
      textContainerClasses: "px-8 pt-8 sm:px-10 sm:pt-10",
    },
    { // Item 3: Small, bottom-center (col 2, row 2)
      title: "Security",
      description: "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.",
      imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png",
      imageAlt: "Security illustration",
      imageContainerClasses: "@container flex flex-1 items-center max-lg:py-6 lg:pb-2",
      textContainerClasses: "px-8 pt-8 sm:px-10 sm:pt-10",
    },
    { // Item 4: Spans 2 rows, right column, often code or image-heavy
      title: "Powerful APIs",
      description: "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.",
      isLargeRow: true,
      codeContent: "// Your code example\nconst api = new API();\napi.connect();", // Example code
      codeLang: "jsx", // Example lang
      // imageUrl: "https://tailwindcss.com/plus-assets/img/component-images/bento-03-code.png", // Alternative if image
      // imageAlt: "API code example",
      imageContainerClasses: "relative min-h-[30rem] w-full grow", // If using image
      textContainerClasses: "px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0",
    },
  ];

  // CSS variables for rounded corners, assuming they are defined globally or via Tailwind config
  // For example, in a global CSS: :root { --radius-lg: 0.5rem; --radius-2xl: 1rem; }
  // Or use Tailwind's direct values like rounded-lg, rounded-2xl if not using calc() with CSS vars.
  // The Tailwind UI example uses calc(var(--radius-lg)+1px) etc. which implies CSS vars are set up.
  // For simplicity here, we'll use direct Tailwind classes where possible or note the dependency.
</script>

<div class="bg-gray-50 py-24 sm:py-32"> {/* Themeable: bg-theme-bg-base (or a light variant) */}
  <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    <h2 class="text-center text-base/7 font-semibold text-indigo-600">{subTitle}</h2> {/* Themeable: text-theme-primary */}
    <p class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">{mainTitle}</p> {/* Themeable: text-theme-text-base */}
    
    <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
      <!-- Item 1 (Large Row, Col 1) -->
      {#if items[0]}
        {@const item = items[0]}
        <div class="relative lg:row-span-2">
          <div class="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div> {/* Themeable: bg-theme-bg-alt, rounded-theme-lg, lg:rounded-l-theme-2xl */}
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(var(--radius-2xl)+1px)]"> {/* Note: calc with CSS var for radius */}
            <div class="{item.textContainerClasses || 'px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'}">
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">{item.title}</p> {/* Themeable */}
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">{item.description}</p> {/* Themeable */}
            </div>
            {#if item.imageUrl}
              <div class="{item.imageContainerClasses || 'relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm'}">
                <div class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl"> {/* Complex styling, partially themeable */}
                  <img class="size-full object-cover object-top" src={item.imageUrl} alt={item.imageAlt || item.title} />
                </div>
              </div>
            {/if}
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-[2rem]"></div> {/* Themeable: ring-theme-border/20, rounded-theme-lg, lg:rounded-l-theme-2xl */}
        </div>
      {/if}

      <!-- Item 2 (Small, Col 2, Row 1) -->
      {#if items[1]}
        {@const item = items[1]}
        <div class="relative max-lg:row-start-1">
          <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div> {/* Themeable */}
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(var(--radius-2xl)+1px)]">
            <div class="{item.textContainerClasses || 'px-8 pt-8 sm:px-10 sm:pt-10'}">
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">{item.title}</p> {/* Themeable */}
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">{item.description}</p> {/* Themeable */}
            </div>
            {#if item.imageUrl}
              <div class="{item.imageContainerClasses || 'flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2'}">
                <img class="w-full max-lg:max-w-xs" src={item.imageUrl} alt={item.imageAlt || item.title} />
              </div>
            {/if}
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div> {/* Themeable */}
        </div>
      {/if}
      
      <!-- Item 3 (Small, Col 2, Row 2) -->
      {#if items[2]}
        {@const item = items[2]}
        <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div class="absolute inset-px rounded-lg bg-white"></div> {/* Themeable */}
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
            <div class="{item.textContainerClasses || 'px-8 pt-8 sm:px-10 sm:pt-10'}">
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">{item.title}</p> {/* Themeable */}
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">{item.description}</p> {/* Themeable */}
            </div>
            {#if item.imageUrl}
              <div class="{item.imageContainerClasses || '@container flex flex-1 items-center max-lg:py-6 lg:pb-2'}">
                 {/* Note: original uses h-[min(152px,40cqw)] which requires container queries setup */}
                <img class="h-auto w-full max-h-[152px] object-contain @lg:object-cover" src={item.imageUrl} alt={item.imageAlt || item.title} />
              </div>
            {/if}
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div> {/* Themeable */}
        </div>
      {/if}

      <!-- Item 4 (Large Row, Col 3) -->
      {#if items[3]}
        {@const item = items[3]}
        <div class="relative lg:row-span-2">
          <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div> {/* Themeable */}
          <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(var(--radius-2xl)+1px)] lg:rounded-r-[calc(var(--radius-2xl)+1px)]">
            <div class="{item.textContainerClasses || 'px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0'}">
              <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">{item.title}</p> {/* Themeable */}
              <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">{item.description}</p> {/* Themeable */}
            </div>
            {#if item.codeContent}
              <div class="relative min-h-[30rem] w-full grow">
                <div class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl"> {/* Themeable dark bg */}
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5"> {/* Themeable dark alt bg, ring */}
                    <div class="-mb-px flex text-sm/6 font-medium text-gray-400"> {/* Themeable text muted on dark */}
                      <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">main.{item.codeLang || 'js'}</div> {/* Themeable */}
                      {#if item.codeLang === 'jsx'}
                         <div class="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                      {/if}
                    </div>
                  </div>
                  <div class="px-6 pt-6 pb-14">
                    <pre class="text-sm text-white overflow-x-auto"><code>{item.codeContent}</code></pre> {/* Themeable text on dark */}
                  </div>
                </div>
              </div>
            {:else if item.imageUrl}
              <div class="{item.imageContainerClasses || 'relative min-h-[30rem] w-full grow'}">
                 {/* Similar to item 1's image container if used */}
                 <img class="size-full object-cover" src={item.imageUrl} alt={item.imageAlt || item.title} />
              </div>
            {/if}
          </div>
          <div class="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div> {/* Themeable */}
        </div>
      {/if}
    </div>
  </div>
</div>
