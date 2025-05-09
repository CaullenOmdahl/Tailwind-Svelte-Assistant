// TypeScript interfaces for SvelteKit + Tailwind CSS setup instructions

export interface VersionInfo {
  svelte: string;
  tailwind: string;
}

export interface SetupStep {
  step: number;
  title: string;
  description: string;
  command?: string;
  filePath?: string;
  content?: string;
  language?: string;
  docRef?: string;
}

export const latestVersions: VersionInfo = {
  svelte: "latest",
  tailwind: "^4.1.5",
};

export const svelteKitWithTailwindSetupSteps: SetupStep[] = [
  {
    step: 1,
    title: "Initialize SvelteKit Project",
    description: "Create a new SvelteKit project using the official npm initializer.",
    command: "npm create svelte@latest my-app",
  },
  {
    step: 2,
    title: "Install Project Dependencies",
    description: "Navigate into your new project directory and install dependencies.",
    command: "cd my-app && npm install",
  },
  {
    step: 3,
    title: "Install Tailwind CSS and Related Dependencies",
    description: "Install Tailwind CSS, PostCSS, and Autoprefixer as development dependencies.",
    command: "npm install -D tailwindcss postcss autoprefixer",
  },
  {
    step: 4,
    title: "Initialize Tailwind CSS Configuration",
    description: "Generate Tailwind and PostCSS config files.",
    command: "npx tailwindcss init -p",
  },
  {
    step: 5,
    title: "Configure tailwind.config.js",
    description: "Update your tailwind.config.js to include paths to your Svelte components.",
    filePath: "tailwind.config.js",
    language: "javascript",
    content:
`/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
  },
  {
    step: 6,
    title: "Configure postcss.config.js",
    description: "Ensure your postcss.config.js includes Tailwind CSS and Autoprefixer plugins.",
    filePath: "postcss.config.js",
    language: "javascript",
    content:
`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`
  },
  {
    step: 7,
    title: "Configure src/app.css",
    description: "Add Tailwind's base, components, and utilities directives to your main CSS file.",
    filePath: "src/app.css",
    language: "css",
    content:
`@tailwind base;
@tailwind components;
@tailwind utilities;`
  }
];