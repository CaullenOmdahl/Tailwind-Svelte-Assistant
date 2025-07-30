# Routing

> Last updated: 2025-07-30T11:02:07.041Z
> Source: https://kit.svelte.dev/docs/routing

# Routing

## +page

### +page.svelte

A `+page.svelte` component defines a page of your app. By default, pages are rendered both on the server ([SSR](glossary#SSR)) for the initial request and in the browser ([CSR](glossary#CSR)) for subsequent navigation.

src/routes/+page

```
<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
```

src/routes/about/+page

```
<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
```

> SvelteKit uses `<a>` elements to navigate between routes, rather than a framework-specific `<Link>` component.

Pages can receive data from `load` functions via the `data` prop.

src/routes/blog/\[slug\]/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

> Legacy mode
> 
> `PageProps` was added in 2.16.0. In earlier versions, you had to type the `data` property manually with `PageData` instead, see [$types](#$types).
> 
> In Svelte 4, you’d use `export let data` instead.

### +page.js

Often, a page will need to load some data before it can be rendered. For this, we add a `+page.js` module that exports a `load` function:

src/routes/blog/\[slug\]/+page

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function function load({ params }: {
    params: any;
}): {
    title: string;
    content: string;
}@type{import('./$types').PageLoad}load({ params: anyparams }) {
	if (params: anyparams.slug === 'hello-world') {
		return {
			title: stringtitle: 'Hello world!',
			content: stringcontent: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

	function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(404, 'Not found');
}
```

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';
import type { type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad } from './$types';

export const const load: PageLoadload: type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type PageLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageLoad = ({ params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params }) => {
	if (params: Record<string, any>The parameters of the current page - e.g. for a route like /blog/[slug], a { slug: string } object
params.slug === 'hello-world') {
		return {
			title: stringtitle: 'Hello world!',
			content: stringcontent: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

	function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(404, 'Not found');
};
```

This function runs alongside `+page.svelte`, which means it runs on the server during server-side rendering and in the browser during client-side navigation. See [`load`](load) for full details of the API.

As well as `load`, `+page.js` can export values that configure the page’s behaviour:

-   `export const prerender = true` or `false` or `'auto'`
-   `export const ssr = true` or `false`
-   `export const csr = true` or `false`

You can find more information about these in [page options](page-options).

### +page.server.js

If your `load` function can only run on the server — for example, if it needs to fetch data from a database or you need to access private [environment variables]($env-static-private) like API keys — then you can rename `+page.js` to `+page.server.js` and change the `PageLoad` type to `PageServerLoad`.

src/routes/blog/\[slug\]/+page.server

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function function load(event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>): MaybePromise<void | Record<string, any>>@type{import('./$types').PageServerLoad}load({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) {
	const const post: {
    title: string;
    content: string;
}post = await const getPostFromDatabase: (slug: string) => {
    title: string;
    content: string;
}getPostFromDatabase(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug);

	if (const post: {
    title: string;
    content: string;
}post) {
		return const post: {
    title: string;
    content: string;
}post;
	}

	function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(404, 'Not found');
}
```

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';
import type { type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad } from './$types';

export const const load: PageServerLoadload: type PageServerLoad = (event: ServerLoadEvent<Record<string, any>, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>PageServerLoad = async ({ params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params }) => {
	const const post: {
    title: string;
    content: string;
}post = await const getPostFromDatabase: (slug: string) => {
    title: string;
    content: string;
}getPostFromDatabase(params: Record<string, any>The parameters of the current route - e.g. for a route like /blog/[slug], a { slug: string } object.
params.slug);

	if (const post: {
    title: string;
    content: string;
}post) {
		return const post: {
    title: string;
    content: string;
}post;
	}

	function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(404, 'Not found');
};
```

During client-side navigation, SvelteKit will load this data from the server, which means that the returned value must be serializable using [devalue](https://github.com/rich-harris/devalue). See [`load`](load) for full details of the API.

Like `+page.js`, `+page.server.js` can export [page options](page-options) — `prerender`, `ssr` and `csr`.

A `+page.server.js` file can also export _actions_. If `load` lets you read data from the server, `actions` let you write data _to_ the server using the `<form>` element. To learn how to use them, see the [form actions](form-actions) section.

## +error

If an error occurs during `load`, SvelteKit will render a default error page. You can customise this error page on a per-route basis by adding an `+error.svelte` file:

src/routes/blog/\[slug\]/+error

```
<script>
	import { page } from '$app/state';
</script>

<h1>{page.status}: {page.error.message}</h1>
```

```
<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status}: {page.error.message}</h1>
```

> Legacy mode
> 
> `$app/state` was added in SvelteKit 2.12. If you’re using an earlier version or are using Svelte 4, use `$app/stores` instead.

SvelteKit will ‘walk up the tree’ looking for the closest error boundary — if the file above didn’t exist it would try `src/routes/blog/+error.svelte` and then `src/routes/+error.svelte` before rendering the default error page. If _that_ fails (or if the error was thrown from the `load` function of the root `+layout`, which sits ‘above’ the root `+error`), SvelteKit will bail out and render a static fallback error page, which you can customise by creating a `src/error.html` file.

If the error occurs inside a `load` function in `+layout(.server).js`, the closest error boundary in the tree is an `+error.svelte` file _above_ that layout (not next to it).

If no route can be found (404), `src/routes/+error.svelte` (or the default error page, if that file does not exist) will be used.

> `+error.svelte` is _not_ used when an error occurs inside [`handle`](hooks#Server-hooks-handle) or a [+server.js](#server) request handler.

You can read more about error handling [here](errors).

## +layout

So far, we’ve treated pages as entirely standalone components — upon navigation, the existing `+page.svelte` component will be destroyed, and a new one will take its place.

But in many apps, there are elements that should be visible on _every_ page, such as top-level navigation or a footer. Instead of repeating them in every `+page.svelte`, we can put them in _layouts_.

### +layout.svelte

To create a layout that applies to every page, make a file called `src/routes/+layout.svelte`. The default layout (the one that SvelteKit uses if you don’t bring your own) looks like this...

```
<script>
	let { children } = $props();
</script>

{@render children()}
```

...but we can add whatever markup, styles and behaviour we want. The only requirement is that the component includes a `@render` tag for the page content. For example, let’s add a nav bar:

src/routes/+layout

```
<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
</nav>

{@render children()}
```

```
<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
</nav>

{@render children()}
```

If we create pages for `/`, `/about` and `/settings`...

src/routes/+page

```
<h1>Home</h1>
```

src/routes/about/+page

```
<h1>About</h1>
```

src/routes/settings/+page

```
<h1>Settings</h1>
```

...the nav will always be visible, and clicking between the three pages will only result in the `<h1>` being replaced.

Layouts can be _nested_. Suppose we don’t just have a single `/settings` page, but instead have nested pages like `/settings/profile` and `/settings/notifications` with a shared submenu (for a real-life example, see [github.com/settings](https://github.com/settings)).

We can create a layout that only applies to pages below `/settings` (while inheriting the root layout with the top-level nav):

src/routes/settings/+layout

```
<script>
	/** @type {import('./$types').LayoutProps} */
	let { data, children } = $props();
</script>

<h1>Settings</h1>

<div class="submenu">
	{#each data.sections as section}
		<a href="/settings/{section.slug}">{section.title}</a>
	{/each}
</div>

{@render children()}
```

```
<script lang="ts">
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<h1>Settings</h1>

<div class="submenu">
	{#each data.sections as section}
		<a href="/settings/{section.slug}">{section.title}</a>
	{/each}
</div>

{@render children()}
```

> Legacy mode
> 
> `LayoutProps` was added in 2.16.0. In earlier versions, you had to [type the properties manually instead](#$types).

You can see how `data` is populated by looking at the `+layout.js` example in the next section just below.

By default, each layout inherits the layout above it. Sometimes that isn’t what you want - in this case, [advanced layouts](advanced-routing#Advanced-layouts) can help you.

### +layout.js

Just like `+page.svelte` loading data from `+page.js`, your `+layout.svelte` component can get data from a [`load`](load) function in `+layout.js`.

src/routes/settings/+layout

```
/** @type {import('./$types').LayoutLoad} */
export function function load(): {
    sections: {
        slug: string;
        title: string;
    }[];
}@type{import('./$types').LayoutLoad}load() {
	return {
		sections: {
    slug: string;
    title: string;
}[]sections: [
			{ slug: stringslug: 'profile', title: stringtitle: 'Profile' },
			{ slug: stringslug: 'notifications', title: stringtitle: 'Notifications' }
		]
	};
}
```

```
import type { type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad } from './$types';

export const const load: LayoutLoadload: type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>
type LayoutLoad = (event: Kit.LoadEvent<Record<string, any>, Record<string, any> | null, Record<string, any>, string | null>) => MaybePromise<void | Record<string, any>>LayoutLoad = () => {
	return {
		sections: {
    slug: string;
    title: string;
}[]sections: [
			{ slug: stringslug: 'profile', title: stringtitle: 'Profile' },
			{ slug: stringslug: 'notifications', title: stringtitle: 'Notifications' }
		]
	};
};
```

If a `+layout.js` exports [page options](page-options) — `prerender`, `ssr` and `csr` — they will be used as defaults for child pages.

Data returned from a layout’s `load` function is also available to all its child pages:

src/routes/settings/profile/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	console.log(data.sections); // [{ slug: 'profile', title: 'Profile' }, ...]
</script>
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	console.log(data.sections); // [{ slug: 'profile', title: 'Profile' }, ...]
</script>
```

> Often, layout data is unchanged when navigating between pages. SvelteKit will intelligently rerun [`load`](load) functions when necessary.

### +layout.server.js

To run your layout’s `load` function on the server, move it to `+layout.server.js`, and change the `LayoutLoad` type to `LayoutServerLoad`.

Like `+layout.js`, `+layout.server.js` can export [page options](page-options) — `prerender`, `ssr` and `csr`.

## +server

As well as pages, you can define routes with a `+server.js` file (sometimes referred to as an ‘API route’ or an ‘endpoint’), which gives you full control over the response. Your `+server.js` file exports functions corresponding to HTTP verbs like `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `OPTIONS`, and `HEAD` that take a [`RequestEvent`](@sveltejs-kit#RequestEvent) argument and return a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

For example we could create an `/api/random-number` route with a `GET` handler:

src/routes/api/random-number/+server

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function function GET({ url }: {
    url: any;
}): Response@type{import('./$types').RequestHandler}GET({ url: anyurl }) {
	const const min: numbermin = var Number: NumberConstructor
(value?: any) => numberAn object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.
Number(url: anyurl.searchParams.get('min') ?? '0');
	const const max: numbermax = var Number: NumberConstructor
(value?: any) => numberAn object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.
Number(url: anyurl.searchParams.get('max') ?? '1');

	const const d: numberd = const max: numbermax - const min: numbermin;

	if (function isNaN(number: number): booleanReturns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
@paramnumber A numeric value.isNaN(const d: numberd) || const d: numberd < 0) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(400, 'min and max must be numbers, and min must be less than max');
	}

	const const random: numberrandom = const min: numbermin + var Math: MathAn intrinsic object that provides basic mathematics functionality and constants.
Math.Math.random(): numberReturns a pseudorandom number between 0 and 1.
random() * const d: numberd;

	return new var Response: new (body?: BodyInit | null, init?: ResponseInit) => ResponseThis Fetch API interface represents the response to a request.
MDN Reference
Response(var String: StringConstructor
(value?: any) => stringAllows manipulation and formatting of text strings and determination and location of substrings within strings.
String(const random: numberrandom));
}
```

```
import { function error(status: number, body: App.Error): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error } from '@sveltejs/kit';
import type { type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler } from './$types';

export const const GET: RequestHandlerGET: type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler = ({ url: URLThe requested URL.
url }) => {
	const const min: numbermin = var Number: NumberConstructor
(value?: any) => numberAn object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.
Number(url: URLThe requested URL.
url.URL.searchParams: URLSearchParamsMDN Reference
searchParams.URLSearchParams.get(name: string): string | nullReturns the first value associated to the given search parameter.
MDN Reference
get('min') ?? '0');
	const const max: numbermax = var Number: NumberConstructor
(value?: any) => numberAn object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.
Number(url: URLThe requested URL.
url.URL.searchParams: URLSearchParamsMDN Reference
searchParams.URLSearchParams.get(name: string): string | nullReturns the first value associated to the given search parameter.
MDN Reference
get('max') ?? '1');

	const const d: numberd = const max: numbermax - const min: numbermin;

	if (function isNaN(number: number): booleanReturns a Boolean value that indicates whether a value is the reserved value NaN (not a number).
@paramnumber A numeric value.isNaN(const d: numberd) || const d: numberd < 0) {
		function error(status: number, body?: {
    message: string;
} extends App.Error ? App.Error | string | undefined : never): never (+1 overload)Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking handleError.
Make sure you’re not catching the thrown error, which would prevent SvelteKit from handling it.
@paramstatus The HTTP status code. Must be in the range 400-599.@parambody An object that conforms to the App.Error type. If a string is passed, it will be used as the message property.@throwsHttpError This error instructs SvelteKit to initiate HTTP error handling.@throwsError If the provided status is invalid (not between 400 and 599).error(400, 'min and max must be numbers, and min must be less than max');
	}

	const const random: numberrandom = const min: numbermin + var Math: MathAn intrinsic object that provides basic mathematics functionality and constants.
Math.Math.random(): numberReturns a pseudorandom number between 0 and 1.
random() * const d: numberd;

	return new var Response: new (body?: BodyInit | null, init?: ResponseInit) => ResponseThis Fetch API interface represents the response to a request.
MDN Reference
Response(var String: StringConstructor
(value?: any) => stringAllows manipulation and formatting of text strings and determination and location of substrings within strings.
String(const random: numberrandom));
};
```

The first argument to `Response` can be a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), making it possible to stream large amounts of data or create server-sent events (unless deploying to platforms that buffer responses, like AWS Lambda).

You can use the [`error`](@sveltejs-kit#error), [`redirect`](@sveltejs-kit#redirect) and [`json`](@sveltejs-kit#json) methods from `@sveltejs/kit` for convenience (but you don’t have to).

If an error is thrown (either `error(...)` or an unexpected error), the response will be a JSON representation of the error or a fallback error page — which can be customised via `src/error.html` — depending on the `Accept` header. The [`+error.svelte`](#error) component will _not_ be rendered in this case. You can read more about error handling [here](errors).

> When creating an `OPTIONS` handler, note that Vite will inject `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers — these will not be present in production unless you add them.

> `+layout` files have no effect on `+server.js` files. If you want to run some logic before each request, add it to the server [`handle`](hooks#Server-hooks-handle) hook.

### Receiving data

By exporting `POST` / `PUT`/`PATCH`/`DELETE`/`OPTIONS`/`HEAD` handlers, `+server.js` files can be used to create a complete API:

src/routes/add/+page

```
<script>
	let a = 0;
	let b = 0;
	let total = 0;

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<input type="number" bind:value={a}> +
<input type="number" bind:value={b}> =
{total}

<button onclick={add}>Calculate</button>
```

```
<script lang="ts">
	let a = 0;
	let b = 0;
	let total = 0;

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<input type="number" bind:value={a}> +
<input type="number" bind:value={b}> =
{total}

<button onclick={add}>Calculate</button>
```

src/routes/api/add/+server

```
import { function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function function POST({ request }: {
    request: any;
}): Promise<Response>@type{import('./$types').RequestHandler}POST({ request: anyrequest }) {
	const { const a: anya, const b: anyb } = await request: anyrequest.json();
	return function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json(const a: anya + const b: anyb);
}
```

```
import { function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json } from '@sveltejs/kit';
import type { type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler } from './$types';

export const const POST: RequestHandlerPOST: type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler = async ({ request: RequestThe original request object.
request }) => {
	const { const a: anya, const b: anyb } = await request: RequestThe original request object.
request.Body.json(): Promise<any>MDN Reference
json();
	return function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json(const a: anya + const b: anyb);
};
```

> In general, [form actions](form-actions) are a better way to submit data from the browser to the server.

> If a `GET` handler is exported, a `HEAD` request will return the `content-length` of the `GET` handler’s response body.

### Fallback method handler

Exporting the `fallback` handler will match any unhandled request methods, including methods like `MOVE` which have no dedicated export from `+server.js`.

src/routes/api/add/+server

```
import { function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json, function text(body: string, init?: ResponseInit | undefined): ResponseCreate a Response object from the supplied body.
@parambody The value that will be used as-is.@paraminit Options such as status and headers that will be added to the response. A Content-Length header will be added automatically.text } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function function POST({ request }: {
    request: any;
}): Promise<Response>@type{import('./$types').RequestHandler}POST({ request: anyrequest }) {
	const { const a: anya, const b: anyb } = await request: anyrequest.json();
	return function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json(const a: anya + const b: anyb);
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function function fallback({ request }: {
    request: any;
}): Promise<Response>@type{import('./$types').RequestHandler}fallback({ request: anyrequest }) {
	return function text(body: string, init?: ResponseInit | undefined): ResponseCreate a Response object from the supplied body.
@parambody The value that will be used as-is.@paraminit Options such as status and headers that will be added to the response. A Content-Length header will be added automatically.text(`I caught your ${request: anyrequest.method} request!`);
}
```

```
import { function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json, function text(body: string, init?: ResponseInit | undefined): ResponseCreate a Response object from the supplied body.
@parambody The value that will be used as-is.@paraminit Options such as status and headers that will be added to the response. A Content-Length header will be added automatically.text } from '@sveltejs/kit';
import type { type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler } from './$types';

export const const POST: RequestHandlerPOST: type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler = async ({ request: RequestThe original request object.
request }) => {
	const { const a: anya, const b: anyb } = await request: RequestThe original request object.
request.Body.json(): Promise<any>MDN Reference
json();
	return function json(data: any, init?: ResponseInit | undefined): ResponseCreate a JSON Response object from the supplied data.
@paramdata The value that will be serialized as JSON.@paraminit Options such as status and headers that will be added to the response. Content-Type: application/json and Content-Length headers will be added automatically.json(const a: anya + const b: anyb);
};

// This handler will respond to PUT, PATCH, DELETE, etc.

export const const fallback: RequestHandlerfallback: type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>
type RequestHandler = (event: Kit.RequestEvent<Record<string, any>, string | null>) => MaybePromise<Response>RequestHandler = async ({ request: RequestThe original request object.
request }) => {
	return function text(body: string, init?: ResponseInit | undefined): ResponseCreate a Response object from the supplied body.
@parambody The value that will be used as-is.@paraminit Options such as status and headers that will be added to the response. A Content-Length header will be added automatically.text(`I caught your ${request: RequestThe original request object.
request.Request.method: stringReturns request’s HTTP method, which is “GET” by default.
MDN Reference
method} request!`);
};
```

> For `HEAD` requests, the `GET` handler takes precedence over the `fallback` handler.

### Content negotiation

`+server.js` files can be placed in the same directory as `+page` files, allowing the same route to be either a page or an API endpoint. To determine which, SvelteKit applies the following rules:

-   `PUT` / `PATCH`/`DELETE`/`OPTIONS` requests are always handled by `+server.js` since they do not apply to pages
-   `GET` / `POST`/`HEAD` requests are treated as page requests if the `accept` header prioritises `text/html` (in other words, it’s a browser page request), else they are handled by `+server.js`.
-   Responses to `GET` requests will include a `Vary: Accept` header, so that proxies and browsers cache HTML and JSON responses separately.

## $types

Throughout the examples above, we’ve been importing types from a `$types.d.ts` file. This is a file SvelteKit creates for you in a hidden directory if you’re using TypeScript (or JavaScript with JSDoc type annotations) to give you type safety when working with your root files.

For example, annotating `let { data } = $props()` with `PageProps` (or `LayoutProps`, for a `+layout.svelte` file) tells TypeScript that the type of `data` is whatever was returned from `load`:

src/routes/blog/\[slug\]/+page

```
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>
```

```
<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>
```

> The `PageProps` and `LayoutProps` types, added in 2.16.0, are a shortcut for typing the `data` prop as `PageData` or `LayoutData`, as well as other props, such as `form` for pages, or `children` for layouts. In earlier versions, you had to type these properties manually. For example, for a page:
> 
> +page
> 
> ```
> /** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
> let { let data: anydata, let form: anyform } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```
> 
> ```
> import type { import PageDataPageData, import ActionDataActionData } from './$types';
> 
> let { let data: PageDatadata, let form: ActionDataform }: { data: PageDatadata: import PageDataPageData, form: ActionDataform: import ActionDataActionData } = function $props(): any
> namespace $propsDeclares the props that a component accepts. Example:
> let { optionalProp = 42, requiredProp, bindableProp = $bindable() }: { optionalProp?: number; requiredProps: string; bindableProp: boolean } = $props();https://svelte.dev/docs/svelte/$props
> $props();
> ```
> 
> Or, for a layout:
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

In turn, annotating the `load` function with `PageLoad`, `PageServerLoad`, `LayoutLoad` or `LayoutServerLoad` (for `+page.js`, `+page.server.js`, `+layout.js` and `+layout.server.js` respectively) ensures that `params` and the return value are correctly typed.

If you’re using VS Code or any IDE that supports the language server protocol and TypeScript plugins then you can omit these types _entirely_! Svelte’s IDE tooling will insert the correct types for you, so you’ll get type checking without writing them yourself. It also works with our command line tool `svelte-check`.

You can read more about omitting `$types` in our [blog post](/blog/zero-config-type-safety) about it.

## Other files

Any other files inside a route directory are ignored by SvelteKit. This means you can colocate components and utility modules with the routes that need them.

If components and modules are needed by multiple routes, it’s a good idea to put them in [`$lib`]($lib).

## Further reading

-   [Tutorial: Routing](/tutorial/kit/pages)
-   [Tutorial: API routes](/tutorial/kit/get-handlers)
-   [Docs: Advanced routing](advanced-routing)

(https://github.com/sveltejs/kit/edit/main/documentation/docs/20-core-concepts/10-routing.md) [llms.txt](/docs/kit/routing/llms.txt)

(/docs/kit/web-standards) [Loading data](/docs/kit/load)

---
*This documentation was automatically generated from SvelteKit official documentation.*
