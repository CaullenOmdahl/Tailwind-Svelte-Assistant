// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // 1. Global ignores & base ESLint rules
  {
    ignores: [
      "node_modules/",
      "dist/",
      "docs/",
      "eslint.config.js", // Ignoring itself
    ],
  },
  js.configs.recommended,

  // 2. TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked, // Apply type-checked rules
    ],
    languageOptions: {
      parserOptions: {
        project: true, // Use tsconfig.json in the root
        tsconfigRootDir: import.meta.dirname, // Ensures correct tsconfig path resolution
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      // Add any other TS-specific custom rules here
    },
  },

  // 3. JavaScript/MJS files configuration
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Make TS plugin available for rule overrides
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      // IMPORTANT: No parserOptions.project here for JS/MJS files
    },
    rules: {
      // Explicitly disable all type-aware rules for JS/MJS files
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-array-delete': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-mixed-enums': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/prefer-includes': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/require-array-sort-compare': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/unbound-method': 'off',
      // Add any other JS/MJS specific rules or overrides here
    },
  }
);