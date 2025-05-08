# Tailwind Svelte Assistant MCP Server

## Overview

The Tailwind Svelte Assistant MCP Server is a modular Multi-Capability Provider (MCP) server designed to assist AI agents and developer tools with SvelteKit and Tailwind CSS development workflows. It provides programmatic access to setup instructions, component templates, Tailwind class validation, and documentation snippets, streamlining the development process for Svelte and Tailwind-based projects.

## Features

- **Automated Setup Guidance:** Get step-by-step instructions for integrating Tailwind CSS with SvelteKit.
- **Component Template Generation:** Retrieve ready-to-use Svelte component templates, including variants inspired by Headless UI and shadcn/ui.
- **Tailwind Class Validation:** Validate Tailwind CSS classes and variants for correctness and compatibility.
- **Documentation Snippet Retrieval:** Extract raw documentation snippets from local sources for reference or explanation.
- **Concept Explanation:** Parse and explain development concepts using local documentation.

## Documentation Sources

This server relies on local clones of the following documentation projects, all located in the `docs/` directory:

- **SvelteKit** (`docs/svelte/`)
- **Tailwind CSS** (`docs/tailwindcss.com/`)
- **Headless UI** (`docs/headlessui/`)
- **shadcn/ui** (`docs/ui/`)

The script [`scripts/generate-tailwind-data.mjs`](scripts/generate-tailwind-data.mjs) processes these sources to generate data used by the server's tools.

> **Important Note:**  
> The subdirectories within `docs/` (such as `docs/svelte/`, `docs/tailwindcss.com/`, `docs/headlessui/`, and `docs/ui/`) are cloned Git repositories and are treated as **read-only** by the MCP server tools.  
>  
> **Do not** use MCP server tools to write to or modify any files within these documentation sub-repositories.  
>  
> To update these documentation sources, navigate into the respective subdirectory and run `git pull` to fetch the latest changes from their upstream repositories.

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm, pnpm, or yarn

### Installation Steps

1. **Clone the repository** (if not already done):

   ```sh
   git clone https://github.com/your-org/tailwind-svelte-assistant-mcp-server.git
   cd tailwind-svelte-assistant-mcp-server
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

   > Key dependencies: `marked`, `clsx`, `tailwind-merge`

3. **Build the project:**

   ```sh
   npm run build
   ```

   This runs [`scripts/generate-tailwind-data.mjs`](scripts/generate-tailwind-data.mjs) and then compiles TypeScript sources.

## Running the Server

After building, start the MCP server with:

```sh
node build/index.js
```

> Typically, this is managed by an MCP client/runner. The server is intended for integration into environments that support the MCP protocol.

## Available Tools (Detailed)

- **`get_tailwind_svelte_setup_instructions`**  
  Provides step-by-step instructions for setting up Tailwind CSS with SvelteKit.

- **`get_svelte_component_template`**  
  Returns Svelte component templates. Supports basic, Headless UI-inspired, and shadcn/ui-inspired variants.

- **`validate_tailwind_classes`**  
  Validates Tailwind CSS classes and variants, ensuring correctness and compatibility.

- **`get_documentation_snippet`**  
  Retrieves raw documentation snippets from local SvelteKit, Tailwind CSS, Headless UI, or shadcn/ui docs.

- **`explain_development_concept`**  
  Explains Svelte, Tailwind, or UI development concepts by parsing and summarizing local documentation.

## Contributing & Development

The codebase is modular, with tools located in [`src/tools/`](src/tools/), templates in [`src/templates/`](src/templates/), and utility code in [`src/utils/`](src/utils/). Contributions are welcome—please ensure changes are well-tested and documented.