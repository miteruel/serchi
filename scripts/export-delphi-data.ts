/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Exports the TypeScript data that is not in the SQLite database (UI
 * translations and search synonyms) to JSON files consumed by the
 * Delphi + WebStencils + HTMX version of Serĉilo (see /delphi). Resources,
 * knowledge panels and the forum are read by both versions from data/serchi.db.
 *
 * Usage: npm run export:delphi
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from '../src/translations';
import { MULTILINGUAL_SYNONYMS } from '../src/utils/esperanto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../delphi/data');
fs.mkdirSync(outDir, { recursive: true });

// Translation functions become templates with {0}, {1}... placeholders.
function flatten(value: unknown): unknown {
  if (typeof value === 'function') {
    const args = Array.from({ length: value.length }, (_, i) => `{${i}}`);
    return (value as (...a: string[]) => string)(...args);
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, flatten(v)]));
  }
  return value;
}

function write(name: string, data: unknown) {
  const file = path.join(outDir, name);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`wrote ${path.relative(process.cwd(), file)}`);
}

write('translations.json', flatten(TRANSLATIONS));
write('synonyms.json', MULTILINGUAL_SYNONYMS);
