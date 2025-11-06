#!/usr/bin/env node

/**
 * Test what the MCP server actually returns for tools/list
 * This is what Smithery sees when checking quality
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testMCPServer() {
  console.log('🔍 Testing MCP Server Response Format\n');

  // Start the server
  const serverPath = join(__dirname, '.smithery', 'index.cjs');
  const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let responses = [];
  let buffer = '';

  server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line in buffer

    for (const line of lines) {
      if (line.trim()) {
        try {
          const message = JSON.parse(line);
          responses.push(message);
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  });

  // Send initialize request
  const initRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  };

  server.stdin.write(JSON.stringify(initRequest) + '\n');

  // Wait a bit for response
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send tools/list request
  const toolsRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {}
  };

  server.stdin.write(JSON.stringify(toolsRequest) + '\n');

  // Wait for response
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Close server
  server.kill();

  // Analyze responses
  console.log(`📦 Received ${responses.length} responses\n`);

  for (const response of responses) {
    if (response.result && response.result.tools) {
      console.log('🔧 Tools List Response:\n');
      const tools = response.result.tools;

      console.log(`Total tools: ${tools.length}\n`);

      for (const tool of tools) {
        console.log(`Tool: ${tool.name}`);
        console.log(`  Description: ${tool.description ? 'YES' : 'NO'}`);

        if (tool.inputSchema) {
          const schema = tool.inputSchema;
          console.log(`  Input Schema Type: ${schema.type || 'MISSING'}`);

          if (schema.properties) {
            console.log(`  Properties: ${Object.keys(schema.properties).length}`);
            for (const [propName, propSchema] of Object.entries(schema.properties)) {
              const hasDesc = propSchema.description ? 'YES' : 'NO';
              console.log(`    - ${propName}: description=${hasDesc}, type=${propSchema.type || 'unknown'}`);
            }
          } else {
            console.log(`  Properties: 0 (empty schema)`);
          }
        } else {
          console.log(`  Input Schema: MISSING`);
        }

        if (tool.annotations) {
          console.log(`  Annotations: YES (${Object.keys(tool.annotations).length} fields)`);
        } else {
          console.log(`  Annotations: NO`);
        }

        console.log('');
      }
    }
  }
}

testMCPServer().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
