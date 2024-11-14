import { Client } from "@notionhq/client";
import { fetchRedmineTickets} from "./redmine";

const notion = new Client({ auth: process.env.NOTION_SECRET });
const notionDbId = process.env.NOTION_DB_ID;
