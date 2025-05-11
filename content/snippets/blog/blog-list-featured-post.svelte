<!--
@description: A blog section displaying a featured post prominently, followed by a list of other posts. Based on Tailwind UI.
@props:
  title: string - The main title for the blog section.
  description: string - A short description for the blog section.
  featuredPost: { 
    id: string | number,
    title: string, 
    href: string, 
    description: string, 
    date: string, 
    datetime: string, 
    category: { title: string, href: string }, 
    author: { name: string, role: string, href: string, imageUrl: string } 
  } - The featured post object.
  posts: Array<{ 
    id: string | number,
    title: string, 
    href: string, 
    description: string, 
    date: string, 
    datetime: string, 
    category: { title: string, href: string }, 
    author: { name: string, role: string, href: string, imageUrl: string } 
  }> - Array of other post objects.
@theme_vars:
  --theme-bg-base (bg-white)
  --theme-bg-alt (bg-gray-50 for category badge)
  --theme-text-base (text-gray-900)
  --theme-text-muted (text-gray-600, text-gray-500)
  --theme-primary-accent (text-indigo-600 for category badge hover and link)
  --theme-border-color (border-gray-900/10)
  --theme-border-radius-full (rounded-full for category badge & author image)
-->
<script lang="ts">
  export let title: string = "From the blog";
  export let description: string = "Learn how to grow your business with our expert advice.";
  
  export let featuredPost = {
    id: 0, // Example ID
    title: 'We’re incredibly proud to announce we have secured $75m in Series B',
    href: '#',
    description: 'Libero neque aenean tincidunt nec consequat tempor. Viverra odio id velit adipiscing id. Nisi vestibulum orci eget bibendum dictum. Velit viverra posuere vulputate volutpat nunc. Nunc netus sit faucibus.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Announcement', href: '#' }, // Example category
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  };

  export let posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
      date: 'Mar 10, 2020',
      datetime: '2020-03-10',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Lindsay Walton',
        role: 'Front-end Developer',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // Add more posts as needed
  ];
</script>

<div class="bg-theme-bg-base py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
      <article class="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
        <time datetime={featuredPost.datetime} class="block text-sm/6 text-gray-600">{featuredPost.date}</time> {/* Themeable text-theme-text-muted */}
        <h2 id="featured-post-title" class="mt-4 text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">{featuredPost.title}</h2> {/* Themeable text-theme-text-base */}
        <p class="mt-4 text-lg/8 text-gray-600">{featuredPost.description}</p> {/* Themeable text-theme-text-muted */}
        <div class="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
          <div class="flex">
            <a href={featuredPost.href} class="text-sm/6 font-semibold text-indigo-600" aria-describedby="featured-post-title">Continue reading <span aria-hidden="true">&rarr;</span></a> {/* Themeable text-theme-primary-accent */}
          </div>
          <div class="flex lg:border-t lg:border-gray-900/10 lg:pt-8"> {/* Themeable border-theme-border-color */}
            <a href={featuredPost.author.href} class="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900"> {/* Themeable text-theme-text-base */}
              <img src={featuredPost.author.imageUrl} alt="{featuredPost.author.name} avatar" class="size-6 flex-none rounded-full bg-gray-50"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-full */}
              {featuredPost.author.name}
            </a>
          </div>
        </div>
      </article>
      <div class="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0"> {/* Themeable border-theme-border-color */}
        <div class="-my-12 divide-y divide-gray-900/10"> {/* Themeable divide-theme-border-color */}
          {#each posts as post}
            <article class="py-12">
              <div class="group relative max-w-xl">
                <time datetime={post.datetime} class="block text-sm/6 text-gray-600">{post.date}</time> {/* Themeable text-theme-text-muted */}
                <h2 class="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600"> {/* Themeable text-theme-text-base, group-hover:text-theme-text-muted */}
                  <a href={post.href}>
                    <span class="absolute inset-0"></span>
                    {post.title}
                  </a>
                </h2>
                <p class="mt-4 text-sm/6 text-gray-600">{post.description}</p> {/* Themeable text-theme-text-muted */}
              </div>
              <div class="mt-4 flex">
                <a href={post.author.href} class="relative flex gap-x-2.5 text-sm/6 font-semibold text-gray-900"> {/* Themeable text-theme-text-base */}
                  <img src={post.author.imageUrl} alt="{post.author.name} avatar" class="size-6 flex-none rounded-full bg-gray-50"> {/* Themeable bg-theme-bg-alt, rounded-theme-border-radius-full */}
                  {post.author.name}
                </a>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
