const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');
// const axios = require('axios'); // Using axios for making HTTP requests (Replaced with fetch)

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const server = new McpServer(
  {
    name: "hacker_news_mcp_server",
    version: "1.0.0"
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    }
  }
);

// Tool to get top story IDs
server.registerTool('get_top_story_ids', {
  description: 'Fetches a list of top story IDs from Hacker News.',
  inputSchema: z.object({}), // No input needed
  outputSchema: z.object({
    storyIds: z.array(z.number()).describe('An array of top Hacker News story IDs.'),
  }),
}, async () => {
  try {
    const response = await fetch(`${BASE_URL}/topstories.json`);
    const data = await response.json();
    return { storyIds: data };
  } catch (error) {
    console.error('Error fetching top story IDs:', error.message);
    throw new Error('Failed to fetch top story IDs.');
  }
});

// Tool to get story details by ID
server.registerTool('get_story_details', {
  description: 'Fetches the details of a specific Hacker News story by its ID.',
  inputSchema: z.object({
    story_id: z.number().describe('The ID of the Hacker News story.'),
  }),
  outputSchema: z.object({
    id: z.number(),
    by: z.string().optional(),
    descendants: z.number().optional(),
    kids: z.array(z.number()).optional(),
    score: z.number().optional(),
    time: z.number().optional(),
    title: z.string().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
    text: z.string().optional(),
  }).describe('Details of a Hacker News story.'),
}, async ({ story_id }) => {
  try {
    const response = await fetch(`${BASE_URL}/item/${story_id}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching story details for ID ${story_id}:`, error.message);
    throw new Error(`Failed to fetch details for story ID ${story_id}.`);
  }
});



// Use stdio transport for local integration
server.connect(new StdioServerTransport());

console.log('Hacker News MCP Server started using stdio transport.');