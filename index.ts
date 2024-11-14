import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';
import { fetchRedmineIssues } from './src/redmine';
import { hasColumn, createColumn, fetchColumnOptions, updateColumnOptions } from './src/notion';

config();

const columnName = process.env.NOTION_REDMINE_TICKET_COLUMN_NAME;

if (!hasColumn(columnName)) {
  await createColumn(columnName, []);
}

const columnOptions = await fetchColumnOptions(columnName);
const redmineIssues = await fetchRedmineIssues();

const redmineNotionOptions = redmineIssues.map(({ id, name, formattedUrl }) => ({
  name: `${name} ${formattedUrl}`,
  color: 'gray'
}));

const newColumnOptions = columnOptions.concat(redmineNotionOptions);

await updateColumnOptions(columnName, newColumnOptions);

console.log('Updated column options!');
