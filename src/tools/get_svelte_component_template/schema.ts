// Schema for get_svelte_component_template tool

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

export default getSvelteComponentTemplateInputSchema;