/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Tests for the forum stored in the database (server/forum.ts).
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { ROOT_DIR, openDatabase } from '../server/db';
import {
  addComment,
  createTopic,
  deleteComment,
  deleteTopic,
  getForumUser,
  importForum,
  listForum,
  sanitizeTopic,
  toggleLike,
  toggleTopicFlag,
} from '../server/forum';

const SEED = path.join(ROOT_DIR, 'data', 'imports', '2026-09-foro-inicial.json');
const VISITOR = 'visitor-test-1';
const OTHER = 'visitor-test-2';

function seededDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-forum-'));
  const db = openDatabase(path.join(dir, 'forum.db'));
  importForum(db, JSON.parse(fs.readFileSync(SEED, 'utf8')));
  return db;
}

test('the demo forum imports with its users, topics and replies', () => {
  const db = seededDb();
  const { topics, comments } = listForum(db, VISITOR);
  assert.ok(topics.length >= 5);
  for (const t of topics) {
    assert.equal(t.repliesCount, comments[t.id].length, `${t.id}: reply count`);
    assert.ok(t.author?.name, `${t.id}: author missing`);
  }
  for (const id of ['user_current', 'user_teacher_marko', 'user_mod_ana']) {
    assert.ok(getForumUser(db, id), `demo user ${id} missing`);
  }
  db.close();
});

test('sanitizeTopic validates and cleans visitor input', () => {
  assert.throws(() => sanitizeTopic({ title: '', content: 'x' }));
  assert.throws(() => sanitizeTopic({ title: 'x'.repeat(201), content: 'x' }));
  const t = sanitizeTopic({ title: ' Saluton ', content: 'Kiel vi fartas?', category: 'bad', level: 'Z9', tags: ['Unu', 'unu', '', 'du'] });
  assert.equal(t.title, 'Saluton');
  assert.equal(t.category, 'general');
  assert.equal(t.level, 'all');
  assert.deepEqual(t.tags, ['unu', 'du']);
});

test('topics, replies and likes are stored and counted once per visitor', () => {
  const db = seededDb();
  const author = getForumUser(db, 'user_current')!;
  const topic = createTopic(db, author, sanitizeTopic({ title: 'Provo', content: 'Teksto', tags: ['a'] }), VISITOR);
  assert.equal(topic.likes, 1);
  assert.equal(topic.likedByMe, true);

  const reply = addComment(db, topic.id, author, 'Respondo', false, VISITOR);
  assert.equal(listForum(db, VISITOR).comments[topic.id].length, 1);

  // The author already liked the topic: liking again undoes it
  assert.deepEqual(toggleLike(db, 'topic', topic.id, VISITOR), { likes: 0, likedByMe: false });
  assert.deepEqual(toggleLike(db, 'topic', topic.id, OTHER), { likes: 1, likedByMe: true });
  assert.deepEqual(toggleLike(db, 'comment', reply.id, OTHER), { likes: 1, likedByMe: true });
  assert.equal(toggleLike(db, 'topic', 'no-such-topic', OTHER), undefined);

  // likedByMe depends on who is asking
  const forOther = listForum(db, OTHER).topics.find((t) => t.id === topic.id)!;
  const forVisitor = listForum(db, VISITOR).topics.find((t) => t.id === topic.id)!;
  assert.equal(forOther.likedByMe, true);
  assert.equal(forVisitor.likedByMe, false);
  db.close();
});

test('moderation flags and deletes cascade to replies and likes', () => {
  const db = seededDb();
  const author = getForumUser(db, 'user_current')!;
  const topic = createTopic(db, author, sanitizeTopic({ title: 'Forigota', content: 'x' }), VISITOR);
  const reply = addComment(db, topic.id, author, 'y', false, VISITOR);
  toggleLike(db, 'comment', reply.id, OTHER);

  assert.equal(toggleTopicFlag(db, topic.id, 'is_locked'), true);
  assert.equal(listForum(db, VISITOR).topics.find((t) => t.id === topic.id)!.isLocked, true);

  assert.equal(deleteComment(db, reply.id), true);
  assert.equal(deleteComment(db, reply.id), false);
  assert.equal(deleteTopic(db, topic.id), true);
  const left = db.prepare('SELECT COUNT(*) AS n FROM forum_topic_likes WHERE topic_id = ?').get(topic.id) as { n: number };
  assert.equal(left.n, 0);
  db.close();
});
