<!--
  Svelte Card components inspired by shadcn/ui.
  @prop class: string (additional classes)
  @slot default - Card content
  NOTE: This template expects a `cn`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let className: string = "";
  // Provide a fallback cn implementation if not injected
  function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }
</script>

<div class={cn("rounded-xl border bg-card text-card-foreground shadow", className)}>
  <slot />
</div>

<!--
  CardHeader, CardTitle, CardDescription, CardContent, CardFooter subcomponents:
-->

<!-- CardHeader.svelte -->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("flex flex-col space-y-1.5 p-6", class)}>
  <slot />
</div>
-->

<!-- CardTitle.svelte -->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("font-semibold leading-none tracking-tight", class)}>
  <slot />
</div>
-->

<!-- CardDescription.svelte -->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("text-sm text-muted-foreground", class)}>
  <slot />
</div>
-->

<!-- CardContent.svelte -->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("p-6 pt-0", class)}>
  <slot />
</div>
-->

<!-- CardFooter.svelte -->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("flex items-center p-6 pt-0", class)}>
  <slot />
</div>
-->