# Blog Three-Column Layout - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `blog-three-column.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays blog posts in a responsive three-column grid.

## Overview

This component creates a blog section where posts are displayed in a three-column layout on larger screens. Each post card includes an optional image, category, title, description, and author details.

## Original Svelte Component Props

The original Svelte component defines the following props:

-   `title: string` (default: "From the blog") - The main title for the blog section.
-   `description: string` (default: "Learn how to grow your business with our expert advice.") - A short description for the blog section.
-   `posts: Array<{ id: string | number, title: string, href: string, description: string, imageUrl?: string, imageAlt?: string, date: string, datetime: string, category: { title: string, href: string }, author: { name: string, role: string, href: string, imageUrl: string } }>` - An array of post objects. `imageUrl` is optional.

## Theme Variables Noted in Original Snippet

-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for category badge and image placeholder)
-   `--theme-text-base` (e.g., `text-gray-900`)
-   `--theme-text-muted` (e.g., `text-gray-600`, `text-gray-500`)
-   `--theme-primary-accent` (e.g., `text-indigo-600` for category badge hover)
-   `--theme-border-radius-2xl` (e.g., `rounded-2xl` for image)
-   `--theme-border-radius-full` (e.g., `rounded-full` for category badge & author image)
-   `--theme-ring-color` (e.g., `ring-gray-900/10` for image)

## HTML Structure Example (Conceptual)

This static HTML represents the structure for the blog section and one example post card. The original Svelte component would loop through the `posts` array to generate multiple such articles.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">From the blog</h2> <!-- title prop, theme: text-theme-text-base -->
      <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> <!-- description prop, theme: text-theme-text-muted -->
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      
      <!-- Example Blog Post Article -->
      <article class="flex flex-col items-start justify-between">
        <!-- Optional Image Section -->
        <div class="relative w-full">
          <img src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80" alt="Desk with various items" class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"> <!-- theme: bg-theme-bg-alt, rounded-theme-border-radius-2xl -->
          <div class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div> <!-- theme: ring-theme-ring-color -->
        </div>
        
        <div class="max-w-xl mt-8"> <!-- class 'mt-8' is conditional in Svelte if image exists -->
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
            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p> <!-- theme: text-theme-text-muted -->
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
        </div>
      </article>

      <!-- More articles would be generated here by the Svelte #each block -->
    </div>
  </div>
</div>
```

## JavaScript Notes
- The Svelte component uses the `posts` prop (an array of objects) to dynamically generate each blog post card.
- Content like titles, images (optional), descriptions, dates, categories, and author details are populated from these props.
- The `mt-8` class on the text content `div` is conditionally applied in Svelte based on the presence of `post.imageUrl`.

## CSS Notes
- **Layout:** Uses a CSS grid (`lg:grid-cols-3`) for the three-column layout on larger screens.
- **Image Aspect Ratio:** Images use `aspect-video`, `sm:aspect-2/1`, `lg:aspect-3/2` for responsive aspect ratios.
- **Line Clamp:** Post descriptions use `line-clamp-3`.

This Markdown file provides an HTML structure and class details based on the `blog-three-column.svelte` snippet.
