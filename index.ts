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

console.log(await fetchColumnOptions(columnName));
