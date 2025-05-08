// MCP server entrypoint for Tailwind Svelte Assistant
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {
  validateTailwindClasses,
  ValidationOutput,
  ValidTailwindClassesData,
} from "./tailwind-class-validator";

// --- DynamicDocumentationSnippetRetriever: Helper functions and schema ---

// Input schema for get_documentation_snippet
const getDocumentationSnippetInputSchema = {
  type: "object",
  title: "DynamicDocumentationSnippetRetrieverInput",
  properties: {
    search_query: {
      type: "string",
      description:
        "Keywords or a phrase describing the documentation topic to search for (e.g., 'SvelteKit data loading', 'Tailwind CSS responsive design', 'flex justify').",
    },
    source: {
      type: "string",
      enum: ["sveltekit", "tailwindcss", "all"],
      default: "all",
      description:
        "Specify which documentation source to search: 'sveltekit', 'tailwindcss', or 'all'.",
    },
    max_results: {
      type: "integer",
      minimum: 1,
      maximum: 10,
      default: 3,
      description: "The maximum number of relevant snippets to return.",
    },
  },
  required: ["search_query"],
  additionalProperties: false,
};

// Documentation directories (relative to src/index.ts)
const sveltekitDocsDir = path.resolve(__dirname, "../docs/svelte/documentation/docs/");
const tailwindcssDocsDir = path.resolve(__dirname, "../docs/tailwindcss.com/src/docs/");

// Recursively find all .md/.mdx files in a directory
function findMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMarkdownFiles(fullPath));
    } else if (
      entry.isFile() &&
      (fullPath.endsWith(".md") || fullPath.endsWith(".mdx"))
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

// Read file content safely
function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

// Extract a snippet around the first match of the query (paragraph or ±3 lines)
function extractSnippet(content: string, query: string): string | null {
  const lcContent = content.toLowerCase();
  const lcQuery = query.toLowerCase();
  const idx = lcContent.indexOf(lcQuery);
  if (idx === -1) return null;

  // Try to extract the paragraph containing the match
  const before = content.lastIndexOf("\n\n", idx);
  const after = content.indexOf("\n\n", idx);
  if (before !== -1 && after !== -1) {
    return content.slice(before + 2, after).trim();
  }
  // Fallback: ±3 lines around the match
  const lines = content.split("\n");
  let lineNum = 0, charCount = 0;
  for (let i = 0; i < lines.length; ++i) {
    charCount += lines[i].length + 1;
    if (charCount > idx) {
      lineNum = i;
      break;
    }
  }
  const start = Math.max(0, lineNum - 3);
  const end = Math.min(lines.length, lineNum + 4);
  return lines.slice(start, end).join("\n").trim();
}

// Search for query in a list of files, return up to maxResults snippets
function searchDocs(files: string[], query: string, maxResults: number) {
  const results: { sourceFile: string; snippet: string; relevanceScore?: number }[] = [];
  for (const file of files) {
    const content = readFileContent(file);
    if (!content) continue;
    if (content.toLowerCase().includes(query.toLowerCase())) {
      const snippet = extractSnippet(content, query);
      if (snippet) {
        // Optional: simple relevance score (match count)
        const score =
          (content.match(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || [])
            .length;
        results.push({
          sourceFile: file,
          snippet,
          relevanceScore: score > 0 ? Math.min(1, score / 5) : undefined,
        });
        if (results.length >= maxResults) break;
      }
    }
  }
  return results;
}

// Tool input schema (from Architect)
const validateTailwindClassesInputSchema = {
  type: "object",
  title: "TailwindCSSClassValidatorInput",
  properties: {
    classes_string: {
      type: "string",
      description:
        "A string containing Tailwind CSS classes separated by spaces (e.g., 'text-red-500 font-bold md:text-lg invalid-class p-2 p-4 text-[12px]').",
    },
  },
  required: ["classes_string"],
  additionalProperties: false,
};

// Load valid Tailwind classes JSON at startup
let validTailwindClassesData: ValidTailwindClassesData | null = null;
let validTailwindClassesLoadError: string | null = null;
const VALID_CLASSES_FILENAME = "valid_tailwind_classes.json";

// Try to load from build directory (alongside compiled index.js)
const buildDir = path.resolve(__dirname, "../build");
const candidatePaths = [path.resolve(__dirname, "./valid_tailwind_classes.json")];

for (const candidate of candidatePaths) {
  try {
    if (fs.existsSync(candidate)) {
      const raw = fs.readFileSync(candidate, "utf8");
      validTailwindClassesData = JSON.parse(raw) as ValidTailwindClassesData;
      break;
    }
  } catch (err: any) {
    validTailwindClassesLoadError = `Failed to load valid Tailwind classes from ${candidate}: ${err.message}`;
  }
}
if (!validTailwindClassesData && !validTailwindClassesLoadError) {
  validTailwindClassesLoadError = `Could not find ${VALID_CLASSES_FILENAME} in build or src directory.`;
}

// Minimal MCP server implementation
import { createServer } from "http";

/**
 * Svelte component templates inspired by shadcn/ui.
 * Each is a multi-line string in .svelte format, with comments and prop JSDoc.
 * NOTE: These templates expect a utility like `cn` or `tailwind-merge` for class merging.
 */
const shadcnButtonSvelte = `<!--
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
  export let class: string = "";
  // You must provide a \`cn\` or tailwind-merge utility for class merging.
  // Example: import { cn } from 'tailwind-merge'
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
    class
  )}
  disabled={disabled}
>
  <slot />
</button>
`;

const shadcnCardSvelte = `<!--
  Svelte Card components inspired by shadcn/ui.
  @prop class: string (additional classes)
  @slot default - Card content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let class: string = "";
  // You must provide a \`cn\` or tailwind-merge utility for class merging.
</script>

<div class={cn("rounded-xl border bg-card text-card-foreground shadow", class)}>
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
`;

const shadcnAlertSvelte = `<!--
  Svelte Alert components inspired by shadcn/ui.
  @prop variant: "default" | "destructive"
  @prop class: string (additional classes)
  @slot default - Alert content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let variant: "default" | "destructive" = "default";
  export let class: string = "";
  // You must provide a \`cn\` or tailwind-merge utility for class merging.
</script>

<div
  role="alert"
  class={cn(
    // Base styles
    "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
    // Variant styles
    variant === "default" && "bg-background text-foreground",
    variant === "destructive" && "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    class
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
`;

const shadcnDialogSvelte = `<!--
  Svelte Dialog components inspired by shadcn/ui.
  This is a structural template; you must implement dialog logic (open/close, focus trap, etc.) using a Svelte dialog library or custom logic.
  @prop open: boolean (controlled externally)
  @prop class: string (additional classes)
  @slot default - Dialog content
  NOTE: This template expects a \`cn\`/tailwind-merge utility for merging classes.
-->

<script lang="ts">
  export let open: boolean = false;
  export let class: string = "";
  // You must provide a \`cn\` or tailwind-merge utility for class merging.
</script>

{#if open}
  <div class={cn("fixed inset-0 z-50 bg-black/80", class)}></div>
  <div
    class={cn(
      "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      class
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
`;

const getSvelteComponentTemplateInputSchema = {
  type: "object",
  title: "SvelteComponentTemplateRetrieverInput",
  properties: {
    component_name: {
      type: "string",
      enum: [
        "headlessui-menu",
        "headlessui-dialog",
        "headlessui-switch",
        "shadcn-button",
        "shadcn-card",
        "shadcn-alert",
        "shadcn-dialog"
      ],
      description: "The name of the Svelte Headless UI or shadcn/ui-inspired component template to retrieve."
    }
  },
  required: ["component_name"],
  additionalProperties: false
};

const explainDevelopmentConceptInputSchema = {
  type: "object",
  title: "ExplainDevelopmentConceptInput",
  properties: {
    topic: {
      type: "string",
      description: "The development concept or topic to explain (e.g., 'reactivity', 'utility-first CSS', 'slot', 'layout')."
    },
    framework: {
      type: "string",
      enum: ["sveltekit", "tailwindcss", "all"],
      default: "all",
      description: "Which framework to focus on: 'sveltekit', 'tailwindcss', or 'all'."
    },
    detail_level: {
      type: "string",
      enum: ["short", "detailed", "best_practices"],
      default: "short",
      description: "How detailed the explanation should be: 'short' (definition), 'detailed' (definition + examples), or 'best_practices' (include best practices)."
    }
  },
  required: ["topic"],
  additionalProperties: false
};

const explainDevelopmentConceptOutputSchema = {
  type: "object",
  title: "ExplainDevelopmentConceptOutput",
  properties: {
    explanation: {
      type: "string",
      description: "A synthesized explanation of the requested concept, formatted for readability."
    },
    source_references: {
      type: "array",
      items: { type: "string" },
      description: "List of documentation file paths used as sources."
    },
    confidence_score: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description: "Confidence score (0-1) for the accuracy and relevance of the explanation."
    },
    error_message: {
      type: "string",
      description: "Error message if the concept could not be explained, otherwise empty."
    }
  },
  required: ["explanation", "source_references", "confidence_score", "error_message"],
  additionalProperties: false
};

const TOOLS = [
  {
    name: "validate_tailwind_classes",
    description:
      "Validate a string of Tailwind CSS classes. Returns which classes are valid, invalid, and suggestions if available.",
    inputSchema: validateTailwindClassesInputSchema,
  },
  {
    name: "get_documentation_snippet",
    description:
      "Retrieve relevant documentation snippets from local SvelteKit and Tailwind CSS docs based on a search query. Specify the source and max results.",
    inputSchema: getDocumentationSnippetInputSchema,
  },
  {
    name: "get_svelte_component_template",
    description:
      "Retrieve a Svelte component template using Headless UI and Tailwind CSS for Menu (Dropdown), Dialog (Modal), Switch (Toggle), or shadcn/ui-inspired Button, Card, Alert, Dialog.",
    inputSchema: getSvelteComponentTemplateInputSchema,
  },
  {
    name: "explain_development_concept",
    description:
      "Explain a development concept or topic (e.g., 'reactivity', 'slot', 'utility-first CSS') using local SvelteKit and Tailwind CSS documentation. Returns a synthesized explanation, source references, and confidence score.",
    inputSchema: explainDevelopmentConceptInputSchema,
    outputSchema: explainDevelopmentConceptOutputSchema
  }
];

// --- Svelte Headless UI Templates ---

const HEADLESSUI_MENU_TEMPLATE = `<script>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/svelte';
  // State is managed internally by Headless UI
</script>

<Menu as="div" class="relative inline-block text-left">
  <div>
    <MenuButton class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
      Options
      <!-- Heroicon: chevron-down -->
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </MenuButton>
  </div>

  <!-- Use Transition component if available/desired -->
  <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div class="py-1">
      <MenuItem let:active>
        <a href="#account-settings" class="{active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm">Account settings</a>
      </MenuItem>
      <MenuItem let:active let:disabled={true}>
        <button type="button" class="{active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm {disabled ? 'opacity-50 cursor-not-allowed' : ''}" disabled={disabled}>
          Support (Disabled)
        </button>
      </MenuItem>
      <!-- Add more menu items as needed -->
    </div>
  </MenuItems>
</Menu>
`;

const HEADLESSUI_DIALOG_TEMPLATE = `<script>
  import { Dialog } from '@headlessui/svelte';
  let isOpen = false;
</script>

<button
  class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  on:click={() => isOpen = true}
>
  Open Dialog
</button>

<Dialog open={isOpen} on:close={() => isOpen = false} class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4">
    <Dialog.Overlay class="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6 z-20">
      <Dialog.Title class="text-lg font-medium text-gray-900">Modal Title</Dialog.Title>
      <Dialog.Description class="mt-2 text-sm text-gray-500">
        This is a modal dialog using Headless UI and Tailwind CSS.
      </Dialog.Description>
      <!-- Modal content goes here -->
      <div class="mt-4 flex justify-end">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
          on:click={() => isOpen = false}
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          on:click={() => isOpen = false}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</Dialog>
`;

const HEADLESSUI_SWITCH_TEMPLATE = `<script>
  import { Switch } from '@headlessui/svelte';
  let enabled = false;
</script>

<Switch
  checked={enabled}
  on:change={() => enabled = !enabled}
  class="{enabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
  <span class="sr-only">Enable notifications</span>
  <span
    class="{enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform"
  />
</Switch>
<!-- Optionally display state -->
<span class="ml-3 text-sm text-gray-700">{enabled ? 'Enabled' : 'Disabled'}</span>
`;

/**
 * Validates input arguments against a JSON schema.
 * Checks required fields, types, enums, and disallows extra properties.
 * @param schema - The JSON schema to validate against.
 * @param input - The input object to validate.
 * @throws Error if validation fails.
 */
function validateInputStrict(schema: any, input: any): void {
  if (typeof input !== "object" || input === null) {
    throw new Error("Input must be an object.");
  }
  // Check required fields
  if (Array.isArray(schema.required)) {
    for (const req of schema.required) {
      if (!(req in input)) {
        throw new Error(`Missing required field: ${req}`);
      }
    }
  }
  // Check types and enums
  for (const key in schema.properties) {
    const prop = schema.properties[key];
    const val = input[key];
    if (val === undefined) continue;
    if (prop.type && typeof val !== prop.type && !(prop.type === "integer" && Number.isInteger(val))) {
      throw new Error(`Field '${key}' must be of type ${prop.type}`);
    }
    if (prop.enum && !prop.enum.includes(val)) {
      throw new Error(`Field '${key}' must be one of: ${prop.enum.join(", ")}`);
    }
  }
  // Disallow additional properties
  if (schema.additionalProperties === false) {
    for (const key in input) {
      if (!(key in schema.properties)) {
        throw new Error(`Unexpected property: ${key}`);
      }
    }
  }
}

/**
 * Handles a tool call by validating input and executing the tool logic.
 * @param tool - The tool name.
 * @param args - The tool arguments.
 * @returns The tool result.
 */
function handleToolCall(tool: string, args: any): any {
  if (tool === "validate_tailwind_classes") {
    validateInputStrict(validateTailwindClassesInputSchema, args);
    if (!validTailwindClassesData) {
      return {
        error: {
          code: "DataUnavailable",
          message: validTailwindClassesLoadError || "Tailwind class data not loaded.",
        },
      };
    }
    try {
      return validateTailwindClasses(args.classes_string, validTailwindClassesData);
    } catch (err: any) {
      return {
        error: {
          code: "InternalError",
          message: "Validation failed: " + (err.message || String(err)),
        },
      };
    }
  }
  if (tool === "get_documentation_snippet") {
    validateInputStrict(getDocumentationSnippetInputSchema, args);
    const source = args.source || "all";
    const maxResults =
      typeof args.max_results === "number"
        ? Math.max(1, Math.min(10, args.max_results))
        : 3;
    let files: string[] = [];
    try {
      if (source === "sveltekit") {
        files = findMarkdownFiles(sveltekitDocsDir);
      } else if (source === "tailwindcss") {
        files = findMarkdownFiles(tailwindcssDocsDir);
      } else {
        files = [
          ...findMarkdownFiles(sveltekitDocsDir),
          ...findMarkdownFiles(tailwindcssDocsDir),
        ];
      }
    } catch (err: any) {
      return {
        error: {
          code: "FileSystemError",
          message: "Failed to read documentation files: " + (err.message || String(err)),
        },
      };
    }
    if (!files.length) {
      return {
        error: {
          code: "NoDocsFound",
          message: "No documentation files found for the selected source.",
        },
      };
    }
    try {
      const results = searchDocs(files, args.search_query, maxResults);
      return { results };
    } catch (err: any) {
      return {
        error: {
          code: "SearchError",
          message: "Failed to search documentation: " + (err.message || String(err)),
        },
      };
    }
  }
  // (removed duplicate get_tailwind_svelte_setup_instructions handler)
  if (tool === "get_svelte_component_template") {
    validateInputStrict(getSvelteComponentTemplateInputSchema, args);
    switch (args.component_name) {
      case "headlessui-menu":
        return { template: HEADLESSUI_MENU_TEMPLATE };
      case "headlessui-dialog":
        return { template: HEADLESSUI_DIALOG_TEMPLATE };
      case "headlessui-switch":
        return { template: HEADLESSUI_SWITCH_TEMPLATE };
      case "shadcn-button":
        return { template: shadcnButtonSvelte };
      case "shadcn-card":
        return { template: shadcnCardSvelte };
      case "shadcn-alert":
        return { template: shadcnAlertSvelte };
      case "shadcn-dialog":
        return { template: shadcnDialogSvelte };
      default:
        return {
          error: {
            code: "UnknownComponent",
            message: `Unknown component_name: ${args.component_name}`,
          },
        };
    }
  }
  if (tool === "explain_development_concept") {
    validateInputStrict(explainDevelopmentConceptInputSchema, args);
    const { topic, framework = "all", detail_level = "short" } = args;
    const normalizedTopic = topic.trim().toLowerCase();
    let docDirs: string[] = [];
    if (framework === "sveltekit") {
      docDirs = [sveltekitDocsDir];
    } else if (framework === "tailwindcss") {
      docDirs = [tailwindcssDocsDir];
    } else {
      docDirs = [sveltekitDocsDir, tailwindcssDocsDir];
    }
    // Find all .md/.mdx files
    let files: string[] = [];
    for (const dir of docDirs) {
      files = files.concat(findMarkdownFiles(dir));
    }
    if (!files.length) {
      return {
        explanation: "",
        source_references: [],
        confidence_score: 0,
        error_message: "No documentation files found for the selected framework."
      };
    }
    // Try to find files with topic in filename or headings
    const topicWords = normalizedTopic.split(/\s+/).filter(Boolean);
    const topicRegex = new RegExp(topicWords.join(".*"), "i");
    let matchedFiles = files.filter(f => topicRegex.test(path.basename(f)));
    // If not enough matches, search headings in files
    if (matchedFiles.length < 2) {
      for (const file of files) {
        const content = readFileContent(file);
        if (content.match(new RegExp(`^#+\\s+.*${topicWords.join(".*")}.*`, "im"))) {
          matchedFiles.push(file);
        }
      }
      matchedFiles = [...new Set(matchedFiles)];
    }
    // If still not enough, search for topic in content
    if (matchedFiles.length < 2) {
      for (const file of files) {
        const content = readFileContent(file);
        if (content.toLowerCase().includes(normalizedTopic)) {
          matchedFiles.push(file);
        }
      }
      matchedFiles = [...new Set(matchedFiles)];
    }
    if (!matchedFiles.length) {
      return {
        explanation: "",
        source_references: [],
        confidence_score: 0,
        error_message: "Topic not found in documentation."
      };
    }
    // Use marked for Markdown parsing
    // Extract and synthesize content
    let explanationParts: string[] = [];
    let bestPracticeParts: string[] = [];
    let exampleParts: string[] = [];
    let usedFiles: string[] = [];
    let found = false;
    for (const file of matchedFiles.slice(0, 4)) {
      const content = readFileContent(file);
      if (!content) continue;
      usedFiles.push(file);
      // Parse Markdown/MDX: fallback to regex for MDX
      let tokens: any[] = [];
      if (file.endsWith(".md")) {
        tokens = marked.lexer(content);
      } else {
        // Simple MDX: extract markdown blocks, ignore imports/exports
        const mdxContent = content.replace(/^[ \t]*(import|export)[^\n]*\n/gm, "");
        tokens = marked.lexer(mdxContent);
      }
      // Find sections matching topic
      let inSection = false;
      let section: string[] = [];
      for (const token of tokens) {
        if (token.type === "heading" && token.text.toLowerCase().includes(normalizedTopic)) {
          inSection = true;
          section = [token.text];
          continue;
        }
        if (inSection && token.type === "heading") {
          // End of section
          break;
        }
        if (inSection) {
          if (token.type === "paragraph" || token.type === "text") {
            section.push(token.text);
          }
          if (token.type === "code") {
            section.push("```" + token.lang + "\n" + token.text + "\n```");
          }
          if (token.type === "list") {
            section.push(token.items.map((i: any) => "- " + i.text).join("\n"));
          }
        }
      }
      if (section.length > 1) {
        explanationParts.push(section.join("\n\n"));
        found = true;
      } else {
        // Fallback: find first paragraph mentioning topic
        for (const token of tokens) {
          if ((token.type === "paragraph" || token.type === "text") && token.text.toLowerCase().includes(normalizedTopic)) {
            explanationParts.push(token.text);
            found = true;
            break;
          }
        }
      }
      // Best practices: look for headings or paragraphs with "best practice"
      for (const token of tokens) {
        if (token.type === "heading" && /best practice/i.test(token.text)) {
          bestPracticeParts.push(token.text);
        }
        if ((token.type === "paragraph" || token.type === "text") && /best practice/i.test(token.text)) {
          bestPracticeParts.push(token.text);
        }
      }
      // Examples: look for code blocks or headings with "example"
      for (const token of tokens) {
        if (token.type === "heading" && /example/i.test(token.text)) {
          exampleParts.push(token.text);
        }
        if (token.type === "code") {
          exampleParts.push("```" + (token.lang || "") + "\n" + token.text + "\n```");
        }
      }
    }
    // Synthesize explanation
    let explanation = "";
    if (!found) {
      explanation = "The topic was found in documentation, but no clear section could be extracted.";
    } else {
      if (detail_level === "short") {
        explanation = explanationParts[0] || "";
      } else if (detail_level === "detailed") {
        explanation = explanationParts.concat(exampleParts).join("\n\n");
      } else if (detail_level === "best_practices") {
        explanation = explanationParts.concat(exampleParts, bestPracticeParts).join("\n\n");
      }
    }
    // Confidence: based on number of files and length
    let confidence = Math.min(1, (explanation.length / 500 + usedFiles.length * 0.2));
    if (!explanation.trim()) confidence = 0;
    return {
      explanation,
      source_references: usedFiles,
      confidence_score: confidence,
      error_message: explanation.trim() ? "" : "Topic too vague or parsing failed."
    };
  }
  if (tool === "get_tailwind_svelte_setup_instructions") {
    // Accept svelte_version and tailwind_version, default to "latest"
    const svelteVersion = args.svelte_version || "latest";
    const tailwindVersion = args.tailwind_version || "latest";
    // Compose Markdown instructions
    const instructions = [
      `# SvelteKit + Tailwind CSS Setup Instructions`,
      ``,
      `These steps use **SvelteKit \`${svelteVersion}\`** and **Tailwind CSS \`${tailwindVersion}\`**.`,
      ``,
      `## 1. Create a new SvelteKit project`,
      ``,
      "```bash",
      `npm create svelte@${svelteVersion === "latest" ? "latest" : svelteVersion} my-app`,
      "cd my-app",
      "npm install",
      "```",
      ``,
      `## 2. Install Tailwind CSS, PostCSS, and Autoprefixer`,
      ``,
      "```bash",
      `npm install -D tailwindcss@${tailwindVersion === "latest" ? "latest" : tailwindVersion} postcss autoprefixer`,
      "```",
      ``,
      `## 3. Initialize Tailwind CSS config`,
      ``,
      "```bash",
      "npx tailwindcss init -p",
      "```",
      ``,
      `## 4. Configure \`tailwind.config.js\``,
      ``,
      `Edit \`tailwind.config.js\` to include all Svelte files in the \`content\` array:`,
      "",
      "```js",
      "export default {",
      "  content: [",
      "    './src/**/*.{html,js,svelte,ts}'",
      "  ],",
      "  theme: {",
      "    extend: {},",
      "  },",
      "  plugins: [],",
      "}",
      "```",
      ``,
      `## 5. Create a root CSS file with Tailwind directives`,
      ``,
      `Create \`src/app.css\` with:`,
      "",
      "```css",
      "@tailwind base;",
      "@tailwind components;",
      "@tailwind utilities;",
      "```",
      ``,
      `## 6. Import the CSS file in your SvelteKit layout`,
      ``,
      `Edit \`src/routes/+layout.svelte\` and add:`,
      "",
      "```svelte",
      "<script>",
      "  import '../app.css';",
      "</script>",
      "",
      "<slot />",
      "```",
      ``,
      `## 7. Use Tailwind classes in your Svelte components`,
      ``,
      `Example (\`src/routes/+page.svelte\`):`,
      "",
      "```svelte",
      "<h1 class=\"text-3xl font-bold text-blue-600\">Hello Tailwind + SvelteKit!</h1>",
      "```",
      ``,
      `You're now ready to use Tailwind CSS in your SvelteKit project!`,
    ].join("\n");
    return { instructions };
  }
  return {
    error: {
      code: "UnknownTool",
      message: `Unknown tool: ${tool}`,
    },
  };
}

// Simple HTTP API for MCP protocol (POST /call-tool, GET /list-tools)
const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/list-tools") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ tools: TOOLS }));
    return;
  }
  if (req.method === "POST" && req.url === "/call-tool") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { tool, args } = JSON.parse(body);
        const result = handleToolCall(tool, args);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ result }));
      } catch (err: any) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Tailwind Svelte Assistant MCP server running on port ${PORT}` +
      (validTailwindClassesLoadError
        ? ` (WARNING: ${validTailwindClassesLoadError})`
        : "")
  );
});