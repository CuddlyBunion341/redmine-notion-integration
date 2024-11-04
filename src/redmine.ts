import axios from 'axios';


const redmineApiKey = process.env.REDMINE_API_KEY;
const redmineUrl = process.env.REDMINE_URL;

type RedmineTicket = {
  name: string;
  status: string;
  link: string;
};

function displayLink(subject: string, id: number) {
  return `[${subject}](https://redmine.renuo.ch/issues/${id})`;
} 

export async function fetchRedmineTickets() {
  const response = await axios.get(`${redmineUrl}/issues.json?key=${redmineApiKey}`);
  return response.data.issues.map((issue: any) => ({name: issue.subject, link: displayLink(issue.subject, issue.number), status: issue.status.name}));
}
