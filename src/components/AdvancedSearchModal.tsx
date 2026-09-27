import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterOptions, UserSettings, Level, Category, Format } from '../types';
import { TRANSLATIONS } from '../translations';
import { convertXSystem } from '../utils/esperanto';

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (newFilters: Partial<FilterOptions>) => void;
  settings: UserSettings;
}

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  settings,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[settings.language];

  const [allWords, setAllWords] = useState(filters.query || '');
  const [exactPhrase, setExactPhrase] = useState(filters.exactPhrase || '');
  const [anyWords, setAnyWords] = useState(filters.anyWords || '');
  const [excludeWords, setExcludeWords] = useState(filters.excludeWords || '');
  const [level, setLevel] = useState<Level>(filters.level);
  const [category, setCategory] = useState<Category>(filters.category);
  const [format, setFormat] = useState<Format | 'all'>(filters.format);
  const [freeOnly, setFreeOnly] = useState<boolean>(filters.isFree === true);

  const handleTextChange = (setter: (val: string) => void, val: string) => {
    if (settings.autoXSystem) {
      val = convertXSystem(val);
    }
    setter(val);
  };

  const handleReset = () => {
    setAllWords('');
    setExactPhrase('');
    setAnyWords('');
    setExcludeWords('');
    setLevel('all');
    setCategory('all');
    setFormat('all');
    setFreeOnly(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters({
      query: allWords.trim(),
      exactPhrase: exactPhrase.trim(),
      anyWords: anyWords.trim(),
      excludeWords: excludeWords.trim(),
      level,
      category,
      format,
      isFree: freeOnly ? true : null,
    });
    onClose();
  };

  const categoriesList: Category[] = [
    'all',
    'courses',
    'tools',
    'news',
    'literature',
    'media',
    'projects',
    'community'
  ];

  const levelsList: Level[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-[#303134] rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="advanced-search-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 id="advanced-search-title" className="text-lg font-bold text-gray-900 dark:text-white">
              {t.advancedSearchTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Section: Words logic */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3">
              {t.findPagesWith}
            </h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.allTheseWords}
                </label>
                <input
                  type="text"
                  value={allWords}
                  onChange={(e) => handleTextChange(setAllWords, e.target.value)}
                  placeholder={t.allWordsPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.exactWordPhrase}
                </label>
                <input
                  type="text"
                  value={exactPhrase}
                  onChange={(e) => handleTextChange(setExactPhrase, e.target.value)}
                  placeholder={t.exactPhrasePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.anyTheseWords}
                </label>
                <input
                  type="text"
                  value={anyWords}
                  onChange={(e) => handleTextChange(setAnyWords, e.target.value)}
                  placeholder={t.anyWordsPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.noneTheseWords}
                </label>
                <input
                  type="text"
                  value={excludeWords}
                  onChange={(e) => handleTextChange(setExcludeWords, e.target.value)}
                  placeholder={t.excludeWordsPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section: Filtering & Narrowing */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3">
              {t.thenNarrowBy}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.levelLabel}
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {levelsList.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {t.levels[lvl]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.categoryLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {t.categories[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t.formatLabel}
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

              <div className="flex items-center sm:pt-6">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={freeOnly}
                    onChange={(e) => setFreeOnly(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                  />
                  <span>{t.freeOnlyCheck}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.resetFields}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t.closeModal}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                {t.applyAdvancedSearch}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
