import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';

config();

// Redmine

const redmineApiKey = process.env.REDMINE_API_KEY;
const redmineUrl = process.env.REDMINE_URL;

async function fetchRedmineTickets() {
  console.log(`${redmineUrl}/issues.json?key=${redmineApiKey}`)
  const response = await axios.get(`${redmineUrl}/issues.json?key=${redmineApiKey}`);
  console.log(response.data);
  return response.data.issues.map((issue: any) => ({name: issue.subject, status: issue.status.name}));
}


// notion

const notionDbId = process.env.NOTION_DB_ID;
const notionSecret = process.env.NOTION_SECRET;

async function logNotionDatabaseRecords() {
  const url = `https://api.notion.com/v1/databases/${notionDbId}/query`
  console.log(url)
  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${notionSecret}`,
      // 'Notion-Version': '2021-05-13',
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });
}

console.log(logNotionDatabaseRecords());

type RedmineTicket = {
  name: string;
  status: string;
}

async function createNotionEntry(ticket: RedmineTicket) {
  const payload = {
    json: {
      type: 'page',
      properties: {
        Title: [{ type: 'title', id: 'title' }],
        // Add other properties as needed
      },
    },
  };

  const response = await axios.post(`https://api.notion.com/v1/databases/${notionDbId}/pages`, payload, {
    headers: {
    Authorization: `Bearer ${notionSecret}`,
    'Notion-Version': '2021-05-13',
  },
  });

  return response.data;
}

// Server

serve({
  async fetch(req) {
    const url = new URL(req.url);

    try {
      const issues = await fetchRedmineTickets();
      console.log(issues);
      return new Response(JSON.stringify(issues), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error(error);
      return new Response('Error fetching Redmine tickets', { status: 500 });
    }
  },
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
});
