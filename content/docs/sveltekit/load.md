*   ### Getting started
    
    *   [Introduction](/docs/kit/introduction)
    *   [Creating a project](/docs/kit/creating-a-project)
    *   [Project types](/docs/kit/project-types)
    *   [Project structure](/docs/kit/project-structure)
    *   [Web standards](/docs/kit/web-standards)
*   ### Core concepts
    
    *   [Routing](/docs/kit/routing)
    *   [Loading data](/docs/kit/load)
    *   [Form actions](/docs/kit/form-actions)
    *   [Page options](/docs/kit/page-options)
    *   [State management](/docs/kit/state-management)
*   ### Build and deploy
    
    *   [Building your app](/docs/kit/building-your-app)
    *   [Adapters](/docs/kit/adapters)
    *   [Zero-config deployments](/docs/kit/adapter-auto)
    *   [Node servers](/docs/kit/adapter-node)
    *   [Static site generation](/docs/kit/adapter-static)
    *   [Single-page apps](/docs/kit/single-page-apps)
    *   [Cloudflare](/docs/kit/adapter-cloudflare)
    *   [Cloudflare Workers](/docs/kit/adapter-cloudflare-workers)
    *   [Netlify](/docs/kit/adapter-netlify)
    *   [Vercel](/docs/kit/adapter-vercel)
    *   [Writing adapters](/docs/kit/writing-adapters)
*   ### Advanced
    
    *   [Advanced routing](/docs/kit/advanced-routing)
    *   [Hooks](/docs/kit/hooks)
    *   [Errors](/docs/kit/errors)
    *   [Link options](/docs/kit/link-options)
    *   [Service workers](/docs/kit/service-workers)
    *   [Server-only modules](/docs/kit/server-only-modules)
    *   [Snapshots](/docs/kit/snapshots)
    *   [Shallow routing](/docs/kit/shallow-routing)
    *   [Packaging](/docs/kit/packaging)
*   ### Best practices
    
    *   [Auth](/docs/kit/auth)
    *   [Performance](/docs/kit/performance)
    *   [Icons](/docs/kit/icons)
    *   [Images](/docs/kit/images)
    *   [Accessibility](/docs/kit/accessibility)
    *   [SEO](/docs/kit/seo)
*   ### Appendix
    
    *   [Frequently asked questions](/docs/kit/faq)
    *   [Integrations](/docs/kit/integrations)
    *   [Breakpoint Debugging](/docs/kit/debugging)
    *   [Migrating to SvelteKit v2](/docs/kit/migrating-to-sveltekit-2)
    *   [Migrating from Sapper](/docs/kit/migrating)
    *   [Additional resources](/docs/kit/additional-resources)
    *   [Glossary](/docs/kit/glossary)
*   ### Reference
    
    *   [@sveltejs/kit](/docs/kit/@sveltejs-kit)
    *   [@sveltejs/kit/hooks](/docs/kit/@sveltejs-kit-hooks)
    *   [@sveltejs/kit/node/polyfills](/docs/kit/@sveltejs-kit-node-polyfills)
    *   [@sveltejs/kit/node](/docs/kit/@sveltejs-kit-node)
    *   [@sveltejs/kit/vite](/docs/kit/@sveltejs-kit-vite)
    *   [$app/environment](/docs/kit/$app-environment)
    *   [$app/forms](/docs/kit/$app-forms)
    *   [$app/navigation](/docs/kit/$app-navigation)
    *   [$app/paths](/docs/kit/$app-paths)
    *   [$app/server](/docs/kit/$app-server)
    *   [$app/state](/docs/kit/$app-state)
    *   [$app/stores](/docs/kit/$app-stores)
    *   [$app/types](/docs/kit/$app-types)
    *   [$env/dynamic/private](/docs/kit/$env-dynamic-private)
    *   [$env/dynamic/public](/docs/kit/$env-dynamic-public)
    *   [$env/static/private](/docs/kit/$env-static-private)
    *   [$env/static/public](/docs/kit/$env-static-public)
    *   [$lib](/docs/kit/$lib)
    *   [$service-worker](/docs/kit/$service-worker)
    *   [Configuration](/docs/kit/configuration)
    *   [Command Line Interface](/docs/kit/cli)
    *   [Types](/docs/kit/types)

SvelteKitCore concepts

# Loading data

### On this page

*   [Loading data](/docs/kit/load)
*   [Page data](#Page-data)
*   [Layout data](#Layout-data)
*   [page.data](#page.data)
*   [Universal vs server](#Universal-vs-server)
*   [Using URL data](#Using-URL-data)
*   [Making fetch requests](#Making-fetch-requests)
*   [Cookies](#Cookies)
*   [Headers](#Headers)
*   [Using parent data](#Using-parent-data)
*   [Errors](#Errors)
*   [Redirects](#Redirects)
*   [Streaming with promises](#Streaming-with-promises)
*   [Parallel loading](#Parallel-loading)
*   [Rerunning load functions](#Rerunning-load-functions)
*   [Implications for authentication](#Implications-for-authentication)
*   [Using getRequestEvent](#Using-getRequestEvent)
*   [Further reading](#Further-reading)

Before a [`+page.svelte`](routing#page-page.svelte) component (and its containing [`+layout.svelte`](routing#layout-layout.svelte) components) can be rendered, we often need to get some data. This is done by defining `load` functions.

## Page data[](#Page-data)

A `+page.svelte` file can have a sibling `+page.js` that exports a `load` function, the return value of which is available to the page via the `data` prop:

src/routes/blog/\[slug\]/+page

```
/** @type {import('./$types').PageLoad} */
export function function load({ params }: {
    params: any;
}): {
    post: {
        title: string;
        content: string;
    };
}@type{import('./$types').PageLoad}load({ params: anyparams }) {
	return {
		post: {
    title: string;
    content: string;
}post: {
			title: stringtitle: `Title for ${params: anyparams.slug} goes here`,
			content: stringcontent: `Content for ${params: anyparams.slug} goes here`
		}
	};
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = ({ params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params }) => {
	return {
		post: {
    title: string;
    content: string;
}post: {
			title: stringtitle: `Title for ${params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params.slug} goes here`,
			content: stringcontent: `Content for ${params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params.slug} goes here`
		}
	};
};
```

src/routes/blog/\[slug\]/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
```

> Legacy mode
> 
> Before version 2.16.0, the props of a page and layout had to be typed individually:
> 
> +page
> 
> ```
> /** @type {{ data: import('./$types').PageData }} */
> let { let data: anydata } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```
> 
> ```
> import type { import PageDataPageData } from './$types';
> 
> let { let data: PageDatadata }: { data: PageDatadata: import PageDataPageData } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```
> 
> In Svelte 4, you’d use `export let data` instead.

Thanks to the generated `$types` module, we get full type safety.

A `load` function in a `+page.js` file runs both on the server and in the browser (unless combined with `export const ssr = false`, in which case it will [only run in the browser](page-options#ssr)). If your `load` function should _always_ run on the server (because it uses private environment variables, for example, or accesses a database) then it would go in a `+page.server.js` instead.

A more realistic version of your blog post’s `load` function, that only runs on the server and pulls data from a database, might look like this:

src/routes/blog/\[slug\]/+page.server

```
import * as module "$lib/server/database"db from '$lib/server/database';

/** @type {import('./$types').PageServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').PageServerLoad}load({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) {
	return {
		post: {
    title: string;
    content: string;
}post: await module "$lib/server/database"db.function getPost(slug: string): Promise<{
    title: string;
    content: string;
}>getPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
}
```

```
import * as module "$lib/server/database"db from '$lib/server/database';
import type { type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = async ({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) => {
	return {
		post: {
    title: string;
    content: string;
}post: await module "$lib/server/database"db.function getPost(slug: string): Promise<{
    title: string;
    content: string;
}>getPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
};
```

Notice that the type changed from `PageLoad` to `PageServerLoad`, because server `load` functions can access additional arguments. To understand when to use `+page.js` and when to use `+page.server.js`, see [Universal vs server](load#Universal-vs-server).

## Layout data[](#Layout-data)

Your `+layout.svelte` files can also load data, via `+layout.js` or `+layout.server.js`.

src/routes/blog/\[slug\]/+layout.server

```
import * as module "$lib/server/database"db from '$lib/server/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').LayoutServerLoad}load() {
	return {
		posts: {
    title: string;
    slug: string;
}[]posts: await module "$lib/server/database"db.function getPostSummaries(): Promise<Array<{
    title: string;
    slug: string;
}>>getPostSummaries()
	};
}
```

```
import * as module "$lib/server/database"db from '$lib/server/database';
import type { type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad } from './$types';

export const const load: LayoutServerLoadload: type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad = async () => {
	return {
		posts: {
    title: string;
    slug: string;
}[]posts: await module "$lib/server/database"db.function getPostSummaries(): Promise<Array<{
    title: string;
    slug: string;
}>>getPostSummaries()
	};
};
```

src/routes/blog/\[slug\]/+layout

```
<script>
	/** @type {import('./$types').LayoutProps} */
	let { data, children } = $props();
</script>

<main>
	<!-- +page.svelte is `@render`ed here -->
	{@render children()}
</main>

<aside>
	<h2>More posts</h2>
	<ul>
		{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
```

```
<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<main>
	<!-- +page.svelte is `@render`ed here -->
	{@render children()}
</main>

<aside>
	<h2>More posts</h2>
	<ul>
		{#each data.posts as post}
			<li>
				<a href="/blog/{post.slug}">
					{post.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
```

> Legacy mode
> 
> `LayoutProps` was added in 2.16.0. In earlier versions, properties had to be typed individually:
> 
> +layout
> 
> ```
> /** @type {{ data: import('./$types').LayoutData, children: Snippet }} */
> let { let data: anydata, let children: anychildren } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```
> 
> ```
> import type { import LayoutDataLayoutData } from './$types';
> 
> let { let data: LayoutDatadata, let children: Snippetchildren }: { data: LayoutDatadata: import LayoutDataLayoutData, children: Snippetchildren: type Snippet = /*unresolved*/ anySnippet } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```

Data returned from layout `load` functions is available to child `+layout.svelte` components and the `+page.svelte` component as well as the layout that it ‘belongs’ to.

src/routes/blog/\[slug\]/+page

```
<script>
	import { page } from '$app/state';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	// we can access `data.posts` because it's returned from
	// the parent layout `load` function
	let index = $derived(data.posts.findIndex(post => post.slug === page.params.slug));
	let next = $derived(data.posts[index + 1]);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#if next}
	<p>Next post: <a href="/blog/{next.slug}">{next.title}</a></p>
{/if}
```

```
<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	// we can access `data.posts` because it's returned from
	// the parent layout `load` function
	let index = $derived(data.posts.findIndex(post => post.slug === page.params.slug));
	let next = $derived(data.posts[index + 1]);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#if next}
	<p>Next post: <a href="/blog/{next.slug}">{next.title}</a></p>
{/if}
```

> If multiple `load` functions return data with the same key, the last one ‘wins’ — the result of a layout `load` returning `{ a: 1, b: 2 }` and a page `load` returning `{ b: 3, c: 4 }` would be `{ a: 1, b: 3, c: 4 }`.

## page.data[](#page.data)

The `+page.svelte` component, and each `+layout.svelte` component above it, has access to its own data plus all the data from its parents.

In some cases, we might need the opposite — a parent layout might need to access page data or data from a child layout. For example, the root layout might want to access a `title` property returned from a `load` function in `+page.js` or `+page.server.js`. This can be done with `page.data`:

src/routes/+layout

```
<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.data.title}</title>
</svelte:head>
```

```
<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.data.title}</title>
</svelte:head>
```

Type information for `page.data` is provided by `App.PageData`.

> Legacy mode
> 
> `$app/state` was added in SvelteKit 2.12. If you’re using an earlier version or are using Svelte 4, use `$app/stores` instead. It provides a `page` store with the same interface that you can subscribe to, e.g. `$page.data.title`.

## Universal vs server[](#Universal-vs-server)

As we’ve seen, there are two types of `load` function:

*   `+page.js` and `+layout.js` files export _universal_ `load` functions that run both on the server and in the browser
*   `+page.server.js` and `+layout.server.js` files export _server_ `load` functions that only run server-side

Conceptually, they’re the same thing, but there are some important differences to be aware of.

### When does which load function run?[](#Universal-vs-server-When-does-which-load-function-run)

Server `load` functions _always_ run on the server.

By default, universal `load` functions run on the server during SSR when the user first visits your page. They will then run again during hydration, reusing any responses from [fetch requests](#Making-fetch-requests). All subsequent invocations of universal `load` functions happen in the browser. You can customize the behavior through [page options](page-options). If you disable [server side rendering](page-options#ssr), you’ll get an SPA and universal `load` functions _always_ run on the client.

If a route contains both universal and server `load` functions, the server `load` runs first.

A `load` function is invoked at runtime, unless you [prerender](page-options#prerender) the page — in that case, it’s invoked at build time.

### Input[](#Universal-vs-server-Input)

Both universal and server `load` functions have access to properties describing the request (`params`, `route` and `url`) and various functions (`fetch`, `setHeaders`, `parent`, `depends` and `untrack`). These are described in the following sections.

Server `load` functions are called with a `ServerLoadEvent`, which inherits `clientAddress`, `cookies`, `locals`, `platform` and `request` from `RequestEvent`.

Universal `load` functions are called with a `LoadEvent`, which has a `data` property. If you have `load` functions in both `+page.js` and `+page.server.js` (or `+layout.js` and `+layout.server.js`), the return value of the server `load` function is the `data` property of the universal `load` function’s argument.

### Output[](#Universal-vs-server-Output)

A universal `load` function can return an object containing any values, including things like custom classes and component constructors.

A server `load` function must return data that can be serialized with [devalue](https://github.com/rich-harris/devalue) — anything that can be represented as JSON plus things like `BigInt`, `Date`, `Map`, `Set` and `RegExp`, or repeated/cyclical references — so that it can be transported over the network. Your data can include [promises](#Streaming-with-promises), in which case it will be streamed to browsers. If you need to serialize/deserialize custom types, use [transport hooks](https://svelte.dev/docs/kit/hooks#Universal-hooks-transport).

### When to use which[](#Universal-vs-server-When-to-use-which)

Server `load` functions are convenient when you need to access data directly from a database or filesystem, or need to use private environment variables.

Universal `load` functions are useful when you need to `fetch` data from an external API and don’t need private credentials, since SvelteKit can get the data directly from the API rather than going via your server. They are also useful when you need to return something that can’t be serialized, such as a Svelte component constructor.

In rare cases, you might need to use both together — for example, you might need to return an instance of a custom class that was initialised with data from your server. When using both, the server `load` return value is _not_ passed directly to the page, but to the universal `load` function (as the `data` property):

src/routes/+page.server

```
/** @type {import('./$types').PageServerLoad} */
export async function function load(): Promise<{
    serverMessage: string;
}>@type{import('./$types').PageServerLoad}load() {
	return {
		serverMessage: stringserverMessage: 'hello from server load function'
	};
}
```

```
import type { type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = async () => {
	return {
		serverMessage: stringserverMessage: 'hello from server load function'
	};
};
```

src/routes/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ data }: {
    data: any;
}): Promise<{
    serverMessage: any;
    universalMessage: string;
}>@type{import('./$types').PageLoad}load({ data: anydata }) {
	return {
		serverMessage: anyserverMessage: data: anydata.serverMessage,
		universalMessage: stringuniversalMessage: 'hello from universal load function'
	};
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';
export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ data: Record<string, any> | nullContains the data returned by the route’s server load function (in +layout.server.js or +page.server.js), if any.
data }) => {
	return {
		serverMessage: anyserverMessage: data: Record<string, any> | nullContains the data returned by the route’s server load function (in +layout.server.js or +page.server.js), if any.
data.serverMessage,
		universalMessage: stringuniversalMessage: 'hello from universal load function'
	};
};
```

## Using URL data[](#Using-URL-data)

Often the `load` function depends on the URL in one way or another. For this, the `load` function provides you with `url`, `route` and `params`.

### url[](#Using-URL-data-url)

An instance of [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL), containing properties like the `origin`, `hostname`, `pathname` and `searchParams` (which contains the parsed query string as a [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object). `url.hash` cannot be accessed during `load`, since it is unavailable on the server.

> In some environments this is derived from request headers during server-side rendering. If you’re using [adapter-node](adapter-node), for example, you may need to configure the adapter in order for the URL to be correct.

### route[](#Using-URL-data-route)

Contains the name of the current route directory, relative to `src/routes`:

src/routes/a/\[b\]/\[...c\]/+page

```
/** @type {import('./$types').PageLoad} */
export function function load({ route }: {
    route: any;
}): void@type{import('./$types').PageLoad}load({ route: anyroute }) {
	var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:

A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.

Warning: The global console object’s methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');
// Prints: hello world, to stdout
console.log('hello %s', 'world');
// Prints: hello world, to stdout
console.error(new Error('Whoops, something bad happened'));
// Prints error message and stack trace to stderr:
//   Error: Whoops, something bad happened
//     at [eval]:5:15
//     at Script.runInThisContext (node:vm:132:18)
//     at Object.runInThisContext (node:vm:309:38)
//     at node:internal/process/execution:77:19
//     at [eval]-wrapper:6:22
//     at evalScript (node:internal/process/execution:76:60)
//     at node:internal/main/eval_string:23:3

const name = 'Will Robinson';
console.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to stderrExample using the Console class:
const out = getStreamSomehow();
const err = getStreamSomehow();
const myConsole = new console.Console(out, err);

myConsole.log('hello world');
// Prints: hello world, to out
myConsole.log('hello %s', 'world');
// Prints: hello world, to out
myConsole.error(new Error('Whoops, something bad happened'));
// Prints: [Error: Whoops, something bad happened], to err

const name = 'Will Robinson';
myConsole.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to err@seesourceconsole.Console.log(message?: any, ...optionalParams: any[]): void (+1 overload)Prints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdoutSee util.format() for more information.
@sincev0.1.100log(route: anyroute.id); // '/a/[b]/[...c]'
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = ({ route: {
    id: string | null;
}Info about the current route
route }) => {
	var console: ConsoleThe console module provides a simple debugging console that is similar to the
JavaScript console mechanism provided by web browsers.
The module exports two specific components:

A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
A global console instance configured to write to process.stdout and
process.stderr. The global console can be used without importing the node:console module.

Warning: The global console object’s methods are neither consistently
synchronous like the browser APIs they resemble, nor are they consistently
asynchronous like all other Node.js streams. See the note on process I/O for
more information.
Example using the global console:
console.log('hello world');
// Prints: hello world, to stdout
console.log('hello %s', 'world');
// Prints: hello world, to stdout
console.error(new Error('Whoops, something bad happened'));
// Prints error message and stack trace to stderr:
//   Error: Whoops, something bad happened
//     at [eval]:5:15
//     at Script.runInThisContext (node:vm:132:18)
//     at Object.runInThisContext (node:vm:309:38)
//     at node:internal/process/execution:77:19
//     at [eval]-wrapper:6:22
//     at evalScript (node:internal/process/execution:76:60)
//     at node:internal/main/eval_string:23:3

const name = 'Will Robinson';
console.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to stderrExample using the Console class:
const out = getStreamSomehow();
const err = getStreamSomehow();
const myConsole = new console.Console(out, err);

myConsole.log('hello world');
// Prints: hello world, to out
myConsole.log('hello %s', 'world');
// Prints: hello world, to out
myConsole.error(new Error('Whoops, something bad happened'));
// Prints: [Error: Whoops, something bad happened], to err

const name = 'Will Robinson';
myConsole.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to err@seesourceconsole.Console.log(message?: any, ...optionalParams: any[]): void (+1 overload)Prints to stdout with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to printf(3)
(the arguments are all passed to util.format()).
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdoutSee util.format() for more information.
@sincev0.1.100log(route: {
    id: string | null;
}Info about the current route
route.id: string | nullThe ID of the current route - e.g. for src/routes/blog/[slug], it would be /blog/[slug]. It is null when no route is matched.
id); // '/a/[b]/[...c]'
};
```

### params[](#Using-URL-data-params)

`params` is derived from `url.pathname` and `route.id`.

Given a `route.id` of `/a/[b]/[...c]` and a `url.pathname` of `/a/x/y/z`, the `params` object would look like this:

```
{
	"b": "x",
	"c": "y/z"
}
```

## Making fetch requests[](#Making-fetch-requests)

To get data from an external API or a `+server.js` handler, you can use the provided `fetch` function, which behaves identically to the [native `fetch` web API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) with a few additional features:

*   It can be used to make credentialed requests on the server, as it inherits the `cookie` and `authorization` headers for the page request.
*   It can make relative requests on the server (ordinarily, `fetch` requires a URL with an origin when used in a server context).
*   Internal requests (e.g. for `+server.js` routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
*   During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the `text`, `json` and `arrayBuffer` methods of the `Response` object. Note that headers will _not_ be serialized, unless explicitly included via [`filterSerializedResponseHeaders`](hooks#Server-hooks-handle).
*   During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request - if you received a warning in your browser console when using the browser `fetch` instead of the `load` `fetch`, this is why.

src/routes/items/\[id\]/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ fetch, params }: {
    fetch: any;
    params: any;
}): Promise<{
    item: any;
}>@type{import('./$types').PageLoad}load({ fetch: anyfetch, params: anyparams }) {
	const const res: anyres = await fetch: anyfetch(`/api/items/${params: anyparams.id}`);
	const const item: anyitem = await const res: anyres.json();

	return { item: anyitem };
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ fetch: {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}fetch is equivalent to the native fetch web API, with a few additional features:

It can be used to make credentialed requests on the server, as it inherits the cookie and authorization headers for the page request.
It can make relative requests on the server (ordinarily, fetch requires a URL with an origin when used in a server context).
Internal requests (e.g. for +server.js routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the text and json methods of the Response object. Note that headers will not be serialized, unless explicitly included via filterSerializedResponseHeaders
During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies here
fetch, params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params }) => {
	const const res: Responseres = await fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response> (+1 overload)MDN Reference
fetch(`/api/items/${params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params.id}`);
	const const item: anyitem = await const res: Responseres.Body.json(): Promise<any>MDN Reference
json();

	return { item: anyitem };
};
```

## Cookies[](#Cookies)

A server `load` function can get and set [`cookies`](@sveltejs-kit#Cookies).

src/routes/+layout.server

```
import * as module "$lib/server/database"db from '$lib/server/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').LayoutServerLoad}load({ cookies: CookiesGet or set cookies related to the current request
cookies }) {
	const const sessionid: string | undefinedsessionid = cookies: CookiesGet or set cookies related to the current request
cookies.Cookies.get: (name: string, opts?: CookieParseOptions) => string | undefinedGets a cookie that was previously set with cookies.set, or from the request headers.
@paramname the name of the cookie@paramopts the options, passed directly to cookie.parse. See documentation hereget('sessionid');

	return {
		user: {
    name: string;
    avatar: string;
}user: await module "$lib/server/database"db.function getUser(sessionid: string | undefined): Promise<{
    name: string;
    avatar: string;
}>getUser(const sessionid: string | undefinedsessionid)
	};
}
```

```
import * as module "$lib/server/database"db from '$lib/server/database';
import type { type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad } from './$types';

export const const load: LayoutServerLoadload: type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad = async ({ cookies: CookiesGet or set cookies related to the current request
cookies }) => {
	const const sessionid: string | undefinedsessionid = cookies: CookiesGet or set cookies related to the current request
cookies.Cookies.get: (name: string, opts?: CookieParseOptions) => string | undefinedGets a cookie that was previously set with cookies.set, or from the request headers.
@paramname the name of the cookie@paramopts the options, passed directly to cookie.parse. See documentation hereget('sessionid');

	return {
		user: {
    name: string;
    avatar: string;
}user: await module "$lib/server/database"db.function getUser(sessionid: string | undefined): Promise<{
    name: string;
    avatar: string;
}>getUser(const sessionid: string | undefinedsessionid)
	};
};
```

Cookies will only be passed through the provided `fetch` function if the target host is the same as the SvelteKit application or a more specific subdomain of it.

For example, if SvelteKit is serving my.domain.com:

*   domain.com WILL NOT receive cookies
*   my.domain.com WILL receive cookies
*   api.domain.com WILL NOT receive cookies
*   sub.my.domain.com WILL receive cookies

Other cookies will not be passed when `credentials: 'include'` is set, because SvelteKit does not know which domain which cookie belongs to (the browser does not pass this information along), so it’s not safe to forward any of them. Use the [handleFetch hook](hooks#Server-hooks-handleFetch) to work around it.

## Headers[](#Headers)

Both server and universal `load` functions have access to a `setHeaders` function that, when running on the server, can set headers for the response. (When running in the browser, `setHeaders` has no effect.) This is useful if you want the page to be cached, for example:

src/routes/products/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ fetch, setHeaders }: {
    fetch: any;
    setHeaders: any;
}): Promise<any>@type{import('./$types').PageLoad}load({ fetch: anyfetch, setHeaders: anysetHeaders }) {
	const const url: "https://cms.example.com/products.json"url = `https://cms.example.com/products.json`;
	const const response: anyresponse = await fetch: anyfetch(const url: "https://cms.example.com/products.json"url);

	// Headers are only set during SSR, caching the page's HTML
	// for the same length of time as the underlying data.
	setHeaders: anysetHeaders({
		age: anyage: const response: anyresponse.headers.get('age'),
		'cache-control': const response: anyresponse.headers.get('cache-control')
	});

	return const response: anyresponse.json();
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';
export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ fetch: {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}fetch is equivalent to the native fetch web API, with a few additional features:

It can be used to make credentialed requests on the server, as it inherits the cookie and authorization headers for the page request.
It can make relative requests on the server (ordinarily, fetch requires a URL with an origin when used in a server context).
Internal requests (e.g. for +server.js routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the text and json methods of the Response object. Note that headers will not be serialized, unless explicitly included via filterSerializedResponseHeaders
During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies here
fetch, setHeaders: (headers: Record<string, string>) => voidIf you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:
src/routes/blog/+pageexport async function load({ fetch, setHeaders }) {
	const url = `https://cms.example.com/articles.json`;
	const response = await fetch(url);

	setHeaders({
		age: response.headers.get('age'),
		'cache-control': response.headers.get('cache-control')
	});

	return response.json();
}Setting the same header multiple times (even in separate load functions) is an error — you can only set a given header once.
You cannot add a set-cookie header with setHeaders — use the cookies API in a server-only load function instead.
setHeaders has no effect when a load function runs in the browser.
setHeaders }) => {
	const const url: "https://cms.example.com/products.json"url = `https://cms.example.com/products.json`;
	const const response: Responseresponse = await fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response> (+1 overload)MDN Reference
fetch(const url: "https://cms.example.com/products.json"url);

	// Headers are only set during SSR, caching the page's HTML
	// for the same length of time as the underlying data.
	setHeaders: (headers: Record<string, string>) => voidIf you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:
src/routes/blog/+pageexport async function load({ fetch, setHeaders }) {
	const url = `https://cms.example.com/articles.json`;
	const response = await fetch(url);

	setHeaders({
		age: response.headers.get('age'),
		'cache-control': response.headers.get('cache-control')
	});

	return response.json();
}Setting the same header multiple times (even in separate load functions) is an error — you can only set a given header once.
You cannot add a set-cookie header with setHeaders — use the cookies API in a server-only load function instead.
setHeaders has no effect when a load function runs in the browser.
setHeaders({
		age: string | nullage: const response: Responseresponse.Response.headers: HeadersMDN Reference
headers.Headers.get(name: string): string | nullMDN Reference
get('age'),
		'cache-control': const response: Responseresponse.Response.headers: HeadersMDN Reference
headers.Headers.get(name: string): string | nullMDN Reference
get('cache-control')
	});

	return const response: Responseresponse.Body.json(): Promise<any>MDN Reference
json();
};
```

Setting the same header multiple times (even in separate `load` functions) is an error. You can only set a given header once using the `setHeaders` function. You cannot add a `set-cookie` header with `setHeaders` — use `cookies.set(name, value, options)` instead.

## Using parent data[](#Using-parent-data)

Occasionally it’s useful for a `load` function to access data from a parent `load` function, which can be done with `await parent()`:

src/routes/+layout

```
/** @type {import('./$types').LayoutLoad} */
export function function load(): {
    a: number;
}@type{import('./$types').LayoutLoad}load() {
	return { a: numbera: 1 };
}
```

```
import type { type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad } from './$types';

export const const load: LayoutLoadload: type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad = () => {
	return { a: numbera: 1 };
};
```

src/routes/abc/+layout

```
/** @type {import('./$types').LayoutLoad} */
export async function function load({ parent }: {
    parent: any;
}): Promise<{
    b: any;
}>@type{import('./$types').LayoutLoad}load({ parent: anyparent }) {
	const { const a: anya } = await parent: anyparent();
	return { b: anyb: const a: anya + 1 };
}
```

```
import type { type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad } from './$types';

export const const load: LayoutLoadload: type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad = async ({ parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent }) => {
	const { const a: anya } = await parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent();
	return { b: anyb: const a: anya + 1 };
};
```

src/routes/abc/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ parent }: {
    parent: any;
}): Promise<{
    c: any;
}>@type{import('./$types').PageLoad}load({ parent: anyparent }) {
	const { const a: anya, const b: anyb } = await parent: anyparent();
	return { c: anyc: const a: anya + const b: anyb };
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent }) => {
	const { const a: anya, const b: anyb } = await parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent();
	return { c: anyc: const a: anya + const b: anyb };
};
```

src/routes/abc/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<!-- renders `1 + 2 = 3` -->
<p>{data.a} + {data.b} = {data.c}</p>
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- renders `1 + 2 = 3` -->
<p>{data.a} + {data.b} = {data.c}</p>
```

> Notice that the `load` function in `+page.js` receives the merged data from both layout `load` functions, not just the immediate parent.

Inside `+page.server.js` and `+layout.server.js`, `parent` returns data from parent `+layout.server.js` files.

In `+page.js` or `+layout.js` it will return data from parent `+layout.js` files. However, a missing `+layout.js` is treated as a `({ data }) => data` function, meaning that it will also return data from parent `+layout.server.js` files that are not ‘shadowed’ by a `+layout.js` file

Take care not to introduce waterfalls when using `await parent()`. Here, for example, `getData(params)` does not depend on the result of calling `parent()`, so we should call it first to avoid a delayed render.

+page

```
/** @type {import('./$types').PageLoad} */
export async function function load(event: LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').PageLoad}load({ params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params, parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent }) {
	const parentData = await parent();
	const const data: {
    meta: any;
}data = await function getData(params: Record<string, string>): Promise<{
    meta: any;
}>getData(params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params);
	const const parentData: Record<string, any>parentData = await parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent();

	return {
		...const data: {
    meta: any;
}data,
		meta: anymeta: { ...const parentData: Record<string, any>parentData.meta, ...const data: {
    meta: any;
}data.meta: anymeta }
	};
}
```

```
import type { type PageLoad = (event: LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params, parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent }) => {
	const parentData = await parent();
	const const data: {
    meta: any;
}data = await function getData(params: Record<string, string>): Promise<{
    meta: any;
}>getData(params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params);
	const const parentData: Record<string, any>parentData = await parent: () => Promise<Record<string, any>>await parent() returns data from parent +layout.js load functions.
Implicitly, a missing +layout.js is treated as a ({ data }) => data function, meaning that it will return and forward data from parent +layout.server.js files.
Be careful not to introduce accidental waterfalls when using await parent(). If for example you only want to merge parent data into the returned output, call it after fetching your other data.
parent();

	return {
		...const data: {
    meta: any;
}data,
		meta: anymeta: { ...const parentData: Record<string, any>parentData.meta, ...const data: {
    meta: any;
}data.meta: anymeta }
	};
};
```

## Errors[](#Errors)

If an error is thrown during `load`, the nearest [`+error.svelte`](routing#error) will be rendered. For [_expected_](errors#Expected-errors) errors, use the `error` helper from `@sveltejs/kit` to specify the HTTP status code and an optional message:

src/routes/admin/+layout.server

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').LayoutServerLoad}load({ locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals }) {
	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
    isAdmin: boolean;
} | undefineduser) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(401, 'not logged in');
	}

	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
    isAdmin: boolean;
}user.isAdmin: booleanisAdmin) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(403, 'not an admin');
	}
}
```

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';
import type { type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad } from './$types';

export const const load: LayoutServerLoadload: type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad = ({ locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals }) => {
	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
    isAdmin: boolean;
} | undefineduser) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(401, 'not logged in');
	}

	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
    isAdmin: boolean;
}user.isAdmin: booleanisAdmin) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(403, 'not an admin');
	}
};
```

Calling `error(...)` will throw an exception, making it easy to stop execution from inside helper functions.

If an [_unexpected_](errors#Unexpected-errors) error is thrown, SvelteKit will invoke [`handleError`](hooks#Shared-hooks-handleError) and treat it as a 500 Internal Error.

> [In SvelteKit 1.x](migrating-to-sveltekit-2#redirect-and-error-are-no-longer-thrown-by-you) you had to `throw` the error yourself

## Redirects[](#Redirects)

To redirect users, use the `redirect` helper from `@sveltejs/kit` to specify the location to which they should be redirected alongside a `3xx` status code. Like `error(...)`, calling `redirect(...)` will throw an exception, making it easy to stop execution from inside helper functions.

src/routes/user/+layout.server

```
import { function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').LayoutServerLoad}load({ locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals }) {
	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
} | undefineduser) {
		function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect(307, '/login');
	}
}
```

```
import { function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect } from '@sveltejs/kit';
import type { type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad } from './$types';

export const const load: LayoutServerLoadload: type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad = ({ locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals }) => {
	if (!locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: {
    name: string;
} | undefineduser) {
		function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect(307, '/login');
	}
};
```

> Don’t use `redirect()` inside a `try {...}` block, as the redirect will immediately trigger the catch statement.

In the browser, you can also navigate programmatically outside of a `load` function using [`goto`]($app-navigation#goto) from [`$app.navigation`]($app-navigation).

> [In SvelteKit 1.x](migrating-to-sveltekit-2#redirect-and-error-are-no-longer-thrown-by-you) you had to `throw` the `redirect` yourself

## Streaming with promises[](#Streaming-with-promises)

When using a server `load`, promises will be streamed to the browser as they resolve. This is useful if you have slow, non-essential data, since you can start rendering the page before all the data is available:

src/routes/blog/\[slug\]/+page.server

```
/** @type {import('./$types').PageServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').PageServerLoad}load({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) {
	return {
		// make sure the `await` happens at the end, otherwise we
		// can't start loading comments until we've loaded the post
		comments: Promise<{
    content: string;
}>comments: const loadComments: (slug: string) => Promise<{
    content: string;
}>loadComments(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug),
		post: {
    title: string;
    content: string;
}post: await const loadPost: (slug: string) => Promise<{
    title: string;
    content: string;
}>loadPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
}
```

```
import type { type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = async ({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) => {
	return {
		// make sure the `await` happens at the end, otherwise we
		// can't start loading comments until we've loaded the post
		comments: Promise<{
    content: string;
}>comments: const loadComments: (slug: string) => Promise<{
    content: string;
}>loadComments(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug),
		post: {
    title: string;
    content: string;
}post: await const loadPost: (slug: string) => Promise<{
    title: string;
    content: string;
}>loadPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
};
```

This is useful for creating skeleton loading states, for example:

src/routes/blog/\[slug\]/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#await data.comments}
	Loading comments...
{:then comments}
	{#each comments as comment}
		<p>{comment.content}</p>
	{/each}
{:catch error}
	<p>error loading comments: {error.message}</p>
{/await}
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#await data.comments}
	Loading comments...
{:then comments}
	{#each comments as comment}
		<p>{comment.content}</p>
	{/each}
{:catch error}
	<p>error loading comments: {error.message}</p>
{/await}
```

When streaming data, be careful to handle promise rejections correctly. More specifically, the server could crash with an “unhandled promise rejection” error if a lazy-loaded promise fails before rendering starts (at which point it’s caught) and isn’t handling the error in some way. When using SvelteKit’s `fetch` directly in the `load` function, SvelteKit will handle this case for you. For other promises, it is enough to attach a noop-`catch` to the promise to mark it as handled.

src/routes/+page.server

```
/** @type {import('./$types').PageServerLoad} */
export function function load({ fetch }: {
    fetch: any;
}): {
    ok_manual: Promise<never>;
    ok_fetch: any;
    dangerous_unhandled: Promise<never>;
}@type{import('./$types').PageServerLoad}load({ fetch: anyfetch }) {
	const const ok_manual: Promise<never>ok_manual = var Promise: PromiseConstructorRepresents the completion of an asynchronous operation
Promise.PromiseConstructor.reject<never>(reason?: any): Promise<never>Creates a new rejected promise for the provided reason.
@paramreason The reason the promise was rejected.@returnsA new rejected Promise.reject();
	const ok_manual: Promise<never>ok_manual.Promise<never>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches a callback for only the rejection of the Promise.
@paramonrejected The callback to execute when the Promise is rejected.@returnsA Promise for the completion of the callback.catch(() => {});

	return {
		ok_manual: Promise<never>ok_manual,
		ok_fetch: anyok_fetch: fetch: anyfetch('/fetch/that/could/fail'),
		dangerous_unhandled: Promise<never>dangerous_unhandled: var Promise: PromiseConstructorRepresents the completion of an asynchronous operation
Promise.PromiseConstructor.reject<never>(reason?: any): Promise<never>Creates a new rejected promise for the provided reason.
@paramreason The reason the promise was rejected.@returnsA new rejected Promise.reject()
	};
}
```

```
import type { type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageServerLoad = (event: Kit.ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = ({ fetch: {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}fetch is equivalent to the native fetch web API, with a few additional features:

It can be used to make credentialed requests on the server, as it inherits the cookie and authorization headers for the page request.
It can make relative requests on the server (ordinarily, fetch requires a URL with an origin when used in a server context).
Internal requests (e.g. for +server.js routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the text and json methods of the Response object. Note that headers will not be serialized, unless explicitly included via filterSerializedResponseHeaders
During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies here.
fetch }) => {
	const const ok_manual: Promise<never>ok_manual = var Promise: PromiseConstructorRepresents the completion of an asynchronous operation
Promise.PromiseConstructor.reject<never>(reason?: any): Promise<never>Creates a new rejected promise for the provided reason.
@paramreason The reason the promise was rejected.@returnsA new rejected Promise.reject();
	const ok_manual: Promise<never>ok_manual.Promise<never>.catch<void>(onrejected?: ((reason: any) => void | PromiseLike<void>) | null | undefined): Promise<void>Attaches a callback for only the rejection of the Promise.
@paramonrejected The callback to execute when the Promise is rejected.@returnsA Promise for the completion of the callback.catch(() => {});

	return {
		ok_manual: Promise<never>ok_manual,
		ok_fetch: Promise<Response>ok_fetch: fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response> (+1 overload)MDN Reference
fetch('/fetch/that/could/fail'),
		dangerous_unhandled: Promise<never>dangerous_unhandled: var Promise: PromiseConstructorRepresents the completion of an asynchronous operation
Promise.PromiseConstructor.reject<never>(reason?: any): Promise<never>Creates a new rejected promise for the provided reason.
@paramreason The reason the promise was rejected.@returnsA new rejected Promise.reject()
	};
};
```

> On platforms that do not support streaming, such as AWS Lambda or Firebase, responses will be buffered. This means the page will only render once all promises resolve. If you are using a proxy (e.g. NGINX), make sure it does not buffer responses from the proxied server.

> Streaming data will only work when JavaScript is enabled. You should avoid returning promises from a universal `load` function if the page is server rendered, as these are _not_ streamed — instead, the promise is recreated when the function reruns in the browser.

> The headers and status code of a response cannot be changed once the response has started streaming, therefore you cannot `setHeaders` or throw redirects inside a streamed promise.

> [In SvelteKit 1.x](migrating-to-sveltekit-2#Top-level-promises-are-no-longer-awaited) top-level promises were automatically awaited, only nested promises were streamed.

## Parallel loading[](#Parallel-loading)

When rendering (or navigating to) a page, SvelteKit runs all `load` functions concurrently, avoiding a waterfall of requests. During client-side navigation, the result of calling multiple server `load` functions are grouped into a single response. Once all `load` functions have returned, the page is rendered.

## Rerunning load functions[](#Rerunning-load-functions)

SvelteKit tracks the dependencies of each `load` function to avoid rerunning it unnecessarily during navigation.

For example, given a pair of `load` functions like these...

src/routes/blog/\[slug\]/+page.server

```
import * as module "$lib/server/database"db from '$lib/server/database';

/** @type {import('./$types').PageServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').PageServerLoad}load({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) {
	return {
		post: {
    title: string;
    content: string;
}post: await module "$lib/server/database"db.function getPost(slug: string): Promise<{
    title: string;
    content: string;
}>getPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
}
```

```
import * as module "$lib/server/database"db from '$lib/server/database';
import type { type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = async ({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) => {
	return {
		post: {
    title: string;
    content: string;
}post: await module "$lib/server/database"db.function getPost(slug: string): Promise<{
    title: string;
    content: string;
}>getPost(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug)
	};
};
```

src/routes/blog/\[slug\]/+layout.server

```
import * as module "$lib/server/database"db from '$lib/server/database';

/** @type {import('./$types').LayoutServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').LayoutServerLoad}load() {
	return {
		posts: {
    title: string;
    slug: string;
}[]posts: await module "$lib/server/database"db.function getPostSummaries(): Promise<Array<{
    title: string;
    slug: string;
}>>getPostSummaries()
	};
}
```

```
import * as module "$lib/server/database"db from '$lib/server/database';
import type { type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad } from './$types';

export const const load: LayoutServerLoadload: type LayoutServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutServerLoad = async () => {
	return {
		posts: {
    title: string;
    slug: string;
}[]posts: await module "$lib/server/database"db.function getPostSummaries(): Promise<Array<{
    title: string;
    slug: string;
}>>getPostSummaries()
	};
};
```

...the one in `+page.server.js` will rerun if we navigate from `/blog/trying-the-raw-meat-diet` to `/blog/i-regret-my-choices` because `params.slug` has changed. The one in `+layout.server.js` will not, because the data is still valid. In other words, we won’t call `db.getPostSummaries()` a second time.

A `load` function that calls `await parent()` will also rerun if a parent `load` function is rerun.

Dependency tracking does not apply _after_ the `load` function has returned — for example, accessing `params.x` inside a nested [promise](#Streaming-with-promises) will not cause the function to rerun when `params.x` changes. (Don’t worry, you’ll get a warning in development if you accidentally do this.) Instead, access the parameter in the main body of your `load` function.

Search parameters are tracked independently from the rest of the url. For example, accessing `event.url.searchParams.get("x")` inside a `load` function will make that `load` function re-run when navigating from `?x=1` to `?x=2`, but not when navigating from `?x=1&y=1` to `?x=1&y=2`.

### Untracking dependencies[](#Rerunning-load-functions-Untracking-dependencies)

In rare cases, you may wish to exclude something from the dependency tracking mechanism. You can do this with the provided `untrack` function:

src/routes/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ untrack, url }: {
    untrack: any;
    url: any;
}): Promise<{
    message: string;
} | undefined>@type{import('./$types').PageLoad}load({ untrack: anyuntrack, url: anyurl }) {
	// Untrack url.pathname so that path changes don't trigger a rerun
	if (untrack: anyuntrack(() => url: anyurl.pathname === '/')) {
		return { message: stringmessage: 'Welcome!' };
	}
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ untrack: <T>(fn: () => T) => TUse this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:
src/routes/+page.serverexport async function load({ untrack, url }) {
	// Untrack url.pathname so that path changes don't trigger a rerun
	if (untrack(() => url.pathname === '/')) {
		return { message: 'Welcome!' };
	}
}untrack, url: URLThe URL of the current page
url }) => {
	// Untrack url.pathname so that path changes don't trigger a rerun
	if (untrack: <boolean>(fn: () => boolean) => booleanUse this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:
src/routes/+page.serverexport async function load({ untrack, url }) {
	// Untrack url.pathname so that path changes don't trigger a rerun
	if (untrack(() => url.pathname === '/')) {
		return { message: 'Welcome!' };
	}
}untrack(() => url: URLThe URL of the current page
url.URL.pathname: stringMDN Reference
pathname === '/')) {
		return { message: stringmessage: 'Welcome!' };
	}
};
```

### Manual invalidation[](#Rerunning-load-functions-Manual-invalidation)

You can also rerun `load` functions that apply to the current page using [`invalidate(url)`]($app-navigation#invalidate), which reruns all `load` functions that depend on `url`, and [`invalidateAll()`]($app-navigation#invalidateAll), which reruns every `load` function. Server load functions will never automatically depend on a fetched `url` to avoid leaking secrets to the client.

A `load` function depends on `url` if it calls `fetch(url)` or `depends(url)`. Note that `url` can be a custom identifier that starts with `[a-z]:`:

src/routes/random-number/+page

```
/** @type {import('./$types').PageLoad} */
export async function function load({ fetch, depends }: {
    fetch: any;
    depends: any;
}): Promise<{
    number: any;
}>@type{import('./$types').PageLoad}load({ fetch: anyfetch, depends: anydepends }) {
	// load reruns when `invalidate('https://api.example.com/random-number')` is called...
	const const response: anyresponse = await fetch: anyfetch('https://api.example.com/random-number');

	// ...or when `invalidate('app:random')` is called
	depends: anydepends('app:random');

	return {
		number: anynumber: await const response: anyresponse.json()
	};
}
```

```
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = async ({ fetch: {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}fetch is equivalent to the native fetch web API, with a few additional features:

It can be used to make credentialed requests on the server, as it inherits the cookie and authorization headers for the page request.
It can make relative requests on the server (ordinarily, fetch requires a URL with an origin when used in a server context).
Internal requests (e.g. for +server.js routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the text and json methods of the Response object. Note that headers will not be serialized, unless explicitly included via filterSerializedResponseHeaders
During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies here
fetch, depends: (...deps: Array<`${string}:${string}`>) => voidThis function declares that the load function has a dependency on one or more URLs or custom identifiers, which can subsequently be used with invalidate() to cause load to rerun.
Most of the time you won’t need this, as fetch calls depends on your behalf — it’s only necessary if you’re using a custom API client that bypasses fetch.
URLs can be absolute or relative to the page being loaded, and must be encoded.
Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the URI specification.
The following example shows how to use depends to register a dependency on a custom identifier, which is invalidated after a button click, making the load function rerun.
src/routes/+pagelet count = 0;
export async function load({ depends }) {
	depends('increase:count');

	return { count: count++ };
}src/routes/+page&#x3C;script>
	import { invalidate } from '$app/navigation';

	let { data } = $props();

	const increase = async () => {
		await invalidate('increase:count');
	}
&#x3C;/script>

&#x3C;p>{data.count}&#x3C;p>
&#x3C;button on:click={increase}>Increase Count&#x3C;/button>depends }) => {
	// load reruns when `invalidate('https://api.example.com/random-number')` is called...
	const const response: Responseresponse = await fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response> (+1 overload)MDN Reference
fetch('https://api.example.com/random-number');

	// ...or when `invalidate('app:random')` is called
	depends: (...deps: Array<`${string}:${string}`>) => voidThis function declares that the load function has a dependency on one or more URLs or custom identifiers, which can subsequently be used with invalidate() to cause load to rerun.
Most of the time you won’t need this, as fetch calls depends on your behalf — it’s only necessary if you’re using a custom API client that bypasses fetch.
URLs can be absolute or relative to the page being loaded, and must be encoded.
Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the URI specification.
The following example shows how to use depends to register a dependency on a custom identifier, which is invalidated after a button click, making the load function rerun.
src/routes/+pagelet count = 0;
export async function load({ depends }) {
	depends('increase:count');

	return { count: count++ };
}src/routes/+page&#x3C;script>
	import { invalidate } from '$app/navigation';

	let { data } = $props();

	const increase = async () => {
		await invalidate('increase:count');
	}
&#x3C;/script>

&#x3C;p>{data.count}&#x3C;p>
&#x3C;button on:click={increase}>Increase Count&#x3C;/button>depends('app:random');

	return {
		number: anynumber: await const response: Responseresponse.Body.json(): Promise<any>MDN Reference
json()
	};
};
```

src/routes/random-number/+page

```
<script>
	import { invalidate, invalidateAll } from '$app/navigation';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	function rerunLoadFunction() {
		// any of these will cause the `load` function to rerun
		invalidate('app:random');
		invalidate('https://api.example.com/random-number');
		invalidate(url => url.href.includes('random-number'));
		invalidateAll();
	}
</script>

<p>random number: {data.number}</p>
<button onclick={rerunLoadFunction}>Update random number</button>
```

```
<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	function rerunLoadFunction() {
		// any of these will cause the `load` function to rerun
		invalidate('app:random');
		invalidate('https://api.example.com/random-number');
		invalidate(url => url.href.includes('random-number'));
		invalidateAll();
	}
</script>

<p>random number: {data.number}</p>
<button onclick={rerunLoadFunction}>Update random number</button>
```

### When do load functions rerun?[](#Rerunning-load-functions-When-do-load-functions-rerun)

To summarize, a `load` function will rerun in the following situations:

*   It references a property of `params` whose value has changed
*   It references a property of `url` (such as `url.pathname` or `url.search`) whose value has changed. Properties in `request.url` are _not_ tracked
*   It calls `url.searchParams.get(...)`, `url.searchParams.getAll(...)` or `url.searchParams.has(...)` and the parameter in question changes. Accessing other properties of `url.searchParams` will have the same effect as accessing `url.search`.
*   It calls `await parent()` and a parent `load` function reran
*   A child `load` function calls `await parent()` and is rerunning, and the parent is a server load function
*   It declared a dependency on a specific URL via [`fetch`](#Making-fetch-requests) (universal load only) or [`depends`](@sveltejs-kit#LoadEvent), and that URL was marked invalid with [`invalidate(url)`]($app-navigation#invalidate)
*   All active `load` functions were forcibly rerun with [`invalidateAll()`]($app-navigation#invalidateAll)

`params` and `url` can change in response to a `<a href="..">` link click, a [`<form>` interaction](form-actions#GET-vs-POST), a [`goto`]($app-navigation#goto) invocation, or a [`redirect`](@sveltejs-kit#redirect).

Note that rerunning a `load` function will update the `data` prop inside the corresponding `+layout.svelte` or `+page.svelte`; it does _not_ cause the component to be recreated. As a result, internal state is preserved. If this isn’t what you want, you can reset whatever you need to reset inside an [`afterNavigate`]($app-navigation#afterNavigate) callback, and/or wrap your component in a [`{#key ...}`](../svelte/key) block.

## Implications for authentication[](#Implications-for-authentication)

A couple features of loading data have important implications for auth checks:

*   Layout `load` functions do not run on every request, such as during client side navigation between child routes. [(When do load functions rerun?)](load#Rerunning-load-functions-When-do-load-functions-rerun)
*   Layout and page `load` functions run concurrently unless `await parent()` is called. If a layout `load` throws, the page `load` function runs, but the client will not receive the returned data.

There are a few possible strategies to ensure an auth check occurs before protected code.

To prevent data waterfalls and preserve layout `load` caches:

*   Use [hooks](hooks) to protect multiple routes before any `load` functions run
*   Use auth guards directly in `+page.server.js` `load` functions for route specific protection

Putting an auth guard in `+layout.server.js` requires all child pages to call `await parent()` before protected code. Unless every child page depends on returned data from `await parent()`, the other options will be more performant.

## Using getRequestEvent[](#Using-getRequestEvent)

When running server `load` functions, the `event` object passed to the function as an argument can also be retrieved with [`getRequestEvent`]($app-server#getRequestEvent). This allows shared logic (such as authentication guards) to access information about the current request without it needing to be passed around.

For example, you might have a function that requires users to be logged in, and redirects them to `/login` if not:

src/lib/server/auth

```
import { function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect } from '@sveltejs/kit';
import { function getRequestEvent(): RequestEvent<Partial<Record<string, string>>, string | null>Returns the current RequestEvent. Can be used inside server hooks, server load functions, actions, and endpoints (and functions called by them).
In environments without AsyncLocalStorage, this must be called synchronously (i.e. not after an await).
@since2.20.0getRequestEvent } from '$app/server';

export function function requireLogin(): UserrequireLogin() {
	const { const locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals, const url: URLThe requested URL.
url } = function getRequestEvent(): RequestEvent<Partial<Record<string, string>>, string | null>Returns the current RequestEvent. Can be used inside server hooks, server load functions, actions, and endpoints (and functions called by them).
In environments without AsyncLocalStorage, this must be called synchronously (i.e. not after an await).
@since2.20.0getRequestEvent();

	// assume `locals.user` is populated in `handle`
	if (!const locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: User | undefineduser) {
		const const redirectTo: stringredirectTo = const url: URLThe requested URL.
url.URL.pathname: stringMDN Reference
pathname + const url: URLThe requested URL.
url.URL.search: stringMDN Reference
search;
		const const params: URLSearchParamsparams = new var URLSearchParams: new (init?: string[][] | Record<string, string> | string | URLSearchParams) => URLSearchParamsMDN Reference
URLSearchParams class is a global reference for import { URLSearchParams } from 'node:url'
https://nodejs.org/api/url.html#class-urlsearchparams
@sincev10.0.0URLSearchParams({ redirectTo: stringredirectTo });

		function redirect(status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number), location: string | URL): neverRedirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you’re not catching the thrown redirect, which would prevent SvelteKit from handling it.
Most common status codes:

303 See Other: redirect as a GET request (often used after a form POST request)
307 Temporary Redirect: redirect will keep the request method
308 Permanent Redirect: redirect will keep the request method, SEO will be transferred to the new page

See all redirect status codes
@paramstatus The HTTP status code. Must be in the range 300-308.@paramlocation The location to redirect to.@throwsRedirect This error instructs SvelteKit to redirect to the specified location.@throwsError If the provided status is invalid.redirect(307, `/login?${const params: URLSearchParamsparams}`);
	}

	return const locals: App.LocalsContains custom data that was added to the request within the server handle hook.
locals.App.Locals.user?: Useruser;
}
```

Now, you can call `requireLogin` in any `load` function (or [form action](form-actions), for example) to guarantee that the user is logged in:

+page.server

```
import { function requireLogin(): UserrequireLogin } from '$lib/server/auth';

export function function load(): {
    message: string;
}load() {
	const const user: Useruser = function requireLogin(): UserrequireLogin();

	// `user` is guaranteed to be a user object here, because otherwise
	// `requireLogin` would throw a redirect and we wouldn't get here
	return {
		message: stringmessage: `hello ${const user: Useruser.User.name: stringname}!`
	};
}
```

## Further reading[](#Further-reading)

*   [Tutorial: Loading data](/tutorial/kit/page-data)
*   [Tutorial: Errors and redirects](/tutorial/kit/error-basics)
*   [Tutorial: Advanced loading](/tutorial/kit/await-parent)

[Edit this page on GitHub](https://github.com/sveltejs/kit/edit/main/documentation/docs/20-core-concepts/20-load.md) [llms.txt](/docs/kit/load/llms.txt)

previous next

[Routing](/docs/kit/routing) [Form actions](/docs/kit/form-actions)