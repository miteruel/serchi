/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Tests for robots.txt, sitemap.xml and the __SITE_URL__ placeholder (server/seo.ts).
 * Run with: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { ROOT_DIR } from '../server/db';
import { STANDALONE_PAGES, robotsTxt, sitemapXml, withSiteUrl } from '../server/seo';

const ORIGIN = 'https://serchi.example.org';

test('robots.txt points to the sitemap and keeps crawlers out of the API', () => {
  const txt = robotsTxt(ORIGIN);
  assert.match(txt, /^Disallow: \/api\/$/m);
  assert.match(txt, /^Sitemap: https:\/\/serchi\.example\.org\/sitemap\.xml$/m);
});

test('sitemap.xml lists the home page and every standalone page', () => {
  const xml = sitemapXml(ORIGIN, '2026-09-27');
  for (const p of ['/', ...STANDALONE_PAGES]) assert.ok(xml.includes(`<loc>${ORIGIN}${p}</loc>`), p);
});

test('every page gets absolute canonical and Open Graph addresses', () => {
  const files = ['index.html', ...STANDALONE_PAGES.map((p) => path.join('public', p))];
  for (const f of files) {
    const html = withSiteUrl(fs.readFileSync(path.join(ROOT_DIR, f), 'utf8'), ORIGIN);
    assert.ok(!html.includes('__SITE_URL__'), `${f}: placeholder left`);
    assert.match(html, /<link rel="canonical" href="https:\/\/serchi\.example\.org\//, `${f}: canonical`);
    assert.match(html, /<meta property="og:image" content="https:\/\/serchi\.example\.org\/og-image\.png"/, `${f}: og:image`);
  }
  assert.ok(fs.existsSync(path.join(ROOT_DIR, 'public', 'og-image.png')), 'og-image.png missing');
});
