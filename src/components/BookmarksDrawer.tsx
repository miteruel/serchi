/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Download 
} from 'lucide-react';
import { EsperantoResource, UserSettings } from '../types';
import { TRANSLATIONS } from '../translations';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedResources: EsperantoResource[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onOpenPreview: (resource: EsperantoResource) => void;
  settings: UserSettings;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedResources,
  onRemoveSaved,
  onClearAll,
  onOpenPreview,
  settings,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[settings.language];

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(savedResources, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'sercilo-konservitaj-rimedoj.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#303134] h-full shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-700 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-current" />
            <div>
              <h2 id="bookmarks-title" className="text-base font-bold text-gray-900 dark:text-white">
                {t.savedResources}
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {savedResources.length} {t.savedCount}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedResources.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                {t.noSavedYet}
              </p>
            </div>
          ) : (
            savedResources.map((item) => {
              const desc = item.description[settings.language] || item.description.eo;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#202124]/50 hover:bg-white dark:hover:bg-[#202124] transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {t.levels[item.level]}
                    </span>
                    <button
                      onClick={() => onRemoveSaved(item.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5"
                      title={t.removeFromFavorites}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    <a
                      href={item.url}
                      target={settings.openInNewTab ? '_blank' : '_self'}
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {desc}
                  </p>

                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-700/50 text-xs">
                    <a
                      href={item.url}
                      target={settings.openInNewTab ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{t.visitSite}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => onOpenPreview(item)}
                      className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{t.quickPreview}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {savedResources.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearSaved}</span>
            </button>

            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportJsonBtn}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
