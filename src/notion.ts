import { Client } from "@notionhq/client";
import { fetchRedmineTickets} from "./redmine";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notionDbId = process.env.NOTION_DB_ID;

type NotionSelectOption = {
  name: string;
  color: string;
}

export function hasColumn(columnName: string) {
  return notion.databases.retrieve({ database_id: notionDbId })
  .then(response => {
    return columnName in response.properties;
  });
}

export function createColumn(columnName: string, options: NotionSelectOption[] = []) {
  return notion.databases.update({
    database_id: notionDbId,
    properties: {
      [columnName]: {
        multi_select: {
          options
        }
      }
    }
  });
}

export function fetchColumnOptions(columnName: string) {
  return notion.databases.retrieve({ database_id: notionDbId })
  .then(response => {
    const property = response.properties[columnName];
    return property.multi_select.options as NotionSelectOption[];
  });
}

export function updateColumnOptions(columnName: string) {
  return notion.databases.update({
    database_id: notionDbId,
    properties: {
      [columnName]: {
        multi_select: {
          options: fetchColumnOptions(columnName)
        }
      }
    }
  });
}
