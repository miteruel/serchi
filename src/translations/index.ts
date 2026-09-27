import { Language, Category, Level, Format } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  searchPlaceholder: string;
  searchBtn: string;
  luckyBtn: string;
  availableIn: string;
  quickFilters: string;
  popularSearches: string;
  
  // Navigation / Header
  settings: string;
  savedResources: string;
  savedCount: string;
  clearSaved: string;
  noSavedYet: string;
  aboutTitle: string;
  toolsMenu: string;
  darkMode: string;
  lightMode: string;
  systemMode: string;
  
  // Search Results
  resultsStats: (count: number, seconds: string) => string;
  noResultsTitle: string;
  noResultsDesc: string;
  didYouMean: string;
  filterByLevel: string;
  filterByFormat: string;
  filterFreeOnly: string;
  sortBy: string;
  sortRelevance: string;
  sortAlpha: string;
  sortLevel: string;
  clearFilters: string;
  visitSite: string;
  quickPreview: string;
  copyLink: string;
  linkCopied: string;
  saveToFavorites: string;
  removeFromFavorites: string;
  
  // Advanced Search
  advancedSearchTitle: string;
  advancedSearchDesc: string;
  findPagesWith: string;
  allTheseWords: string;
  exactWordPhrase: string;
  anyTheseWords: string;
  noneTheseWords: string;
  thenNarrowBy: string;
  levelLabel: string;
  categoryLabel: string;
  formatLabel: string;
  licenseLabel: string;
  freeOnlyCheck: string;
  applyAdvancedSearch: string;
  resetFields: string;
  closeModal: string;
  
  // Settings Modal
  settingsTitle: string;
  settingsSubtitle: string;
  interfaceLanguage: string;
  regionalSettings: string;
  autoXSystemTitle: string;
  autoXSystemDesc: string;
  themeTitle: string;
  highContrastTitle: string;
  highContrastDesc: string;
  resultsPerPageTitle: string;
  openLinksNewTabTitle: string;
  openLinksNewTabDesc: string;
  defaultLevelTitle: string;
  saveSettings: string;
  settingsSaved: string;
  resetDefaults: string;
  
  // Categories
  categories: Record<Category, string>;
  
  // Levels
  levels: Record<Level, string>;
  levelDescriptions: Record<Level, string>;
  
  // Formats
  formats: Record<Format, string>;

  // Knowledge Panel
  knowledgeTitle: string;
  moreInfo: string;

  // Accessibility & Hints
  keyboardHint: string;
  screenReaderSearchInput: string;
  openDetails: string;
  featuredBadge: string;
  freeBadge: string;

  // Forum & Community
  communityTab: string;
  searchTab: string;
  forumTitle: string;
  forumTagline: string;
  newTopicBtn: string;
  createTopicTitle: string;
  topicTitlePlaceholder: string;
  topicContentPlaceholder: string;
  topicCategoryLabel: string;
  topicLevelLabel: string;
  topicTagsLabel: string;
  publishTopicBtn: string;
  cancelBtn: string;
  filterByForumCategory: string;
  filterByForumLevel: string;
  searchForumPlaceholder: string;
  noTopicsFound: string;
  noTopicsFoundDesc: string;
  replies: string;
  views: string;
  likes: string;
  pinned: string;
  locked: string;
  moderatorBadge: string;
  teacherBadge: string;
  learnerBadge: string;
  moderatorTools: string;
  modPinAction: string;
  modUnpinAction: string;
  modLockAction: string;
  modUnlockAction: string;
  modDeleteTopic: string;
  modDeleteComment: string;
  replyToTopic: string;
  postReplyBtn: string;
  replyPlaceholder: string;
  topicLockedNotice: string;
  backToTopics: string;
  switchUserRole: string;
  currentRoleLabel: string;
  forumCategories: {
    all: string;
    general: string;
    questions: string;
    grammar: string;
    practice: string;
    resources: string;
    events: string;
  };

  // Add Resource Modal
  addResourceModalTitle: string;
  addResourceModalSubtitle: string;
  tabManualAdd: string;
  tabGoogleCrawler: string;
  urlLabel: string;
  urlHelperText: string;
  urlPlaceholder: string;
  resourceTitleLabel: string;
  resourceTitlePlaceholder: string;
  resourceDescLabel: string;
  resourceDescPlaceholder: string;
  categoryLabelSelect: string;
  levelLabelSelect: string;
  formatLabelSelect: string;
  tagsLabelInput: string;
  tagsPlaceholderInput: string;
  freeResourceCheckbox: string;
  submitAddResourceBtn: string;
  crawlerNoticeText: string;
  crawlerQueryLabel: string;
  crawlerQueryPlaceholder: string;
  startCrawlerBtn: string;
  crawlingProgressText: string;
  alreadyInIndexBadge: string;
  importSelectedBtn: (count: number) => string;
  noCrawledFound: string;
  addSuccessNotice: string;
  urlRequiredNotice: string;
  invalidUrlNotice: string;
  duplicateUrlError: string;
  crawledImportSuccess: (added: number, duplicates: number) => string;

  // Bookmarks Drawer
  exportJsonBtn: string;

  // Resource Detail Modal
  detailDescriptionTitle: string;
  detailFeaturesTitle: string;
  detailTagsTitle: string;

  // Advanced Search Placeholders
  allWordsPlaceholder: string;
  exactPhrasePlaceholder: string;
  anyWordsPlaceholder: string;
  excludeWordsPlaceholder: string;

  // Level Guide
  levelGuideTitle: string;
  levelGuideDesc: string;

  // Search Results Discovery
  wantDiscoverMoreTitle: string;
  wantDiscoverMoreDesc: string;
  searchWebBtn: string;
  addLinkManuallyBtn: string;

  // Header & Footer & Search Home
  addLinkNavBtn: string;
  addLinkNavTitle: string;
  changeLanguageAria: string;
  homeTitleTooltip: string;
  autoXSystemTooltipActive: string;
  autoXSystemTooltipInactive: string;
  clearSearchQueryTitle: string;
  clearSearchQueryAria: string;
  footerWorldwide: string;
  footerNonProfit: string;
  ownerNotice: string;

  // Radio section & online player
  radioSectionTitle: string;
  radioSectionDesc: string;
  radioSeeAll: string;

  // Famous Esperantists section
  peopleSectionTitle: string;
  peopleSectionDesc: string;
  peopleSeeAll: string;
  listenBtn: string;
  nowPlaying: string;
  closePlayer: string;
  latestEpisodes: string;
  loadingEpisodes: string;
  episodesError: string;
  liveBadge: string;

  // Forum Extras
  forumTopicTitleLabel: string;
  forumTopicMessageLabel: string;
  forumTopicTagsPlaceholder: string;
  forumNoRepliesYet: string;
  forumOfficialNote: string;
  forumRepliesHeading: (count: number) => string;
  forumConfirmDeleteTopic: string;
  forumConfirmDeleteComment: string;
  forumRoleLearner: string;
  forumRoleTeacher: string;
  forumRoleModerator: string;
  forumModHelpText: string;
  forumLearnerHelpText: string;
  forumAutoXActiveText: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  eo: {
    appName: 'Serĉilo',
    tagline: 'La libera serĉilo por la Esperanto-mondo',
    searchPlaceholder: 'Serĉu kursojn, projektojn, novaĵojn, vortarojn, librojn...',
    searchBtn: 'Serĉi per Esperanto',
    luckyBtn: 'Mi sentas min bonŝanca',
    availableIn: 'Serĉilo disponeblas ankaŭ en:',
    quickFilters: 'Filtri laŭ lingva nivelo:',
    popularSearches: 'Oftaj serĉoj:',
    
    settings: 'Agordoj',
    savedResources: 'Konservitaj',
    savedCount: 'konservitaj rimedoj',
    clearSaved: 'Vakigi ĉiujn',
    noSavedYet: 'Vi ankoraŭ ne konservis iujn rimedojn. Alklaku la stelon ⭐ sur ajna rezulto por konservi ĝin ĉi tie.',
    aboutTitle: 'Pri Serĉilo',
    toolsMenu: 'Iloj & Ligiloj',
    darkMode: 'Malhela reĝimo',
    lightMode: 'Hela reĝimo',
    systemMode: 'Sistema reĝimo',
    
    resultsStats: (count, seconds) => `Proksimume ${count} rezultoj (${seconds} sekundoj)`,
    noResultsTitle: 'Neniuj rezultoj trovitaj',
    noResultsDesc: 'Provu uzi pli ĝeneralajn vortojn, forigi kelkajn filtrilojn, aŭ serĉi en la hispana aŭ angla.',
    didYouMean: 'Ĉu vi celis:',
    filterByLevel: 'Nivelo',
    filterByFormat: 'Formato',
    filterFreeOnly: 'Nur senpagaj',
    sortBy: 'Ordigi laŭ',
    sortRelevance: 'Plej gravaj',
    sortAlpha: 'Alfabete (A-Z)',
    sortLevel: 'Nivelo (A1 → C1)',
    clearFilters: 'Forigi filtrilojn',
    visitSite: 'Viziti retejon',
    quickPreview: 'Rapida antaŭrigardo',
    copyLink: 'Kopii ligilon',
    linkCopied: 'Ligilo kopiita!',
    saveToFavorites: 'Konservi',
    removeFromFavorites: 'Malkonservi',
    
    advancedSearchTitle: 'Progresinta Serĉo',
    advancedSearchDesc: 'Uzu precizajn regulojn por trovi ĝuste tion, kion vi bezonas.',
    findPagesWith: 'Trovu paĝojn kun...',
    allTheseWords: 'Ĉiuj ĉi tiuj vortoj:',
    exactWordPhrase: 'Tiu ĉi preciza frazo:',
    anyTheseWords: 'Iu ajn el ĉi tiuj vortoj:',
    noneTheseWords: 'Neniu el ĉi tiuj vortoj:',
    thenNarrowBy: 'Poste mallarĝigu laŭ...',
    levelLabel: 'Lingva nivelo:',
    categoryLabel: 'Kategorio:',
    formatLabel: 'Formato:',
    licenseLabel: 'Aliro:',
    freeOnlyCheck: 'Montri nur 100% senpagajn rimedojn',
    applyAdvancedSearch: 'Serĉi nun',
    resetFields: 'Rekomencigi',
    closeModal: 'Fermi',
    
    settingsTitle: 'Agordoj de Serĉilo',
    settingsSubtitle: 'Personecigu vian serĉsperton, lingvon kaj regionan aranĝon.',
    interfaceLanguage: 'Fasada lingvo (Interfaco):',
    regionalSettings: 'Regiona & Lingva Agordo',
    autoXSystemTitle: 'Aŭtomata ikso-sistemo (cx → ĉ):',
    autoXSystemDesc: 'Aŭtomate anstataŭigas cx, gx, hx, jx, sx, ux per la ĝustaj ĉapelitaj literoj dum vi tajpas.',
    themeTitle: 'Aspekto kaj temo:',
    highContrastTitle: 'Alta kontrasto:',
    highContrastDesc: 'Pliigas tekstan kontraston por pli bona alirebleco kaj legeblo.',
    resultsPerPageTitle: 'Rezultoj po paĝo:',
    openLinksNewTabTitle: 'Malfermi ligilojn en nova langeto:',
    openLinksNewTabDesc: 'Konservas viajn serĉrezultojn malfermitaj kiam vi alklakas eksteran ligilon.',
    defaultLevelTitle: 'Implicita serĉnivelo:',
    saveSettings: 'Konservi agordojn',
    settingsSaved: 'Agordoj sukcese konservitaj!',
    resetDefaults: 'Rekomencigi al defaŭltoj',
    
    categories: {
      all: 'Ĉiuj',
      courses: 'Kursoj',
      news: 'Novaĵoj',
      projects: 'Projektoj',
      tools: 'Iloj & Vortaroj',
      literature: 'Literaturo',
      media: 'Aŭdvidaj & Podkastoj',
      community: 'Komunumo & Eventoj',
      radio: "Radio",
      people: "Personoj",
    },
    
    levels: {
      all: 'Ĉiuj niveloj',
      A1: 'A1 - Komencanto',
      A2: 'A2 - Elementa',
      B1: 'B1 - Meza',
      B2: 'B2 - Progresa',
      C1: 'C1/C2 - Sperta',
    },
    levelDescriptions: {
      all: 'Por ĉiuj personoj, sendepende de scinivelo',
      A1: 'Bazaj esprimoj, salutoj kaj simplaj frazoj',
      A2: 'Ĉiutagaj situacioj, facila legado kaj bazaj rakontoj',
      B1: 'Sendependa babilado, podkastoj kaj normaj tekstoj',
      B2: 'Flua komunikado, gazetoj kaj vasta vortoprovizo',
      C1: 'Beletro, faka lingvaĵo kaj profunda verkado',
    },
    
    formats: {
      website: 'Retejo',
      app: 'Poŝtelefona Apo',
      podcast: 'Podkasto / Audio',
      book: 'Libro / Bitlibro',
      video: 'Video / YouTube',
      forum: 'Forumo / Babilejo',
      course: 'Interaga Kurso',
      tool: 'Ilo / Vortaro',
    },

    knowledgeTitle: 'Kona Panelo',
    moreInfo: 'Pliaj informoj en la retejo',

    keyboardHint: 'Premu / por serĉi',
    screenReaderSearchInput: 'Serĉkampo por Esperanto-rimedoj',
    openDetails: 'Vidi detalojn',
    featuredBadge: 'Rekomendata',
    freeBadge: 'Senpaga',

    communityTab: 'Komunumo & Forumo',
    searchTab: 'Serĉilo',
    forumTitle: 'Esperanto-Forumo',
    forumTagline: 'Diskutejo, demandoj, gramatika helpo kaj amikeco por ĉiuj lernniveloj',
    newTopicBtn: 'Krei novan temon',
    createTopicTitle: 'Nova Diskut-Temo',
    topicTitlePlaceholder: 'Klara titolo por via temo aŭ demando...',
    topicContentPlaceholder: 'Skribu vian mesaĝon ĉi tie. Vi povas uzi Esperanton, la hispanan aŭ la anglan...',
    topicCategoryLabel: 'Kategorio',
    topicLevelLabel: 'Nivelo rekomendata',
    topicTagsLabel: 'Etikedoj (apartigitaj per komoj)',
    publishTopicBtn: 'Publikigi temon',
    cancelBtn: 'Nuligi',
    filterByForumCategory: 'Kategorio',
    filterByForumLevel: 'Nivelo',
    searchForumPlaceholder: 'Serĉi en forumaj temoj, demandoj kaj komentoj...',
    noTopicsFound: 'Neniuj temoj trovitaj',
    noTopicsFoundDesc: 'Provu alian serĉvorton aŭ kreu novan temon por komenci diskuton!',
    replies: 'respondoj',
    views: 'vidoj',
    likes: 'ŝatoj',
    pinned: 'Alpinglita',
    locked: 'Ŝlosita',
    moderatorBadge: 'Moderanto',
    teacherBadge: 'Instruisto',
    learnerBadge: 'Lernanto',
    moderatorTools: 'Iloj de Moderanto',
    modPinAction: 'Alpingli',
    modUnpinAction: 'Malfiksi',
    modLockAction: 'Ŝlosi temon',
    modUnlockAction: 'Malŝlosi temon',
    modDeleteTopic: 'Forigi temon',
    modDeleteComment: 'Forigi komenton',
    replyToTopic: 'Respondi al ĉi tiu temo',
    postReplyBtn: 'Sendi respondon',
    replyPlaceholder: 'Skribu vian respondon aŭ komenton ĉi tie...',
    topicLockedNotice: 'Ĉi tiu temo estas ŝlosita fare de moderanto. Novaj respondoj estas malŝaltitaj.',
    backToTopics: 'Reiri al ĉiuj temoj',
    switchUserRole: 'Ŝanĝi uzant-rolon (Simulado):',
    currentRoleLabel: 'Aktuala profilo',
    forumCategories: {
      all: 'Ĉiuj kategorioj',
      general: 'Ĝenerala & Prezentoj',
      questions: 'Demandoj & Respondoj',
      grammar: 'Gramatiko & Duboj',
      practice: 'Praktiko & Parolado',
      resources: 'Rimedoj & Libroj',
      events: 'Eventoj & Renkontiĝoj',
    },

    // Add Resource Modal
    addResourceModalTitle: 'Aldoni Novajn Ligojn al Serĉilo',
    addResourceModalSubtitle: 'Nutru la serĉilon per novaj retejoj, aŭ trovu rektajn ligojn per Google Search sen duoblaĵoj.',
    tabManualAdd: 'Mane aldoni ligon',
    tabGoogleCrawler: 'Rekta Google Search (Aŭtomata malkovro)',
    urlLabel: 'URL de la retejo *',
    urlHelperText: 'La sistemo aŭtomate kontrolas ĉu la adreso jam ekzistas por eviti ripetojn.',
    urlPlaceholder: 'https://ekzemplo.esperanto.org',
    resourceTitleLabel: 'Titolo de la rimedo *',
    resourceTitlePlaceholder: 'ekz. Nova podkasto de junuloj',
    resourceDescLabel: 'Priskribo de la rimedo *',
    resourceDescPlaceholder: 'Kion ofertas ĉi tiu retejo aŭ projekto? Por kiu ĝi taŭgas?',
    categoryLabelSelect: 'Kategorio',
    levelLabelSelect: 'Nivelo rekomendata',
    formatLabelSelect: 'Formato de la enhavo',
    tagsLabelInput: 'Etikedoj (apartigitaj per komoj)',
    tagsPlaceholderInput: 'ekz. podkasto, muziko, gramatiko, junularo',
    freeResourceCheckbox: 'Ĉi tiu rimedo estas tute senpaga',
    submitAddResourceBtn: 'Aldoni al la Indekso',
    crawlerNoticeText: 'Ĉi tiu ilo konektiĝas al Google Search en reala tempo por malkovri aŭtentikajn retejojn, kursojn, librojn kaj artikolojn. Ĉiu ligo estas komparata kontraŭ la ekzistanta datumbazo por malhelpi duoblaĵojn.',
    crawlerQueryLabel: 'Temo por serĉi en Google',
    crawlerQueryPlaceholder: 'ekz. novaj podkastoj en esperanto 2026, kursoj por hispanlingvanoj...',
    startCrawlerBtn: 'Esplori per Google Search',
    crawlingProgressText: 'Rastante la reton per Google Search...',
    alreadyInIndexBadge: 'Jam en la indekso (duoblaĵo)',
    importSelectedBtn: (count) => `Importi elektitajn ligojn (${count})`,
    noCrawledFound: 'Neniuj novaj ligoj trovitaj por ĉi tiu serĉo.',
    addSuccessNotice: 'Ligo sukcese aldonita al la indekso sen duoblaĵoj!',
    urlRequiredNotice: 'Bonvolu plenigi la URL, titolon kaj priskribon.',
    invalidUrlNotice: 'Nevalida URL (ekz. devas komenciĝi per https://).',
    duplicateUrlError: 'Ĉi tiu ligo jam ekzistas en la indekso (duoblaĵo evitita).',
    crawledImportSuccess: (added, duplicates) => `${added} novaj ligoj sukcese aldonitaj al Serĉilo! (${duplicates} duoblaĵoj ignoritaj).`,

    // Bookmarks Drawer
    exportJsonBtn: 'Eksporti (JSON)',

    // Resource Detail Modal
    detailDescriptionTitle: 'Priskribo',
    detailFeaturesTitle: 'Ĉefaj Trajtoj',
    detailTagsTitle: 'Etikedoj (klaku por serĉi)',

    // Advanced Search Placeholders
    allWordsPlaceholder: 'ekz. kurso reta komencanto',
    exactPhrasePlaceholder: 'ekz. Plena Ilustrita Vortaro',
    anyWordsPlaceholder: 'ekz. podkasto radio muziko',
    excludeWordsPlaceholder: 'ekz. libro aĉeto',

    // Level Guide
    levelGuideTitle: 'Gvidilo pri Lingvaj Niveloj',
    levelGuideDesc: 'Trovu la perfektajn rimedojn laŭ via nuna scipovo de Esperanto (KER-sistemo):',

    // Search Results Discovery
    wantDiscoverMoreTitle: 'Ĉu vi volas malkovri pliajn ligojn en la reto?',
    wantDiscoverMoreDesc: 'Uzu la rektan serĉilon Google Search por aŭtomate trovi kaj aldoni novajn fontojn sen duoblaĵoj.',
    searchWebBtn: 'Serĉi en la reto',
    addLinkManuallyBtn: 'Aldoni ligon permane',

    // Header & Footer & Search Home
    addLinkNavBtn: 'Aldoni Ligon',
    addLinkNavTitle: 'Aldoni novan ligon / Rekta Google Search',
    changeLanguageAria: 'Ŝanĝi lingvon',
    homeTitleTooltip: 'Serĉilo Hejmo',
    autoXSystemTooltipActive: 'Aŭtomata ikso-sistemo aktiva (cx → ĉ)',
    autoXSystemTooltipInactive: 'Ikso-sistemo malaktiva',
    clearSearchQueryTitle: 'Vakigi',
    clearSearchQueryAria: 'Vakigi tekston',
    footerWorldwide: 'Tutmonda Esperantujo (Mondo)',
    footerNonProfit: 'Senprofita & Malferma',
    ownerNotice: 'Retejo de Liberanimo Teruel',
    radioSectionTitle: "Radio en Esperanto",
    radioSectionDesc: "Aŭskultu rekte staciojn kaj elsendojn en Esperanto el la tuta mondo.",
    radioSeeAll: "Ĉiuj radiostacioj",
    peopleSectionTitle: "Famaj esperantistoj",
    peopleSectionDesc: "Verkistoj, sciencistoj kaj aktivuloj kiuj parolis kaj uzis Esperanton.",
    peopleSeeAll: "Ĉiuj personoj",
    listenBtn: "Aŭskulti",
    nowPlaying: "Nun ludas",
    closePlayer: "Fermi ludilon",
    latestEpisodes: "Lastaj elsendoj",
    loadingEpisodes: "Ŝargante elsendojn…",
    episodesError: "Ne eblis ŝargi la elsendojn. Provu la retejon de la stacio.",
    liveBadge: "Rekte",

    // Forum Extras
    forumTopicTitleLabel: 'Titolo',
    forumTopicMessageLabel: 'Mesaĝo',
    forumTopicTagsPlaceholder: 'ekz. gramatiko, akuzativo, komencanto',
    forumNoRepliesYet: 'Ankoraŭ ne estas respondoj. Estu la unua kiu respondas!',
    forumOfficialNote: 'Oficiala Noto de Moderanto',
    forumRepliesHeading: (count) => `Respondoj (${count})`,
    forumConfirmDeleteTopic: 'Ĉu vi certas ke vi volas forigi ĉi tiun temon?',
    forumConfirmDeleteComment: 'Ĉu vi certas ke vi volas forigi ĉi tiun komenton?',
    forumRoleLearner: 'Lernanto',
    forumRoleTeacher: 'Instruisto',
    forumRoleModerator: 'Moderanto',
    forumModHelpText: '★ Vi havas plenajn rajtojn por moderigi, alpingli, ŝlosi aŭ forigi mesaĝojn.',
    forumLearnerHelpText: 'Partoprenu en diskutoj, demandu gramatikajn dubojn kaj amikiĝu kun aliaj lernantoj.',
    forumAutoXActiveText: 'Ikso-sistemo (cx → ĉ) estas aktiva',
  },

  es: {
    appName: 'Serĉilo',
    tagline: 'El buscador libre para el mundo del esperanto',
    searchPlaceholder: 'Busca cursos, proyectos, noticias, diccionarios, libros...',
    searchBtn: 'Buscar en Esperanto',
    luckyBtn: 'Voy a tener suerte',
    availableIn: 'Serĉilo disponible también en:',
    quickFilters: 'Filtrar por nivel lingüístico:',
    popularSearches: 'Búsquedas habituales:',
    
    settings: 'Configuración',
    savedResources: 'Guardados',
    savedCount: 'recursos guardados',
    clearSaved: 'Borrar todos',
    noSavedYet: 'Aún no has guardado ningún recurso. Pulsa la estrella ⭐ en cualquier resultado para guardarlo aquí.',
    aboutTitle: 'Acerca de Serĉilo',
    toolsMenu: 'Herramientas y Enlaces',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    systemMode: 'Modo del sistema',
    
    resultsStats: (count, seconds) => `Aproximadamente ${count} resultados (${seconds} segundos)`,
    noResultsTitle: 'No se encontraron resultados',
    noResultsDesc: 'Prueba términos más generales, elimina filtros o busca en esperanto o inglés.',
    didYouMean: 'Quizás quisiste decir:',
    filterByLevel: 'Nivel',
    filterByFormat: 'Formato',
    filterFreeOnly: 'Solo gratis',
    sortBy: 'Ordenar por',
    sortRelevance: 'Más relevantes',
    sortAlpha: 'Alfabético (A-Z)',
    sortLevel: 'Nivel (A1 → C1)',
    clearFilters: 'Borrar filtros',
    visitSite: 'Visitar sitio web',
    quickPreview: 'Vista previa rápida',
    copyLink: 'Copiar enlace',
    linkCopied: '¡Enlace copiado!',
    saveToFavorites: 'Guardar',
    removeFromFavorites: 'Quitar',
    
    advancedSearchTitle: 'Búsqueda Avanzada',
    advancedSearchDesc: 'Usa filtros y operadores específicos para encontrar exactamente lo que necesitas.',
    findPagesWith: 'Buscar páginas que contengan...',
    allTheseWords: 'Todas estas palabras:',
    exactWordPhrase: 'Esta frase exacta:',
    anyTheseWords: 'Cualquiera de estas palabras:',
    noneTheseWords: 'Ninguna de estas palabras:',
    thenNarrowBy: 'Luego acotar por...',
    levelLabel: 'Nivel lingüístico:',
    categoryLabel: 'Categoría:',
    formatLabel: 'Formato:',
    licenseLabel: 'Acceso:',
    freeOnlyCheck: 'Mostrar solo recursos 100% gratuitos',
    applyAdvancedSearch: 'Buscar ahora',
    resetFields: 'Restablecer',
    closeModal: 'Cerrar',
    
    settingsTitle: 'Configuración de Serĉilo',
    settingsSubtitle: 'Personaliza tu experiencia de búsqueda, idioma y preferencias regionales.',
    interfaceLanguage: 'Idioma de la interfaz:',
    regionalSettings: 'Ajustes regionales y lingüísticos',
    autoXSystemTitle: 'Conversión automática de sistema X (cx → ĉ):',
    autoXSystemDesc: 'Reemplaza al teclear cx, gx, hx, jx, sx, ux por las letras con acento circunflejo correspondientes.',
    themeTitle: 'Aspecto y tema visual:',
    highContrastTitle: 'Alto contraste:',
    highContrastDesc: 'Mejora el contraste tipográfico para mayor accesibilidad visual.',
    resultsPerPageTitle: 'Resultados por página:',
    openLinksNewTabTitle: 'Abrir enlaces en nueva pestaña:',
    openLinksNewTabDesc: 'Mantiene abierta tu página de búsqueda al hacer clic en un enlace externo.',
    defaultLevelTitle: 'Nivel de búsqueda predeterminado:',
    saveSettings: 'Guardar cambios',
    settingsSaved: '¡Configuración guardada correctamente!',
    resetDefaults: 'Restaurar valores predeterminados',
    
    categories: {
      all: 'Todo',
      courses: 'Cursos',
      news: 'Noticias',
      projects: 'Projektoj',
      tools: 'Herramientas y Diccionarios',
      literature: 'Literatura',
      media: 'Audio, Vídeo y Podcasts',
      community: 'Comunidad y Eventos',
      radio: "Radio",
      people: "Personas",
    },
    
    levels: {
      all: 'Todos los niveles',
      A1: 'A1 - Principiante',
      A2: 'A2 - Básico / Elemental',
      B1: 'B1 - Intermedio',
      B2: 'B2 - Intermedio Alto',
      C1: 'C1/C2 - Avanzado / Fluido',
    },
    levelDescriptions: {
      all: 'Apto para cualquier persona, sin importar su nivel de conocimientos',
      A1: 'Frases básicas, saludos y vocabulario introductorio',
      A2: 'Conversación elemental, lecturas sencillas con vocabulario graduado',
      B1: 'Autonomía conversacional, pódcasts claros y textos cotidianos',
      B2: 'Fluidez amplia, noticias internacionales y vocabulario rico',
      C1: 'Literatura culta, tecnicismos y ensayos profundos',
    },
    
    formats: {
      website: 'Sitio Web',
      app: 'App Móvil',
      podcast: 'Pódcast / Audio',
      book: 'Libro / eBook',
      video: 'Vídeo / YouTube',
      forum: 'Foro / Chat',
      course: 'Curso Interactivo',
      tool: 'Herramienta / Diccionario',
    },

    knowledgeTitle: 'Panel de Información',
    moreInfo: 'Más información en la web',

    keyboardHint: 'Pulsa / para buscar',
    screenReaderSearchInput: 'Campo de búsqueda de recursos de esperanto',
    openDetails: 'Ver detalles',
    featuredBadge: 'Destacado',
    freeBadge: 'Gratis',

    communityTab: 'Comunidad y Foro',
    searchTab: 'Buscador',
    forumTitle: 'Foro de Esperanto',
    forumTagline: 'Punto de encuentro, resolución de dudas, práctica y apoyo para todos los niveles',
    newTopicBtn: 'Crear nuevo tema',
    createTopicTitle: 'Nuevo Tema de Discusión',
    topicTitlePlaceholder: 'Título claro para tu tema o pregunta...',
    topicContentPlaceholder: 'Escribe tu mensaje aquí. Puedes usar esperanto, español o inglés...',
    topicCategoryLabel: 'Categoría',
    topicLevelLabel: 'Nivel recomendado',
    topicTagsLabel: 'Etiquetas (separadas por comas)',
    publishTopicBtn: 'Publicar tema',
    cancelBtn: 'Cancelar',
    filterByForumCategory: 'Categoría',
    filterByForumLevel: 'Nivel',
    searchForumPlaceholder: 'Buscar en temas del foro, preguntas y respuestas...',
    noTopicsFound: 'No se encontraron temas',
    noTopicsFoundDesc: 'Prueba con otros términos o crea un nuevo tema para iniciar el debate.',
    replies: 'respuestas',
    views: 'visitas',
    likes: 'me gusta',
    pinned: 'Fijado',
    locked: 'Cerrado',
    moderatorBadge: 'Moderador',
    teacherBadge: 'Profesor',
    learnerBadge: 'Estudiante',
    moderatorTools: 'Herramientas de Moderador',
    modPinAction: 'Fijar tema',
    modUnpinAction: 'Desfijar tema',
    modLockAction: 'Cerrar respuestas',
    modUnlockAction: 'Abrir respuestas',
    modDeleteTopic: 'Eliminar tema',
    modDeleteComment: 'Eliminar comentario',
    replyToTopic: 'Responder a este tema',
    postReplyBtn: 'Publicar respuesta',
    replyPlaceholder: 'Escribe tu respuesta o comentario aquí...',
    topicLockedNotice: 'Este tema ha sido cerrado por moderación. Las respuestas están deshabilitadas.',
    backToTopics: 'Volver a todos los temas',
    switchUserRole: 'Cambiar rol de usuario (Simulación):',
    currentRoleLabel: 'Perfil actual',
    forumCategories: {
      all: 'Todas las categorías',
      general: 'General y Presentaciones',
      questions: 'Preguntas y Respuestas',
      grammar: 'Gramática y Dudas',
      practice: 'Práctica y Conversación',
      resources: 'Recursos y Libros',
      events: 'Eventos y Encuentros',
    },

    // Add Resource Modal
    addResourceModalTitle: 'Añadir Nuevos Enlaces a Serĉilo',
    addResourceModalSubtitle: 'Nutre el buscador con nuevos sitios web o descubre enlaces en tiempo real con Google Search sin duplicados.',
    tabManualAdd: 'Añadir enlace manualmente',
    tabGoogleCrawler: 'Google Search en vivo (Descubrimiento automático)',
    urlLabel: 'URL del sitio web *',
    urlHelperText: 'El sistema comprueba automáticamente si la dirección ya existe para evitar repeticiones.',
    urlPlaceholder: 'https://ejemplo.esperanto.org',
    resourceTitleLabel: 'Título del recurso *',
    resourceTitlePlaceholder: 'ej. Nuevo podcast juvenil de esperanto',
    resourceDescLabel: 'Descripción del recurso *',
    resourceDescPlaceholder: '¿Qué ofrece este sitio web o proyecto? ¿Para quién es adecuado?',
    categoryLabelSelect: 'Categoría',
    levelLabelSelect: 'Nivel recomendado',
    formatLabelSelect: 'Formato del contenido',
    tagsLabelInput: 'Etiquetas (separadas por comas)',
    tagsPlaceholderInput: 'ej. podcast, musica, gramatica, principiante',
    freeResourceCheckbox: 'Este recurso es completamente gratuito',
    submitAddResourceBtn: 'Añadir al Índice',
    crawlerNoticeText: 'Esta herramienta se conecta a Google Search en tiempo real para descubrir sitios web auténticos, cursos, libros y artículos. Cada enlace se compara con la base de datos existente para evitar duplicados.',
    crawlerQueryLabel: 'Tema a buscar en Google',
    crawlerQueryPlaceholder: 'ej. nuevos podcasts en esperanto 2026, cursos para hispanohablantes...',
    startCrawlerBtn: 'Explorar con Google Search',
    crawlingProgressText: 'Rastreando la web con Google Search...',
    alreadyInIndexBadge: 'Ya en el índice (duplicado)',
    importSelectedBtn: (count) => `Importar enlaces seleccionados (${count})`,
    noCrawledFound: 'No se encontraron nuevos enlaces para esta búsqueda.',
    addSuccessNotice: '¡Enlace añadido con éxito al índice sin duplicados!',
    urlRequiredNotice: 'Por favor, completa la URL, el título y la descripción.',
    invalidUrlNotice: 'URL no válida (debe comenzar por https:// o http://).',
    duplicateUrlError: 'Este enlace ya existe en el índice (duplicado evitado).',
    crawledImportSuccess: (added, duplicates) => `¡${added} enlaces nuevos añadidos a Serĉilo! (${duplicates} duplicados ignorados).`,

    // Bookmarks Drawer
    exportJsonBtn: 'Exportar (JSON)',

    // Resource Detail Modal
    detailDescriptionTitle: 'Descripción',
    detailFeaturesTitle: 'Características Principales',
    detailTagsTitle: 'Etiquetas (pulsa para buscar)',

    // Advanced Search Placeholders
    allWordsPlaceholder: 'ej. curso online principiante',
    exactPhrasePlaceholder: 'ej. Plena Ilustrita Vortaro',
    anyWordsPlaceholder: 'ej. podcast radio musica',
    excludeWordsPlaceholder: 'ej. libro compra tienda',

    // Level Guide
    levelGuideTitle: 'Guía de Niveles Lingüísticos',
    levelGuideDesc: 'Encuentra los recursos perfectos según tu dominio actual del esperanto (Marco Europeo KER):',

    // Search Results Discovery
    wantDiscoverMoreTitle: '¿Quieres descubrir más enlaces en la web?',
    wantDiscoverMoreDesc: 'Usa el buscador en tiempo real con Google Search para encontrar nuevos sitios web e incorporarlos sin duplicados.',
    searchWebBtn: 'Buscar en la web',
    addLinkManuallyBtn: 'Añadir enlace manualmente',

    // Header & Footer & Search Home
    addLinkNavBtn: 'Añadir Enlace',
    addLinkNavTitle: 'Añadir nuevo enlace / Búsqueda en vivo en Google',
    changeLanguageAria: 'Cambiar idioma',
    homeTitleTooltip: 'Inicio de Serĉilo',
    autoXSystemTooltipActive: 'Sistema X automático activo (cx → ĉ)',
    autoXSystemTooltipInactive: 'Sistema X inactivo',
    clearSearchQueryTitle: 'Borrar',
    clearSearchQueryAria: 'Borrar texto de búsqueda',
    footerWorldwide: 'Comunidad Mundial del Esperanto (Mundial)',
    footerNonProfit: 'Sin ánimo de lucro y de código abierto',
    ownerNotice: 'Web de Liberanimo Teruel',
    radioSectionTitle: "Radio en esperanto",
    radioSectionDesc: "Escucha en directo emisoras y programas en esperanto de todo el mundo.",
    radioSeeAll: "Todas las emisoras",
    peopleSectionTitle: "Esperantistas célebres",
    peopleSectionDesc: "Escritores, científicos y activistas que hablaron y usaron el esperanto.",
    peopleSeeAll: "Todas las personas",
    listenBtn: "Escuchar",
    nowPlaying: "Sonando",
    closePlayer: "Cerrar reproductor",
    latestEpisodes: "Últimas emisiones",
    loadingEpisodes: "Cargando emisiones…",
    episodesError: "No se pudieron cargar las emisiones. Prueba en la web de la emisora.",
    liveBadge: "En directo",

    // Forum Extras
    forumTopicTitleLabel: 'Título',
    forumTopicMessageLabel: 'Mensaje',
    forumTopicTagsPlaceholder: 'ej. gramatica, acusativo, principiante',
    forumNoRepliesYet: 'Todavía no hay respuestas. ¡Sé el primero en responder!',
    forumOfficialNote: 'Nota Oficial de Moderación',
    forumRepliesHeading: (count) => `Respuestas (${count})`,
    forumConfirmDeleteTopic: '¿Estás seguro de que deseas eliminar este tema?',
    forumConfirmDeleteComment: '¿Estás seguro de que deseas eliminar este comentario?',
    forumRoleLearner: 'Estudiante',
    forumRoleTeacher: 'Profesor',
    forumRoleModerator: 'Moderador',
    forumModHelpText: '★ Tienes permisos completos para moderar, fijar, cerrar o eliminar mensajes.',
    forumLearnerHelpText: 'Participa en debates, plantea dudas gramaticales y haz amigos con otros estudiantes.',
    forumAutoXActiveText: 'El sistema X (cx → ĉ) está activo',
  },

  en: {
    appName: 'Serĉilo',
    tagline: 'The open search engine for the Esperanto universe',
    searchPlaceholder: 'Search courses, projects, news, dictionaries, books...',
    searchBtn: 'Search in Esperanto',
    luckyBtn: "I'm feeling lucky",
    availableIn: 'Serĉilo is also available in:',
    quickFilters: 'Filter by language level:',
    popularSearches: 'Popular searches:',
    
    settings: 'Settings',
    savedResources: 'Saved',
    savedCount: 'saved resources',
    clearSaved: 'Clear all',
    noSavedYet: 'You have not saved any resources yet. Click the star ⭐ on any result to pin it here.',
    aboutTitle: 'About Serĉilo',
    toolsMenu: 'Tools & Links',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    systemMode: 'System mode',
    
    resultsStats: (count, seconds) => `About ${count} results (${seconds} seconds)`,
    noResultsTitle: 'No results found',
    noResultsDesc: 'Try broader keywords, removing active filters, or searching in Spanish or English.',
    didYouMean: 'Did you mean:',
    filterByLevel: 'Level',
    filterByFormat: 'Format',
    filterFreeOnly: 'Free only',
    sortBy: 'Sort by',
    sortRelevance: 'Most relevant',
    sortAlpha: 'Alphabetical (A-Z)',
    sortLevel: 'Level (A1 → C1)',
    clearFilters: 'Clear filters',
    visitSite: 'Visit website',
    quickPreview: 'Quick preview',
    copyLink: 'Copy link',
    linkCopied: 'Link copied!',
    saveToFavorites: 'Save',
    removeFromFavorites: 'Unsave',
    
    advancedSearchTitle: 'Advanced Search',
    advancedSearchDesc: 'Use specific criteria and logic to pinpoint exactly what you need.',
    findPagesWith: 'Find pages with...',
    allTheseWords: 'All these words:',
    exactWordPhrase: 'This exact word or phrase:',
    anyTheseWords: 'Any of these words:',
    noneTheseWords: 'None of these words:',
    thenNarrowBy: 'Then narrow by...',
    levelLabel: 'Language level:',
    categoryLabel: 'Category:',
    formatLabel: 'Format:',
    licenseLabel: 'Access:',
    freeOnlyCheck: 'Show 100% free resources only',
    applyAdvancedSearch: 'Search now',
    resetFields: 'Reset',
    closeModal: 'Close',
    
    settingsTitle: 'Serĉilo Settings',
    settingsSubtitle: 'Customize your search experience, display language, and regional preferences.',
    interfaceLanguage: 'Interface language:',
    regionalSettings: 'Regional & Language Configuration',
    autoXSystemTitle: 'Automatic X-System conversion (cx → ĉ):',
    autoXSystemDesc: 'Automatically converts cx, gx, hx, jx, sx, ux into correct circumflex characters as you type.',
    themeTitle: 'Appearance & theme:',
    highContrastTitle: 'High contrast:',
    highContrastDesc: 'Boosts typographic contrast for enhanced visual accessibility.',
    resultsPerPageTitle: 'Results per page:',
    openLinksNewTabTitle: 'Open links in a new tab:',
    openLinksNewTabDesc: 'Keep your search results page open when clicking on external links.',
    defaultLevelTitle: 'Default search level:',
    saveSettings: 'Save settings',
    settingsSaved: 'Settings saved successfully!',
    resetDefaults: 'Reset to defaults',
    
    categories: {
      all: 'All',
      courses: 'Courses',
      news: 'News',
      projects: 'Projects',
      tools: 'Tools & Dictionaries',
      literature: 'Literature',
      media: 'Audio, Video & Podcasts',
      community: 'Community & Events',
      radio: "Radio",
      people: "People",
    },
    
    levels: {
      all: 'All levels',
      A1: 'A1 - Beginner',
      A2: 'A2 - Elementary',
      B1: 'B1 - Intermediate',
      B2: 'B2 - Upper Intermediate',
      C1: 'C1/C2 - Advanced / Fluent',
    },
    levelDescriptions: {
      all: 'Suitable for everyone, regardless of prior Esperanto experience',
      A1: 'Basic phrases, greetings, and foundation grammar',
      A2: 'Day-to-day conversation, graded reading with controlled vocab',
      B1: 'Conversational autonomy, podcasts, and standard news',
      B2: 'Fluent speaking, international magazines, and rich vocabulary',
      C1: 'High literature, specialized terminology, and stylistic mastery',
    },
    
    formats: {
      website: 'Website',
      app: 'Mobile App',
      podcast: 'Podcast / Audio',
      book: 'Book / eBook',
      video: 'Video / YouTube',
      forum: 'Forum / Chat',
      course: 'Interactive Course',
      tool: 'Tool / Dictionary',
    },

    knowledgeTitle: 'Information Panel',
    moreInfo: 'More information on the web',

    keyboardHint: 'Press / to search',
    screenReaderSearchInput: 'Search box for Esperanto resources',
    openDetails: 'View details',
    featuredBadge: 'Featured',
    freeBadge: 'Free',

    communityTab: 'Community & Forum',
    searchTab: 'Search Engine',
    forumTitle: 'Esperanto Forum',
    forumTagline: 'Discussion, Q&A, grammar help, and friendships for all learning levels',
    newTopicBtn: 'New Topic',
    createTopicTitle: 'Create Discussion Topic',
    topicTitlePlaceholder: 'Clear title for your question or topic...',
    topicContentPlaceholder: 'Write your message here. You can use Esperanto, Spanish, or English...',
    topicCategoryLabel: 'Category',
    topicLevelLabel: 'Recommended Level',
    topicTagsLabel: 'Tags (comma separated)',
    publishTopicBtn: 'Publish Topic',
    cancelBtn: 'Cancel',
    filterByForumCategory: 'Category',
    filterByForumLevel: 'Level',
    searchForumPlaceholder: 'Search topics, questions, and replies...',
    noTopicsFound: 'No topics found',
    noTopicsFoundDesc: 'Try adjusting your search keywords or start a new topic to get the conversation going.',
    replies: 'replies',
    views: 'views',
    likes: 'likes',
    pinned: 'Pinned',
    locked: 'Locked',
    moderatorBadge: 'Moderator',
    teacherBadge: 'Teacher',
    learnerBadge: 'Learner',
    moderatorTools: 'Moderator Tools',
    modPinAction: 'Pin Topic',
    modUnpinAction: 'Unpin Topic',
    modLockAction: 'Lock Topic',
    modUnlockAction: 'Unlock Topic',
    modDeleteTopic: 'Delete Topic',
    modDeleteComment: 'Delete Reply',
    replyToTopic: 'Reply to this topic',
    postReplyBtn: 'Post Reply',
    replyPlaceholder: 'Write your reply or feedback here...',
    topicLockedNotice: 'This topic has been locked by a moderator. New replies are disabled.',
    backToTopics: 'Back to all topics',
    switchUserRole: 'Switch user role (Simulation):',
    currentRoleLabel: 'Active profile',
    forumCategories: {
      all: 'All Categories',
      general: 'General & Introductions',
      questions: 'Q&A Help',
      grammar: 'Grammar & Usage',
      practice: 'Practice & Speaking',
      resources: 'Resources & Books',
      events: 'Events & Meetups',
    },

    // Add Resource Modal
    addResourceModalTitle: 'Add New Resources to Serĉilo',
    addResourceModalSubtitle: 'Feed the search engine with new websites, or discover live links with Google Search without duplicates.',
    tabManualAdd: 'Add link manually',
    tabGoogleCrawler: 'Live Google Search (Auto-Discovery)',
    urlLabel: 'Website URL *',
    urlHelperText: 'The system automatically verifies whether this address is already indexed to avoid duplicates.',
    urlPlaceholder: 'https://example.esperanto.org',
    resourceTitleLabel: 'Resource Title *',
    resourceTitlePlaceholder: 'e.g. New Esperanto Youth Podcast',
    resourceDescLabel: 'Resource Description *',
    resourceDescPlaceholder: 'What does this website or project offer? Who is it suitable for?',
    categoryLabelSelect: 'Category',
    levelLabelSelect: 'Recommended Level',
    formatLabelSelect: 'Content Format',
    tagsLabelInput: 'Tags (comma separated)',
    tagsPlaceholderInput: 'e.g. podcast, music, grammar, beginner',
    freeResourceCheckbox: 'This resource is completely free',
    submitAddResourceBtn: 'Add to Index',
    crawlerNoticeText: 'This tool connects to Google Search in real time to discover genuine websites, courses, books, and articles. Every link is checked against the database to prevent duplicates.',
    crawlerQueryLabel: 'Topic to search on Google',
    crawlerQueryPlaceholder: 'e.g. new Esperanto podcasts 2026, courses for English speakers...',
    startCrawlerBtn: 'Search with Google',
    crawlingProgressText: 'Crawling the web via Google Search...',
    alreadyInIndexBadge: 'Already in index (duplicate)',
    importSelectedBtn: (count) => `Import Selected Links (${count})`,
    noCrawledFound: 'No new links discovered for this query.',
    addSuccessNotice: 'Link successfully added to index without duplicates!',
    urlRequiredNotice: 'Please fill in the URL, title, and description.',
    invalidUrlNotice: 'Invalid URL (must start with https:// or http://).',
    duplicateUrlError: 'This link already exists in the index (duplicate avoided).',
    crawledImportSuccess: (added, duplicates) => `${added} new links successfully added to Serĉilo! (${duplicates} duplicates skipped).`,

    // Bookmarks Drawer
    exportJsonBtn: 'Export (JSON)',

    // Resource Detail Modal
    detailDescriptionTitle: 'Description',
    detailFeaturesTitle: 'Key Features',
    detailTagsTitle: 'Tags (click to search)',

    // Advanced Search Placeholders
    allWordsPlaceholder: 'e.g. course online beginner',
    exactPhrasePlaceholder: 'e.g. Plena Ilustrita Vortaro',
    anyWordsPlaceholder: 'e.g. podcast radio music',
    excludeWordsPlaceholder: 'e.g. book store buy',

    // Level Guide
    levelGuideTitle: 'Language Levels Guide',
    levelGuideDesc: 'Find the ideal materials suited to your current proficiency in Esperanto (CEFR system):',

    // Search Results Discovery
    wantDiscoverMoreTitle: 'Want to discover more links on the web?',
    wantDiscoverMoreDesc: 'Use real-time Google Search grounding to find active web sources and index them without duplicates.',
    searchWebBtn: 'Search the web',
    addLinkManuallyBtn: 'Add link manually',

    // Header & Footer & Search Home
    addLinkNavBtn: 'Add Link',
    addLinkNavTitle: 'Add new link / Live Google Search',
    changeLanguageAria: 'Change language',
    homeTitleTooltip: 'Serĉilo Home',
    autoXSystemTooltipActive: 'Auto X-system active (cx → ĉ)',
    autoXSystemTooltipInactive: 'X-system inactive',
    clearSearchQueryTitle: 'Clear',
    clearSearchQueryAria: 'Clear search query',
    footerWorldwide: 'Worldwide Esperanto Community (Global)',
    footerNonProfit: 'Non-profit & Open Source',
    ownerNotice: 'Website by Liberanimo Teruel',
    radioSectionTitle: "Esperanto radio",
    radioSectionDesc: "Listen live to Esperanto stations and programmes from around the world.",
    radioSeeAll: "All stations",
    peopleSectionTitle: "Famous Esperantists",
    peopleSectionDesc: "Writers, scientists and activists who spoke and used Esperanto.",
    peopleSeeAll: "All people",
    listenBtn: "Listen",
    nowPlaying: "Now playing",
    closePlayer: "Close player",
    latestEpisodes: "Latest episodes",
    loadingEpisodes: "Loading episodes…",
    episodesError: "Couldn't load the episodes. Try the station's website.",
    liveBadge: "Live",

    // Forum Extras
    forumTopicTitleLabel: 'Title',
    forumTopicMessageLabel: 'Message',
    forumTopicTagsPlaceholder: 'e.g. grammar, accusative, beginner',
    forumNoRepliesYet: 'No replies yet. Be the first to answer!',
    forumOfficialNote: 'Official Moderator Note',
    forumRepliesHeading: (count) => `Replies (${count})`,
    forumConfirmDeleteTopic: 'Are you sure you want to delete this topic?',
    forumConfirmDeleteComment: 'Are you sure you want to delete this comment?',
    forumRoleLearner: 'Learner',
    forumRoleTeacher: 'Teacher',
    forumRoleModerator: 'Moderator',
    forumModHelpText: '★ You have full permissions to moderate, pin, lock, or delete messages.',
    forumLearnerHelpText: 'Participate in discussions, ask grammar questions, and connect with fellow learners.',
    forumAutoXActiveText: 'X-system (cx → ĉ) is active',
  },
};
