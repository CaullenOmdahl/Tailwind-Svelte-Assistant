// Handler for get_documentation_snippet tool

import { findMarkdownFiles, readFileContent, extractSnippet, searchDocs } from "../../utils/index.js";
import { sveltekitDocsDir, tailwindcssDocsDir } from "../../config/index.js";

export function handleGetDocumentationSnippet(args: {
  search_query: string;
  source?: string;
  max_results?: number;
}) {
  const source = args.source || "all";
  const maxResults =
    typeof args.max_results === "number"
      ? Math.max(1, Math.min(10, args.max_results))
      : 3;
  let files: string[] = [];
  try {
    if (source === "sveltekit") {
      files = findMarkdownFiles(sveltekitDocsDir);
    } else if (source === "tailwindcss") {
      files = findMarkdownFiles(tailwindcssDocsDir);
    } else {
      files = [
        ...findMarkdownFiles(sveltekitDocsDir),
        ...findMarkdownFiles(tailwindcssDocsDir),
      ];
    }
  } catch (err: any) {
    return {
      error: {
        code: "FileSystemError",
        message: "Failed to read documentation files: " + (err.message || String(err)),
      },
    };
  }
  if (!files.length) {
    return {
      error: {
        code: "NoDocsFound",
        message: "No documentation files found for the selected source.",
      },
    };
  }
  try {
    const results = searchDocs(files, args.search_query, maxResults);
    return { results };
  } catch (err: any) {
    return {
      error: {
        code: "SearchError",
        message: "Failed to search documentation: " + (err.message || String(err)),
      },
    };
  }
}