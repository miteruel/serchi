/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Loads resources (and optionally knowledge panels) from JSON into the SQLite
 * database (data/serchi.db, or SERCHI_DB).
 *
 * This is the script used to migrate the original TypeScript/JSON data to
 * SQLite, and the one to use for bulk-adding new links.
 *
 *   npm run db:import -- --resources <file.json> [--knowledge <file.json>]
 *                        [--source curated|user|crawled] [--update] [--reset] [--db <file.db>]
 *
 *   --resources  JSON array of resources (same shape as EsperantoResource;
 *                "id" is optional and generated when missing)
 *   --knowledge  JSON array of knowledge panels; replaces the existing ones
 *   --source     origin stored with the imported resources (default: curated)
 *   --update     replace resources whose URL already exists (keeps id and order)
 *                instead of skipping them
 *   --reset      delete every resource before importing
 *
 * Duplicated URLs (ignoring case and trailing "/") are skipped and reported.
 * Invalid entries abort the import before anything is written.
 *
 * Migration from the old data files (they are in git history, e.g. commit
 * 79ad90f: src/data/resources_part*.ts and src/data/knowledge.ts):
 *   1. npm run export:delphi   (at that commit: TS data -> delphi/data/*.json)
 *   2. npm run db:import -- --reset \
 *        --resources delphi/data/resources.json --knowledge delphi/data/knowledge.json
 *   Result: 299 resources (one duplicated Reddit URL skipped) and 5 panels.
 */
import fs from 'fs';
import {
  insertResources,
  openDatabase,
  replaceKnowledgePanels,
  sanitizeResource,
  type ResourceSource,
} from '../server/db';

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) throw new Error(`Unexpected argument: ${a}`);
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) args[key] = true;
    else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function readJsonArray(file: string): any[] {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(data)) throw new Error(`${file} must contain a JSON array`);
  return data;
}

const args = parseArgs(process.argv.slice(2));
if (!args.resources && !args.knowledge) {
  console.error('Usage: npm run db:import -- --resources <file.json> [--knowledge <file.json>] [--source curated|user|crawled] [--update] [--reset] [--db <file.db>]');
  process.exit(1);
}

const source = (typeof args.source === 'string' ? args.source : 'curated') as ResourceSource;
if (!['curated', 'user', 'crawled'].includes(source)) {
  throw new Error(`Invalid --source: ${source}`);
}

const db = openDatabase(typeof args.db === 'string' ? args.db : undefined);

if (typeof args.resources === 'string') {
  const raw = readJsonArray(args.resources);
  // Validate everything first so a bad entry never leaves a half import
  const items = raw.map((item, i) => {
    try {
      return sanitizeResource(item);
    } catch (err: any) {
      throw new Error(`${args.resources}[${i}] (${item?.url ?? item?.id ?? '?'}): ${err.message}`);
    }
  });

  if (args.reset) {
    db.exec('DELETE FROM resources');
    console.log('Deleted all existing resources (--reset)');
  }
  const { inserted, updated, skippedDuplicates } = insertResources(db, items, source, { update: !!args.update });
  console.log(`Resources: ${inserted.length} imported, ${updated} updated, ${skippedDuplicates} duplicates skipped`);
}

if (typeof args.knowledge === 'string') {
  const panels = readJsonArray(args.knowledge);
  replaceKnowledgePanels(db, panels);
  console.log(`Knowledge panels: ${panels.length} imported`);
}

const total = db.prepare('SELECT COUNT(*) AS n FROM resources').get() as { n: number };
console.log(`Database now holds ${total.n} resources`);
db.close();
