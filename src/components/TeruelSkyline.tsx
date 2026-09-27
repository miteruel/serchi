/*
  Copyright (C) 2026 Antonio Alcázar Ruiz (MiTeruel) <mrgarciagarcia@gmail.com>
  Part of the PluTony project. Licensed under the GNU GPL v3.0 or later;
  see LICENSE for the full text.
 */

import React from 'react';

/**
 * View of Teruel for the home page: old town houses, El Torico under the star of
 * the city's coat of arms (also the green Esperanto star), a Mudejar tower with
 * green and white ceramic bands, and the ochre hills. Colours follow the app's
 * light/dark theme through Tailwind classes.
 * Generated from the same drawing as delphi/templates/_teruel.html and the standalone pages in public/; keep them in sync.
 */
export const TeruelSkyline: React.FC<{ label: string; className?: string }> = ({ label, className }) => (
  <svg viewBox="0 0 640 220" role="img" aria-label={label} className={className}>
        <path d="M0 176 Q70 136 150 160 T300 150 T470 146 T640 162 V220 H0 Z" className="fill-[#e3c99a] dark:fill-[#4a3f2a]" />
        <circle cx={92} cy={54} r={26} className="fill-emerald-100 dark:fill-emerald-900/50" />
        <polygon points="92,32 98.5,48 115,48.5 102,59 106.5,75 92,66 77.5,75 82,59 69,48.5 85.5,48" className="fill-emerald-700 dark:fill-emerald-400" />
        <rect x={30} y={150} width={46} height={52} className="fill-[#efe3cf] dark:fill-[#4a4034]" />
        <polygon points="26,152 53,134 80,152" className="fill-[#8a3f22] dark:fill-[#b0603c]" />
        <rect x={40} y={164} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={58} y={164} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={80} y={160} width={40} height={42} className="fill-[#e4d3b6] dark:fill-[#3d352b]" />
        <polygon points="76,162 100,146 124,162" className="fill-[#8a3f22] dark:fill-[#b0603c]" />
        <rect x={94} y={176} width={12} height={26} rx={6} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={124} y={142} width={52} height={60} className="fill-[#efe3cf] dark:fill-[#4a4034]" />
        <polygon points="120,144 150,124 180,144" className="fill-[#8a3f22] dark:fill-[#b0603c]" />
        <rect x={134} y={156} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={156} y={156} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={134} y={178} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={156} y={178} width={9} height={12} className="fill-[#6b4a33] dark:fill-[#1a1511]" />
        <rect x={232} y={186} width={36} height={16} rx={2} className="fill-[#b9b3a6] dark:fill-[#7d776c]" />
        <rect x={245} y={126} width={10} height={60} className="fill-[#b9b3a6] dark:fill-[#7d776c]" />
        <rect x={240} y={121} width={20} height={6} rx={1} className="fill-[#b9b3a6] dark:fill-[#7d776c]" />
        <path d="M238 114 q1 -9 11 -9 h6 q5 0 7 4 l3 3 q1 3 -2 3 h-3 q-2 2 -5 2 h-10 q-6 0 -7 -3 z" className="fill-gray-900 dark:fill-gray-100" />
        <path d="M258 105 q-1 -5 3 -6 M262 106 q3 -4 7 -3" fill="none" strokeWidth={1.8} strokeLinecap="round" className="stroke-gray-900 dark:stroke-gray-100" />
        <path d="M238 110 q-4 1 -5 6" fill="none" strokeWidth={1.6} strokeLinecap="round" className="stroke-gray-900 dark:stroke-gray-100" />
        <path d="M242 116 v5 M246 117 v4 M253 117 v4 M257 116 v5" fill="none" strokeWidth={2.2} strokeLinecap="round" className="stroke-gray-900 dark:stroke-gray-100" />
        <polygon points="250,82 253.5,91 263,91 255.5,96.5 258.5,105.5 250,100 241.5,105.5 244.5,96.5 237,91 246.5,91" className="fill-emerald-700 dark:fill-emerald-400" />
        <rect x={380} y={74} width={62} height={128} className="fill-[#9c4a2a] dark:fill-[#b86a45]" />
        <rect x={380} y={86} width={62} height={7} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={386.0} cy={100} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={392.3} cy={100} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={398.6} cy={100} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={404.9} cy={100} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={411.2} cy={100} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={417.5} cy={100} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={423.8} cy={100} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={430.1} cy={100} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={436.4} cy={100} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <path d="M392 134 v-18 a8 8 0 0 1 16 0 v18 z M414 134 v-18 a8 8 0 0 1 16 0 v18 z" className="fill-[#231c17]" />
        <path d="M382 150 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6" fill="none" strokeWidth={2} className="stroke-white dark:stroke-gray-200" />
        <circle cx={386.0} cy={160} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={392.3} cy={160} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={398.6} cy={160} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={404.9} cy={160} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={411.2} cy={160} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={417.5} cy={160} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={423.8} cy={160} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={430.1} cy={160} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={436.4} cy={160} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <rect x={380} y={168} width={62} height={6} className="fill-emerald-700 dark:fill-emerald-400" />
        <path d="M398 202 v-16 a13 13 0 0 1 26 0 v16 z" className="fill-[#231c17]" />
        <rect x={388} y={40} width={46} height={34} className="fill-[#9c4a2a] dark:fill-[#b86a45]" />
        <rect x={388} y={46} width={46} height={5} className="fill-emerald-700 dark:fill-emerald-400" />
        <path d="M402 70 v-11 a4 4 0 0 1 8 0 v11 z M412 70 v-11 a4 4 0 0 1 8 0 v11 z" className="fill-[#231c17]" />
        <polygon points="384,42 411,14 438,42" className="fill-emerald-700 dark:fill-emerald-400" />
        <path d="M411 14 V4" fill="none" strokeWidth={2} className="stroke-gray-900 dark:stroke-gray-100" />
        <rect x={512} y={96} width={46} height={106} className="fill-[#b86a45] dark:fill-[#a85f3e]" />
        <rect x={512} y={108} width={46} height={5} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={517} cy={120} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={523} cy={120} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={529} cy={120} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={535} cy={120} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={541} cy={120} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <circle cx={547} cy={120} r={3} className="fill-white dark:fill-gray-200" />
        <circle cx={553} cy={120} r={3} className="fill-emerald-700 dark:fill-emerald-400" />
        <path d="M524 150 v-14 a6 6 0 0 1 12 0 v14 z M538 150 v-14 a6 6 0 0 1 12 0 v14 z" className="fill-[#231c17]" />
        <polygon points="508,98 535,74 562,98" className="fill-[#8a3f22] dark:fill-[#b0603c]" />
        <rect x={0} y={200} width={640} height={20} className="fill-[#cdb485] dark:fill-[#3d3322]" />
  </svg>
);
