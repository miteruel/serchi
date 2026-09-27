/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Synthetic Esperanto voice (espeak-ng, MP3 made with lame), so every word has
 * an example until someone records it.
 *
 * - The mini-course words are MP3 files in public/audio/tts (npm run audio:tts).
 * - The words of the courses made with the editor live in the database
 *   (table synthetic_audio): the server makes the missing ones when it starts
 *   and after a course is saved, and npm run audio:tts does it too.
 *
 * Both only play when a word has no human recording (see audioMap()).
 */
import type { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { audioSlug, synthesizedRecordings } from './audio';

const run = promisify(execFile);

export type Synthesizer = (text: string) => Promise<Buffer>;

/** MP3 of an Esperanto text, slow and clear for children. Needs espeak-ng and lame. */
export const espeakMp3: Synthesizer = async (text) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-tts-'));
  try {
    const wav = path.join(dir, 'voice.wav');
    const mp3 = path.join(dir, 'voice.mp3');
    // 120 words per minute, short gaps between words
    await run('espeak-ng', ['-v', 'eo', '-s', '120', '-g', '4', '-w', wav, text]);
    await run('lame', ['--quiet', '-m', 'm', '-b', '48', wav, mp3]);
    return fs.readFileSync(mp3);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

/** Words of the given texts that have no synthetic voice yet: slug -> text. */
export function missingVoices(db: DatabaseSync, texts: string[]): Map<string, string> {
  const have = new Set(synthesizedRecordings());
  for (const r of db.prepare('SELECT slug FROM synthetic_audio').all() as { slug: string }[]) have.add(r.slug);
  const missing = new Map<string, string>();
  for (const text of texts) {
    const slug = audioSlug(text);
    if (slug && !have.has(slug) && !missing.has(slug)) missing.set(slug, text);
  }
  return missing;
}

/** Makes the missing voices of the given texts and stores them. Returns how many were made. */
export async function fillVoices(db: DatabaseSync, texts: string[], synthesize: Synthesizer = espeakMp3): Promise<number> {
  let made = 0;
  for (const [slug, text] of missingVoices(db, texts)) {
    const audio = await synthesize(text);
    db.prepare('INSERT OR REPLACE INTO synthetic_audio (slug, text, audio) VALUES (?, ?, ?)').run(slug, text, audio);
    made++;
  }
  return made;
}

export function getSyntheticAudio(db: DatabaseSync, slug: string): Uint8Array | undefined {
  const row = db.prepare('SELECT audio FROM synthetic_audio WHERE slug = ?').get(slug) as { audio: Uint8Array } | undefined;
  return row?.audio;
}
