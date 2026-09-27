/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Copies the approved recordings of the database to MP3 files in public/audio,
 * so they are kept in the repository (a backup of the voices) and also play
 * where there is no server (the static mini-course pages):
 *
 *   npm run audio:export                      (words without an MP3 file)
 *   npm run audio:export -- --force           (all of them again)
 *   SERCHI_DB=/path/to/copy.db npm run audio:export
 *
 * Uses the newest approved recording of each word. Needs ffmpeg (the
 * recordings are WebM, Ogg or MP4 as the browser made them). Then updates
 * public/audio/index.json and docs/GRABACIONES.md (npm run audio:manifest).
 * With Docker, copy the database out of the volume first, e.g.
 *   docker compose cp serchi:/data/serchi.db /tmp/serchi.db
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { AUDIO_DIR } from '../server/audio';
import { openDatabase } from '../server/db';

type Row = { id: string; slug: string; mime: string; audio: Uint8Array };

const force = process.argv.includes('--force');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const EXT: Record<string, string> = { 'audio/webm': 'webm', 'audio/ogg': 'ogg', 'audio/mp4': 'm4a' };

const db = openDatabase();
const rows = db
  .prepare("SELECT id, slug, mime, audio FROM recordings WHERE status = 'approved' ORDER BY reviewed_at DESC, created_at DESC")
  .all() as Row[];
db.close();

fs.mkdirSync(AUDIO_DIR, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-export-'));
const done = new Set<string>();
let made = 0;
try {
  for (const r of rows) {
    if (done.has(r.slug)) continue; // older recording of a word already exported
    done.add(r.slug);
    const out = path.join(AUDIO_DIR, `${r.slug}.mp3`);
    if (!force && fs.existsSync(out)) continue;
    const input = path.join(tmp, `${r.id}.${EXT[r.mime] || 'bin'}`);
    fs.writeFileSync(input, r.audio);
    // Mono MP3 at 64 kbps, as docs/GRABACIONES.md asks for recorded files
    execFileSync(FFMPEG, ['-loglevel', 'error', '-y', '-i', input, '-ac', '1', '-b:a', '64k', out]);
    console.log(`public/audio/${r.slug}.mp3`);
    made++;
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
console.log(`${made} recordings exported (${done.size} words with an approved recording).`);

// Update public/audio/index.json and docs/GRABACIONES.md (running that script)
await import('./audio-manifest');
