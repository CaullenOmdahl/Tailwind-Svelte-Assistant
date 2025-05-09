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
      "@typescript-eslint/no-array-delete": "off",
      "@typescript-eslint/no-base-to-string": "off", // Added this line
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-for-in-array": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      "@typescript-eslint/require-array-sort-compare": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  }
);