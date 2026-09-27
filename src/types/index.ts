export type Language = 'eo' | 'es' | 'en';

export type Level = 'all' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type Category = 
  | 'all' 
  | 'courses' 
  | 'news' 
  | 'projects' 
  | 'tools' 
  | 'literature' 
  | 'media' 
  | 'community'
  | 'radio';

export type Format = 
  | 'website' 
  | 'app' 
  | 'podcast' 
  | 'book' 
  | 'video' 
  | 'forum' 
  | 'course' 
  | 'tool';

export interface LocalizedText {
  eo: string;
  es: string;
  en: string;
}

export interface EsperantoResource {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  description: LocalizedText;
  category: Category;
  level: Level;
  tags: string[];
  isFree: boolean;
  format: Format;
  author?: string;
  featured?: boolean;
  year?: number | string;
  languages?: string[];
  features?: {
    eo: string[];
    es: string[];
    en: string[];
  };
  /** Online player for radio stations and podcasts (see RadioPlayer) */
  stream?: ResourceStream;
}

/**
 * How a station can be played inside Serĉilo:
 * - spotify: url is an open.spotify.com/show/... page, played with Spotify's embed
 * - zeno:    url is a zeno.fm/radio/<slug>/ page, played with Zeno.FM's live embed
 * - rss:     url is a podcast feed; the server lists its latest episodes
 * - audio:   url is a direct audio stream or file
 */
export type StreamType = 'spotify' | 'zeno' | 'rss' | 'audio';

export interface ResourceStream {
  type: StreamType;
  url: string;
}

export interface RadioEpisode {
  title: string;
  audioUrl: string;
  published?: string;
}

export interface KnowledgePanel {
  id: string;
  keywords: string[];
  title: string;
  subtitle: LocalizedText;
  description: LocalizedText;
  iconName?: string;
  facts: {
    label: LocalizedText;
    value: string;
  }[];
  links: {
    title: string;
    url: string;
  }[];
}

export interface UserSettings {
  language: Language;
  autoXSystem: boolean;
  theme: 'light' | 'dark' | 'system';
  resultsPerPage: number;
  openInNewTab: boolean;
  highContrast: boolean;
  defaultLevel: Level;
}

export interface FilterOptions {
  query: string;
  category: Category;
  level: Level;
  isFree: boolean | null;
  format: Format | 'all';
  sortBy: 'relevance' | 'alpha' | 'level';
  exactPhrase: string;
  excludeWords: string;
  anyWords: string;
}
