#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content sources configuration
const CONTENT_SOURCES = {
  svelte: {
    type: 'llm-txt',
    url: 'https://svelte.dev/llms-full.txt',
    outputFile: 'svelte-sveltekit-full.txt',
    outputDir: path.join(__dirname, '..', 'content', 'docs')
  },
  tailwind: {
    type: 'repomix',
    repo: 'tailwindlabs/tailwindcss.com',
    include: 'src/**/*.mdx',  // Only documentation MDX files
    outputFile: 'tailwind-docs-full.txt',
    outputDir: path.join(__dirname, '..', 'content', 'docs')
  }
};

/**
 * Fetch and clean HTML content from a URL
 */
async function fetchContent(url) {
  try {
    console.log(`Fetching: ${url}`);
    
    // Try to import optional dependencies
    let axios, cheerio, TurndownService;
    
    try {
      // Import ESM modules
      const axiosModule = await import('axios');
      const cheerioModule = await import('cheerio');
      const turndownModule = await import('turndown');
      
      axios = axiosModule.default;
      cheerio = cheerioModule; // Use the whole cheerio module
      TurndownService = turndownModule.default;
      
      if (!axios || !cheerio || !TurndownService) {
        throw new Error('Dependencies not loaded properly');
      }
    } catch (error) {
      console.warn('Optional dependencies not available:', error.message);
      return null;
    }

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Tailwind-Svelte-Assistant-MCP-Server/0.1.1 (Documentation Update Bot)'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, footer, .sidebar, .navigation, .breadcrumb, .toc').remove();
    $('.left-sidebar, .right-sidebar, .nav-links, .site-nav').remove();
    
    let content;
    
    // SvelteKit specific selectors
    if (url.includes('svelte.dev/docs/kit')) {
      // Remove navigation and sidebar elements
      $('.sidebar, .nav, [role="navigation"]').remove();
      // Extract main content from SvelteKit docs
      content = $('.content').first().html() || $('main').first().html();
    }
    
    // Tailwind CSS specific selectors  
    if (url.includes('tailwindcss.com')) {
      // Remove Tailwind navigation
      $('.sidebar, .nav-container, .navigation').remove();
      // Extract main content from Tailwind docs
      content = $('[data-docs-content], .docs-content, main').first().html();
    }
    
    // Generic fallback
    if (!content) {
      content = $('main, .main-content, .content, article').first().html();
    }
    
    // Final fallback to body if no main content area found
    if (!content) {
      content = $('body').html();
    }

    if (!content) {
      console.warn('No content found for', url);
      return null;
    }

    // Clean up the content further
    const $content = cheerio.load(content);
    
    // Remove any remaining navigation elements
    $content('nav, .nav, .navigation, .breadcrumb, .toc, .table-of-contents').remove();
    $content('[role="navigation"], [class*="sidebar"], [class*="nav-"]').remove();
    
    // Get clean HTML
    const cleanContent = $content.html();

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      bulletListMarker: '-'
    });
    
    // Add custom rules to clean up conversion
    turndownService.addRule('removeEmptyElements', {
      filter: function (node) {
        return node.textContent.trim() === '' && !['img', 'br', 'hr'].includes(node.nodeName.toLowerCase());
      },
      replacement: function () {
        return '';
      }
    });
    
    const markdown = turndownService.turndown(cleanContent || '');
    
    return markdown;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Update LLM-optimized text file (for Svelte/SvelteKit)
 */
async function updateLLMDocs(source, config) {
  console.log(`\n📚 Updating ${source} LLM-optimized documentation...`);

  try {
    // Import axios
    const axiosModule = await import('axios');
    const axios = axiosModule.default;

    console.log(`Fetching: ${config.url}`);
    const response = await axios.get(config.url, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Tailwind-Svelte-Assistant-MCP-Server/0.1.1 (Documentation Update Bot)'
      }
    });

    // Ensure output directory exists
    await fs.mkdir(config.outputDir, { recursive: true });

    const filePath = path.join(config.outputDir, config.outputFile);

    // Add metadata header
    const fileContent = `# Svelte and SvelteKit Documentation (LLM-Optimized)

> Last updated: ${new Date().toISOString()}
> Source: ${config.url}
> Format: Official LLM-optimized text file from Svelte team
> Size: ${response.data.length.toLocaleString()} bytes

---

${response.data}

---
*This documentation was automatically downloaded from Svelte's official LLM-optimized format.*
*Maintained by: Svelte Team | Format: Plain text optimized for LLMs*
`;

    await fs.writeFile(filePath, fileContent, 'utf-8');
    console.log(`✅ Updated: ${config.outputFile} (${response.data.length.toLocaleString()} bytes)`);

  } catch (error) {
    console.error(`❌ Failed to update ${source}:`, error.message);
  }
}

/**
 * Update documentation files (for Tailwind - web scraping)
 */
async function updateDocs(source, config) {
  console.log(`\n📚 Updating ${source} documentation...`);

  // Ensure output directory exists
  await fs.mkdir(config.outputDir, { recursive: true });

  for (const topic of config.topics) {
    const url = `${config.baseUrl}${topic.url}`;
    const content = await fetchContent(url);

    if (content) {
      const filePath = path.join(config.outputDir, `${topic.name}.md`);

      // Clean up the markdown content
      let cleanContent = content
        // Remove unwanted text fragments
        .replace(/SvelteKitCore concepts/g, '')
        .replace(/v4\.1\s*⌘KCtrl K\[Docs\][^#]*/g, '') // Remove Tailwind navigation
        .replace(/Copyright © \d+ Tailwind Labs Inc\.[^#]*/g, '') // Remove copyright
        .replace(/previous next\s*\[[^\]]+\]/g, '') // Remove navigation links
        .replace(/\[Edit this page[^\]]+\]/g, '') // Remove edit links
        .replace(/### On this page[\s\S]*?(?=##|$)/g, '') // Remove table of contents
        // Clean up excessive newlines
        .replace(/\n{3,}/g, '\n\n')
        // Remove leftover fragments at start/end
        .trim();

      // Add metadata header
      const fileContent = `# ${topic.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

> Last updated: ${new Date().toISOString()}
> Source: ${url}

${cleanContent}

---
*This documentation was automatically generated from ${source} official documentation.*
`;

      await fs.writeFile(filePath, fileContent, 'utf-8');
      console.log(`✅ Updated: ${topic.name}.md`);
    } else {
      console.log(`❌ Failed to update: ${topic.name}.md`);
    }
  }
}

/**
 * Update component snippets from Tailwind UI examples
 */
async function updateSnippets() {
  console.log('\n🧩 Updating component snippets...');
  
  // For now, we'll just update timestamps on existing snippets
  // In a real implementation, you might scrape from Tailwind UI or other sources
  const snippetsDir = path.join(__dirname, '..', 'content', 'snippets');
  
  try {
    const categories = await fs.readdir(snippetsDir);
    
    for (const category of categories) {
      const categoryPath = path.join(snippetsDir, category);
      const stat = await fs.stat(categoryPath);
      
      if (stat.isDirectory()) {
        const snippets = await fs.readdir(categoryPath);
        
        for (const snippet of snippets) {
          if (snippet.endsWith('.svelte')) {
            const snippetPath = path.join(categoryPath, snippet);
            const content = await fs.readFile(snippetPath, 'utf-8');
            
            // Add/update comment with last updated timestamp
            const updatedContent = content.replace(
              /<!--\s*Last updated:.*?-->/,
              `<!-- Last updated: ${new Date().toISOString()} -->`
            );
            
            // If no timestamp comment exists, add one
            if (!content.includes('Last updated:')) {
              const finalContent = `<!-- Last updated: ${new Date().toISOString()} -->\n${content}`;
              await fs.writeFile(snippetPath, finalContent, 'utf-8');
            } else if (updatedContent !== content) {
              await fs.writeFile(snippetPath, updatedContent, 'utf-8');
            }
          }
        }
        
        console.log(`✅ Updated snippets in: ${category}`);
      }
    }
  } catch (error) {
    console.error('Error updating snippets:', error.message);
  }
}

/**
 * Generate content summary
 */
async function generateSummary() {
  console.log('\n📊 Generating content summary...');

  const contentDir = path.join(__dirname, '..', 'content');
  const summary = {
    lastUpdated: new Date().toISOString(),
    svelte: {
      type: CONTENT_SOURCES.svelte.type || 'llm-txt',
      format: 'Complete Svelte + SvelteKit documentation',
      files: []
    },
    tailwind: {
      type: CONTENT_SOURCES.tailwind.type || 'web-scraping',
      format: 'Tailwind CSS documentation',
      files: []
    },
    snippets: {
      categories: 0,
      totalSnippets: 0
    }
  };

  // Count Svelte/SvelteKit docs
  try {
    const docsFiles = await fs.readdir(path.join(contentDir, 'docs'));
    summary.svelte.files = docsFiles.filter(f => f.includes('svelte') && (f.endsWith('.txt') || f.endsWith('.md')));
  } catch (error) {
    console.warn('Could not read Svelte docs directory');
  }

  // Count Tailwind docs
  try {
    const docsFiles = await fs.readdir(path.join(contentDir, 'docs'));
    summary.tailwind.files = docsFiles.filter(f => f.includes('tailwind') && (f.endsWith('.txt') || f.endsWith('.md')));
  } catch (error) {
    console.warn('Could not read Tailwind docs directory');
  }
  
  // Count snippets
  try {
    const snippetsDir = path.join(contentDir, 'snippets');
    const categories = await fs.readdir(snippetsDir);
    
    let totalSnippets = 0;
    for (const category of categories) {
      const categoryPath = path.join(snippetsDir, category);
      const stat = await fs.stat(categoryPath);
      
      if (stat.isDirectory()) {
        const snippets = await fs.readdir(categoryPath);
        totalSnippets += snippets.filter(f => f.endsWith('.svelte')).length;
        summary.snippets.categories++;
      }
    }
    
    summary.snippets.totalSnippets = totalSnippets;
  } catch (error) {
    console.warn('Could not read snippets directory');
  }
  
  // Write summary file
  const summaryPath = path.join(contentDir, 'content-summary.json');
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');

  console.log('📋 Content Summary:');
  console.log(`   Svelte/SvelteKit: ${summary.svelte.files.length} files (${summary.svelte.type})`);
  console.log(`   Tailwind CSS: ${summary.tailwind.files.length} files (${summary.tailwind.type})`);
  console.log(`   Snippets: ${summary.snippets.totalSnippets} files in ${summary.snippets.categories} categories`);
}

/**
 * Update documentation from repomix CLI (for Tailwind from GitHub repo)
 */
async function updateRepomixDocs(source, config) {
  console.log(`\n📚 Updating ${source} documentation via repomix CLI...`);

  try {
    // Ensure output directory exists
    await fs.mkdir(config.outputDir, { recursive: true });

    const outputPath = path.join(config.outputDir, config.outputFile);
    const repoUrl = `https://github.com/${config.repo}`;

    console.log(`Repository: ${repoUrl}`);
    console.log(`Extracting files matching: ${config.include}`);
    console.log(`Output: ${outputPath}`);

    // Use repomix CLI
    const command = `npx repomix --remote ${repoUrl} --include "${config.include}" --output "${outputPath}"`;
    console.log(`Running: ${command}`);

    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024,  // 10MB buffer
      timeout: 120000  // 2 minute timeout
    });

    if (stdout) console.log(stdout);
    if (stderr && !stderr.includes('Downloading')) console.warn(stderr);

    // Check if file was created
    try {
      const stats = await fs.stat(outputPath);
      console.log(`✅ Updated: ${config.outputFile} (${stats.size.toLocaleString()} bytes)`);

      // Read the file and add metadata header
      const originalContent = await fs.readFile(outputPath, 'utf-8');

      const fileContent = `# Tailwind CSS Documentation (via Repomix)

> Last updated: ${new Date().toISOString()}
> Source: https://github.com/${config.repo}
> Method: Repomix CLI extraction
> Pattern: ${config.include}
> Size: ${originalContent.length.toLocaleString()} bytes

---

${originalContent}

---
*This documentation was automatically extracted from Tailwind CSS repository using Repomix.*
*Repository: ${config.repo} | Tool: repomix npm package*
`;

      await fs.writeFile(outputPath, fileContent, 'utf-8');
      return true;

    } catch (error) {
      console.error(`❌ Output file not created: ${error.message}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Failed to update ${source} via repomix CLI:`, error.message);
    if (error.stderr) console.error(`   stderr: ${error.stderr}`);
    console.error(`   Falling back to web scraping...`);
    return false;
  }
}

/**
 * Main update function
 */
async function updateContent() {
  console.log('🚀 Starting content update...');

  try {
    // Update Svelte/SvelteKit documentation (LLM-optimized file)
    if (CONTENT_SOURCES.svelte.type === 'llm-txt') {
      await updateLLMDocs('Svelte/SvelteKit', CONTENT_SOURCES.svelte);
    }

    // Update Tailwind documentation (via repomix or fallback to scraping)
    if (CONTENT_SOURCES.tailwind.type === 'repomix') {
      const success = await updateRepomixDocs('Tailwind CSS', CONTENT_SOURCES.tailwind);

      // Fallback to web scraping if repomix fails
      if (!success) {
        console.log('⚠️  Repomix failed, using web scraping fallback...');
        // Restore old scraping config for fallback
        const fallbackConfig = {
          baseUrl: 'https://tailwindcss.com/docs',
          outputDir: path.join(__dirname, '..', 'content', 'docs', 'tailwind'),
          topics: [
            { name: 'responsive-design', url: '/responsive-design' },
            { name: 'hover-focus-and-other-states', url: '/hover-focus-and-other-states' },
            { name: 'dark-mode', url: '/dark-mode' },
            { name: 'padding', url: '/padding' },
            { name: 'flex', url: '/flex' },
            { name: 'grid-template-columns', url: '/grid-template-columns' }
          ]
        };
        await updateDocs('Tailwind CSS', fallbackConfig);
      }
    } else {
      await updateDocs('Tailwind CSS', CONTENT_SOURCES.tailwind);
    }

    // Update snippets
    await updateSnippets();

    // Generate summary
    await generateSummary();

    console.log('\n✅ Content update completed successfully!');

  } catch (error) {
    console.error('\n❌ Content update failed:', error);
    process.exit(1);
  }
}

// Run the update if this script is executed directly
if (process.argv[1] === __filename) {
  updateContent();
}

export default updateContent;