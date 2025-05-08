// Schema for get_documentation_snippet tool
const getDocumentationSnippetInputSchema = {
    type: "object",
    title: "DynamicDocumentationSnippetRetrieverInput",
    properties: {
        search_query: {
            type: "string",
            description: "Keywords or a phrase describing the documentation topic to search for (e.g., 'SvelteKit data loading', 'Tailwind CSS responsive design', 'flex justify').",
        },
        source: {
            type: "string",
            enum: ["sveltekit", "tailwindcss", "all"],
            default: "all",
            description: "Specify which documentation source to search: 'sveltekit', 'tailwindcss', or 'all'.",
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
export default getDocumentationSnippetInputSchema;
