// shadcn-ui Svelte component metadata (auto-generated)

export interface PropMeta {
  name: string;
  type: string;
  defaultValue?: any;
  description?: string;
}

export interface SlotMeta {
  name?: string;
  description?: string;
  props?: Record<string, string>;
}

export interface RelatedFile {
  path: string;
  content: string;
  language: string;
}

export interface ComponentMeta {
  name: string;
  type: "shadcn-ui-svelte";
  sourceFilePath: string;
  code: string;
  props: PropMeta[];
  slots: SlotMeta[];
  description?: string;
  dependencies?: string[];
  relatedFiles?: RelatedFile[];
}

export const shadcnUiSvelteComponents: ComponentMeta[] = [
  {
    name: "Button",
    type: "shadcn-ui-svelte",
    sourceFilePath: "src/templates/shadcn-button.svelte",
    code: `<!--
  Svelte Button component inspired by shadcn/ui.
  @prop variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  @prop size: "default" | "sm" | "lg" | "icon"
  @prop disabled: boolean
  @prop type: "button" | "submit" | "reset"
  @prop class: string (additional classes)
  @slot default - Button content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
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
`,
    props: [
      {
        name: "variant",
        type: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`,
        defaultValue: "default",
        description: "Visual style variant"
      },
      {
        name: "size",
        type: `"default" | "sm" | "lg" | "icon"`,
        defaultValue: "default",
        description: "Button size"
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        description: "Disable the button"
      },
      {
        name: "type",
        type: `"button" | "submit" | "reset"`,
        defaultValue: "button",
        description: "Button type attribute"
      },
      {
        name: "className",
        type: "string",
        defaultValue: "",
        description: "Additional classes"
      }
    ],
    slots: [
      {
        name: "default",
        description: "Button content"
      }
    ],
    description: "Svelte Button component inspired by shadcn/ui.",
    dependencies: ["tailwind-merge"],
    relatedFiles: []
  },
  {
    name: "Card",
    type: "shadcn-ui-svelte",
    sourceFilePath: "src/templates/shadcn-card.svelte",
    code: `<!--
  Svelte Card components inspired by shadcn/ui.
  @prop class: string (additional classes)
  @slot default - Card content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
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
`,
    props: [
      {
        name: "className",
        type: "string",
        defaultValue: "",
        description: "Additional classes"
      }
    ],
    slots: [
      {
        name: "default",
        description: "Card content"
      }
    ],
    description: "Svelte Card component inspired by shadcn/ui. Includes subcomponent templates as comments.",
    dependencies: ["tailwind-merge"],
    relatedFiles: []
  },
  {
    name: "Alert",
    type: "shadcn-ui-svelte",
    sourceFilePath: "src/templates/shadcn-alert.svelte",
    code: `<!--
  Svelte Alert components inspired by shadcn/ui.
  @prop variant: "default" | "destructive"
  @prop class: string (additional classes)
  @slot default - Alert content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
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
`,
    props: [
      {
        name: "variant",
        type: `"default" | "destructive"`,
        defaultValue: "default",
        description: "Visual style variant"
      },
      {
        name: "className",
        type: "string",
        defaultValue: "",
        description: "Additional classes"
      }
    ],
    slots: [
      {
        name: "default",
        description: "Alert content"
      }
    ],
    description: "Svelte Alert component inspired by shadcn/ui. Includes subcomponent templates as comments.",
    dependencies: ["tailwind-merge"],
    relatedFiles: []
  },
  {
    name: "Dialog",
    type: "shadcn-ui-svelte",
    sourceFilePath: "src/templates/shadcn-dialog.svelte",
    code: `<!--
  Svelte Dialog components inspired by shadcn/ui.
  This is a structural template; you must implement dialog logic (open/close, focus trap, etc.) using a Svelte dialog library or custom logic.
  @prop open: boolean (controlled externally)
  @prop class: string (additional classes)
  @slot default - Dialog content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
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
`,
    props: [
      {
        name: "open",
        type: "boolean",
        defaultValue: false,
        description: "Dialog open state (controlled externally)"
      },
      {
        name: "className",
        type: "string",
        defaultValue: "",
        description: "Additional classes"
      }
    ],
    slots: [
      {
        name: "default",
        description: "Dialog content"
      }
    ],
    description: "Svelte Dialog component inspired by shadcn/ui. Structural only; dialog logic must be implemented externally.",
    dependencies: ["tailwind-merge"],
    relatedFiles: []
  }
];