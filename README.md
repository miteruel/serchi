<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1f685933-e473-4c77-9a87-e5e3f760bab5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Node.js 22.13 or later is required (the server uses the built-in `node:sqlite`).

## Data: SQLite database

The Esperanto resources ("links") and the knowledge panels live in the SQLite
database [`data/serchi.db`](data/serchi.db) (schema in [`data/schema.sql`](data/schema.sql)).
The Express server reads it and exposes it to the React app:

| Method | Route | |
|---|---|---|
| GET | `/api/resources` | all resources |
| GET | `/api/knowledge` | knowledge panels |
| POST | `/api/resources` | add one resource (409 if the URL already exists) |
| POST | `/api/resources/batch` | add several resources, skipping duplicates |

Resources added from the web are saved in the database, so every visitor sees them.
Set `SERCHI_DB=/path/to/file.db` to use another database file (for example, so
testing does not modify the committed one).

Scripts:

- `npm run db:import -- --resources links.json [--knowledge panels.json] [--source curated|user|crawled] [--reset]`:
  loads a JSON array of resources into the database, skipping duplicated URLs. This
  is the script that migrated the original `src/data/*.ts` files to SQLite (see the
  comment at the top of [`scripts/db-import.ts`](scripts/db-import.ts)).
- `npm run db:export -- [--out dir]`: dumps the database to `resources.json` and
  `knowledge.json` (default `data/export/`), handy for reviewing or editing by hand.

## Delphi + WebStencils + HTMX version

The [`delphi/`](delphi/README.md) folder contains a server-rendered version of the same
site built with Delphi WebBroker, WebStencils templates and HTMX. It reads the same
SQLite database; UI translations and forum seed data are exported to JSON with
`npm run export:delphi`.
