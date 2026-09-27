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
 * The rule is audioSlug() in server/audio.ts (and a copy in public/minikurso*.html).
 */
import fs from 'fs';
import path from 'path';
import { ROOT_DIR } from '../server/db';
import { AUDIO_DIR, committedRecordings, courseWords } from '../server/audio';

const texts = courseWords(); // slug -> text

fs.mkdirSync(AUDIO_DIR, { recursive: true });
const recorded = committedRecordings();
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

Hay dos formas de añadir grabaciones:

- **Desde la web**, en la página *Graba el minicurso* (\`/grabar.html\` en la web):
  cualquiera puede grabar con el micrófono y un moderador
  aprueba cada grabación antes de que suene en el curso. Se guardan en la base de
  datos, no en esta carpeta, y no aparecen en la tabla de abajo.
- **Como ficheros MP3** en el repositorio, siguiendo los pasos siguientes. Si una
  palabra tiene las dos, suena el fichero MP3.

Mientras nadie graba una palabra, suena una **voz sintética** (espeak-ng) guardada en
\`public/audio/tts/\`. Se regenera con \`npm run audio:tts\` (hacen falta espeak-ng y
ffmpeg) y deja de sonar en cuanto la palabra tiene una grabación de verdad.

## Cómo grabar ficheros MP3

1. Graba cada palabra o frase por separado, despacio y con claridad, como se la dirías
   a un niño. Deja medio segundo de silencio al principio y al final. Sirve el móvil
   (una app de notas de voz) en una habitación sin eco.
2. Guárdala en **MP3** con el nombre de la tabla, en la carpeta \`public/audio/\`. Si la
   app graba en otro formato (m4a, ogg…), conviértela con Audacity o con
   \`ffmpeg -i entrada.m4a -ac 1 -b:a 64k nombre.mp3\`.
3. Ejecuta \`npm run audio:manifest\` para actualizar la lista de grabaciones de la
   página y esta tabla, y súbelo todo al repositorio.

Ficheros MP3: **${recorded.filter((s) => texts.has(s)).length} de ${texts.size}**.
${unused.length ? `\nFicheros de \`public/audio/\` que no corresponden a ninguna palabra del curso: ${unused.map((u) => `\`${u}.mp3\``).join(', ')}.\n` : ''}
| | Esperanto | Fichero |
|---|---|---|
${rows.join('\n')}
`;
fs.writeFileSync(path.join(ROOT_DIR, 'docs', 'GRABACIONES.md'), doc);
console.log(`${texts.size} words and sentences, ${recorded.length} recordings. Wrote public/audio/index.json and docs/GRABACIONES.md`);
