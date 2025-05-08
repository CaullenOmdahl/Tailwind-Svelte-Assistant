// Schemas for explain_development_concept tool
export const explainDevelopmentConceptInputSchema = {
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
export const explainDevelopmentConceptOutputSchema = {
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
