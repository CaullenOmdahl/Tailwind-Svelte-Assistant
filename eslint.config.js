// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // 1. Global ignores
  {
    ignores: [
      "node_modules/",
      "dist/",
      "docs/",
      "eslint.config.js",
    ],
  },

  // 2. ESLint's recommended built-in rules
  js.configs.recommended,

  // 3. TypeScript-specific linting rules (scoped by tseslint.config)
  ...tseslint.configs.recommendedTypeChecked,

  // 4. Customizations for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        // tsconfigRootDir: import.meta.dirname, // Uncomment if needed
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Add other TypeScript-specific rule overrides here
    },
  },

  // 5. Override for JS/MJS files: disable type-aware rules
  {
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      "@typescript-eslint/await-thenable": "off",
      // Add other type-aware rules to disable here if needed
      // For example, if other @typescript-eslint rules cause issues on JS:
      // "@typescript-eslint/no-unsafe-argument": "off",
      // "@typescript-eslint/no-unsafe-assignment": "off",
      // "@typescript-eslint/no-unsafe-call": "off",
      // "@typescript-eslint/no-unsafe-member-access": "off",
      // "@typescript-eslint/no-floating-promises": "off",
      // "@typescript-eslint/no-misused-promises": "off",
      // "@typescript-eslint/restrict-template-expressions": "off"
    },
  }
);