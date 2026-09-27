import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Settings, 
  Bookmark, 
  Search,
  ExternalLink,
  Users,
  Plus
} from 'lucide-react';
import { Language, UserSettings } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  currentView: 'home' | 'results' | 'forum';
  onSelectView: (view: 'home' | 'results' | 'forum') => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onOpenSettings: () => void;
  onOpenSaved: () => void;
  onOpenAddResource: () => void;
  savedCount: number;
  onGoHome: () => void;
  query: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  settings,
  onUpdateSettings,
  onOpenSettings,
  onOpenSaved,
  onOpenAddResource,
  savedCount,
  onGoHome,
  query,
  onSearchChange,
  onSearchSubmit,
}) => {
  const t = TRANSLATIONS[settings.language];

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ theme: nextTheme });
  };

  // Language menu: opens on click/tap (touch screens have no hover) and closes on
  // choosing a language, tapping outside or pressing Escape.
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [langOpen]);

  const handleLanguageChange = (lang: Language) => {
    onUpdateSettings({ language: lang });
    setLangOpen(false);
  };

  return (
    <header className="w-full bg-white dark:bg-[#202124] border-b border-gray-100 dark:border-gray-800 transition-colors sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Logo (In results view or forum) or minimalist title */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          {currentView !== 'home' ? (
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 shrink-0 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
              title={t.homeTitleTooltip}
              aria-label={t.homeTitleTooltip}
            >
              <img
                src="/logo-liberanimo.jpg"
                alt="Liberanimo Teruel"
                className="w-8 h-8 rounded-lg object-contain shadow-sm"
              />
              <div className="hidden md:flex items-baseline">
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-['Product_Sans',sans-serif]">
                  Serĉ<span className="text-emerald-600 dark:text-emerald-400">ilo</span>
                </span>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              <a 
                href="https://eventaservo.org" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden lg:flex items-center gap-1"
              >
                Eventa Servo <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a 
                href="https://vortaro.net" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden lg:flex items-center gap-1"
              >
                PIV Vortaro <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a 
                href="https://lernu.net" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:flex items-center gap-1"
              >
                Lernu.net <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          )}

          {/* Navigation Switcher: Serĉilo (Search) vs Forumo (Community) */}
          <nav className="flex items-center bg-gray-100 dark:bg-[#303134] p-1 rounded-xl border border-gray-200/60 dark:border-gray-700">
            <button
              onClick={() => onSelectView('home')}
              title={t.searchTab}
              aria-label={t.searchTab}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentView === 'home' || currentView === 'results'
                  ? 'bg-white dark:bg-[#202124] text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.searchTab}</span>
            </button>
            <button
              onClick={() => onSelectView('forum')}
              title={t.communityTab}
              aria-label={t.communityTab}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentView === 'forum'
                  ? 'bg-white dark:bg-[#202124] text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.communityTab}</span>
            </button>
          </nav>
        </div>

        {/* Center: Search input in Results View */}
        {currentView === 'results' && (
          <div className="flex-1 min-w-0 max-w-2xl hidden sm:block">
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-11 pr-24 py-2 text-sm bg-gray-50 dark:bg-[#303134] text-gray-900 dark:text-white rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#202124] shadow-sm transition-all"
                aria-label={t.screenReaderSearchInput}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {settings.autoXSystem && (
                <span 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40"
                  title={t.autoXSystemTooltipActive}
                >
                  cx→ĉ
                </span>
              )}
            </form>
          </div>
        )}

        {/* Right Side: Add Link button, Language, Theme, Saved, Settings */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          
          {/* Add Link / Web Crawler Button */}
          <button
            onClick={onOpenAddResource}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-2xs cursor-pointer"
            title={t.addLinkNavTitle}
            aria-label={t.addLinkNavTitle}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{t.addLinkNavBtn}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative group" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
              aria-label={t.changeLanguageAria}
            >
              <Globe className="hidden sm:block w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase">{settings.language}</span>
            </button>
            <div
              role="menu"
              className={`absolute right-0 mt-1 w-32 py-1 bg-white dark:bg-[#303134] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-all z-50 ${
                langOpen
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
              }`}
            >
              <button
                type="button"
                role="menuitemradio"
                aria-checked={settings.language === 'eo'}
                onClick={() => handleLanguageChange('eo')}
                className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${
                  settings.language === 'eo' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>Esperanto</span>
                {settings.language === 'eo' && '✓'}
              </button>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={settings.language === 'es'}
                onClick={() => handleLanguageChange('es')}
                className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${
                  settings.language === 'es' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>Español</span>
                {settings.language === 'es' && '✓'}
              </button>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={settings.language === 'en'}
                onClick={() => handleLanguageChange('en')}
                className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between ${
                  settings.language === 'en' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>English</span>
                {settings.language === 'en' && '✓'}
              </button>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title={settings.theme === 'dark' ? t.lightMode : t.darkMode}
            aria-label={settings.theme === 'dark' ? t.lightMode : t.darkMode}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* Saved Resources Button */}
          <button
            onClick={onOpenSaved}
            className="relative p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title={t.savedResources}
            aria-label={t.savedResources}
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {savedCount}
              </span>
            )}
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            title={t.settings}
            aria-label={t.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
