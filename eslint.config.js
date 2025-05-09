// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // 1. Global ignores, applied to all configurations
  {
    ignores: [
      "node_modules/",
      "dist/",
      "docs/",
      // Optional: "eslint.config.js", // Good practice to ignore the ESLint config file itself
    ],
  },

  // 2. ESLint's recommended built-in rules
  // These will apply to .js, .mjs, .cjs files by default
  js.configs.recommended,

  // 3. TypeScript-specific linting rules.
  // `recommendedTypeChecked` is used because your original config specifies `project` for type-aware linting.
  // This spread includes configurations for the parser, plugin, and recommended TypeScript rules.
  // tseslint.config automatically scopes these to TS/TSX files.
  ...tseslint.configs.recommendedTypeChecked,

  // 4. Customizations for your project, specifically for TypeScript files
  // This object is merged by `tseslint.config()` and is now explicitly scoped to TypeScript files.
  {
    files: ["**/*.ts", "**/*.tsx"], // Ensures this block only applies to TypeScript files
    languageOptions: {
      // `ecmaVersion` and `sourceType` from your original `parserOptions`
      ecmaVersion: "latest",
      sourceType: "module",

      // `parserOptions` specific to TypeScript, including the project path
      parserOptions: {
        project: "./tsconfig.json",
        // If your eslint.config.js is not at the project root, or tsconfig.json has a different path/name,
        // you might need to set `tsconfigRootDir`. For example:
        // tsconfigRootDir: import.meta.dirname, // Assumes eslint.config.js is ESM and at project root
      },

      // `globals` from your original `env` settings
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Your custom rule from the original configuration
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Add any other TypeScript-specific rule overrides here
    },
  }
  // If you have JS-specific customizations (e.g., for .js or .mjs files) that are not covered by js.configs.recommended,
  // you can add another configuration object here, optionally with a `files` property like:
  // {
  //   files: ["**/*.js", "**/*.mjs"],
  //   languageOptions: { ... },
  //   rules: { ... }
  // }
);