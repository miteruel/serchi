/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Replaces the forum stored in the database with the content of a forum.json
 * file (default: data/imports/2026-09-foro-inicial.json, the demo forum both
 * versions started with).
 *
 *   npm run forum:import -- [--file <forum.json>] [--db <file.db>]
 *
 * Deletes every topic, comment and like already in the database first.
 */
import fs from 'fs';
import path from 'path';
import { openDatabase, ROOT_DIR } from '../server/db';
import { importForum } from '../server/forum';

const argv = process.argv.slice(2);
const opt = (name: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const file = path.resolve(opt('file') || path.join(ROOT_DIR, 'data', 'imports', '2026-09-foro-inicial.json'));
const db = openDatabase(opt('db'));
const { topics, comments } = importForum(db, JSON.parse(fs.readFileSync(file, 'utf8')));
console.log(`Imported ${topics} topics and ${comments} comments from ${path.relative(ROOT_DIR, file)}`);
db.close();
