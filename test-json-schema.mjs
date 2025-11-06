#!/usr/bin/env node

/**
 * Test what JSON Schema the MCP server generates for tools
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function makeRequest(path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json,text/event-stream',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            data: JSON.parse(data),
            headers: res.headers
          });
        } catch (e) {
          resolve({ data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function testJSONSchema() {
  console.log('🔍 Testing JSON Schema Generation for Tools\n');

  // Start the HTTP server
  const serverPath = join(__dirname, '.smithery', 'index.cjs');
  const server = spawn('node', [serverPath], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: '3000' }
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    // Step 1: Initialize session
    console.log('Initializing session...');
    const initResponse = await makeRequest('/mcp', {}, {
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
    });

    const sessionId = initResponse.headers['mcp-session-id'];
    console.log(`Session ID: ${sessionId}\n`);

    if (!sessionId) {
      console.error('❌ No session ID received');
      console.log(JSON.stringify(initResponse, null, 2));
      return;
    }

    // Step 2: Request tools/list
    console.log('Requesting tools/list...');
    const toolsResponse = await makeRequest('/mcp', {
      'Mcp-Session-Id': sessionId
    }, {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    });

    // Parse SSE response
    let response;
    if (typeof toolsResponse.data === 'string' && toolsResponse.data.startsWith('event:')) {
      const dataMatch = toolsResponse.data.match(/data: ({.*})/);
      if (dataMatch) {
        response = JSON.parse(dataMatch[1]);
      }
    } else {
      response = toolsResponse.data;
    }

    console.log('📦 Tools Response:\n');

    if (response && response.result && response.result.tools) {
      const tools = response.result.tools;
      console.log(`Total tools: ${tools.length}\n`);

      // Show first 3 tools with parameters
      const toolsWithParams = tools.filter(t =>
        t.inputSchema &&
        t.inputSchema.properties &&
        Object.keys(t.inputSchema.properties).length > 0
      );

      console.log(`Tools with parameters: ${toolsWithParams.length}\n`);

      for (const tool of toolsWithParams.slice(0, 3)) {
        console.log(`\n--- Tool: ${tool.name} ---`);
        console.log(`Description: ${tool.description ? 'YES' : 'NO'}`);
        console.log(`\nInput Schema:`);
        console.log(JSON.stringify(tool.inputSchema, null, 2));

        if (tool.inputSchema && tool.inputSchema.properties) {
          console.log(`\nParameter Descriptions:`);
          for (const [name, schema] of Object.entries(tool.inputSchema.properties)) {
            console.log(`  ${name}: ${schema.description ? 'YES - "' + schema.description + '"' : 'NO'}`);
          }
        }
      }
    } else {
      console.log('❌ No tools in response');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    server.kill();
  }
}

testJSONSchema().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
