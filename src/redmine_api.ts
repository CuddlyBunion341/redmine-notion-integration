import axios from 'axios';

const redmineApiKey = process.env.REDMINE_API_KEY;
export const redmineBaseUrl = process.env.REDMINE_URL;

const issueQuery = "assigned_to_id=me&status_id=open"; 

export async function fetchStatuses() {
  const response = await axios.get(`${redmineBaseUrl}/issue_statuses.json?key=${redmineApiKey}`);
  return response.data.issue_statuses as IssueStatus[];
}

export async function fetchIssues() {
  const response = await axios.get(`${redmineBaseUrl}/issues.json?key=${redmineApiKey}&${issueQuery}`);
  return response.data.issues as Issue[];
}
