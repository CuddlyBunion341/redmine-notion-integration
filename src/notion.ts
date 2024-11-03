import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notionDbId = process.env.NOTION_DB_ID;

const statusOptions = [
  "Blocked",
  "To Specify",
  "To Estimate",
  "To Agree",
  "To Start",
  "Planned",
  "In Progress",
  "QA",
  "To Test (on develop)",
  "To Deploy",
  "To Close (on main/master)",
  "Closed" ,
  "Won't Fix/Do",
]

async function setupDatabase() {
  const database = await notion.databases.retrieve({ database_id: notionDbId });
  const properties = database.properties;
  console.log(JSON.stringify(properties, null, 2));

  const namePropertyExists = Object.values(properties).some(property => property.type === "title");

  if (!namePropertyExists) {
    await notion.databases.update({
      database_id: notionDbId,
      properties: {
        ...properties,
        Name: {
          name: "Name",
          type: "title"
        }
      }
    });
  }

    const statusPropertyExists = Object.values(properties).some(property => property.type === "select" && property.select.options.map(option => option.name).includes("Status"));

    if (!statusPropertyExists) {
      await notion.databases.update({
        database_id: notionDbId,
        properties: {
          ...properties,
          Status: {
            name: "Status",
            type: "select",
            select: {
              options: statusOptions.map(option => ({ name: option }))
            }
          }
        }
      });
    }
  }

  await setupDatabase();
