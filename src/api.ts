/**
 * Client for the Serĉilo REST API (server.ts), backed by the SQLite database.
 */
import { EsperantoResource, KnowledgePanel } from './types';

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
