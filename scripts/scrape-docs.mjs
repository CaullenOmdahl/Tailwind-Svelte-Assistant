import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Turndown service
const turndownService = new TurndownService({
  headingStyle: 'atx', // Use '#' for headings
  codeBlockStyle: 'fenced', // Use '```' for code blocks
});

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path for all documentation output
const DOCS_BASE_OUTPUT_PATH = path.join(__dirname, '..', 'content', 'docs');

/**
 * Scrapes a webpage, extracts main content, converts to Markdown, and saves it.
 * @param {string} url - The URL to scrape.
 * @param {string} outputPath - The directory to save the Markdown file.
 * @param {string} contentSelector - Cheerio selector for the main content area.
 * @param {string} filename - The name of the output Markdown file (without .md extension).
 * @param {string} siteName - A friendly name for the site being scraped (for logging).
 */
async function scrapeAndSave(url, outputPath, contentSelector, filename, siteName) {
  console.log(`Scraping ${siteName} page: ${filename} from ${url}`);
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const mainContentHtml = $(contentSelector).html();

    if (!mainContentHtml) {
      console.error(`Could not find content with selector "${contentSelector}" on ${url}`);
      return;
    }

    const markdown = turndownService.turndown(mainContentHtml);
    const filePath = path.join(outputPath, `${filename}.md`);

    await fs.mkdir(outputPath, { recursive: true }); // Ensure directory exists
    await fs.writeFile(filePath, markdown, 'utf-8');
    console.log(`Successfully saved ${siteName} doc: ${filename}.md to ${filePath}`);

  } catch (error) {
    console.error(`Error scraping ${siteName} page ${filename} from ${url}:`, error.message || error);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
    }
  }
}

async function main() {
  console.log("Starting documentation scraping process...");

  const configFile = await fs.readFile(path.join(__dirname, 'scraping-config.json'), 'utf-8');
  const config = JSON.parse(configFile);

  for (const site of config.sites) {
    console.log(`\nProcessing site: ${site.siteName}`);
    const siteOutputPath = path.join(DOCS_BASE_OUTPUT_PATH, site.outputDir);
    
    for (const pageSlug of site.pages) {
      const pageUrl = site.baseURL + pageSlug;
      await scrapeAndSave(
        pageUrl,
        siteOutputPath,
        site.contentSelector,
        pageSlug,
        site.siteName
      );
    }
  }

  console.log("\nDocumentation scraping process finished.");
}

main().catch(error => {
  console.error("An error occurred during the scraping script execution:", error);
  process.exit(1);
});
