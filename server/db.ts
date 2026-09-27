/**
 * SQLite access layer for Serĉilo (Node's built-in `node:sqlite`, Node >= 22.13).
 *
 * The database file (data/serchi.db by default, or SERCHI_DB) holds the
 * resource index and the knowledge panels. The schema lives in data/schema.sql
 * and is applied on every open, so a missing database is created empty.
 */
import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type {
  Category,
  EsperantoResource,
  Format,
  KnowledgePanel,
  Level,
} from '../src/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.resolve(__dirname, '..');
export const DEFAULT_DB_PATH = path.join(ROOT_DIR, 'data', 'serchi.db');
const SCHEMA_PATH = path.join(ROOT_DIR, 'data', 'schema.sql');

const CATEGORIES: Category[] = ['courses', 'news', 'projects', 'tools', 'literature', 'media', 'community'];
const LEVELS: Level[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];
const FORMATS: Format[] = ['website', 'app', 'podcast', 'book', 'video', 'forum', 'course', 'tool'];
const LANGS = ['eo', 'es', 'en'] as const;

export type ResourceSource = 'curated' | 'user' | 'crawled';
export type NewResource = Omit<EsperantoResource, 'id'> & { id?: string };

/** Lower-cased URL without trailing slashes: the key used to reject duplicates. */
export function urlKey(url: string): string {
  return url.trim().toLowerCase().replace(/\/+$/, '');
}

export function openDatabase(file = process.env.SERCHI_DB || DEFAULT_DB_PATH): DatabaseSync {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  return db;
}

function groupBy<T extends Record<string, unknown>>(rows: T[], key: keyof T): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const k = String(row[key]);
    const list = map.get(k);
    if (list) list.push(row);
    else map.set(k, [row]);
  }
  return map;
}

type Row = Record<string, any>;

/** All resources in display order, with tags, languages and features. */
export function listResources(db: DatabaseSync): EsperantoResource[] {
  const rows = db.prepare('SELECT * FROM resources ORDER BY position, rowid').all() as Row[];
  const tags = groupBy(db.prepare('SELECT * FROM resource_tags ORDER BY resource_id, position').all() as Row[], 'resource_id');
  const langs = groupBy(db.prepare('SELECT * FROM resource_languages ORDER BY resource_id, position').all() as Row[], 'resource_id');
  const feats = groupBy(db.prepare('SELECT * FROM resource_features ORDER BY resource_id, lang, position').all() as Row[], 'resource_id');

  return rows.map((r) => {
    const resource: EsperantoResource = {
      id: r.id,
      title: r.title,
      url: r.url,
      displayUrl: r.display_url,
      description: { eo: r.description_eo, es: r.description_es, en: r.description_en },
      category: r.category,
      level: r.level,
      tags: (tags.get(r.id) || []).map((t) => t.tag),
      isFree: !!r.is_free,
      format: r.format,
    };
    if (r.author) resource.author = r.author;
    if (r.featured) resource.featured = true;
    if (r.year !== null && r.year !== undefined && r.year !== '') resource.year = r.year;
    const l = langs.get(r.id);
    if (l) resource.languages = l.map((x) => x.lang);
    const f = feats.get(r.id);
    if (f) {
      resource.features = { eo: [], es: [], en: [] };
      for (const x of f) resource.features[x.lang as 'eo' | 'es' | 'en'].push(x.text);
    }
    return resource;
  });
}

export function listKnowledgePanels(db: DatabaseSync): KnowledgePanel[] {
  const rows = db.prepare('SELECT * FROM knowledge_panels ORDER BY position, id').all() as Row[];
  const keywords = groupBy(db.prepare('SELECT * FROM knowledge_keywords ORDER BY panel_id, position').all() as Row[], 'panel_id');
  const facts = groupBy(db.prepare('SELECT * FROM knowledge_facts ORDER BY panel_id, position').all() as Row[], 'panel_id');
  const links = groupBy(db.prepare('SELECT * FROM knowledge_links ORDER BY panel_id, position').all() as Row[], 'panel_id');

  return rows.map((p) => {
    const panel: KnowledgePanel = {
      id: p.id,
      keywords: (keywords.get(p.id) || []).map((k) => k.keyword),
      title: p.title,
      subtitle: { eo: p.subtitle_eo, es: p.subtitle_es, en: p.subtitle_en },
      description: { eo: p.description_eo, es: p.description_es, en: p.description_en },
      facts: (facts.get(p.id) || []).map((f) => ({
        label: { eo: f.label_eo, es: f.label_es, en: f.label_en },
        value: f.value,
      })),
      links: (links.get(p.id) || []).map((l) => ({ title: l.title, url: l.url })),
    };
    if (p.icon_name) panel.iconName = p.icon_name;
    return panel;
  });
}

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Validates and normalizes a resource coming from a client or an import file. */
export function sanitizeResource(input: any): NewResource {
  const url = String(input?.url || '').trim();
  if (!/^https?:\/\/[^\s]+\.[^\s]+/i.test(url)) {
    throw new Error('Invalid URL');
  }
  const title = String(input?.title || '').trim();
  if (!title) throw new Error('Title is required');

  const desc = input?.description || {};
  const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : []);

  let displayUrl = text(input?.displayUrl);
  if (!displayUrl) {
    try {
      const parsed = new URL(url);
      displayUrl = parsed.hostname.replace(/^www\./, '') + (parsed.pathname !== '/' ? parsed.pathname : '');
    } catch {
      displayUrl = url;
    }
  }

  const resource: NewResource = {
    id: text(input?.id) || undefined,
    title,
    url,
    displayUrl,
    description: { eo: text(desc.eo), es: text(desc.es), en: text(desc.en) },
    category: pick(input?.category, CATEGORIES, 'projects'),
    level: pick(input?.level, LEVELS, 'all'),
    format: pick(input?.format, FORMATS, 'website'),
    tags: list(input?.tags).map((t) => t.toLowerCase()),
    isFree: input?.isFree !== false,
  };
  if (text(input?.author)) resource.author = text(input.author);
  if (input?.featured) resource.featured = true;
  if (input?.year !== undefined && input?.year !== null && String(input.year).trim()) resource.year = input.year;
  if (Array.isArray(input?.languages)) resource.languages = list(input.languages);
  if (input?.features && typeof input.features === 'object') {
    resource.features = { eo: list(input.features.eo), es: list(input.features.es), en: list(input.features.en) };
  }
  return resource;
}

export function newResourceId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Inserts resources inside one transaction. Duplicated URLs (by urlKey) are
 * skipped. New user/crawled resources go first (lowest position), curated
 * imports keep the order given. Returns the inserted resources.
 */
export function insertResources(
  db: DatabaseSync,
  items: NewResource[],
  source: ResourceSource,
): { inserted: EsperantoResource[]; skippedDuplicates: number } {
  const exists = db.prepare('SELECT 1 FROM resources WHERE url_key = ? OR id = ?');
  const insert = db.prepare(`INSERT INTO resources
    (id, title, url, url_key, display_url, description_eo, description_es, description_en,
     category, level, format, is_free, author, featured, year, source, position)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insertTag = db.prepare('INSERT INTO resource_tags (resource_id, position, tag) VALUES (?, ?, ?)');
  const insertLang = db.prepare('INSERT INTO resource_languages (resource_id, position, lang) VALUES (?, ?, ?)');
  const insertFeature = db.prepare('INSERT INTO resource_features (resource_id, lang, position, text) VALUES (?, ?, ?, ?)');
  const bounds = db.prepare('SELECT MIN(position) AS minPos, MAX(position) AS maxPos FROM resources').get() as Row;

  const inserted: EsperantoResource[] = [];
  let skippedDuplicates = 0;
  // User additions are shown before curated ones, like the React version always did
  let position = source === 'curated' ? (bounds.maxPos ?? -1) + 1 : (bounds.minPos ?? 0) - items.length;

  db.exec('BEGIN');
  try {
    for (const item of items) {
      const id = item.id || newResourceId(source === 'crawled' ? 'crawled' : source === 'user' ? 'custom' : 'res');
      if (exists.get(urlKey(item.url), id)) {
        skippedDuplicates++;
        continue;
      }
      insert.run(
        id, item.title, item.url, urlKey(item.url), item.displayUrl,
        item.description.eo, item.description.es, item.description.en,
        item.category, item.level, item.format, item.isFree ? 1 : 0,
        item.author ?? null, item.featured ? 1 : 0,
        item.year ?? null, source, position++,
      );
      item.tags.forEach((tag, i) => insertTag.run(id, i, tag));
      item.languages?.forEach((lang, i) => insertLang.run(id, i, lang));
      if (item.features) {
        for (const lang of LANGS) item.features[lang].forEach((text, i) => insertFeature.run(id, lang, i, text));
      }
      inserted.push({ ...item, id } as EsperantoResource);
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  return { inserted, skippedDuplicates };
}

/** Replaces all knowledge panels (used by imports). */
export function replaceKnowledgePanels(db: DatabaseSync, panels: KnowledgePanel[]): void {
  const insertPanel = db.prepare(`INSERT INTO knowledge_panels
    (id, position, title, subtitle_eo, subtitle_es, subtitle_en, description_eo, description_es, description_en, icon_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insertKeyword = db.prepare('INSERT INTO knowledge_keywords (panel_id, position, keyword) VALUES (?, ?, ?)');
  const insertFact = db.prepare('INSERT INTO knowledge_facts (panel_id, position, label_eo, label_es, label_en, value) VALUES (?, ?, ?, ?, ?, ?)');
  const insertLink = db.prepare('INSERT INTO knowledge_links (panel_id, position, title, url) VALUES (?, ?, ?, ?)');

  db.exec('BEGIN');
  try {
    db.exec('DELETE FROM knowledge_panels');
    panels.forEach((p, pos) => {
      insertPanel.run(p.id, pos, p.title, p.subtitle.eo, p.subtitle.es, p.subtitle.en,
        p.description.eo, p.description.es, p.description.en, p.iconName ?? null);
      p.keywords.forEach((k, i) => insertKeyword.run(p.id, i, k));
      p.facts.forEach((f, i) => insertFact.run(p.id, i, f.label.eo, f.label.es, f.label.en, f.value));
      p.links.forEach((l, i) => insertLink.run(p.id, i, l.title, l.url));
    });
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}
