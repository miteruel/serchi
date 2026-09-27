/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Audio for the mini-course: the words that can be recorded, the recordings
 * sent by visitors (table "recordings", audio stored in the database) and the
 * list of recordings the pages play.
 *
 * Three sources of audio, the first one wins for a word:
 *  1. MP3 files committed in public/audio/<slug>.mp3 (see docs/GRABACIONES.md);
 *  2. recordings sent from the "Grabar" page and approved by a moderator;
 *  3. a synthetic voice, so every word has an example until someone records
 *     it: public/audio/tts/<slug>.mp3 for the mini-course and the table
 *     synthetic_audio for the courses made with the editor (server/tts.ts).
 */
import type { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { ROOT_DIR, newResourceId } from './db';

type Row = Record<string, any>;

export const COURSE_PAGES = ['public/minikurso.html', 'public/minikurso-en.html'];
export const AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio');
export const TTS_DIR = path.join(AUDIO_DIR, 'tts');

/** Limits for recordings sent by visitors. */
export const RECORDING_LIMITS = {
  maxBytes: 1024 * 1024, // about a minute of speech; a word takes 20-60 KB
  perVisitorPerDay: 20,
  maxPending: 500, // keeps the database from filling up while nobody reviews
};

/** File name of a word's recording: x-system and dashes ("Ĝis revido!" -> gxis-revido). */
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

/** Esperanto words and sentences of a course page: .word b, .say b and .eo */
export function esperantoTexts(html: string): string[] {
  const found: string[] = [];
  const re = /<div class="word"><b>([^<]+)<\/b>|<p class="say [ab]"><b>([^<]+)<\/b>|<span class="eo">([^<]+)<\/span>/g;
  for (const m of html.matchAll(re)) {
    const text = (m[1] || m[2] || m[3]).trim();
    // "kato → katoj" shows a rule, not something to say out loud
    if (!text.includes('→')) found.push(text);
  }
  return found;
}

/** Every word of the mini-course that can have a recording: slug -> text, in course order. */
export function courseWords(): Map<string, string> {
  const words = new Map<string, string>();
  for (const page of COURSE_PAGES) {
    for (const text of esperantoTexts(fs.readFileSync(path.join(ROOT_DIR, page), 'utf8'))) {
      const slug = audioSlug(text);
      if (slug && !words.has(slug)) words.set(slug, text);
    }
  }
  return words;
}

function mp3Slugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mp3'))
    .map((f) => f.slice(0, -4))
    .sort();
}

/** Slugs of the MP3 files committed in public/audio. */
export function committedRecordings(): string[] {
  return mp3Slugs(AUDIO_DIR);
}

/** Slugs of the synthetic voice files in public/audio/tts. */
export function synthesizedRecordings(): string[] {
  return mp3Slugs(TTS_DIR);
}

/**
 * Checks the first bytes of an upload, so only real audio containers are
 * stored whatever the Content-Type says. Returns the MIME type or undefined.
 */
export function detectAudioType(data: Buffer): 'audio/webm' | 'audio/ogg' | 'audio/mp4' | undefined {
  if (data.length < 12) return undefined;
  if (data[0] === 0x1a && data[1] === 0x45 && data[2] === 0xdf && data[3] === 0xa3) return 'audio/webm';
  if (data.toString('latin1', 0, 4) === 'OggS') return 'audio/ogg';
  if (data.toString('latin1', 4, 8) === 'ftyp') return 'audio/mp4';
  return undefined;
}

export class RecordingError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/** Stores a visitor's recording as pending. Throws RecordingError on bad input or limits. */
export function addRecording(
  db: DatabaseSync,
  words: Map<string, string>,
  input: { slug: string; audio: Buffer; visitorId: string; name?: string },
): { id: string; slug: string; text: string } {
  const text = words.get(input.slug);
  if (!text) throw new RecordingError('Unknown word', 400);
  if (input.audio.length > RECORDING_LIMITS.maxBytes) throw new RecordingError('Recording too long', 413);
  const mime = detectAudioType(input.audio);
  if (!mime) throw new RecordingError('Not an audio recording', 415);

  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const today = db
    .prepare('SELECT COUNT(*) AS n FROM recordings WHERE visitor_id = ? AND created_at > ?')
    .get(input.visitorId, since) as Row;
  if (today.n >= RECORDING_LIMITS.perVisitorPerDay) throw new RecordingError('daily_limit', 429);
  const pending = db.prepare("SELECT COUNT(*) AS n FROM recordings WHERE status = 'pending'").get() as Row;
  if (pending.n >= RECORDING_LIMITS.maxPending) throw new RecordingError('too_many_pending', 503);

  const id = newResourceId('rec');
  const name = (input.name || '').trim().slice(0, 60) || null;
  db.prepare('INSERT INTO recordings (id, slug, text, mime, audio, visitor_id, name) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    id, input.slug, text, mime, input.audio, input.visitorId, name,
  );
  return { id, slug: input.slug, text };
}

export interface PendingRecording {
  id: string;
  slug: string;
  text: string;
  name: string | null;
  createdAt: string;
}

export function listPendingRecordings(db: DatabaseSync): PendingRecording[] {
  const rows = db
    .prepare("SELECT id, slug, text, name, created_at FROM recordings WHERE status = 'pending' ORDER BY created_at")
    .all() as Row[];
  return rows.map((r) => ({ id: r.id, slug: r.slug, text: r.text, name: r.name, createdAt: r.created_at }));
}

export function getRecordingAudio(db: DatabaseSync, id: string): { mime: string; audio: Uint8Array; status: string } | undefined {
  return db.prepare('SELECT mime, audio, status FROM recordings WHERE id = ?').get(id) as
    | { mime: string; audio: Uint8Array; status: string }
    | undefined;
}

export function approveRecording(db: DatabaseSync, id: string): boolean {
  return (
    db
      .prepare("UPDATE recordings SET status = 'approved', reviewed_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ? AND status = 'pending'")
      .run(id).changes > 0
  );
}

export function deleteRecording(db: DatabaseSync, id: string): boolean {
  return db.prepare('DELETE FROM recordings WHERE id = ?').run(id).changes > 0;
}

/**
 * What the mini-course plays: slug -> URL. Committed MP3 files first, then the
 * newest approved recording of each word, then the synthetic voice unless a
 * teacher removed it (left out with withSynthetic = false, to know which words
 * still need a real voice).
 */
export function audioMap(db: DatabaseSync, withSynthetic = true): Record<string, string> {
  const map: Record<string, string> = {};
  for (const slug of committedRecordings()) map[slug] = `/audio/${slug}.mp3`;
  const approved = db
    .prepare("SELECT id, slug FROM recordings WHERE status = 'approved' ORDER BY reviewed_at DESC, created_at DESC")
    .all() as Row[];
  for (const r of approved) {
    if (!map[r.slug]) map[r.slug] = `/api/recordings/${encodeURIComponent(r.id)}/audio`;
  }
  if (withSynthetic) {
    // Voices a teacher removed from the editor (table muted_voices) are not played
    const muted = new Set((db.prepare('SELECT slug FROM muted_voices').all() as Row[]).map((r) => r.slug as string));
    const add = (slug: string, url: string) => {
      if (!map[slug] && !muted.has(slug)) map[slug] = url;
    };
    for (const slug of synthesizedRecordings()) add(slug, `/audio/tts/${slug}.mp3`);
    for (const r of db.prepare('SELECT slug FROM synthetic_audio').all() as Row[]) {
      add(r.slug, `/api/tts/${encodeURIComponent(r.slug)}/audio`);
    }
  }
  return map;
}
