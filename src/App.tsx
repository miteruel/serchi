import React, { useState, useEffect, useMemo } from 'react';
import { 
  EsperantoResource, 
  KnowledgePanel, 
  UserSettings, 
  FilterOptions, 
  Level, 
  Category 
} from './types';
import { ForumTopic, ForumComment, ForumUser } from './types/forum';
import { fetchKnowledgePanels, fetchResources, addResource, addResources } from './api';
import { 
  INITIAL_FORUM_TOPICS, 
  INITIAL_FORUM_COMMENTS, 
  CURRENT_MOCK_USERS 
} from './data/forumData';
import { Header } from './components/Header';
import { SearchHome } from './components/SearchHome';
import { SearchResults } from './components/SearchResults';
import { ForumView } from './components/ForumView';
import { AdvancedSearchModal } from './components/AdvancedSearchModal';
import { SettingsModal } from './components/SettingsModal';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AddResourceModal } from './components/AddResourceModal';
import { Footer } from './components/Footer';
import { RadioPlayer } from './components/RadioPlayer';
import { 
  convertXSystem, 
  normalizeText, 
  getExpandedTokens 
} from './utils/esperanto';
import { TRANSLATIONS } from './translations';

const DEFAULT_SETTINGS: UserSettings = {
  language: 'eo',
  autoXSystem: true,
  theme: 'system',
  resultsPerPage: 20,
  openInNewTab: true,
  highContrast: false,
  defaultLevel: 'all',
};

const INITIAL_FILTERS: FilterOptions = {
  query: '',
  category: 'all',
  level: 'all',
  isFree: null,
  format: 'all',
  sortBy: 'relevance',
  exactPhrase: '',
  excludeWords: '',
  anyWords: '',
};

export default function App() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem('sercilo_settings');
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  // Resource index and knowledge panels, loaded from the server's SQLite database
  const [resources, setResources] = useState<EsperantoResource[]>([]);
  const [knowledgePanels, setKnowledgePanels] = useState<KnowledgePanel[]>([]);
  const [dataError, setDataError] = useState<string | null>(null);

  // Load saved bookmark IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sercilo_saved');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return ['lernu-net', 'vortaro-piv', 'pasporta-servo'];
  });

  // Forum state: topics & comments with persistence
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(() => {
    try {
      const stored = localStorage.getItem('sercilo_forum_topics');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_FORUM_TOPICS;
  });

  const [forumComments, setForumComments] = useState<Record<string, ForumComment[]>>(() => {
    try {
      const stored = localStorage.getItem('sercilo_forum_comments');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return INITIAL_FORUM_COMMENTS;
  });

  // Active simulated user in the community
  const [currentUser, setCurrentUser] = useState<ForumUser>(() => {
    try {
      const stored = localStorage.getItem('sercilo_current_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return CURRENT_MOCK_USERS.meLearner;
  });

  // UI Views: 'home' | 'results' | 'forum'
  const [view, setView] = useState<'home' | 'results' | 'forum'>('home');
  const [queryInput, setQueryInput] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [addResourceInitialQuery, setAddResourceInitialQuery] = useState('');
  const [addResourceInitialTab, setAddResourceInitialTab] = useState<'single' | 'liveCrawler'>('single');
  const [previewResource, setPreviewResource] = useState<EsperantoResource | null>(null);
  // Station playing in the bottom player bar (kept while navigating)
  const [playing, setPlaying] = useState<EsperantoResource | null>(null);

  const handleOpenAddResource = (query = '', tab: 'single' | 'liveCrawler' = 'single') => {
    setAddResourceInitialQuery(query);
    setAddResourceInitialTab(tab);
    setIsAddResourceOpen(true);
  };

  // Sync settings with localStorage
  useEffect(() => {
    localStorage.setItem('sercilo_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    localStorage.setItem('sercilo_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  // Load resources and knowledge panels from the API. Links that older
  // versions stored only in this browser are uploaded once to the database.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const legacy = localStorage.getItem('sercilo_custom_resources');
        if (legacy) {
          const custom: EsperantoResource[] = JSON.parse(legacy);
          if (Array.isArray(custom) && custom.length > 0) {
            await addResources(custom, 'user');
          }
          localStorage.removeItem('sercilo_custom_resources');
        }
      } catch (err) {
        console.warn('Could not migrate locally stored resources', err);
      }
      try {
        const [res, kp] = await Promise.all([fetchResources(), fetchKnowledgePanels()]);
        if (!cancelled) {
          setResources(res);
          setKnowledgePanels(kp);
        }
      } catch (err: any) {
        if (!cancelled) setDataError(err.message || String(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync forum state
  useEffect(() => {
    localStorage.setItem('sercilo_forum_topics', JSON.stringify(forumTopics));
  }, [forumTopics]);

  useEffect(() => {
    localStorage.setItem('sercilo_forum_comments', JSON.stringify(forumComments));
  }, [forumComments]);

  useEffect(() => {
    localStorage.setItem('sercilo_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Theme application (light / dark / system)
  useEffect(() => {
    const root = document.documentElement;
    const isDark = 
      settings.theme === 'dark' || 
      (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.highContrast) {
      root.classList.add('contrast-125');
    } else {
      root.classList.remove('contrast-125');
    }
  }, [settings.theme, settings.highContrast]);

  // Update settings handler
  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Toggle bookmark
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add a single new resource; the server rejects duplicated URLs
  const handleAddResource = async (item: Omit<EsperantoResource, 'id'>) => {
    try {
      const result = await addResource(item);
      if (result.duplicate) {
        return { success: false, error: TRANSLATIONS[settings.language].duplicateUrlError };
      }
      setResources((prev) => [result.resource!, ...prev]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || String(err) };
    }
  };

  // Batch add multiple resources from Google crawler
  const handleBatchAddResources = async (items: Omit<EsperantoResource, 'id'>[]) => {
    const result = await addResources(items, 'crawled');
    if (result.inserted.length > 0) {
      setResources((prev) => [...result.inserted, ...prev]);
    }
    return { added: result.added, skippedDuplicates: result.skippedDuplicates };
  };

  // Search execution
  const handleSearch = (customQuery?: string, level?: Level, category?: Category) => {
    const targetQuery = customQuery !== undefined ? customQuery : queryInput;
    const targetLevel = level !== undefined ? level : filters.level;
    const targetCategory = category !== undefined ? category : filters.category;

    setFilters((prev) => ({
      ...prev,
      query: targetQuery,
      level: targetLevel,
      category: targetCategory,
    }));

    setQueryInput(targetQuery);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Feeling Lucky: open first or random featured item
  const handleLuckySearch = () => {
    const featuredList = resources.filter((r) => r.featured);
    const pool = featuredList.length > 0 ? featuredList : resources;
    const lucky = pool[Math.floor(Math.random() * pool.length)];
    if (lucky) {
      setPreviewResource(lucky);
    }
  };

  const handleUpdateFilters = (updates: Partial<FilterOptions>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updates };
      if (updates.query !== undefined) {
        setQueryInput(updates.query);
      }
      return next;
    });
  };

  // Forum actions: Create topic
  const handleCreateTopic = (topicData: {
    title: string;
    content: string;
    category: ForumTopic['category'];
    level: Level;
    tags: string[];
  }) => {
    const newTopic: ForumTopic = {
      id: `topic-${Date.now()}`,
      title: topicData.title,
      content: topicData.content,
      author: currentUser,
      level: topicData.level,
      category: topicData.category,
      tags: topicData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 1,
      likes: 1,
      likedByMe: true,
      repliesCount: 0,
      isPinned: false,
      isLocked: false,
    };

    setForumTopics((prev) => [newTopic, ...prev]);
    setForumComments((prev) => ({ ...prev, [newTopic.id]: [] }));
  };

  // Forum actions: Reply / Comment
  const handleAddComment = (topicId: string, content: string, isModNote = false) => {
    const newComment: ForumComment = {
      id: `comm-${Date.now()}`,
      topicId,
      author: currentUser,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      isModeratorNote: isModNote,
    };

    setForumComments((prev) => {
      const list = prev[topicId] || [];
      return { ...prev, [topicId]: [...list, newComment] };
    });

    setForumTopics((prev) =>
      prev.map((top) =>
        top.id === topicId
          ? {
              ...top,
              repliesCount: (top.repliesCount || 0) + 1,
              updatedAt: new Date().toISOString(),
            }
          : top
      )
    );
  };

  // Forum actions: Like topic
  const handleToggleTopicLike = (topicId: string) => {
    setForumTopics((prev) =>
      prev.map((top) => {
        if (top.id === topicId) {
          const liked = !top.likedByMe;
          return {
            ...top,
            likedByMe: liked,
            likes: liked ? top.likes + 1 : Math.max(0, top.likes - 1),
          };
        }
        return top;
      })
    );
  };

  // Forum actions: Like comment
  const handleToggleCommentLike = (topicId: string, commentId: string) => {
    setForumComments((prev) => {
      const list = prev[topicId] || [];
      const updated = list.map((comm) => {
        if (comm.id === commentId) {
          const liked = !comm.likedByMe;
          return {
            ...comm,
            likedByMe: liked,
            likes: liked ? comm.likes + 1 : Math.max(0, comm.likes - 1),
          };
        }
        return comm;
      });
      return { ...prev, [topicId]: updated };
    });
  };

  // Moderator actions: Pin / Unpin
  const handleTogglePinTopic = (topicId: string) => {
    if (currentUser.role !== 'moderator') return;
    setForumTopics((prev) =>
      prev.map((top) =>
        top.id === topicId ? { ...top, isPinned: !top.isPinned } : top
      )
    );
  };

  // Moderator actions: Lock / Unlock
  const handleToggleLockTopic = (topicId: string) => {
    if (currentUser.role !== 'moderator') return;
    setForumTopics((prev) =>
      prev.map((top) =>
        top.id === topicId ? { ...top, isLocked: !top.isLocked } : top
      )
    );
  };

  // Moderator actions: Delete topic
  const handleDeleteTopic = (topicId: string) => {
    if (currentUser.role !== 'moderator') return;
    setForumTopics((prev) => prev.filter((top) => top.id !== topicId));
    setForumComments((prev) => {
      const copy = { ...prev };
      delete copy[topicId];
      return copy;
    });
  };

  // Moderator actions: Delete comment
  const handleDeleteComment = (topicId: string, commentId: string) => {
    if (currentUser.role !== 'moderator') return;
    setForumComments((prev) => {
      const list = prev[topicId] || [];
      return { ...prev, [topicId]: list.filter((comm) => comm.id !== commentId) };
    });
    setForumTopics((prev) =>
      prev.map((top) =>
        top.id === topicId
          ? { ...top, repliesCount: Math.max(0, (top.repliesCount || 1) - 1) }
          : top
      )
    );
  };

  // Execute filtering & ranking across the dynamic resources
  const { filteredResults, searchDurationMs, matchedKnowledge } = useMemo(() => {
    const startTime = performance.now();

    const rawQuery = (filters.query || '').trim();
    const exactPhrase = (filters.exactPhrase || '').trim().toLowerCase();
    const excludeWords = (filters.excludeWords || '').toLowerCase().split(/\s+/).filter(Boolean);
    const anyWords = (filters.anyWords || '').toLowerCase().split(/\s+/).filter(Boolean);

    const expandedTokens = rawQuery ? getExpandedTokens(rawQuery) : [];

    let results = resources.filter((item) => {
      // 1. Level filter
      if (filters.level !== 'all' && item.level !== 'all' && item.level !== filters.level) {
        return false;
      }

      // 2. Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // 3. Format filter
      if (filters.format !== 'all' && item.format !== filters.format) {
        return false;
      }

      // 4. Free filter
      if (filters.isFree === true && !item.isFree) {
        return false;
      }

      const searchableText = [
        item.title,
        item.displayUrl,
        item.description.eo,
        item.description.es,
        item.description.en,
        item.tags.join(' '),
        item.author || '',
      ].join(' ').toLowerCase();

      const normalizedSearchable = normalizeText(searchableText);

      // 5. Exclude words
      if (excludeWords.length > 0) {
        for (const badWord of excludeWords) {
          if (searchableText.includes(badWord) || normalizedSearchable.includes(normalizeText(badWord))) {
            return false;
          }
        }
      }

      // 6. Exact phrase
      if (exactPhrase) {
        if (!searchableText.includes(exactPhrase) && !normalizedSearchable.includes(normalizeText(exactPhrase))) {
          return false;
        }
      }

      // 7. Any words
      if (anyWords.length > 0) {
        const matchesAny = anyWords.some(
          (w) => searchableText.includes(w) || normalizedSearchable.includes(normalizeText(w))
        );
        if (!matchesAny) return false;
      }

      // 8. Main query tokens matching
      if (expandedTokens.length > 0) {
        const hasTokenMatch = expandedTokens.some((tok) => {
          return searchableText.includes(tok) || normalizedSearchable.includes(tok);
        });
        if (!hasTokenMatch) return false;
      }

      return true;
    });

    // Score & Sort
    if (filters.sortBy === 'alpha') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'level') {
      const levelWeights: Record<Level, number> = {
        all: 0,
        A1: 1,
        A2: 2,
        B1: 3,
        B2: 4,
        C1: 5,
      };
      results.sort((a, b) => levelWeights[a.level] - levelWeights[b.level]);
    } else {
      // Relevance score
      results.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (a.featured) scoreA += 15;
        if (b.featured) scoreB += 15;

        if (rawQuery) {
          const normQ = normalizeText(rawQuery);
          if (normalizeText(a.title).includes(normQ)) scoreA += 50;
          if (normalizeText(b.title).includes(normQ)) scoreB += 50;

          if (a.tags.some((t) => normalizeText(t).includes(normQ))) scoreA += 25;
          if (b.tags.some((t) => normalizeText(t).includes(normQ))) scoreB += 25;
        }

        return scoreB - scoreA;
      });
    }

    // Check knowledge panel match
    let knowledge: KnowledgePanel | null = null;
    if (rawQuery) {
      const normQ = normalizeText(rawQuery);
      knowledge = knowledgePanels.find((kp) => 
        kp.keywords.some((kw) => normQ.includes(normalizeText(kw)) || normalizeText(kw).includes(normQ))
      ) || null;
    }

    const duration = Math.max(1, Math.round(performance.now() - startTime));

    return {
      filteredResults: results,
      searchDurationMs: duration,
      matchedKnowledge: knowledge,
    };
  }, [filters, resources, knowledgePanels]);

  const savedResourcesList = useMemo(() => {
    return resources.filter((r) => savedIds.includes(r.id));
  }, [savedIds, resources]);

  const allResourceUrls = useMemo(() => {
    return resources.map((r) => r.url);
  }, [resources]);

  return (
    <div className={`min-h-screen flex flex-col ${playing ? 'pb-56' : ''} bg-white dark:bg-[#202124] text-gray-900 dark:text-gray-100 transition-colors`}>
      
      {/* Top Header with Search / Community switcher and Add Link button */}
      <Header
        currentView={view}
        onSelectView={(v) => {
          setView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSaved={() => setIsBookmarksOpen(true)}
        onOpenAddResource={() => handleOpenAddResource('', 'single')}
        savedCount={savedIds.length}
        onGoHome={() => {
          setView('home');
          setQueryInput('');
          setFilters(INITIAL_FILTERS);
        }}
        query={queryInput}
        onSearchChange={(val) => {
          setQueryInput(val);
          handleUpdateFilters({ query: val });
        }}
        onSearchSubmit={(e) => {
          if (e) e.preventDefault();
          handleSearch();
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {dataError && (
          <div role="alert" className="max-w-3xl mx-auto mt-4 px-4 py-2 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200 text-sm">
            ⚠ {dataError}
          </div>
        )}
        {view === 'forum' ? (
          <ForumView
            topics={forumTopics}
            comments={forumComments}
            currentUser={currentUser}
            onChangeUserRole={setCurrentUser}
            onCreateTopic={handleCreateTopic}
            onAddComment={handleAddComment}
            onToggleTopicLike={handleToggleTopicLike}
            onToggleCommentLike={handleToggleCommentLike}
            onTogglePinTopic={handleTogglePinTopic}
            onToggleLockTopic={handleToggleLockTopic}
            onDeleteTopic={handleDeleteTopic}
            onDeleteComment={handleDeleteComment}
            settings={settings}
          />
        ) : view === 'home' ? (
          <SearchHome
            query={queryInput}
            onQueryChange={setQueryInput}
            onSearch={handleSearch}
            onLuckySearch={handleLuckySearch}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenAdvanced={() => setIsAdvancedOpen(true)}
            selectedLevel={filters.level}
            onSelectLevel={(lvl) => setFilters((prev) => ({ ...prev, level: lvl }))}
            resources={resources}
            onPlay={setPlaying}
          />
        ) : (
          <SearchResults
            resources={filteredResults}
            totalCount={filteredResults.length}
            searchDurationMs={searchDurationMs}
            query={filters.query}
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            settings={settings}
            knowledgePanel={matchedKnowledge}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenPreview={(res) => setPreviewResource(res)}
            onPlay={setPlaying}
            onOpenAdvanced={() => setIsAdvancedOpen(true)}
            onOpenAddResource={handleOpenAddResource}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdvanced={() => setIsAdvancedOpen(true)}
      />

      {/* Modals & Drawers */}
      <AdvancedSearchModal
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          handleUpdateFilters(newFilters);
          setView('results');
        }}
        settings={settings}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => setSettings(newSettings)}
        onResetDefaults={handleResetDefaults}
      />

      <ResourceDetailModal
        resource={previewResource}
        onClose={() => setPreviewResource(null)}
        settings={settings}
        isSaved={previewResource ? savedIds.includes(previewResource.id) : false}
        onToggleSave={handleToggleSave}
        onTagClick={(tag) => handleSearch(tag)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedResources={savedResourcesList}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => setSavedIds([])}
        onOpenPreview={(res) => setPreviewResource(res)}
        settings={settings}
      />

      {playing && playing.stream && (
        <RadioPlayer resource={playing} settings={settings} onClose={() => setPlaying(null)} />
      )}

      {/* Add Resource & Live Google Search Grounding Modal */}
      <AddResourceModal
        isOpen={isAddResourceOpen}
        onClose={() => setIsAddResourceOpen(false)}
        onAddResource={handleAddResource}
        onBatchAddResources={handleBatchAddResources}
        existingUrls={allResourceUrls}
        settings={settings}
        initialQuery={addResourceInitialQuery}
        initialTab={addResourceInitialTab}
      />

    </div>
  );
}
