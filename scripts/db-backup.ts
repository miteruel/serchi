/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Makes a consistent copy of the database while the server keeps running
 * (SQLite VACUUM INTO), e.g. from a daily cron job.
 *
 *   npm run db:backup -- [--db <file.db>] [--out <dir>] [--keep <n>]
 *
 * Writes <dir>/serchi-<date>-<time>.db (default dir: data/backups) and deletes
 * the oldest backups in that folder beyond the last <n> (default 14).
 */
import fs from 'fs';
import path from 'path';
import { openDatabase, ROOT_DIR } from '../server/db';

const argv = process.argv.slice(2);
const opt = (name: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const outDir = path.resolve(opt('out') || path.join(ROOT_DIR, 'data', 'backups'));
const keep = Math.max(1, Number(opt('keep')) || 14);
fs.mkdirSync(outDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
const file = path.join(outDir, `serchi-${stamp}.db`);
const db = openDatabase(opt('db'));
db.prepare('VACUUM INTO ?').run(file);
db.close();
console.log(`Backup written to ${file}`);

const old = fs
  .readdirSync(outDir)
  .filter((f) => /^serchi-.*\.db$/.test(f))
  .sort()
  .slice(0, -keep);
for (const f of old) {
  fs.unlinkSync(path.join(outDir, f));
  console.log(`Deleted old backup ${f}`);
}
