/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Tests for the mini-course audio and the visitors' recordings (server/audio.ts).
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { openDatabase } from '../server/db';
import {
  RECORDING_LIMITS,
  RecordingError,
  addRecording,
  approveRecording,
  audioMap,
  audioSlug,
  courseWords,
  deleteRecording,
  detectAudioType,
  getRecordingAudio,
  listPendingRecordings,
} from '../server/audio';

// Smallest byte strings that look like each container
const WEBM = Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), Buffer.alloc(60, 1)]);
const MP4 = Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypM4A '), Buffer.alloc(60, 1)]);
const OGG = Buffer.concat([Buffer.from('OggS'), Buffer.alloc(60, 1)]);

function tempDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-audio-'));
  return openDatabase(path.join(dir, 'audio.db'));
}

test('audioSlug uses the x-system and dashes', () => {
  assert.equal(audioSlug('Ĝis revido!'), 'gxis-revido');
  assert.equal(audioSlug('Jes / Ne'), 'jes-ne');
  assert.equal(audioSlug('aŭto'), 'auxto');
  assert.equal(audioSlug('Mi nomiĝas Lucía. Kaj vi?'), 'mi-nomigxas-lucia-kaj-vi');
});

test('the course words come from both mini-course pages', () => {
  const words = courseWords();
  assert.ok(words.size > 100);
  assert.equal(words.get('saluton'), 'Saluton!');
  assert.ok(![...words.values()].some((t) => t.includes('→')), 'rules with arrows are not words');
});

test('detectAudioType trusts the bytes, not the name', () => {
  assert.equal(detectAudioType(WEBM), 'audio/webm');
  assert.equal(detectAudioType(MP4), 'audio/mp4');
  assert.equal(detectAudioType(OGG), 'audio/ogg');
  assert.equal(detectAudioType(Buffer.from('<html><script>alert(1)</script></html>')), undefined);
});

test('recordings wait for approval and then play in the course', () => {
  const db = tempDb();
  const words = courseWords();
  const rec = addRecording(db, words, { slug: 'saluton', audio: WEBM, visitorId: 'visitor-a', name: ' Ana ' });
  assert.equal(rec.text, 'Saluton!');

  assert.equal(audioMap(db).saluton, undefined, 'pending recordings are not played');
  const pending = listPendingRecordings(db);
  assert.equal(pending.length, 1);
  assert.equal(pending[0].name, 'Ana');

  assert.equal(approveRecording(db, rec.id), true);
  assert.equal(approveRecording(db, rec.id), false, 'already approved');
  assert.equal(audioMap(db).saluton, `/api/recordings/${rec.id}/audio`);
  const stored = getRecordingAudio(db, rec.id)!;
  assert.equal(stored.mime, 'audio/webm');
  assert.deepEqual(Buffer.from(stored.audio), WEBM);

  assert.equal(deleteRecording(db, rec.id), true);
  assert.equal(audioMap(db).saluton, undefined);
  db.close();
});

test('bad recordings and floods are rejected', () => {
  const db = tempDb();
  const words = courseWords();
  const send = (over: Partial<Parameters<typeof addRecording>[2]>) =>
    addRecording(db, words, { slug: 'dankon', audio: OGG, visitorId: 'visitor-b', ...over });
  const statusOf = (fn: () => unknown) => {
    try {
      fn();
    } catch (err) {
      assert.ok(err instanceof RecordingError);
      return err.status;
    }
    return 0;
  };
  assert.equal(statusOf(() => send({ slug: 'not-a-course-word' })), 400);
  assert.equal(statusOf(() => send({ audio: Buffer.from('this is not audio at all') })), 415);
  assert.equal(statusOf(() => send({ audio: Buffer.alloc(RECORDING_LIMITS.maxBytes + 1) })), 413);
  for (let i = 0; i < RECORDING_LIMITS.perVisitorPerDay; i++) send({ audio: MP4 });
  assert.equal(statusOf(() => send({})), 429, 'daily limit per visitor');
  assert.equal(statusOf(() => send({ visitorId: 'visitor-c' })), 0, 'other visitors can still send');
  db.close();
});
