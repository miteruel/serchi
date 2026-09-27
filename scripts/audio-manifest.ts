/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Audio for the mini-course. Run it after adding or removing recordings:
 *
 *   npm run audio:manifest
 *
 * - Writes public/audio/index.json with the recordings found in public/audio
 *   (the pages only show a 🔊 button for the words listed there).
 * - Writes docs/GRABACIONES.md: every Esperanto word or sentence in the
 *   mini-course, the file name its recording must have, and whether it exists.
 *
 * File names use the x-system and dashes: "Ĝis revido!" -> gxis-revido.mp3.
 * The same rule is in audioSlug() inside public/minikurso*.html.
 */
import fs from 'fs';
import path from 'path';
import { ROOT_DIR } from '../server/db';

const PAGES = ['public/minikurso.html', 'public/minikurso-en.html'];
const AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio');

export function audioSlug(text: string): string {
  const x: Record<string, string> = { ĉ: 'cx', ĝ: 'gx', ĥ: 'hx', ĵ: 'jx', ŝ: 'sx', ŭ: 'ux' };
  return text
    .toLowerCase()
    .replace(/[ĉĝĥĵŝŭ]/g, (c) => x[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Text of the elements that get a 🔊 button: .word b, .say b and .eo */
function esperantoTexts(html: string): string[] {
  const found: string[] = [];
  const re = /<div class="word"><b>([^<]+)<\/b>|<p class="say [ab]"><b>([^<]+)<\/b>|<span class="eo">([^<]+)<\/span>/g;
  for (const m of html.matchAll(re)) {
    const text = (m[1] || m[2] || m[3]).trim();
    // "kato → katoj" shows a rule, not something to say out loud
    if (!text.includes('→')) found.push(text);
  }
  return found;
}

const texts = new Map<string, string>(); // slug -> first text seen
for (const page of PAGES) {
  for (const t of esperantoTexts(fs.readFileSync(path.join(ROOT_DIR, page), 'utf8'))) {
    const slug = audioSlug(t);
    if (slug && !texts.has(slug)) texts.set(slug, t);
  }
}

fs.mkdirSync(AUDIO_DIR, { recursive: true });
const recorded = fs
  .readdirSync(AUDIO_DIR)
  .filter((f) => f.endsWith('.mp3'))
  .map((f) => f.slice(0, -4))
  .sort();
fs.writeFileSync(path.join(AUDIO_DIR, 'index.json'), JSON.stringify(recorded) + '\n');

const rows = [...texts.entries()].map(
  ([slug, text]) => `| ${recorded.includes(slug) ? '✅' : '—'} | ${text.replace(/\|/g, '\\|')} | \`${slug}.mp3\` |`,
);
const unused = recorded.filter((s) => !texts.has(s));
const doc = `# Grabaciones del minicurso

Lista generada por \`npm run audio:manifest\`: todas las palabras y frases en esperanto
del minicurso «Esperanto en 7 tagoj» y el nombre que debe tener cada grabación.
Las que ya existen llevan ✅. En la página solo aparece el botón 🔊 junto a las que
tienen grabación, así que se pueden ir añadiendo poco a poco.

## Cómo grabar

1. Graba cada palabra o frase por separado, despacio y con claridad, como se la dirías
   a un niño. Deja medio segundo de silencio al principio y al final. Sirve el móvil
   (una app de notas de voz) en una habitación sin eco.
2. Guárdala en **MP3** con el nombre de la tabla, en la carpeta \`public/audio/\`. Si la
   app graba en otro formato (m4a, ogg…), conviértela con Audacity o con
   \`ffmpeg -i entrada.m4a -ac 1 -b:a 64k nombre.mp3\`.
3. Ejecuta \`npm run audio:manifest\` para actualizar la lista de grabaciones de la
   página y esta tabla, y súbelo todo al repositorio.

Grabaciones: **${recorded.filter((s) => texts.has(s)).length} de ${texts.size}**.
${unused.length ? `\nFicheros de \`public/audio/\` que no corresponden a ninguna palabra del curso: ${unused.map((u) => `\`${u}.mp3\``).join(', ')}.\n` : ''}
| | Esperanto | Fichero |
|---|---|---|
${rows.join('\n')}
`;
fs.writeFileSync(path.join(ROOT_DIR, 'docs', 'GRABACIONES.md'), doc);
console.log(`${texts.size} words and sentences, ${recorded.length} recordings. Wrote public/audio/index.json and docs/GRABACIONES.md`);
