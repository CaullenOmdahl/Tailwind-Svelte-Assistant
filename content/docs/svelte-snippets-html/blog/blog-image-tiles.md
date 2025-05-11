# Blog Image Tiles Section - HTML & Tailwind CSS Example

This document provides an HTML structure and Tailwind CSS class example derived from the `blog-image-tiles.svelte` Svelte snippet. This example is intended for AI consumption and may need adaptation. The component displays blog posts as a grid of image tiles.

## Overview

This component creates a section to showcase blog posts, where each post is represented as a tile with a background image and overlayed text content including title, date, and author information.

## Original Svelte Component Props

The original Svelte component defines the following props:

-   `title: string` (default: "From the blog") - The main title for the blog section.
-   `description: string` (default: "Learn how to grow your business with our expert advice.") - A short description for the blog section.
-   `posts: Array<{ id: string | number, title: string, href: string, imageUrl: string, imageAlt: string, date: string, datetime: string, category: { title: string, href: string }, author: { name: string, role: string, href: string, imageUrl: string } }>` - An array of post objects. Each object contains details for a blog post.

## Theme Variables Noted in Original Snippet

The original snippet's comments mention these CSS theme variables:
-   `--theme-bg-base` (e.g., `bg-white`)
-   `--theme-bg-alt` (e.g., `bg-gray-50` for category badge - though not explicitly used in this tile version)
-   `--theme-text-base` (e.g., `text-gray-900` for section title, `text-white` for tile title)
-   `--theme-text-muted` (e.g., `text-gray-600` for section description, `text-gray-300` for tile meta)
-   `--theme-primary-accent` (e.g., `text-indigo-600`)
-   `--theme-border-radius-2xl` (e.g., `rounded-2xl` for image container/article)
-   `--theme-border-radius-full` (e.g., `rounded-full` for author image)
-   `--theme-ring-color` (e.g., `ring-gray-900/10` for image container/article)
-   `--theme-gradient-from` (e.g., `from-gray-900` for image overlay)
-   `--theme-gradient-via` (e.g., `via-gray-900/40` for image overlay)

## HTML Structure Example (Conceptual)

This static HTML represents the structure for the blog section and one example post tile. The original Svelte component would loop through the `posts` array to generate multiple such articles.

```html
<div class="bg-white py-24 sm:py-32"> <!-- theme: bg-theme-bg-base -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">From the blog</h2> <!-- title prop, theme: text-theme-text-base -->
      <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> <!-- description prop, theme: text-theme-text-muted -->
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      
      <!-- Example Blog Post Article Tile -->
      <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"> 
        <!-- theme: bg-theme-bg-alt (darker for contrast with image), rounded-theme-border-radius-2xl -->
        <img src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80" alt="Desk with various items" class="absolute inset-0 -z-10 size-full object-cover">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div> <!-- theme: from-theme-gradient-from, via-theme-gradient-via -->
        <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset"></div> <!-- theme: ring-theme-ring-color -->

        <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300"> <!-- theme: text-theme-text-muted (on dark) -->
          <time datetime="2020-03-16" class="mr-8">Mar 16, 2020</time>
          <div class="-ml-4 flex items-center gap-x-4">
            <svg viewBox="0 0 2 2" class="-ml-0.5 size-0.5 flex-none fill-white/50"> <!-- theme: fill -->
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div class="flex gap-x-2.5">
              <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Michael Foster avatar" class="size-6 flex-none rounded-full bg-white/10"> <!-- theme: bg, rounded-theme-border-radius-full -->
              Michael Foster
            </div>
          </div>
        </div>
        <h3 class="mt-3 text-lg/6 font-semibold text-white"> <!-- theme: text-theme-text-base (on dark) -->
          <a href="#">
            <span class="absolute inset-0"></span>
            Boost your conversion rate
          </a>
        </h3>
      </article>

      <!-- More article tiles would be generated here by the Svelte #each block -->

    </div>
  </div>
</div>
```

## JavaScript Notes

- The original Svelte component uses the `posts` prop (an array of objects) to dynamically generate each blog post tile using an `{#each}` block.
- Content like titles, image URLs, dates, and author details are all populated from these props.
- For a static HTML version, this content would be hardcoded into each `<article>` element.

## CSS Notes

- **Image Overlay:** A gradient overlay (`bg-gradient-to-t from-gray-900 via-gray-900/40`) is used on top of the background image to ensure text readability.
- **Absolute Positioning for Link:** The `<h3>` containing the post title has an `<a>` tag with an absolutely positioned `<span>` inside (`<span class="absolute inset-0"></span>`). This makes the entire article tile clickable.
- **Themeable Classes:** Comments in the original snippet and in the HTML example above indicate where theme variables could be applied for colors, backgrounds, and borders.

This Markdown file provides an HTML structure and class details based on the `blog-image-tiles.svelte` snippet.
