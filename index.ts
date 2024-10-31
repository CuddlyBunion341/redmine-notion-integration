import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';

config();

const redmineApiKey = process.env.REDMINE_API_KEY;
const redmineUrl = process.env.REDMINE_URL;

async function fetchRedmineTickets() {
  console.log(`${redmineUrl}/issues.json?key=${redmineApiKey}`)
  const response = await axios.get(`${redmineUrl}/issues.json?key=${redmineApiKey}`);
  console.log(response.data);
  return response.data.issues.map((issue: any) => ({name: issue.subject, status: issue.status.name}));
}

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
