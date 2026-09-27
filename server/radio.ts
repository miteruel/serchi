/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

/**
 * Podcast feed reader for stations whose player type is "rss": fetches the
 * feed stored in the database and returns its latest episodes with audio.
 * Only feeds already stored in the database are fetched (never a URL sent by
 * the browser), and results are cached for 15 minutes.
 */
import type { RadioEpisode } from '../src/types';

const CACHE_MS = 15 * 60 * 1000;
const cache = new Map<string, { at: number; episodes: RadioEpisode[] }>();

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&')
    .trim();
}

/** Extracts items with an audio enclosure from an RSS 2.0 / podcast feed. */
export function parseFeed(xml: string, limit = 10): RadioEpisode[] {
  const episodes: RadioEpisode[] = [];
  for (const [, item] of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)) {
    const enclosure = item.match(/<enclosure\b[^>]*\burl=["']([^"']+)["'][^>]*>/i);
    const type = enclosure?.[0].match(/\btype=["']([^"']+)["']/i)?.[1] ?? 'audio/';
    if (!enclosure || !type.startsWith('audio/')) continue;
    const title = item.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    const date = item.match(/<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1];
    const published = date ? new Date(decodeXml(date)) : undefined;
    episodes.push({
      title: title ? decodeXml(title) : 'Elsendo',
      audioUrl: decodeXml(enclosure[1]),
      published: published && !isNaN(published.getTime()) ? published.toISOString() : undefined,
    });
    if (episodes.length >= limit) break;
  }
  return episodes;
}

export async function fetchEpisodes(feedUrl: string): Promise<RadioEpisode[]> {
  const cached = cache.get(feedUrl);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.episodes;

  const res = await fetch(feedUrl, {
    headers: { 'User-Agent': 'Serchilo/1.0 (+https://github.com/miteruel/serchi)' },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Feed HTTP ${res.status}`);
  const episodes = parseFeed(await res.text());
  cache.set(feedUrl, { at: Date.now(), episodes });
  return episodes;
}
