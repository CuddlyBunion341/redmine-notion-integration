import { redmineBaseUrl, fetchIssues } from "./redmine_api.ts"

export type RedmineIssue = {
  id: number
  name: string
  url: string
  formattedUrl: string
}

function issueUrl(id: number) {
  return `${redmineBaseUrl}/issues/${id}`
}

export async function fetchRedmineIssues() {
  const issues = await fetchIssues()

  return issues.map(({id, subject}) => ({
    id,
    name: subject,
    url: issueUrl(id),
    formattedUrl: `[TICKET-${id}](${issueUrl(id)})`
  }))
}
