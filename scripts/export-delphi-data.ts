/**
 * Exports the TypeScript data that is not in the SQLite database (forum seed
 * data, UI translations and search synonyms) to JSON files consumed by the
 * Delphi + WebStencils + HTMX version of Serĉilo (see /delphi). Resources and
 * knowledge panels are read by both versions from data/serchi.db.
 *
 * Usage: npm run export:delphi
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_FORUM_TOPICS, INITIAL_FORUM_COMMENTS } from '../src/data/forumData';
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

write('forum.json', { topics: INITIAL_FORUM_TOPICS, comments: INITIAL_FORUM_COMMENTS });
write('translations.json', flatten(TRANSLATIONS));
write('synonyms.json', MULTILINGUAL_SYNONYMS);
