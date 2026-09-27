/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Monitor, 
  Sparkles, 
  Check, 
  RotateCcw,
  Sliders,
  Eye
} from 'lucide-react';
import { UserSettings, Language, Level } from '../types';
import { TRANSLATIONS } from '../translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSaveSettings: (newSettings: UserSettings) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[settings.language];
  const [current, setCurrent] = useState<UserSettings>({ ...settings });
  const [savedAlert, setSavedAlert] = useState(false);

  const handleChange = <K extends keyof UserSettings>(key: K, val: UserSettings[K]) => {
    setCurrent((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    onSaveSettings(current);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 800);
  };

  const levelsList: Level[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white dark:bg-[#303134] rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h2 id="settings-dialog-title" className="text-base font-bold text-gray-900 dark:text-white">
                {t.settingsTitle}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.settingsSubtitle}
              </p>
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

        {/* Settings Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          
          {/* Section 1: Interface Language */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {t.interfaceLanguage}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleChange('language', 'eo')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  current.language === 'eo'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Esperanto
              </button>
              <button
                type="button"
                onClick={() => handleChange('language', 'es')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  current.language === 'es'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Español
              </button>
              <button
                type="button"
                onClick={() => handleChange('language', 'en')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  current.language === 'en'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Section 2: Auto X-System Transliteration */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                {t.autoXSystemTitle}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t.autoXSystemDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={current.autoXSystem}
                onChange={(e) => handleChange('autoXSystem', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Section 3: Theme */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
              {t.themeTitle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleChange('theme', 'light')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  current.theme === 'light'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{t.lightMode}</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange('theme', 'dark')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  current.theme === 'dark'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{t.darkMode}</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange('theme', 'system')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                  current.theme === 'system'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{t.systemMode}</span>
              </button>
            </div>
          </div>

          {/* Section 4: High Contrast Accessibility */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t.highContrastTitle}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t.highContrastDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={current.highContrast}
                onChange={(e) => handleChange('highContrast', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Section 5: Open Links in New Tab */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                {t.openLinksNewTabTitle}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t.openLinksNewTabDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={current.openInNewTab}
                onChange={(e) => handleChange('openInNewTab', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Section 6: Default Search Level */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t.defaultLevelTitle}
            </label>
            <select
              value={current.defaultLevel}
              onChange={(e) => handleChange('defaultLevel', e.target.value as Level)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-[#202124] border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {levelsList.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {t.levels[lvl]}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetDefaults}
            className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.resetDefaults}
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
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              {savedAlert ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  {t.settingsSaved}
                </>
              ) : (
                t.saveSettings
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
