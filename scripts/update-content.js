#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content sources configuration
const CONTENT_SOURCES = {
  sveltekit: {
    baseUrl: 'https://kit.svelte.dev/docs',
    outputDir: path.join(__dirname, '..', 'content', 'docs', 'sveltekit'),
    topics: [
      { name: 'routing', url: '/routing' },
      { name: 'load', url: '/load' },
      { name: 'form-actions', url: '/form-actions' },
      { name: 'hooks', url: '/hooks' }
    ]
  },
  tailwind: {
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
  }
};

/**
 * Fetch and clean HTML content from a URL
 */
async function fetchContent(url) {
  try {
    console.log(`Fetching: ${url}`);
    
    // Use dynamic import for optional dependencies
    const [{ default: axios }, { default: cheerio }, { default: TurndownService }] = await Promise.all([
      import('axios').catch(() => ({ default: null })),
      import('cheerio').catch(() => ({ default: null })),
      import('turndown').catch(() => ({ default: null }))
    ]);

    if (!axios || !cheerio || !TurndownService) {
      console.warn('Optional dependencies not available. Skipping content fetch.');
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
    $('script, style, nav, footer, .sidebar, .navigation, .breadcrumb').remove();
    
    // Extract main content area
    let content = $('main, .main-content, .content, article').first().html();
    
    // Fallback to body if no main content area found
    if (!content) {
      content = $('body').html();
    }

    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    
    const markdown = turndownService.turndown(content || '');
    
    return markdown;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Update documentation files
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
      
      // Add metadata header
      const fileContent = `# ${topic.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

> Last updated: ${new Date().toISOString()}
> Source: ${url}

${content}

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
    sveltekit: {
      topics: CONTENT_SOURCES.sveltekit.topics.length,
      files: []
    },
    tailwind: {
      topics: CONTENT_SOURCES.tailwind.topics.length, 
      files: []
    },
    snippets: {
      categories: 0,
      totalSnippets: 0
    }
  };
  
  // Count SvelteKit docs
  try {
    const svelteFiles = await fs.readdir(path.join(contentDir, 'docs', 'sveltekit'));
    summary.sveltekit.files = svelteFiles.filter(f => f.endsWith('.md'));
  } catch (error) {
    console.warn('Could not read SvelteKit docs directory');
  }
  
  // Count Tailwind docs
  try {
    const tailwindFiles = await fs.readdir(path.join(contentDir, 'docs', 'tailwind'));
    summary.tailwind.files = tailwindFiles.filter(f => f.endsWith('.md'));
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
  console.log(`   SvelteKit: ${summary.sveltekit.files.length} docs`);
  console.log(`   Tailwind: ${summary.tailwind.files.length} docs`);
  console.log(`   Snippets: ${summary.snippets.totalSnippets} files in ${summary.snippets.categories} categories`);
}

/**
 * Main update function
 */
async function updateContent() {
  console.log('🚀 Starting content update...');
  
  try {
    // Update documentation
    await updateDocs('SvelteKit', CONTENT_SOURCES.sveltekit);
    await updateDocs('Tailwind CSS', CONTENT_SOURCES.tailwind);
    
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