<!--
  Svelte Button component inspired by shadcn/ui.
  @prop variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  @prop size: "default" | "sm" | "lg" | "icon"
  @prop disabled: boolean
  @prop type: "button" | "submit" | "reset"
  @prop class: string (additional classes)
  @slot default - Button content
  NOTE: This template expects a `cn`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" = "default";
  export let size: "default" | "sm" | "lg" | "icon" = "default";
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";
  export let className: string = "";

  // Provide a fallback cn implementation if not injected
  // Replace this with your own import if available
  function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }
</script>

<button
  type={type}
  class={cn(
    // Base styles
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    // Variant styles
    variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    variant === "destructive" && "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    variant === "outline" && "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    variant === "secondary" && "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
    variant === "link" && "text-primary underline-offset-4 hover:underline",
    // Size styles
    size === "default" && "h-9 px-4 py-2",
    size === "sm" && "h-8 rounded-md px-3 text-xs",
    size === "lg" && "h-10 rounded-md px-8",
    size === "icon" && "h-9 w-9",
    className
  )}
  disabled={disabled}
>
  <slot />
</button>