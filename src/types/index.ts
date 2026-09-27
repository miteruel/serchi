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
  | 'community';

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
