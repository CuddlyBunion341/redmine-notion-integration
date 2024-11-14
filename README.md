# Redmine-Notion Integration

Synchronize Redmine issues with a Notion database to streamline task management and enhance team productivity.

## Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:CuddlyBunion341/redmine-notion-integration.git
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

5. Run the synchronization script:
    ```bash
    bun run index.ts
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

### Automating Synchronization

To periodically synchronize Redmine issues with Notion, you can set up a cron job:

1. Open your crontab file:
    ```bash
    crontab -e
    ```

2. Add a new cron job to run the script at your desired interval (e.g., every hour):
    ```cron
    0 * * * * cd /path/to/redmine-notion-integration && bun run index.ts
    ```

This will ensure that the synchronization script runs automatically at the specified interval.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
