// Central tool dispatcher and aggregator

import validateTailwindClassesInputSchema from "./validate_tailwind_classes/schema.js";
import { handleValidateTailwindClasses } from "./validate_tailwind_classes/handler.js";

import getDocumentationSnippetInputSchema from "./get_documentation_snippet/schema.js";
import { handleGetDocumentationSnippet } from "./get_documentation_snippet/handler.js";

import getSvelteComponentTemplateInputSchema from "./get_svelte_component_template/schema.js";
import { handleGetSvelteComponentTemplate } from "./get_svelte_component_template/handler.js";

import {
  explainDevelopmentConceptInputSchema,
  explainDevelopmentConceptOutputSchema
} from "./explain_development_concept/schema.js";
import { handleExplainDevelopmentConcept } from "./explain_development_concept/handler.js";

// Types for tool registry
type ToolDef = {
  name: string;
  description: string;
  inputSchema: unknown;
  outputSchema?: unknown;
};

export const TOOLS: ToolDef[] = [
  {
    name: "validate_tailwind_classes",
    description: "Validate a string of Tailwind CSS classes. Returns which classes are valid, invalid, and suggestions if available.",
    inputSchema: validateTailwindClassesInputSchema,
  },
  {
    name: "get_documentation_snippet",
    description: "Retrieve relevant documentation snippets from local SvelteKit and Tailwind CSS docs based on a search query. Specify the source and max results.",
    inputSchema: getDocumentationSnippetInputSchema,
  },
  {
    name: "get_svelte_component_template",
    description: "Retrieve a Svelte component template using Headless UI and Tailwind CSS for Menu (Dropdown), Dialog (Modal), Switch (Toggle), or shadcn/ui-inspired Button, Card, Alert, Dialog.",
    inputSchema: getSvelteComponentTemplateInputSchema,
  },
  {
    name: "explain_development_concept",
    description: "Explain a development concept or topic (e.g., 'reactivity', 'slot', 'utility-first CSS') using local SvelteKit and Tailwind CSS documentation. Returns a synthesized explanation, source references, and confidence score.",
    inputSchema: explainDevelopmentConceptInputSchema,
    outputSchema: explainDevelopmentConceptOutputSchema,
  }
];

// Main dispatcher
type ToolName =
  | "validate_tailwind_classes"
  | "get_documentation_snippet"
  | "get_svelte_component_template"
  | "explain_development_concept";

export function handleToolCall(
  tool: ToolName,
  args: unknown,
  context: {
    validTailwindClassesData?: import("../tailwind-class-validator.js").ValidTailwindClassesData;
    validTailwindClassesLoadError?: string;
  } = {}
): unknown {
  switch (tool) {
    case "validate_tailwind_classes":
      // Optionally validate args here
      return handleValidateTailwindClasses(
        args as { classes_string: string },
        context.validTailwindClassesData ?? { exactClasses: [], arbitraryValueStems: [], responsivePrefixes: [], statePrefixes: [], colorNames: [], colorShades: [] },
        context.validTailwindClassesLoadError ?? ""
      );
    case "get_documentation_snippet":
      return handleGetDocumentationSnippet(args as { search_query: string; source?: string; max_results?: number });
    case "get_svelte_component_template":
      return handleGetSvelteComponentTemplate(args as { component_name: string });
    case "explain_development_concept":
      return handleExplainDevelopmentConcept(args as { topic: string; framework?: string; detail_level?: string });
    default:
      return {
        error: {
          code: "UnknownTool",
          message: `Unknown tool: ${String(tool)}`,
        },
      };
  }
}