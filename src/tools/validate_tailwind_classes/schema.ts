// Schema for validate_tailwind_classes tool

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

export default validateTailwindClassesInputSchema;