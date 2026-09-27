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
 * Both only play when a word has no human recording (see audioMap()). A teacher
 * can remove a synthetic voice that sounds wrong (table muted_voices): it is
 * not made again until the teacher asks for it.
 *
 * The programs are found in the PATH, or set ESPEAK_NG and LAME to their paths.
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

const ESPEAK_NG = process.env.ESPEAK_NG || 'espeak-ng';
const LAME = process.env.LAME || 'lame';

/** MP3 of an Esperanto text, slow and clear for children. Needs espeak-ng and lame. */
export const espeakMp3: Synthesizer = async (text) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-tts-'));
  try {
    const wav = path.join(dir, 'voice.wav');
    const mp3 = path.join(dir, 'voice.mp3');
    // 120 words per minute, short gaps between words
    await run(ESPEAK_NG, ['-v', 'eo', '-s', '120', '-g', '4', '-w', wav, text]);
    await run(LAME, ['--quiet', '-m', 'm', '-b', '48', wav, mp3]);
    return fs.readFileSync(mp3);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

/** Words of the given texts that have no synthetic voice yet: slug -> text. */
export function missingVoices(db: DatabaseSync, texts: string[]): Map<string, string> {
  const have = new Set(synthesizedRecordings());
  for (const r of db.prepare('SELECT slug FROM synthetic_audio').all() as { slug: string }[]) have.add(r.slug);
  for (const slug of mutedVoices(db)) have.add(slug); // removed by a teacher: not made again
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

/** Slugs whose synthetic voice a teacher removed. */
export function mutedVoices(db: DatabaseSync): string[] {
  return (db.prepare('SELECT slug FROM muted_voices ORDER BY slug').all() as { slug: string }[]).map((r) => r.slug);
}

/** Removes the synthetic voice of a word and keeps it from being made again. */
export function muteVoice(db: DatabaseSync, slug: string): void {
  db.prepare('INSERT OR IGNORE INTO muted_voices (slug) VALUES (?)').run(slug);
  db.prepare('DELETE FROM synthetic_audio WHERE slug = ?').run(slug);
}

/** Lets a word have a synthetic voice again. Returns false if it was not removed. */
export function unmuteVoice(db: DatabaseSync, slug: string): boolean {
  return db.prepare('DELETE FROM muted_voices WHERE slug = ?').run(slug).changes > 0;
}
