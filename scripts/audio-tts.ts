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
 * Needs espeak-ng (Esperanto voice "eo") and ffmpeg. Writes
 * public/audio/tts/<slug>.mp3 and public/audio/tts/index.json, and removes
 * the files of words that are no longer in the course. These files only play
 * when a word has no human recording (see audioMap() in server/audio.ts).
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { TTS_DIR, courseWords, synthesizedRecordings } from '../server/audio';

const force = process.argv.includes('--force');
const texts = courseWords(); // slug -> text

fs.mkdirSync(TTS_DIR, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-tts-'));
let made = 0;
try {
  for (const [slug, text] of texts) {
    const out = path.join(TTS_DIR, `${slug}.mp3`);
    if (!force && fs.existsSync(out)) continue;
    const wav = path.join(tmp, `${slug}.wav`);
    // Slow and clear, for children: 120 words per minute, short gaps between words
    execFileSync('espeak-ng', ['-v', 'eo', '-s', '120', '-g', '4', '-w', wav, text]);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-ar', '22050', '-b:a', '48k', out]);
    made++;
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

const removed = synthesizedRecordings().filter((slug) => !texts.has(slug));
for (const slug of removed) fs.rmSync(path.join(TTS_DIR, `${slug}.mp3`));
fs.writeFileSync(path.join(TTS_DIR, 'index.json'), JSON.stringify(synthesizedRecordings()) + '\n');
console.log(`${made} synthetic recordings made, ${removed.length} removed. Wrote public/audio/tts/index.json`);
