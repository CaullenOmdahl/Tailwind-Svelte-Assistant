// Handler for explain_development_concept tool
import { findMarkdownFiles, readFileContent } from "../../utils/index.js";
import { sveltekitDocsDir, tailwindcssDocsDir } from "../../config/index.js";
import { lexer } from "marked";
export function handleExplainDevelopmentConcept(args) {
    const { topic, framework = "all", detail_level = "short" } = args;
    const normalizedTopic = topic.trim().toLowerCase();
    let docDirs = [];
    if (framework === "sveltekit") {
        docDirs = [sveltekitDocsDir];
    }
    else if (framework === "tailwindcss") {
        docDirs = [tailwindcssDocsDir];
    }
    else {
        docDirs = [sveltekitDocsDir, tailwindcssDocsDir];
    }
    // Find all .md/.mdx files
    let files = [];
    for (const dir of docDirs) {
        files = files.concat(findMarkdownFiles(dir));
    }
    if (!files.length) {
        return {
            explanation: "",
            source_references: [],
            confidence_score: 0,
            error_message: "No documentation files found for the selected framework."
        };
    }
    // Try to find files with topic in filename or headings
    const topicWords = normalizedTopic.split(/\s+/).filter(Boolean);
    const topicRegex = new RegExp(topicWords.join(".*"), "i");
    let matchedFiles = files.filter(f => topicRegex.test(require("path").basename(f)));
    // If not enough matches, search headings in files
    if (matchedFiles.length < 2) {
        for (const file of files) {
            const content = readFileContent(file);
            if (content.match(new RegExp(`^#+\\s+.*${topicWords.join(".*")}.*`, "im"))) {
                matchedFiles.push(file);
            }
        }
        matchedFiles = [...new Set(matchedFiles)];
    }
    // If still not enough, search for topic in content
    if (matchedFiles.length < 2) {
        for (const file of files) {
            const content = readFileContent(file);
            if (content.toLowerCase().includes(normalizedTopic)) {
                matchedFiles.push(file);
            }
        }
        matchedFiles = [...new Set(matchedFiles)];
    }
    if (!matchedFiles.length) {
        return {
            explanation: "",
            source_references: [],
            confidence_score: 0,
            error_message: "Topic not found in documentation."
        };
    }
    // Use marked for Markdown parsing
    // Extract and synthesize content
    let explanationParts = [];
    let bestPracticeParts = [];
    let exampleParts = [];
    let usedFiles = [];
    let found = false;
    for (const file of matchedFiles.slice(0, 4)) {
        const content = readFileContent(file);
        if (!content)
            continue;
        usedFiles.push(file);
        // Parse Markdown/MDX: fallback to regex for MDX
        let tokens = [];
        if (file.endsWith(".md")) {
            tokens = lexer(content);
        }
        else {
            // Simple MDX: extract markdown blocks, ignore imports/exports
            const mdxContent = content.replace(/^[ \t]*(import|export)[^\n]*\n/gm, "");
            tokens = lexer(mdxContent);
        }
        // Find sections matching topic
        let inSection = false;
        let section = [];
        for (const token of tokens) {
            if (token.type === "heading" && token.text.toLowerCase().includes(normalizedTopic)) {
                inSection = true;
                section = [token.text];
                continue;
            }
            if (inSection && token.type === "heading") {
                // End of section
                break;
            }
            if (inSection) {
                if (token.type === "paragraph" || token.type === "text") {
                    section.push(token.text);
                }
                if (token.type === "code") {
                    section.push("```" + token.lang + "\n" + token.text + "\n```");
                }
                if (token.type === "list") {
                    section.push(token.items.map((i) => "- " + i.text).join("\n"));
                }
            }
        }
        if (section.length > 1) {
            explanationParts.push(section.join("\n\n"));
            found = true;
        }
        else {
            // Fallback: find first paragraph mentioning topic
            for (const token of tokens) {
                if ((token.type === "paragraph" || token.type === "text") && token.text.toLowerCase().includes(normalizedTopic)) {
                    explanationParts.push(token.text);
                    found = true;
                    break;
                }
            }
        }
        // Best practices: look for headings or paragraphs with "best practice"
        for (const token of tokens) {
            if (token.type === "heading" && /best practice/i.test(token.text)) {
                bestPracticeParts.push(token.text);
            }
            if ((token.type === "paragraph" || token.type === "text") && /best practice/i.test(token.text)) {
                bestPracticeParts.push(token.text);
            }
        }
        // Examples: look for code blocks or headings with "example"
        for (const token of tokens) {
            if (token.type === "heading" && /example/i.test(token.text)) {
                exampleParts.push(token.text);
            }
            if (token.type === "code") {
                exampleParts.push("```" + (token.lang || "") + "\n" + token.text + "\n```");
            }
        }
    }
    // Synthesize explanation
    let explanation = "";
    if (!found) {
        explanation = "The topic was found in documentation, but no clear section could be extracted.";
    }
    else {
        if (detail_level === "short") {
            explanation = explanationParts[0] || "";
        }
        else if (detail_level === "detailed") {
            explanation = explanationParts.concat(exampleParts).join("\n\n");
        }
        else if (detail_level === "best_practices") {
            explanation = explanationParts.concat(exampleParts, bestPracticeParts).join("\n\n");
        }
    }
    // Confidence: based on number of files and length
    let confidence = Math.min(1, (explanation.length / 500 + usedFiles.length * 0.2));
    if (!explanation.trim())
        confidence = 0;
    return {
        explanation,
        source_references: usedFiles,
        confidence_score: confidence,
        error_message: explanation.trim() ? "" : "Topic too vague or parsing failed."
    };
}
