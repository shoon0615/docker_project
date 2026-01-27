const { McpServer, Tool } = require('@modelcontextprotocol/sdk');
const { z } = require('zod');
const axios = require('axios'); // Using axios for making HTTP requests

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// Tool to get top story IDs
const getTopStoryIdsTool = new Tool({
  name: 'get_top_story_ids',
  description: 'Fetches a list of top story IDs from Hacker News.',
  inputSchema: z.object({}), // No input needed
  outputSchema: z.array(z.number()).describe('An array of top Hacker News story IDs.'),
  call: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/topstories.json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top story IDs:', error.message);
      throw new Error('Failed to fetch top story IDs.');
    }
  },
});

// Tool to get story details by ID
const getStoryDetailsTool = new Tool({
  name: 'get_story_details',
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
  call: async ({ story_id }) => {
    try {
      const response = await axios.get(`${BASE_URL}/item/${story_id}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching story details for ID ${story_id}:`, error.message);
      throw new Error(`Failed to fetch details for story ID ${story_id}.`);
    }
  },
});

const server = new McpServer({
  tools: [getTopStoryIdsTool, getStoryDetailsTool],
});

// Use stdio transport for local integration
server.start({ transport: 'stdio' });

console.log('Hacker News MCP Server started using stdio transport.');
