<!--
  Svelte Alert components inspired by shadcn/ui.
  @prop variant: "default" | "destructive"
  @prop class: string (additional classes)
  @slot default - Alert content
  NOTE: This template expects a `cn`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let variant: "default" | "destructive" = "default";
  export let className: string = "";
  // Provide a fallback cn implementation if not injected
  function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }
</script>

<div
  role="alert"
  class={cn(
    // Base styles
    "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    // Variant styles
    variant === "default" && "bg-background text-foreground",
    variant === "destructive" && "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    className
  )}
>
  <slot />
</div>

<!--
  AlertTitle.svelte
  @prop class: string
  @slot default - Title content
-->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<h5 class={cn("mb-1 font-medium leading-none tracking-tight", class)}>
  <slot />
</h5>
-->

<!--
  AlertDescription.svelte
  @prop class: string
  @slot default - Description content
-->
<!--
<script lang="ts">
  export let class: string = "";
</script>
<div class={cn("text-sm [&_p]:leading-relaxed", class)}>
  <slot />
</div>
-->