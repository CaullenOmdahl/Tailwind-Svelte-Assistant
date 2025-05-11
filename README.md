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

## Future Enhancements (Ranked by Value for AAA Website Development)

To further elevate this MCP server's capability to assist in building top-tier, professional websites, the following enhancements are planned, ranked by their potential impact:

1.  **Advanced & Sophisticated Component Snippets:**
    *   **Goal:** Provide a rich library of complex, interactive, and visually polished UI elements commonly found on enterprise-grade websites.
    *   **Details:**
        *   **New Categories:** Data visualizations (charts, graphs), interactive tables (sortable, filterable), mega menus, multi-step forms/wizards, advanced modals, notification systems/toasts, loading skeletons, pricing tables, testimonial carousels, timelines.
        *   **Component Variants & Interactivity:** Offer multiple stylistic variants for components. Ensure all interactive elements have well-defined and professional-looking hover, focus, active, and disabled states. Include examples of subtle animations and transitions using Svelte's capabilities.

2.  **Theming, Branding & Design System Support:**
    *   **Goal:** Enable easy customization of snippets to align with strong, consistent visual identities, characteristic of professional branding.
    *   **Details:**
        *   **Themeable Snippets:** Design snippets using CSS custom properties and/or props for easy overriding of colors, typography, spacing, etc.
        *   **Tailwind Configuration Guidance:** Provide tools or documentation on extending `tailwind.config.js` for robust design systems (e.g., defining color palettes, typography scales, spacing units). Include `tailwind.config.js` snippets showcasing best practices.
        *   **Iconography:** Guidance and examples for integrating high-quality SVG icon sets (e.g., Heroicons, Feather Icons).

3.  **Accessibility (A11y) Excellence:**
    *   **Goal:** Ensure all provided resources contribute to building highly accessible websites, meeting WCAG standards and reflecting best practices.
    *   **Details:**
        *   **ARIA Best Practices:** All snippets built with proper ARIA attributes, semantic HTML, and keyboard navigation.
        *   **Accessibility Notes:** Include notes with snippets on key accessibility considerations and testing.
        *   **Focus Management Examples:** Snippets demonstrating robust focus management for interactive components.

4.  **Enhanced Layout & Structural Patterns:**
    *   **Goal:** Offer snippets for sophisticated page structures and responsive layouts that go beyond basic implementations.
    *   **Details:**
        *   **Complex Page Layouts:** Snippets for dashboard shells, multi-column layouts with sidebars, advanced landing page hero sections.
        *   **Advanced Responsive Design:** Examples of complex responsive patterns (e.g., responsive tables, adaptive navigation).

5.  **Content Presentation & Typography:**
    *   **Goal:** Provide resources for displaying content in a visually appealing, readable, and professional manner.
    *   **Details:**
        *   **Rich Typography Snippets:** Examples of well-structured text blocks, headings, lists, and blockquotes using Tailwind's typography plugin or custom typographic scales.
        *   **Image & Media Handling:** Snippets for responsive images, image galleries, video embeds with aspect ratio control.

6.  **Enhanced Snippet Metadata & Discoverability:**
    *   **Goal:** Make snippets easier to find, understand, and use effectively.
    *   **Details:**
        *   **Comprehensive Snippet Metadata:** Include descriptions, use cases, props (with types, defaults), emitted events, SvelteKit/Tailwind version requirements, accessibility notes, and theming guidance for each snippet.
        *   **Fuzzy Search:** Implement fuzzy search for documentation topics and snippet metadata (e.g., "find a card with an image and primary button").

7.  **Tooling for Professional Workflow (SvelteKit Best Practices):**
    *   **Goal:** Provide code patterns and components that demonstrate best practices for developing robust SvelteKit applications.
    *   **Details:** Snippets for advanced form handling, data loading patterns, custom Svelte store usage, or utility hook implementations.

8.  **Project Robustness & Maintainability:**
    *   **Goal:** Ensure the long-term stability and reliability of the MCP server itself.
    *   **Details:**
        *   More comprehensive error handling in the documentation scraping script.
        *   Automated testing for the MCP server's tools and content.
