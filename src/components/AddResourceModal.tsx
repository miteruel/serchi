import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Link as LinkIcon, 
  Check, 
  AlertCircle, 
  Globe, 
  Layers, 
  GraduationCap,
  Sparkles,
  Search
} from 'lucide-react';
import { EsperantoResource, UserSettings, Level, Category, Format } from '../types';
import { TRANSLATIONS } from '../translations';
import { convertXSystem } from '../utils/esperanto';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (newResource: Omit<EsperantoResource, 'id'>) => Promise<{ success: boolean; error?: string }>;
  onBatchAddResources: (resources: Omit<EsperantoResource, 'id'>[]) => Promise<{ added: number; skippedDuplicates: number }>;
  existingUrls: string[];
  settings: UserSettings;
  initialQuery?: string;
  initialTab?: 'single' | 'liveCrawler';
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  onAddResource,
  onBatchAddResources,
  existingUrls,
  settings,
  initialQuery = '',
  initialTab = 'single',
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[settings.language];

  const [activeTab, setActiveTab] = useState<'single' | 'liveCrawler'>(initialTab);

  // Single form states
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<Category>('projects');
  const [level, setLevel] = useState<Level>('all');
  const [format, setFormat] = useState<Format>('website');
  const [tags, setTags] = useState('');
  const [isFree, setIsFree] = useState(true);

  // Status feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Live Web Crawler / Google Search states
  const [crawlQuery, setCrawlQuery] = useState(initialQuery);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawledResults, setCrawledResults] = useState<{
    title: string;
    url: string;
    displayUrl: string;
    snippet: string;
    suggestedLevel: Level;
    suggestedCategory: Category;
    isDuplicate: boolean;
    selected: boolean;
  }[]>([]);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    setStatusMessage(null);
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim() || !title.trim() || !desc.trim()) {
      setStatusMessage({
        type: 'error',
        text: t.urlRequiredNotice,
      });
      return;
    }

    // Auto extract clean displayUrl
    let displayUrl = 'esperanto.org';
    try {
      const parsedUrl = new URL(url.trim());
      displayUrl = parsedUrl.hostname.replace(/^www\./, '') + (parsedUrl.pathname !== '/' ? parsedUrl.pathname : '');
    } catch {
      setStatusMessage({
        type: 'error',
        text: t.invalidUrlNotice,
      });
      return;
    }

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const result = await onAddResource({
      title: title.trim(),
      url: url.trim(),
      displayUrl,
      description: {
        eo: desc.trim(),
        es: desc.trim(),
        en: desc.trim(),
      },
      category,
      level,
      format,
      tags: parsedTags,
      isFree,
    });

    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: t.addSuccessNotice,
      });
      // Reset form
      setUrl('');
      setTitle('');
      setDesc('');
      setTags('');
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 1200);
    } else {
      setStatusMessage({
        type: 'error',
        text: result.error || t.duplicateUrlError,
      });
    }
  };

  // Trigger Google Search Grounding to discover fresh links in real-time
  const handleStartCrawler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crawlQuery.trim() || isCrawling) return;

    setIsCrawling(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/live-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: crawlQuery.trim(),
          language: settings.language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.noCrawledFound);
      }

      const existingSet = new Set(existingUrls.map((u) => u.toLowerCase().replace(/\/$/, '')));

      const mapped = (data.results || []).map((item: any) => {
        const cleanUrl = (item.url || '').toLowerCase().replace(/\/$/, '');
        const isDuplicate = existingSet.has(cleanUrl);

        return {
          title: item.title,
          url: item.url,
          displayUrl: item.displayUrl || item.url,
          snippet: item.snippet,
          suggestedLevel: item.suggestedLevel || 'all',
          suggestedCategory: item.suggestedCategory || 'projects',
          isDuplicate,
          selected: !isDuplicate,
        };
      });

      setCrawledResults(mapped);

      if (mapped.length === 0) {
        setStatusMessage({
          type: 'error',
          text: t.noCrawledFound,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || t.noCrawledFound,
      });
    } finally {
      setIsCrawling(false);
    }
  };

  const handleToggleSelectCrawl = (idx: number) => {
    setCrawledResults((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleImportSelectedCrawled = async () => {
    const toImport = crawledResults.filter((r) => r.selected && !r.isDuplicate);
    if (toImport.length === 0) return;

    const resourcesPayload: Omit<EsperantoResource, 'id'>[] = toImport.map((item) => ({
      title: item.title,
      url: item.url,
      displayUrl: item.displayUrl,
      description: {
        eo: item.snippet,
        es: item.snippet,
        en: item.snippet,
      },
      category: item.suggestedCategory,
      level: item.suggestedLevel,
      format: 'website',
      tags: ['google-search', crawlQuery.toLowerCase()],
      isFree: true,
    }));

    let result: { added: number; skippedDuplicates: number };
    try {
      result = await onBatchAddResources(resourcesPayload);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || t.noCrawledFound });
      return;
    }

    setStatusMessage({
      type: 'success',
      text: t.crawledImportSuccess(result.added, result.skippedDuplicates),
    });

    setCrawledResults([]);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const categoriesList: Category[] = [
    'courses',
    'tools',
    'news',
    'literature',
    'media',
    'projects',
    'community'
  ];

  const levelsList: Level[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  const formatsList: Format[] = [
    'website',
    'app',
    'podcast',
    'book',
    'video',
    'course',
    'tool',
    'forum'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-[#303134] rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-resource-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h2 id="add-resource-title" className="text-base font-bold text-gray-900 dark:text-white">
                {t.addResourceModalTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.addResourceModalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label={t.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#202124]/50 px-6 pt-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'single'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>{t.tabManualAdd}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('liveCrawler')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'liveCrawler'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.tabGoogleCrawler}</span>
          </button>
        </div>

        {/* Status Message Banner */}
        {statusMessage && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-green-50 dark:bg-green-950/60 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* TAB 1: Single link manual addition */}
        {activeTab === 'single' ? (
          <form onSubmit={handleSingleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                {t.urlLabel}
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder={t.urlPlaceholder}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                {t.urlHelperText}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                {t.resourceTitleLabel}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(settings.autoXSystem ? convertXSystem(e.target.value) : e.target.value)}
                placeholder={t.resourceTitlePlaceholder}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  {t.categoryLabelSelect}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {t.categories[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  {t.levelLabelSelect}
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {levelsList.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {t.levels[lvl]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  {t.formatLabelSelect}
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as Format)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {formatsList.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {t.formats[fmt]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                {t.resourceDescLabel}
              </label>
              <textarea
                required
                rows={3}
                value={desc}
                onChange={(e) => setDesc(settings.autoXSystem ? convertXSystem(e.target.value) : e.target.value)}
                placeholder={t.resourceDescPlaceholder}
                className="w-full p-3 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                {t.tagsLabelInput}
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={t.tagsPlaceholderInput}
                className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                />
                <span>{t.freeResourceCheckbox}</span>
              </label>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {t.submitAddResourceBtn}
              </button>
            </div>
          </form>
        ) : (
          /* TAB 2: Live Google Search discovery process */
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleStartCrawler} className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                {t.crawlerQueryLabel}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={crawlQuery}
                    onChange={(e) => setCrawlQuery(e.target.value)}
                    placeholder={t.crawlerQueryPlaceholder}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCrawling || !crawlQuery.trim()}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isCrawling ? t.crawlingProgressText : t.startCrawlerBtn}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {t.crawlerNoticeText}
              </p>
            </form>

            {/* Results list */}
            {crawledResults.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    {crawledResults.length} {t.resultsStats(crawledResults.length, '0.00').split('(')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleImportSelectedCrawled}
                    className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t.importSelectedBtn(crawledResults.filter((r) => r.selected && !r.isDuplicate).length)}
                  </button>
                </div>

                <div className="space-y-2">
                  {crawledResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => !item.isDuplicate && handleToggleSelectCrawl(idx)}
                      className={`p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                        item.isDuplicate
                          ? 'opacity-50 bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                          : item.selected
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 cursor-pointer'
                          : 'bg-white dark:bg-[#202124] border-gray-200 dark:border-gray-700 cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        disabled={item.isDuplicate}
                        checked={item.selected && !item.isDuplicate}
                        onChange={() => {}}
                        className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 dark:text-white truncate">
                            {item.title}
                          </span>
                          {item.isDuplicate ? (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                              {t.alreadyInIndexBadge}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                              {t.featuredBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] block truncate">
                          {item.url}
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {item.snippet}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
