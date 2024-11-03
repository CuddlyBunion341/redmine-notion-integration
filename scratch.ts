import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';
import { Client } from "@notionhq/client";

config();


// redmine

const redmineApiKey = process.env.REDMINE_API_KEY;
const redmineUrl = process.env.REDMINE_URL;

async function fetchRedmineTickets() {
  const response = await axios.get(`${redmineUrl}/issues.json?key=${redmineApiKey}`);
  return response.data.issues.map((issue: any) => ({name: issue.subject, status: issue.status.name}));
}

// notion

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notionDbId = process.env.NOTION_DB_ID;


async function logNotionDatabaseRecords() {
  const response = await notion.databases.query({
    database_id: notionDbId,
  });
  console.log(response);
}

console.log(logNotionDatabaseRecords());

type NotionEntry = {
  name: string;
  status: string;
};

async function listDatabaseProperties() {
  const response = await notion.databases.retrieve({
    database_id: notionDbId,
  });

  console.log('Database properties:');
  for (const [key, value] of Object.entries(response.properties)) {
    console.log(`- ${key}: ${value.type}`);
    if (value.type === 'select') {
      console.log('  Valid options:', value.select.options.map((option: any) => option.name));
    }
  }
}

await listDatabaseProperties();

async function createNotionEntry(entry: NotionEntry) {
  const response = await notion.pages.create({
    parent: { database_id: notionDbId },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: entry.name,
            },
          },
        ],
      },
      Status: {
        status: {
          name: entry.status,
        },
      },
      // Add other properties as needed
    },
  });

  return response;
}

fetchRedmineTickets().then((tickets) => {
  console.log(tickets);
  tickets.forEach((ticket) => {
    createNotionEntry(ticket);
  });
})
