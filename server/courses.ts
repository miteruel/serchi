/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Courses made with the course editor (public/editor.html): storage in the
 * database (tables courses and course_images), validation of the content and
 * the HTML page of each course (/kurso/<slug>), styled like the mini-course.
 *
 * Texts are plain text with two marks: **bold** and {{Esperanto}} (shown in
 * green and given a 🔊 button when it has a recording). Everything else is
 * escaped, so an editor cannot inject HTML.
 */
import type { DatabaseSync } from 'node:sqlite';
import { newResourceId } from './db';

type Row = Record<string, any>;

export type CourseLang = 'es' | 'en';

export interface WordItem { eo: string; tr: string }

export type CourseBlock =
  | { type: 'words'; title: string; items: WordItem[] }
  | { type: 'text'; title: string; text: string }
  | { type: 'rule'; text: string }
  | { type: 'exercise'; title: string; items: string[]; answers: string[] }
  | { type: 'dialog'; title: string; lines: WordItem[] };

export interface CourseLesson {
  title: string; // usually in Esperanto: "Saluton!"
  subtitle: string; // in the explanation language
  image: string | null; // id in course_images
  imageAlt: string;
  blocks: CourseBlock[];
  challenge: string;
}

export interface CourseContent {
  intro: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  slug: string;
  lang: CourseLang;
  title: string;
  published: boolean;
  content: CourseContent;
  updatedAt: string;
}

export const COURSE_LIMITS = {
  title: 120, text: 3000, short: 200, lessons: 40, blocks: 30, items: 60,
  imageBytes: 2 * 1024 * 1024,
};

export class CourseError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

// ---- Validation ------------------------------------------------------------

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const arr = (v: unknown, max: number): unknown[] => (Array.isArray(v) ? v.slice(0, max) : []);
const word = (v: any): WordItem => ({ eo: str(v?.eo, COURSE_LIMITS.short), tr: str(v?.tr, COURSE_LIMITS.short) });

function sanitizeBlock(b: any): CourseBlock | undefined {
  const title = str(b?.title, COURSE_LIMITS.short);
  switch (b?.type) {
    case 'words':
      return { type: 'words', title, items: arr(b.items, COURSE_LIMITS.items).map(word).filter((w) => w.eo) };
    case 'text':
      return { type: 'text', title, text: str(b.text, COURSE_LIMITS.text) };
    case 'rule':
      return { type: 'rule', text: str(b.text, COURSE_LIMITS.text) };
    case 'exercise':
      return {
        type: 'exercise',
        title,
        items: arr(b.items, COURSE_LIMITS.items).map((x) => str(x, COURSE_LIMITS.short)).filter(Boolean),
        answers: arr(b.answers, COURSE_LIMITS.items).map((x) => str(x, COURSE_LIMITS.short)),
      };
    case 'dialog':
      return { type: 'dialog', title, lines: arr(b.lines, COURSE_LIMITS.items).map(word).filter((w) => w.eo) };
    default:
      return undefined;
  }
}

/** Cleans a course content sent by the editor. `imageIds` are the images of this course. */
export function sanitizeContent(input: any, imageIds: Set<string>): CourseContent {
  return {
    intro: str(input?.intro, COURSE_LIMITS.text),
    lessons: arr(input?.lessons, COURSE_LIMITS.lessons).map((l: any) => ({
      title: str(l?.title, COURSE_LIMITS.short),
      subtitle: str(l?.subtitle, COURSE_LIMITS.short),
      image: typeof l?.image === 'string' && imageIds.has(l.image) ? l.image : null,
      imageAlt: str(l?.imageAlt, COURSE_LIMITS.short),
      blocks: arr(l?.blocks, COURSE_LIMITS.blocks).map(sanitizeBlock).filter((b): b is CourseBlock => !!b),
      challenge: str(l?.challenge, COURSE_LIMITS.text),
    })),
  };
}

/** Address part of a course: "Esperanto por la familio" -> esperanto-por-la-familio */
export function courseSlug(text: string): string {
  const x: Record<string, string> = { ĉ: 'c', ĝ: 'g', ĥ: 'h', ĵ: 'j', ŝ: 's', ŭ: 'u' };
  return text
    .toLowerCase()
    .replace(/[ĉĝĥĵŝŭ]/g, (c) => x[c])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

// ---- Storage ---------------------------------------------------------------

function toCourse(r: Row): Course {
  return {
    id: r.id,
    slug: r.slug,
    lang: r.lang,
    title: r.title,
    published: !!r.published,
    content: JSON.parse(r.content),
    updatedAt: r.updated_at,
  };
}

export function listCourses(db: DatabaseSync, onlyPublished: boolean): Omit<Course, 'content'>[] {
  const rows = db
    .prepare(`SELECT id, slug, lang, title, published, updated_at FROM courses ${onlyPublished ? 'WHERE published = 1' : ''} ORDER BY title`)
    .all() as Row[];
  return rows.map((r) => ({ id: r.id, slug: r.slug, lang: r.lang, title: r.title, published: !!r.published, updatedAt: r.updated_at }));
}

export function getCourse(db: DatabaseSync, id: string): Course | undefined {
  const row = db.prepare('SELECT * FROM courses WHERE id = ?').get(id) as Row | undefined;
  return row ? toCourse(row) : undefined;
}

export function getCourseBySlug(db: DatabaseSync, slug: string): Course | undefined {
  const row = db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug) as Row | undefined;
  return row ? toCourse(row) : undefined;
}

function uniqueSlug(db: DatabaseSync, wanted: string, exceptId?: string): string {
  const base = courseSlug(wanted) || 'kurso';
  let slug = base;
  for (let n = 2; ; n++) {
    const row = db.prepare('SELECT id FROM courses WHERE slug = ?').get(slug) as Row | undefined;
    if (!row || row.id === exceptId) return slug;
    slug = `${base}-${n}`;
  }
}

export function createCourse(db: DatabaseSync, input: { title?: unknown; lang?: unknown }): Course {
  const title = str(input.title, COURSE_LIMITS.title);
  if (!title) throw new CourseError('Title is required');
  const lang: CourseLang = input.lang === 'en' ? 'en' : 'es';
  const id = newResourceId('course');
  const content: CourseContent = { intro: '', lessons: [] };
  db.prepare('INSERT INTO courses (id, slug, lang, title, content) VALUES (?, ?, ?, ?, ?)').run(
    id, uniqueSlug(db, title), lang, title, JSON.stringify(content),
  );
  return getCourse(db, id)!;
}

/** Saves the whole course as sent by the editor. */
export function updateCourse(db: DatabaseSync, id: string, input: any): Course {
  const current = getCourse(db, id);
  if (!current) throw new CourseError('Not found', 404);
  const title = str(input?.title, COURSE_LIMITS.title) || current.title;
  const slug = uniqueSlug(db, str(input?.slug, 60) || current.slug, id);
  const lang: CourseLang = input?.lang === 'en' ? 'en' : input?.lang === 'es' ? 'es' : current.lang;
  const images = new Set((db.prepare('SELECT id FROM course_images WHERE course_id = ?').all(id) as Row[]).map((r) => r.id as string));
  const content = sanitizeContent(input?.content, images);
  const published = typeof input?.published === 'boolean' ? input.published : current.published;
  db.prepare(`UPDATE courses SET slug = ?, lang = ?, title = ?, content = ?, published = ?,
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?`).run(slug, lang, title, JSON.stringify(content), published ? 1 : 0, id);
  // Pictures no lesson uses any more are deleted
  const used = new Set(content.lessons.map((l) => l.image).filter(Boolean));
  for (const img of images) if (!used.has(img)) db.prepare('DELETE FROM course_images WHERE id = ?').run(img);
  return getCourse(db, id)!;
}

export function deleteCourse(db: DatabaseSync, id: string): boolean {
  return db.prepare('DELETE FROM courses WHERE id = ?').run(id).changes > 0;
}

// ---- Images ----------------------------------------------------------------

export function detectImageType(data: Buffer): 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' | undefined {
  if (data.length < 12) return undefined;
  if (data[0] === 0x89 && data.toString('latin1', 1, 4) === 'PNG') return 'image/png';
  if (data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return 'image/jpeg';
  if (data.toString('latin1', 0, 4) === 'RIFF' && data.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  if (data.toString('latin1', 0, 4) === 'GIF8') return 'image/gif';
  return undefined; // SVG is not accepted: it can carry scripts
}

export function addCourseImage(db: DatabaseSync, courseId: string, data: Buffer): { id: string; url: string } {
  if (!getCourse(db, courseId)) throw new CourseError('Not found', 404);
  if (data.length > COURSE_LIMITS.imageBytes) throw new CourseError('Image too large', 413);
  const mime = detectImageType(data);
  if (!mime) throw new CourseError('Use a PNG, JPEG, WebP or GIF picture', 415);
  const id = newResourceId('img');
  db.prepare('INSERT INTO course_images (id, course_id, mime, data) VALUES (?, ?, ?, ?)').run(id, courseId, mime, data);
  return { id, url: imageUrl(id) };
}

export function getCourseImage(db: DatabaseSync, id: string): { mime: string; data: Uint8Array } | undefined {
  return db.prepare('SELECT mime, data FROM course_images WHERE id = ?').get(id) as { mime: string; data: Uint8Array } | undefined;
}

export const imageUrl = (id: string) => `/api/course-images/${encodeURIComponent(id)}`;

// ---- Words to record -------------------------------------------------------

/** Esperanto texts of a course that can have a recording (for the "Grabar" page). */
export function courseEsperantoTexts(content: CourseContent): string[] {
  const out: string[] = [];
  const marked = (t: string) => { for (const m of t.matchAll(/\{\{(.+?)\}\}/g)) out.push(m[1].trim()); };
  for (const l of content.lessons) {
    for (const b of l.blocks) {
      if (b.type === 'words') b.items.forEach((w) => out.push(w.eo));
      if (b.type === 'dialog') b.lines.forEach((w) => out.push(w.eo));
      if (b.type === 'text' || b.type === 'rule') marked(b.text);
      if (b.type === 'exercise') { b.items.forEach(marked); b.answers.forEach(marked); }
    }
    marked(l.challenge);
  }
  return out.filter(Boolean);
}

/** Esperanto texts of each published course, by title. */
export function publishedCourseTextGroups(db: DatabaseSync): { title: string; texts: string[] }[] {
  const rows = db.prepare('SELECT title, content FROM courses WHERE published = 1 ORDER BY title').all() as Row[];
  return rows.map((r) => ({ title: r.title, texts: courseEsperantoTexts(JSON.parse(r.content)) }));
}

/** Esperanto texts of every published course. */
export function publishedCourseTexts(db: DatabaseSync): string[] {
  return publishedCourseTextGroups(db).flatMap((g) => g.texts);
}

// ---- HTML page -------------------------------------------------------------

const UI = {
  es: {
    day: 'Día', words: 'Palabras', answers: 'Ver soluciones', challenge: 'Reto del día',
    progress: 'Marca cada día al terminarlo', diplomaLocked: 'Marca todos los días como hechos para conseguir tu diploma.',
    diplomaDone: '¡Has terminado el curso!', finished: '¡Has terminado! Baja hasta el diploma.',
    of: 'de', done: '✓ Hecho', mark: 'Marcar como hecho', name: 'Escribe tu nombre para el diploma',
    listen: 'Escuchar: ', courses: 'Cursos', empty: 'Este curso todavía no tiene lecciones.',
  },
  en: {
    day: 'Day', words: 'Words', answers: 'Show answers', challenge: 'Challenge of the day',
    progress: 'Tick off each day when you finish it', diplomaLocked: 'Mark every day as done to get your diploma.',
    diplomaDone: 'You have finished the course!', finished: 'You have finished! Scroll down to your diploma.',
    of: 'of', done: '✓ Done', mark: 'Mark as done', name: 'Write your name for the diploma',
    listen: 'Listen: ', courses: 'Courses', empty: 'This course has no lessons yet.',
  },
};

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Plain text -> HTML: escapes it, then **bold**, {{Esperanto}} and line breaks. */
export function richText(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\{\{(.+?)\}\}/g, '<span class="eo" lang="eo">$1</span>')
    .replace(/\n/g, '<br>');
}

function renderBlock(b: CourseBlock, ui: (typeof UI)['es']): string {
  const h3 = (t: string) => (t ? `<h3>${escapeHtml(t)}</h3>` : '');
  switch (b.type) {
    case 'words':
      return `<div class="block">${h3(b.title || ui.words)}<div class="words">${b.items
        .map((w) => `<div class="word"><b lang="eo">${escapeHtml(w.eo)}</b><span>${escapeHtml(w.tr)}</span></div>`)
        .join('')}</div></div>`;
    case 'text':
      return `<div class="block">${h3(b.title)}<p>${richText(b.text)}</p></div>`;
    case 'rule':
      return `<p class="rule">${richText(b.text)}</p>`;
    case 'exercise':
      return `<div class="block">${h3(b.title)}<ol class="ex">${b.items.map((i) => `<li>${richText(i)}</li>`).join('')}</ol>${
        b.answers.some(Boolean)
          ? `<details><summary>${ui.answers}</summary><ol>${b.answers.map((a) => `<li>${richText(a)}</li>`).join('')}</ol></details>`
          : ''
      }</div>`;
    case 'dialog':
      return `<div class="block">${h3(b.title)}<div class="dialog">${b.lines
        .map((l, i) => `<p class="say ${i % 2 ? 'b' : 'a'}"><b lang="eo">${escapeHtml(l.eo)}</b><i>${escapeHtml(l.tr)}</i></p>`)
        .join('')}</div></div>`;
  }
}

/** Full HTML page of a course. */
export function renderCoursePage(course: Pick<Course, 'slug' | 'lang' | 'title' | 'content'>, opts: { preview?: boolean } = {}): string {
  const ui = UI[course.lang];
  const { lessons, intro } = course.content;
  const days = lessons
    .map((l, i) => `<li><a href="#tago-${i + 1}" data-day="${i + 1}"><span class="n">${i + 1}</span>${escapeHtml(l.title)}</a></li>`)
    .join('');
  const sections = lessons
    .map((l, i) => {
      const n = i + 1;
      const img = l.image ? `<img class="art" src="${imageUrl(l.image)}" alt="${escapeHtml(l.imageAlt)}" loading="lazy">` : '';
      return `<section class="lesson" id="tago-${n}" aria-labelledby="h-${n}">
  <div class="lesson-head"><div><span class="tag">Tago ${n} · ${ui.day} ${n}</span>
  <h2 id="h-${n}"><span lang="eo">${escapeHtml(l.title)}</span>${l.subtitle ? ` <small>${escapeHtml(l.subtitle)}</small>` : ''}</h2></div>${img}</div>
  ${l.blocks.map((b) => renderBlock(b, ui)).join('\n  ')}
  ${l.challenge ? `<div class="challenge"><p><b>${ui.challenge}:</b> ${richText(l.challenge)}</p><button type="button" class="check" data-day="${n}" aria-pressed="false">${ui.done}</button></div>` : `<div class="challenge"><button type="button" class="check" data-day="${n}" aria-pressed="false">${ui.done}</button></div>`}
</section>`;
    })
    .join('\n');
  const texts = {
    progress: ui.progress, locked: ui.diplomaLocked, done: ui.diplomaDone, finished: ui.finished,
    of: ui.of, doneBtn: ui.done, mark: ui.mark, listen: ui.listen,
  };
  return `<!doctype html>
<html lang="${course.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(course.title)}</title>
<meta name="description" content="${escapeHtml(intro.slice(0, 160) || course.title)}">
${opts.preview ? '<meta name="robots" content="noindex">' : ''}
<link rel="stylesheet" href="/kurso.css">
</head>
<body>
${opts.preview ? '<p class="preview-banner">Vista previa · Preview</p>' : ''}
<div class="wrap">
  <nav class="top" aria-label="Navigation"><a href="/">← Serĉilo</a><a href="/kursoj">${ui.courses}</a></nav>
  <header class="hero">
    <svg class="star" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" class="f-soft"/><polygon class="f-green" points="50,12 59.4,37.1 86.1,38.2 65.2,54.9 72.4,80.8 50,66 27.6,80.8 34.8,54.9 13.9,38.2 40.6,37.1"/></svg>
    <div><h1>${escapeHtml(course.title)}</h1>${intro ? `<p>${richText(intro)}</p>` : ''}</div>
  </header>
  ${lessons.length ? `<div class="block"><ol class="days" id="days">${days}</ol><p class="progress" id="progress"></p></div>` : `<p>${ui.empty}</p>`}
  ${sections}
  ${lessons.length ? `<section class="diploma" aria-labelledby="dip-h">
    <svg class="star" viewBox="0 0 100 100" aria-hidden="true"><polygon class="f-green" points="50,6 61,36 93,37 68,57 77,88 50,70 23,88 32,57 7,37 39,36"/></svg>
    <h2 id="dip-h">Gratulon!</h2>
    <p id="dip-text" class="locked">${ui.diplomaLocked}</p>
    <p class="name" id="dip-name"></p>
    <label for="dip-input">${ui.name}</label>
    <input id="dip-input" type="text" maxlength="40" autocomplete="given-name" placeholder="Via nomo">
  </section>` : ''}
  <footer><span class="eo">Ĝis revido!</span> · Liberanimo Teruel</footer>
</div>
<script>window.KURSO = ${JSON.stringify({ slug: course.slug, days: lessons.length, texts }).replace(/</g, '\\u003c')};</script>
<script src="/kurso.js"></script>
</body>
</html>
`;
}

/** Page listing the published courses (/kursoj). */
export function renderCourseIndex(courses: Omit<Course, 'content'>[]): string {
  const items = courses
    .map((c) => `<li><a href="/kurso/${encodeURIComponent(c.slug)}" hreflang="${c.lang}">${escapeHtml(c.title)}</a> <span class="muted">(${c.lang === 'en' ? 'English' : 'español'})</span></li>`)
    .join('');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kursoj · Cursos · Courses</title>
<link rel="stylesheet" href="/kurso.css">
</head>
<body>
<div class="wrap">
  <nav class="top" aria-label="Navigation"><a href="/">← Serĉilo</a></nav>
  <header><h1>Kursoj · Cursos · Courses</h1></header>
  <ul class="course-list">
    <li><a href="/minikurso.html" hreflang="es">Esperanto en 7 tagoj</a> <span class="muted">(español)</span></li>
    <li><a href="/minikurso-en.html" hreflang="en">Esperanto en 7 tagoj</a> <span class="muted">(English)</span></li>
    ${items}
  </ul>
  <footer>Liberanimo Teruel</footer>
</div>
</body>
</html>
`;
}
