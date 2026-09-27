import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  Share2, 
  SlidersHorizontal, 
  Sparkles, 
  X,
  Filter,
  Check,
  ChevronDown,
  Info,
  BookOpen,
  Headphones,
  Compass,
  GraduationCap,
  Newspaper,
  Wrench,
  Users,
  Plus,
  Globe,
  Radio,
  Play,
  UserRound,
  CalendarDays,
  Baby
} from 'lucide-react';
import { 
  EsperantoResource, 
  KnowledgePanel, 
  UserSettings, 
  Level, 
  Category, 
  Format,
  FilterOptions 
} from '../types';
import { TRANSLATIONS } from '../translations';
import { normalizeText } from '../utils/esperanto';

interface SearchResultsProps {
  resources: EsperantoResource[];
  totalCount: number;
  searchDurationMs: number;
  query: string;
  filters: FilterOptions;
  onUpdateFilters: (updates: Partial<FilterOptions>) => void;
  settings: UserSettings;
  knowledgePanel: KnowledgePanel | null;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenPreview: (resource: EsperantoResource) => void;
  onPlay: (resource: EsperantoResource) => void;
  onOpenAdvanced: () => void;
  onOpenAddResource?: (query?: string, tab?: 'single' | 'liveCrawler') => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  resources,
  totalCount,
  searchDurationMs,
  query,
  filters,
  onUpdateFilters,
  settings,
  knowledgePanel,
  savedIds,
  onToggleSave,
  onOpenPreview,
  onPlay,
  onOpenAdvanced,
  onOpenAddResource,
}) => {
  const t = TRANSLATIONS[settings.language];
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Category navigation icons
  const categoryIcons: Record<Category, React.ReactNode> = {
    all: <Search className="w-3.5 h-3.5" />,
    courses: <GraduationCap className="w-3.5 h-3.5" />,
    news: <Newspaper className="w-3.5 h-3.5" />,
    projects: <Compass className="w-3.5 h-3.5" />,
    tools: <Wrench className="w-3.5 h-3.5" />,
    literature: <BookOpen className="w-3.5 h-3.5" />,
    media: <Headphones className="w-3.5 h-3.5" />,
    community: <Users className="w-3.5 h-3.5" />,
    radio: <Radio className="w-3.5 h-3.5" />,
    people: <UserRound className="w-3.5 h-3.5" />,
    events: <CalendarDays className="w-3.5 h-3.5" />,
    kids: <Baby className="w-3.5 h-3.5" />,
  };

  const categoriesList: Category[] = [
    'all',
    'courses',
    'tools',
    'news',
    'literature',
    'media',
    'projects',
    'community',
    'radio',
    'people',
    'events',
    'kids'
  ];

  const levelsList: Level[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  // Helper to highlight matching text in title & description
  const highlightMatches = (text: string, queryStr: string) => {
    if (!queryStr.trim()) return text;
    
    const words = queryStr
      .trim()
      .split(/\s+/)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .filter((w) => w.length > 1);

    if (words.length === 0) return text;

    try {
      const regex = new RegExp(`(${words.join('|')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) => 
        regex.test(part) ? (
          <mark 
            key={i} 
            className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-semibold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  const hasActiveFilters = 
    filters.level !== 'all' || 
    filters.isFree !== null || 
    filters.format !== 'all' || 
    filters.category !== 'all';

  const clearAllFilters = () => {
    onUpdateFilters({
      category: 'all',
      level: 'all',
      isFree: null,
      format: 'all',
      exactPhrase: '',
      excludeWords: '',
      anyWords: ''
    });
  };

  const getLevelBadgeClass = (lvl: Level) => {
    switch (lvl) {
      case 'A1':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'A2':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'B1':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'B2':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'C1':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="w-full">
      {/* Category Navigation Tabs Row (Google Style) */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#202124] sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar lg:flex-wrap lg:overflow-visible py-2">
            {categoriesList.map((cat) => {
              const isActive = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onUpdateFilters({ category: cat })}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 border border-transparent'
                  }`}
                >
                  {categoryIcons[cat]}
                  <span>{t.categories[cat]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toolbar: Level Filter, Format, Free Only, Sort, Advanced (Google Tools Style) */}
      <div className="border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-[#1a1b1e] text-xs py-2 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Level Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <span className="text-gray-500 dark:text-gray-400 mr-1.5 font-medium hidden sm:inline">
                {t.filterByLevel}:
              </span>
              <select
                value={filters.level}
                onChange={(e) => onUpdateFilters({ level: e.target.value as Level })}
                className="bg-white dark:bg-[#303134] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              >
                {levelsList.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {t.levels[lvl]}
                  </option>
                ))}
              </select>
            </div>

            {/* Format Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <span className="text-gray-500 dark:text-gray-400 mr-1.5 font-medium hidden sm:inline">
                {t.filterByFormat}:
              </span>
              <select
                value={filters.format}
                onChange={(e) => onUpdateFilters({ format: e.target.value as Format | 'all' })}
                className="bg-white dark:bg-[#303134] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">{t.categories.all}</option>
                <option value="website">{t.formats.website}</option>
                <option value="app">{t.formats.app}</option>
                <option value="podcast">{t.formats.podcast}</option>
                <option value="book">{t.formats.book}</option>
                <option value="video">{t.formats.video}</option>
                <option value="course">{t.formats.course}</option>
                <option value="tool">{t.formats.tool}</option>
                <option value="forum">{t.formats.forum}</option>
              </select>
            </div>

            {/* Free only toggle */}
            <button
              onClick={() => onUpdateFilters({ isFree: filters.isFree === true ? null : true })}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filters.isFree === true
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-[#303134] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              {filters.isFree === true && <Check className="w-3 h-3" />}
              {t.filterFreeOnly}
            </button>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-emerald-600 dark:text-emerald-400 hover:underline text-xs font-medium ml-1 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {t.clearFilters}
              </button>
            )}
          </div>

          {/* Right side: Sort by & Advanced search button */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-gray-500 dark:text-gray-400 hidden md:inline">
              {t.sortBy}:
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
              className="bg-white dark:bg-[#303134] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="relevance">{t.sortRelevance}</option>
              <option value="alpha">{t.sortAlpha}</option>
              <option value="level">{t.sortLevel}</option>
            </select>

            <button
              onClick={onOpenAdvanced}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#303134] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 font-medium"
              title={t.advancedSearchTitle}
            >
              <SlidersHorizontal className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{t.advancedSearchTitle}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area: Results List + Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Results Stats (e.g. Proksimume 48 rezultoj (0.01 sekundoj)) */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {t.resultsStats(totalCount, (searchDurationMs / 1000).toFixed(2))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Results (span 8 on large screens) */}
          <div className="lg:col-span-8 space-y-6">
            
            {resources.length === 0 ? (
              /* Empty State */
              <div className="bg-white dark:bg-[#303134]/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {t.noResultsTitle}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-5">
                  {t.noResultsDesc}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {onOpenAddResource && (
                    <button
                      onClick={() => onOpenAddResource(query, 'liveCrawler')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.startCrawlerBtn}</span>
                    </button>
                  )}

                  {onOpenAddResource && (
                    <button
                      onClick={() => onOpenAddResource('', 'single')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addLinkManuallyBtn}</span>
                    </button>
                  )}

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {t.clearFilters}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Results List (Google Style) */
              <>
                {resources.map((item) => {
                const isSaved = savedIds.includes(item.id);
                const desc = item.description[settings.language] || item.description.eo;

                return (
                  <article
                    key={item.id}
                    className="group bg-white dark:bg-[#202124] p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-150"
                  >
                    {/* Breadcrumb / Display URL */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                        {item.title.charAt(0)}
                      </div>
                      <span className="truncate max-w-xs">{item.displayUrl}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="capitalize">{t.categories[item.category]}</span>
                      {item.year && (
                        <>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span>{item.year}</span>
                        </>
                      )}
                    </div>

                    {/* Title with link */}
                    <h2 className="text-lg font-medium text-emerald-800 dark:text-emerald-400 group-hover:underline">
                      <a
                        href={item.url}
                        target={settings.openInNewTab ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                      >
                        {highlightMatches(item.title, query)}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </h2>

                    {/* Badges: Level, Free, Format */}
                    <div className="flex flex-wrap items-center gap-2 my-2">
                      {/* Level Badge */}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getLevelBadgeClass(
                          item.level
                        )}`}
                        title={t.levelDescriptions[item.level]}
                      >
                        {t.levels[item.level]}
                      </span>

                      {/* Format Badge */}
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {t.formats[item.format]}
                      </span>

                      {/* Free Badge */}
                      {item.isFree && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300 border border-green-200 dark:border-green-800">
                          {t.freeBadge}
                        </span>
                      )}

                      {/* Featured */}
                      {item.featured && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {t.featuredBadge}
                        </span>
                      )}
                    </div>

                    {/* Snippet / Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                      {highlightMatches(desc, query)}
                    </p>

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {item.tags.slice(0, 4).map((tag, idx) => (
                          <button
                            key={idx}
                            onClick={() => onUpdateFilters({ query: tag })}
                            className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quick action buttons row */}
                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800/60 text-xs">
                      <a
                        href={item.url}
                        target={settings.openInNewTab ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        {t.visitSite}
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {item.stream && (
                        <button
                          onClick={() => onPlay(item)}
                          className="text-white bg-emerald-600 hover:bg-emerald-500 rounded-full px-2.5 py-0.5 font-semibold flex items-center gap-1 transition-colors"
                          title={t.listenBtn}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          {t.listenBtn}
                        </button>
                      )}

                      <button
                        onClick={() => onOpenPreview(item)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {t.quickPreview}
                      </button>

                      <button
                        onClick={() => handleCopyLink(item.url, item.id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
                        title={t.copyLink}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{copiedId === item.id ? t.linkCopied : t.copyLink}</span>
                      </button>

                      <button
                        onClick={() => onToggleSave(item.id)}
                        className={`flex items-center gap-1 transition-colors ml-auto ${
                          isSaved
                            ? 'text-amber-500 font-semibold'
                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                        }`}
                        title={isSaved ? t.removeFromFavorites : t.saveToFavorites}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                            <span>{t.savedResources}</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{t.saveToFavorites}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </article>
                );
              })}

              {/* Google Search Live Discovery Footer Card */}
              {onOpenAddResource && (
                <div className="mt-8 p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-transparent dark:from-emerald-950/20 dark:via-teal-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.wantDiscoverMoreTitle}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {t.wantDiscoverMoreDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenAddResource(query, 'liveCrawler')}
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t.searchWebBtn}</span>
                  </button>
                </div>
              )}
            </>
          )}

          </div>

          {/* Right Column: Google Knowledge Panel or Level Guide (span 4 on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* If Knowledge Panel matches query */}
            {knowledgePanel ? (
              <div className="bg-white dark:bg-[#303134] rounded-2xl border border-gray-200 dark:border-gray-700/80 p-5 shadow-sm">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.knowledgeTitle}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {knowledgePanel.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3">
                  {knowledgePanel.subtitle[settings.language] || knowledgePanel.subtitle.eo}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {knowledgePanel.description[settings.language] || knowledgePanel.description.eo}
                </p>

                {/* Facts Table */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2 text-xs">
                  {knowledgePanel.facts.map((fact, i) => (
                    <div key={i} className="flex justify-between gap-2">
                      <span className="font-semibold text-gray-500 dark:text-gray-400 shrink-0">
                        {fact.label[settings.language] || fact.label.eo}:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 text-right">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct links */}
                {knowledgePanel.links.length > 0 && (
                  <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-3">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-2">
                      {t.moreInfo}:
                    </span>
                    <div className="space-y-1.5">
                      {knowledgePanel.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 hover:underline p-1.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 font-medium"
                        >
                          <span>{link.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* CEFR Level Guide for Students & Learners (High utility for language learners) */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40 dark:from-[#25282c] dark:to-[#1e2023] rounded-2xl border border-emerald-100 dark:border-gray-800 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <Info className="w-4 h-4" />
                <span>{t.levelGuideTitle}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                {t.levelGuideDesc}
              </p>

              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => onUpdateFilters({ level: 'A1' })}
                  className="p-2 rounded-lg bg-white/80 dark:bg-[#303134]/80 border border-gray-200/60 dark:border-gray-700 cursor-pointer hover:border-emerald-500 transition-colors"
                >
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                    <span>A1 - Komencanto</span>
                    <span className="text-[10px] font-normal text-gray-400">Duolingo, Lernu 1</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.levelDescriptions.A1}
                  </div>
                </div>

                <div 
                  onClick={() => onUpdateFilters({ level: 'A2' })}
                  className="p-2 rounded-lg bg-white/80 dark:bg-[#303134]/80 border border-gray-200/60 dark:border-gray-700 cursor-pointer hover:border-teal-500 transition-colors"
                >
                  <div className="font-bold text-teal-700 dark:text-teal-400 flex items-center justify-between">
                    <span>A2 - Elementa</span>
                    <span className="text-[10px] font-normal text-gray-400">Gerda, Bobelarto</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.levelDescriptions.A2}
                  </div>
                </div>

                <div 
                  onClick={() => onUpdateFilters({ level: 'B1' })}
                  className="p-2 rounded-lg bg-white/80 dark:bg-[#303134]/80 border border-gray-200/60 dark:border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="font-bold text-sky-700 dark:text-sky-400 flex items-center justify-between">
                    <span>B1 - Meza</span>
                    <span className="text-[10px] font-normal text-gray-400">Retradio, Libera Folio</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.levelDescriptions.B1}
                  </div>
                </div>

                <div 
                  onClick={() => onUpdateFilters({ level: 'B2' })}
                  className="p-2 rounded-lg bg-white/80 dark:bg-[#303134]/80 border border-gray-200/60 dark:border-gray-700 cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                    <span>B2 / C1 - Sperta</span>
                    <span className="text-[10px] font-normal text-gray-400">PIV, PMEG, Tekstaro</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-0.5">
                    {t.levelDescriptions.B2}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
