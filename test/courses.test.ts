/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Tests for the courses made with the course editor (server/courses.ts).
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { openDatabase } from '../server/db';
import {
  CourseError,
  addCourseImage,
  courseEsperantoTexts,
  courseSlug,
  createCourse,
  deleteCourse,
  detectImageType,
  getCourse,
  getCourseBySlug,
  listCourses,
  publishedCourseTexts,
  renderCoursePage,
  richText,
  sanitizeContent,
  updateCourse,
} from '../server/courses';

const PNG = Buffer.concat([Buffer.from([0x89]), Buffer.from('PNG\r\n\x1a\n'), Buffer.alloc(40, 1)]);
const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');

function tempDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'serchi-courses-'));
  return openDatabase(path.join(dir, 'courses.db'));
}

const LESSON = {
  title: 'Saluton!',
  subtitle: 'Saludar',
  image: null,
  imageAlt: '',
  blocks: [
    { type: 'words', title: 'Palabras', items: [{ eo: 'Dankon!', tr: '¡Gracias!' }, { eo: '', tr: 'vacía' }] },
    { type: 'rule', text: 'Añade **-j**: {{katoj}}' },
    { type: 'exercise', title: 'Ejercicio', items: ['Traduce: gato'], answers: ['kato'] },
    { type: 'dialog', title: '', lines: [{ eo: 'Kiel vi fartas?', tr: '¿Cómo estás?' }] },
    { type: 'video', url: 'https://example.org' },
  ],
  challenge: 'Di {{Bonan tagon!}} a tu familia.',
};

test('richText escapes HTML and only allows bold and Esperanto marks', () => {
  assert.equal(richText('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(richText('**sí** {{jes}}'), '<b>sí</b> <span class="eo" lang="eo">jes</span>');
  assert.equal(richText('" onmouseover="x'), '&quot; onmouseover=&quot;x');
});

test('sanitizeContent drops unknown blocks, empty words and foreign pictures', () => {
  const content = sanitizeContent({ intro: 'Hola', lessons: [{ ...LESSON, image: 'img-of-another-course' }] }, new Set(['img-ok']));
  const lesson = content.lessons[0];
  assert.equal(lesson.image, null);
  assert.deepEqual(lesson.blocks.map((b) => b.type), ['words', 'rule', 'exercise', 'dialog']);
  assert.equal((lesson.blocks[0] as any).items.length, 1);
  assert.equal(sanitizeContent({ lessons: [{ image: 'img-ok' }] }, new Set(['img-ok'])).lessons[0].image, 'img-ok');
});

test('courses are created, saved, published and deleted', () => {
  const db = tempDb();
  assert.throws(() => createCourse(db, { title: '  ' }), CourseError);
  const a = createCourse(db, { title: 'Esperanto por la familio', lang: 'es' });
  assert.equal(a.slug, 'esperanto-por-la-familio');
  const b = createCourse(db, { title: 'Esperanto por la familio' });
  assert.equal(b.slug, 'esperanto-por-la-familio-2', 'slugs are unique');
  assert.equal(courseSlug('Ĉu vi ŝatas?'), 'cu-vi-satas');

  const saved = updateCourse(db, a.id, { title: 'Familio', lang: 'en', published: true, content: { intro: 'Hi', lessons: [LESSON] } });
  assert.equal(saved.lang, 'en');
  assert.equal(saved.content.lessons.length, 1);
  assert.deepEqual(listCourses(db, true).map((c) => c.id), [a.id], 'only published ones are public');
  assert.equal(getCourseBySlug(db, a.slug)?.id, a.id);

  assert.equal(deleteCourse(db, b.id), true);
  assert.equal(getCourse(db, b.id), undefined);
  db.close();
});

test('pictures must be real images and unused ones are deleted', () => {
  const db = tempDb();
  const c = createCourse(db, { title: 'Bildoj' });
  assert.equal(detectImageType(PNG), 'image/png');
  assert.equal(detectImageType(SVG), undefined, 'SVG can carry scripts');
  assert.throws(() => addCourseImage(db, c.id, SVG), (e: any) => e.status === 415);
  const img = addCourseImage(db, c.id, PNG);
  updateCourse(db, c.id, { content: { lessons: [{ ...LESSON, image: img.id }] } });
  assert.equal(getCourse(db, c.id)!.content.lessons[0].image, img.id);
  updateCourse(db, c.id, { content: { lessons: [{ ...LESSON, image: null }] } });
  const left = db.prepare('SELECT COUNT(*) AS n FROM course_images WHERE id = ?').get(img.id) as { n: number };
  assert.equal(left.n, 0);
  db.close();
});

test('the course page shows the content escaped, and its words can be recorded', () => {
  const db = tempDb();
  const c = createCourse(db, { title: 'Kurso <b>' });
  const saved = updateCourse(db, c.id, { published: true, content: { intro: '<img src=x onerror=alert(1)>', lessons: [LESSON] } });
  const html = renderCoursePage(saved);
  assert.ok(!html.includes('<img src=x'), 'intro is escaped');
  assert.ok(html.includes('<title>Kurso &lt;b&gt;</title>'));
  assert.ok(html.includes('<b lang="eo">Dankon!</b>'));
  assert.ok(html.includes('data-day="1"'));
  assert.deepEqual(courseEsperantoTexts(saved.content), ['Dankon!', 'katoj', 'Kiel vi fartas?', 'Bonan tagon!']);
  assert.ok(publishedCourseTexts(db).includes('Bonan tagon!'));
  db.close();
});
