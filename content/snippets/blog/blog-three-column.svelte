<!-- Last updated: 2025-12-01T02:47:34.646Z -->
<!--
@description: A blog section displaying posts in a three-column layout. Each post has an image, category, title, description, and author details. Based on Tailwind UI.
@props:
  title: string - The main title for the blog section.
  description: string - A short description for the blog section.
  posts: Array<{ 
    id: string | number,
    title: string, 
    href: string, 
    description: string, 
    imageUrl?: string, // Optional image
    imageAlt?: string,
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
  --theme-border-color (border-gray-200)
  --theme-border-radius-2xl (rounded-2xl for image)
  --theme-border-radius-full (rounded-full for category badge & author image)
  --theme-ring-color (ring-gray-900/10 for image)
-->
<script lang="ts">
  export let title: string = "From the blog";
  export let description: string = "Learn how to grow your business with our expert advice.";
  
  export let posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
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
      description: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
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
      description: 'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
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
    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {#each posts as post}
        <article class="flex flex-col items-start justify-between">
          {#if post.imageUrl}
          <div class="relative w-full">
            <img src={post.imageUrl} alt={post.imageAlt || ''} class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-2xl */}
            <div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div> {/* Themeable ring-theme-ring-color */}
          </div>
          {/if}
          <div class="max-w-xl {post.imageUrl ? 'mt-8' : ''}">
            <div class="flex items-center gap-x-4 text-xs">
              <time datetime={post.datetime} class="text-gray-500">{post.date}</time> {/* Themeable text-theme-text-muted */}
              <a href={post.category.href} class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{post.category.title}</a> {/* Themeable bg-theme-bg-alt, text-theme-text-muted, hover:bg-theme-bg-alt-hover, hover:text-theme-primary-accent */}
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"> {/* Themeable text-theme-text-base, group-hover:text-theme-text-muted */}
                <a href={post.href}>
                  <span class="absolute inset-0"></span>
                  {post.title}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p> {/* Themeable text-theme-text-muted */}
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img src={post.author.imageUrl} alt="{post.author.name} avatar" class="size-10 rounded-full bg-gray-50"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-full */}
              <div class="text-sm/6">
                <p class="font-semibold text-gray-900"> {/* Themeable text-theme-text-base */}
                  <a href={post.author.href}>
                    <span class="absolute inset-0"></span>
                    {post.author.name}
                  </a>
                </p>
                <p class="text-gray-600">{post.author.role}</p> {/* Themeable text-theme-text-muted */}
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
