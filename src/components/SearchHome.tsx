import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  BookOpen, 
  Headphones, 
  Compass, 
  Bookmark, 
  ArrowRight,
  SlidersHorizontal,
  Radio,
  Play,
  UserRound,
  CalendarDays
} from 'lucide-react';
import { UserSettings, Level, Category, EsperantoResource } from '../types';
import { TRANSLATIONS } from '../translations';
import { convertXSystem } from '../utils/esperanto';

interface SearchHomeProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: (customQuery?: string, level?: Level, category?: Category) => void;
  onLuckySearch: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onOpenAdvanced: () => void;
  selectedLevel: Level;
  onSelectLevel: (lvl: Level) => void;
  resources: EsperantoResource[];
  onPlay: (resource: EsperantoResource) => void;
}

export const SearchHome: React.FC<SearchHomeProps> = ({
  query,
  onQueryChange,
  onSearch,
  onLuckySearch,
  settings,
  onUpdateSettings,
  onOpenAdvanced,
  selectedLevel,
  onSelectLevel,
  resources,
  onPlay,
}) => {
  const t = TRANSLATIONS[settings.language];
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus shortcut '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update suggestions based on input
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = new Set<string>();

    // Suggest matching resource titles
    resources.forEach((item) => {
      if (item.title.toLowerCase().includes(q)) {
        matches.add(item.title);
      }
      item.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(q) && matches.size < 6) {
          matches.add(tag);
        }
      });
    });

    setSuggestions(Array.from(matches).slice(0, 6));
  }, [query, resources]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (settings.autoXSystem) {
      val = convertXSystem(val);
    }
    onQueryChange(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleSuggestionClick = (sug: string) => {
    onQueryChange(sug);
    onSearch(sug);
  };

  const popularSearches = [
    { label: 'PIV Vortaro', q: 'piv vortaro' },
    { label: 'Lernu.net', q: 'lernu' },
    { label: 'PMEG Gramatiko', q: 'pmeg' },
    { label: 'Duolingo', q: 'duolingo' },
    { label: 'Pasporta Servo', q: 'pasporta servo' },
    { label: 'Tubaro Videoj', q: 'tubaro' },
    { label: 'Libera Folio', q: 'libera folio' },
    { label: 'Podkastoj', q: 'podkasto' },
  ];

  const radioStations = resources.filter((r) => r.category === 'radio' && r.stream);
  const famousPeople = resources.filter((r) => r.category === 'people' && r.featured);
  const mainEvents = resources.filter((r) => r.category === 'events' && r.featured);

  const levelsList: { key: Level; label: string; badgeColor: string }[] = [
    { key: 'all', label: t.levels.all, badgeColor: 'hover:border-gray-400' },
    { key: 'A1', label: t.levels.A1, badgeColor: 'hover:border-emerald-500' },
    { key: 'A2', label: t.levels.A2, badgeColor: 'hover:border-teal-500' },
    { key: 'B1', label: t.levels.B1, badgeColor: 'hover:border-blue-500' },
    { key: 'B2', label: t.levels.B2, badgeColor: 'hover:border-indigo-500' },
    { key: 'C1', label: t.levels.C1, badgeColor: 'hover:border-purple-500' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-10 sm:-mt-14 max-w-4xl mx-auto w-full">
      
      {/* Google-style Minimalist Logo with Verda Stelo */}
      <div className="flex flex-col items-center mb-8 select-none">
        <div className="flex items-center gap-3">
          <img
            src="/logo-liberanimo.jpg"
            alt="Liberanimo Teruel"
            className="w-16 h-16 rounded-2xl object-contain shadow-lg shadow-emerald-600/20 transform hover:scale-105 transition-transform duration-200"
          />
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white font-['Product_Sans',sans-serif]">
            Serĉ<span className="text-emerald-600 dark:text-emerald-400">ilo</span>
          </h1>
        </div>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
          {t.tagline}
        </p>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          {t.ownerNotice}
        </p>
      </div>

      {/* Main Search Box */}
      <div className="w-full max-w-2xl relative">
        <form onSubmit={handleFormSubmit} className="relative z-20">
          <div
            className={`flex items-center w-full px-4 py-3.5 bg-white dark:bg-[#303134] rounded-full border transition-all duration-200 shadow-sm ${
              isFocused
                ? 'border-transparent shadow-xl ring-2 ring-emerald-500/80 dark:ring-emerald-400/80 bg-white dark:bg-[#303134]'
                : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none"
              aria-label={t.screenReaderSearchInput}
              autoComplete="off"
            />

            <div className="flex items-center gap-2 shrink-0 ml-2">
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={t.clearSearchQueryTitle}
                  aria-label={t.clearSearchQueryAria}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* X-System toggle indicator */}
              <button
                type="button"
                onClick={() => onUpdateSettings({ autoXSystem: !settings.autoXSystem })}
                className={`text-[11px] font-semibold px-2 py-1 rounded-md transition-colors ${
                  settings.autoXSystem
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 border border-gray-200 dark:border-gray-600'
                }`}
                title={settings.autoXSystem ? t.autoXSystemTooltipActive : t.autoXSystemTooltipInactive}
              >
                cx→ĉ
              </button>

              {/* Keyboard hint */}
              {!query && (
                <span className="hidden sm:inline text-xs font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700/60 text-gray-400 border border-gray-200 dark:border-gray-700">
                  /
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Predictive Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-14 bg-white dark:bg-[#303134] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-30 overflow-hidden">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSuggestionClick(sug)}
                className="w-full px-5 py-2.5 text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{sug}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Google-style Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={() => onSearch()}
          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-50 dark:bg-[#303134] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {t.searchBtn}
        </button>
        <button
          onClick={onLuckySearch}
          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-50 dark:bg-[#303134] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {t.luckyBtn}
        </button>
        <button
          onClick={onOpenAdvanced}
          className="px-3.5 py-2.5 text-xs font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          title={t.advancedSearchTitle}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{t.advancedSearchTitle}</span>
        </button>
      </div>

      {/* Google-style Language Switcher Line */}
      <div className="mt-7 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <span>{t.availableIn}</span>
        <div className="flex items-center gap-2 font-medium">
          {settings.language !== 'eo' && (
            <button
              onClick={() => onUpdateSettings({ language: 'eo' })}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Esperanto
            </button>
          )}
          {settings.language !== 'es' && (
            <button
              onClick={() => onUpdateSettings({ language: 'es' })}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Español
            </button>
          )}
          {settings.language !== 'en' && (
            <button
              onClick={() => onUpdateSettings({ language: 'en' })}
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              English
            </button>
          )}
        </div>
      </div>

      {/* Level Categorization Quick Filter (Crucial user request!) */}
      <div className="mt-8 w-full max-w-2xl bg-gray-50/80 dark:bg-[#303134]/40 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t.quickFilters}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            CEFR / KER Niveloj
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {levelsList.map((lvl) => {
            const isSelected = selectedLevel === lvl.key;
            return (
              <button
                key={lvl.key}
                type="button"
                onClick={() => {
                  onSelectLevel(lvl.key);
                  onSearch(query, lvl.key);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-[#202124] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 ' + lvl.badgeColor
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Discovery Chips */}
      <div className="mt-5 w-full max-w-2xl flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-gray-400 dark:text-gray-500 mr-1">
          {t.popularSearches}
        </span>
        {popularSearches.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              onQueryChange(item.q);
              onSearch(item.q);
            }}
            className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-[#202124] border border-gray-200 dark:border-gray-700/80 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Esperanto radio: stations with an online player */}
      {radioStations.length > 0 && (
        <section className="mt-8 w-full max-w-2xl" aria-labelledby="radio-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 id="radio-heading" className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Radio className="w-4 h-4 text-emerald-600" /> {t.radioSectionTitle}
            </h2>
            <button
              onClick={() => onSearch('', undefined, 'radio')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              {t.radioSeeAll} →
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.radioSectionDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {radioStations.map((station) => (
              <button
                key={station.id}
                onClick={() => onPlay(station)}
                className="flex items-center gap-3 text-left px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold truncate">{station.title}</span>
                  <span className="block text-xs text-gray-500 truncate">{station.displayUrl}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Famous Esperantists: featured people; a click searches for the person */}
      {famousPeople.length > 0 && (
        <section className="mt-8 w-full max-w-2xl" aria-labelledby="people-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 id="people-heading" className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <UserRound className="w-4 h-4 text-emerald-600" /> {t.peopleSectionTitle}
            </h2>
            <button
              onClick={() => onSearch('', undefined, 'people')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              {t.peopleSeeAll} →
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.peopleSectionDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {famousPeople.map((person) => (
              <button
                key={person.id}
                onClick={() => {
                  onQueryChange(person.title);
                  onSearch(person.title);
                }}
                className="text-left px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                <span className="block text-sm font-semibold truncate">{person.title}</span>
                <span className="block text-xs text-gray-500 truncate">
                  {person.description[settings.language] || person.description.eo}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Esperanto events: featured congresses and meetings, linked to their websites */}
      {mainEvents.length > 0 && (
        <section className="mt-8 w-full max-w-2xl" aria-labelledby="events-heading">
          <div className="flex items-center justify-between mb-2">
            <h2 id="events-heading" className="text-sm font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CalendarDays className="w-4 h-4 text-emerald-600" /> {t.eventsSectionTitle}
            </h2>
            <button
              onClick={() => onSearch('', undefined, 'events')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              {t.eventsSeeAll} →
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.eventsSectionDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mainEvents.map((event) => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                <span className="block text-sm font-semibold truncate">{event.title}</span>
                <span className="block text-xs text-gray-500 truncate">
                  {event.description[settings.language] || event.description.eo}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
