import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Sparkles,
  Calendar,
  User,
  Layers,
  GraduationCap
} from 'lucide-react';
import { EsperantoResource, UserSettings } from '../types';
import { TRANSLATIONS } from '../translations';

interface ResourceDetailModalProps {
  resource: EsperantoResource | null;
  onClose: () => void;
  settings: UserSettings;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  settings,
  isSaved,
  onToggleSave,
  onTagClick,
}) => {
  if (!resource) return null;

  const t = TRANSLATIONS[settings.language];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const desc = resource.description[settings.language] || resource.description.eo;
  const features = resource.features
    ? resource.features[settings.language] || resource.features.eo
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-[#303134] rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{resource.displayUrl}</span>
              <span>•</span>
              <span className="capitalize">{t.categories[resource.category]}</span>
            </div>
            <h2 id="detail-title" className="text-xl font-bold text-gray-900 dark:text-white">
              {resource.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
            aria-label={t.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {t.levels[resource.level]}
            </span>

            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {t.formats[resource.format]}
            </span>

            {resource.isFree && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300 border border-green-200 dark:border-green-800">
                {t.freeBadge}
              </span>
            )}

            {resource.featured && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t.featuredBadge}
              </span>
            )}
          </div>

          {/* Level description note */}
          <div className="text-xs p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200">
            <strong>{t.levels[resource.level]}:</strong> {t.levelDescriptions[resource.level]}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
              {t.detailDescriptionTitle}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Feature Highlights */}
          {features && features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                {t.detailFeaturesTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author & Year info */}
          {(resource.author || resource.year) && (
            <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              {resource.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{resource.author}</span>
                </div>
              )}
              {resource.year && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{resource.year}</span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onTagClick(tag);
                      onClose();
                    }}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(resource.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                isSaved
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 fill-current" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? t.removeFromFavorites : t.saveToFavorites}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? t.linkCopied : t.copyLink}</span>
            </button>
          </div>

          <a
            href={resource.url}
            target={settings.openInNewTab ? '_blank' : '_self'}
            rel="noreferrer"
            className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>{t.visitSite}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
