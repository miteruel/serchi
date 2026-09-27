import React, { useEffect, useState } from 'react';
import { Radio, X, Play, Loader2, ExternalLink } from 'lucide-react';
import { EsperantoResource, RadioEpisode, UserSettings } from '../types';
import { TRANSLATIONS } from '../translations';
import { fetchEpisodes } from '../api';

interface RadioPlayerProps {
  resource: EsperantoResource;
  settings: UserSettings;
  onClose: () => void;
}

/** Embed URL for the official Spotify / Zeno.FM players. */
export function embedUrl(stream: NonNullable<EsperantoResource['stream']>): string | null {
  if (stream.type === 'spotify') {
    return stream.url.replace('open.spotify.com/', 'open.spotify.com/embed/');
  }
  if (stream.type === 'zeno') {
    const slug = stream.url.match(/zeno\.fm\/radio\/([a-z0-9-]+)/)?.[1];
    return slug ? `https://zeno.fm/player/${slug}` : null;
  }
  return null;
}

/**
 * Player bar fixed at the bottom of the page. It lives in App, so the audio
 * keeps playing while the visitor searches or browses the forum.
 */
export const RadioPlayer: React.FC<RadioPlayerProps> = ({ resource, settings, onClose }) => {
  const t = TRANSLATIONS[settings.language];
  const stream = resource.stream!;
  const [episodes, setEpisodes] = useState<RadioEpisode[] | null>(null);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState<RadioEpisode | null>(null);

  useEffect(() => {
    setEpisodes(null);
    setError(false);
    setCurrent(null);
    if (stream.type !== 'rss') return;
    let cancelled = false;
    fetchEpisodes(resource.id)
      .then((list) => {
        if (cancelled) return;
        setEpisodes(list);
        setCurrent(list[0] ?? null);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [resource.id, stream.type]);

  const embed = embedUrl(stream);

  return (
    <div
      role="region"
      aria-label={`${t.nowPlaying}: ${resource.title}`}
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#292a2d]/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wide text-emerald-700 dark:text-emerald-400 font-semibold">
              {t.nowPlaying}
              {stream.type === 'zeno' && (
                <span className="ml-2 inline-flex items-center gap-1 text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> {t.liveBadge}
                </span>
              )}
            </p>
            <p className="font-semibold truncate">{resource.title}</p>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-300 hidden sm:flex items-center gap-1"
          >
            {resource.displayUrl} <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
            aria-label={t.closePlayer}
            title={t.closePlayer}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {embed && (
          <iframe
            key={embed}
            src={embed}
            title={resource.title}
            className="w-full rounded-xl border-0"
            height={stream.type === 'spotify' ? 152 : 110}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}

        {stream.type === 'audio' && (
          <audio key={stream.url} src={stream.url} controls autoPlay className="w-full" />
        )}

        {stream.type === 'rss' && (
          <div>
            {!episodes && !error && (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> {t.loadingEpisodes}
              </p>
            )}
            {error && <p className="text-sm text-red-600">{t.episodesError}</p>}
            {current && (
              <audio key={current.audioUrl} src={current.audioUrl} controls autoPlay className="w-full" />
            )}
            {episodes && episodes.length > 1 && (
              <details className="mt-1 text-sm">
                <summary className="cursor-pointer text-gray-600 dark:text-gray-400">{t.latestEpisodes}</summary>
                <ul className="mt-1 max-h-40 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                  {episodes.map((ep) => (
                    <li key={ep.audioUrl}>
                      <button
                        onClick={() => setCurrent(ep)}
                        className={`w-full text-left px-2 py-1.5 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          current?.audioUrl === ep.audioUrl ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : ''
                        }`}
                      >
                        <Play className="w-3 h-3 shrink-0" />
                        <span className="truncate flex-1">{ep.title}</span>
                        {ep.published && (
                          <span className="text-xs text-gray-400 shrink-0">
                            {new Date(ep.published).toLocaleDateString(settings.language)}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
