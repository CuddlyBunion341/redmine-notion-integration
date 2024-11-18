import { serve } from 'bun';
import axios from 'axios';
import { config } from 'dotenv';
import { fetchRedmineIssues } from './src/redmine';
import { randomNotionColor, hasColumn, createColumn, fetchColumnOptions, updateColumnOptions } from './src/notion';

config();

const columnName = process.env.NOTION_REDMINE_TICKET_COLUMN_NAME;

if (!await hasColumn(columnName)) {
  await createColumn(columnName, []);
}

const columnOptions = await fetchColumnOptions(columnName);
const redmineIssues = await fetchRedmineIssues();
const existingOptionNames = columnOptions.map(option => option.name);

const redmineNotionOptions = redmineIssues
  .filter(({ id, name }) => !existingOptionNames.includes(`${id}-${name}`))
  .map(({ id, name, formattedUrl }) => ({
    name: `${id}-${name}`,
    color: randomNotionColor()
  }));

const newColumnOptions = columnOptions.concat(redmineNotionOptions);

await updateColumnOptions(columnName, newColumnOptions);
