/**
 * Community forum stored in the SQLite database (tables forum_* in
 * data/schema.sql), shared by every visitor.
 *
 * Likes are counted per visitor: `visitorId` is a random id the browser keeps,
 * and `likedByMe` in the returned topics and comments refers to it.
 */
import type { DatabaseSync } from 'node:sqlite';
import type { ForumComment, ForumTopic, ForumUser } from '../src/types/forum';
import { newResourceId } from './db';

type Row = Record<string, any>;

export const FORUM_CATEGORIES: ForumTopic['category'][] = ['general', 'questions', 'grammar', 'practice', 'resources', 'events'];
export const FORUM_LEVELS: ForumTopic['level'][] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];
const LANGUAGES = ['eo', 'es', 'en', 'multilingual'];

/** Length limits for what visitors write. */
export const FORUM_LIMITS = { title: 200, content: 5000, tags: 10, tag: 40 };

function toUser(r: Row): ForumUser {
  const user: ForumUser = { id: r.id, name: r.name, role: r.role, avatarColor: r.avatar_color };
  if (r.level_badge) user.levelBadge = r.level_badge;
  return user;
}

export function getForumUser(db: DatabaseSync, id: string): ForumUser | undefined {
  const row = db.prepare('SELECT * FROM forum_users WHERE id = ?').get(id) as Row | undefined;
  return row ? toUser(row) : undefined;
}

function users(db: DatabaseSync): Map<string, ForumUser> {
  const rows = db.prepare('SELECT * FROM forum_users').all() as Row[];
  return new Map(rows.map((r) => [r.id as string, toUser(r)]));
}

const TOPIC_SELECT = `SELECT t.*,
    (SELECT COUNT(*) FROM forum_comments c WHERE c.topic_id = t.id) AS replies,
    EXISTS (SELECT 1 FROM forum_topic_likes l WHERE l.topic_id = t.id AND l.visitor_id = ?) AS liked
  FROM forum_topics t`;

const COMMENT_SELECT = `SELECT c.*,
    EXISTS (SELECT 1 FROM forum_comment_likes l WHERE l.comment_id = c.id AND l.visitor_id = ?) AS liked
  FROM forum_comments c`;

function toTopic(r: Row, byId: Map<string, ForumUser>, tags: string[]): ForumTopic {
  const topic: ForumTopic = {
    id: r.id,
    title: r.title,
    content: r.content,
    author: byId.get(r.author_id)!,
    level: r.level,
    category: r.category,
    tags,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    views: r.views,
    likes: r.likes,
    likedByMe: !!r.liked,
    repliesCount: r.replies,
    isPinned: !!r.is_pinned,
    isLocked: !!r.is_locked,
  };
  if (r.language_used) topic.languageUsed = r.language_used;
  return topic;
}

function toComment(r: Row, byId: Map<string, ForumUser>): ForumComment {
  return {
    id: r.id,
    topicId: r.topic_id,
    author: byId.get(r.author_id)!,
    content: r.content,
    createdAt: r.created_at,
    likes: r.likes,
    likedByMe: !!r.liked,
    isModeratorNote: !!r.is_moderator_note,
  };
}

/** All topics (newest first) and their comments (oldest first), keyed by topic id. */
export function listForum(db: DatabaseSync, visitorId: string): { topics: ForumTopic[]; comments: Record<string, ForumComment[]> } {
  const byId = users(db);
  const tagRows = db.prepare('SELECT topic_id, tag FROM forum_topic_tags ORDER BY topic_id, position').all() as Row[];
  const tags = new Map<string, string[]>();
  for (const t of tagRows) {
    const list = tags.get(t.topic_id);
    if (list) list.push(t.tag);
    else tags.set(t.topic_id, [t.tag]);
  }
  const topics = (db.prepare(`${TOPIC_SELECT} ORDER BY t.created_at DESC`).all(visitorId) as Row[]).map((r) =>
    toTopic(r, byId, tags.get(r.id) || []),
  );
  const comments: Record<string, ForumComment[]> = {};
  for (const t of topics) comments[t.id] = [];
  for (const r of db.prepare(`${COMMENT_SELECT} ORDER BY c.created_at, c.rowid`).all(visitorId) as Row[]) {
    comments[r.topic_id]?.push(toComment(r, byId));
  }
  return { topics, comments };
}

export function getTopic(db: DatabaseSync, id: string, visitorId: string): ForumTopic | undefined {
  const row = db.prepare(`${TOPIC_SELECT} WHERE t.id = ?`).get(visitorId, id) as Row | undefined;
  if (!row) return undefined;
  const tags = (db.prepare('SELECT tag FROM forum_topic_tags WHERE topic_id = ? ORDER BY position').all(id) as Row[]).map((t) => t.tag);
  return toTopic(row, users(db), tags);
}

export function getComment(db: DatabaseSync, id: string, visitorId: string): ForumComment | undefined {
  const row = db.prepare(`${COMMENT_SELECT} WHERE c.id = ?`).get(visitorId, id) as Row | undefined;
  return row ? toComment(row, users(db)) : undefined;
}

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Validates a new topic sent by a visitor. Throws with a message on bad input. */
export function sanitizeTopic(input: any): { title: string; content: string; category: ForumTopic['category']; level: ForumTopic['level']; tags: string[] } {
  const title = String(input?.title ?? '').trim();
  const content = String(input?.content ?? '').trim();
  if (!title || !content) throw new Error('Title and content are required');
  if (title.length > FORUM_LIMITS.title || content.length > FORUM_LIMITS.content) throw new Error('Text too long');
  const tags = (Array.isArray(input?.tags) ? input.tags : [])
    .map((t: unknown) => String(t).trim().toLowerCase().slice(0, FORUM_LIMITS.tag))
    .filter(Boolean)
    .slice(0, FORUM_LIMITS.tags);
  return {
    title,
    content,
    category: pick(input?.category, FORUM_CATEGORIES, 'general'),
    level: pick(input?.level, FORUM_LEVELS, 'all'),
    tags: [...new Set<string>(tags)],
  };
}

function inTransaction<T>(db: DatabaseSync, fn: () => T): T {
  db.exec('BEGIN');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

export function createTopic(db: DatabaseSync, author: ForumUser, data: ReturnType<typeof sanitizeTopic>, visitorId: string): ForumTopic {
  const id = newResourceId('topic');
  inTransaction(db, () => {
    db.prepare(`INSERT INTO forum_topics (id, title, content, author_id, level, category, views, likes)
      VALUES (?, ?, ?, ?, ?, ?, 1, 1)`).run(id, data.title, data.content, author.id, data.level, data.category);
    // The author likes their own topic, as the forum always did
    db.prepare('INSERT INTO forum_topic_likes (topic_id, visitor_id) VALUES (?, ?)').run(id, visitorId);
    const insertTag = db.prepare('INSERT INTO forum_topic_tags (topic_id, position, tag) VALUES (?, ?, ?)');
    data.tags.forEach((tag, i) => insertTag.run(id, i, tag));
  });
  return getTopic(db, id, visitorId)!;
}

export function addComment(
  db: DatabaseSync,
  topicId: string,
  author: ForumUser,
  content: string,
  isModNote: boolean,
  visitorId: string,
): ForumComment {
  const id = newResourceId('comm');
  const now = new Date().toISOString();
  inTransaction(db, () => {
    db.prepare(`INSERT INTO forum_comments (id, topic_id, author_id, content, is_moderator_note, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`).run(id, topicId, author.id, content, isModNote ? 1 : 0, now);
    db.prepare('UPDATE forum_topics SET updated_at = ? WHERE id = ?').run(now, topicId);
  });
  return getComment(db, id, visitorId)!;
}

/** Likes or unlikes a topic or comment for this visitor. Returns the new state. */
export function toggleLike(
  db: DatabaseSync,
  kind: 'topic' | 'comment',
  id: string,
  visitorId: string,
): { likes: number; likedByMe: boolean } | undefined {
  const table = kind === 'topic' ? 'forum_topics' : 'forum_comments';
  const likes = kind === 'topic' ? 'forum_topic_likes' : 'forum_comment_likes';
  const key = kind === 'topic' ? 'topic_id' : 'comment_id';
  if (!db.prepare(`SELECT 1 FROM ${table} WHERE id = ?`).get(id)) return undefined;
  return inTransaction(db, () => {
    const removed = db.prepare(`DELETE FROM ${likes} WHERE ${key} = ? AND visitor_id = ?`).run(id, visitorId).changes > 0;
    if (removed) {
      db.prepare(`UPDATE ${table} SET likes = MAX(0, likes - 1) WHERE id = ?`).run(id);
    } else {
      db.prepare(`INSERT INTO ${likes} (${key}, visitor_id) VALUES (?, ?)`).run(id, visitorId);
      db.prepare(`UPDATE ${table} SET likes = likes + 1 WHERE id = ?`).run(id);
    }
    const row = db.prepare(`SELECT likes FROM ${table} WHERE id = ?`).get(id) as Row;
    return { likes: row.likes as number, likedByMe: !removed };
  });
}

/** Flips is_pinned or is_locked. Returns false when the topic does not exist. */
export function toggleTopicFlag(db: DatabaseSync, id: string, flag: 'is_pinned' | 'is_locked'): boolean {
  return db.prepare(`UPDATE forum_topics SET ${flag} = 1 - ${flag} WHERE id = ?`).run(id).changes > 0;
}

export function deleteTopic(db: DatabaseSync, id: string): boolean {
  return db.prepare('DELETE FROM forum_topics WHERE id = ?').run(id).changes > 0;
}

export function deleteComment(db: DatabaseSync, id: string): boolean {
  return db.prepare('DELETE FROM forum_comments WHERE id = ?').run(id).changes > 0;
}

/**
 * Replaces the whole forum with the content of a forum.json file
 * ({ topics: ForumTopic[], comments: { [topicId]: ForumComment[] } }), as used
 * by the Delphi version. The authors found in it become the forum users.
 * Like counts are kept, but not who liked what (the file has no visitors).
 */
export function importForum(db: DatabaseSync, data: { topics: ForumTopic[]; comments?: Record<string, ForumComment[]> }): { topics: number; comments: number } {
  const topics = data.topics || [];
  const comments = Object.values(data.comments || {}).flat();
  const authors = new Map<string, ForumUser>();
  for (const item of [...topics, ...comments]) authors.set(item.author.id, item.author);

  inTransaction(db, () => {
    db.exec('DELETE FROM forum_topics'); // cascades to tags, comments and likes
    db.exec('DELETE FROM forum_users');
    const insertUser = db.prepare('INSERT INTO forum_users (id, name, role, avatar_color, level_badge) VALUES (?, ?, ?, ?, ?)');
    for (const u of authors.values()) insertUser.run(u.id, u.name, u.role, u.avatarColor, u.levelBadge ?? null);

    const insertTopic = db.prepare(`INSERT INTO forum_topics
      (id, title, content, author_id, level, category, language_used, views, likes, is_pinned, is_locked, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertTag = db.prepare('INSERT INTO forum_topic_tags (topic_id, position, tag) VALUES (?, ?, ?)');
    for (const t of topics) {
      insertTopic.run(
        t.id, t.title, t.content, t.author.id,
        pick(t.level, FORUM_LEVELS, 'all'), pick(t.category, FORUM_CATEGORIES, 'general'),
        LANGUAGES.includes(t.languageUsed as string) ? t.languageUsed! : null,
        t.views || 0, t.likes || 0, t.isPinned ? 1 : 0, t.isLocked ? 1 : 0, t.createdAt, t.updatedAt || t.createdAt,
      );
      (t.tags || []).forEach((tag, i) => insertTag.run(t.id, i, tag));
    }

    const insertComment = db.prepare(`INSERT INTO forum_comments
      (id, topic_id, author_id, content, likes, is_moderator_note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    for (const [topicId, list] of Object.entries(data.comments || {})) {
      for (const c of list) {
        insertComment.run(c.id, c.topicId || topicId, c.author.id, c.content, c.likes || 0, c.isModeratorNote ? 1 : 0, c.createdAt);
      }
    }
  });
  return { topics: topics.length, comments: comments.length };
}
