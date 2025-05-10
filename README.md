# Tailwind Svelte Assistant MCP Server

This project is a Model Context Protocol (MCP) server designed to assist with SvelteKit and Tailwind CSS development. It provides access to relevant documentation and common UI component snippets.

## Purpose

The server aims to be an "expert" resource for an AI assistant, providing:
-   Up-to-date documentation for SvelteKit core concepts.
-   Information on Tailwind CSS utility classes and concepts.
-   A library of ready-to-use Svelte component snippets styled with Tailwind CSS.

## Features

-   **Documentation Access:**
    -   SvelteKit documentation (scraped from official site).
    -   Tailwind CSS documentation (scraped from official site).
-   **Component Snippets:**
    -   A collection of common UI components (.svelte files).
-   **Content Discovery:**
    -   Tools to list available documentation topics and snippet categories/names.
-   **Configurable Scraping:**
    -   Documentation scraping is managed via `scripts/scraping-config.json`.

## Tools Provided

The MCP server exposes the following tools:

-   `get_sveltekit_doc`: Retrieves SvelteKit documentation for a given topic.
    -   Input: `{ "topic": "string" }` (e.g., "routing", "hooks")
-   `get_tailwind_info`: Retrieves Tailwind CSS information for a given query.
    -   Input: `{ "query": "string" }` (e.g., "padding", "flex")
-   `get_component_snippet`: Retrieves a Svelte component code snippet.
    -   Input: `{ "component_category": "string", "snippet_name": "string" }` (e.g., category "headers", name "simple-navbar")
-   `list_sveltekit_topics`: Lists available SvelteKit documentation topics.
-   `list_tailwind_info_topics`: Lists available Tailwind CSS documentation topics.
-   `list_snippet_categories`: Lists available snippet categories.
-   `list_snippets_in_category`: Lists snippets within a given category.
    -   Input: `{ "category": "string" }`

## Project Structure

-   `src/index.ts`: Main MCP server implementation.
-   `content/`: Contains the raw data served by the tools.
    -   `content/docs/sveltekit/`: Scraped SvelteKit documentation (Markdown files).
    -   `content/docs/tailwind/`: Scraped Tailwind CSS documentation (Markdown files).
    -   `content/snippets/`: Svelte component snippets, organized by category subdirectories.
-   `scripts/`: Utility scripts.
    -   `scripts/scrape-docs.mjs`: Node.js script to scrape documentation.
    -   `scripts/scraping-config.json`: Configuration for the scraping script.
-   `build/`: Compiled JavaScript output from TypeScript.
-   `package.json`: Project dependencies and scripts.
-   `tsconfig.json`: TypeScript configuration.

## Setup and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Build the Server:**
    ```bash
    npm run build
    ```
    This compiles the TypeScript code in `src/` to JavaScript in `build/`.

3.  **Populate Documentation (Optional but Recommended):**
    Run the scraping script to fetch the latest documentation:
    ```bash
    node scripts/scrape-docs.mjs
    ```
    You can customize which pages are scraped by editing `scripts/scraping-config.json`.

4.  **Configure with MCP Client:**
    Add the server to your MCP client's configuration file (e.g., `cline_mcp_settings.json`). The entry should look like this (adjust path if necessary):
    ```json
    {
      "mcpServers": {
        // ... other servers ...
        "tailwind-svelte-assistant": {
          "command": "node",
          "args": ["C:\\path\\to\\your\\project\\tailwind-svelte-assistant-mcp-server\\build\\index.js"],
          "env": {},
          "disabled": false,
          "autoApprove": []
        }
      }
    }
    ```
    Ensure the `args` path points to the `build/index.js` file in this project's directory. The MCP client system should automatically start the server. If you update the server code, rebuild it, and then you may need to toggle the `disabled` flag in the settings (true then false) or restart the MCP client to ensure the latest version is running.

## Adding Content

-   **New Documentation:**
    1.  Add new entries to `scripts/scraping-config.json` specifying the `siteName`, `baseURL`, `contentSelector`, `outputDir`, and `pages` (slugs).
    2.  Run `node scripts/scrape-docs.mjs`.
-   **New Snippets:**
    1.  Create a new `.svelte` file within an appropriate category subdirectory in `content/snippets/`. If the category doesn't exist, create the directory.
    2.  The server will automatically pick up new snippets based on the directory structure.

## Future Enhancements

-   Fuzzy search for documentation topics.
-   More comprehensive error handling in scraping script.
-   Metadata for snippets (description, props).
-   Automated testing.
