<!--
  Svelte Dialog components inspired by shadcn/ui.
  This is a structural template; you must implement dialog logic (open/close, focus trap, etc.) using a Svelte dialog library or custom logic.
  @prop open: boolean (controlled externally)
  @prop class: string (additional classes)
  @slot default - Dialog content
  NOTE: This template expects a `cn`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let open: boolean = false;
  export let className: string = "";
  // Provide a fallback cn implementation if not injected
  function cn(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
  }
</script>

{#if open}
  <div class={cn("fixed inset-0 z-50 bg-black/80", className)}></div>
  <div
    class={cn(
      "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className
    )}
    role="dialog"
    aria-modal="true"
  >
    <slot />
    <!--
      Add a close button as needed, e.g.:
      <button class="absolute right-4 top-4 ...">✕</button>
    -->
  </div>
{/if}

<!--
  DialogHeader.svelte, DialogFooter.svelte, DialogTitle.svelte, DialogDescription.svelte can be implemented as in the Card/Alert templates.
-->