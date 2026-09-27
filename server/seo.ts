/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * What search engines and social networks read: robots.txt, sitemap.xml and
 * the absolute addresses in the pages' <head> (canonical, Open Graph).
 *
 * The HTML pages contain the placeholder __SITE_URL__, replaced when they are
 * served with SITE_URL (e.g. https://serchi.example.org) or, if that is not
 * set, with the address the request came to.
 */
import type express from 'express';
import fs from 'fs';
import path from 'path';

export const SITE_URL_PLACEHOLDER = /__SITE_URL__/g;

/** Pages listed in sitemap.xml, besides the search engine itself ("/"). */
export const STANDALONE_PAGES = ['/minikurso.html', '/minikurso-en.html', '/historia-aragon.html'];

export function siteOrigin(req: express.Request): string {
  const configured = (process.env.SITE_URL || '').trim().replace(/\/+$/, '');
  return configured || `${req.protocol}://${req.get('host')}`;
}

export function withSiteUrl(html: string, origin: string): string {
  return html.replace(SITE_URL_PLACEHOLDER, origin);
}

export function robotsTxt(origin: string): string {
  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n');
}

export function sitemapXml(origin: string, lastmod: string): string {
  const urls = ['/', ...STANDALONE_PAGES]
    .map((p) => `  <url><loc>${origin}${p}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Adds robots.txt, sitemap.xml and the standalone pages (with __SITE_URL__
 * replaced) to the app. `pagesDir` is public/ in development, dist/ in production.
 */
export function mountSeo(app: express.Express, pagesDir: string): void {
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(robotsTxt(siteOrigin(req)));
  });

  app.get('/sitemap.xml', (req, res) => {
    const files = STANDALONE_PAGES.map((p) => path.join(pagesDir, p));
    const newest = Math.max(...files.map((f) => (fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0)));
    const lastmod = new Date(newest || Date.now()).toISOString().slice(0, 10);
    res.type('application/xml').send(sitemapXml(siteOrigin(req), lastmod));
  });

  for (const page of STANDALONE_PAGES) {
    app.get(page, (req, res, next) => {
      const file = path.join(pagesDir, page);
      if (!fs.existsSync(file)) return next();
      res.type('html').send(withSiteUrl(fs.readFileSync(file, 'utf8'), siteOrigin(req)));
    });
  }
}
