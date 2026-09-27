/**
 * Dumps the SQLite database back to JSON, e.g. to review changes in a diff,
 * make a backup or edit data by hand and re-import it with db:import.
 *
 *   npm run db:export -- [--out <dir>] [--db <file.db>]
 *
 * Writes <dir>/resources.json and <dir>/knowledge.json (default dir: data/export).
 */
import fs from 'fs';
import path from 'path';
import { listKnowledgePanels, listResources, openDatabase, ROOT_DIR } from '../server/db';

const argv = process.argv.slice(2);
const opt = (name: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const outDir = path.resolve(opt('out') || path.join(ROOT_DIR, 'data', 'export'));
const db = openDatabase(opt('db'));
fs.mkdirSync(outDir, { recursive: true });

const resources = listResources(db);
const knowledge = listKnowledgePanels(db);
fs.writeFileSync(path.join(outDir, 'resources.json'), JSON.stringify(resources, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'knowledge.json'), JSON.stringify(knowledge, null, 2) + '\n');
console.log(`Exported ${resources.length} resources and ${knowledge.length} knowledge panels to ${outDir}`);
db.close();
