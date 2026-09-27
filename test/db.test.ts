/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Tests for the SQLite layer (server/db.ts) and for the committed database.
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { DEFAULT_DB_PATH, insertResources, listKnowledgePanels, listResources, openDatabase, sanitizeResource, urlKey } from '../server/db';

function tempDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-test-'));
  return openDatabase(path.join(dir, 'test.db'));
}

test('a new database is created with the schema and no data', () => {
  const db = tempDb();
  assert.equal(listResources(db).length, 0);
  assert.equal(listKnowledgePanels(db).length, 0);
  db.close();
});

test('sanitizeResource rejects bad input and fills defaults', () => {
  assert.throws(() => sanitizeResource({ title: 'x', url: 'not a url' }), /Invalid URL/);
  assert.throws(() => sanitizeResource({ url: 'https://example.org' }), /Title/);
  const r = sanitizeResource({ title: ' Vortaro ', url: 'https://www.example.org/vortaro', category: 'nope', tags: ['A', ' b '] });
  assert.equal(r.title, 'Vortaro');
  assert.equal(r.category, 'projects');
  assert.equal(r.displayUrl, 'example.org/vortaro');
  assert.deepEqual(r.tags, ['a', 'b']);
  assert.equal(r.isFree, true);
});

test('insertResources skips duplicated URLs', () => {
  const db = tempDb();
  const item = sanitizeResource({ title: 'Lernu', url: 'https://lernu.net/' });
  assert.equal(insertResources(db, [item], 'user').inserted.length, 1);
  const again = sanitizeResource({ title: 'Lernu 2', url: 'HTTPS://LERNU.NET' });
  const result = insertResources(db, [again], 'user');
  assert.equal(result.inserted.length, 0);
  assert.equal(result.skippedDuplicates, 1);
  assert.equal(listResources(db).length, 1);
  db.close();
});

test('the committed database is consistent', () => {
  // Open a copy so the test never modifies data/serchi.db
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-test-'));
  const file = path.join(dir, 'copy.db');
  fs.copyFileSync(DEFAULT_DB_PATH, file);
  const db = openDatabase(file);
  const resources = listResources(db);
  assert.ok(resources.length > 500, `expected more than 500 links, got ${resources.length}`);
  const keys = new Set<string>();
  for (const r of resources) {
    assert.match(r.url, /^https?:\/\//, `${r.id}: bad URL ${r.url}`);
    assert.ok(r.title.trim(), `${r.id}: empty title`);
    assert.ok(!keys.has(urlKey(r.url)), `${r.id}: duplicated URL ${r.url}`);
    keys.add(urlKey(r.url));
  }
  for (const p of listKnowledgePanels(db)) {
    assert.ok(p.keywords.length > 0, `panel ${p.id} has no keywords`);
  }
  const topics = db.prepare('SELECT COUNT(*) AS n FROM forum_topics').get() as { n: number };
  assert.ok(topics.n > 0, 'the demo forum is not loaded');
  db.close();
});
