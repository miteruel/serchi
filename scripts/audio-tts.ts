/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Synthetic voice for the mini-course, so every word has an example until
 * someone records it:
 *
 *   npm run audio:tts            (only the words without a synthetic file)
 *   npm run audio:tts -- --force (all of them again)
 *
 * Needs espeak-ng (Esperanto voice "eo") and lame. Writes
 * public/audio/tts/<slug>.mp3 and public/audio/tts/index.json, and removes
 * the files of words that are no longer in the course. These files only play
 * when a word has no human recording (see audioMap() in server/audio.ts).
 *
 * It also makes the voice of the published editor courses that lack one, in
 * the database (data/serchi.db or SERCHI_DB). The Node server does that by
 * itself; this is for the Delphi version, which cannot run espeak-ng.
 */
import fs from 'fs';
import path from 'path';
import { TTS_DIR, courseWords, synthesizedRecordings } from '../server/audio';
import { publishedCourseTexts } from '../server/courses';
import { openDatabase } from '../server/db';
import { espeakMp3, fillVoices } from '../server/tts';

const force = process.argv.includes('--force');
const texts = courseWords(); // slug -> text

fs.mkdirSync(TTS_DIR, { recursive: true });
let made = 0;
for (const [slug, text] of texts) {
  const out = path.join(TTS_DIR, `${slug}.mp3`);
  if (!force && fs.existsSync(out)) continue;
  fs.writeFileSync(out, await espeakMp3(text));
  made++;
}

const removed = synthesizedRecordings().filter((slug) => !texts.has(slug));
for (const slug of removed) fs.rmSync(path.join(TTS_DIR, `${slug}.mp3`));
fs.writeFileSync(path.join(TTS_DIR, 'index.json'), JSON.stringify(synthesizedRecordings()) + '\n');
console.log(`${made} synthetic recordings made, ${removed.length} removed. Wrote public/audio/tts/index.json`);

const db = openDatabase();
const courseMade = await fillVoices(db, publishedCourseTexts(db));
db.close();
console.log(`${courseMade} synthetic recordings made for the editor courses (database)`);
