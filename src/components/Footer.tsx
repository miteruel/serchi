import React from 'react';
import { TRANSLATIONS } from '../translations';
import { UserSettings } from '../types';

interface FooterProps {
  settings: UserSettings;
  onOpenSettings: () => void;
  onOpenAdvanced: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenSettings,
  onOpenAdvanced,
}) => {
  const t = TRANSLATIONS[settings.language];

  return (
    <footer className="w-full bg-[#f2f2f2] dark:bg-[#171717] text-gray-500 dark:text-gray-400 text-xs border-t border-gray-200 dark:border-gray-800 transition-colors mt-auto">
      
      {/* Upper footer: Location / Region indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t.footerWorldwide}
          </span>
        </div>
        <span className="flex items-center gap-2 text-[11px] text-gray-400">
          <img src="/logo-liberanimo.jpg" alt="" className="w-5 h-5 rounded object-contain" />
          <span className="font-semibold text-gray-600 dark:text-gray-300">{t.ownerNotice}</span>
          <span>· {t.footerNonProfit}</span>
        </span>
      </div>

      {/* Lower footer: Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="https://esperanto.net"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Esperanto.net
          </a>
          <a
            href="https://eventaservo.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Eventa Servo
          </a>
          <a
            href="https://vortaro.net"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            PIV Vortaro
          </a>
          <a
            href="https://uea.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Universala Esperanto-Asocio
          </a>
        </div>

        {/* Right links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            onClick={onOpenAdvanced}
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {t.advancedSearchTitle}
          </button>
          <button
            onClick={onOpenSettings}
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            {t.settings}
          </button>
          <span className="text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Serĉilo · Liberanimo Teruel
          </span>
        </div>

      </div>
    </footer>
  );
};
