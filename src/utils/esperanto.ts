/**
 * Esperanto language utilities:
 * - X-System conversion (cx -> ĉ, etc.)
 * - Accent folding and normalized matching
 * - Multilingual keyword associations
 */

const X_MAP: Record<string, string> = {
  cx: 'ĉ',
  gx: 'ĝ',
  hx: 'ĥ',
  jx: 'ĵ',
  sx: 'ŝ',
  ux: 'ŭ',
  Cx: 'Ĉ',
  Gx: 'Ĝ',
  Hx: 'Ĥ',
  Jx: 'Ĵ',
  Sx: 'Ŝ',
  Ux: 'Ŭ',
  CX: 'Ĉ',
  GX: 'Ĝ',
  HX: 'Ĥ',
  JX: 'Ĵ',
  SX: 'Ŝ',
  UX: 'Ŭ',
};

/**
 * Converts x-sistemo notation to proper Esperanto diacritics
 * e.g. "gxiras kaj sxatas" -> "ĝiras kaj ŝatas"
 */
export function convertXSystem(text: string): string {
  if (!text) return '';
  return text.replace(/[cghjsuCGHJSU][xX]/g, (match) => {
    return X_MAP[match] || match;
  });
}

/**
 * Normalizes text for lenient searching (lowercased, accents folded)
 * Allows searching "vocxo", "voĉo", "voco" to all match
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  
  // First convert x-system to unicode
  let normalized = convertXSystem(text.toLowerCase());
  
  // Fold Esperanto characters and general accents for tolerant matching
  normalized = normalized
    .replace(/[ĉc]/g, 'c')
    .replace(/[ĝg]/g, 'g')
    .replace(/[ĥh]/g, 'h')
    .replace(/[ĵj]/g, 'j')
    .replace(/[ŝs]/g, 's')
    .replace(/[ŭu]/g, 'u')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // strip remaining diacritics (á, é, ñ, etc.)
    
  return normalized.trim();
}

/**
 * Multilingual search synonym hints
 */
export const MULTILINGUAL_SYNONYMS: Record<string, string[]> = {
  // Courses / Learning
  'curso': ['kurso', 'lerni', 'duolingo', 'lernu'],
  'cursos': ['kurso', 'kursoj', 'lerni', 'edukado'],
  'aprender': ['lerni', 'studado', 'komencanto', 'kurso'],
  'principiante': ['komencanto', 'a1', 'a2', 'elementa'],
  'beginner': ['komencanto', 'a1', 'a2', 'learn'],
  'learn': ['lerni', 'kurso', 'studado'],
  'course': ['kurso', 'lernu', 'instruado'],
  'courses': ['kursoj', 'lernu', 'edukado'],
  
  // Dictionary / Vocabulary
  'diccionario': ['vortaro', 'piv', 'revo', 'tradukilo'],
  'vocabulario': ['vortprovizo', 'vortaro', 'vortoj'],
  'dictionary': ['vortaro', 'piv', 'revo', 'tatoeba'],
  'vocabulary': ['vortoj', 'vortaro', 'radikoj'],
  
  // Grammar
  'gramatica': ['gramatiko', 'pmeg', 'akuzativo', 'reguloj'],
  'grammar': ['gramatiko', 'pmeg', 'rules', 'akuzativo'],
  
  // News / Periodicals
  'noticias': ['novajoj', 'revuo', 'gazeto', 'folio'],
  'periodico': ['gazeto', 'revuo', 'monato'],
  'news': ['novajoj', 'revuo', 'monato', 'folio'],
  
  // Literature / Books
  'libros': ['libroj', 'literaturo', 'gutenberg', 'bitlibroj'],
  'lectura': ['legado', 'rakontoj', 'literaturo'],
  'books': ['libroj', 'literaturo', 'reading'],
  'reading': ['legado', 'libroj', 'rakontoj'],
  
  // Media / Podcasts
  'podcast': ['podkasto', 'retradio', 'audvida', 'kernpunkto'],
  'podcasts': ['podkastoj', 'retradio', 'kernpunkto'],
  'musica': ['muziko', 'kantoj', 'vinilkosmo'],
  'music': ['muziko', 'kantoj', 'songs'],
  'videos': ['videoj', 'tubaro', 'youtube', 'filmoj'],
  'video': ['video', 'tubaro', 'youtube'],
  
  // Community / Events
  'comunidad': ['komunumo', 'kongreso', 'renkontigo', 'telegram'],
  'community': ['komunumo', 'events', 'renkontigoj', 'discord'],
  'eventos': ['eventoj', 'kongreso', 'renkontigo', 'kalendaro'],
  'events': ['eventoj', 'renkontigoj', 'calendar', 'pasporta'],
  'viajar': ['pasporta servo', 'vojaĝi', 'gastoj'],
  'travel': ['pasporta servo', 'vojagi', 'hosts'],
};

/**
 * Expands search tokens with synonyms across languages
 */
export function getExpandedTokens(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const tokenSet = new Set<string>();

  words.forEach(word => {
    tokenSet.add(word);
    tokenSet.add(convertXSystem(word));
    tokenSet.add(normalizeText(word));
    
    // Check synonyms
    const cleanWord = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (MULTILINGUAL_SYNONYMS[cleanWord]) {
      MULTILINGUAL_SYNONYMS[cleanWord].forEach(syn => {
        tokenSet.add(syn);
        tokenSet.add(normalizeText(syn));
      });
    }
  });

  return Array.from(tokenSet);
}
