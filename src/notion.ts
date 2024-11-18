import { Client } from "@notionhq/client";
import { fetchRedmineTickets} from "./redmine";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notionDbId = process.env.NOTION_DB_ID;

export const notionColors = Object.freeze(["default", "gray", "brown", "orange", "yellow", "green", "blue", "purple", "pink", "red"]);
export type NotionColor = (typeof notionColors)[number];

export type NotionSelectOption = {
  name: string;
  color: NotionColor;
}

export function randomNotionColor() {
  const randomIndex = Math.floor(Math.random() * notionColors.length);
  return notionColors[randomIndex] as NotionColor;
}

export function hasColumn(columnName: string) {
  notion.databases.retrieve({ database_id: notionDbId })
  .then(response =>  {
    return columnName in response.properties
  });
}

export function createColumn(columnName: string, options: NotionSelectOption[] = []) {
  return notion.databases.update({
    database_id: notionDbId,
    properties: {
      [columnName]: {
        select: {
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
    return property.select.options as NotionSelectOption[];
  });
}

export function updateColumnOptions(columnName: string, options: NotionSelectOption[]) {
  return notion.databases.update({
    database_id: notionDbId,
    properties: {
      [columnName]: {
        select: {
          options
        }
      }
    }
  });
}
