/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Client for the Serĉilo REST API (server.ts), backed by the SQLite database.
 */
import { EsperantoResource, KnowledgePanel, RadioEpisode } from './types';
import { ForumComment, ForumTopic, ForumUser } from './types/forum';

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

export function fetchResources(): Promise<EsperantoResource[]> {
  return getJson('/api/resources');
}

export function fetchKnowledgePanels(): Promise<KnowledgePanel[]> {
  return getJson('/api/knowledge');
}

/** Adds one resource. `duplicate` is true when the URL is already indexed. */
export async function addResource(
  item: Omit<EsperantoResource, 'id'>,
): Promise<{ resource?: EsperantoResource; duplicate: boolean }> {
  const res = await fetch('/api/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (res.status === 409) return { duplicate: true };
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return { resource: data, duplicate: false };
}

/** Adds several resources at once; duplicated URLs are skipped by the server. */
export async function addResources(
  items: Omit<EsperantoResource, 'id'>[],
  source: 'user' | 'crawled',
): Promise<{ inserted: EsperantoResource[]; added: number; skippedDuplicates: number }> {
  const res = await fetch('/api/resources/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resources: items, source }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

/** Latest episodes of a station whose player is a podcast feed. */
export async function fetchEpisodes(resourceId: string): Promise<RadioEpisode[]> {
  const data = await getJson<{ episodes: RadioEpisode[] }>(`/api/radio/${encodeURIComponent(resourceId)}/episodes`);
  return data.episodes;
}

// ---- Community forum ----

/** Random id of this browser, so the server counts one like per visitor. */
function visitorId(): string {
  const key = 'sercilo_visitor_id';
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return 'anonymous-visitor';
  }
}

const MODERATOR_KEY = 'sercilo_moderator_key';

export function setModeratorKey(key: string | null): void {
  try {
    if (key) sessionStorage.setItem(MODERATOR_KEY, key);
    else sessionStorage.removeItem(MODERATOR_KEY);
  } catch {}
}

/** Calls the forum API as `user` (the demo user chosen in the role switcher). */
async function forumRequest<T>(method: string, url: string, user: ForumUser | null, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { 'X-Visitor-Id': visitorId() };
  if (user) headers['X-Forum-User'] = user.id;
  try {
    const key = sessionStorage.getItem(MODERATOR_KEY);
    if (key) headers['X-Moderator-Key'] = key;
  } catch {}
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export interface ForumData {
  topics: ForumTopic[];
  comments: Record<string, ForumComment[]>;
  /** True when the server asks for a key to act as moderator. */
  moderatorKeyRequired: boolean;
}

export function fetchForum(): Promise<ForumData> {
  return forumRequest('GET', '/api/forum', null);
}

/** Returns false when the moderator key is wrong. */
export async function checkModeratorKey(key: string): Promise<boolean> {
  const res = await fetch('/api/forum/moderator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  return res.ok;
}

export function createForumTopic(
  user: ForumUser,
  topic: Pick<ForumTopic, 'title' | 'content' | 'category' | 'level' | 'tags'>,
): Promise<ForumTopic> {
  return forumRequest('POST', '/api/forum/topics', user, topic);
}

export function addForumComment(user: ForumUser, topicId: string, content: string, isModNote: boolean): Promise<ForumComment> {
  return forumRequest('POST', `/api/forum/topics/${encodeURIComponent(topicId)}/comments`, user, { content, isModNote });
}

export function toggleForumLike(kind: 'topics' | 'comments', id: string): Promise<{ likes: number; likedByMe: boolean }> {
  return forumRequest('POST', `/api/forum/${kind}/${encodeURIComponent(id)}/like`, null);
}

export function toggleForumTopicFlag(user: ForumUser, topicId: string, flag: 'pin' | 'lock'): Promise<ForumTopic> {
  return forumRequest('POST', `/api/forum/topics/${encodeURIComponent(topicId)}/${flag}`, user);
}

export function deleteForumItem(user: ForumUser, kind: 'topics' | 'comments', id: string): Promise<void> {
  return forumRequest('DELETE', `/api/forum/${kind}/${encodeURIComponent(id)}`, user);
}
