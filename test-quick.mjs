#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = spawn('node', [path.join(__dirname, 'dist', 'index.js')], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let response = null;

server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.id === 2) {
          response = parsed;
        }
      } catch (e) {}
    }
  });
});

server.stderr.on('data', () => {});

setTimeout(() => {
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test', version: '1.0.0' }
    }
  }) + '\n');

  setTimeout(() => {
    console.log('Testing get_component_snippet with correct name...\n');
    server.stdin.write(JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_component_snippet',
        arguments: {
          component_category: 'headers',
          snippet_name: 'simple-navbar'
        }
      }
    }) + '\n');

    setTimeout(() => {
      if (response?.result?.content?.[0]?.text) {
        const content = response.result.content[0].text;
        console.log('✅ SUCCESS - Snippet retrieved!');
        console.log(`   Size: ${content.length} bytes`);
        console.log(`   Contains Svelte: ${content.includes('<') && content.includes('>')}`);
        console.log(`\nFirst 200 chars:\n${content.substring(0, 200)}...\n`);
      } else if (response?.error) {
        console.log('❌ ERROR:', response.error.message);
      } else {
        console.log('❌ No response received');
      }
      server.kill();
      process.exit(response?.result ? 0 : 1);
    }, 1000);
  }, 500);
}, 500);

setTimeout(() => {
  server.kill();
  process.exit(1);
}, 5000);
