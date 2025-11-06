#!/usr/bin/env node

/**
 * Local test script for MCP server
 * Tests that all tools are registered and documentation files exist
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Tailwind Svelte Assistant MCP Server\n');

// Test 1: Check build exists
console.log('1️⃣ Checking build...');
const buildPath = join(__dirname, '.smithery', 'index.cjs');
if (!existsSync(buildPath)) {
  console.error('❌ Build file not found at:', buildPath);
  process.exit(1);
}
const buildStats = statSync(buildPath);
console.log(`✅ Build exists: ${(buildStats.size / 1024 / 1024).toFixed(2)} MB`);

// Test 2: Check documentation files
console.log('\n2️⃣ Checking documentation files...');
const svelteDocsPath = join(__dirname, 'content', 'docs', 'svelte-sveltekit-full.txt');
const tailwindDocsPath = join(__dirname, 'content', 'docs', 'tailwind-docs-full.txt');

if (!existsSync(svelteDocsPath)) {
  console.error('❌ Svelte docs not found at:', svelteDocsPath);
  process.exit(1);
}
const svelteStats = statSync(svelteDocsPath);
console.log(`✅ Svelte docs: ${(svelteStats.size / 1024 / 1024).toFixed(2)} MB`);

if (!existsSync(tailwindDocsPath)) {
  console.error('❌ Tailwind docs not found at:', tailwindDocsPath);
  process.exit(1);
}
const tailwindStats = statSync(tailwindDocsPath);
console.log(`✅ Tailwind docs: ${(tailwindStats.size / 1024 / 1024).toFixed(2)} MB`);

// Test 3: Verify tools in build
console.log('\n3️⃣ Verifying new tools in build...');
import { readFileSync } from 'fs';
const buildContent = readFileSync(buildPath, 'utf-8');

const expectedTools = [
  'get_svelte_full_docs',
  'get_tailwind_full_docs',
  'search_svelte_docs',
  'search_tailwind_docs',
  'get_sveltekit_doc',
  'get_tailwind_info',
  'get_component_snippet',
  'list_snippet_categories',
  'list_snippets_in_category',
  'list_sveltekit_topics',
  'list_tailwind_info_topics'
];

let allFound = true;
for (const tool of expectedTools) {
  const found = buildContent.includes(`"${tool}"`);
  const emoji = found ? '✅' : '❌';
  console.log(`${emoji} ${tool}`);
  if (!found) allFound = false;
}

if (!allFound) {
  console.error('\n❌ Some tools are missing from the build!');
  process.exit(1);
}

// Test 4: Check snippets
console.log('\n4️⃣ Checking component snippets...');
const snippetsPath = join(__dirname, 'content', 'snippets');
if (!existsSync(snippetsPath)) {
  console.error('❌ Snippets directory not found');
  process.exit(1);
}

import { readdirSync } from 'fs';
const categories = readdirSync(snippetsPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`✅ Found ${categories.length} snippet categories`);
console.log(`   Categories: ${categories.join(', ')}`);

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Test Summary');
console.log('='.repeat(50));
console.log(`✅ Build: ${(buildStats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`✅ Svelte docs: ${(svelteStats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`✅ Tailwind docs: ${(tailwindStats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`✅ Tools: ${expectedTools.length} registered`);
console.log(`✅ Snippets: ${categories.length} categories`);
console.log('\n🎉 All tests passed! Server is ready for deployment.\n');
