# Redmine-Notion Integration

## Purpose

The purpose of this project is to integrate Redmine with Notion, allowing users to synchronize Redmine issues with Notion database columns. This integration helps in managing and tracking issues more efficiently by leveraging Notion's powerful database and collaboration features.

## Motivation

Managing tasks and issues across multiple platforms can be challenging and time-consuming. By integrating Redmine with Notion, this project aims to streamline the workflow, reduce manual data entry, and ensure that all team members have access to up-to-date information in a single place. This integration enhances productivity and collaboration within teams.

## Setup

### Prerequisites

- [Bun](https://bun.sh) (v1.1.29 or later)
- Node.js (if not using Bun)
- Redmine API key
- Notion API key

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd redmine-notion-integration
    ```

2. Install dependencies:
    ```bash
    bun install
    ```

3. Copy the example environment file and set your secrets:
    ```bash
    cp .env.example .env
    ```

4. Open the `.env` file and set your environment variables:
    ```env
    REDMINE_API_KEY=<your redmine api key>
    REDMINE_URL=https://redmine.example.com
    NOTION_DB_ID=<your notion_db_id>
    NOTION_SECRET=<your notion secret>
    ```

### Acquiring API Keys

- **Redmine API Key**: 
  1. Log in to your Redmine account.
  2. Go to "My account" (usually found in the top right corner).
  3. Scroll down to the "API access key" section.
  4. Generate a new key if one does not exist, and copy it.

- **Notion API Key**:
  1. Go to [Notion Integrations](https://www.notion.so/my-integrations).
  2. Create a new integration.
  3. Save the generated "Internal Integration Token".
  4. Share the database with your integration to get the `NOTION_DB_ID`.
