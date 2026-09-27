/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  insertResources,
  listKnowledgePanels,
  listResources,
  openDatabase,
  sanitizeResource,
  type NewResource,
} from './server/db';
import { fetchEpisodes } from './server/radio';
import { mountSeo, siteOrigin, withSiteUrl } from './server/seo';
import {
  RECORDING_LIMITS,
  RecordingError,
  addRecording,
  approveRecording,
  audioMap,
  courseWords,
  deleteRecording,
  getRecordingAudio,
  listPendingRecordings,
} from './server/audio';
import fs from 'fs';
import {
  addComment,
  createTopic,
  deleteComment,
  deleteTopic,
  FORUM_LIMITS,
  getForumUser,
  getTopic,
  listForum,
  sanitizeTopic,
  toggleLike,
  toggleTopicFlag,
} from './server/forum';

// Load .env.local (as documented in the README) and fall back to .env
dotenv.config({ path: ['.env.local', '.env'] });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  // Behind a reverse proxy (Caddy in compose.yaml) trust its X-Forwarded-* headers
  app.set('trust proxy', 'loopback, linklocal, uniquelocal');

  app.use(express.json({ limit: '2mb' }));

  // SQLite database with the resource index and knowledge panels
  const db = openDatabase();

  app.get('/api/resources', (_req, res) => {
    res.json(listResources(db));
  });

  app.get('/api/knowledge', (_req, res) => {
    res.json(listKnowledgePanels(db));
  });

  // Add one resource (manual form). 409 if the URL is already indexed.
  app.post('/api/resources', (req, res) => {
    let item: NewResource;
    try {
      // Players (stream) are only set by curated imports, never by visitors
      item = sanitizeResource({ ...req.body, id: undefined, stream: undefined });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
    const { inserted } = insertResources(db, [item], 'user');
    if (inserted.length === 0) {
      return res.status(409).json({ error: 'duplicate' });
    }
    return res.status(201).json(inserted[0]);
  });

  // Latest episodes of a station whose player is a podcast feed (stream.type = rss)
  app.get('/api/radio/:id/episodes', async (req, res) => {
    const row = db.prepare("SELECT stream_url FROM resources WHERE id = ? AND stream_type = 'rss'").get(req.params.id) as
      | { stream_url: string }
      | undefined;
    if (!row) return res.status(404).json({ error: 'No feed for this resource' });
    try {
      return res.json({ episodes: await fetchEpisodes(row.stream_url) });
    } catch (err: any) {
      return res.status(502).json({ error: err.message || 'Feed unavailable' });
    }
  });

  // Add several resources (live Google Search crawler). Duplicates are skipped.
  app.post('/api/resources/batch', (req, res) => {
    const list = Array.isArray(req.body?.resources) ? req.body.resources : null;
    if (!list || list.length === 0 || list.length > 100) {
      return res.status(400).json({ error: 'Expected 1-100 resources' });
    }
    const source = req.body?.source === 'user' ? 'user' : 'crawled';
    const items: NewResource[] = [];
    let invalid = 0;
    for (const raw of list) {
      try {
        items.push(sanitizeResource({ ...raw, id: undefined, stream: undefined }));
      } catch {
        invalid++;
      }
    }
    const { inserted, skippedDuplicates } = insertResources(db, items, source);
    return res.json({
      inserted,
      added: inserted.length,
      skippedDuplicates: skippedDuplicates + invalid,
    });
  });

  // ---- Community forum (tables forum_* in the database) ----
  //
  // Headers sent by the React app:
  //   X-Visitor-Id     random id kept in the browser, used to count likes once per visitor
  //   X-Forum-User     id of the demo user the visitor posts as (role switcher)
  //   X-Moderator-Key  only when FORUM_MODERATOR_KEY is set: acting as moderator requires it
  const moderatorKey = process.env.FORUM_MODERATOR_KEY || '';
  const sameKey = (given: string) =>
    crypto.timingSafeEqual(
      crypto.createHash('sha256').update(given).digest(),
      crypto.createHash('sha256').update(moderatorKey).digest(),
    );

  const visitorOf = (req: express.Request) => {
    const id = String(req.get('X-Visitor-Id') || '');
    return /^[A-Za-z0-9-]{8,64}$/.test(id) ? id : '';
  };

  /** The demo user the visitor acts as, or an error status. */
  const actorOf = (req: express.Request, res: express.Response) => {
    const user = getForumUser(db, String(req.get('X-Forum-User') || ''));
    if (!user) {
      res.status(400).json({ error: 'Unknown forum user' });
      return undefined;
    }
    if (user.role === 'moderator' && moderatorKey && !sameKey(String(req.get('X-Moderator-Key') || ''))) {
      res.status(403).json({ error: 'moderator_key' });
      return undefined;
    }
    return user;
  };

  const moderatorOf = (req: express.Request, res: express.Response) => {
    const user = actorOf(req, res);
    if (user && user.role !== 'moderator') {
      res.status(403).json({ error: 'Moderators only' });
      return undefined;
    }
    return user;
  };

  app.get('/api/forum', (req, res) => {
    res.json({ ...listForum(db, visitorOf(req)), moderatorKeyRequired: !!moderatorKey });
  });

  // Checks a moderator key before the visitor switches to the moderator role
  app.post('/api/forum/moderator', (req, res) => {
    if (!moderatorKey || sameKey(String(req.body?.key || ''))) return res.status(204).end();
    return res.status(403).json({ error: 'moderator_key' });
  });

  app.post('/api/forum/topics', (req, res) => {
    const visitor = visitorOf(req);
    if (!visitor) return res.status(400).json({ error: 'Missing visitor id' });
    const author = actorOf(req, res);
    if (!author) return;
    try {
      return res.status(201).json(createTopic(db, author, sanitizeTopic(req.body), visitor));
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  });

  app.post('/api/forum/topics/:id/comments', (req, res) => {
    const author = actorOf(req, res);
    if (!author) return;
    const topic = getTopic(db, req.params.id, '');
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    const isModerator = author.role === 'moderator';
    if (topic.isLocked && !isModerator) return res.status(403).json({ error: 'Topic is locked' });
    const content = String(req.body?.content ?? '').trim();
    if (!content || content.length > FORUM_LIMITS.content) return res.status(400).json({ error: 'Invalid content' });
    const comment = addComment(db, topic.id, author, content, isModerator && !!req.body?.isModNote, visitorOf(req));
    return res.status(201).json(comment);
  });

  app.post('/api/forum/:kind(topics|comments)/:id/like', (req, res) => {
    const visitor = visitorOf(req);
    if (!visitor) return res.status(400).json({ error: 'Missing visitor id' });
    const result = toggleLike(db, req.params.kind === 'topics' ? 'topic' : 'comment', req.params.id, visitor);
    return result ? res.json(result) : res.status(404).json({ error: 'Not found' });
  });

  app.post('/api/forum/topics/:id/:flag(pin|lock)', (req, res) => {
    if (!moderatorOf(req, res)) return;
    if (!toggleTopicFlag(db, req.params.id, req.params.flag === 'pin' ? 'is_pinned' : 'is_locked')) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    return res.json(getTopic(db, req.params.id, visitorOf(req)));
  });

  app.delete('/api/forum/topics/:id', (req, res) => {
    if (!moderatorOf(req, res)) return;
    return deleteTopic(db, req.params.id) ? res.status(204).end() : res.status(404).json({ error: 'Topic not found' });
  });

  app.delete('/api/forum/comments/:id', (req, res) => {
    if (!moderatorOf(req, res)) return;
    return deleteComment(db, req.params.id) ? res.status(204).end() : res.status(404).json({ error: 'Comment not found' });
  });

  // ---- Recordings of the mini-course words (page public/grabar.html) ----
  //
  // Visitors send recordings, which wait as pending until a moderator (same
  // key as the forum: X-Moderator-Key) approves them. The audio is stored in
  // the database; see server/audio.ts.
  const words = courseWords();
  const isModeratorRequest = (req: express.Request) =>
    !moderatorKey || sameKey(String(req.get('X-Moderator-Key') || ''));

  // What the mini-course plays: { slug: url }
  app.get('/api/audio', (_req, res) => {
    res.set('Cache-Control', 'no-cache').json(audioMap(db));
  });

  app.get('/api/recordings/words', (_req, res) => {
    const recorded = audioMap(db);
    res.json({
      words: [...words].map(([slug, text]) => ({ slug, text, recorded: !!recorded[slug] })),
      maxSeconds: 10,
      moderatorKeyRequired: !!moderatorKey,
    });
  });

  app.post(
    '/api/recordings',
    express.raw({ type: () => true, limit: RECORDING_LIMITS.maxBytes }),
    (req, res) => {
      const visitor = visitorOf(req);
      if (!visitor) return res.status(400).json({ error: 'Missing visitor id' });
      if (req.query.consent !== '1') return res.status(400).json({ error: 'consent' });
      try {
        const saved = addRecording(db, words, {
          slug: String(req.query.slug || ''),
          audio: Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0),
          visitorId: visitor,
          name: String(req.query.name || ''),
        });
        return res.status(201).json(saved);
      } catch (err: any) {
        if (err instanceof RecordingError) return res.status(err.status).json({ error: err.message });
        throw err;
      }
    },
  );

  // Approved recordings are public; pending ones only for moderators
  app.get('/api/recordings/:id/audio', (req, res) => {
    const rec = getRecordingAudio(db, req.params.id);
    if (!rec || (rec.status !== 'approved' && !isModeratorRequest(req))) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.set('Cache-Control', rec.status === 'approved' ? 'public, max-age=86400' : 'no-store');
    return res.type(rec.mime).send(Buffer.from(rec.audio));
  });

  app.get('/api/recordings/pending', (req, res) => {
    if (!isModeratorRequest(req)) return res.status(403).json({ error: 'moderator_key' });
    return res.json(listPendingRecordings(db));
  });

  app.post('/api/recordings/:id/approve', (req, res) => {
    if (!isModeratorRequest(req)) return res.status(403).json({ error: 'moderator_key' });
    return approveRecording(db, req.params.id) ? res.status(204).end() : res.status(404).json({ error: 'Not found' });
  });

  app.delete('/api/recordings/:id', (req, res) => {
    if (!isModeratorRequest(req)) return res.status(403).json({ error: 'moderator_key' });
    return deleteRecording(db, req.params.id) ? res.status(204).end() : res.status(404).json({ error: 'Not found' });
  });

  // Initialize Google Gen AI with server-side API key
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  interface LiveSearchResult {
    title: string;
    url: string;
    displayUrl: string;
    snippet: string;
    suggestedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'all';
    suggestedCategory: 'courses' | 'news' | 'projects' | 'tools' | 'literature' | 'media' | 'community';
  }

  /**
   * Real-time web search endpoint using Google Search Grounding with Gemini 3.8 Flash.
   * Discovers live links across the web related to Esperanto topics and events.
   */
  app.post('/api/live-search', async (req, res) => {
    const { query, language = 'eo', level } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Google Gemini API key not configured on server',
        results: []
      });
    }

    try {
      const prompt = `You are an expert Esperanto web indexer. Use Google Search grounding to discover active, real-world URLs, websites, articles, podcasts, or tools for Esperanto learners and speakers.
Target query: "${query}"
Optional level filter: "${level || 'any'}"

Please search Google for active, genuine web resources related to Esperanto matching this topic.
Format your answer as a JSON block (array of objects) with this exact schema:
[
  {
    "title": "Title of the website/resource",
    "url": "https://...",
    "displayUrl": "domain.com/path",
    "snippet": "Short descriptive summary of what this website provides in 1-2 sentences in ${language === 'es' ? 'Spanish' : language === 'en' ? 'English' : 'Esperanto'}",
    "suggestedLevel": "A1" | "A2" | "B1" | "B2" | "C1" | "all",
    "suggestedCategory": "courses" | "news" | "projects" | "tools" | "literature" | "media" | "community"
  }
]
Output ONLY valid JSON inside \`\`\`json ... \`\`\` or as raw JSON. Do not fabricate URLs; ensure they come from the real search grounding.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      
      // Also extract real Google Search grounding chunks
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSources: { title: string; url: string }[] = [];
      
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          webSources.push({
            title: chunk.web.title,
            url: chunk.web.uri,
          });
        }
      });

      // Try to parse the JSON returned by the model
      let parsedResults: LiveSearchResult[] = [];
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const candidateJson = jsonMatch ? jsonMatch[1] : text;

      try {
        const parsed = JSON.parse(candidateJson);
        if (Array.isArray(parsed)) {
          parsedResults = parsed.map((item) => ({
            title: item.title || 'Esperanto Resource',
            url: item.url,
            displayUrl: item.displayUrl || (item.url ? new URL(item.url).hostname : 'esperanto.org'),
            snippet: item.snippet || '',
            suggestedLevel: item.suggestedLevel || 'all',
            suggestedCategory: item.suggestedCategory || 'projects',
          }));
        }
      } catch {
        // Fallback: build results from grounding chunks directly if JSON parse fails
        parsedResults = webSources.slice(0, 8).map((src) => {
          let domain = 'esperanto.org';
          try {
            domain = new URL(src.url).hostname;
          } catch {}

          return {
            title: src.title,
            url: src.url,
            displayUrl: domain,
            snippet: `Reta rimedo trovita per Google Search por "${query}".`,
            suggestedLevel: 'all',
            suggestedCategory: 'projects',
          };
        });
      }

      // Merge any unique grounding chunks that weren't in parsed results
      const existingUrls = new Set(parsedResults.map((r) => r.url.toLowerCase()));
      webSources.forEach((src) => {
        if (src.url && !existingUrls.has(src.url.toLowerCase())) {
          existingUrls.add(src.url.toLowerCase());
          let domain = 'esperanto.org';
          try {
            domain = new URL(src.url).hostname;
          } catch {}

          parsedResults.push({
            title: src.title,
            url: src.url,
            displayUrl: domain,
            snippet: `Aŭtentika retejo trovita per Google Search.`,
            suggestedLevel: 'all',
            suggestedCategory: 'projects',
          });
        }
      });

      return res.json({
        results: parsedResults.filter((r) => r.url && r.url.startsWith('http')),
        groundingCount: webSources.length,
      });
    } catch (error: any) {
      console.error('Error executing live Google search grounding:', error);
      return res.status(500).json({
        error: error.message || 'Error executing Google live search',
        results: [],
      });
    }
  });

  // Mount Vite middleware in development
  // (robots.txt, sitemap.xml and pages with __SITE_URL__ replaced, see server/seo.ts)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    mountSeo(app, path.join(__dirname, 'public'));
    app.get('/', async (req, res, next) => {
      try {
        const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        res.type('html').send(await vite.transformIndexHtml(req.originalUrl, withSiteUrl(html, siteOrigin(req))));
      } catch (err) {
        next(err);
      }
    });
    app.use(vite.middlewares);
  } else {
    const dist = path.join(__dirname, 'dist');
    const indexHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    mountSeo(app, dist);
    app.use(express.static(dist, { index: false }));
    app.get('*', (req, res) => {
      res.type('html').send(withSiteUrl(indexHtml, siteOrigin(req)));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
