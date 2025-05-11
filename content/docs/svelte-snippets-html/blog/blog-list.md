# Blog List Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `blog-list.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays a list of blog posts.

## Overview

This component creates a section to display a list of blog posts, each showing metadata like date, category, title, description, and author details.

## Original Svelte Component Props

The original Svelte component defines the following props:

-   `title: string` (default: "From the blog") - The main title for the blog section.
-   `description: string` (default: "Learn how to grow your business with our expert advice.") - A short description for the blog section.
-   `posts: Array<{ id: string | number, title: string, href: string, description: string, date: string, datetime: string, category: { title: string, href: string }, author: { name: string, role: string, href: string, imageUrl: string } }>` - An array of post objects.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for category badge)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`, `text-gray-500`)
-   `--theme-primary-accent` (e.g., `text-indigo-600` for category badge hover)
-   `--theme-border-color` (e.g., `border-gray-200`)
-   `--theme-border-radius-full` (e.g., `rounded-full` for category badge & author image)

## HTML Structure Example (Conceptual)

This static HTML represents the structure for the blog list section and one example post item. The original Svelte component would loop through the `posts` array to generate multiple such articles.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl">
      <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2> <!-- title prop, theme: text-theme-text-base -->
      <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> <!-- description prop, theme: text-theme-text-muted -->
      <div class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"> <!-- theme: border-theme-border-color -->
        
        <!-- Example Blog Post Article -->
        <article class="flex max-w-xl flex-col items-start justify-between">
          <div class="flex items-center gap-x-4 text-xs">
            <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time> <!-- theme: text-theme-text-muted -->
            <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a> <!-- theme: bg-theme-bg-alt, text-theme-text-muted, hover:bg-theme-bg-alt-hover, hover:text-theme-primary-accent -->
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600"> <!-- theme: text-theme-text-base, group-hover:text-theme-text-muted -->
              <a href="#">
                <span class="absolute inset-0"></span>
                Boost your conversion rate
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.</p> <!-- theme: text-theme-text-muted -->
          </div>
          <div class="relative mt-8 flex items-center gap-x-4">
            <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Michael Foster avatar" class="size-10 rounded-full bg-gray-50"> <!-- theme: bg-theme-bg-alt, rounded-theme-border-radius-full -->
            <div class="text-sm/6">
              <p class="font-semibold text-gray-900"> <!-- theme: text-theme-text-base -->
                <a href="#">
                  <span class="absolute inset-0"></span>
                  Michael Foster
                </a>
              </p>
              <p class="text-gray-600">Co-Founder / CTO</p> <!-- theme: text-theme-text-muted -->
            </div>
          </div>
        </article>

        <!-- More articles would be generated here by the Svelte #each block -->
      </div>
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses the `posts` prop (an array of objects) to dynamically generate each blog post item using an `{#each}` block.
- Content such as titles, descriptions, dates, categories, and author details are populated from these props.
- For a static HTML version, this content would be hardcoded into each `<article>` element.

## CSS Notes
- **Layout:** The posts are listed vertically, separated by a border and spacing.
- **Hover Effects:** The post title has a `group-hover:text-gray-600` effect.
- **Absolute Link Spans:** An `<span class="absolute inset-0"></span>` is used within links (for post title and author name) to make a larger area clickable.
- **Line Clamp:** The post description uses `line-clamp-3` to limit the text to three lines, truncating with an ellipsis if it's longer. This requires the `@tailwindcss/line-clamp` plugin or native CSS support.

This Markdown file provides an HTML structure and class details based on the `blog-list.svelte` snippet.
