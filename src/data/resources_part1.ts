import { EsperantoResource } from '../types';

export const PART1_RESOURCES: EsperantoResource[] = [
  // KURSOJ (COURSES)
  {
    id: 'lernu-net',
    title: 'Lernu.net',
    url: 'https://lernu.net',
    displayUrl: 'lernu.net',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'course',
    author: 'E@I (Edukado@Interreto)',
    featured: true,
    year: '2002-2024',
    languages: ['eo', 'es', 'en', 'fr', 'de', 'ru', 'zh'],
    description: {
      eo: 'La plej granda kaj populara senpaga multlingva retpaĝaro por lerni Esperanton, kun la kurso "La Teorio Nakamura", gramatikaj klarigoj, vortaro kaj forumoj.',
      es: 'El sitio web multilingüe gratuito más popular para aprender esperanto, con el curso "La Teoría Nakamura", explicaciones gramaticales, diccionario y foros activos.',
      en: 'The most popular free multilingual website for learning Esperanto, featuring the "Nakamura Theory" course, comprehensive grammar guides, dictionary, and forums.'
    },
    tags: ['kurso', 'komencanto', 'lerni', 'gramatiko', 'vortaro', 'interaga', 'multlingva', 'course', 'curso'],
    features: {
      eo: ['Interaga rakont-bazita kurso', 'Enkonstruita vortaro kun sondosieroj', 'Klarigoj en pli ol 20 lingvoj', 'Komunumaj forumoj por helpo'],
      es: ['Curso interactivo con historia ilustrada', 'Diccionario integrado con pronunciación', 'Explicaciones en más de 20 idiomas', 'Comunidad y foros de ayuda'],
      en: ['Interactive story-driven course', 'Integrated dictionary with audio', 'Explanations in 20+ languages', 'Community forums for support']
    }
  },
  {
    id: 'duolingo-esperanto',
    title: 'Duolingo Esperanto',
    url: 'https://www.duolingo.com/course/eo/en/Learn-Esperanto',
    displayUrl: 'duolingo.com/course/eo',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'app',
    author: 'Duolingo & Esperanto-Volontuloj',
    featured: true,
    year: '2015-2024',
    languages: ['eo', 'es', 'en', 'pt', 'fr'],
    description: {
      eo: 'Ludeca kaj rapida apo por eklerni Esperanton en poŝtelefono aŭ retumilo per facilaj ĉiutagaj 5-minutaj lecionoj disponeblaj el la angla, hispana, portugala kaj franca.',
      es: 'Aplicación rápida y gamificada para aprender esperanto en el móvil o navegador mediante lecciones diarias de 5 minutos, disponible en español, inglés, portugués y francés.',
      en: 'Gamified and fast app to start learning Esperanto on mobile or web with 5-minute daily lessons, available from English, Spanish, Portuguese, and French.'
    },
    tags: ['duolingo', 'apo', 'komencanto', 'poŝtelefono', 'ludoj', 'vortprovizo', 'app', 'curso', 'beginner'],
    features: {
      eo: ['Ludiga lernsistemo', 'Aŭtomata voĉa ekzercado', 'Disponebla en la hispana kaj angla', 'Konvena por poŝtelefonoj'],
      es: ['Sistema de aprendizaje gamificado', 'Práctica de pronunciación por voz', 'Disponible en español e inglés', 'Ideal para smartphones'],
      en: ['Gamified learning loop', 'Spoken listening & speaking exercises', 'Available in English & Spanish', 'Great for mobile devices']
    }
  },
  {
    id: 'gerda-malaperis',
    title: 'Gerda Malaperis!',
    url: 'https://esperanto.net/gerda/',
    displayUrl: 'esperanto.net/gerda',
    category: 'courses',
    level: 'A2',
    isFree: true,
    format: 'course',
    author: 'Claude Piron',
    featured: true,
    year: '1983',
    languages: ['eo'],
    description: {
      eo: 'La klasika misterrakonto de la fama svisa psikologo Claude Piron, speciale verkita por instrui la bazan lingvaĵon paŝon post paŝo per alloga detektiva intrigo.',
      es: 'La clásica novela de misterio del psicólogo Claude Piron, diseñada especialmente para aprender esperanto paso a paso mediante una apasionante trama detectivesca.',
      en: 'The classic mystery novel by Swiss psychologist Claude Piron, specially written to teach core grammar and vocabulary step-by-step through a gripping detective story.'
    },
    tags: ['gerda', 'claude piron', 'rakonto', 'legado', 'mistero', 'facila', 'legolibro', 'mystery', 'reading'],
    features: {
      eo: ['25 ĉapitroj kun kreskanta vortprovizo', 'Ekzercoj kaj sondosieroj', 'Klaraj gramatikaj notoj', 'Verkita de Claude Piron'],
      es: ['25 capítulos con vocabulario gradual', 'Ejercicios y audiolibro', 'Notas gramaticales directas', 'Escrito por Claude Piron'],
      en: ['25 chapters with gradual vocabulary', 'Exercises and audio files', 'Concise grammar notes', 'Written by Claude Piron']
    }
  },
  {
    id: 'esperanto-12',
    title: 'Esperanto 12',
    url: 'https://esperanto12.net',
    displayUrl: 'esperanto12.net',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'course',
    author: 'E@I & Esperanto-Movado',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: '12 rapidaj lecionoj bazitaj sur la metodo Zagreb por akiri bazan funkcian regon de Esperanto en nur 12 horoj da studado.',
      es: '12 lecciones rápidas basadas en el método de Zagreb para adquirir un dominio funcional básico de esperanto en tan solo 12 horas de estudio.',
      en: '12 quick lessons based on the Zagreb method to acquire a basic functional command of Esperanto in just 12 study hours.'
    },
    tags: ['zagreb', '12 lecionoj', 'rapida', 'komencanto', 'a1', 'metodo', 'crash course'],
    features: {
      eo: ['Nur 12 lecionoj', '500 plej oftaj radikoj', 'Lernado en 12 horoj', 'Simpla kaj sen distraĵoj'],
      es: ['Solo 12 lecciones', '500 raíces más frecuentes', 'Completar en 12 horas', 'Interfaz limpia y directa'],
      en: ['Just 12 lessons', '500 most frequent roots', 'Learn in 12 hours', 'Clean, distraction-free UI']
    }
  },
  {
    id: 'edukado-net',
    title: 'Edukado.net & Ekparolu!',
    url: 'https://edukado.net',
    displayUrl: 'edukado.net',
    category: 'courses',
    level: 'B1',
    isFree: true,
    format: 'course',
    author: 'D-ro Katalin Kováts',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'La ĉefa pedagogia portalo por instruistoj kaj lernantoj de Esperanto. Inkluzivas la sukcesan programon "Ekparolu!" por paroli unu-al-unu kun spertaj geonkloj.',
      es: 'El principal portal pedagógico para profesores y estudiantes de esperanto. Incluye el exitoso programa "Ekparolu!" para practicar conversación individual con tutores experimentados.',
      en: 'The leading educational portal for Esperanto teachers and learners. Features the popular "Ekparolu!" mentorship program for 1-on-1 spoken practice with experienced speakers.'
    },
    tags: ['edukado', 'ekparolu', 'instruado', 'parolado', 'mentoroj', 'ker-ekzamenoj', 'b1', 'b2'],
    features: {
      eo: ['Programo Ekparolu por parola praktiko', 'KER-ekzamenaj materialoj', 'Instruiloj kaj ekzercoj', 'Rikolto de pedagogiaj artikoloj'],
      es: ['Programa Ekparolu de conversación uno a uno', 'Materiales oficiales de exámenes MCER', 'Recursos didácticos para profesores', 'Comunidad pedagógica global'],
      en: ['Ekparolu 1-on-1 speaking program', 'Official CEFR exam preparation', 'Teaching materials & lesson plans', 'Global educator network']
    }
  },
  {
    id: 'kurso-de-esperanto',
    title: 'Kurso de Esperanto (Komputila Kurso)',
    url: 'https://www.kurso.com.br',
    displayUrl: 'kurso.com.br',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'app',
    author: 'Carlos Pereira',
    languages: ['eo', 'es', 'en', 'pt'],
    description: {
      eo: 'Senkoneksa elŝutebla komputila programo por Windows, Mac kaj Linux kun 12 lecionoj, aŭskult-ekzercoj, kantsono kaj senpaga retkorektisto.',
      es: 'Programa descargable sin conexión para Windows, Mac y Linux con 12 lecciones, ejercicios auditivos, canciones y servicio de corrección gratuita por correo.',
      en: 'Offline downloadable software for Windows, Mac, and Linux featuring 12 lessons, listening exercises, songs, and free human corrector service via email.'
    },
    tags: ['programo', 'senkonekta', 'elŝutebla', 'komencanto', 'sonoj', 'korektado', 'software'],
    features: {
      eo: ['Funkcias tute sen interreta konekto', 'Senpaga persona korektanto per retpoŝto', 'Prononco de indiĝenaj voĉoj', 'Tradukita al pli ol 30 lingvoj'],
      es: ['Funciona completamente sin conexión', 'Tutor personal gratuito por email', 'Pronunciación grabada en alta calidad', 'Disponible en más de 30 idiomas'],
      en: ['Runs completely offline', 'Free personal email tutor', 'Clear audio recordings', 'Available in 30+ languages']
    }
  },
  {
    id: 'bobelarto',
    title: 'Bobelarto - Rakontoj por Ĉiuj Niveloj',
    url: 'https://bobelarto.ink',
    displayUrl: 'bobelarto.ink',
    category: 'courses',
    level: 'A2',
    isFree: true,
    format: 'website',
    author: 'Bobelarto Klubo',
    languages: ['eo'],
    description: {
      eo: 'Interreta legoklubo kun facilaj rakontoj, vortoklarigoj kaj diskutrondoj speciale adaptitaj por lernantoj de niveloj A2, B1 kaj B2.',
      es: 'Club de lectura online con relatos amenos clasificados por nivel, explicaciones de vocabulario y círculos de debate para niveles A2, B1 y B2.',
      en: 'Online reading club with leveled short stories, vocabulary glossaries, and discussion groups tailored for learners at A2, B1, and B2 levels.'
    },
    tags: ['rakontoj', 'legado', 'bobelarto', 'komencanto', 'meza', 'klubo', 'stories', 'reading'],
    features: {
      eo: ['Rakontoj klasifikitaj laŭ KER-niveloj', 'Vortklarigoj rekte en la teksto', 'Sondosieroj por aŭskulti', 'Monataj retaj renkontiĝoj'],
      es: ['Historias clasificadas por nivel MCER', 'Glosarios explicativos en cada texto', 'Archivos de audio para escuchar', 'Encuentros virtuales mensuales'],
      en: ['Stories classified by CEFR levels', 'Inline vocabulary annotations', 'Audio recordings included', 'Monthly virtual meetups']
    }
  },

  // ILOJ KAJ VORTAROJ (TOOLS & DICTIONARIES)
  {
    id: 'vortaro-piv',
    title: 'PIV - Plena Ilustrita Vortaro Rete',
    url: 'https://vortaro.net',
    displayUrl: 'vortaro.net',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'SAT & E@I',
    featured: true,
    year: '2020',
    languages: ['eo'],
    description: {
      eo: 'La plej aŭtoritata unulingva vortaro de Esperanto kun pli ol 16 000 kapvortoj kaj 46 000 signifoj, eldonita de Sennacieca Asocio Tutmonda.',
      es: 'El diccionario monolingüe de referencia por excelencia del esperanto, con más de 16.000 entradas y 46.000 acepciones, publicado por SAT.',
      en: 'The definitive unabridged monolingual reference dictionary of Esperanto, containing over 16,000 root words and 46,000 meanings, published by SAT.'
    },
    tags: ['piv', 'vortaro', 'difinoj', 'unulingva', 'oficiala', 'sat', 'sperta', 'dictionary', 'diccionario'],
    features: {
      eo: ['16 800+ kapvortoj kaj ekzemploj', 'Tujserĉo kun aŭtomataj sugestoj', 'Fontindikoj de Zamenhof kaj verkistoj', 'Klaraj semantikaj difinoj'],
      es: ['Más de 16.800 entradas y ejemplos', 'Búsqueda instantánea en tiempo real', 'Citas de Zamenhof y literatura clásica', 'Definiciones monolingües precisas'],
      en: ['16,800+ entries with literary citations', 'Instant predictive search', 'Quotations from Zamenhof and authors', 'Precise monolingual definitions']
    }
  },
  {
    id: 'reta-vortaro',
    title: 'ReVo - Reta Vortaro',
    url: 'https://www.reta-vortaro.de',
    displayUrl: 'reta-vortaro.de',
    category: 'tools',
    level: 'A2',
    isFree: true,
    format: 'tool',
    author: 'ReVo Komunumo',
    languages: ['eo', 'es', 'en', 'de', 'fr', 'ru'],
    description: {
      eo: 'Malfermkoda kunlabora multlingva reta vortaro kun tradukoj en dekoj da lingvoj, ekzemploj el literaturo kaj etimologiaj detaloj.',
      es: 'Diccionario multilingüe colaborativo de código abierto con traducciones a decenas de idiomas, ejemplos literarios y detalles etimológicos.',
      en: 'Open-source collaborative multilingual online dictionary with translations in dozens of languages, literary examples, and etymology.'
    },
    tags: ['revo', 'vortaro', 'traduko', 'multlingva', 'malferma kodo', 'etimologio', 'dictionary', 'traductor'],
    features: {
      eo: ['Tradukoj en pli ol 50 lingvojn', 'Ekzemploj el beletro kaj gazetoj', 'Malfermfonta datumbazo', 'Regula ĝisdatigo fare de volontuloj'],
      es: ['Traducciones a más de 50 idiomas', 'Ejemplos de literatura y prensa', 'Base de datos de código abierto', 'Actualizaciones continuas'],
      en: ['Translations in 50+ languages', 'Quotations from literature & journalism', 'Open-source database', 'Continual volunteer curation']
    }
  },
  {
    id: 'pmeg-gramatiko',
    title: 'PMEG - Plena Manlibro de Esperanta Gramatiko',
    url: 'https://bertilow.com/pmeg/',
    displayUrl: 'bertilow.com/pmeg',
    category: 'tools',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Bertilo Wennergren (Akademio de Esperanto)',
    featured: true,
    year: '2024 (Eldono)',
    languages: ['eo'],
    description: {
      eo: 'La plej detala kaj moderna gvidlibro pri la gramatiko de Esperanto, verkita per facila lingvaĵo sen peza tradicia latina faka terminaro.',
      es: 'La guía más completa y moderna sobre la gramática del esperanto, redactada en un lenguaje directo y comprensible sin arcaísmos latinos.',
      en: 'The most comprehensive and modern guide to Esperanto grammar, written in clear, accessible language avoiding convoluted traditional jargon.'
    },
    tags: ['pmeg', 'gramatiko', 'bertilo', 'akuzativo', 'reguloj', 'referenco', 'sintakso', 'grammar', 'gramatica'],
    features: {
      eo: ['Plena indekso kaj serĉilo', 'Praktikaj ekzemploj por ĉiuj duboj', 'Klarigoj de afiksoj, prepozicioj kaj verboj', 'Verkita de akademiano Bertilo Wennergren'],
      es: ['Índice exhaustivo y motor de búsqueda', 'Ejemplos prácticos para cada duda', 'Explicación clara de afijos y preposiciones', 'Escrito por el académico Bertilo Wennergren'],
      en: ['Exhaustive index & search', 'Clear solutions for every grammatical doubt', 'In-depth coverage of affixes & syntax', 'Authored by Academy member Bertilo Wennergren']
    }
  },
  {
    id: 'tatoeba-esperanto',
    title: 'Tatoeba - Frazoj kaj Ekzemploj',
    url: 'https://tatoeba.org/eo',
    displayUrl: 'tatoeba.org/eo',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Tatoeba Projekto',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Grandega datumbazo de ekzemplaj frazoj en Esperanto kun parigitaj tradukoj en centoj da lingvoj kaj naturaj sonregistraĵoj.',
      es: 'Inmensa base de datos colaborativa de frases de ejemplo en esperanto con traducciones paralelas a cientos de idiomas y grabaciones de voz.',
      en: 'Enormous collaborative database of real example sentences in Esperanto paired with translations in hundreds of languages and native audio.'
    },
    tags: ['tatoeba', 'frazoj', 'tradukoj', 'prononco', 'ekzemploj', 'voĉoj', 'sentences', 'frases'],
    features: {
      eo: ['Pli ol 800 000 frazoj en Esperanto', 'Voĉregistritaj frazoj de denaskuloj kaj spertuloj', 'Serĉo laŭ vortoj aŭ gramatikaj strukturoj', 'Senpaga kaj malfermfonta'],
      es: ['Más de 800.000 frases en esperanto', 'Grabaciones de voz auténticas', 'Búsqueda por palabras clave o estructuras', 'Libre y de código abierto'],
      en: ['Over 800,000 Esperanto sentences', 'Native and fluent voice recordings', 'Search by keywords or grammatical patterns', 'Free and open-source']
    }
  },
  {
    id: 'tekstaro-de-esperanto',
    title: 'Tekstaro de Esperanto',
    url: 'https://tekstaro.com',
    displayUrl: 'tekstaro.com',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'E@I & Bertilo Wennergren',
    languages: ['eo'],
    description: {
      eo: 'Tekstokorpusa serĉilo enhavanta milionojn da vortoj el beletro, gazetaro kaj sciencaj tekstoj por esplori kiel vortoj kaj esprimoj estas uzataj en la praktiko.',
      es: 'Corpus lingüístico digital con millones de palabras de literatura clásica, prensa y textos científicos para investigar el uso real del idioma.',
      en: 'A linguistic text corpus containing millions of words from classic literature, periodicals, and non-fiction to study how words and phrases are used in practice.'
    },
    tags: ['korpuso', 'lingvistiko', 'esploro', 'literaturo', 'ofta uzo', 'zamenhof', 'corpus', 'linguistics'],
    features: {
      eo: ['Milionoj da vortoj el historiaj kaj modernaj fontoj', 'Regulesprimaj kaj strukturaj serĉoj', 'Ideala por lingvaj esploristoj kaj verkistoj', 'Senkosta uzo'],
      es: ['Millones de palabras de fuentes históricas y modernas', 'Búsqueda avanzada con expresiones regulares', 'Ideal para traductores, filólogos y escritores', 'Acceso libre'],
      en: ['Millions of words from historical & contemporary sources', 'Regex and grammatical query support', 'Indispensable for linguists and translators', 'Free online access']
    }
  },
  {
    id: 'tuja-vortaro',
    title: 'Tuja Vortaro',
    url: 'https://vortaro.kisa.ca',
    displayUrl: 'vortaro.kisa.ca',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Vilĉjo & Komunumo',
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'Ultra-rapida dudirekta poŝamika vortaro kiu montras tradukojn dum vi tajpas, kun subteno por la ikso-sistemo.',
      es: 'Diccionario bidireccional ultrarrápido y adaptado a móviles que muestra traducciones en tiempo real al teclear, con soporte del sistema x.',
      en: 'Ultra-fast, mobile-friendly bidirectional dictionary that shows translations as you type, with seamless x-system transliteration.'
    },
    tags: ['rapida', 'tuja', 'vortaro', 'poŝtelefono', 'x-sistemo', 'fast', 'instant', 'traductor'],
    features: {
      eo: ['Tujaj rezultoj dum tajpado', 'Funkcias en malrapidaj konektoj', 'Aŭtomata konvertado de x-sistemo', 'Dudirekta serĉo'],
      es: ['Resultados instantáneos al teclear', 'Optimizado para conexiones lentas y móviles', 'Conversión automática del sistema x', 'Búsqueda bidireccional'],
      en: ['Instant results as you type', 'Super lightweight on mobile networks', 'Automatic x-system transliteration', 'Bidirectional lookup']
    }
  },

  // NOVAĴOJ KAJ PERIODAĴOJ (NEWS & MEDIA)
  {
    id: 'libera-folio',
    title: 'Libera Folio',
    url: 'https://www.liberafolio.org',
    displayUrl: 'liberafolio.org',
    category: 'news',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Kalle Kniivilä & Redakcio',
    featured: true,
    year: '2003-2024',
    languages: ['eo'],
    description: {
      eo: 'Sendependa movada bulteno de la Esperanto-komunumo, raportanta kritike kaj sendepende pri kongresoj, asocioj, kulturo kaj internaciaj eventoj.',
      es: 'Periódico digital independiente del movimiento esperantista que informa de forma crítica y profesional sobre congresos, asociaciones, cultura y eventos globales.',
      en: 'Independent news bulletin of the Esperanto movement, providing critical, investigative reporting on congresses, associations, culture, and global events.'
    },
    tags: ['novaĵoj', 'gazeto', 'sendependa', 'raportoj', 'kritiko', 'movado', 'news', 'periodismo'],
    features: {
      eo: ['Sendependa ĵurnalismo', 'Aktivaj komentoj de legantoj', 'Raportoj pri UEA kaj TEJO', 'Senkosta aliro'],
      es: ['Periodismo independiente e imparcial', 'Comentarios y debates de la comunidad', 'Cobertura de asociaciones internacionales', 'Acceso completamente gratuito'],
      en: ['Independent investigative journalism', 'Active reader debates and comments', 'In-depth coverage of UEA and TEJO', 'Free access']
    }
  },
  {
    id: 'esperanto-retradio',
    title: 'Esperanto Retradio',
    url: 'https://esperantoretradio.blogspot.com',
    displayUrl: 'esperantoretradio.blogspot.com',
    category: 'media',
    level: 'A2',
    isFree: true,
    format: 'podcast',
    author: 'Anton Oberndorfer & Kunlaborantoj',
    featured: true,
    year: 'Ĉiutaga',
    languages: ['eo'],
    description: {
      eo: 'Ĉiutaga podkasto kun 3-minutaj artikoloj pri scienco, socio, historio kaj kulturo, legataj per klara voĉo kune kun la kompleta skribita teksto.',
      es: 'Pódcast diario con artículos de 3 minutos sobre ciencia, sociedad e historia, leídos con voz pausada y acompañados del texto completo transcrito.',
      en: 'Daily podcast featuring 3-minute articles on science, society, and history, spoken in clear, measured audio accompanied by the complete written transcript.'
    },
    tags: ['podkasto', 'retradio', 'aŭskultado', 'prononco', 'ĉiutaga', 'teksto kun sono', 'podcast', 'audio'],
    features: {
      eo: ['Ĉiutage nova epizodo', 'Klara kaj facila prononco', 'Teksto sinkronigita kun la sonregistraĵo', 'Ideala por mezgradaj lernantoj'],
      es: ['Nuevo episodio cada día', 'Pronunciación clara y comprensible', 'Texto completo para leer mientras escuchas', 'Ideal para estudiantes de nivel A2/B1'],
      en: ['Fresh episode every single day', 'Clear, articulated spoken delivery', 'Full text transcript to read along', 'Perfect for A2/B1 learners']
    }
  },
  {
    id: 'kern-punkto',
    title: 'Kern.punkto Podkasto',
    url: 'https://kern.punkto.info',
    displayUrl: 'kern.punkto.info',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Eva Fitzpatrikova & Johannes Genberg',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'Profunda kaj altkvalita podkasto pri scienco, teknologio, kulturo, socio kaj interesaj vivspertoj en flua, natura Esperanto.',
      es: 'Pódcast de gran calidad y profundidad sobre ciencia, tecnología, cultura, sociedad y experiencias fascinantes en un esperanto fluido y natural.',
      en: 'Deep-dive, high-production podcast discussing science, technology, culture, society, and fascinating life experiences in natural spoken Esperanto.'
    },
    tags: ['podkasto', 'scienco', 'teknologio', 'profunda', 'intervjuoj', 'kernpunkto', 'podcast', 'audio'],
    features: {
      eo: ['Pli ol 250 profundaj epizodoj', 'Diferencaj temoj pri scienco kaj naturo', 'Profesia sonkvalito', 'Natura ĉiutaga lingvaĵo'],
      es: ['Más de 250 episodios temáticos', 'Temas de divulgación científica y social', 'Calidad de audio profesional', 'Uso fluido y natural del idioma'],
      en: ['Over 250 in-depth episodes', 'Science, engineering & social topics', 'Studio-quality audio mastering', 'Natural conversational flow']
    }
  },
  {
    id: 'tubaro-videoj',
    title: 'Tubaro - Esperanto-Videoj',
    url: 'https://tubaro.aperu.net',
    displayUrl: 'tubaro.aperu.net',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'video',
    author: 'Aperu & Komunumo',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'Aŭtomata retejo kiu kolektas kaj kategoriigas ĉiujn videojn publikigitajn en Esperanto en YouTube kaj aliaj videoj-platformoj.',
      es: 'Portal que reúne y categoriza automáticamente todos los vídeos publicados en esperanto en YouTube y otras plataformas de vídeo.',
      en: 'Automated video aggregator collecting and categorizing all videos published in Esperanto on YouTube and other platforms.'
    },
    tags: ['videoj', 'tubaro', 'youtube', 'filmetoj', 'videoblogoj', 'muziko', 'videos', 'youtube'],
    features: {
      eo: ['Milo da videoj el centoj da kanaloj', 'Kategoriigo laŭ temoj kaj daŭro', 'Malkovro de novaj esperanto-jutubistoj', 'Regula ĉiutaga ĝisdatigo'],
      es: ['Miles de vídeos de cientos de creadores', 'Categorización por temas y duración', 'Descubre nuevos youtubers esperantistas', 'Actualización continua'],
      en: ['Thousands of videos from hundreds of creators', 'Filtered by topic and length', 'Discover new Esperanto content creators', 'Updated hourly']
    }
  },
  {
    id: 'scivolemo-scienco',
    title: 'Scivolemo - Scienca Retejo',
    url: 'https://scivolemo.info',
    displayUrl: 'scivolemo.info',
    category: 'news',
    level: 'A2',
    isFree: true,
    format: 'website',
    author: 'Scivolemo Asocio',
    languages: ['eo'],
    description: {
      eo: 'Popularscienca blogo kaj novaĵejo kun allogaj artikoloj pri astronomio, biologio, historio kaj fiziko skribitaj per klara kaj alirebla Esperanto.',
      es: 'Blog de divulgación científica con artículos accesibles y apasionantes sobre astronomía, biología, historia y física en un esperanto claro y ameno.',
      en: 'Popular science portal featuring accessible articles on astronomy, biology, history, and physics written in clear, engaging Esperanto.'
    },
    tags: ['scienco', 'astronomio', 'scivolemo', 'facila', 'popularscienco', 'artikoloj', 'science', 'divulgacion'],
    features: {
      eo: ['Fascinaj sciencaj malkovroj', 'Facile komprenebla lingvaĵo', 'Buntaj bildoj kaj diagramoj', 'Konvena por lernantoj de nivelo A2-B1'],
      es: ['Descubrimientos científicos fascinantes', 'Lenguaje comprensible y bien editado', 'Imágenes y diagramas explicativos', 'Apto para niveles A2 y B1'],
      en: ['Engaging scientific stories', 'Clear accessible vocabulary', 'Vibrant diagrams and photography', 'Great for A2-B1 learners']
    }
  },
  {
    id: 'kontakto-tejo',
    title: 'Kontakto - Magazino por Junuloj',
    url: 'https://kontakto.tejo.org',
    displayUrl: 'kontakto.tejo.org',
    category: 'news',
    level: 'A2',
    isFree: false,
    format: 'book',
    author: 'TEJO (Tutmonda Esperantista Junulara Organizo)',
    year: '1963-2024',
    languages: ['eo'],
    description: {
      eo: 'Soci-kultura revuo por junuloj eldonata de TEJO, famkonata pro siaj artikoloj en "Facila Esperanto" kun limigita baza vortprovizo por komencantoj.',
      es: 'Revista sociocultural juvenil de TEJO, famosa por sus secciones en "Esperanto Fácil" con vocabulario graduado para principiantes y progresantes.',
      en: 'Youth socio-cultural magazine published by TEJO, renowned for articles written in "Easy Esperanto" using a controlled basic vocabulary list.'
    },
    tags: ['kontakto', 'tejo', 'junuloj', 'facila lingvo', 'magazino', 'kulturo', 'magazine', 'revista'],
    features: {
      eo: ['Rubriko Facila Esperanto por lernantoj', 'Artikoloj pri muziko, mondaj kulturoj kaj vojaĝoj', 'Eleganta moderna grafika aranĝo', 'Presita kaj cifereca eldono'],
      es: ['Sección de Esperanto Fácil para estudiantes', 'Temas de música, viajes y juventud', 'Diseño editorial moderno y atractivo', 'Edición física y digital'],
      en: ['Easy Esperanto section for learners', 'Features on culture, travel, and music', 'Modern high-quality design', 'Available in print and digital']
    }
  },
  {
    id: 'monato-revuo',
    title: 'Monato - Internacia Magazino Sendependa',
    url: 'https://www.esperanto.be/fel/mon/',
    displayUrl: 'esperanto.be/fel/mon',
    category: 'news',
    level: 'B2',
    isFree: false,
    format: 'book',
    author: 'Flandra Esperanto-Ligo (FEL)',
    year: '1980-2024',
    languages: ['eo'],
    description: {
      eo: 'Monata internacia magazino pri politiko, ekonomio, scienco kaj vivo en diversaj mondopartoj, raportata de lokaj korespondantoj el pli ol 40 landoj.',
      es: 'Revista mensual internacional sobre política, economía y sociedad, con crónicas exclusivas redactadas por corresponsales locales en más de 40 países.',
      en: 'Prestigious monthly international news magazine covering world politics, economics, and culture reported directly by local correspondents in over 40 countries.'
    },
    tags: ['monato', 'politiko', 'ekonomio', 'revuo', 'sperta', 'fel', 'internacia', 'magazine', 'politica'],
    features: {
      eo: ['Lokaj raportistoj el 40+ landoj', 'Senreklama sendependa analizo', 'Rikaj stilaj ekzemploj', 'Presita kaj bitlibra versioj'],
      es: ['Corresponsales locales en más de 40 países', 'Análisis periodístico independiente', 'Riqueza de vocabulario culto', 'Formatos impreso y digital'],
      en: ['Local correspondents across 40+ countries', 'Independent, ad-free world reporting', 'Cultivated advanced vocabulary', 'Print and eBook editions']
    }
  },

  // PROJEKTOJ KAJ MOVADO (PROJECTS & MOVEMENT)
  {
    id: 'vikipedio-esperanto',
    title: 'Vikipedio en Esperanto',
    url: 'https://eo.wikipedia.org',
    displayUrl: 'eo.wikipedia.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    featured: true,
    year: '2001-2024',
    languages: ['eo'],
    description: {
      eo: 'La libera enciklopedio en Esperanto kun pli ol 360 000 artikoloj pri scienco, historio, geografio, biografioj kaj la Esperanto-movado mem.',
      es: 'La enciclopedia libre en esperanto con más de 360.000 artículos sobre ciencia, historia, geografía, biografías y la historia del idioma.',
      en: 'The free encyclopedia in Esperanto featuring over 360,000 articles spanning science, history, world cultures, and the Esperanto movement.'
    },
    tags: ['vikipedio', 'enciklopedio', 'artikoloj', 'scio', 'esplorado', 'wikipedia', 'encyclopedia', 'enciclopedia'],
    features: {
      eo: ['Pli ol 360 000 plenaj artikoloj', 'Libere redaktebla de iu ajn', 'Multnombraj sonoj kaj bildoj', 'Riĉa fonto por legado'],
      es: ['Más de 360.000 artículos', 'Completamente editable y libre', 'Imágenes y citas enciclopédicas', 'Excelente recurso de lectura'],
      en: ['Over 360,000 comprehensive articles', 'Freely editable by everyone', 'Rich multimedia and cross-links', 'Immense reading resource']
    }
  },
  {
    id: 'pasporta-servo',
    title: 'Pasporta Servo',
    url: 'https://pasportaservo.org',
    displayUrl: 'pasportaservo.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'TEJO',
    featured: true,
    year: '1974-2024',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'Tutmonda gastiga reto por esperantistoj. Vojaĝu tra pli ol 90 landoj kaj loĝu senpage ĉe lokaj esperanto-parolantaj gastigantoj.',
      es: 'Red mundial de hospitalidad para esperantistas. Viaja por más de 90 países y alójate de forma gratuita con anfitriones locales que hablan esperanto.',
      en: 'Worldwide hospitality network for Esperanto speakers. Travel to over 90 countries and stay for free with local Esperanto-speaking hosts.'
    },
    tags: ['vojaĝoj', 'gastigado', 'pasporta servo', 'loĝado', 'amikoj', 'tejo', 'hospitality', 'travel', 'viajes'],
    features: {
      eo: ['Gastigantoj en pli ol 90 landoj', 'Tute senpaga loĝado por esperantistoj', 'Kultura interŝanĝo kaj lokaj gvidantoj', 'Interaga monda mapo'],
      es: ['Anfitriones en más de 90 países', 'Alojamiento gratuito entre hablantes', 'Intercambio cultural y vivencias únicas', 'Mapa interactivo mundial'],
      en: ['Hosts in 90+ countries around the globe', 'Free homestays among speakers', 'Deep cultural immersion & local tips', 'Interactive world host map']
    }
  },
  {
    id: 'eventa-servo',
    title: 'Eventa Servo - Tutmonda Kalendaro',
    url: 'https://eventaservo.org',
    displayUrl: 'eventaservo.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Fernando Maia Jr. & UEA',
    featured: true,
    year: '2017-2024',
    languages: ['eo'],
    description: {
      eo: 'La centra mapo kaj kalendaro de ĉiuj esperanto-renkontiĝoj, kursoj, prelegoj kaj virtualaj kunsidoj tra la tuta mondo.',
      es: 'El calendario y mapa central de todos los encuentros, congresos, cursos, conferencias y reuniones virtuales de esperanto en todo el mundo.',
      en: 'The central calendar and map of all Esperanto meetups, congresses, courses, lectures, and virtual events happening worldwide.'
    },
    tags: ['eventoj', 'renkontiĝoj', 'kalendaro', 'kongresoj', 'zoom', 'mapo', 'calendar', 'events', 'eventos'],
    features: {
      eo: ['Interretaj kaj fizikaj eventoj', 'Monda mapo de renkontiĝoj', 'Sciigoj kaj aliĝiloj', 'Facila aldonado de viaj propraj eventoj'],
      es: ['Eventos virtuales (Zoom, Meet) y presenciales', 'Mapa geográfico de eventos mundiales', 'Filtros por fecha, país y formato', 'Posibilidad de registrar tus propios eventos'],
      en: ['Virtual and in-person events', 'World geographical map view', 'Filter by date, country, and platform', 'Publish your own club meetups']
    }
  },
  {
    id: 'uea-universala-asocio',
    title: 'UEA - Universala Esperanto-Asocio',
    url: 'https://uea.org',
    displayUrl: 'uea.org',
    category: 'projects',
    level: 'B1',
    isFree: false,
    format: 'website',
    author: 'UEA',
    year: '1908-2024',
    languages: ['eo'],
    description: {
      eo: 'La plej granda internacia neregistara organizaĵo por Esperanto-parolantoj, organizanto de la Universala Kongreso kaj oficiala partnero de Unesko.',
      es: 'La mayor organización internacional no gubernamental de hablantes de esperanto, organizadora del Congreso Universal y asociada con la UNESCO.',
      en: 'The largest international non-governmental organization for Esperanto speakers, organizer of the World Congress and official partner of UNESCO.'
    },
    tags: ['uea', 'movado', 'kongreso', 'unesko', 'asocio', 'libroservo', 'organization', 'ong'],
    features: {
      eo: ['Organizanto de la Universala Kongreso (UK)', 'Plej granda Libroservo de Esperanto', 'Rilatoj kun UN kaj Unesko', 'Monata Revuo Esperanto'],
      es: ['Organizador del Congreso Universal anual', 'El mayor catálogo de libros (Libroservo)', 'Relaciones oficiales con la ONU y la UNESCO', 'Revista mensual Esperanto'],
      en: ['Organizes the annual World Esperanto Congress', 'World largest Esperanto book depository', 'Consultative status at the UN & UNESCO', 'Monthly journal Esperanto']
    }
  },
  {
    id: 'amikumu-apo',
    title: 'Amikumu - Trovu Esperantistojn Proksime',
    url: 'https://amikumu.com',
    displayUrl: 'amikumu.com',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'app',
    author: 'Chuck Smith & Richard Delamore',
    featured: true,
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'Poŝtelefona apo por trovi kaj babili kun esperantistoj kaj lingvolernantoj vivantaj aŭ vojaĝantaj proksime al via nuna geografia loko.',
      es: 'Aplicación móvil para encontrar y chatear con hablantes de esperanto y aprendices que viven o viajan cerca de tu ubicación actual.',
      en: 'Mobile app to find and chat with Esperanto speakers and language learners living or traveling in your local geographic area.'
    },
    tags: ['amikumu', 'apo', 'renkonti', 'proksime', 'babili', 'mapo', 'amigos', 'chat', 'networking'],
    features: {
      eo: ['Montras esperantistojn laŭ distanco', 'Integra rekta mesaĝilo', 'Loka komunuma organizado', 'Subtenas ĉiujn lingvojn'],
      es: ['Muestra personas ordenadas por proximidad en km', 'Mensajería y chat directo integrado', 'Organización de grupos locales', 'Soporta más de 7.000 lenguas'],
      en: ['Find speakers ranked by physical proximity', 'Built-in private and group messaging', 'Local community meetups', 'Supports 7,000+ languages']
    }
  },

  // LEGADO KAJ LITERATURO (LITERATURE & READING)
  {
    id: 'bitlibroj-esperanto',
    title: 'Bitlibroj.esperanto.es',
    url: 'https://bitlibroj.esperanto.es',
    displayUrl: 'bitlibroj.esperanto.es',
    category: 'literature',
    level: 'A2',
    isFree: true,
    format: 'book',
    author: 'Hispana Esperanto-Federacio (HEF)',
    featured: true,
    languages: ['eo', 'es'],
    description: {
      eo: 'Miloj da senpagaj ciferecaj libroj (EPUB, PDF, MOBI) en Esperanto kaj pri Esperanto, eldonitaj kaj zorge konservitaj de la Hispana Esperanto-Federacio.',
      es: 'Miles de libros digitales gratuitos (EPUB, PDF, MOBI) en esperanto y sobre esperanto, digitalizados y catalogados por la Federación Española de Esperanto.',
      en: 'Thousands of free eBooks (EPUB, PDF, MOBI) in and about Esperanto, lovingly digitized and maintained by the Spanish Esperanto Federation.'
    },
    tags: ['bitlibroj', 'epub', 'pdf', 'senpaga', 'libroj', 'hef', 'elŝutebla', 'ebooks', 'lectura', 'books'],
    features: {
      eo: ['Miloj da libroj en EPUB, PDF kaj MOBI', 'Klasikaj kaj modernaj verkoj', 'Senpaga senkondiĉa elŝuto', 'Bonega ordigo laŭ ĝenroj'],
      es: ['Miles de libros listos para descargar', 'Formatos para eReader, tablet y móvil', 'Descarga directa sin registros', 'Colección cuidada por la HEF'],
      en: ['Thousands of downloadable eBooks', 'Formats for e-readers, phones & tablets', 'Instant direct download without sign-up', 'Carefully curated by the Spanish Fed']
    }
  },
  {
    id: 'gutenberg-esperanto',
    title: 'Projekto Gutenberg en Esperanto',
    url: 'https://www.gutenberg.org/browse/languages/eo',
    displayUrl: 'gutenberg.org/languages/eo',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Project Gutenberg',
    languages: ['eo'],
    description: {
      eo: 'Centoj da publikdomajnaj klasikaj libroj en Esperanto, inkluzive de la fundamentaj tradukoj de L.L. Zamenhof (Hamleto, La Rabistoj, La Batalo de l’ Vivo).',
      es: 'Cientos de libros clásicos de dominio público en esperanto, incluyendo las obras fundacionales traducidas por L.L. Zamenhof.',
      en: 'Hundreds of public-domain classic books in Esperanto, including the foundational literary translations of L.L. Zamenhof.'
    },
    tags: ['gutenberg', 'klasikaĵoj', 'zamenhof', 'literaturo', 'epub', 'publikdomajna', 'classics', 'public domain'],
    features: {
      eo: ['Verkoj de Zamenhof, Kabe, Grabowski', 'Senpagaj formatoj HTML, EPUB, Kindle', 'Historiaj literaturaj ĉefverkoj', 'Libera publika domajno'],
      es: ['Obras de Zamenhof, Kabe y pioneros', 'Formatos libres EPUB, Kindle y HTML', 'Clásicos de la literatura universal', 'Dominio público universal'],
      en: ['Works by Zamenhof, Kabe, and pioneers', 'Free EPUB, Kindle, and HTML formats', 'World literature masterworks', 'Open public domain']
    }
  },
  {
    id: 'originala-literaturo',
    title: 'OLE - Originala Literaturo Esperanta',
    url: 'http://esperanto.net/literaturo/',
    displayUrl: 'esperanto.net/literaturo',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Sten Johansson',
    languages: ['eo'],
    description: {
      eo: 'La plej ampleksa bibliografio kaj gvidilo pri libroj origine verkitaj en Esperanto: romanoj, noveloj, poemoj, teatro kaj biografiaj detaloj pri verkistoj.',
      es: 'La más completa bibliografía y guía sobre obras concebidas y escritas originalmente en esperanto: novelas, poesía, teatro y biografías de autores.',
      en: 'The definitive bibliography and critical overview of literature written originally in Esperanto: novels, short stories, poetry, and author biographies.'
    },
    tags: ['ole', 'originala', 'verkistoj', 'romanoj', 'poezio', 'sten johansson', 'literatura', 'authors'],
    features: {
      eo: ['Recenzoj pri centoj da originalaj libroj', 'Profiloj de gravaj esperantlingvaj aŭtoroj', 'Historia superrigardo de la literaturo', 'Gvidilo por elekti legindaĵojn'],
      es: ['Reseñas de cientos de libros originales', 'Biografías de los principales autores', 'Cronología histórica de la literatura', 'Guía crítica para elegir lecturas'],
      en: ['Reviews of hundreds of original books', 'Biographies of core Esperanto writers', 'Historical overview of literary movements', 'Curated reading recommendations']
    }
  },
  {
    id: 'beletra-almanako',
    title: 'Beletra Almanako',
    url: 'https://beletraalmanako.com',
    displayUrl: 'beletraalmanako.com',
    category: 'literature',
    level: 'C1',
    isFree: false,
    format: 'book',
    author: 'Eldonejo Mondial',
    languages: ['eo'],
    description: {
      eo: 'La gvida beletra revuo en Esperanto aperanta trifoje jare kun originala prozo, poezio, tradukoj el mondaj lingvoj, eseoj kaj profundaj recenzoj.',
      es: 'La revista literaria de referencia en esperanto que se publica tres veces al año con prosa original, poesía, ensayos profundos y crítica literaria.',
      en: 'The premier literary journal in Esperanto published thrice yearly with original prose, poetry, world translations, essays, and scholarly reviews.'
    },
    tags: ['beletra almanako', 'mondial', 'poezio', 'prozo', 'eseoj', 'alta nivelo', 'literary', 'critique'],
    features: {
      eo: ['Elstara originala nuntempa literaturo', 'Tradukoj de mondaj poetoj kaj verkistoj', 'Kritikaj eseoj pri lingvo kaj socio', 'Presita kaj bitlibra aĉeto'],
      es: ['Literatura contemporánea de primer nivel', 'Traducciones de poetas de todo el mundo', 'Ensayos rigurosos sobre lengua y cultura', 'Disponible en papel y digital'],
      en: ['First-tier contemporary original writing', 'Poetic translations from world languages', 'Scholarly cultural and linguistic essays', 'Print and digital availability']
    }
  },

  // KOMUNUMO KAJ BABILEJOJ (COMMUNITY & CHAT)
  {
    id: 'reddit-esperanto',
    title: 'Reddit r/Esperanto',
    url: 'https://www.reddit.com/r/Esperanto/',
    displayUrl: 'reddit.com/r/Esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Reddit Komunumo (70 000+ membroj)',
    featured: true,
    languages: ['eo', 'en'],
    description: {
      eo: 'La plej granda retforumo por Esperanto en la reto kun pli ol 70 000 anoj. Ĉiutagaj diskutoj, demandoj de komencantoj, memeaĵoj kaj novaĵoj.',
      es: 'El mayor foro de debate sobre esperanto en la red con más de 70.000 miembros. Debates diarios, preguntas para principiantes, memes y novedades.',
      en: 'The largest online discussion board for Esperanto with over 70,000 subscribers. Daily discussions, beginner question threads, memes, and news.'
    },
    tags: ['reddit', 'forumo', 'diskuto', 'komencantoj', 'helpo', 'memeoj', 'forum', 'community', 'foro'],
    features: {
      eo: ['70 000+ aktivaj membroj', 'Ĉiusemajna demando-fadeno por komencantoj', 'Bontagaj babiladoj kaj memoj', 'Subteno por novuloj'],
      es: ['Más de 70.000 miembros activos', 'Hilo semanal de ayuda a principiantes', 'Noticias y memes de la comunidad', 'Respuesta rápida a preguntas'],
      en: ['Over 70,000 active subscribers', 'Weekly beginner Q&A thread', 'Community news, links, and memes', 'Rapid community assistance']
    }
  },
  {
    id: 'telegram-esperanto',
    title: 'Telegram Esperanto-Urbo',
    url: 'https://esperanto.io',
    displayUrl: 'esperanto.io',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Komunumo Esperanto-Urbo',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'Ampleksa katalogo de centoj da temaj babilgrupoj en Telegram: pri komencantoj, muziko, scienco, libroj, videoludoj, landoj kaj kulturo.',
      es: 'Directorio completo de cientos de grupos temáticos de Telegram en esperanto: principiantes, ciencia, música, videojuegos, política y tertulia.',
      en: 'Comprehensive directory of hundreds of topical Telegram groups in Esperanto: beginners, science, music, gaming, literature, politics, and culture.'
    },
    tags: ['telegram', 'babilejo', 'grupoj', 'voĉmesaĝoj', 'komunumo', 'chat', 'directorio'],
    features: {
      eo: ['Centoj da temaj grupoj', 'Voĉaj babilejoj en viva tempo', 'Aktiva 24/7 tutmonda komunumo', 'Speciala grupo por komencantoj'],
      es: ['Cientos de grupos temáticos', 'Salas de audio en directo para hablar', 'Comunidad activa 24 horas al día', 'Grupos especiales para aprendices'],
      en: ['Hundreds of specialized subject rooms', 'Live audio chat rooms for speaking practice', 'Active 24/7 global community', 'Dedicated beginner rooms']
    }
  },
  {
    id: 'discord-esperanto',
    title: 'Discord Esperanto-Serviloj',
    url: 'https://discord.gg/esperanto',
    displayUrl: 'discord.gg/esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Esperantujo Discord Komunumo',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Aktivaj voĉaj kaj tekstaj serviloj en Discord por ludi, spekti filmojn kune kaj paroli Esperanton ĉiutage kun junuloj el la tuta mondo.',
      es: 'Servidores activos de voz y texto en Discord para jugar, ver películas y practicar conversación diaria en esperanto con personas de todo el planeta.',
      en: 'Vibrant text and voice Discord servers to game together, watch films, and chat daily in spoken Esperanto with youth from around the globe.'
    },
    tags: ['discord', 'voĉo', 'ludoj', 'junuloj', 'babili', 'paroli', 'gaming', 'voice'],
    features: {
      eo: ['Voĉkanaloj aktivaj ĉiutage', 'Filmnoktoj kaj komputilludado en Esperanto', 'Voĉa asistado por lernantoj', 'Miksaĵo de komencantoj kaj spertuloj'],
      es: ['Canales de voz activos a diario', 'Sesiones de videojuegos y cine', 'Apoyo oral para estudiantes novatos', 'Ambiente juvenil y distendido'],
      en: ['Daily active voice channels', 'Film screenings and online gaming nights', 'Spoken feedback for beginners', 'Welcoming international community']
    }
  },

  // KROMAJ SPECIALAJ ILOJ (EXTRA SPECIALIZED TOOLS)
  {
    id: 'deepl-esperanto',
    title: 'DeepL Tradukilo en Esperanto',
    url: 'https://www.deepl.com/translator',
    displayUrl: 'deepl.com/translator',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'DeepL SE',
    featured: true,
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'La plej preciza artefarit-intelekta maŝintradukilo por traduki tekstojn inter Esperanto kaj pli ol 30 mondaj lingvoj kun rimarkinda natura nuanco.',
      es: 'El traductor automático neuronal más preciso para traducir textos entre el esperanto y más de 30 idiomas con asombrosa fluidez y precisión gramatical.',
      en: 'The leading AI neural translator delivering remarkably accurate and idiomatic translations between Esperanto and 30+ world languages.'
    },
    tags: ['deepl', 'traduko', 'artefarita intelekto', 'maŝintradukado', 'preciza', 'translator', 'traductor'],
    features: {
      eo: ['Rimarkinde preciza artefarita intelekto', 'Subtenas 30+ lingvojn', 'Dokumentotraduko (PDF, Word)', 'Senpaga reta uzo'],
      es: ['Calidad de traducción neuronal superior', 'Compatible con más de 30 idiomas', 'Traducción de archivos PDF y DOCX', 'Uso web gratuito'],
      en: ['Superior neural translation quality', 'Supports 30+ world languages', 'Document translation (PDF, DOCX)', 'Free web translator']
    }
  },
  {
    id: 'akademio-de-esperanto',
    title: 'Akademio de Esperanto (Oficialaj Informoj)',
    url: 'https://www.akademio-de-esperanto.org',
    displayUrl: 'akademio-de-esperanto.org',
    category: 'tools',
    level: 'C1',
    isFree: true,
    format: 'website',
    author: 'Akademio de Esperanto',
    year: '1905-2024',
    languages: ['eo'],
    description: {
      eo: 'La oficiala lingva institucio kiu konservas la fundamentajn principojn de Esperanto, eldonas la Oficialajn Aldonojn kaj decidas pri novaj radikoj.',
      es: 'La institución lingüística oficial que custodia los principios fundamentales del esperanto, aprueba las Adiciones Oficiales y aconseja sobre neologismos.',
      en: 'The official linguistic body that preserves the core principles of Esperanto, publishes Official Additions, and issues recommendations on new roots.'
    },
    tags: ['akademio', 'oficiala', 'fundamento', 'decidoj', 'lingva konsilejo', 'akademianoj', 'academy', 'normas'],
    features: {
      eo: ['Oficialaj decidoj kaj deklaroj', 'Rikolto de la Fundamento de Esperanto', 'Rekomendoj pri landnomoj kaj novaj teknologiaj terminoj', 'Lingva Konsultejo por publikaj demandoj'],
      es: ['Resoluciones y comunicados oficiales', 'Texto íntegro del Fundamento de Esperanto', 'Dictámenes sobre nombres de países y tecnicismos', 'Consultoría lingüística pública'],
      en: ['Official rulings and pronouncements', 'Full text of the historic Fundamento', 'Guidelines on country names and technical terms', 'Public linguistic advice service']
    }
  },
  {
    id: 'muzaiko-radio',
    title: 'Muzaiko - Tutdiurna Reta Radio',
    url: 'https://muzaiko.info',
    displayUrl: 'muzaiko.info',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Muzaiko Asocio',
    languages: ['eo'],
    description: {
      eo: '24-hora seninterrompa reta radiostacio tute en Esperanto, ludanta modernan esperantlingvan muzikon, novaĵojn, intervjuojn kaj podkastojn.',
      es: 'Emisora de radio online continua 24 horas al día íntegramente en esperanto, emitiendo música moderna, noticias, entrevistas y programas culturales.',
      en: '24/7 non-stop internet radio station broadcasting entirely in Esperanto, featuring modern Esperanto songs, international news, and cultural interviews.'
    },
    tags: ['radio', 'muzaiko', 'muziko', '24 horoj', 'kantoj', 'rekta elsendo', 'radio station', 'musica'],
    features: {
      eo: ['24 horoj da muziko kaj novaĵoj senhalte', 'Rikega kolekto de esperanto-kantoj', 'Elsendoj pri mondaj eventoj', 'Aŭskultebla en ajna retumilo aŭ sonludilo'],
      es: ['Música y noticias ininterrumpidas las 24 horas', 'Inmenso repertorio musical en esperanto', 'Programas sobre actualidad internacional', 'Compatible con navegadores y apps de radio'],
      en: ['24-hour continuous stream of music & news', 'Vast catalog of contemporary Esperanto tracks', 'Interviews and international news clips', 'Plays in any browser or media player']
    }
  },
  {
    id: 'vinilkosmo-muziko',
    title: 'Vinilkosmo - Esperanto-Muzika Eldonejo',
    url: 'https://www.vinilkosmo-mp3.com',
    displayUrl: 'vinilkosmo-mp3.com',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Floréal Martorell',
    year: '1990-2024',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'La precipa sendependa muzikeldonejo de Esperanto, ofertanta rokon, popon, hiphopon, folkon kaj elektronikan muzikon de artistoj el la tuta mondo.',
      es: 'La principal discográfica independiente de música en esperanto, con rock, pop, hip-hop, folk y música electrónica de artistas internacionales.',
      en: 'The primary independent music publisher for Esperanto, featuring rock, pop, hip-hop, folk, and electronic music by artists from around the world.'
    },
    tags: ['muziko', 'vinilkosmo', 'kantoj', 'roko', 'popmuziko', 'diskoj', 'music', 'streaming', 'canciones'],
    features: {
      eo: ['Centoj da profesie registritaj albumoj', 'Aŭskulteblaj specimenoj senpage', 'Diversaj muzikstiloj (roko, repo, kanzono, elektronika)', 'Subteno al esperantistaj muzikistoj'],
      es: ['Cientos de álbumes grabados en estudio', 'Escucha previa gratuita de pistas', 'Diversidad de géneros (rock, rap, folk, synth)', 'Apoyo directo a los músicos'],
      en: ['Hundreds of studio-produced albums', 'Free streaming previews', 'Diverse genres (rock, rap, synthpop, folk)', 'Direct support for Esperanto artists']
    }
  },

  // --- PLIAJ KURSOJ KAJ LERNADO (MORE COURSES & LEARNING) ---
  {
    id: 'hef-kursoj',
    title: 'Cursos de la Federación Española de Esperanto',
    url: 'https://www.esperanto.es/que-es-el-esperanto/como-aprender/',
    displayUrl: 'esperanto.es/como-aprender',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'course',
    author: 'Federación Española de Esperanto (HEF)',
    featured: true,
    languages: ['es', 'eo'],
    description: {
      eo: 'Senpagaj kursoj de Esperanto por hispanparolantoj, gvidataj de spertaj instruistoj kun tutoroj kaj memlernaj materialoj.',
      es: 'Cursos gratuitos de esperanto para hispanohablantes organizados por la Federación Española con tutores personales y materiales de autoaprendizaje.',
      en: 'Free Esperanto courses for Spanish speakers organized by the Spanish Esperanto Federation with personal tutors and self-study resources.'
    },
    tags: ['hef', 'hispanio', 'kursoj', 'tutoroj', 'hispana', 'cursos', 'español', 'gratis'],
    features: {
      eo: ['Senpagaj gvidataj kursoj kun persona tutoro', 'Materialoj speciale adaptitaj al hispanlingvanoj', 'Diplometoj kaj atestiloj de HEF', 'Aliro al lokaj grupoj kaj kluboj'],
      es: ['Cursos tutorizados gratuitos con seguimiento personal', 'Materiales adaptados a hablantes de español', 'Diplomas y certificados de la HEF', 'Conexión directa con grupos locales y clubes'],
      en: ['Free tutored courses with personal guidance', 'Materials tailored for native Spanish speakers', 'Certificates from HEF', 'Direct connection with local clubs']
    }
  },
  {
    id: 'lingq-esperanto',
    title: 'LingQ - Lernu Esperanton per Mergo',
    url: 'https://www.lingq.com/en/learn-esperanto-online/',
    displayUrl: 'lingq.com/esperanto',
    category: 'courses',
    level: 'A2',
    isFree: false,
    format: 'app',
    author: 'Steve Kaufmann & LingQ',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Potenca merga metodo de lingvolernado bazita sur legado kaj aŭskultado de aŭtentikaj tekstoj kun sinkronigita voĉo kaj tuja vortkresko.',
      es: 'Potente método de inmersión lingüística basado en la lectura y escucha de textos reales con audio sincronizado y adquisición contextual de vocabulario.',
      en: 'A comprehensive language immersion platform based on reading and listening to authentic Esperanto texts with synchronized audio and smart vocabulary tracking.'
    },
    tags: ['lingq', 'mergo', 'legado', 'aŭskultado', 'vortprovizo', 'inmersion', 'lectura', 'vocabulario'],
    features: {
      eo: ['Miloj da lecionoj kun profesia audio', 'Klaku ajnan vorton por tuj vidi tradukon', 'Spurado de konataj kaj novaj vortoj', 'Sinkronigo inter komputilo kaj poŝtelefono'],
      es: ['Miles de textos con audio profesional sincronizado', 'Haz clic en cualquier palabra para ver su traducción', 'Seguimiento exacto de palabras aprendidas', 'Sincronización web y app móvil'],
      en: ['Thousands of lessons with synchronized native audio', 'Click any word for instant translations', 'Precise tracking of learned vocabulary', 'Sync across web and mobile apps']
    }
  },
  {
    id: 'clozemaster-esperanto',
    title: 'Clozemaster Esperanto',
    url: 'https://www.clozemaster.com/l/epo-eng',
    displayUrl: 'clozemaster.com/epo',
    category: 'courses',
    level: 'B1',
    isFree: true,
    format: 'app',
    author: 'Clozemaster',
    languages: ['eo', 'en', 'es'],
    description: {
      eo: 'Gamigita leksika trejnilo por lerni Esperanton en kunteksto plenigante mankantajn vortojn en miloj da realaj frazoj.',
      es: 'Entrenador de vocabulario gamificado para aprender esperanto en contexto completando palabras que faltan en miles de oraciones reales.',
      en: 'Gamified language training to learn Esperanto in context by filling in missing words across thousands of authentic sentences.'
    },
    tags: ['clozemaster', 'frazoj', 'kunteksto', 'ludo', 'memoro', 'b1', 'b2', 'gamification'],
    features: {
      eo: ['Pli ol 10 000 frazoj el Tatoeba', 'Interspaca ripetado (SRS) por profunda memoro', 'Voĉa elparolo de frazoj', 'Senpaga baza versio'],
      es: ['Más de 10.000 frases reales extraídas de Tatoeba', 'Repetición espaciada (SRS) para fijar el vocabulario', 'Pronunciación auditiva de cada frase', 'Versión básica totalmente gratuita'],
      en: ['Over 10,000 sentences from Tatoeba', 'Spaced repetition system (SRS) for retention', 'Audio pronunciation for sentences', 'Generous free tier']
    }
  },
  {
    id: 'saluton-nu',
    title: 'Saluton! Internacia Vida Kurso',
    url: 'http://saluton.nu',
    displayUrl: 'saluton.nu',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'course',
    author: 'Audorm & Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Rekta vida kurso de Esperanto bazita sur bildoj, ilustritaj situacioj kaj dialogoj sen uzo de naciaj lingvoj.',
      es: 'Curso visual directo de esperanto basado en ilustraciones, situaciones cotidianas y diálogos comprensibles sin necesidad de traducciones.',
      en: 'A direct-method visual Esperanto course based on illustrations, real-world scenes, and dialogues without translating into national languages.'
    },
    tags: ['rekta metodo', 'bildoj', 'ilustrita', 'komencanto', 'vida', 'direct method', 'visual'],
    features: {
      eo: ['Lernado sen tradukado per rekta metodo', 'Ilustritaj lecionoj kaj ekzercoj', 'Baza gramatiko klarigita intuicie', 'Tute senkosta'],
      es: ['Aprendizaje directo sin depender de traducción', 'Lecciones ilustradas y ejercicios visuales', 'Gramática intuitiva y clara', 'Completamente libre'],
      en: ['Direct immersion without relying on translations', 'Illustrated lessons and exercises', 'Intuitive grammar presentation', 'Completely free']
    }
  },
  {
    id: 'drops-esperanto',
    title: 'Drops: Vida Vortprovizo de Esperanto',
    url: 'https://languagedrops.com/language/learn-esperanto',
    displayUrl: 'languagedrops.com/esperanto',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'app',
    author: 'Kahoot! / Drops',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Eleganta kaj vida poŝtelefona aplikaĵo por akiri 3 000+ utilajn esperantajn vortojn per rapidaj 5-minutaj vidaj ludo-sesioj.',
      es: 'Elegante aplicación móvil para memorizar más de 3.000 palabras en esperanto mediante sesiones visuales y dinámicas de 5 minutos al día.',
      en: 'A beautifully designed mobile app to build a foundation of 3,000+ Esperanto words through fast-paced, visual 5-minute daily micro-sessions.'
    },
    tags: ['drops', 'apo', 'vida', 'vortprovizo', '5 minutoj', 'kahoot', 'app', 'vocabulario'],
    features: {
      eo: ['Belaj minimalistaj ilustraĵoj por ĉiu vorto', 'Rapida 5-minuta ĉiutaga ritmo', 'Aŭdio de profesiaj parolantoj', 'Kovras dekojn da temoj de la ĉiutaga vivo'],
      es: ['Ilustraciones minimalistas de alta calidad para cada palabra', 'Sesiones diarias ágiles de 5 minutos', 'Audio de pronunciación clara', 'Decenas de categorías cotidianas'],
      en: ['Minimalist vector illustrations for every word', 'Quick 5-minute daily habit', 'High quality audio recordings', 'Dozens of practical topics']
    }
  },
  {
    id: 'universala-esperanto-metodo',
    title: 'Universala Esperanto-Metodo (D-ro Benson)',
    url: 'https://esperanto-metodo.blogspot.com',
    displayUrl: 'esperanto-metodo.blogspot.com',
    category: 'courses',
    level: 'A2',
    isFree: true,
    format: 'book',
    author: 'D-ro William S. Benson',
    year: '1932',
    languages: ['eo'],
    description: {
      eo: 'La fama historia majstroverko de D-ro Benson kun miloj da miniaturaj desegnaĵoj por lerni la tutan lingvon per bilda kunteksto.',
      es: 'La célebre obra clásica ilustrada del Dr. Benson con miles de grabados y viñetas para aprender el idioma íntegramente mediante contexto visual.',
      en: 'The renowned historic illustrated textbook by Dr. Benson featuring thousands of detailed drawings to learn the entire language through visual context.'
    },
    tags: ['benson', 'metodo', 'klasikaĵo', 'desegnoj', 'bilda', 'historio', 'classic', 'illustrated'],
    features: {
      eo: ['Miloj da detalaj desegnaĵoj', 'Plena kurso de baza ĝis supera nivelo', 'Klasika beletra stilo', 'Senpaga cifereca versio'],
      es: ['Miles de viñetas minuciosamente dibujadas', 'Curso completo desde nivel inicial hasta avanzado', 'Estilo clásico e imperecedero', 'Acceso digital gratuito'],
      en: ['Thousands of detailed vintage illustrations', 'Complete course from basics to fluency', 'Classic Esperanto literary touch', 'Free digital access']
    }
  },

  // --- PLIAJ VORTAROJ KAJ LINGVAJ ILOJ (MORE DICTIONARIES & TOOLS) ---
  {
    id: 'vortaro-diego',
    title: 'Gran Diccionario Español-Esperanto (Fernando de Diego)',
    url: 'https://www.esperanto.es/vortaro/',
    displayUrl: 'esperanto.es/vortaro',
    category: 'tools',
    level: 'B1',
    isFree: true,
    format: 'tool',
    author: 'Fernando de Diego & Federación Española de Esperanto',
    featured: true,
    languages: ['es', 'eo'],
    description: {
      eo: 'La plej ampleksa kaj aŭtoritata vortaro hispana-esperanta kun pli ol 50 000 kapvortoj, proverboj, idiotismoj kaj ekzemploj de Fernando de Diego.',
      es: 'El diccionario bilingüe español-esperanto más exhaustivo y prestigioso del mundo, con más de 50.000 entradas, locuciones, modismos y ejemplos literarios.',
      en: 'The most comprehensive and authoritative Spanish-Esperanto bilingual dictionary in the world, with over 50,000 entries and rich idiomatic phrases.'
    },
    tags: ['fernando de diego', 'vortaro', 'hispana', 'diccionario', 'bilingüe', 'referencia', 'espanol'],
    features: {
      eo: ['Pli ol 50 000 kapvortoj kaj tradukoj', 'Rikega kolekto de hispanaj proverboj kaj esprimoj', 'Tujserĉilo enreta de HEF', 'Fundamenta referenco por tradukistoj'],
      es: ['Más de 50.000 entradas y modismos', 'Repertorio inigualable de frases hechas y proverbios', 'Buscador online rápido desarrollado por la HEF', 'Herramienta de referencia para traductores'],
      en: ['Over 50,000 entries and idioms', 'Unmatched coverage of proverbs and nuanced expressions', 'Fast online search interface by HEF', 'Indispensable reference for translators']
    }
  },
  {
    id: 'komputeko',
    title: 'Komputeko - Prikomputila Terminaro',
    url: 'https://komputeko.net',
    displayUrl: 'komputeko.net',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Yves Nevelsteen & E@I',
    languages: ['eo', 'en', 'es', 'fr', 'de', 'nl'],
    description: {
      eo: 'La oficiala terminaro por komputiko, informatiko, interreto, programado kaj poŝtelefonoj kun proponoj en Esperanto por miloj da teknikaj terminoj.',
      es: 'El glosario terminológico oficial para informática, desarrollo de software, ciberseguridad e internet en esperanto.',
      en: 'The definitive specialized dictionary for computing, software engineering, internet technology, and gadgets in Esperanto.'
    },
    tags: ['komputeko', 'komputiko', 'terminaro', 'teknologio', 'programado', 'tech', 'software', 'computing'],
    features: {
      eo: ['Miloj da informatikaj kaj teĥnikaj terminoj', 'Multlingvaj ekvivalentoj (angla, hispana, franca)', 'Aprobita de fakaj tradukistoj kaj E@I', 'Rapida serĉado per klavoj'],
      es: ['Miles de tecnicismos informáticos y de software', 'Equivalencias multilingües (español, inglés, etc.)', 'Revisado por E@I y traductores técnicos', 'Búsqueda instantánea'],
      en: ['Thousands of technical & IT terms', 'Multilingual equivalents across major languages', 'Curated by E@I and software localizers', 'Instant keyboard lookup']
    }
  },
  {
    id: 'glosbe-esperanto',
    title: 'Glosbe Vortaro & Paralelej Frazoj',
    url: 'https://glosbe.com/eo',
    displayUrl: 'glosbe.com/eo',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Glosbe Komunumo',
    languages: ['eo', 'es', 'en', 'fr', 'de', 'pt'],
    description: {
      eo: 'Multlingva reta vortaro kun milionoj da realaj paralelaj tradukitaj frazoj por vidi kiel ajna vorto estas uzata en diversaj kuntekstoj.',
      es: 'Diccionario multilingüe con millones de oraciones traducidas en paralelo para comprobar el contexto exacto de cada término.',
      en: 'A massive multilingual dictionary with millions of parallel translation memory sentences showing words used in living context.'
    },
    tags: ['glosbe', 'vortaro', 'frazoj', 'kunteksto', 'paralela', 'dictionary', 'traductor'],
    features: {
      eo: ['Milionoj da paralelaj frazoj', 'Subtenas tradukojn al kaj el centoj da lingvoj', 'Sonprononco por multaj vortoj', 'Ekzemploj el oficialaj dokumentoj kaj beletro'],
      es: ['Millones de oraciones paralelas traducidas', 'Soporta combinaciones con cientos de idiomas', 'Grabaciones de voz para miles de términos', 'Ejemplos de textos jurídicos, novelas y páginas web'],
      en: ['Millions of parallel bilingual sentences', 'Supports translation to and from hundreds of languages', 'Native audio recordings', 'Examples drawn from literature and translations']
    }
  },
  {
    id: 'lexilogos-esperanto',
    title: 'Lexilogos Reta Esperanto-Klavaro & Iloj',
    url: 'https://www.lexilogos.com/keyboard/esperanto.htm',
    displayUrl: 'lexilogos.com/keyboard/esperanto',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Lexilogos',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'Reta virtuala klavaro por facile tajpi la supersignajn literojn (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ) en ajna komputilo aŭ poŝtelefono sen instali ion ajn.',
      es: 'Teclado virtual online para escribir con soltura los caracteres con acento diacrítico (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ) en cualquier ordenador o móvil sin instalar nada.',
      en: 'Online virtual keyboard to easily type Esperanto diacritics (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ) on any computer or mobile browser without installing software.'
    },
    tags: ['klavaro', 'supersignoj', 'tajpi', 'cx', 'lexilogos', 'keyboard', 'teclado'],
    features: {
      eo: ['Klavaro por tajpi ĉapeletojn per ununura klako', 'Aŭtomata konvertilo de x-sistemo al veraj literoj', 'Kopiu tekston per unu butono', 'Ligoj al dekoj da Esperanto-vortaroj'],
      es: ['Teclado virtual con caracteres especiales a un clic', 'Convertidor de sistema x a diacríticos reales', 'Copia directa al portapapeles', 'Enlaces a numerosos diccionarios de referencia'],
      en: ['One-click diacritic keyboard input', 'Converts x-system to genuine diacritics', 'One-click copy to clipboard', 'Quick links to reference resources']
    }
  },
  {
    id: 'esperantilo-ilo',
    title: 'Esperantilo - Redaktilo kun Ortografia Korektilo',
    url: 'https://www.esperantilo.org',
    displayUrl: 'esperantilo.org',
    category: 'tools',
    level: 'B1',
    isFree: true,
    format: 'tool',
    author: 'Igor Wasilewski',
    languages: ['eo', 'de', 'en'],
    description: {
      eo: 'Ampleksa tekstoredaktilo por Esperanto kun enkonstruita ortografia literumilo, gramatika analizilo, vortaro kaj tradukhelpilo.',
      es: 'Completo editor de texto para esperanto con corrector ortográfico avanzado, analizador sintáctico, diccionarios integrados y asistente de traducción.',
      en: 'A feature-rich text editor tailored for Esperanto with built-in spell checker, syntax analyzer, integrated dictionaries, and translation tools.'
    },
    tags: ['redaktilo', 'literumilo', 'korektilo', 'gramatiko', 'analizilo', 'editor', 'corrector'],
    features: {
      eo: ['Profesia literumilo por Esperanto', 'Morfologia kaj sintaksa analizo de frazoj', 'Integriĝo kun PIV kaj ReVo', 'Disponebla por Windows kaj Linukso'],
      es: ['Corrector ortográfico especializado', 'Análisis sintáctico y morfológico de frases complejas', 'Integración con PIV y ReVo', 'Disponible para Windows y Linux'],
      en: ['Specialized Esperanto spell-checker', 'Morphological and syntactic sentence parser', 'Integrated PIV and ReVo lookups', 'Available for Windows and Linux']
    }
  },
  {
    id: 'lingva-konsultejo',
    title: 'Lingva Konsultejo de la Akademio de Esperanto',
    url: 'https://www.akademio-de-esperanto.org/lingva_konsultejo/',
    displayUrl: 'akademio-de-esperanto.org/lingva_konsultejo',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Akademio de Esperanto',
    languages: ['eo'],
    description: {
      eo: 'Publika servo de la Akademio kie lingvaj spertuloj respondas al demandoj kaj publikigas oficialajn respondojn pri gramatiko, vortuzo kaj stilo.',
      es: 'Servicio oficial de la Academia de Esperanto donde lingüistas responden a dudas de usuarios y publican respuestas autorizadas sobre gramática y uso del léxico.',
      en: 'The official advisory service of the Academy of Esperanto where academy linguists resolve language doubts and publish authoritative rulings.'
    },
    tags: ['konsultejo', 'akademio', 'duboj', 'respondoj', 'sintakso', 'gramatiko', 'consultas', 'normas'],
    features: {
      eo: ['Centoj da arkivitaj respondoj pri oftaj duboj', 'Ebleco sendi novajn lingvajn demandojn al la Akademio', 'Aŭtoritataj decidoj pri lingvaj problemoj', 'Publika serĉebla indekso'],
      es: ['Cientos de dictámenes archivados sobre dudas frecuentes', 'Posibilidad de enviar consultas lingüísticas directas', 'Decisiones fundamentadas en el Fundamento', 'Archivo público con buscador temático'],
      en: ['Hundreds of archived answers to common grammatical queries', 'Ability to submit linguistic questions to Academicians', 'Authoritative recommendations rooted in the Fundamento', 'Searchable archive']
    }
  },

  // --- PLIAJ NOVAĴOJ KAJ PERIODAĴOJ (MORE NEWS & PERIODICALS) ---
  {
    id: 'global-voices-eo',
    title: 'Global Voices en Esperanto',
    url: 'https://eo.globalvoices.org',
    displayUrl: 'eo.globalvoices.org',
    category: 'news',
    level: 'A2',
    isFree: true,
    format: 'website',
    author: 'Global Voices Civitana Komunumo',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'Sendependa internacia civitana novaĵportalo tradukita al Esperanto, rakontanta historiojn de malpli reprezentataj popoloj kaj komunumoj.',
      es: 'Portal internacional de periodismo ciudadano e historias globales traducidas al esperanto, con foco en comunidades y culturas poco visibilizadas.',
      en: 'Independent international citizen journalism news outlet translated into Esperanto, highlighting stories from underrepresented communities worldwide.'
    },
    tags: ['global voices', 'novaĵoj', 'mondo', 'civitana', 'ĵurnalismo', 'news', 'periodismo', 'articulos'],
    features: {
      eo: ['Artikoloj pri kulturo, homaj rajtoj kaj medio', 'Facile legebla moderna lingvaĵo', 'Senkosta kaj malfermita licenco', 'Verkita de lokaj loĝantoj el 160+ landoj'],
      es: ['Artículos sobre derechos humanos, culturas y ecología', 'Lenguaje fluido y accesible para niveles intermedios', 'Licencia abierta y gratuita', 'Redacción de autores locales de más de 160 países'],
      en: ['Stories on human rights, local cultures, and environment', 'Accessible writing style great for reading practice', 'Creative Commons open license', 'Authored by local voices in 160+ countries']
    }
  },
  {
    id: 'monde-diplomatique-eo',
    title: 'Le Monde diplomatique en Esperanto',
    url: 'https://eo.mondediplo.com',
    displayUrl: 'eo.mondediplo.com',
    category: 'news',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Le Monde Diplomatique / SAT',
    featured: true,
    languages: ['eo', 'fr', 'es'],
    description: {
      eo: 'La esperanta eldono de la prestiĝa internacia monata gazeto pri geopolitiko, ekonomio, socio kaj internaciaj rilatoj.',
      es: 'La edición en esperanto del prestigioso periódico internacional sobre geopolítica, economía crítica, relaciones internacionales y sociedad.',
      en: 'The Esperanto edition of the prestigious international monthly journal covering geopolitics, critical economics, and global affairs.'
    },
    tags: ['mondediplo', 'geopolitiko', 'ekonomio', 'profunda', 'b2', 'c1', 'geopolitica', 'ensayos'],
    features: {
      eo: ['Profundaj analizoj de tutmondaj fakuloj', 'Rikega kaj preciza faka vortprovizo', 'Senpage konsultebla enreta arkivo', 'Tradukoj de internacia kvalito'],
      es: ['Análisis en profundidad de expertos internacionales', 'Vocabulario político y económico riguroso', 'Archivo online de acceso libre', 'Traducción de primer nivel'],
      en: ['In-depth analyses from international thinkers', 'Rich vocabulary for politics and sociology', 'Free searchable online archive', 'High editorial quality']
    }
  },
  {
    id: 'el-popola-cinio',
    title: 'El Popola Ĉinio (Ĉina Reta Informocentro)',
    url: 'http://esperanto.china.org.cn',
    displayUrl: 'esperanto.china.org.cn',
    category: 'news',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'El Popola Ĉinio Redakcio',
    year: '1950-2024',
    languages: ['eo'],
    description: {
      eo: 'Historia oficiala novaĵretejo kaj revuo eldonata en Pekino ekde 1950 kun novaĵoj, fotoj, raportoj kaj podkastoj pri vivo, arto kaj kulturo.',
      es: 'Histórico portal informativo y revista publicada en Pekín desde 1950, con noticias de actualidad, reportajes culturales, fotos y audios.',
      en: 'Historic official news portal and cultural magazine published in Beijing since 1950, providing news reports, cultural articles, and podcasts in Esperanto.'
    },
    tags: ['ĉinio', 'el popola cinio', 'azia', 'fotoj', 'novaĵoj', 'revuo', 'china', 'noticias'],
    features: {
      eo: ['Novaĵoj ĝisdatigataj ĉiutage', 'Rikega kultura kaj historia enhavo', 'Sondosieroj kaj videoj kun subtitoloj', 'Unu el la plej aĝaj esperantlingvaj gazetoj en Azio'],
      es: ['Actualización diaria de noticias', 'Extensa sección de historia y tradiciones', 'Reportajes en vídeo y audio', 'Uno de los medios en esperanto más veteranos de Asia'],
      en: ['Daily updated news dispatches', 'Rich cultural and historical documentation', 'Audio reports and subtitled videos', 'One of the longest-running outlets in Asia']
    }
  },
  {
    id: 'la-ondo-de-esperanto',
    title: 'La Ondo de Esperanto & Sezonoj',
    url: 'https://sezonoj.ru',
    displayUrl: 'sezonoj.ru',
    category: 'news',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Aleksander Korĵenkov & Halina Gorecka',
    year: '1991-2024',
    languages: ['eo'],
    description: {
      eo: 'Ampleksa socikultura revuo kaj novaĵportalo kun beletraj recenzoj, intervjuoj, historiaj esploroj kaj la fama premio "Esperantisto de la Jaro".',
      es: 'Prestigiosa revista sociocultural y portal de noticias con ensayos literarios, reseñas, investigaciones históricas y el premio "Esperantista del Año".',
      en: 'A major sociocultural magazine and news portal featuring literary reviews, interviews, historical essays, and the annual "Esperantist of the Year" award.'
    },
    tags: ['sezonoj', 'ondo', 'recenzoj', 'literaturo', 'esperantisto de la jaro', 'periodismo', 'cultura'],
    features: {
      eo: ['Organizanto de la elekto Esperantisto de la Jaro', 'Centoj da recenzoj pri novaj libroj', 'Elŝuteblaj senpagaj libroj en PDF', 'Profunda movada ĵurnalismo'],
      es: ['Convocante del galardón Esperantista del Año', 'Cientos de reseñas de novedades editoriales', 'Libros descargables de regalo en PDF', 'Periodismo cultural de fondo'],
      en: ['Organizers of the annual Esperantist of the Year award', 'Hundreds of book reviews', 'Free downloadable books in PDF', 'In-depth cultural reporting']
    }
  },
  {
    id: 'boletin-hef',
    title: 'Boletín de la Federación Española de Esperanto',
    url: 'https://www.esperanto.es/boletin/',
    displayUrl: 'esperanto.es/boletin',
    category: 'news',
    level: 'A2',
    isFree: true,
    format: 'book',
    author: 'Federación Española de Esperanto',
    year: '1949-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'La historia oficiala bulteno de la hispana movado, aperanta seninterrompe ekde 1949 kun artikoloj, kongresaj raportoj kaj beletro en la hispana kaj Esperanto.',
      es: 'La revista oficial de la Federación Española de Esperanto, publicada de forma continua desde 1949, con artículos bilingües, crónica de congresos y cultura.',
      en: 'The official journal of the Spanish Esperanto Federation, published continuously since 1949, featuring bilingual articles, history, and congress chronicles.'
    },
    tags: ['boletin', 'hef', 'hispanio', 'bulteno', 'revuo', 'historio', 'revista', 'españa'],
    features: {
      eo: ['Artikoloj dulingvaj en la hispana kaj Esperanto', 'Plena arkivo elŝutebla en PDF', 'Kronikoj de naciaj kaj internaciaj kongresoj', 'Recenzoj kaj kulturaj anoncoj'],
      es: ['Artículos bilingües en español y esperanto ideales para practicar', 'Archivo histórico completo descargable en PDF', 'Crónicas de los congresos nacionales', 'Reseñas literarias y convocatorias'],
      en: ['Bilingual articles in Spanish & Esperanto perfect for learners', 'Complete digital archive available in PDF', 'National congress chronicles', 'Book reviews and cultural notices']
    }
  },
  {
    id: 'sennaciulo-sat',
    title: 'Sennaciulo & Sennacieca Asocio Tutmonda',
    url: 'https://sennacieca.org',
    displayUrl: 'sennacieca.org',
    category: 'news',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Sennacieca Asocio Tutmonda (SAT)',
    year: '1921-2024',
    languages: ['eo'],
    description: {
      eo: 'La historia organo de la internacia laborista Esperanto-asocio fondita de Eŭgeno Lanti, dediĉita al socia justeco, kontraŭmilitarismo kaj laboristaj rajtoj.',
      es: 'El órgano de la Asociación Anacional Mundial fundada por Eugène Lanti, centrado en la justicia social, el movimiento obrero, el pacifismo y el internacionalismo.',
      en: 'The historic periodical of the World Anational Association founded by Eugène Lanti, dedicated to social justice, labor rights, and internationalism.'
    },
    tags: ['sat', 'sennaciulo', 'lanti', 'laborista', 'socia justeco', 'internaciismo', 'historia', 'ensayos'],
    features: {
      eo: ['Pli ol 100 jaroj da historio ekde 1921', 'Artikoloj pri laboro, ekologio kaj paco', 'Eldonanto de la Plena Ilustrita Vortaro (PIV)', 'Kongresaj raportoj kaj debatoj'],
      es: ['Más de 100 años de trayectoria ininterrumpida', 'Temas de ecología, trabajo digno y derechos civiles', 'Entidad editora del monumental PIV', 'Foro de debate internacionalista'],
      en: ['Over 100 years of active publishing since 1921', 'Focus on labor rights, ecology, and peace', 'Publisher of the definitive PIV dictionary', 'Debate forum for international issues']
    }
  },
  {
    id: 'revuo-esperanto-uea',
    title: 'Revuo Esperanto (Oficiala Organo de UEA)',
    url: 'https://uea.org/revuo',
    displayUrl: 'uea.org/revuo',
    category: 'news',
    level: 'B1',
    isFree: false,
    format: 'book',
    author: 'Universala Esperanto-Asocio',
    year: '1905-2024',
    languages: ['eo'],
    description: {
      eo: 'La precipa monata revuo de la tutmonda Esperanto-movado, eldonata ekde 1905 kun raportoj el pli ol 120 landoj, intervjuoj kaj kulturaj artikoloj.',
      es: 'La revista mensual de referencia del movimiento esperantista mundial, publicada por la UEA desde 1905 con crónicas de más de 120 países y temas culturales.',
      en: 'The flagship monthly publication of the global Esperanto community, published by UEA since 1905 with dispatches from over 120 countries.'
    },
    tags: ['uea', 'revuo', 'oficiala', 'internacia', 'roterdamo', 'monata', 'magazine', 'global'],
    features: {
      eo: ['Oficiala organo de UEA ekde 1905', 'Monataj raportoj el ĉiuj kontinentoj', 'Recenzoj de libroj kaj kulturaj analizoj', 'Cifereca eldono por membroj'],
      es: ['Revista oficial de la UEA desde 1905', 'Crónicas mensuales de todos los continentes', 'Reseñas de novedades y entrevistas a personalidades', 'Edición digital y en papel'],
      en: ['Official journal of UEA since 1905', 'Monthly dispatches from all world regions', 'Interviews and literary essays', 'Digital edition for members']
    }
  },

  // --- PLIA LITERATURO KAJ CIFERECAJ BIBLIOTEKOJ (MORE LITERATURE & LIBRARIES) ---
  {
    id: 'bitoteko-hef',
    title: 'Bitoteko de la Federación Española de Esperanto',
    url: 'https://bitoteko.esperanto.es',
    displayUrl: 'bitoteko.esperanto.es',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'book',
    author: 'Hispana Esperanto-Federacio (HEF)',
    featured: true,
    languages: ['es', 'eo'],
    description: {
      eo: 'Grandega cifereca biblioteko kun miloj da skanitaj libroj, historiaj revuoj, manuskriptoj, fotoj kaj sonarkivoj libere elŝuteblaj.',
      es: 'Inmensa biblioteca digital con miles de libros digitalizados, revistas históricas, manuscritos, fotografías y archivos sonoros de libre descarga.',
      en: 'Enormous digital library featuring thousands of scanned books, historic periodicals, rare manuscripts, photographs, and audio recordings freely downloadable.'
    },
    tags: ['bitoteko', 'biblioteko', 'skanita', 'pdf', 'arkivo', 'hef', 'libros', 'biblioteca', 'descargas'],
    features: {
      eo: ['Miloj da tutaj libroj en PDF tute senpage', 'Kompleta kolekto de hispanaj kaj internaciaj periodaĵoj', 'Historiaj fotoj kaj afiŝoj el kongresoj', 'Potenca serĉilo laŭ aŭtoroj kaj temoj'],
      es: ['Miles de libros completos en PDF de acceso libre', 'Hemeroteca histórica con colecciones completas', 'Fototeca y cartelería de congresos', 'Potente buscador por autor, año y materia'],
      en: ['Thousands of full-text books in PDF for free', 'Historic periodicals and magazine runs', 'Congress photo archives and vintage posters', 'Comprehensive author and subject search']
    }
  },
  {
    id: 'katalogo-uea',
    title: 'Libroservo de UEA (Reta Librobutiko)',
    url: 'https://katalogo.uea.org',
    displayUrl: 'katalogo.uea.org',
    category: 'literature',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Universala Esperanto-Asocio',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'La plej granda libroservo de Esperanto en la mondo, kun katalogo de pli ol 6 000 libroj, vortaroj, KD-oj, lerniloj kaj insignoj sendataj tutmonde.',
      es: 'La mayor librería de esperanto del mundo, con un catálogo de más de 6.000 títulos en papel y digital, diccionarios, música y material didáctico.',
      en: 'The largest Esperanto bookstore in the world, maintaining a catalog of over 6,000 books, dictionaries, audio CDs, games, and merchandise shipped globally.'
    },
    tags: ['libroservo', 'uea', 'butiko', 'libroj', 'aĉeti', 'katalogo', 'libreria', 'store'],
    features: {
      eo: ['Pli ol 6 000 titoloj en stoko', 'Mondvasta sendo al ĉiuj landoj', 'Recenzoj kaj detalaj bibliografiaj priskriboj', 'E-libroj elŝuteblaj tuj post aĉeto'],
      es: ['Más de 6.000 títulos en catálogo', 'Envíos internacionales a cualquier país', 'Descripciones bibliográficas completas', 'E-books descargables al instante'],
      en: ['Over 6,000 titles in stock', 'Worldwide shipping to every continent', 'Detailed bibliographical records and reviews', 'Instant digital e-book downloads']
    }
  },
  {
    id: 'elibrejo-luin',
    title: 'eLibrejo de Franko Luin',
    url: 'https://www.elibrejo.esperanto.se',
    displayUrl: 'elibrejo.esperanto.se',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Franko Luin & Inko Eldonejo',
    languages: ['eo'],
    description: {
      eo: 'Pionira cifereca biblioteko de eldonejo Inko, proponanta centojn da bone formatitaj libroj en PDF por senpaga elŝutado kaj legado.',
      es: 'Biblioteca digital pionera creada por la editorial Inko, que ofrece cientos de obras clásicas y modernas bellamente maquetadas en PDF de libre descarga.',
      en: 'A pioneering digital library created by publisher Inko, offering hundreds of classic and modern literary works formatted in high-quality PDF for free.'
    },
    tags: ['elibrejo', 'inko', 'franko luin', 'pdf', 'senpaga', 'klasikaĵoj', 'ebooks', 'libros'],
    features: {
      eo: ['Centoj da libroj en bela tipo-aranĝo', 'Tradukoj de mondaj majstroverkoj (Shakespeare, Goethe, Poe)', 'Originalaj romanoj de famaj esperantistoj', 'Tute senpage elŝuteblaj'],
      es: ['Cientos de obras con maquetación tipográfica de calidad', 'Traducciones de obras maestras (Shakespeare, Cervantes, Poe)', 'Novelas originales de la literatura en esperanto', 'Descarga directa libre y gratuita'],
      en: ['Hundreds of books with professional typography', 'World literary classics translated into Esperanto', 'Original Esperanto novels and poetry', 'Direct free download without registration']
    }
  },
  {
    id: 'verkoj-com',
    title: 'Verkoj.com - Literaturo kaj Beletro',
    url: 'https://verkoj.com',
    displayUrl: 'verkoj.com',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Verkoj Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Reta beletra portalo kun miloj da poemoj, noveloj, dramoj kaj artikoloj de la plej gravaj verkistoj de la esperanta literaturo.',
      es: 'Portal literario online con miles de poemas, cuentos, obras teatrales y ensayos de los más ilustres autores de las letras en esperanto.',
      en: 'An online literary repository hosting thousands of poems, short stories, plays, and critical essays by prominent figures in Esperanto literature.'
    },
    tags: ['verkoj', 'poezio', 'noveloj', 'beletro', 'aŭtoroj', 'zamenhof', 'literatura', 'poesia'],
    features: {
      eo: ['Miloj da beletraj tekstoj facile legeblaj en retumilo', 'Klasifikitaj laŭ aŭtoroj kaj ĝenroj', 'Ideala por mezaj kaj altnivelaj legantoj', 'Senkosta aliro'],
      es: ['Miles de textos literarios legibles directamente en el navegador', 'Clasificados por autor, época y género', 'Ideal para enriquecer vocabulario y estilo', 'Acceso libre'],
      en: ['Thousands of literary works readable directly in browser', 'Organized by author, era, and literary genre', 'Superb for intermediate and advanced readers', 'Free access']
    }
  },
  {
    id: 'literaturo-org',
    title: 'Literaturo.org (Klasika Arkivo)',
    url: 'https://literaturo.org',
    displayUrl: 'literaturo.org',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Literaturo Reta Arkivo',
    languages: ['eo'],
    description: {
      eo: 'Rikega arkivo de historiaj esperantaj verkoj: la plena verkaro de Zamenhof, Kabe, Grabowski, Kalocsay kaj aliaj fondintoj de la beletra tradicio.',
      es: 'Archivo clásico de las obras cumbre del esperanto: los textos completos de Zamenhof, Kabe, Grabowski, Kalocsay y los grandes poetas fundacionales.',
      en: 'An archive of classical Esperanto works: complete writings of Zamenhof, Kabe, Grabowski, Kalocsay, and founders of the literary tradition.'
    },
    tags: ['klasikaĵo', 'zamenhof', 'kabe', 'grabowski', 'fondintoj', 'historio', 'clasicos'],
    features: {
      eo: ['Kompletaj originalaj verkoj de L.L. Zamenhof', 'Fundamenta Krestomatio kaj tradukoj', 'Tekstoj en pura HTML atingeblaj sur ajna aparato', 'Akademia kaj fidinda transskribo'],
      es: ['Obras originales completas del Dr. Zamenhof', 'La Fundamenta Krestomatio y traducciones célebres', 'Formato HTML ligero y legible en cualquier dispositivo', 'Transcripción fiel y académica'],
      en: ['Complete original works by L.L. Zamenhof', 'Fundamenta Krestomatio and milestone translations', 'Lightweight HTML accessible on any device', 'Textually verified accurate transcriptions']
    }
  },
  {
    id: 'wikisource-esperanto',
    title: 'Vikifontaro en Esperanto (Wikisource)',
    url: 'https://eo.wikisource.org',
    displayUrl: 'eo.wikisource.org',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La libera reta biblioteko de Vikimedio enhavanta milojn da fontotekstoj en Esperanto, historiaj dokumentoj, poemaroj kaj libroj en publika havaĵo.',
      es: 'La biblioteca libre de Wikimedia con miles de textos fuente en esperanto, documentos históricos, colecciones de poesía y libros en dominio público.',
      en: 'The free Wikimedia digital library holding thousands of source texts in Esperanto, historic documents, poetry anthologies, and public-domain books.'
    },
    tags: ['vikifontaro', 'wikisource', 'fontotekstoj', 'publika havaĵo', 'libera', 'biblioteca'],
    features: {
      eo: ['Milor da fontotekstoj en publika havaĵo', 'Kompilitaj kaj reviziitaj de volontuloj', 'Elŝuteblaj en EPUB, MOBI kaj PDF', 'Rikega kolekto de fruaj esperantaj libroj'],
      es: ['Miles de textos en dominio público', 'Revisados minuciosamente por la comunidad', 'Exportables a formatos EPUB, MOBI y PDF', 'Invaluable colección de las primeras publicaciones'],
      en: ['Thousands of public-domain source texts', 'Proofread and formatted by volunteers', 'Exportable to EPUB, Kindle MOBI, and PDF', 'Rich collection of early historic editions']
    }
  },
  {
    id: 'claude-piron-verkoj',
    title: 'Claude Piron - Psikologiaj kaj Lingvaj Artikoloj',
    url: 'http://claude.piron.free.fr',
    displayUrl: 'claude.piron.free.fr',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Claude Piron (Psikologo & UN-Tradukisto)',
    featured: true,
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'La oficiala retejo de la mondfama svisa psikologo kaj tradukisto de UN Claude Piron, kun majstraj eseoj pri lingva psikologio kaj lingva egaleco.',
      es: 'Página oficial del célebre psicólogo suizo y traductor de la ONU Claude Piron, con brillantes ensayos sobre psicología del lenguaje y justicia lingüística.',
      en: 'The website of world-renowned Swiss psychologist and UN translator Claude Piron, offering insightful essays on language psychology and communication fairness.'
    },
    tags: ['claude piron', 'psikologio', 'lingva justeco', 'un', 'eseoj', 'psicologia', 'justicia linguistica'],
    features: {
      eo: ['Artikoloj pri kial Esperanto estas pli facila kaj natura', 'Eseoj pri lingvaj baroj en internaciaj rilatoj', 'Tekstoj en la franca, angla, hispana kaj Esperanto', 'Aŭtenta psikologia analizo de lingvolernado'],
      es: ['Artículos lúcidos sobre por qué el esperanto es natural y expresivo', 'Ensayos sobre las barreras comunicativas en la diplomacia', 'Disponible en español, francés, inglés y esperanto', 'Reflexión imprescindible sobre el aprendizaje de idiomas'],
      en: ['Insightful essays on why Esperanto feels natural and flexible', 'Analyses of language barriers in international relations', 'Texts available in Spanish, English, French, and Esperanto', 'Groundbreaking perspective on second-language acquisition']
    }
  },

  // --- PLIAJ AŬDVIDAJ RIMEDOJ KAJ PODKASTOJ (MORE AUDIO, PODCASTS & VIDEO) ---
  {
    id: 'varsovia-vento',
    title: 'Varsovia Vento - Junulara Podkasto',
    url: 'https://vento.castos.com',
    displayUrl: 'vento.castos.com',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Varsovia Vento Komunumo',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'Vigla kaj distra podkasto el Pollando kun intervjuoj de vojaĝantoj, muziko, raportoj el junularaj renkontiĝoj kaj bona humuro.',
      es: 'Dinámico y divertido podcast juvenil desde Varsovia con entrevistas a viajeros, música actual, crónicas de festivales y excelente humor.',
      en: 'A lively and entertaining youth podcast from Poland featuring interviews with international travelers, indie music, festival chronicles, and humor.'
    },
    tags: ['podkasto', 'varsovia vento', 'junuloj', 'muziko', 'intervjuoj', 'pollando', 'podcast'],
    features: {
      eo: ['Dudekjara historio de elsendoj kun altkvalita sono', 'Muziko de sendependaj esperanto-artistoj', 'Intervjuoj kun aktivuloj el la tuta mondo', 'Elŝutebla en Spotify, Apple Podcasts kaj Castos'],
      es: ['Más de dos décadas de emisiones con sonido profesional', 'Música de creadores independientes en esperanto', 'Entrevistas a viajeros de todo el mundo', 'Disponible en Spotify, Apple Podcasts y web'],
      en: ['Over two decades of high quality audio productions', 'Spotlights independent Esperanto musicians', 'Interviews with activists worldwide', 'Available on Spotify, Apple Podcasts, and web']
    }
  },
  {
    id: 'pola-retradio',
    title: 'Pola Retradio en Esperanto',
    url: 'https://pola-retradio.org',
    displayUrl: 'pola-retradio.org',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Barbara Pietrzak & Redakcio',
    languages: ['eo'],
    description: {
      eo: 'Regulaj duonhoraj elsendoj dufoje semajne kun kulturaj novaĵoj, intervjuoj, felietonoj pri historio kaj scienco, kaj lingva klareco.',
      es: 'Emisiones periódicas de 30 minutos dos veces por semana con actualidad cultural, entrevistas, crónicas de historia y ciencia con dicción impecable.',
      en: 'Regular half-hour broadcasts twice a week featuring cultural news, interviews, essays on history and science, spoken with pristine pronunciation.'
    },
    tags: ['pola retradio', 'varsovio', 'radielsendoj', 'kulturo', 'klara voĉo', 'podcast', 'radio'],
    features: {
      eo: ['Du novaj elsendoj ĉiun semajnon', 'Klara kaj modela prononco de Barbara Pietrzak', 'Plenaj tekstoj akompanantaj la sonon', 'Podkasto elŝutebla por lernantoj'],
      es: ['Dos nuevas emisiones cada semana', 'Pronunciación modelo y clara, idónea para estudiantes', 'Transcripciones textuales que acompañan al audio', 'Disponible como podcast descargable'],
      en: ['Two new broadcasts every single week', 'Exemplary diction ideal for listening practice', 'Full transcripts accompanying each episode', 'Downloadable podcast feed']
    }
  },
  {
    id: 'radio-havano-kubo',
    title: 'Radio Havano Kubo en Esperanto',
    url: 'https://www.radiohc.cu/eo',
    displayUrl: 'radiohc.cu/eo',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Radio Havano Kubo',
    year: '1962-2024',
    languages: ['eo', 'es'],
    description: {
      eo: 'Oficialaj elsendoj el Kubo en Esperanto ekde 1962, proponantaj semajnajn novaĵojn pri Latin-Ameriko, kuban muzikon kaj intervjuojn.',
      es: 'Históricas emisiones desde Cuba en esperanto desde 1962, ofreciendo actualidad latinoamericana, música caribeña y entrevistas.',
      en: 'Official broadcasts from Cuba in Esperanto since 1962, broadcasting Latin American news, Caribbean music, and interviews.'
    },
    tags: ['kubo', 'havano', 'radio', 'latinameriko', 'kurtondo', 'radio havana', 'cuba'],
    features: {
      eo: ['Elsendoj elsendataj per kurtondo kaj interreto', 'Latina kaj kariba muziko en Esperanto', 'Perspektivo el Latin-Ameriko', 'Tekstaj artikoloj kaj sondosieroj'],
      es: ['Emisiones tanto en onda corta como por internet', 'Música cubana y latinoamericana en esperanto', 'Perspectiva informativa desde el Caribe', 'Artículos escritos y audios descargables'],
      en: ['Broadcasts over shortwave and online streaming', 'Cuban and Latin rhythms in Esperanto', 'Latin American regional perspective', 'Text articles and audio downloads']
    }
  },
  {
    id: 'radio-vatikana-eo',
    title: 'Radio Vatikana en Esperanto',
    url: 'https://www.vaticannews.va/eo.html',
    displayUrl: 'vaticannews.va/eo',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Vatican Media',
    year: '1977-2024',
    languages: ['eo'],
    description: {
      eo: 'La oficiala esperantlingva sekcio de Vatikana Novaĵservo kun semajnaj elsendoj pri paco, internaciaj humanitaraj aferoj kaj kulturo.',
      es: 'La sección oficial en esperanto de Vatican News con emisiones semanales sobre paz, derechos humanos, acción humanitaria y cultura.',
      en: 'The official Esperanto section of Vatican News broadcasting weekly programs on peace, humanitarian efforts, and international affairs.'
    },
    tags: ['vatikano', 'radio', 'humanitara', 'paco', 'novaĵoj', 'noticias', 'podcast'],
    features: {
      eo: ['Semajnaj sondosieroj kaj podkastoj', 'Artikoloj pri humanitaraj iniciatoj kaj paco', 'Tre klara lingvaĵo kaj dikcio', 'Atingebla tutmonde senkoste'],
      es: ['Programas semanales en audio y podcast', 'Cobertura de iniciativas humanitarias y de paz', 'Pronunciación neutra y clara', 'Acceso libre en todo el mundo'],
      en: ['Weekly audio programs and podcast feed', 'Coverage of humanitarian initiatives and peace efforts', 'Very clear and accessible diction', 'Free global access']
    }
  },
  {
    id: 'evildea-youtube',
    title: 'Evildea YouTube Kanalo',
    url: 'https://www.youtube.com/@Evildea',
    displayUrl: 'youtube.com/@Evildea',
    category: 'media',
    level: 'A2',
    isFree: true,
    format: 'video',
    author: 'Richard Delamore (Evildea)',
    featured: true,
    languages: ['eo'],
    description: {
      eo: 'La plej populara kaj amuza vlogging-kanalo en Esperanto en YouTube kun centoj da videoj pri vojaĝoj, humuro, renkontiĝoj kaj ĉiutaga vivo.',
      es: 'El canal de vlogs en esperanto más popular de YouTube, con cientos de vídeos de viajes, humor, anécdotas y encuentros internacionales.',
      en: 'The most popular and humorous Esperanto vlogger on YouTube, with hundreds of entertaining videos on travel, comedy, and daily life.'
    },
    tags: ['evildea', 'youtube', 'vlogo', 'humuro', 'vojaĝoj', 'videoj', 'videos', 'humor'],
    features: {
      eo: ['Centoj da rapidaj kaj amuzaj videoj tute en Esperanto', 'Subtitoloj en multaj lingvoj', 'Tre utila por aŭdi rapidan ĉiutagan paroladon', 'Komunumo de dekoj da miloj da abonantoj'],
      es: ['Cientos de vídeos dinámicos y divertidos íntegramente en esperanto', 'Subtítulos en varios idiomas', 'Excelente para habituar el oído a la conversación rápida real', 'Comunidad con decenas de miles de suscriptores'],
      en: ['Hundreds of energetic videos spoken entirely in Esperanto', 'Subtitles in multiple languages', 'Great for training the ear to fast natural speech', 'Community of tens of thousands of subscribers']
    }
  },
  {
    id: 'esperanto-variety-show',
    title: 'Esperanto Variety Show (Derek Roff)',
    url: 'https://www.youtube.com/@EsperantoVarietyShow',
    displayUrl: 'youtube.com/@EsperantoVarietyShow',
    category: 'media',
    level: 'A1',
    isFree: true,
    format: 'video',
    author: 'Derek Roff',
    languages: ['eo', 'en'],
    description: {
      eo: 'Ampleksa kolekto de instruaj, amuzaj kaj klaraj mallongaj videoj por kompreni gramatikon, kulturon kaj subtilajn lingvajn nuancojn.',
      es: 'Gran colección de vídeos instructivos, claros y simpáticos para comprender la gramática, cultura y detalles del esperanto de forma sencilla.',
      en: 'A charming and clear collection of instructional short videos demystifying Esperanto grammar, culture, and nuanced usage.'
    },
    tags: ['derek roff', 'variety show', 'gramatiko', 'lecionoj', 'youtube', 'video', 'aprender'],
    features: {
      eo: ['Klaraj klarigoj de oftaj gramatikaj duboj', 'Komprenema kaj malrapida parolo por lernantoj', 'Buntaj bildoj kaj ekzemploj', 'Nova enhavo regule aldonata'],
      es: ['Explicaciones sencillas de dudas habituales de estudiantes', 'Locución pausada y clara idónea para nivel A1-B1', 'Ejemplos prácticos y visuales', 'Contenido didáctico continuo'],
      en: ['Simple explanations of tricky grammar points', 'Paced, articulate speech friendly to learners', 'Practical visual examples', 'Continually updated pedagogical videos']
    }
  },
  {
    id: 'kantaro-ikso',
    title: 'Kantaro-Vikio (Kantotekstoj & Akordoj)',
    url: 'https://kantaro.ikso.net',
    displayUrl: 'kantaro.ikso.net',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'E@I & Muzik-Amantoj',
    languages: ['eo'],
    description: {
      eo: 'La plej granda kolekto de esperantaj kantotekstoj en la reto, kun pli ol 3 000 kantoj, gitar-akordoj, biografioj de grupoj kaj sondosieroj.',
      es: 'El mayor cancionero colaborativo en esperanto de internet, con más de 3.000 canciones, acordes para guitarra, biografías de grupos y enlaces de audio.',
      en: 'The largest online songbook in Esperanto, cataloging over 3,000 song lyrics with guitar chords, artist biographies, and streaming audio links.'
    },
    tags: ['kantaro', 'muziko', 'akordoj', 'gitaro', 'kantoj', 'tekstoj', 'canciones', 'acordes'],
    features: {
      eo: ['Pli ol 3 000 kantotekstoj de esperantaj artistoj', 'Akordoj por gitaro kaj piano', 'Serĉo laŭ artistoj, albumoj kaj ĝenroj', 'Malfermita por ke uzantoj aldonu kantojn'],
      es: ['Más de 3.000 letras de canciones en esperanto', 'Acordes para tocar con guitarra o ukelele', 'Búsqueda por grupos, solistas y géneros', 'Plataforma abierta y colaborativa'],
      en: ['Over 3,000 Esperanto song lyrics', 'Guitar and ukulele chords included', 'Browse by artists, bands, and musical styles', 'Open collaborative wiki platform']
    }
  },

  // --- PLIAJ ASOCIOJ, KOMUNUMOJ KAJ VOJAĜOJ (MORE ORGANIZATIONS & COMMUNITY) ---
  {
    id: 'hef-asocio',
    title: 'Federación Española de Esperanto (HEF)',
    url: 'https://www.esperanto.es',
    displayUrl: 'esperanto.es',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Federación Española de Esperanto',
    featured: true,
    year: '1947-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia asocio de Esperanto en Hispanio, organizanto de la ĉiujara Hispana Kongreso, kursoj, eldonejo de libroj kaj kultura kontaktpunkto.',
      es: 'La asociación nacional de esperanto en España, organizadora del Congreso Español anual, cursos tutelados, publicaciones y actividades culturales.',
      en: 'The national Esperanto organization in Spain, organizer of the annual Spanish Congress, tutored courses, publications, and cultural activities.'
    },
    tags: ['hef', 'hispanio', 'asocio', 'hispana kongreso', 'madrid', 'federacion', 'espana'],
    features: {
      eo: ['Organizanto de la Hispana Kongreso de Esperanto', 'Senpagaj kursoj kaj atestiloj por hispanlingvanoj', 'Rikega biblioteko kaj arkivo Bitoteko', 'Lokaj kluboj en Madrido, Barcelono, Valencio, Sevilo kaj pli'],
      es: ['Organización del Congreso Español de Esperanto', 'Cursos tutorizados gratuitos para principiantes', 'Biblioteca histórica y archivo digital Bitoteko', 'Red de clubes en Madrid, Barcelona, Valencia, Sevilla, etc.'],
      en: ['Organizers of the annual Spanish Esperanto Congress', 'Free tutored courses for beginners', 'Historic library and Bitoteko digital archives', 'Network of local groups across Spain']
    }
  },
  {
    id: 'tejo-organizo',
    title: 'TEJO - Tutmonda Esperantista Junulara Organizo',
    url: 'https://www.tejo.org',
    displayUrl: 'tejo.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'TEJO Estraro',
    featured: true,
    year: '1938-2024',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'La tutmonda junulara organizaĵo (por homoj ĝis 35 jaroj) reprezentanta junajn esperantistojn ĉe UNESKO kaj la Eŭropa Junulara Forumo, kaj organizanto de la IJK.',
      es: 'La organización juvenil mundial (hasta 35 años) que representa a los jóvenes esperantistas ante la UNESCO y el Foro Europeo de la Juventud, y organiza el IJK.',
      en: 'The worldwide youth organization representing young Esperanto speakers up to age 35 at UNESCO and the European Youth Forum, and organizer of the IJK.'
    },
    tags: ['tejo', 'junuloj', 'ijk', 'unesko', 'junularo', 'internacia', 'youth', 'jovenes'],
    features: {
      eo: ['Organizanto de la Internacia Junulara Kongreso (IJK)', 'Internaciaj trejnadoj, staĝoj kaj seminarioj financataj de EU', 'Eldonanto de la revuo Kontakto', 'Tutmonda reto de junuloj en 50+ landoj'],
      es: ['Organización del Congreso Internacional de Jóvenes (IJK)', 'Seminarios internacionales y proyectos juveniles financiados por la UE', 'Edición de la revista juvenil Kontakto', 'Red activa de jóvenes en más de 50 países'],
      en: ['Organizers of the International Youth Congress (IJK)', 'International trainings and Erasmus+ youth projects', 'Publishers of the youth magazine Kontakto', 'Global network of youth in 50+ countries']
    }
  },
  {
    id: 'universala-kongreso-uea',
    title: 'Universala Kongreso de Esperanto (UK)',
    url: 'https://uea.org/kongresoj',
    displayUrl: 'uea.org/kongresoj',
    category: 'community',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Universala Esperanto-Asocio',
    featured: true,
    year: '1905-2024',
    languages: ['eo'],
    description: {
      eo: 'La plej granda ĉiujara internacia kultura festivalo kaj konferenco de la Esperanto-komunumo, kunveniganta 1000-3000 personojn el 60-80 landoj en malsama urbo ĉiujare.',
      es: 'El mayor festival cultural y congreso anual del esperanto, que reúne entre 1.000 y 3.000 participantes de 60 a 80 países en una ciudad diferente del mundo cada año.',
      en: 'The largest annual cultural festival and conference of the Esperanto community, gathering 1,000 to 3,000 people from 60-80 nations in a different world city each year.'
    },
    tags: ['uk', 'kongreso', 'uea', 'festivalo', 'turismo', 'renkontiĝo', 'congreso', 'evento'],
    features: {
      eo: ['1000 ĝis 3000 partoprenantoj el ĉiuj kontinentoj', 'Semajno da teatraĵoj, koncertoj, prelegoj kaj ekskursoj', 'Internacia Somera Universitato (ISU)', 'Okazas en malsama mondurbo ĉiujare'],
      es: ['De 1.000 a 3.000 participantes de todos los continentes', 'Una semana entera de conciertos, teatro, conferencias y excursiones', 'Universidad Internacional de Verano con créditos académicos', 'Celebrado en una ciudad del mundo distinta cada año'],
      en: ['1,000 to 3,000 attendees from every continent', 'A full week of theater, concerts, academic lectures, and tours', 'International Summer University sessions', 'Hosted in a different global city every year']
    }
  },
  {
    id: 'kataluna-esperanto-asocio',
    title: 'Kataluna Esperanto-Asocio (KEA)',
    url: 'https://www.esperanto.cat',
    displayUrl: 'esperanto.cat',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kataluna Esperanto-Asocio',
    year: '1910-2024',
    languages: ['ca', 'eo', 'es'],
    description: {
      eo: 'La historia asocio en Katalunio, kun grava eldonado de libroj, organizanto de la Katalunaj Kongresoj kaj gardanto de la Biblioteko-Arkivo Petro Nuez.',
      es: 'La histórica asociación en Cataluña, con notable actividad editorial, congresos anuales y custodia de la prestigiosa Biblioteca-Archivo Petro Nuez.',
      en: 'The historic regional association in Catalonia, with distinguished publishing activity, annual congresses, and custodian of the Petro Nuez Library.'
    },
    tags: ['kea', 'katalunio', 'barcelono', 'asocio', 'kataluna', 'catalunya', 'asociacion'],
    features: {
      eo: ['Eldoninto de multaj libroj kaj la bulteno Kataluna Esperantisto', 'Rikega arkivo kaj biblioteko Petro Nuez en Sabadell', 'Kursoj kaj kulturaj staĝoj en Katalunio', 'Informoj en la kataluna kaj Esperanto'],
      es: ['Editora de numerosas publicaciones y la revista Kataluna Esperantisto', 'Gran biblioteca y archivo histórico Petro Nuez en Sabadell', 'Cursos y actividades culturales en Cataluña', 'Información en catalán, español y esperanto'],
      en: ['Publisher of numerous books and Kataluna Esperantisto magazine', 'Rich Petro Nuez library and archive in Sabadell', 'Courses and cultural events across Catalonia', 'Available in Catalan and Esperanto']
    }
  },
  {
    id: 'meksika-esperanto-federacio',
    title: 'Meksika Esperanto-Federacio (MEF)',
    url: 'https://esperanto-mexico.org',
    displayUrl: 'esperanto-mexico.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Meksika Esperanto-Federacio',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia organizo de Esperanto en Meksiko, kunveniganta klubojn el Meksikurbo, Puebla, Aguascalientes kaj organizanta la Meksikan Kongreson.',
      es: 'La asociación nacional de esperanto en México, que coordina clubes en Ciudad de México, Puebla, Aguascalientes y organiza el Congreso Mexicano.',
      en: 'The national Esperanto organization in Mexico, uniting local clubs across Mexico City, Puebla, Aguascalientes, and hosting national congresses.'
    },
    tags: ['meksiko', 'mef', 'latinameriko', 'kongreso', 'komunumo', 'mexico', 'asociacion'],
    features: {
      eo: ['Organizanto de la Meksika Esperanto-Kongreso', 'Kursoj kaj renkontiĝoj por hispanlingvanoj', 'Vigla junulara movado en Latin-Ameriko', 'Bulteno kaj kulturaj eldonaĵoj'],
      es: ['Organización del Congreso Mexicano de Esperanto', 'Cursos presenciales y virtuales para hispanohablantes', 'Activa participación juvenil', 'Boletín e iniciativas culturales'],
      en: ['Organizers of the Mexican Esperanto Congress', 'Online and local courses for Spanish speakers', 'Energetic youth community in Latin America', 'Bulletins and cultural projects']
    }
  },
  {
    id: 'brazila-esperanto-ligo',
    title: 'Brazila Esperanto-Ligo (BEL)',
    url: 'https://esperanto.org.br',
    displayUrl: 'esperanto.org.br',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Brazila Esperanto-Ligo',
    year: '1907-2024',
    languages: ['pt', 'eo'],
    description: {
      eo: 'Unu el la plej grandaj kaj aktivaj naciaj asocioj de Esperanto en la mondo, kun dekoj da lokaj kluboj, libroeldonejo kaj la revuo Brazila Esperantisto.',
      es: 'Una de las asociaciones nacionales más multitudinarias del mundo, con decenas de clubes en Brasil, editorial propia y la revista Brazila Esperantisto.',
      en: 'One of the largest and most active national Esperanto associations in the world, with dozens of regional clubs, a dedicated publishing house, and national journals.'
    },
    tags: ['brazilo', 'bel', 'ameriko', 'kongresoj', 'brasil', 'asociacion', 'comunidad'],
    features: {
      eo: ['Organizanto de la Brazila Kongreso de Esperanto', 'Propra libroeldonejo kaj librovendejo', 'La revuo Brazila Esperantisto aperanta ekde 1907', 'Miloj da aktivaj membroj tra la tuta lando'],
      es: ['Organización del multitudinario Congreso Brasileño de Esperanto', 'Editorial propia con catálogo de cientos de libros', 'La revista Brazila Esperantisto publicada desde 1907', 'Comunidad muy extendida en todas las regiones'],
      en: ['Organizers of the massive Brazilian Esperanto Congress', 'Independent publishing house and bookstore', 'Brazila Esperantisto magazine in continuous publication since 1907', 'Thousands of active members nationwide']
    }
  },
  {
    id: 'kastelo-greziljono',
    title: 'Kastelo Greziljono (Kulturdomo en Francio)',
    url: 'https://gresillon.org',
    displayUrl: 'gresillon.org',
    category: 'community',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Kulturdomo de Esperanto',
    year: '1951-2024',
    languages: ['fr', 'eo', 'de', 'es'],
    description: {
      eo: 'Historia 19-jarcenta kastelo en la valo de Luaro (Francio) funkcianta kiel tutjara kultura centro de Esperanto kun kursoj, ferioj kaj festivaloj.',
      es: 'Histórico castillo del siglo XIX en el valle del Loira (Francia) que funciona como centro cultural permanente de esperanto con cursos, vacaciones y festivales.',
      en: 'A historic 19th-century château in the Loire Valley (France) serving as a permanent cultural center for Esperanto, hosting residential courses and festivals.'
    },
    tags: ['greziljono', 'kastelo', 'francio', 'staĝoj', 'ferioj', 'kursoj', 'chateau', 'turismo'],
    features: {
      eo: ['Loĝado en vera historia franca kastelo', 'Intensivaj lingvokursoj de A1 ĝis C1', 'Tema semajnoj (muziko, teatro, naturo, jogo)', 'Malfermita al familioj, junuloj kaj individuoj'],
      es: ['Alojamiento en un auténtico castillo francés del siglo XIX', 'Cursos intensivos residenciales de todos los niveles', 'Semanas temáticas de música, senderismo, teatro y naturaleza', 'Ambiente familiar e internacional'],
      en: ['Lodging in a real 19th-century French château', 'Immersive language courses from beginner to mastery', 'Themed weeks (music, outdoor hiking, theater, yoga)', 'Welcoming to families, youth, and solo travelers']
    }
  },
  {
    id: 'herzberg-esperanto-urbo',
    title: 'Herzberg am Harz - La Esperanto-Urbo',
    url: 'https://esperanto-urbo.de',
    displayUrl: 'esperanto-urbo.de',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Urbo Herzberg am Harz & Interkultura Centro',
    year: '2006-2024',
    languages: ['de', 'eo'],
    description: {
      eo: 'La unua oficiala Esperanto-Urbo en la mondo (en Germanio), kie stratosignoj estas dulingvaj kaj la municipo oficiale subtenas la lingvon.',
      es: 'La primera Ciudad del Esperanto oficial del mundo (en Alemania), con señalización municipal bilingüe y respaldo institucional de la lengua.',
      en: 'The first officially designated "Esperanto-City" in the world (located in Lower Saxony, Germany), with bilingual city signs and municipal support.'
    },
    tags: ['herzberg', 'urbo', 'germanio', 'municipo', 'interkultura centro', 'alemania', 'turismo'],
    features: {
      eo: ['Oficiala urbotitoloj "Herzberg am Harz - die Esperanto-Stadt / la Esperanto-urbo"', 'Dulingvaj stratosignoj kaj urbaj afiŝoj', 'Interkultura Centro Herzberg (ICH) kun kursoj kaj arkivo', 'Regulaj internaciaj renkontiĝoj kaj staĝoj'],
      es: ['Reconocimiento oficial por el ayuntamiento como Ciudad del Esperanto', 'Placas de calles e indicadores bilingües alemán-esperanto', 'Centro Intercultural Herzberg con biblioteca y cursos', 'Reuniones y encuentros internacionales periódicos'],
      en: ['Official municipal decree as "The Esperanto-City"', 'Bilingual street signs throughout the city', 'Intercultural Center Herzberg with libraries and workshops', 'Regular international exchanges and seminars']
    }
  },
  {
    id: 'mastodon-esperanto',
    title: 'Mastodon Esperanto-Komunumo (Fediverse)',
    url: 'https://esperanto.masto.host',
    displayUrl: 'esperanto.masto.host',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Fediverse Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Malfermita, malcentrigita kaj senreklama socia reto en la Fediverso tute en Esperanto por babilado, mikroblogo kaj novaj kontaktoj.',
      es: 'Red social descentralizada, abierta y sin publicidad en el Fediverso íntegramente en esperanto para conversar, compartir ideas y conocer hablantes.',
      en: 'An open, decentralized, ad-free social network on the Fediverse operating entirely in Esperanto for microblogging and global conversation.'
    },
    tags: ['mastodon', 'fediverse', 'socia reto', 'malfermita', 'sen reklamoj', 'red social', 'microblog'],
    features: {
      eo: ['Tute senkomerca kaj sen reklamoj', 'Ĉiutagaj mesaĝoj kaj diskutoj en pura Esperanto', 'Konektita al la tutmonda Fediverso', 'Respectas privatecon kaj malfermajn normojn'],
      es: ['Libre de algoritmos opacos y publicidad', 'Publicaciones diarias de hablantes de todo el mundo', 'Interconectado con el Fediverso global', 'Máximo respeto a la privacidad del usuario'],
      en: ['Completely non-commercial and free of ads', 'Daily posts and discussions in fluent Esperanto', 'Interconnected with the global Fediverse', 'Privacy-respecting and open standard']
    }
  },

  // --- PLIAJ SCIENCAJ KAJ EDUKAJ PROJEKTOJ (SCIENCE, RESEARCH & ACADEMIC) ---
  {
    id: 'isae-scienca-revuo',
    title: 'ISAE & Scienca Revuo',
    url: 'https://scienca-revuo.info',
    displayUrl: 'scienca-revuo.info',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'Internacia Scienca Asocio Esperantista (ISAE)',
    year: '1906-2024',
    languages: ['eo'],
    description: {
      eo: 'La internacia faka asocio por sciencistoj kaj universitataj esploristoj, eldonanta la fakan sciencan revuon "Scienca Revuo" kun samranga revizio.',
      es: 'La asociación internacional para científicos e investigadores universitarios, que publica la revista con revisión por pares "Scienca Revuo".',
      en: 'The international professional association for scientists and university researchers, publishing the peer-reviewed academic journal "Scienca Revuo".'
    },
    tags: ['isae', 'scienco', 'fiziko', 'medicino', 'matematiko', 'universitato', 'ciencia', 'investigacion'],
    features: {
      eo: ['Fakaj artikoloj pri fiziko, kemio, biologio, astronomio kaj medicino', 'Samranga revizio (peer review) de esploristoj', 'Plena cifereca arkivo senpage elŝutebla', 'Fakaj terminaroj kaj scienca vortprovizo'],
      es: ['Artículos científicos sobre física, biología, medicina y astronomía', 'Revisión por pares por investigadores internacionales', 'Archivo digital completo con artículos en PDF de libre descarga', 'Creación y validación de terminología técnica'],
      en: ['Peer-reviewed papers in physics, biology, medicine, and astronomy', 'Academic peer review by international researchers', 'Open-access digital archive with free PDF papers', 'Specialized scientific nomenclature and glossaries']
    }
  },
  {
    id: 'steb-scienca-biblioteko',
    title: 'STEB - Scienca kaj Teknika Esperanto-Biblioteko',
    url: 'http://www.eventoj.hu/steb/',
    displayUrl: 'eventoj.hu/steb',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'László Szilvási & Eventoj',
    languages: ['eo'],
    description: {
      eo: 'Giganta indekso de fakaj terminaroj, libroj kaj artikoloj pri centoj da sciencaj kaj teknikaj kampoj (arkitekturo, juro, botaniko, komputiko, ktp.).',
      es: 'Monumental índice de vocabularios técnicos, libros y artículos sobre cientos de disciplinas científicas e industriales (derecho, botánica, ingeniería, medicina).',
      en: 'A massive index of specialized glossaries, textbooks, and technical papers across hundreds of scientific and engineering fields.'
    },
    tags: ['steb', 'tekniko', 'scienco', 'terminaro', 'inĝenierado', 'juro', 'terminologia', 'ingenieria'],
    features: {
      eo: ['Pli ol 100 fakaj terminaroj klasifikitaj laŭ temoj', 'Gvidiloj pri medicino, juro, biologio kaj maŝinkonstruo', 'Grandega arkivo pri teknika aplikado de Esperanto', 'Senkosta uzo'],
      es: ['Más de 100 glosarios técnicos ordenados por disciplina', 'Textos sobre medicina, derecho, telecomunicaciones y botánica', 'Inmenso archivo de la aplicación técnica del esperanto', 'Acceso libre y gratuito'],
      en: ['Over 100 technical glossaries sorted by field', 'Literature on medicine, law, botany, and engineering', 'Massive archive of applied scientific Esperanto', 'Free online access']
    }
  },
  {
    id: 'ilei-instruistoj',
    title: 'ILEI - Internacia Ligo de Esperantistaj Instruistoj',
    url: 'https://www.ilei.info',
    displayUrl: 'ilei.info',
    category: 'projects',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'ILEI Estraro',
    year: '1949-2024',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'La tutmonda faka organizo por instruistoj kaj profesoroj de Esperanto, kunlaboranta kun UNESKO kaj organizanta tutmondajn edukajn konferencojn.',
      es: 'La federación internacional de profesores y docentes de esperanto, con estatus consultivo en la UNESCO y organizadora de congresos pedagógicos.',
      en: 'The worldwide federation of Esperanto teachers and educators, holding official relations with UNESCO and organizing international conferences.'
    },
    tags: ['ilei', 'instruistoj', 'pedagogio', 'lernejoj', 'unesko', 'educacion', 'profesores'],
    features: {
      eo: ['Revuo Internacia Pedagogia Revuo (IPR) kaj Juna Amiko', 'Pedagogiaj trejnadoj kaj gvidiloj por instruistoj', 'Kunlaboro kun universitatoj kaj lernejoj tra la mondo', 'Rilatoj kun UNESKO'],
      es: ['Revistas educativas IPR y Juna Amiko adaptadas a escuelas', 'Guías didácticas y formación para formadores', 'Cooperación con universidades y centros educativos', 'Relaciones con la UNESCO'],
      en: ['Educational journals IPR and Juna Amiko designed for schools', 'Teacher training webinars and pedagogical guidelines', 'Cooperation with universities and primary schools worldwide', 'UNESCO consultation']
    }
  },
  {
    id: 'vikivojago-esperanto',
    title: 'Vikivojaĝo en Esperanto (Wikivoyage)',
    url: 'https://eo.wikivoyage.org',
    displayUrl: 'eo.wikivoyage.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La libera kaj senpaga tutmonda vojaĝgvidilo en Esperanto, verkita de vojaĝantoj por ĉiuj urboj, landoj, monumentoj kaj regionoj de la mondo.',
      es: 'La guía de viajes libre y gratuita en esperanto de Wikimedia, escrita colaborativamente por viajeros para explorar ciudades, países y monumentos.',
      en: 'The free worldwide travel guide in Esperanto by Wikimedia, collaboratively written by travelers for exploring cities, destinations, and cultures.'
    },
    tags: ['vikivojaĝo', 'wikivoyage', 'vojaĝoj', 'turismo', 'urboj', 'gvidilo', 'viajes', 'guias'],
    features: {
      eo: ['Centoj da gvidiloj pri urboj kaj landoj en pura Esperanto', 'Praktikaj konsiloj pri transporto, manĝo kaj vidindaĵoj', 'Mapoj kaj ilustraĵoj libere uzeblaj', 'Senpagaj informoj sen komercaj reklamoj'],
      es: ['Cientos de guías de destinos redactadas en esperanto', 'Consejos prácticos de transporte, alojamiento y gastronomía', 'Mapas e ilustraciones con licencia libre', 'Información fidedigna sin anuncios comerciales'],
      en: ['Hundreds of destination guides written in Esperanto', 'Practical tips on transport, dining, and sights', 'Free maps and open-license illustrations', 'Unbiased community info without ads']
    }
  },
  {
    id: 'esf-esperantic-studies',
    title: 'ESF - Esperantic Studies Foundation',
    url: 'https://www.esperantic.org',
    displayUrl: 'esperantic.org',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Esperantic Studies Foundation',
    year: '1968-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'Strategia esplora fondumo kiu financas akademiajn esplorojn, universitatajn katedrojn, simpoziojn kaj sciencajn publikaĵojn pri interlingvistiko.',
      es: 'Fundación investigadora que financia proyectos académicos, cátedras universitarias, simposios y publicaciones científicas sobre interlingüística.',
      en: 'A strategic research foundation funding academic inquiry, university chairs, symposia, and scholarly publishing on interlinguistics and communication justice.'
    },
    tags: ['esf', 'esploro', 'fondumo', 'universitato', 'lingvistiko', 'interlingvistiko', 'fundacion', 'becas'],
    features: {
      eo: ['Financado de universitataj esplorprojektoj kaj stipendioj', 'Subteno al Lernu!, Edukado.net kaj Tekstaro', 'Eldonanto de la revuo Language Problems & Language Planning', 'Sciencaj konferencoj kaj simpozioj'],
      es: ['Becas y subvenciones para tesis e investigaciones universitarias', 'Financiación histórica de Lernu!, Edukado.net y Tekstaro', 'Apoyo a la revista académica Language Problems & Language Planning', 'Simposios de política lingüística'],
      en: ['Scholarships and research grants for university scholars', 'Key historic backing of Lernu!, Edukado.net, and Tekstaro', 'Supports Language Problems & Language Planning journal', 'High-level symposia on linguistic policy']
    }
  },
  {
    id: 'edukado-interreto-org',
    title: 'E@I (Edukado@Interreto)',
    url: 'https://ikso.net',
    displayUrl: 'ikso.net',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'E@I Organizo',
    languages: ['eo', 'en', 'sk'],
    description: {
      eo: 'La gvida teknologia neprofitcela organizo kreinta Lernu.net, Komputeko, Reta Vortaro, Lingvo.info kaj dekojn da ciferecaj edukaj projektoj.',
      es: 'La organización tecnológica sin ánimo de lucro creadora de Lernu.net, Komputeko, Reta Vortaro, Lingvo.info y decenas de proyectos educativos digitales.',
      en: 'The leading non-profit technology organization that developed Lernu.net, Komputeko, Reta Vortaro, Lingvo.info, and dozens of digital educational tools.'
    },
    tags: ['e@i', 'ikso', 'teknologio', 'projektoj', 'interreto', 'edukado', 'innovacion', 'software'],
    features: {
      eo: ['Kreinto de la plej sukcesaj edukaj retejoj en Esperantujo', 'Organizanto de SES (Somera Esperanto-Studado)', 'Kunlaboro en projektoj de la Eŭropa Unio (Erasmus+)', 'Malfermfonta disvolviĝo de programaro'],
      es: ['Creadores de las webs didácticas con mayor impacto en el mundo', 'Organizadores del SES (Estudio Estival de Esperanto)', 'Socios en proyectos Erasmus+ de la Unión Europea', 'Desarrollo de herramientas de software libre'],
      en: ['Creators of the most influential Esperanto learning platforms', 'Organizers of SES (Summer Esperanto Study)', 'Partners in EU Erasmus+ educational initiatives', 'Open-source software stewardship']
    }
  },

  // ==========================================
  // BLOKO 1: KURSOJ & LERNADO (COURSES & LEARNING)
  // ==========================================
  {
    id: 'mondeto-infanoj',
    title: 'Mondeto - Esperanto por Infanoj kaj Lernejoj',
    url: 'https://mondeto.org',
    displayUrl: 'mondeto.org',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'website',
    author: 'Mondeto Iniciato',
    languages: ['eo', 'en', 'es'],
    description: {
      eo: 'Pedagogiaj materialoj, kantoj, rakontoj kaj ludoj por enkonduki Esperanton en elementajn lernejojn kaj hejman lernadon por infanoj.',
      es: 'Materiales didácticos, canciones, cuentos y juegos diseñados para enseñar esperanto a niños en escuelas primarias y en familia.',
      en: 'Educational materials, songs, stories, and games crafted to introduce Esperanto to children in primary schools and homeschooling.'
    },
    tags: ['infanoj', 'lernejo', 'pedagogio', 'kantoj', 'ludoj', 'niños', 'educacion', 'escuelas'],
    features: {
      eo: ['Ilustritaj rakontoj por infanoj', 'Pedagogiaj gvidiloj por gepatroj kaj instruistoj', 'Senpagaj printeblaj folioj', 'Interagaj kantoj kun animacioj'],
      es: ['Cuentos ilustrados para los más pequeños', 'Guías didácticas para profesores y familias', 'Fichas imprimibles gratuitas', 'Canciones infantiles animadas'],
      en: ['Illustrated storybooks for children', 'Teaching guides for parents & educators', 'Free printable worksheets', 'Animated sing-along songs']
    }
  },
  {
    id: 'esperanto-dialogoj',
    title: 'Esperanto en Dialogoj (Praktika Konversacio)',
    url: 'https://esperantofre.com/edu/kdialogo.htm',
    displayUrl: 'esperantofre.com/dialogo',
    category: 'courses',
    level: 'A2',
    isFree: true,
    format: 'course',
    author: 'Enrique Ellemberg',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Centoj da realaj dialogoj pri ĉiutagaj situacioj (restoracioj, flughavenoj, aĉetado, amikiĝo) kun audio kaj paralelaj klarigoj.',
      es: 'Cientos de diálogos reales sobre situaciones cotidianas (restaurantes, viajes, compras, amistad) con pronunciación y transcripciones.',
      en: 'Hundreds of real-world dialogues for practical everyday situations (dining, traveling, shopping, socializing) with clear audio recordings.'
    },
    tags: ['dialogoj', 'konversacio', 'parolado', 'audio', 'situacioj', 'dialogos', 'conversacion'],
    features: {
      eo: ['Praktikaj ĉiutagaj frazoj', 'Voĉaj registraĵoj de ĉiu frazo', 'Klaraj notoj pri parolmanieroj', 'Senpaga aliro sen aliĝo'],
      es: ['Frases prácticas para el día a día', 'Audios grabados de cada conversación', 'Glosarios y notas explicativas', 'Acceso libre sin registro'],
      en: ['Practical phrases for daily encounters', 'Audio recordings of each sentence', 'Explanatory vocabulary notes', 'Direct access without signup']
    }
  },
  {
    id: 'fsi-esperanto',
    title: 'FSI Esperanto - Diplomatia Lingvokurso',
    url: 'https://www.fsi-language-courses.org/fsi-esperanto-language-course/',
    displayUrl: 'fsi-language-courses.org/esperanto',
    category: 'courses',
    level: 'B1',
    isFree: true,
    format: 'course',
    author: 'Foreign Service Institute (Usona Registaro)',
    languages: ['en', 'eo'],
    description: {
      eo: 'Intensiva kurso de la usona Foreign Service Institute kun metodaj aŭd-ekzercoj, strukturaj driloj kaj ampleksa lernolibro en publika havaĵo.',
      es: 'Curso intensivo del Foreign Service Institute estadounidense con ejercicios auditivos de repetición, patrones estructurales y manual completo.',
      en: 'The intensive Foreign Service Institute diplomatic course featuring structured audio drills, pattern practice, and a comprehensive textbook.'
    },
    tags: ['fsi', 'intensa', 'diplomatio', 'driloj', 'audio', 'gramatiko', 'curso intensivo'],
    features: {
      eo: ['Kompleta lernolibro en PDF senpage', 'Dekoj da horoj da voĉaj strukturaj ekzercoj', 'Rikega faka kaj diplomata vortprovizo', 'En publika havaĵo'],
      es: ['Libro de texto completo en PDF gratuito', 'Decenas de horas de ejercicios orales de repetición', 'Vocabulario diplomático y formal riguroso', 'En dominio público'],
      en: ['Complete textbook in PDF for free', 'Dozens of hours of audio pattern drills', 'Rigorous formal and diplomatic vocabulary', 'In the public domain']
    }
  },
  {
    id: 'gramatiko-10-lecionoj',
    title: 'Gramática de Esperanto en 10 Lecciones (HEF)',
    url: 'https://www.esperanto.es/gramatica-basica/',
    displayUrl: 'esperanto.es/gramatica-basica',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'course',
    author: 'Federación Española de Esperanto',
    languages: ['es', 'eo'],
    description: {
      eo: 'Konciza kaj klara gvidilo pri la bazaj reguloj de la esperanta gramatiko en dek simplaj lecionoj speciale verkitaj por hispanlingvanoj.',
      es: 'Guía concisa y clara de las reglas básicas del esperanto en diez lecciones directas, especialmente adaptada a las características del español.',
      en: 'A concise 10-lesson guide to fundamental Esperanto grammar, specially tailored to explain grammar clearly to Spanish speakers.'
    },
    tags: ['gramatiko', '10 lecionoj', 'hispana', 'bazoj', 'hef', 'gramatica', 'espanol'],
    features: {
      eo: ['Klaraj reguloj sen esceptoj', 'Komparoj inter la hispana kaj Esperanto', 'Memkorekteblaj ekzercoj', 'Elŝutebla gvidilo'],
      es: ['Reglas claras explicadas sin excepciones', 'Comparativa directa con la gramática del español', 'Ejercicios de autoevaluación', 'Guía imprimible'],
      en: ['Clear rules presented without exceptions', 'Direct comparisons with Spanish grammar', 'Self-checking exercises', 'Printable study guide']
    }
  },
  {
    id: 'babbel-esperanto-guide',
    title: 'Babbel Esperanto Guide & Insights',
    url: 'https://www.babbel.com/en/magazine/what-is-esperanto',
    displayUrl: 'babbel.com/esperanto',
    category: 'courses',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Babbel Magazine',
    languages: ['en', 'es', 'eo'],
    description: {
      eo: 'Ampleksa enkonduko de Babbel pri la strukturo de Esperanto, ĝia propedeŭtika valoro por lerni aliajn lingvojn kaj ĝia monda komunumo.',
      es: 'Guía introductoria de Babbel sobre el funcionamiento del esperanto, su valor propedéutico para aprender otros idiomas y su comunidad.',
      en: 'Babbel\'s comprehensive overview of Esperanto\'s architecture, its propedeutic value for learning other languages, and its global community.'
    },
    tags: ['babbel', 'enkonduko', 'propedeŭtiko', 'artikolo', 'lingvistiko', 'introduccion'],
    features: {
      eo: ['Klarigoj de afiksoj kaj tabelvortoj', 'Analizo de propedeŭtika valoro', 'Historio de Zamenhof kaj la lingvo', 'Konsiloj por rapidaj rezultoj'],
      es: ['Explicación del sistema de prefijos y sufijos', 'Demostración de su valor acelerador del aprendizaje', 'Historia de Zamenhof y del movimiento', 'Consejos de estudio'],
      en: ['Explanation of prefixes, suffixes & correlatives', 'Propedeutic acceleration analysis', 'History of Zamenhof and the language', 'Practical study tips']
    }
  },
  {
    id: 'lingvist-esperanto',
    title: 'Lingvistika Esperanto-Karto Trejnilo',
    url: 'https://ankisrs.net',
    displayUrl: 'ankisrs.net/esperanto',
    category: 'courses',
    level: 'A2',
    isFree: true,
    format: 'app',
    author: 'Anki Esperanto Komunumo',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'Publikaj prete faritaj kartaroj de Anki kun la 2 000 plej oftaj esperantaj radikoj, sonregistraĵoj kaj ekzemplaj frazoj por interspaca ripetado.',
      es: 'Colecciones públicas de tarjetas Anki con las 2.000 raíces más frecuentes, pronunciación nativa y oraciones de ejemplo con repetición espaciada.',
      en: 'Curated public Anki flashcard decks featuring the 2,000 most common Esperanto roots with native audio and example sentences for spaced repetition.'
    },
    tags: ['anki', 'kartoj', 'memoro', 'srs', 'radikoj', 'flashcards', 'vocabulario'],
    features: {
      eo: ['Pli ol 2 000 kartoj kun voĉoj', 'Algoritmo de interspaca ripetado (SRS)', 'Sinkronigo en poŝtelefono kaj komputilo', 'Tute senkosta'],
      es: ['Más de 2.000 tarjetas con audio de pronunciación', 'Algoritmo SRS que optimiza el recuerdo a largo plazo', 'Sincronización multidispositivo', 'Gratuito y libre'],
      en: ['Over 2,000 flashcards with voice recordings', 'Optimized SRS algorithm for long-term retention', 'Cross-platform sync on mobile & desktop', 'Free and open']
    }
  },
  {
    id: 'esperanto-por-lernejoj',
    title: 'Esperanto en Lernejoj (Springboard to Languages)',
    url: 'https://www.springboard2languages.org',
    displayUrl: 'springboard2languages.org',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Asocio de Britio (EAB)',
    languages: ['en', 'eo'],
    description: {
      eo: 'Instruprogramo en britaj lernejoj kiu uzas Esperanton kiel unuan fremdlingvon por prepari infanojn al posta rapida lernado de la franca aŭ hispana.',
      es: 'Programa didáctico aplicado en escuelas británicas que emplea el esperanto como lengua introductoria para acelerar el aprendizaje de otros idiomas.',
      en: 'The UK schools initiative using Esperanto as a starter language to build linguistic confidence and boost subsequent foreign-language acquisition.'
    },
    tags: ['lernejoj', 'infanoj', 'instruado', 'britio', 'propedeŭtiko', 'pedagogia', 'escuelas'],
    features: {
      eo: ['Pruvita metodo por plirapidigi lernadon de aliaj lingvoj', 'Kursprogramoj por instruistoj', 'Ludaĵoj kaj ekzercoj', 'Subteno de universitataj esploroj'],
      es: ['Método probado para multiplicar la rapidez de aprendizaje de terceras lenguas', 'Planes de estudio para profesores', 'Juegos y dinámicas de grupo', 'Avalado por estudios universitarios'],
      en: ['Proven approach that accelerates future language learning', 'Complete syllabi for classroom teachers', 'Games and classroom activities', 'Backed by academic research']
    }
  },

  // ==========================================
  // BLOKO 2: LITERATURO & ELDONEJOJ (LITERATURE & PUBLISHERS)
  // ==========================================
  {
    id: 'fel-eldonejo',
    title: 'Flandra Esperanto-Ligo (FEL) & Libroservo',
    url: 'https://www.esperanto.be/fel/',
    displayUrl: 'esperanto.be/fel',
    category: 'literature',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Flandra Esperanto-Ligo',
    year: '1975-2024',
    languages: ['nl', 'eo', 'fr', 'en'],
    description: {
      eo: 'Unu el la plej aktivaj eldonejoj en Esperantujo, eldonanto de la fama internacia revuo Monato kaj grandega libroservo en Antverpeno.',
      es: 'Una de las editoriales más activas del mundo del esperanto, editora de la prestigiosa revista Monato y con una gran librería en Amberes.',
      en: 'One of the most prolific publishing houses in Esperantujo, publisher of the international magazine Monato and a premier bookstore in Antwerp.'
    },
    tags: ['fel', 'antverpeno', 'eldonejo', 'monato', 'libroj', 'editorial', 'belgica'],
    features: {
      eo: ['Centoj da originalaj beletraj libroj eldonitaj', 'Retbutiko kun rapida liverado', 'Eldonanto de la revuo Monato ekde 1980', 'Rikega katalogo de vortaroj kaj lerniloj'],
      es: ['Cientos de obras originales de narrativa y ensayo publicadas', 'Tienda online con envíos internacionales rápidos', 'Editora de la revista Monato desde 1980', 'Gran catálogo de diccionarios y manuales'],
      en: ['Hundreds of original literary works published', 'Online bookstore with fast worldwide delivery', 'Publisher of Monato magazine since 1980', 'Extensive catalog of reference dictionaries']
    }
  },
  {
    id: 'edistudio-eldonejo',
    title: 'Edistudio - Historia Beletra Eldonejo',
    url: 'https://www.edistudio.it',
    displayUrl: 'edistudio.it',
    category: 'literature',
    level: 'B2',
    isFree: false,
    format: 'website',
    author: 'Edistudio Pisa',
    year: '1970-2024',
    languages: ['it', 'eo'],
    description: {
      eo: 'Prestiĝa itala eldonejo en Pizo fondita de Brunetto Casini, konata pro eldonado de altkvalitaj originalaj romanoj, poezio kaj la revuo Kontakto.',
      es: 'Prestigiosa editorial italiana en Pisa fundada por Brunetto Casini, célebre por publicar novelas originales de gran calidad y colecciones literarias.',
      en: 'Prestigious Italian publishing house in Pisa founded by Brunetto Casini, acclaimed for high-caliber original fiction, poetry, and classical editions.'
    },
    tags: ['edistudio', 'italio', 'pizo', 'eldonejo', 'beletro', 'romanoj', 'editorial', 'novelas'],
    features: {
      eo: ['Kolekto de originalaj romanoj de majstroj kiel Trevor Steele', 'Luksa tipografia kvalito', 'Dulingvaj italaj-esperantaj verkoj', 'Historio de pli ol 50 jaroj'],
      es: ['Colección de novelas originales de autores como Trevor Steele', 'Calidad tipográfica y de encuadernación exquisita', 'Obras bilingües italiano-esperanto', 'Más de medio siglo de trayectoria'],
      en: ['Original fiction series by masters like Trevor Steele', 'Exquisite typography and bookbinding quality', 'Bilingual Italian-Esperanto editions', 'Over 50 years of publishing history']
    }
  },
  {
    id: 'mondial-books',
    title: 'Mondial Books (Novjorka Eldonejo)',
    url: 'https://www.librejo.com',
    displayUrl: 'librejo.com',
    category: 'literature',
    level: 'B2',
    isFree: false,
    format: 'website',
    author: 'Ulrich Becker / Mondial',
    year: '2001-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'Novjorka eldonejo specialigita pri originala literaturo en Esperanto, sciencaj verkoj, poeziokolektoj kaj la literatura revuo Beletra Almanako.',
      es: 'Editorial neoyorquina especializada en literatura original en esperanto, monografías académicas y la revista Beletra Almanako.',
      en: 'New York publishing company specializing in original Esperanto literature, academic monographs, poetry, and the journal Beletra Almanako.'
    },
    tags: ['mondial', 'novjorko', 'eldonejo', 'beletra almanako', 'beletro', 'editorial', 'nueva york'],
    features: {
      eo: ['Eldoninto de Beletra Almanako (BA)', 'Presitaj libroj kaj tujaj e-libroj (Kindle, EPUB)', 'Originala prozo kaj scienca beletro', 'Disponebla en Amazon kaj tutmondaj librovendejoj'],
      es: ['Entidad editora de la revista Beletra Almanako (BA)', 'Libros impresos bajo demanda y e-books instantáneos', 'Prosa original y crítica literaria', 'Distribución mundial en librerías y Amazon'],
      en: ['Publisher of the literary journal Beletra Almanako (BA)', 'Print-on-demand books and instant digital e-books', 'Original prose and critical studies', 'Global distribution via Amazon and bookstores']
    }
  },
  {
    id: 'eab-libroservo',
    title: 'Esperanto Association of Britain Bookshop',
    url: 'https://esperanto.org.uk/shop/',
    displayUrl: 'esperanto.org.uk/shop',
    category: 'literature',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Esperanto Association of Britain (EAB)',
    languages: ['en', 'eo'],
    description: {
      eo: 'La ampleksa libroservo de la brita asocio en Barlaston, kun centoj da libroj por komencantoj, tradukoj de Roald Dahl, Tolkien kaj infanlibroj.',
      es: 'La librería de la asociación británica en Barlaston, con cientos de libros de lectura graduada, traducciones de Tolkien, Roald Dahl y literatura infantil.',
      en: 'The comprehensive bookshop of the British association in Barlaston, stocking graded readers, translations of Tolkien, Roald Dahl, and children\'s books.'
    },
    tags: ['eab', 'britio', 'libroservo', 'tolkien', 'roald dahl', 'lerniloj', 'libreria', 'libros'],
    features: {
      eo: ['Gradigitaj legolibroj por komencantoj', 'Famaj tradukoj (La Hobito, La Eta Princo)', 'Lerniloj kaj vortaroj por anglalingvanoj', 'Rapida internacia aĉeto'],
      es: ['Libros de lectura graduada por niveles', 'Traducciones célebres (El Hobbit, El Principito, Roald Dahl)', 'Manuales y diccionarios didácticos', 'Envíos internacionales'],
      en: ['Graded readers for all proficiency levels', 'Celebrated translations (The Hobbit, The Little Prince)', 'Learning textbooks and pocket dictionaries', 'Reliable international shipping']
    }
  },
  {
    id: 'muzeo-subirats',
    title: 'Esperanto-Muzeo de Subirats (Hispanio)',
    url: 'https://esperantopau.org/museu/',
    displayUrl: 'esperantopau.org/museu',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Lluís Hernández Yzal & Subirats Komunumo',
    year: '1968-2024',
    languages: ['ca', 'es', 'eo'],
    description: {
      eo: 'Unu el la plej gravaj muzeoj de Esperanto en la mondo, situanta en Sant Pau d’Ordal (Katalunio), kun impona kolekto de 15 000 libroj kaj revuoj.',
      es: 'Uno de los museos de esperanto más relevantes del mundo, en Sant Pau d’Ordal (Cataluña), con una colección de más de 15.000 libros y revistas históricas.',
      en: 'One of the most significant Esperanto museums in the world, in Sant Pau d’Ordal (Catalonia), holding an impressive collection of 15,000 historic books and journals.'
    },
    tags: ['subirats', 'muzeo', 'katalunio', 'kolekto', 'arkivo', 'libroj', 'museo', 'historia'],
    features: {
      eo: ['Pli ol 15 000 katalogitaj libroj kaj revuoj', 'Historiaj afiŝoj, medaloj kaj memorindaĵoj ekde 1900', 'Vizitebla por esploristoj kaj publiko', 'Subtenata de la municipo Subirats'],
      es: ['Más de 15.000 libros y revistas catalogadas', 'Carteles históricos, medallas y objetos de coleccionismo', 'Abierto a investigadores y público general', 'Apoyado por el Ayuntamiento de Subirats'],
      en: ['Over 15,000 cataloged books and historical periodicals', 'Vintage posters, congress medals, and memorabilia', 'Open to scholars and the general public', 'Officially preserved by Subirats municipality']
    }
  },
  {
    id: 'muzeo-svitavy',
    title: 'Esperanto-Muzeo en Svitavy (Ĉeĥio)',
    url: 'https://muzeum.esperanto.cz',
    displayUrl: 'muzeum.esperanto.cz',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Ĉeĥa Esperanto-Asocio & Urbo Svitavy',
    year: '2008-2024',
    languages: ['cs', 'eo', 'en', 'de'],
    description: {
      eo: 'Moderna kaj aktiva muzeo en la naskiĝurbo de Oskar Schindler en Ĉeĥio, kun konstantaj ekspozicioj, prelegoj kaj grandega arkivo de libroj.',
      es: 'Moderno y activo museo en la ciudad natal de Oskar Schindler en Chequia, con exposiciones permanentes, conferencias y un gran fondo bibliográfico.',
      en: 'A modern and vibrant museum in the historic Ottendorfer House in Svitavy (Czechia), hosting permanent exhibitions, lectures, and an extensive book archive.'
    },
    tags: ['svitavy', 'muzeo', 'ĉeĥio', 'arkivo', 'ekspozicio', 'museo', 'exposiciones'],
    features: {
      eo: ['Konstanta ekspozicio pri la historio de Esperanto', 'Temaj ĉiujaraj novaj ekspozicioj', 'Muzea biblioteko konsultebla rete', 'Parto de la urba historia heredaĵo'],
      es: ['Exposición permanente interactiva sobre la historia del idioma', 'Exposiciones temáticas que se renuevan anualmente', 'Catálogo bibliográfico consultable en línea', 'Situado en la emblemática Casa Ottendorfer'],
      en: ['Interactive permanent exhibition on Esperanto history', 'Annual thematic exhibitions', 'Searchable online library catalog', 'Housed in the historic Ottendorfer landmark']
    }
  },
  {
    id: 'viena-kolekto-planlingvoj',
    title: 'Kolekto por Planlingvoj (Aŭstria Nacia Biblioteko)',
    url: 'https://www.onb.ac.at/sammlungen/sammlung-fuer-plansprachen',
    displayUrl: 'onb.ac.at/plansprachen',
    category: 'literature',
    level: 'C1',
    isFree: true,
    format: 'website',
    author: 'Österreichische Nationalbibliothek (Wien)',
    year: '1927-2024',
    languages: ['de', 'eo', 'en'],
    description: {
      eo: 'La plej granda scienca arkivo kaj biblioteko de planlingvoj en la mondo, gardanta pli ol 45 000 librojn, 2 500 revuojn kaj 80 000 fotojn en la Hofburg-palaco.',
      es: 'El archivo e institución bibliográfica sobre lenguas planificadas más importante del mundo, con 45.000 volúmenes y 80.000 fotografías en el Palacio de Hofburg.',
      en: 'The world\'s foremost planned-language archive and research library, preserving 45,000 volumes, 2,500 journal runs, and 80,000 photos in Vienna\'s Hofburg Palace.'
    },
    tags: ['vieno', 'aŭstrio', 'arkivo', 'hofburg', 'nacia biblioteko', 'plansprachen', 'biblioteca nacional'],
    features: {
      eo: ['Pli ol 45 000 volumoj de planlingvoj', 'Grandega cifereca skanita kolekto rete atingebla', 'Esplorcentro por lingvistoj kaj historiistoj', 'Ŝtata aŭstria heredaĵo ekde 1927'],
      es: ['Más de 45.000 volúmenes de esperanto e interlingüística', 'Inmensa colección digital accesible online', 'Centro de investigación para historiadores y filólogos', 'Custodia estatal en el Palacio de Hofburg de Viena'],
      en: ['Over 45,000 cataloged volumes on planned languages', 'Massive digitized collection accessible worldwide', 'Premier research center for linguists and historians', 'State-preserved Austrian heritage since 1927']
    }
  },
  {
    id: 'librejo-hodler',
    title: 'Biblioteko Hector Hodler (UEA)',
    url: 'https://uea.org/asocio/biblioteko',
    displayUrl: 'uea.org/biblioteko',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Universala Esperanto-Asocio & Nacia Biblioteko de Pollando',
    year: '1908-2024',
    languages: ['eo'],
    description: {
      eo: 'Unu el la plej riĉaj historiaj kolektoj de la Esperanto-movado, kun pli ol 30 000 libroj kaj miloj da maloftaj historiaj gazetoj nun konservataj en Varsovio.',
      es: 'Una de las colecciones históricas más ricas del movimiento esperantista, con más de 30.000 libros y periódicos raros, custodiada en la Biblioteca Nacional de Polonia.',
      en: 'One of the richest historical collections of the Esperanto movement, comprising over 30,000 volumes and rare historic periodicals, preserved in Warsaw.'
    },
    tags: ['hodler', 'uea', 'biblioteko', 'varsovio', 'historio', 'arkivo', 'coleccion'],
    features: {
      eo: ['Pli ol 30 000 libroj ekde la Unua Libro de 1887', 'Konservata en la Nacia Biblioteko de Pollando (Biblioteka Narodowa)', 'Scienca reta katalogo', 'Unika historia arkivo de UEA'],
      es: ['Más de 30.000 libros desde el Unua Libro de 1887', 'Custodiada en la Biblioteca Nacional de Polonia en Varsovia', 'Catálogo en línea para investigadores', 'Fondo histórico documental inigualable'],
      en: ['Over 30,000 books dating back to the 1887 Unua Libro', 'Preserved at the National Library of Poland in Warsaw', 'Online scholarly catalog for researchers', 'Unique documentary record of UEA']
    }
  },

  // ==========================================
  // BLOKO 3: LINGVAJ ILOJ, TERMINAROJ & PROGRAMARO (TOOLS & SOFTWARE)
  // ==========================================
  {
    id: 'firefox-esperanto',
    title: 'Mozilla Firefox en Esperanto',
    url: 'https://www.mozilla.org/eo/firefox/new/',
    displayUrl: 'mozilla.org/eo/firefox',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Mozilla & Esperanto-Tradukteamo',
    languages: ['eo'],
    description: {
      eo: 'La fama malfermfonta retumilo plene tradukita en Esperanton, kun enkonstruita literumilo kaj respekto al persona privateco.',
      es: 'El popular navegador web de código abierto traducido íntegramente al esperanto, con corrector ortográfico incorporado y protección de privacidad.',
      en: 'The renowned open-source web browser fully localized into Esperanto, featuring built-in spell-checking and built-in privacy protection.'
    },
    tags: ['firefox', 'retumilo', 'mozilla', 'malferma kodo', 'privateco', 'navegador', 'software libre'],
    features: {
      eo: ['Plene lokalizita interfaco en Esperanto', 'Enkonstruita literumilo por skribado', 'Sekura, rapida kaj privateca retumado', 'Miloj da etendaĵoj disponeblaj'],
      es: ['Interfaz completa traducida al esperanto', 'Corrector ortográfico en esperanto integrado', 'Navegación rápida, segura y privada', 'Miles de complementos disponibles'],
      en: ['Complete native Esperanto interface', 'Integrated Esperanto spell-checker dictionary', 'Private, secure, and fast browsing', 'Thousands of compatible add-ons']
    }
  },
  {
    id: 'libreoffice-esperanto',
    title: 'LibreOffice en Esperanto',
    url: 'https://eo.libreoffice.org',
    displayUrl: 'eo.libreoffice.org',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'The Document Foundation',
    languages: ['eo'],
    description: {
      eo: 'Plena senpaga oficeja programaro (tekstprilaborilo, tabelkalkulilo, prezentaĵoj) kun esperantlingva interfaco, ortografia korektilo kaj tesauro.',
      es: 'Paquete ofimático libre completo (procesador de textos, hoja de cálculo, presentaciones) con interfaz en esperanto, corrector ortográfico y sinónimos.',
      en: 'A comprehensive free office suite (Writer, Calc, Impress) translated into Esperanto, with complete spell-checker and thesaurus integration.'
    },
    tags: ['libreoffice', 'oficejo', 'tekstilo', 'literumilo', 'ofimatica', 'software libre'],
    features: {
      eo: ['Tekstilo Writer, tabelkalkulilo Calc, prezentaĵoj Impress', 'Plena interfaco en Esperanto', 'Literumilo kaj tesauro de sinonimoj', 'Malfermkoda kaj tute senkosta'],
      es: ['Herramientas completas equivalentes a Word, Excel y PowerPoint', 'Traducción de menús y ayudas al esperanto', 'Diccionario ortográfico y tesauro integrados', 'Código abierto y completamente gratis'],
      en: ['Full office applications (Writer, Calc, Impress)', 'Complete UI translation in Esperanto', 'Integrated spell-checker and synonym thesaurus', 'Free and open-source']
    }
  },
  {
    id: 'gboard-esperanto',
    title: 'Gboard Esperanto Keyboard (Google)',
    url: 'https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin',
    displayUrl: 'play.google.com/gboard',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'app',
    author: 'Google',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'La oficiala klavaro de Google por Android kaj iOS kun plena subteno por Esperanto: aŭtomata literumado, glit-tajpado kaj ĉapeletaj literoj.',
      es: 'El teclado oficial de Google para Android e iOS con compatibilidad total con el esperanto: predicción de palabras, escritura por gestos y acentos directos.',
      en: 'Google\'s official keyboard for Android and iOS with comprehensive Esperanto support: predictive text, glide typing, and easy diacritic input.'
    },
    tags: ['gboard', 'klavaro', 'google', 'android', 'ios', 'supersignoj', 'teclado', 'movil'],
    features: {
      eo: ['Diligenta enmeto de ĉ, ĝ, ĥ, ĵ, ŝ, ŭ', 'Aŭtomata vorto-korektado kaj sugestoj en Esperanto', 'Glit-tajpado (swipe typing)', 'Senpaga en Android kaj iOS'],
      es: ['Escritura fluida de caracteres diacríticos (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ)', 'Corrección ortográfica y predicción contextual inteligente', 'Escritura deslizando el dedo por el teclado', 'Gratuito para Android e iOS'],
      en: ['Dedicated diacritic character keys (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ)', 'Context-aware predictive text and auto-correct', 'Glide typing gesture input', 'Free for Android and iOS']
    }
  },
  {
    id: 'bertilow-lingvaj-notoj',
    title: 'Lingvaj Notoj de Bertilo Wennergren',
    url: 'https://bertilow.com/lingvo/',
    displayUrl: 'bertilow.com/lingvo',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Bertilo Wennergren',
    languages: ['eo'],
    description: {
      eo: 'Ampleksa kolekto de profundaj eseoj kaj klarigoj pri subtilaj punktoj de la esperanta gramatiko, lando-nomoj, transskribado kaj lingva evoluo.',
      es: 'Colección de ensayos rigurosos sobre puntos sutiles de la gramática del esperanto, nombres de países, transcripción fonética y evolución de la lengua.',
      en: 'A collection of essays and detailed explications of subtle points in Esperanto grammar, toponymy, transcription rules, and language evolution.'
    },
    tags: ['bertilo', 'notoj', 'gramatiko', 'akademiano', 'landnomoj', 'lingvistiko', 'linguistica'],
    features: {
      eo: ['Klarigoj de disputataj gramatikaj demandoj', 'Oficialaj rekomendoj pri landnomoj', 'Studoj pri la Fundamento de Esperanto', 'Verkita de akademiano Bertilo Wennergren'],
      es: ['Respuestas documentadas a dudas gramaticales complejas', 'Guía exhaustiva sobre toponimia y nombres de países', 'Análisis histórico del Fundamento de Zamenhof', 'Autoría del renombrado académico Bertilo Wennergren'],
      en: ['Solutions for contested grammatical points', 'Authoritative recommendations on country names', 'Studies on the foundational grammar', 'Written by Academy member Bertilo Wennergren']
    }
  },
  {
    id: 'vortaro-biz',
    title: 'Vortaro.biz - Praktika Reta Vortaro',
    url: 'http://vortaro.biz',
    displayUrl: 'vortaro.biz',
    category: 'tools',
    level: 'A2',
    isFree: true,
    format: 'tool',
    author: 'Vortaro Biz Projekto',
    languages: ['eo', 'es'],
    description: {
      eo: 'Simpla kaj efika reta vortaro hispana-esperanta kaj esperanta-hispana por rapidaj serĉoj en komputilo aŭ poŝtelefono.',
      es: 'Diccionario online práctico y ágil español-esperanto y esperanto-español para búsquedas rápidas en cualquier dispositivo.',
      en: 'A lightweight and practical bidirectional Spanish-Esperanto online dictionary for speedy lookups on desktop and mobile.'
    },
    tags: ['vortaro.biz', 'hispana', 'dudirekta', 'rapida', 'diccionario', 'espanol'],
    features: {
      eo: ['Dudirekta tuja traduko', 'Ekzemploj de oftaj esprimoj', 'Facile uzebla en poŝtelefono', 'Senpage atingebla'],
      es: ['Búsqueda bidireccional instantánea', 'Expresiones y giros coloquiales comunes', 'Diseño optimizado para pantallas táctiles', 'Acceso directo sin esperas'],
      en: ['Instant bidirectional translation', 'Common idioms and phrases included', 'Mobile-friendly responsive design', 'Fast, free access']
    }
  },
  {
    id: 'transifex-esperanto',
    title: 'Esperanto-Tradukado de Malferma Kodo',
    url: 'https://explore.transifex.com/languages/eo/',
    displayUrl: 'transifex.com/languages/eo',
    category: 'tools',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Transifex & Volontuloj',
    languages: ['eo', 'en'],
    description: {
      eo: 'Kunlabora portalo kie esperantistoj tradukas centojn da popularaj malfermfontaj aplikaĵoj, retejoj kaj ludoj en Esperanton.',
      es: 'Comunidad colaborativa donde voluntarios traducen al esperanto cientos de programas de código abierto, herramientas web y videojuegos.',
      en: 'Collaborative localization hub where Esperanto speakers translate hundreds of open-source applications, web utilities, and games.'
    },
    tags: ['lokalizado', 'tradukado', 'malferma kodo', 'programoj', 'transifex', 'traduccion', 'software'],
    features: {
      eo: ['Centoj da projektoj tradukataj de volontuloj', 'Terminologiaj glosaroj kaj memortradukoj', 'Facila reta interfaco sen bezono de programado', 'Helpas fari la interreton esperantlingva'],
      es: ['Cientos de proyectos de software libre en proceso de traducción', 'Glosarios y memorias de traducción integradas', 'Interfaz web intuitiva abierta a cualquier colaborador', 'Contribuye a que el ecosistema digital esté disponible en esperanto'],
      en: ['Hundreds of open-source projects actively translated', 'Integrated translation memory and glossaries', 'Intuitive web UI welcoming any bilingual contributor', 'Expands Esperanto\'s presence across modern software']
    }
  },

  // ==========================================
  // BLOKO 4: PERIODAĴOJ, BLOGOJ & PODKASTOJ (NEWS & PODCASTS)
  // ==========================================
  {
    id: 'scivolemo-blogo',
    title: 'Scivolemo - Scienco kaj Teknologio',
    url: 'https://scivolemo.wordpress.com',
    displayUrl: 'scivolemo.wordpress.com',
    category: 'news',
    level: 'A2',
    isFree: true,
    format: 'website',
    author: 'Scivolemo Redakcio',
    languages: ['eo'],
    description: {
      eo: 'Blogo dediĉita al popularigo de scienco, naturo, fiziko kaj astronomio klarigitaj per facila, alloga kaj komprenebla Esperanto.',
      es: 'Blog divulgativo dedicado a la ciencia, la naturaleza, la física y la astronomía explicadas en un esperanto claro, cercano y accesible.',
      en: 'A popular science blog explaining biology, physics, nature, and space exploration in accessible and engaging Esperanto.'
    },
    tags: ['scivolemo', 'scienco', 'blogo', 'astronomio', 'naturo', 'divulgacion', 'ciencia'],
    features: {
      eo: ['Mallongaj kaj facilaj sciencaj artikoloj', 'Bonegaj ilustraĵoj kaj fotoj', 'Konvenas por lingvolernantoj de nivelo A2-B1', 'Senpage legebla'],
      es: ['Artículos científicos breves de lectura amena', 'Fotografías e infografías explicativas', 'Ideal para estudiantes de nivel A2 a B1', 'Lectura libre'],
      en: ['Short, accessible popular-science articles', 'Rich photos and explanatory graphics', 'Perfect reading practice for A2-B1 learners', 'Free to read']
    }
  },
  {
    id: 'bona-renkonto-podkasto',
    title: 'Bona Renkonto - Podkasto pri Renkontiĝoj',
    url: 'https://anchor.fm/bonarenkonto',
    displayUrl: 'anchor.fm/bonarenkonto',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Stela Besenyei & Amikoj',
    languages: ['eo'],
    description: {
      eo: 'Amikema kaj agrabla podkasto kun intervjuoj pri internaciaj esperantaj renkontiĝoj, festivaloj, vojaĝoj kaj movada vivo.',
      es: 'Agradable podcast de entrevistas sobre encuentros internacionales de esperanto, festivales culturales, viajes y anécdotas comunitarias.',
      en: 'A friendly podcast featuring interviews about international Esperanto gatherings, cultural festivals, travels, and community life.'
    },
    tags: ['bona仿真kont', 'podkasto', 'renkontiĝoj', 'intervjuoj', 'vojaĝoj', 'podcast', 'viajes'],
    features: {
      eo: ['Intervjuoj kun organizantoj de festivaloj', 'Klaraj kaj distraj sonregistraĵoj', 'Disponebla en Spotify kaj Apple Podcasts', 'Gaja kaj bonhumura etoso'],
      es: ['Entrevistas a organizadores de congresos y festivales', 'Grabaciones amenas con dicción cuidada', 'Disponible en las principales plataformas de podcast', 'Tono cercano y positivo'],
      en: ['Conversations with festival and congress organizers', 'Paced, pleasant audio diction', 'Available on Spotify and Apple Podcasts', 'Warm and welcoming community atmosphere']
    }
  },
  {
    id: 'radio-aktiva-urugvajo',
    title: 'Radio Aktiva (Urugvajo)',
    url: 'https://esperanto.uy/radioaktiva/',
    displayUrl: 'esperanto.uy/radioaktiva',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Urugvaja Esperanto-Societo',
    languages: ['eo', 'es'],
    description: {
      eo: 'Sudamerika reta radioprogramo el Montevideo kun muziko, novaĵoj pri la movado en Sudameriko kaj intervjuoj kun latinamerikaj esperantistoj.',
      es: 'Espacio radiofónico online desde Montevideo con música, novedades del movimiento en América del Sur y entrevistas a hablantes latinoamericanos.',
      en: 'South American online radio broadcast from Montevideo featuring music, regional news from across Latin America, and interviews.'
    },
    tags: ['urugvajo', 'montevideo', 'radio', 'latinameriko', 'muziko', 'uruguay', 'podcast'],
    features: {
      eo: ['Elsendoj el Sudameriko kun latina muziko', 'Intervjuoj kun lokaj aktivuloj', 'Dulingvaj klarigoj por hispanlingvanoj', 'Atingebla enrete senpage'],
      es: ['Emisiones con música y perspectiva del Río de la Plata', 'Entrevistas a figuras del esperanto latinoamericano', 'Apuntes bilingües de apoyo', 'Escucha gratuita en la web'],
      en: ['Broadcasts with South American music and cultural focus', 'Spotlights on Latin American Esperanto activists', 'Bilingual notes for Spanish speakers', 'Streamed free online']
    }
  },
  {
    id: 'fenestro-revuo',
    title: 'Fenestro - Reta Kultura Revuo',
    url: 'https://revuofenestro.wordpress.com',
    displayUrl: 'revuofenestro.wordpress.com',
    category: 'news',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Revuo Fenestro Redakcio',
    languages: ['eo'],
    description: {
      eo: 'Sendependa kultura monata revuo enhavanta rakontojn, poemojn, recenzojn pri libroj kaj filmoj, kaj intervjuojn kun artistoj.',
      es: 'Revista cultural mensual independiente con relatos, poesía, reseñas de cine y libros, y entrevistas con creadores del esperanto.',
      en: 'An independent monthly cultural magazine publishing short stories, poetry, film and book reviews, and interviews with artists.'
    },
    tags: ['fenestro', 'revuo', 'kulturo', 'poezio', 'recenzoj', 'revista', 'cultura'],
    features: {
      eo: ['Monataj novaj eldonoj', 'Aperigas verkojn de novaj kaj spertaj verkistoj', 'Senkosta cifereca legado', 'Rikega kultura variaĵo'],
      es: ['Nuevos números cada mes', 'Espacio para autores nóveles y consolidados', 'Lectura digital gratuita en la web y PDF', 'Variedad de géneros artísticos'],
      en: ['Fresh monthly editions', 'Showcases both emerging and established writers', 'Free web and PDF reading access', 'Diverse array of artistic genres']
    }
  },
  {
    id: 'afrika-bulteno',
    title: 'Afrika Bulteno de Esperanto (UEA)',
    url: 'https://uea.org/afriko',
    displayUrl: 'uea.org/afriko',
    category: 'news',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Afrika Komisiono de UEA',
    languages: ['eo'],
    description: {
      eo: 'La oficiala informilo pri la dinamika kreskado de Esperanto en Afriko: raportoj pri naciaj kongresoj en Benino, Togolando, Burundo, Kongo kaj Madagaskaro.',
      es: 'El boletín oficial sobre la rápida expansión del esperanto en África: crónicas de congresos en Benín, Togo, Burundi, R. D. del Congo y Madagascar.',
      en: 'The official bulletin tracking the vibrant growth of Esperanto across Africa: reports from congresses in Benin, Togo, Burundi, DR Congo, and Madagascar.'
    },
    tags: ['afriko', 'uea', 'benino', 'togolando', 'burundo', 'bulteno', 'africa', 'movimiento'],
    features: {
      eo: ['Raportoj pri la plej rapide kreskanta regiono de Esperantujo', 'Fotoj kaj atestoj de afrikaj gejunuloj', 'Elŝutebla en PDF senpage', 'Subtenata de la Afrika Komisiono de UEA'],
      es: ['Crónicas de la región con mayor dinamismo juvenil del idioma', 'Testimonios y fotografías de proyectos locales', 'Descarga gratuita en PDF', 'Coordinado por la Comisión Africana de la UEA'],
      en: ['Dispatches from the fastest-growing youth region of the movement', 'Firsthand accounts and photos from local initiatives', 'Free PDF downloads', 'Coordinated by UEA\'s Africa Commission']
    }
  },
  {
    id: 'podkasta-kiosko',
    title: 'Podkasta Kiosko - Ĉiuj Esperanto-Podkastoj',
    url: 'https://podkasto.net',
    displayUrl: 'podkasto.net',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Esperanto Podkasto Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Centra katalogo kaj RSS-agregilo de ĉiuj aktivaj podkastoj en Esperanto, ebligante aŭskulti aŭ aboni ajnan elsendon el unu loko.',
      es: 'Catálogo central y agregador RSS de todos los podcasts activos en esperanto para escuchar o suscribirse desde un único lugar.',
      en: 'A central directory and RSS aggregator of all active podcasts in Esperanto, enabling listeners to discover and stream shows in one place.'
    },
    tags: ['podkastoj', 'kiosko', 'agregilo', 'rss', 'audio', 'directorio', 'podcasts'],
    features: {
      eo: ['Kolektas ĉiujn esperanto-podkastojn en ununura retejo', 'Rekta aŭskultado en la retumilo', 'RSS-ligiloj por podkast-aplikaĵoj', 'Aŭtomate ĝisdatigata ĉiutage'],
      es: ['Reúne todos los podcasts en esperanto en una sola plataforma', 'Reproductor integrado directo en el navegador', 'Enlaces RSS compatibles con cualquier app de podcasts', 'Actualización automática'],
      en: ['Aggregates all Esperanto podcasts in one directory', 'In-browser playback', 'RSS feeds for all standard podcast apps', 'Automatically updated feeds']
    }
  },

  // ==========================================
  // BLOKO 5: NACIAJ ASOCIOJ KAJ KONGRESOJ (NATIONAL ASSOCIATIONS & CONFERENCES)
  // ==========================================
  {
    id: 'esperanto-usa-asocio',
    title: 'Esperanto-USA (Nacia Asocio de Usono)',
    url: 'https://esperanto-usa.org',
    displayUrl: 'esperanto-usa.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-USA',
    year: '1952-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'La nacia asocio en Usono kun granda libroservo, la bulteno Usona Esperantisto, kursoj, stipendioj kaj la ĉiujara Landa Kongreso.',
      es: 'La asociación nacional de Estados Unidos, con gran librería, la revista Usona Esperantisto, cursos, becas y su Congreso Nacional anual.',
      en: 'The national association in the United States, offering a large bookstore, the journal Usona Esperantisto, courses, scholarships, and the national congress.'
    },
    tags: ['usono', 'esperanto-usa', 'asocio', 'usona esperantisto', 'libroservo', 'estados unidos'],
    features: {
      eo: ['La revuo Usona Esperantisto legata tutmonde', 'Librovendejo kun centoj da libroj en Usono', 'Lokaj kluboj en Novjorko, Sanfrancisko, Ĉikago, ktp.', 'Stipendioj por junuloj partopreni kongresojn'],
      es: ['Revista bilingüe Usona Esperantisto', 'Gran librería con envíos rápidos en Norteamérica', 'Red de clubes en Nueva York, San Francisco, Chicago, etc.', 'Becas de viaje para jóvenes congresistas'],
      en: ['Bilingual magazine Usona Esperantisto', 'North American bookstore with fast shipping', 'Local chapters in NYC, San Francisco, Chicago, and more', 'Travel grants for youth to attend congresses']
    }
  },
  {
    id: 'germana-esperanto-asocio',
    title: 'Germana Esperanto-Asocio (GEA)',
    url: 'https://www.esperanto.de',
    displayUrl: 'esperanto.de',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Deutscher Esperanto-Bund (GEA)',
    year: '1906-2024',
    languages: ['de', 'eo'],
    description: {
      eo: 'Unu el la plej historiaj naciaj asocioj en Eŭropo, fondita en 1906 en Germanio, kunveniganta dekojn da regionaj kluboj kaj eldonanta la revuon Esperanto Aktuell.',
      es: 'Una de las asociaciones más veteranas de Europa, fundada en 1906 en Alemania, con decenas de clubes regionales y la revista bilingüe Esperanto Aktuell.',
      en: 'One of Europe\'s most historic national associations, founded in 1906 in Germany, coordinating regional chapters and publishing Esperanto Aktuell.'
    },
    tags: ['germanio', 'gea', 'asocio', 'berlino', 'esperanto aktuell', 'alemania', 'asociacion'],
    features: {
      eo: ['Fondita en 1906 kun pli ol jarcento da historio', 'La dulingva revuo Esperanto Aktuell', 'Germana Esperanto-Kongreso ĉiujare', 'Centra biblioteko kaj arkivo en Aalen'],
      es: ['Fundada en 1906 con más de un siglo de historia continuada', 'Revista bilingüe Esperanto Aktuell', 'Congreso Alemán de Esperanto anual', 'Biblioteca central en Aalen con miles de volúmenes'],
      en: ['Founded in 1906 with over a century of continuous activity', 'Bilingual magazine Esperanto Aktuell', 'Annual German Esperanto Congress', 'Extensive central library in Aalen']
    }
  },
  {
    id: 'esperanto-france',
    title: 'Espéranto-France (Franca Federacio)',
    url: 'https://esperanto-france.org',
    displayUrl: 'esperanto-france.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Espéranto-France',
    year: '1898-2024',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La historia franca asocio fondita en 1898 en Parizo, eldonanto de la revuo Le Monde de l’espéranto, organizanto de kursoj kaj KER-ekzamenoj.',
      es: 'La histórica federación francesa fundada en 1898 en París, editora de Le Monde de l’espéranto, impulsora de exámenes oficiales MCER y eventos culturales.',
      en: 'The historic French federation founded in 1898 in Paris, publisher of Le Monde de l’espéranto, running official CEFR exams and cultural seminars.'
    },
    tags: ['francio', 'parizo', 'asocio', 'ker-ekzamenoj', 'francia', 'asociacion', 'paris'],
    features: {
      eo: ['La plej malnova nacia asocio en la mondo (ekde 1898)', 'Sidejo kaj librovendejo en Parizo', 'Revuo Le Monde de l’espéranto', 'Oficialaj KER-ekzamenoj laŭ eŭropaj normoj'],
      es: ['La asociación nacional más antigua del mundo (fundada en 1898)', 'Sede y librería en el centro de París', 'Publicación periódica Le Monde de l’espéranto', 'Convocatorias oficiales de exámenes MCER'],
      en: ['Oldest national Esperanto association in the world (est. 1898)', 'Headquarters and bookstore in Paris', 'Periodical Le Monde de l’espéranto', 'Official CEFR European language exams']
    }
  },
  {
    id: 'itala-esperanto-federacio',
    title: 'Itala Esperanto-Federacio (FEI)',
    url: 'https://www.esperanto.it',
    displayUrl: 'esperanto.it',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Federazione Esperantista Italiana (FEI)',
    year: '1910-2024',
    languages: ['it', 'eo'],
    description: {
      eo: 'La nacia asocio en Italio, organizanto de la prestiĝa Itala Kongreso de Esperanto kaj eldonanto de la revuo L’Esperanto ekde 1910.',
      es: 'La federación nacional italiana, organizadora del prestigioso Congreso Italiano de Esperanto y editora de la revista L’Esperanto desde 1910.',
      en: 'The national Italian federation, organizers of the renowned Italian Esperanto Congress and publishers of L’Esperanto magazine since 1910.'
    },
    tags: ['italio', 'fei', 'asocio', 'roma', 'milano', 'italia', 'asociacion'],
    features: {
      eo: ['Itala Kongreso de Esperanto kun internacia famo', 'Revuo L’Esperanto', 'Nacia Centro de Esperanto en Milano', 'Kursoj kaj kulturaj prelegoj en universitatoj'],
      es: ['Congreso Italiano de Esperanto de gran proyección internacional', 'Revista L’Esperanto', 'Centro Nacional de Esperanto en Milán', 'Cursos y seminarios en universidades italianas'],
      en: ['Annual Italian Esperanto Congress with global prestige', 'L’Esperanto journal', 'National Esperanto Center in Milan', 'University lectures and language workshops']
    }
  },
  {
    id: 'japana-esperanto-instituto',
    title: 'Japana Esperanto-Instituto (JEI)',
    url: 'https://www.jei.or.jp',
    displayUrl: 'jei.or.jp',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Japana Esperanto-Instituto (JEI)',
    year: '1919-2024',
    languages: ['ja', 'eo'],
    description: {
      eo: 'La centra institucio de Esperanto en Tokio fondita en 1919, kun propra eldonejo, la revuo La Revuo Orienta kaj la Japana Esperanto-Kongreso.',
      es: 'La institución central del esperanto en Tokio fundada en 1919, con editorial propia, la histórica revista La Revuo Orienta y el Congreso Japonés.',
      en: 'The premier Esperanto institution in Tokyo founded in 1919, operating its own publishing house, La Revuo Orienta journal, and annual congresses.'
    },
    tags: ['japanio', 'jei', 'tokio', 'la revuo orienta', 'japana kongreso', 'japon', 'asia'],
    features: {
      eo: ['Propra konstruaĵo en Ŝinĝuku, Tokio', 'La historia revuo La Revuo Orienta', 'Pli ol 100 jaroj da seninterrompa laboro', 'Unu el la plej aktivaj aziaj asocioj'],
      es: ['Sede propia en Shinjuku, Tokio', 'Publicación centenaria La Revuo Orienta', 'Más de 100 años de historia ininterrumpida', 'Uno de los centros más activos de Asia'],
      en: ['Dedicated building in Shinjuku, Tokyo', 'Centennial journal La Revuo Orienta', 'Over a century of continuous activity', 'Leading pillar of the Asian movement']
    }
  },
  {
    id: 'kolombia-esperanto-ligo',
    title: 'Kolombia Esperanto-Ligo (KEL)',
    url: 'https://esperanto.co',
    displayUrl: 'esperanto.co',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kolombia Esperanto-Ligo',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia organizo en Kolombio kunveniganta klubojn en Bogoto, Medeĝino kaj Kalio, organizanta naciajn kongresojn kaj retajn konversaciajn rondojn.',
      es: 'La asociación nacional de Colombia que coordina clubes en Bogotá, Medellín y Cali, organizando congresos nacionales y tertulias virtuales.',
      en: 'The national organization in Colombia uniting chapters in Bogotá, Medellín, and Cali, hosting national congresses and virtual conversational circles.'
    },
    tags: ['kolombio', 'kel', 'bogoto', 'medejino', 'latinameriko', 'colombia', 'asociacion'],
    features: {
      eo: ['Organizanto de la Kolombia Esperanto-Kongreso', 'Semajnaj konversaciaj rondoj por komencantoj', 'Vigla ĉeesto en universitatoj', 'Kunlaboro kun aliaj andaj landoj'],
      es: ['Organización del Congreso Colombiano de Esperanto', 'Grupos semanales de conversación para aprendices', 'Presencia activa en universidades colombianas', 'Cooperación con el movimiento andino'],
      en: ['Organizers of the Colombian Esperanto Congress', 'Weekly conversational meetups for learners', 'Active student groups at Colombian universities', 'Cooperation across Andean nations']
    }
  },
  {
    id: 'kuba-esperanto-asocio',
    title: 'Kuba Esperanto-Asocio (KEA)',
    url: 'https://esperanto.cult.cu',
    displayUrl: 'esperanto.cult.cu',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kuba Esperanto-Asocio',
    year: '1979-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'Unu el la plej viglaj naciaj asocioj en la Karibio, rekonata de la Kuba Ministerio pri Kulturo, kun kursoj kaj granda junulara agado en Havano.',
      es: 'Una de las asociaciones más activas del Caribe, reconocida por el Ministerio de Cultura de Cuba, con intensa actividad juvenil y cursos en La Habana.',
      en: 'One of the most energetic national associations in the Caribbean, officially recognized by Cuba\'s Ministry of Culture, with bustling youth chapters.'
    },
    tags: ['kubo', 'kea', 'havano', 'karibio', 'ministerio', 'cuba', 'asociacion'],
    features: {
      eo: ['Oficiala rekono fare de la Kuba Registaro', 'Gastiganto de du Universalaj Kongresoj (1990 kaj 2010)', 'Kursoj en kulturaj domoj tra la tuta insulo', 'Tre vigla kaj amika komunumo'],
      es: ['Reconocimiento oficial del Ministerio de Cultura', 'Anfitriona de dos Congresos Universales (1990 y 2010)', 'Cursos en casas de cultura por toda la isla', 'Comunidad extraordinariamente hospitalaria'],
      en: ['Official recognition by the Cuban Ministry of Culture', 'Host of two Universal Congresses (1990 and 2010)', 'Courses taught at cultural houses across the island', 'Warm and welcoming local community']
    }
  },
  {
    id: 'argentina-esperanto-ligo',
    title: 'Argentina Esperanto-Ligo (AEL)',
    url: 'https://esperanto.org.ar',
    displayUrl: 'esperanto.org.ar',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Argentina Esperanto-Ligo',
    year: '1941-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'La historia asocio de Argentino fondita en Bonaero en 1941, organizanto de la Argentina Kongreso kaj posedanto de vasta faka biblioteko.',
      es: 'La histórica federación argentina fundada en Buenos Aires en 1941, organizadora del Congreso Argentino y con una rica biblioteca de préstamo.',
      en: 'The historic Argentine federation founded in Buenos Aires in 1941, organizing national congresses and maintaining an extensive lending library.'
    },
    tags: ['argentino', 'ael', 'bonaero', 'latinameriko', 'kongreso', 'argentina', 'asociacion'],
    features: {
      eo: ['Sidejo kaj historia biblioteko en Bonaero', 'La revuo Argentina Esperantisto', 'Ĉiujara Argentina Kongreso de Esperanto', 'Senpagaj kursoj por komencantoj'],
      es: ['Sede propia y biblioteca histórica en Buenos Aires', 'Publicación periódica Argentina Esperantisto', 'Congreso Argentino de Esperanto anual', 'Cursos gratuitos presenciales y en línea'],
      en: ['Headquarters and historic library in Buenos Aires', 'Periodical Argentina Esperantisto', 'Annual Argentine Esperanto Congress', 'Free introductory courses']
    }
  },

  // ==========================================
  // BLOKO 6: RENKONTIĜOJ & SOMERAJ LERNEJOJ (FESTIVALS & SUMMER SCHOOLS)
  // ==========================================
  {
    id: 'somera-esperanto-studado',
    title: 'SES - Somera Esperanto-Studado',
    url: 'https://ses.ikso.net',
    displayUrl: 'ses.ikso.net',
    category: 'community',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'E@I (Edukado@Interreto)',
    year: '2007-2024',
    languages: ['eo', 'sk', 'en', 'es', 'ru', 'de'],
    description: {
      eo: 'La plej granda internacia somera Esperanto-lernejo en la mondo organizata de E@I, kun intensaj matenaj kursoj por ĉiuj niveloj kaj riĉa vespera festivalo.',
      es: 'El mayor curso intensivo internacional de verano del mundo, organizado por E@I, con clases matinales por niveles (A1-C2) y festival cultural nocturno.',
      en: 'The world\'s largest international summer Esperanto school, organized by E@I, featuring morning language immersion across all levels and evening concerts.'
    },
    tags: ['ses', 'somera lernejo', 'slovakio', 'e@i', 'kursoj', 'koncertoj', 'verano', 'curso intensivo'],
    features: {
      eo: ['Profesiaj instruistoj por ĉiuj niveloj de A1 ĝis C2', 'Koncertoj, ekskursoj, teatraĵoj kaj internacia vespero', 'Pli ol 200 partoprenantoj el 30+ landoj', 'Eblo trapasi oficialan KER-ekzamenon'],
      es: ['Profesores de referencia para todos los niveles de aprendizaje', 'Conciertos en vivo, excursiones, teatro y veladas internacionales', 'Más de 200 participantes de más de 30 países', 'Convocatoria oficial para el examen MCER'],
      en: ['Top-tier instructors across all levels from beginner to fluent', 'Live concerts, day trips, theater, and international cabaret', 'Over 200 attendees from 30+ countries', 'Option to sit the official CEFR language examination']
    }
  },
  {
    id: 'internacia-junulara-festivalo',
    title: 'IJF - Internacia Junulara Festivalo (Italio)',
    url: 'https://ijf.iej.esperanto.it',
    displayUrl: 'ijf.iej.esperanto.it',
    category: 'community',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Itala Esperantista Junularo (IEJ)',
    year: '1977-2024',
    languages: ['it', 'eo'],
    description: {
      eo: 'La tradicia paska junulara renkontiĝo en Italio, kunveniganta pli ol 100 gejunulojn el la tuta mondo por semajno da ferioj, kursoj kaj festoj.',
      es: 'El tradicional festival juvenil de Semana Santa en Italia, que reúne a más de 100 jóvenes de todo el mundo para una semana de ocio, cursos y fiesta.',
      en: 'The traditional Easter youth festival in Italy, gathering over 100 young people from across the globe for a week of holiday, courses, and nightlife.'
    },
    tags: ['ijf', 'italio', 'pasko', 'junuloj', 'festo', 'ferioj', 'italia', 'festival'],
    features: {
      eo: ['Okazas ĉiujare dum la paska semajno en bela itala loko', 'Intensaj lingvaj kursoj por komencantoj', 'Muzikaj noktoj, trinkejoj kaj ekskursoj', 'Ideala unua renkontiĝo por junaj lernantoj'],
      es: ['Celebrado cada año durante la Semana Santa en bellas localidades italianas', 'Cursos intensivos de iniciación', 'Conciertos nocturnos, bar internacional y excursiones', 'Ideal como primer encuentro para jóvenes estudiantes'],
      en: ['Held annually during Easter week in scenic Italian towns', 'Crash courses for absolute beginners', 'Nightly music, social bar, and scenic excursions', 'Perfect first international event for young learners']
    }
  },
  {
    id: 'kultura-esperanto-festivalo',
    title: 'KEF - Kultura Esperanto-Festivalo',
    url: 'https://kef.esperanto.se',
    displayUrl: 'kef.esperanto.se',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'KEF Komitato & Skandinavaj Asocioj',
    languages: ['eo'],
    description: {
      eo: 'Plurtaga nordia arta kaj muzika festivalo dediĉita ekskluzive al originala esperantlingva kulturo: teatro, kino, koncertoj kaj literaturo.',
      es: 'Festival nórdico de arte y música de varios días dedicado íntegramente a la cultura original en esperanto: teatro, cine, conciertos y literatura.',
      en: 'A multi-day Nordic arts and music festival showcasing original Esperanto culture: theater, film screenings, rock concerts, and literature.'
    },
    tags: ['kef', 'festivalo', 'arto', 'muziko', 'teatro', 'skandinavio', 'festival', 'arte'],
    features: {
      eo: ['Koncertoj de la plej famaj esperanto-bandoj', 'Teatraj prezentadoj kaj poeziaj legadoj', 'Filmfestivalo kaj artaj metiejoj', 'Okazas en Danio, Svedio aŭ Finnlando'],
      es: ['Conciertos de las mejores bandas del panorama musical en esperanto', 'Representaciones teatrales y recitales poéticos', 'Proyección de películas y talleres creativos', 'Sede rotatoria en Dinamarca, Suecia o Finlandia'],
      en: ['Concerts by top Esperanto musical acts', 'Theatrical performances and poetry readings', 'Film screenings and hands-on artistic workshops', 'Rotates across Denmark, Sweden, and Finland']
    }
  },
  {
    id: 'arkones-konferenco',
    title: 'ARKONES - Arta Konferenco en Poznano',
    url: 'https://arkones.org',
    displayUrl: 'arkones.org',
    category: 'community',
    level: 'B1',
    isFree: false,
    format: 'website',
    author: 'ARKONES Komitato',
    year: '1985-2024',
    languages: ['eo', 'pl'],
    description: {
      eo: 'La plej granda ĉiujara sendependa kultura evento en Pollando kun koncertoj, prelegoj de famaj verkistoj, libro-prezentoj kaj filmoj.',
      es: 'El mayor evento cultural independiente anual en Polonia con conciertos, conferencias de autores consagrados, novedades editoriales y cine.',
      en: 'The largest annual independent cultural convention in Poland featuring live concerts, lectures by renowned authors, book launches, and cinema.'
    },
    tags: ['arkones', 'pollando', 'poznan', 'arto', 'prelegoj', 'koncertoj', 'polonia', 'cultura'],
    features: {
      eo: ['Pli ol 30 prelegoj pri scienco, historio kaj beletro', 'Koncertoj de famaj muzikistoj', 'Granda librovendejo kun rabatoj', 'Okazas en Poznano ĉiun septembron'],
      es: ['Más de 30 conferencias sobre ciencia, historia y literatura', 'Conciertos en vivo', 'Gran feria del libro con descuentos', 'Se celebra cada septiembre en Poznań'],
      en: ['Over 30 lectures spanning science, history, and the arts', 'Live acoustic and rock concerts', 'Bustling book bazaar with discounts', 'Held every September in Poznań']
    }
  },

  // ==========================================
  // BLOKO 7: FAKAJ KLUBOJ, SCIENCO & NATURO (SPECIALIZED TOPICS & NATURE)
  // ==========================================
  {
    id: 'esperanto-sak-asocio',
    title: 'Esperanta Ŝak-Ligo Internacia (EŜLI)',
    url: 'https://esperanto-shako.org',
    displayUrl: 'esperanto-shako.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanta Ŝak-Ligo Internacia',
    year: '1958-2024',
    languages: ['eo'],
    description: {
      eo: 'La faka asocio por ŝakludantoj fondita en 1958, organizanta internaciajn turnirojn per korespondado, retajn partiojn kaj ŝakan terminaron.',
      es: 'Asociación de ajedrez en esperanto fundada en 1958, organizadora de torneos internacionales por correspondencia, partidas en línea y vocabulario técnico.',
      en: 'The specialized association for chess players founded in 1958, hosting international correspondence and online tournaments with specialized terminology.'
    },
    tags: ['ŝako', 'ludoj', 'turniroj', 'esli', 'ajedrez', 'torneos'],
    features: {
      eo: ['Ŝakturniroj en Lichess kaj Chess.com tute en Esperanto', 'Oficiala faka ŝaka terminaro', 'Koresponda kaj viva ludado', 'Senpaga aliĝo por ĉiuj ŝak-amantoj'],
      es: ['Torneos periódicos en Lichess y Chess.com en esperanto', 'Vocabulario ajedrecístico técnico oficial', 'Partidas en vivo y por correspondencia', 'Inscripción abierta y gratuita'],
      en: ['Periodic tournaments on Lichess & Chess.com in Esperanto', 'Official chess terminology glossary', 'Live and correspondence tournaments', 'Open and free to all chess enthusiasts']
    }
  },
  {
    id: 'birdoj-en-esperanto',
    title: 'Ornitologia Retejo & Monda Birdonomaro',
    url: 'http://www.esperanto.mv.ru/Birdoj/',
    displayUrl: 'esperanto.mv.ru/Birdoj',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Jurij Finkel & Ornitologoj',
    languages: ['eo', 'la', 'es', 'en', 'ru'],
    description: {
      eo: 'Ampleksa scienca datumbazo kun la esperantaj nomoj de ĉiuj 10 000+ specioj de birdoj en la mondo, parigitaj kun la latinaj, hispanaj kaj anglaj sciencaj nomoj.',
      es: 'Base de datos científica exhaustiva con los nombres en esperanto de más de 10.000 especies de aves del planeta, con equivalencias en latín y español.',
      en: 'A comprehensive ornithological database providing the Esperanto names of all 10,000+ world bird species matched with Latin binomials and English names.'
    },
    tags: ['birdoj', 'ornitologio', 'zoologio', 'biologio', 'latina nomaro', 'aves', 'biologia'],
    features: {
      eo: ['Pli ol 10 000 birdospecioj kun oficialaj esperantaj nomoj', 'Parigitaj sciencaj latinaj nomoj', 'Klaraj fotoj kaj priskriboj', 'Serĉebla laŭ familioj kaj ordoj'],
      es: ['Más de 10.000 especies de aves con denominación estandarizada', 'Correspondencia con la nomenclatura binomial latina', 'Fotografías y distribución geográfica', 'Búsqueda sistemática por órdenes y familias'],
      en: ['Over 10,000 bird species with standardized Esperanto names', 'Matched with scientific Latin taxonomy', 'Photos and distribution details', 'Searchable by biological family and order']
    }
  },
  {
    id: 'filozofia-asocio-esperanto',
    title: 'Filozofia Asocio Esperantista (EFA)',
    url: 'https://filozofio.net',
    displayUrl: 'filozofio.net',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'website',
    author: 'Esperanta Filozofia Asocio',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio por tradukado kaj esplorado de filozofiaj tekstoj: eldonoj de Platono, Spinoza, Kant, Nietzsche kaj modernaj filozofiaj debatoj.',
      es: 'Asociación académica para la traducción y el debate filosófico: obras traducidas de Platón, Spinoza, Kant, Nietzsche y ensayos contemporáneos.',
      en: 'A scholarly association dedicated to philosophical translation and inquiry: texts of Plato, Spinoza, Kant, Nietzsche, and contemporary debates in Esperanto.'
    },
    tags: ['filozofio', 'kant', 'spinoza', 'platono', 'etiko', 'pripensado', 'filosofia', 'ensayos'],
    features: {
      eo: ['Tradukoj de klasikaj filozofiaj majstroverkoj', 'Akademiaj eseoj pri etiko, epistemologio kaj politiko', 'Terminaro pri filozofiaj nocioj', 'Libere legeblaj verkoj rete'],
      es: ['Traducciones íntegras de obras cumbres del pensamiento universal', 'Ensayos sobre ética, epistemología y teoría política', 'Glosario especializado de conceptos filosóficos', 'Textos completos de libre acceso'],
      en: ['Translations of seminal masterpieces of world philosophy', 'Essays on ethics, epistemology, and political theory', 'Glossary of specialized philosophical concepts', 'Open-access texts online']
    }
  },
  {
    id: 'medicina-asocio-umea',
    title: 'UMEA - Universala Medicina Esperanto-Asocio',
    url: 'https://umea.esperanto.cc',
    displayUrl: 'umea.esperanto.cc',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'Universala Medicina Esperanto-Asocio (UMEA)',
    year: '1908-2024',
    languages: ['eo'],
    description: {
      eo: 'Fondita en 1908, UMEA kunvenigas kuracistojn, farmacistojn kaj medicinajn esploristojn, kaj eldonas la fakan gazeton Medicina Internacia Revuo.',
      es: 'Fundada en 1908, la asociación reúne a médicos, farmacéuticos e investigadores de la salud, y publica la revista Medicina Internacia Revuo.',
      en: 'Founded in 1908, UMEA unites physicians, pharmacists, and medical researchers, publishing the peer-reviewed Medicina Internacia Revuo.'
    },
    tags: ['medicino', 'umea', 'kuracistoj', 'sano', 'faka', 'medicina', 'salud', 'ciencia'],
    features: {
      eo: ['Eldoninto de Medicina Internacia Revuo (MIR)', 'Yosi-Balo premio por elstaraj medicinaj esploroj', 'Medicinaj terminaroj kaj fakvortaroj', 'Pli ol 115 jaroj da scienca faka agado'],
      es: ['Publicación periódica Medicina Internacia Revuo (MIR)', 'Premio Yosi-Balo a investigaciones médicas pioneras', 'Glosarios terminológicos de medicina y farmacología', 'Más de 115 años de historia científica'],
      en: ['Publishes the journal Medicina Internacia Revuo (MIR)', 'Yosi-Balo award for outstanding medical research', 'Specialized glossaries for clinical medicine & anatomy', 'Over 115 years of medical history']
    }
  },
  {
    id: 'fervojista-asocio-ifef',
    title: 'IFEF - Internacia Fervojista Esperanto-Federacio',
    url: 'https://ifef.net',
    displayUrl: 'ifef.net',
    category: 'projects',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Internacia Fervojista Esperanto-Federacio',
    year: '1909-2024',
    languages: ['eo'],
    description: {
      eo: 'Unu el la plej historiaj fakaj asocioj en la mondo (ekde 1909), kunveniganta fervojistojn kaj trajnamantojn, kun faka Fervoja Terminaro en 5 lingvoj.',
      es: 'Una de las asociaciones ferroviarias más longevas del mundo (desde 1909), con glosario técnico ferroviario oficial en 5 idiomas y congresos anuales.',
      en: 'One of the world\'s oldest professional railway bodies (founded 1909), bringing together railway professionals and enthusiasts with a 5-language rail lexicon.'
    },
    tags: ['fervojo', 'trajnoj', 'ifef', 'fervojistoj', 'terminaro', 'trenes', 'ferrocarril'],
    features: {
      eo: ['Faka Fervoja Terminaro en 5 lingvoj', 'Ĉiujara Internacia Fervojista Esperanto-Kongreso', 'La bulteno Internacia Fervojisto', 'Membro de la Internacia Fervoja Federacio (FISAIC)'],
      es: ['Diccionario técnico ferroviario en 5 idiomas', 'Congreso Internacional Ferroviario anual', 'Boletín periódico Internacia Fervojisto', 'Miembro oficial de la federación internacional FISAIC'],
      en: ['Technical railway dictionary in 5 languages', 'Annual International Railway Esperanto Congress', 'Journal Internacia Fervojisto', 'Official member of FISAIC']
    }
  },
  {
    id: 'jurista-asocio-eaj',
    title: 'Esperanta Asocio de Juristoj (EAJ)',
    url: 'https://juristoj.esperanto.org',
    displayUrl: 'juristoj.esperanto.org',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'website',
    author: 'Esperanta Asocio de Juristoj',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio por juristoj, advokatoj, juĝistoj kaj studentoj pri juro, dediĉita al tradukado de internaciaj traktatoj, homaj rajtoj kaj jura terminaro.',
      es: 'Asociación profesional para abogados, jueces, notarios y juristas, dedicada a la traducción de tratados internacionales, derechos humanos y léxico legal.',
      en: 'Professional association for lawyers, judges, and legal scholars, dedicated to international treaties, human rights law, and legal terminology.'
    },
    tags: ['juro', 'juristoj', 'advokatoj', 'homaj rajtoj', 'traktatoj', 'derecho', 'abogados'],
    features: {
      eo: ['Plena faka jura terminaro en Esperanto', 'Tradukoj de UN-traktatoj kaj internacia juro', 'Simpozioj pri lingvaj rajtoj kaj leĝaro', 'Reto de juristoj el dekoj da landoj'],
      es: ['Vocabulario jurídico completo y riguroso', 'Traducción de convenciones de la ONU y derecho internacional', 'Simposios sobre derechos lingüísticos y legislación', 'Red de juristas y magistrados internacionales'],
      en: ['Comprehensive legal lexicon in Esperanto', 'Translations of UN conventions and international law', 'Symposia on linguistic human rights & legislation', 'Global network of jurists and magistrates']
    }
  },
  {
    id: 'minecraft-esperanto',
    title: 'Minecraft en Esperanto & Komunuma Servilo',
    url: 'https://esperanto.fandom.com/wiki/Minecraft',
    displayUrl: 'esperanto.fandom.com/minecraft',
    category: 'community',
    level: 'A2',
    isFree: true,
    format: 'forum',
    author: 'Esperanta Ludanto-Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Komunumo de esperantistaj ludantoj en Minecraft: la tuta ludo estas oficiale tradukita en Esperanton, kun komunuma servilo kie ĉiuj babilas nur en Esperanto.',
      es: 'Comunidad de jugadores de Minecraft en esperanto: el juego oficial incluye traducción completa al esperanto y cuenta con servidores dedicados para jugar.',
      en: 'Esperanto gaming community in Minecraft: the official game includes full Esperanto localization, with community servers where players interact entirely in Esperanto.'
    },
    tags: ['minecraft', 'videoludoj', 'servilo', 'junuloj', 'ludado', 'videojuegos', 'gaming'],
    features: {
      eo: ['Minecraft oficiale subtenas Esperanton en sia lingva menuo', 'Komunumaj serviloj por ludi kune rete', 'Voĉaj babilejoj en Discord dum ludado', 'Bonega por junuloj kaj komencantoj'],
      es: ['Minecraft incluye el esperanto de forma oficial en sus opciones', 'Servidores comunitarios para construir y jugar en equipo', 'Canales de voz en Discord mientras se juega', 'Ambiente informal y divertido para jóvenes'],
      en: ['Minecraft officially supports Esperanto in the language menu', 'Community multiplayer servers to build and explore together', 'Discord voice chat during sessions', 'Fun and informal environment for young learners']
    }
  },
  {
    id: 'boardgamearena-esperanto',
    title: 'Board Game Arena en Esperanto',
    url: 'https://boardgamearena.com',
    displayUrl: 'boardgamearena.com',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Board Game Arena & Tradukistoj',
    languages: ['eo', 'es', 'en', 'fr'],
    description: {
      eo: 'La plej granda reta tabulluda platformo en la mondo, tradukita en Esperanton: ludu Carcassonne, Catan, 7 Wonders kaj centojn da ludoj kun esperantistoj.',
      es: 'La mayor plataforma mundial de juegos de mesa online traducida al esperanto: juega a Carcassonne, Catán, 7 Wonders y cientos de títulos con hablantes.',
      en: 'The world\'s premier online board game platform, localized in Esperanto: play Carcassonne, Catan, 7 Wonders, and hundreds of titles with Esperanto speakers.'
    },
    tags: ['tabulludoj', 'ludoj', 'catan', 'carcassonne', 'komunumo', 'juegos de mesa', 'online'],
    features: {
      eo: ['Interfaco kaj ludreguloj tradukitaj en Esperanton', 'Grupo de esperantistaj ludantoj kun miloj da membroj', 'Pli ol 800 tabulludoj ludeblaj en retumilo', 'Senpaga aliro'],
      es: ['Interfaz y reglamentos de juegos traducidos al esperanto', 'Club de jugadores de esperanto con partidas regulares', 'Más de 800 juegos de mesa jugables en el navegador', 'Acceso gratuito'],
      en: ['Interface and game rules available in Esperanto', 'Dedicated Esperanto player club with regular tables', 'Over 800 board games playable in browser', 'Free access']
    }
  },

  // ==========================================
  // BLOKO 8: KROMAJ NACIAJ ASOCIOJ & TUTMONDA KOMUNUMO (GLOBAL NETWORK)
  // ==========================================
  {
    id: 'perua-esperanto-asocio',
    title: 'Perua Esperanto-Asocio (PEA)',
    url: 'https://esperanto-peru.org',
    displayUrl: 'esperanto-peru.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Perua Esperanto-Asocio',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia asocio en Peruo kun sidejo en Lima, kunveniganta andajn esperantistojn, organizanta naciajn renkontiĝojn kaj kursojn.',
      es: 'La asociación nacional de Perú con sede en Lima, que reúne a hablantes de la región andina y organiza encuentros y cursos.',
      en: 'The national association in Peru based in Lima, bringing together Andean Esperanto speakers and hosting cultural gatherings.'
    },
    tags: ['peruo', 'lima', 'andaj landoj', 'latinameriko', 'asocio', 'peru'],
    features: {
      eo: ['Konversaciaj rondoj en Lima kaj Kusko', 'Kursoj por hispanlingvaj komencantoj', 'Bulteno de la perua movado', 'Kultura kunlaboro kun najbaraj landoj'],
      es: ['Tertulias y círculos de conversación en Lima y Cusco', 'Cursos de iniciación para hispanohablantes', 'Boletín del movimiento peruano', 'Cooperación cultural con países vecinos'],
      en: ['Conversation circles in Lima and Cusco', 'Introductory courses for Spanish speakers', 'Peruvian community bulletin', 'Cultural ties with neighboring Andean nations']
    }
  },
  {
    id: 'cxilia-esperanto-asocio',
    title: 'Ĉilia Esperanto-Asocio',
    url: 'https://esperanto.cl',
    displayUrl: 'esperanto.cl',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Ĉilia Esperanto-Asocio',
    languages: ['es', 'eo'],
    description: {
      eo: 'Nacia asocio en Ĉilio, organizanta renkontiĝojn en Santiago kaj Valparaíso, eldonanta bultenojn kaj helpanta al novaj lernantoj.',
      es: 'Asociación nacional de Chile, organizadora de encuentros en Santiago y Valparaíso, publicaciones y apoyo a nuevos estudiantes.',
      en: 'The national association in Chile, organizing community gatherings in Santiago and Valparaíso, newsletters, and learner support.'
    },
    tags: ['ĉilio', 'santiago', 'valparaiso', 'latinameriko', 'asocio', 'chile'],
    features: {
      eo: ['Renkontiĝoj en Santiago de Ĉilio', 'Aktivaj retaj babilgrupoj', 'Biblioteko de libroj en Ĉilio', 'Subteno al novaj membroj'],
      es: ['Encuentros presenciales en Santiago de Chile', 'Grupos activos de conversación virtual', 'Fondo bibliográfico local', 'Orientación y apoyo a nuevos socios'],
      en: ['In-person meetups in Santiago', 'Active virtual chat groups', 'Local lending library of books', 'Welcoming mentorship for newcomers']
    }
  },
  {
    id: 'pola-esperanto-asocio',
    title: 'Pola Esperanto-Asocio (PEA)',
    url: 'https://esperanto.pl',
    displayUrl: 'esperanto.pl',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Polski Związek Esperantystów (PEA)',
    year: '1908-2024',
    languages: ['pl', 'eo'],
    description: {
      eo: 'La nacia asocio en la naskiĝlando de L.L. Zamenhof, kun sidejo en Varsovio kaj branĉoj en Bjalistoko, Krakovo, Vroclavo kaj Lodzo.',
      es: 'La asociación nacional en la tierra natal del Dr. Zamenhof, con sede en Varsovia y filiales en Białystok, Cracovia, Breslavia y Łódź.',
      en: 'The national association in the homeland of L.L. Zamenhof, headquartered in Warsaw with branches in Białystok, Kraków, Wrocław, and Łódź.'
    },
    tags: ['pollando', 'varsovio', 'bjalistoko', 'zamenhof', 'pea', 'polonia', 'asociacion'],
    features: {
      eo: ['Historio ekde 1908 en la patrolando de Esperanto', 'La revuo Pola Esperantisto aperanta ekde 1906', 'Zamenhof-Centro en Bjalistoko', 'Polaj Esperanto-Kongresoj ĉiujare'],
      es: ['Más de un siglo de historia en la cuna del idioma', 'Revista histórica Pola Esperantisto editada desde 1906', 'Centro Zamenhof en Białystok con museo y exposiciones', 'Congreso Polaco anual'],
      en: ['Over a century of history in the birthplace of the language', 'Historic journal Pola Esperantisto published since 1906', 'Zamenhof Center in Białystok with museum exhibits', 'Annual Polish Congress']
    }
  },
  {
    id: 'svisa-esperanto-societo',
    title: 'Svisa Esperanto-Societo (SES)',
    url: 'https://esperanto.ch',
    displayUrl: 'esperanto.ch',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Svisa Esperanto-Societo',
    year: '1903-2024',
    languages: ['de', 'fr', 'it', 'eo'],
    description: {
      eo: 'Fondita en 1903 en Svislando, lando de Claude Piron kaj Hector Hodler, eldonanto de Svisa Esperanto-Revuo kaj gardanto de gravaj kulturaj arkivoj.',
      es: 'Fundada en 1903 en Suiza, cuna de Claude Piron y Hector Hodler, editora de Svisa Esperanto-Revuo y custodia de importantes archivos culturales.',
      en: 'Founded in 1903 in Switzerland, homeland of Claude Piron and Hector Hodler, publisher of Svisa Esperanto-Revuo and keeper of historic archives.'
    },
    tags: ['svislando', 'ses', 'zuriko', 'ĝenevo', 'claude piron', 'suiza', 'asociacion'],
    features: {
      eo: ['Pli ol 120 jaroj da seninterrompa historio', 'Kvarlingva oficiala retejo (germana, franca, itala, Esperanto)', 'Svisa Esperanto-Revuo', 'Rikega arkivo en Ĝenevo kaj La Chaux-de-Fonds (CDELI)'],
      es: ['Más de 120 años de historia ininterrumpida', 'Web oficial en cuatro idiomas (alemán, francés, italiano y esperanto)', 'Revista periódica Svisa Esperanto-Revuo', 'Conexión con el gran centro de documentación CDELI'],
      en: ['Over 120 years of continuous activity', 'Quadrilingual portal (German, French, Italian, Esperanto)', 'Svisa Esperanto-Revuo journal', 'Ties with the CDELI documentation center']
    }
  },
  {
    id: 'austria-esperanto-federacio',
    title: 'Aŭstria Esperanto-Federacio (AEF)',
    url: 'https://www.esperanto.at',
    displayUrl: 'esperanto.at',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Aŭstria Esperanto-Federacio',
    year: '1936-2024',
    languages: ['de', 'eo'],
    description: {
      eo: 'La nacia federacio en Aŭstrio kun sidejo en Vieno, proksime kunlaboranta kun la Monda Kolekto por Planlingvoj de la Aŭstria Nacia Biblioteko.',
      es: 'La federación nacional austriaca con sede en Viena, que colabora estrechamente con el Museo de Planlingvoj de la Biblioteca Nacional de Austria.',
      en: 'The national Austrian federation based in Vienna, working in close cooperation with the Planned Languages Collection at the Austrian National Library.'
    },
    tags: ['aŭstrio', 'vieno', 'aef', 'nacia biblioteko', 'austria', 'viena'],
    features: {
      eo: ['Sidejo en Vieno kun historiaj kluboj', 'Kunlaboro kun la Esperanto-Muzeo en Vieno', 'Bulteno Esperanto Aktuell Aŭstrio', 'Kursoj kaj kulturaj prelegoj'],
      es: ['Sede en Viena con reuniones periódicas', 'Colaboración con el Museo del Esperanto de Viena', 'Boletín informativo austriaco', 'Cursos y conferencias culturales'],
      en: ['Headquarters in Vienna with regular meetups', 'Collaboration with the Vienna Esperanto Museum', 'Austrian community newsletter', 'Courses and cultural lectures']
    }
  },
  {
    id: 'nederlanda-esperanto-asocio',
    title: 'Esperanto Nederland',
    url: 'https://esperanto-nederland.nl',
    displayUrl: 'esperanto-nederland.nl',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto Nederland',
    languages: ['nl', 'eo'],
    description: {
      eo: 'La nacia organizo en Nederlando, hejmlando de la Centra Oficejo de UEA en Roterdamo, organizanta regionajn renkontiĝojn kaj kursojn.',
      es: 'La organización nacional de los Países Bajos, país anfitrión de la Sede Central de la UEA en Róterdam, con cursos y encuentros regionales.',
      en: 'The national organization in the Netherlands, host country to UEA\'s Central Office in Rotterdam, organizing regional events and language courses.'
    },
    tags: ['nederlando', 'roterdamo', 'amsterdamo', 'asocio', 'paises bajos', 'holanda'],
    features: {
      eo: ['Proksima rilato kun la Centra Oficejo de UEA en Roterdamo', 'La revuo Fenikso aperanta sesfoje jare', 'Kursoj por nederlandlingvanoj', 'Renkontiĝoj tra la tuta lando'],
      es: ['Estrecha vinculación con la Sede Central de la UEA en Róterdam', 'Revista bilingüe Fenikso seis veces al año', 'Cursos adaptados para neerlandófonos', 'Encuentros por todo el país'],
      en: ['Close ties to the UEA Central Office in Rotterdam', 'Bilingual journal Fenikso published bi-monthly', 'Courses tailored for Dutch speakers', 'Nationwide regional meetups']
    }
  },
  {
    id: 'hungara-esperanto-asocio',
    title: 'Hungaria Esperanto-Asocio (HEA)',
    url: 'https://esperantohea.hu',
    displayUrl: 'esperantohea.hu',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Magyarországi Eszperantó Szövetség (HEA)',
    year: '1902-2024',
    languages: ['hu', 'eo'],
    description: {
      eo: 'Unu el la plej prestiĝaj historiaj asocioj, hejmlando de la fama "Budapeŝta skolo" de Kalocsay kaj Baghy, kaj de ŝtataj universitataj ekzamenoj.',
      es: 'Una de las asociaciones con mayor tradición literaria, cuna de la célebre Escuela de Budapest (Kalocsay y Baghy) y exámenes estatales universitarios.',
      en: 'One of the most illustrious literary associations, home of the celebrated Budapest School (Kalocsay & Baghy) and accredited state university exams.'
    },
    tags: ['hungario', 'budapesto', 'hea', 'kalocsay', 'baghy', 'hungria', 'literatura'],
    features: {
      eo: ['Cirklo de la fama Budapeŝta Literatura Skolo', 'Oficiala rekono de Esperanto en hungaraj universitatoj', 'Hungara Vivo kaj historiaj eldonaĵoj', 'Pli ol 120 jaroj da historio'],
      es: ['Cuna de la Escuela Literaria de Budapest', 'Reconocimiento oficial del idioma con créditos universitarios en Hungría', 'Publicaciones históricas y biblioteca propia', 'Más de 120 años de historia'],
      en: ['Cradle of the historic Budapest Literary School', 'Official university accreditation and recognized state exams', 'Historical journals and library collections', 'Over 120 years of history']
    }
  },
  {
    id: 'australia-esperanto-asocio',
    title: 'Aŭstralia Esperanto-Asocio (AEA)',
    url: 'https://esperanto.org.au',
    displayUrl: 'esperanto.org.au',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Australian Esperanto Association',
    year: '1911-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'La nacia asocio en Aŭstralio fondita en 1911, organizanta la Aŭstralian Kongreson, somerajn lernejojn kaj eldonanta la gazeton Esperanto sub la Suda Kruco.',
      es: 'La federación nacional de Australia fundada en 1911, organizadora del Congreso Australiano, escuelas de verano y la revista Esperanto sub la Suda Kruco.',
      en: 'The national association in Australia founded in 1911, hosting the Australian Congress, summer schools, and publishing Esperanto sub la Suda Kruco.'
    },
    tags: ['aŭstralio', 'sidnejo', 'melburno', 'oceanio', 'suda kruco', 'australia'],
    features: {
      eo: ['La gazeto Esperanto sub la Suda Kruco', 'Ĉiujara Aŭstralia Kongreso de Esperanto', 'Someraj lingvolernejoj por ĉiuj aĝoj', 'Kluboj en Sidnejo, Melburno, Brisbano kaj Perto'],
      es: ['Revista periódica Esperanto sub la Suda Kruco', 'Congreso Australiano anual con proyección en Oceanía', 'Cursos intensivos de verano', 'Clubes en Sídney, Melbourne, Brisbane y Perth'],
      en: ['Periodical Esperanto sub la Suda Kruco', 'Annual Australian Congress uniting Oceania', 'Summer residential language schools', 'Chapters in Sydney, Melbourne, Brisbane, and Perth']
    }
  },
  {
    id: 'korea-esperanto-asocio',
    title: 'Korea Esperanto-Asocio (KEA)',
    url: 'https://www.esperanto.or.kr',
    displayUrl: 'esperanto.or.kr',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Korea Esperanto-Asocio',
    year: '1920-2024',
    languages: ['ko', 'eo'],
    description: {
      eo: 'Unu el la plej dinamikaj aziaj asocioj kun sidejo en Seulo, gastiginto de du Universalaj Kongresoj (1994 kaj 2017) kaj eldonanto de La Samideano.',
      es: 'Una de las asociaciones más dinámicas de Asia con sede en Seúl, anfitriona de dos Congresos Universales (1994 y 2017) y editora de La Samideano.',
      en: 'One of Asia\'s most dynamic associations based in Seoul, host to two Universal Congresses (1994 & 2017) and publisher of La Samideano.'
    },
    tags: ['koreio', 'seulo', 'kea', 'la samideano', 'azio', 'corea', 'asia'],
    features: {
      eo: ['Dufoja gastiganto de la Universala Kongreso en Seulo', 'La revuo La Samideano eldonata regule', 'Universitataj kursoj de Esperanto en Dankook-Universitato', 'Tre forta junulara sekcio (KEJO)'],
      es: ['Doble anfitriona del Congreso Universal de Esperanto en Seúl', 'Revista periódica La Samideano', 'Cursos universitarios reglados en la Universidad Dankook', 'Activa sección juvenil (KEJO)'],
      en: ['Two-time host of the Universal Congress in Seoul', 'Periodical La Samideano', 'Accredited university courses at Dankook University', 'Vibrant youth chapter (KEJO)']
    }
  },
  {
    id: 'vjetnama-esperanto-asocio',
    title: 'Vjetnama Esperanto-Asocio (VEA)',
    url: 'https://esperanto.vn',
    displayUrl: 'esperanto.vn',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vjetnama Esperanto-Asocio',
    languages: ['vi', 'eo'],
    description: {
      eo: 'La nacia organizo en Vjetnamio, gastiginto de la 97-a Universala Kongreso en Hanojo (2012) kaj organizanto de pacaj kaj kulturaj programoj.',
      es: 'La asociación nacional de Vietnam, anfitriona del 97º Congreso Universal en Hanói (2012) y promotora de programas educativos y de paz.',
      en: 'The national organization in Vietnam, host of the 97th Universal Congress in Hanoi (2012) and organizer of educational and peace initiatives.'
    },
    tags: ['vjetnamio', 'hanojo', 'vea', 'azio', 'paco', 'vietnam'],
    features: {
      eo: ['Gastiganto de la UK en Hanojo en 2012', 'Bulteno Verda Mesaĝo de Vjetnamio', 'Kursoj por studentoj en Hanojo kaj Ho-Ĉi-Min-urbo', 'Forta subteno al internacia paco'],
      es: ['Anfitriona del Congreso Universal en Hanói en 2012', 'Boletín bilingüe Verda Mesaĝo de Vjetnamio', 'Cursos para jóvenes en Hanói y Ho Chi Minh', 'Compromiso con la cultura de paz'],
      en: ['Host of the 2012 Universal Congress in Hanoi', 'Bilingual newsletter Verda Mesaĝo de Vjetnamio', 'Courses for students in Hanoi and Ho Chi Minh City', 'Active engagement in peace initiatives']
    }
  },
  {
    id: 'festo-renkontigo',
    title: 'FESTO - Junulara Muzika Festivalo (Francio)',
    url: 'https://festo.jefo.fr',
    displayUrl: 'festo.jefo.fr',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Franca Esperanto-Junularo (JEFO)',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La fama somera franca junulara renkontiĝo kunveniganta junulojn por semajno da koncertoj, tendumado, dancado, teatro kaj libera etoso.',
      es: 'El célebre festival veraniego juvenil francés que reúne a jóvenes para una semana de conciertos en directo, acampada, danza y teatro.',
      en: 'The famous French summer youth gathering uniting young people for a week of live rock concerts, camping, dance, theater, and good vibes.'
    },
    tags: ['festo', 'jefo', 'muziko', 'koncertoj', 'junuloj', 'tendumado', 'francia', 'festival'],
    features: {
      eo: ['Vivaj koncertoj de esperantaj rokbandoj', 'Tendumado en bela franca naturo', 'Danc-atelieroj kaj ludoj', 'Tre malmultekosta por studentoj kaj junuloj'],
      es: ['Conciertos en vivo de bandas de rock y pop en esperanto', 'Acampada comunitaria en plena naturaleza francesa', 'Talleres de baile tradicional y moderno', 'Precios muy asequibles para estudiantes'],
      en: ['Live concerts by top Esperanto rock & pop bands', 'Outdoor camping in the French countryside', 'Folk dance and contemporary workshops', 'Budget-friendly for students and youth']
    }
  },
  {
    id: 'kvinpetalo-centro',
    title: 'Kvinpetalo - Studcentro en Francio',
    url: 'https://kvinpetalo.org',
    displayUrl: 'kvinpetalo.org',
    category: 'community',
    level: 'B1',
    isFree: false,
    format: 'website',
    author: 'Kvinpetalo Centro (Bouresse)',
    year: '1985-2024',
    languages: ['fr', 'eo'],
    description: {
      eo: 'Dediĉita studcentro kaj renkontiĝejo en Bouresse (Francio) funkcianta tutjare por intensivaj beletraj, tradukaj kaj lingvistikaj staĝoj.',
      es: 'Centro de estudios y alojamiento en Bouresse (Francia) dedicado a talleres intensivos de literatura, traducción y lingüística durante todo el año.',
      en: 'A dedicated study retreat in Bouresse (France) running year-round intensive seminars in literature, translation, and advanced grammar.'
    },
    tags: ['kvinpetalo', 'bouresse', 'francio', 'studcentro', 'staĝoj', 'beletro', 'seminarios'],
    features: {
      eo: ['Intensivaj staĝoj de literatura tradukado', 'Granda faka biblioteko surloke', 'Trankvila kampara medio por profunda studado', 'Gastigado kaj kuirado komunuma'],
      es: ['Talleres intensivos de traducción literaria y corrección', 'Gran biblioteca especializada in situ', 'Entorno rural apacible propicio para el estudio', 'Alojamiento residencial con cocina compartida'],
      en: ['Intensive literary translation and style masterclasses', 'Extensive on-site reference library', 'Serene rural setting ideal for deep study', 'Residential lodging with communal meals']
    }
  },
  {
    id: 'subtitoloj-filmoj',
    title: 'Esperanto-Subtitoloj por Filmoj',
    url: 'https://esperanto.fandom.com/wiki/Listo_de_filmoj_en_Esperanto',
    displayUrl: 'esperanto.fandom.com/filmoj',
    category: 'media',
    level: 'A2',
    isFree: true,
    format: 'tool',
    author: 'Esperanto Kin-Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Ampleksa kolekto de elŝuteblaj SRT-subtitoloj en Esperanto por famaj kinejaj filmoj, animacioj kaj dokumentaj filmoj de la monda kinejo.',
      es: 'Colección de subtítulos SRT descargables en esperanto para películas clásicas, largometrajes modernos y cine de animación internacional.',
      en: 'A collection of downloadable SRT subtitles in Esperanto for classic films, world cinema masterpieces, and animated features.'
    },
    tags: ['filmoj', 'subtitoloj', 'kinejo', 'srt', 'kino', 'peliculas', 'cine'],
    features: {
      eo: ['Subtitoloj en pura Esperanto por centoj da famaj filmoj', 'Ghibli, Star Wars, Lord of the Rings kaj pli', 'Facile sinkronigeblaj en VLC aŭ aliaj ludiloj', 'Senkosta elŝutado'],
      es: ['Subtítulos en esperanto para cientos de películas célebres', 'Clásicos de Studio Ghibli, Star Wars, El Señor de los Anillos, etc.', 'Sincronizables fácilmente con reproductores como VLC', 'Descarga directa libre'],
      en: ['Esperanto subtitles for hundreds of classic movies', 'Studio Ghibli, Star Wars, Lord of the Rings, and more', 'Easily loaded into video players like VLC', 'Free direct downloads']
    }
  },
  {
    id: 'esperanto-wordnet',
    title: 'Esperanto WordNet (Semantika Leksiko)',
    url: 'https://github.com/mrchristian/esperanto-wordnet',
    displayUrl: 'github.com/mrchristian/esperanto-wordnet',
    category: 'tools',
    level: 'C1',
    isFree: true,
    format: 'tool',
    author: 'Komputillingvistika Komunumo',
    languages: ['eo', 'en'],
    description: {
      eo: 'Granda komputillingvistika datumbazo mapanta sinonimojn, hiponimojn kaj semantikajn rilatojn inter esperantaj vortoj por artefarita intelekto.',
      es: 'Base de datos de lingüística computacional que clasifica sinónimos, hiperónimos y relaciones semánticas en esperanto para procesamiento del lenguaje natural.',
      en: 'A computational linguistics lexical database mapping synsets, hypernyms, and semantic relationships in Esperanto for NLP and AI systems.'
    },
    tags: ['wordnet', 'komputiko', 'lingvistiko', 'nlp', 'artefarita intelekto', 'semantiko', 'datos'],
    features: {
      eo: ['Dekoj da miloj da semantikaj nodoj kaj rilatoj', 'Malfermita licenco por esploristoj kaj programistoj', 'Konektita al la tutmonda Princeton WordNet', 'Ideala por AI kaj lingva prilaborado'],
      es: ['Decenas de miles de nodos léxicos interconectados', 'Licencia abierta para desarrolladores e investigadores', 'Conectado a la red internacional de Princeton WordNet', 'Idóneo para inteligencia artificial y análisis textual'],
      en: ['Tens of thousands of semantic synsets and conceptual links', 'Open license for researchers and developers', 'Interlinked with the Global WordNet framework', 'Essential for natural language processing tools']
    }
  },
  {
    id: 'pacbatalanto-kurso',
    title: 'Pacbatalanto - Esperanto-Lecionoj en Aŭdio',
    url: 'https://pacbatalanto.com',
    displayUrl: 'pacbatalanto.com',
    category: 'courses',
    level: 'A1',
    isFree: true,
    format: 'podcast',
    author: 'Pacbatalanto Projekto',
    languages: ['es', 'eo'],
    description: {
      eo: 'Serio de mallongaj aŭdolecionoj en la hispana kaj Esperanto speciale kreitaj por lerni dum promenado, kuirado aŭ veturado en publika transporto.',
      es: 'Serie de breves lecciones de audio en español y esperanto diseñadas para aprender mientras caminas, cocinas o viajas en transporte público.',
      en: 'A series of concise audio lessons in Spanish and Esperanto tailored for on-the-go learning during walks, cooking, or commutes.'
    },
    tags: ['pacbatalanto', 'audio', 'lecionoj', 'podkasto', 'hispana', 'aprender', 'podcast'],
    features: {
      eo: ['Mallongaj 10-minutaj aŭskulteblaj lecionoj', 'Klarigoj en klara hispana lingvo', 'Prononca ripetado de modelaj frazoj', 'Tute senpaga'],
      es: ['Episodios ágiles de 10 minutos', 'Explicaciones claras en español', 'Práctica guiada de pronunciación y repetición', 'Completamente gratuito'],
      en: ['Bite-sized 10-minute listening episodes', 'Clear explanations in Spanish', 'Guided pronunciation and repetition practice', 'Completely free']
    }
  },
  {
    id: 'astronomia-terminaro',
    title: 'Astronomia Terminaro & Kosmoesploro',
    url: 'https://astronomia-terminaro.blogspot.com',
    displayUrl: 'astronomia-terminaro.blogspot.com',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Astronomia Esperanto-Fako',
    languages: ['eo'],
    description: {
      eo: 'Faka gvidilo pri astronomiaj korpoj, stelaroj, galaksioj, teleskopoj kaj kosmoesploraj misioj kun normigitaj esperantaj terminoj.',
      es: 'Glosario especializado sobre cuerpos celestes, constelaciones, galaxias, telescopios y misiones espaciales con terminología estandarizada.',
      en: 'Specialized glossary covering celestial bodies, constellations, galaxies, astrophysics, and space exploration with standardized terminology.'
    },
    tags: ['astronomio', 'kosmo', 'steloj', 'planedoj', 'fiziko', 'astronomia', 'espacio'],
    features: {
      eo: ['Esperantaj nomoj de ĉiuj 88 oficialaj konstelacioj', 'Terminoj pri astrofiziko kaj spektroskopio', 'Priskriboj de kosmosondiloj (James Webb, Hubble)', 'Ilustrita per NASA-bildoj'],
      es: ['Nombres en esperanto de las 88 constelaciones oficiales', 'Vocabulario de astrofísica y cosmología', 'Monografías de telescopios espaciales (Hubble, James Webb)', 'Ilustrado con imágenes de la NASA'],
      en: ['Esperanto names for all 88 official constellations', 'Astrophysics and cosmology terminology', 'Profiles of space telescopes (James Webb, Hubble)', 'Illustrated with NASA imagery']
    }
  },
  {
    id: 'matematika-terminaro',
    title: 'Matematika Terminaro de Raoul Bricard',
    url: 'https://esperanto.davidgsimpson.com/bricard/',
    displayUrl: 'davidgsimpson.com/bricard',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'Raoul Bricard (Scienca Akademio de Parizo)',
    year: '1905',
    languages: ['eo', 'fr'],
    description: {
      eo: 'La fundamenta faka terminaro de matematiko verkita de la franca matematikisto Raoul Bricard, difinanta la bazojn de algebro, geometrio kaj kalkulo.',
      es: 'El histórico vocabulario matemático fundamental redactado por el matemático Raoul Bricard, base del cálculo, álgebra y geometría en esperanto.',
      en: 'The foundational mathematical lexicon compiled by French mathematician Raoul Bricard, defining the core vocabulary for algebra, geometry, and calculus.'
    },
    tags: ['matematiko', 'algebro', 'geometrio', 'kalkulo', 'scienco', 'matematicas', 'ciencia'],
    features: {
      eo: ['Fundamenta faka laboro pri matematika lingvaĵo', 'Difinoj de geometriaj teoremoj kaj funkcioj', 'Ekvivalentoj en la franca kaj latina', 'Ciferecigita kaj libere alirebla'],
      es: ['Obra fundacional del léxico científico en esperanto', 'Definición de teoremas, operaciones y funciones', 'Equivalencias en francés y latín científico', 'Digitalizado y de libre acceso'],
      en: ['Seminal work establishing mathematical terminology', 'Definitions of theorems, operators, and functions', 'French and scientific Latin cross-references', 'Digitized and freely accessible online']
    }
  },
  {
    id: 'bioversio-ekologio',
    title: 'Bioversio - Biodiverseco kaj Ekologio',
    url: 'https://bioversio.wordpress.com',
    displayUrl: 'bioversio.wordpress.com',
    category: 'projects',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Ekologia Esperanto-Grupo',
    languages: ['eo'],
    description: {
      eo: 'Retejo dediĉita al mediprotekto, flaŭro, daŭripovo, permakulturo kaj klimata ŝanĝiĝo klarigitaj en klara Esperanto.',
      es: 'Portal dedicado a la conservación ambiental, la botánica, la sostenibilidad, la permacultura y el cambio climático en esperanto.',
      en: 'A portal dedicated to environmental conservation, botany, sustainability, permaculture, and climate change in clear Esperanto.'
    },
    tags: ['ekologio', 'medio', 'biodiverseco', 'daŭripovo', 'botaniko', 'ecologia', 'medio ambiente'],
    features: {
      eo: ['Artikoloj pri naturprotekto kaj klimato', 'Gvidiloj pri loka flaŭro kaj sovaĝaj plantoj', 'Terminaro pri ekologio kaj daŭripovo', 'Senpaga aliro sen reklamoj'],
      es: ['Artículos sobre protección de la naturaleza y clima', 'Fichas descriptivas de botánica y especies vegetales', 'Glosario de términos ecológicos y sostenibilidad', 'Acceso libre sin publicidad'],
      en: ['Articles on climate science and habitat preservation', 'Botanical field guides and wild plant species', 'Glossary of ecological and sustainability terms', 'Clean ad-free reading experience']
    }
  },
  {
    id: 'fondumo-zamenhof',
    title: 'Fondumo Zamenhof en Bjalistoko',
    url: 'https://fondumozamenhof.pl',
    displayUrl: 'fondumozamenhof.pl',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Fundacja im. L. Zamenhofa',
    year: '1987-2024',
    languages: ['pl', 'eo', 'en'],
    description: {
      eo: 'Pola kultura fondumo dediĉita al la heredaĵo de L.L. Zamenhof, administranta kulturajn centrojn, ekspoziciojn kaj internacian dialogon en Bjalistoko.',
      es: 'Fundación cultural polaca dedicada a la memoria del Dr. Zamenhof, gestora de exposiciones, patrimonio histórico y diálogo intercultural en Białystok.',
      en: 'A Polish cultural foundation dedicated to the legacy of L.L. Zamenhof, managing cultural initiatives, exhibitions, and dialogue in Białystok.'
    },
    tags: ['fondumo', 'zamenhof', 'bjalistoko', 'pollando', 'heredaĵo', 'fundacion', 'historia'],
    features: {
      eo: ['Konservado de la historia heredaĵo de Zamenhof', 'Organizanto de la Zamenhofaj Tagoj en Bjalistoko', 'Eldono de historiaj monografioj', 'Muzeaj ekspozicioj kaj gvidataj vizitoj'],
      es: ['Preservación del legado histórico del creador del idioma', 'Organizadora de los Días de Zamenhof en su ciudad natal', 'Edición de monografías históricas y catálogos', 'Exposiciones y visitas guiadas'],
      en: ['Preserves the documentary heritage of L.L. Zamenhof', 'Organizers of the annual Zamenhof Days in his birthplace', 'Publication of historical monographs', 'Museum exhibits and walking tours']
    }
  },
  {
    id: 'lingva-justeco-unesco',
    title: 'Iniciato por Lingva Justeco ĉe UN kaj UNESCO',
    url: 'https://linguistic-rights.org',
    displayUrl: 'linguistic-rights.org',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Neregistara Koalicio por Lingvaj Rajtoj',
    languages: ['en', 'eo', 'es', 'fr'],
    description: {
      eo: 'Internacia dokumentaro pri lingva diskriminacio, homaj rajtoj, la rezolucioj de UNESCO por Esperanto kaj proponoj por justa tutmonda komunikado.',
      es: 'Archivo documental sobre derechos lingüísticos, resoluciones oficiales de la UNESCO en favor del esperanto y propuestas para la igualdad comunicativa.',
      en: 'International documentation on linguistic rights, UNESCO official resolutions supporting Esperanto, and policy proposals for fair communication.'
    },
    tags: ['unesco', 'un', 'lingva justeco', 'homaj rajtoj', 'rezolucioj', 'derechos humanos'],
    features: {
      eo: ['Kompleta teksto de la Rezolucioj de Unesko (Montevideo 1954, Sofio 1985)', 'Raportoj pri lingva malegaleco en Eŭropa Unio kaj UN', 'Akademiaj studoj pri lingva kosto kaj justeco', 'Disponebla en multaj lingvoj'],
      es: ['Texto íntegro de las Resoluciones históricas de la UNESCO (Montevideo y Sofía)', 'Informes sobre costes y discriminación lingüística en la UE', 'Monografías académicas sobre ecología de las lenguas', 'Disponible en español, inglés, francés y esperanto'],
      en: ['Full text of UNESCO\'s milestone resolutions (Montevideo 1954 & Sofia 1985)', 'Reports on linguistic inequality and translation costs in the EU', 'Scholarly papers on communicative fairness', 'Multilingual repository']
    }
  },
  {
    id: 'quora-esperanto',
    title: 'Quora en Esperanto (Demandoj kaj Respondoj)',
    url: 'https://eo.quora.com',
    displayUrl: 'eo.quora.com',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Quora Esperanto Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La oficiala esperantlingva sekcio de la monda demando- kaj respond-platformo Quora: demandu pri historio, scienco, kuirado aŭ kulturo tute en Esperanto.',
      es: 'La sección oficial en esperanto de la plataforma global Quora: realiza preguntas y comparte conocimiento sobre ciencia, historia y vida cotidiana.',
      en: 'The official Esperanto edition of knowledge-sharing platform Quora: ask and answer questions on science, history, culture, and life entirely in Esperanto.'
    },
    tags: ['quora', 'demandoj', 'respondoj', 'komunumo', 'scio', 'foro', 'conocimiento'],
    features: {
      eo: ['Milor da demandoj kaj detalaj respondoj en Esperanto', 'Kovras ĉiujn temojn: scienco, vojaĝoj, teknologio, beletro', 'Amikema kaj kleriga komunumo', 'Senpaga aliĝo'],
      es: ['Miles de preguntas y respuestas redactadas en esperanto', 'Abarca múltiples temáticas: ciencia, viajes, cultura y tecnología', 'Comunidad participativa orientada al conocimiento', 'Registro y participación gratuitos'],
      en: ['Thousands of in-depth questions and answers written in Esperanto', 'Broad subject coverage: science, travel, technology, and culture', 'Knowledge-focused community', 'Free to join and explore']
    }
  }
];
