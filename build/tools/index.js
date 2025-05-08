// Central tool dispatcher and aggregator
import validateTailwindClassesInputSchema from "./validate_tailwind_classes/schema.js";
import { handleValidateTailwindClasses } from "./validate_tailwind_classes/handler.js";
import getDocumentationSnippetInputSchema from "./get_documentation_snippet/schema.js";
import { handleGetDocumentationSnippet } from "./get_documentation_snippet/handler.js";
import getSvelteComponentTemplateInputSchema from "./get_svelte_component_template/schema.js";
import { handleGetSvelteComponentTemplate } from "./get_svelte_component_template/handler.js";
import { explainDevelopmentConceptInputSchema, explainDevelopmentConceptOutputSchema } from "./explain_development_concept/schema.js";
import { handleExplainDevelopmentConcept } from "./explain_development_concept/handler.js";
export const TOOLS = [
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
export function handleToolCall(tool, args, context = {}) {
    switch (tool) {
        case "validate_tailwind_classes":
            // Optionally validate args here
            return handleValidateTailwindClasses(args, context.validTailwindClassesData ?? {}, context.validTailwindClassesLoadError ?? "");
        case "get_documentation_snippet":
            return handleGetDocumentationSnippet(args);
        case "get_svelte_component_template":
            return handleGetSvelteComponentTemplate(args);
        case "explain_development_concept":
            return handleExplainDevelopmentConcept(args);
        default:
            return {
                error: {
                    code: "UnknownTool",
                    message: `Unknown tool: ${tool}`,
                },
            };
    }
}
