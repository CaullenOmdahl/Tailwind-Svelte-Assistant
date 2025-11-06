#!/usr/bin/env node

/**
 * Comprehensive tool testing script
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Comprehensive MCP Tools Testing...\n');

const serverPath = path.join(__dirname, 'dist', 'index.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let testsPassed = 0;
let testsFailed = 0;
const responses = new Map();

server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.id && parsed.id > 1) {
          responses.set(parsed.id, parsed);
        }
      } catch (e) {
        // Not JSON
      }
    }
  });
});

server.stderr.on('data', () => {});

function sendRequest(id, method, params = {}) {
  const request = {
    jsonrpc: '2.0',
    id,
    method,
    params
  };
  server.stdin.write(JSON.stringify(request) + '\n');
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  // Initialize
  sendRequest(1, 'initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test', version: '1.0.0' }
  });

  await wait(500);

  console.log('Test Suite: MCP Tool Functionality\n');
  console.log('═'.repeat(60));

  // Test 1: list_sveltekit_topics
  console.log('\n📋 Test 1: list_sveltekit_topics');
  sendRequest(10, 'tools/call', {
    name: 'list_sveltekit_topics',
    arguments: {}
  });
  await wait(500);

  const test1 = responses.get(10);
  if (test1?.result?.content?.[0]?.text) {
    const topics = test1.result.content[0].text.split('\n').filter(t => t);
    console.log(`   ✅ PASS - Found ${topics.length} topics`);
    console.log(`   Topics: ${topics.join(', ')}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No topics returned');
    testsFailed++;
  }

  // Test 2: list_tailwind_info_topics
  console.log('\n📋 Test 2: list_tailwind_info_topics');
  sendRequest(11, 'tools/call', {
    name: 'list_tailwind_info_topics',
    arguments: {}
  });
  await wait(500);

  const test2 = responses.get(11);
  if (test2?.result?.content?.[0]?.text) {
    const topics = test2.result.content[0].text.split('\n').filter(t => t);
    console.log(`   ✅ PASS - Found ${topics.length} topics`);
    console.log(`   Topics: ${topics.join(', ')}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No topics returned');
    testsFailed++;
  }

  // Test 3: get_tailwind_info
  console.log('\n📖 Test 3: get_tailwind_info (dark-mode)');
  sendRequest(12, 'tools/call', {
    name: 'get_tailwind_info',
    arguments: { query: 'dark-mode' }
  });
  await wait(500);

  const test3 = responses.get(12);
  if (test3?.result?.content?.[0]?.text) {
    const content = test3.result.content[0].text;
    console.log(`   ✅ PASS - Content retrieved (${content.length} bytes)`);
    console.log(`   Preview: ${content.substring(0, 80)}...`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No content returned');
    testsFailed++;
  }

  // Test 4: list_snippet_categories
  console.log('\n📋 Test 4: list_snippet_categories');
  sendRequest(13, 'tools/call', {
    name: 'list_snippet_categories',
    arguments: {}
  });
  await wait(500);

  const test4 = responses.get(13);
  if (test4?.result?.content?.[0]?.text) {
    const categories = test4.result.content[0].text.split('\n').filter(c => c);
    console.log(`   ✅ PASS - Found ${categories.length} categories`);
    console.log(`   Categories: ${categories.slice(0, 5).join(', ')}...`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No categories returned');
    testsFailed++;
  }

  // Test 5: list_snippets_in_category
  console.log('\n📋 Test 5: list_snippets_in_category (headers)');
  sendRequest(14, 'tools/call', {
    name: 'list_snippets_in_category',
    arguments: { category: 'headers' }
  });
  await wait(500);

  const test5 = responses.get(14);
  if (test5?.result?.content?.[0]?.text) {
    const snippets = test5.result.content[0].text.split('\n').filter(s => s);
    console.log(`   ✅ PASS - Found ${snippets.length} snippets`);
    console.log(`   Snippets: ${snippets.join(', ')}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No snippets returned');
    testsFailed++;
  }

  // Test 6: get_component_snippet
  console.log('\n🧩 Test 6: get_component_snippet (headers/navbar-simple)');
  sendRequest(15, 'tools/call', {
    name: 'get_component_snippet',
    arguments: {
      component_category: 'headers',
      snippet_name: 'navbar-simple'
    }
  });
  await wait(500);

  const test6 = responses.get(15);
  if (test6?.result?.content?.[0]?.text) {
    const content = test6.result.content[0].text;
    console.log(`   ✅ PASS - Snippet retrieved (${content.length} bytes)`);
    console.log(`   Contains Svelte: ${content.includes('<script>') || content.includes('<style>')}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - No snippet returned');
    testsFailed++;
  }

  // Test 7: Security - Invalid characters
  console.log('\n🔒 Test 7: Security - Invalid characters in path');
  sendRequest(16, 'tools/call', {
    name: 'get_sveltekit_doc',
    arguments: { topic: 'routing<script>alert(1)</script>' }
  });
  await wait(500);

  const test7 = responses.get(16);
  if (test7?.error) {
    console.log('   ✅ PASS - Rejected malicious input');
    console.log(`   Error: ${test7.error.message}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - Did not reject malicious input');
    testsFailed++;
  }

  // Test 8: Security - Path traversal with slashes
  console.log('\n🔒 Test 8: Security - Path with slashes');
  sendRequest(17, 'tools/call', {
    name: 'get_sveltekit_doc',
    arguments: { topic: '../../etc/hosts' }
  });
  await wait(500);

  const test8 = responses.get(17);
  if (test8?.error) {
    console.log('   ✅ PASS - Rejected path traversal');
    console.log(`   Error: ${test8.error.message}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - Did not reject path traversal');
    testsFailed++;
  }

  // Test 9: Security - Null bytes
  console.log('\n🔒 Test 9: Security - Null byte injection');
  sendRequest(18, 'tools/call', {
    name: 'get_tailwind_info',
    arguments: { query: 'padding\x00.secret' }
  });
  await wait(500);

  const test9 = responses.get(18);
  if (test9?.error) {
    console.log('   ✅ PASS - Rejected null byte');
    console.log(`   Error: ${test9.error.message}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - Did not reject null byte');
    testsFailed++;
  }

  // Test 10: File not found handling
  console.log('\n📄 Test 10: Graceful handling of non-existent file');
  sendRequest(19, 'tools/call', {
    name: 'get_sveltekit_doc',
    arguments: { topic: 'nonexistent-topic' }
  });
  await wait(500);

  const test10 = responses.get(19);
  if (test10?.error) {
    console.log('   ✅ PASS - Handled non-existent file gracefully');
    console.log(`   Error: ${test10.error.message}`);
    testsPassed++;
  } else {
    console.log('   ❌ FAIL - Should have returned error');
    testsFailed++;
  }

  // Final summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Test Results Summary\n');
  console.log(`Total Tests: ${testsPassed + testsFailed}`);
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);

  if (testsFailed === 0) {
    console.log('\n🎉 All tests passed! Server is fully functional.');
  } else {
    console.log('\n⚠️  Some tests failed. Review the output above.');
  }

  server.kill();
  process.exit(testsFailed === 0 ? 0 : 1);
}

// Start tests after server initializes
setTimeout(() => runTests(), 1000);

// Timeout
setTimeout(() => {
  console.error('\n❌ Test timeout');
  server.kill();
  process.exit(1);
}, 15000);
