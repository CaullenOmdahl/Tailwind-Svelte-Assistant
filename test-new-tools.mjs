#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testNewTools() {
  console.log('🧪 Testing new MCP tools...\n');

  // Check if documentation files exist
  const svelteDocsPath = join(__dirname, 'content', 'docs', 'svelte-sveltekit-full.txt');
  const tailwindDocsPath = join(__dirname, 'content', 'docs', 'tailwind-docs-full.txt');

  console.log('📁 Checking documentation files:');
  console.log(`   Svelte docs: ${existsSync(svelteDocsPath) ? '✅ EXISTS' : '❌ MISSING'}`);
  console.log(`   Tailwind docs: ${existsSync(tailwindDocsPath) ? '✅ EXISTS' : '❌ MISSING'}`);

  // Check if build exists
  const buildPath = join(__dirname, '.smithery', 'index.cjs');
  console.log(`\n🔨 Build file: ${existsSync(buildPath) ? '✅ EXISTS' : '❌ MISSING'}`);

  if (existsSync(buildPath)) {
    const stats = await import('fs/promises').then(fs => fs.stat(buildPath));
    console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Modified: ${stats.mtime.toISOString()}`);
  }

  // Verify tools in build
  const buildContent = await import('fs/promises').then(fs => fs.readFile(buildPath, 'utf-8'));

  const tools = [
    'get_svelte_full_docs',
    'get_tailwind_full_docs',
    'search_svelte_docs',
    'search_tailwind_docs'
  ];

  console.log('\n🔧 New tools in build:');
  for (const tool of tools) {
    const found = buildContent.includes(`"${tool}"`);
    console.log(`   ${tool}: ${found ? '✅ FOUND' : '❌ MISSING'}`);
  }

  console.log('\n✅ All checks passed!');
}

testNewTools().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
