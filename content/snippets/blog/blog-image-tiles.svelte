<!-- Last updated: 2025-11-06T05:40:53.461Z -->
<!--
@description: A blog section displaying posts as image tiles. Each post has an image, category, title, and author details. Based on Tailwind UI.
@props:
  title: string - The main title for the blog section.
  description: string - A short description for the blog section.
  posts: Array<{ 
    id: string | number,
    title: string, 
    href: string, 
    imageUrl: string, 
    imageAlt: string,
    date: string, 
    datetime: string, 
    category: { title: string, href: string }, 
    author: { name: string, role: string, href: string, imageUrl: string } 
  }> - Array of post objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50 for category badge)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600, text-gray-500)
  --theme-primary-accent (text-indigo-600 for category badge hover)
  --theme-border-radius-2xl (rounded-2xl for image container)
  --theme-border-radius-full (rounded-full for category badge & author image)
  --theme-ring-color (ring-gray-900/10 for image container)
  --theme-gradient-from (from-gray-900 for image overlay)
  --theme-gradient-via (via-gray-900/40 for image overlay)
-->
<script lang="ts">
  export let title: string = "From the blog";
  export let description: string = "Learn how to grow your business with our expert advice.";
  
  export let posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      imageAlt: 'Desk with various items',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 2,
      title: 'How to use search engine optimization to drive sales',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      imageAlt: 'Laptop on a desk',
      date: 'Mar 10, 2020',
      datetime: '2020-03-10',
      category: { title: 'Sales', href: '#' },
      author: {
        name: 'Lindsay Walton',
        role: 'Front-end Developer',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
     {
      id: 3,
      title: 'Improve your customer experience',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
      imageAlt: 'People collaborating around a table',
      date: 'Feb 12, 2020',
      datetime: '2020-02-12',
      category: { title: 'Business', href: '#' },
      author: {
        name: 'Tom Cook',
        role: 'Director of Product',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
  ];
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">{title}</h2> {/* Themeable text-theme-text-base */}
      <p class="mt-2 text-lg/8 text-gray-600">{description}</p> {/* Themeable text-theme-text-muted */}
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {#each posts as post}
        <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"> {/* Themeable bg-theme-bg-alt (darker for contrast), rounded-theme-border-radius-2xl */}
          <img src={post.imageUrl} alt={post.imageAlt || ''} class="absolute inset-0 -z-10 size-full object-cover">
          <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div> {/* Themeable from-theme-gradient-from, via-theme-gradient-via */}
          <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div> {/* Themeable ring-theme-ring-color */}

          <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300"> {/* Themeable text-theme-text-muted (on dark) */}
            <time datetime={post.datetime} class="mr-8">{post.date}</time>
            <div class="-ml-4 flex items-center gap-x-4">
              <svg viewBox="0 0 2 2" class="-ml-0.5 size-0.5 flex-none fill-white/50"> {/* Themeable fill */}
                <circle cx="1" cy="1" r="1" />
              </svg>
              <div class="flex gap-x-2.5">
                <img src={post.author.imageUrl} alt="{post.author.name} avatar" class="size-6 flex-none rounded-full bg-white/10"> {/* Themeable bg, rounded-theme-border-radius-full */}
                {post.author.name}
              </div>
            </div>
          </div>
          <h3 class="mt-3 text-lg/6 font-semibold text-white"> {/* Themeable text-theme-text-base (on dark) */}
            <a href={post.href}>
              <span class="absolute inset-0"></span>
              {post.title}
            </a>
          </h3>
        </article>
      {/each}
    </div>
  </div>
</div>
