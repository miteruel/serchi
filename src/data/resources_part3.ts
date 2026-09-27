import { EsperantoResource } from '../types';

export const PART3_RESOURCES: EsperantoResource[] = [
  // ========================================================
  // 1. HISPANAJ KAJ IBERIAJ KLUKOJ (SPANISH & IBERIAN CLUBS)
  // ========================================================
  {
    id: 'madrida-esperanto-liceo',
    title: 'Madrida Esperanto-Liceo (MEL)',
    url: 'https://esperanto-madrid.org',
    displayUrl: 'esperanto-madrid.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Madrida Esperanto-Liceo',
    year: '1953-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'La historia klubo en Madrido kunvenanta en la centro de la urbo por prelegoj, konversaciaj rondoj, lingvokursoj kaj kulturaj vesperoj.',
      es: 'El histórico club de Madrid que se reúne en el centro de la capital para conferencias, tertulias de conversación, cursos y veladas culturales.',
      en: 'The historic club in Madrid meeting in the city center for lectures, conversation circles, language courses, and cultural evenings.'
    },
    tags: ['madrido', 'mel', 'klubo', 'hispana', 'madrid', 'tertulias'],
    features: {
      eo: ['Semajnaj konversaciaj rondoj en Madrido', 'Senpagaj kursoj por komencantoj', 'Baza biblioteko de beletro', 'Partopreno en lokaj kulturaj festivaloj'],
      es: ['Tertulias semanales de conversación en Madrid', 'Cursos presenciales y virtuales gratuitos', 'Biblioteca propia de préstamo', 'Participación en ferias culturales'],
      en: ['Weekly conversation meetups in Madrid', 'Free courses for beginners', 'Lending library of literature', 'Active presence at local cultural fairs']
    }
  },
  {
    id: 'barcelona-esperanto-centro',
    title: 'Barcelona Esperanto-Centro',
    url: 'https://esperanto.cat/barcelono',
    displayUrl: 'esperanto.cat/barcelono',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kataluna Esperanto-Asocio (KEA)',
    languages: ['ca', 'es', 'eo'],
    description: {
      eo: 'La ĉefa renkontiĝejo en Barcelono por esperantistoj, kun granda kultura agado, eldonado de libroj kaj prelegoj.',
      es: 'El principal punto de encuentro en Barcelona para esperantistas, con amplia actividad cultural, presentaciones de libros y conferencias.',
      en: 'The premier gathering place in Barcelona for Esperanto speakers, featuring book launches, lectures, and cultural events.'
    },
    tags: ['barcelono', 'katalunio', 'kea', 'barcelona', 'tertulia'],
    features: {
      eo: ['Regulaj renkontiĝoj en Barcelono', 'Kursoj en la kataluna kaj hispana', 'Rikega arkivo de libroj kaj gazetoj', 'Junularaj renkontiĝoj'],
      es: ['Reuniones periódicas en el corazón de Barcelona', 'Cursos adaptados a catalanohablantes e hispanohablantes', 'Fondo histórico de publicaciones', 'Actividades para jóvenes'],
      en: ['Regular meetups in the heart of Barcelona', 'Courses in Catalan and Spanish', 'Rich historical book archive', 'Youth cultural activities']
    }
  },
  {
    id: 'valencia-esperanto-grupo',
    title: 'Valencia Esperanto-Grupo',
    url: 'https://esperanto.es/valencia',
    displayUrl: 'esperanto.es/valencia',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Valencia Esperanto-Asocio',
    languages: ['es', 'ca', 'eo'],
    description: {
      eo: 'La tradicia klubo en Valencio, fondita en la epoko de la fama verkisto Vicente Blasco Ibáñez (kiu mem estis esperantisto kaj prezidanto de la valencia grupo).',
      es: 'El tradicional club de Valencia, con raíces históricas vinculadas a Vicente Blasco Ibáñez (quien fue esperantista y presidente del grupo valenciano).',
      en: 'The historic club in Valencia, with roots tied to renowned novelist Vicente Blasco Ibáñez (who was an Esperantist and president of the Valencia group).'
    },
    tags: ['valencio', 'blasco ibanez', 'valencia', 'klubo', 'historia'],
    features: {
      eo: ['Historia ligo kun Vicente Blasco Ibáñez', 'Regulaj konversaciaj renkontiĝoj en Valencio', 'Kunlaboro kun valenciaj universitatoj', 'Partopreno en la Hispana Kongreso'],
      es: ['Vínculo histórico con el escritor Vicente Blasco Ibáñez', 'Tertulias periódicas de conversación en Valencia', 'Colaboración con universidades valencianas', 'Participación activa en el Congreso Español'],
      en: ['Historic association with novelist Vicente Blasco Ibáñez', 'Regular conversation circles in Valencia', 'Collaborations with local universities', 'Active presence at national congresses']
    }
  },
  {
    id: 'bilbao-esperanto-grupo',
    title: 'Bilbaa Esperanto-Grupo (Eŭskio)',
    url: 'https://esperanto.es/bilbao',
    displayUrl: 'esperanto.es/bilbao',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Eŭska Esperanto-Komunumo',
    languages: ['eu', 'es', 'eo'],
    description: {
      eo: 'La esperantista komunumo en Bilbao kaj Eŭskio, kunvenanta por lingva praktiko, tradukado de eŭska beletro kaj kulturaj ekskursoj.',
      es: 'La comunidad esperantista en Bilbao y el País Vasco, dedicada a la práctica del idioma, traducción de literatura vasca y excursiones.',
      en: 'The Esperanto community in Bilbao and the Basque Country, dedicated to language practice, translation of Basque literature, and outdoor excursions.'
    },
    tags: ['bilbao', 'euskio', 'euskadi', 'pais vasco', 'klubo'],
    features: {
      eo: ['Tradukoj de eŭskaj poemoj kaj noveloj', 'Renkontiĝoj en Bilbao', 'Trilingva dialogo (eŭska, hispana, Esperanto)', 'Amika etoso'],
      es: ['Traducción de narrativa y poesía vasca al esperanto', 'Reuniones de conversación en Bilbao', 'Diálogo trilingüe (euskera, español, esperanto)', 'Ambiente acogedor'],
      en: ['Translations of Basque poetry and prose into Esperanto', 'Conversation meetups in Bilbao', 'Trilingual dialogue (Basque, Spanish, Esperanto)', 'Friendly atmosphere']
    }
  },
  {
    id: 'sevilla-esperanto-rondo',
    title: 'Sevila Esperanto-Rondo (Andaluzio)',
    url: 'https://esperanto.es/sevilla',
    displayUrl: 'esperanto.es/sevilla',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Andaluza Esperanto-Unuiĝo',
    languages: ['es', 'eo'],
    description: {
      eo: 'La andaluza esperantista rondo en Sevilo, organizanta renkontiĝojn, prelegojn pri interkultura komunikado kaj andaluza kulturo.',
      es: 'El círculo esperantista andaluz en Sevilla, organizador de tertulias, charlas sobre comunicación intercultural y cultura andaluza.',
      en: 'The Andalusian Esperanto circle in Seville, hosting meetups, lectures on intercultural communication, and Andalusian heritage.'
    },
    tags: ['sevilo', 'andaluzio', 'sevilla', 'andalucia', 'klubo'],
    features: {
      eo: ['Renkontiĝoj en Sevilo kaj Malago', 'Prelegoj pri lingva diverseco', 'Kultura ponto inter Hispanio kaj Latin-Ameriko', 'Kursoj por komencantoj'],
      es: ['Reuniones en Sevilla y Málaga', 'Charlas sobre diversidad lingüística', 'Puente cultural entre España y América Latina', 'Cursos de iniciación'],
      en: ['Meetups in Seville and Malaga', 'Talks on linguistic diversity', 'Cultural bridge between Spain and Latin America', 'Beginner courses']
    }
  },
  {
    id: 'zaragoza-frateco',
    title: 'Zaragoza Esperanto-Societo "Frateco"',
    url: 'https://esperanto.es/zaragoza',
    displayUrl: 'esperanto.es/zaragoza',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Societo Frateco (Fondita en 1908)',
    year: '1908-2024',
    languages: ['es', 'eo'],
    description: {
      eo: 'Unu el la plej historiaj esperantistaj societoj en Hispanio, fondita en Zaragozo en 1908, kun propra historia sidejo kaj biblioteko.',
      es: 'Una de las sociedades de esperanto más históricas de España, fundada en Zaragoza en 1908, con sede propia ininterrumpida y rica biblioteca.',
      en: 'One of the most historic Esperanto societies in Spain, founded in Zaragoza in 1908, maintaining its own premises and library.'
    },
    tags: ['zaragoza', 'aragono', 'frateco', '1908', 'aragon', 'historia'],
    features: {
      eo: ['Pli ol 115 jaroj da seninterrompa agado en Aragono', 'Propra historia biblioteko en Zaragozo', 'Kursoj kaj semajnaj renkontiĝoj', 'Eldono de bultenoj kaj libroj'],
      es: ['Más de 115 años de historia continuada en Aragón', 'Biblioteca histórica propia en Zaragoza', 'Cursos y tertulias semanales', 'Edición de boletines y publicaciones'],
      en: ['Over 115 years of continuous activity in Aragon', 'Dedicated historic library in Zaragoza', 'Weekly courses and conversation circles', 'Publishes local newsletters and books']
    }
  },
  {
    id: 'teruel-esperanto-memoro',
    title: 'Teruelo kaj Esperanto - Historia Heredaĵo',
    url: 'https://esperanto.es/aragon/teruel',
    displayUrl: 'esperanto.es/teruel',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Aragona Esperanto-Movado',
    languages: ['es', 'eo'],
    description: {
      eo: 'La historia ĉeesto de Esperanto en Teruelo kaj la aragona regiono ekde la frua 20-a jarcento, ligita al instruistoj, humanistoj kaj pacistoj.',
      es: 'La memoria histórica del esperanto en Teruel y tierras aragonesas desde principios del siglo XX, impulsada por maestros, humanistas y pacifistas.',
      en: 'The historical heritage of Esperanto in Teruel and Aragon since the early 20th century, championed by rural teachers and humanists.'
    },
    tags: ['teruelo', 'teruel', 'aragono', 'aragon', 'historio', 'instruistoj'],
    features: {
      eo: ['Dokumentoj pri fruaj esperantistaj instruistoj en Teruelo', 'Historiaj ligoj kun la zaragoza societo Frateco', 'Kultura heredaĵo de la aragonaj montoj', 'Informoj por lokaj interesatoj'],
      es: ['Documentación sobre los primeros maestros esperantistas en Teruel', 'Vínculos históricos con el movimiento aragonés', 'Patrimonio humanista de la provincia de Teruel', 'Información de contacto para estudiantes locales'],
      en: ['Documentation of early Esperantist teachers in Teruel', 'Historical ties to the Aragonese movement', 'Humanist heritage of Teruel province', 'Contact information for local learners']
    }
  },

  // ========================================================
  // 2. MUNDAJ METROPOLAJ KLUBOJ (WORLD CITY CLUBS)
  // ========================================================
  {
    id: 'london-esperanto-club',
    title: 'London Esperanto Club (Fondita en 1903)',
    url: 'https://londonaesperantoklubo.com',
    displayUrl: 'londonaesperantoklubo.com',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'London Esperanto Club',
    year: '1903-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'La plej malnova daŭre funkcianta urba Esperanto-klubo en la mondo, kunvenanta en centra Londono ĉiun vendredon ekde 1903.',
      es: 'El club urbano de esperanto en funcionamiento ininterrumpido más antiguo del mundo, reuniéndose en el centro de Londres cada viernes desde 1903.',
      en: 'The oldest continuously operating city Esperanto club in the world, meeting in central London every Friday evening since 1903.'
    },
    tags: ['londono', 'london', '1903', 'brita', 'klubo', 'londres'],
    features: {
      eo: ['Pli ol 120 jaroj da vendredaj renkontiĝoj seninterrompe', 'Prelegoj de internaciaj gastoj', 'Senpagaj lingvokursoj por ĉiuj niveloj', 'Situanta en la koro de Londono'],
      es: ['Más de 120 años de reuniones ininterrumpidas cada viernes', 'Conferencias de ponentes internacionales', 'Clases gratuitas de todos los niveles', 'Encuentros en el centro de Londres'],
      en: ['Over 120 years of continuous Friday meetings', 'Lectures by distinguished international guests', 'Free multi-level language classes', 'Located in central London']
    }
  },
  {
    id: 'paris-esperanto-centro',
    title: 'Espéranto-Paris-Île-de-France (Maison de l\'Espéranto)',
    url: 'https://esperanto.paris',
    displayUrl: 'esperanto.paris',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Espéranto-Paris-Île-de-France',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La pariza regiona centro en la 11-a arondismento de Parizo, kunveniganta klubanojn por kursoj, librovendo, ekspozicioj kaj teatro.',
      es: 'El centro regional parisino en el distrito 11 de París, punto de encuentro para cursos, librería, exposiciones y teatro en esperanto.',
      en: 'The regional Parisian center in Paris\'s 11th arrondissement, hosting language classes, a bookstore, exhibitions, and theater.'
    },
    tags: ['parizo', 'paris', 'francio', 'maison de l\'esperanto', 'libreria'],
    features: {
      eo: ['Sidejo en Parizo kun librovendejo', 'Ĉiutagaj kursoj de baza ĝis supera nivelo', 'Kulturaj sabataj prelegoj kaj koncertoj', 'Konektita al la parizaj universitatoj'],
      es: ['Sede propia con librería en París', 'Cursos diarios desde nivel inicial hasta superior', 'Conferencias culturales y recitales los sábados', 'Conexión con universidades parisinas'],
      en: ['Premises and bookstore in central Paris', 'Daily classes from beginner to advanced', 'Saturday cultural lectures and concerts', 'Ties with Parisian university faculties']
    }
  },
  {
    id: 'berlin-esperanto-ligo',
    title: 'Esperanto-Ligo Berlino-Brandenburgio',
    url: 'https://esperanto-berlin.org',
    displayUrl: 'esperanto-berlin.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Ligo Berlino',
    languages: ['de', 'eo'],
    description: {
      eo: 'La vigla regiona asocio en Berlino kaj Brandenburgio, organizanta la famajn Zamenhof-festojn, junularajn babiladojn kaj la bultenon Berlina Informilo.',
      es: 'La dinámica asociación regional de Berlín y Brandeburgo, organizadora de festivales culturales, tertulias juveniles y el boletín Berlina Informilo.',
      en: 'The active regional association in Berlin and Brandenburg, organizers of cultural festivals, youth meetups, and the bulletin Berlina Informilo.'
    },
    tags: ['berlino', 'brandenburgio', 'berlin', 'germana', 'alemania'],
    features: {
      eo: ['Renkontiĝoj en diversaj berlinaj kvartaloj', 'Bulteno Berlina Informilo', 'Junularaj bier-vesperoj en Esperanto', 'Granda partopreno de internaciaj studentoj'],
      es: ['Reuniones en barrios emblemáticos de Berlín', 'Boletín informativo Berlina Informilo', 'Tertulias informales para jóvenes y universitarios', 'Comunidad cosmopolita e internacional'],
      en: ['Meetups across Berlin neighborhoods', 'Newsletter Berlina Informilo', 'Informal pub meetups for young speakers', 'Cosmopolitan international community']
    }
  },
  {
    id: 'new-york-esperanto-society',
    title: 'New York Esperanto Society',
    url: 'https://www.meetup.com/esperanto-new-york/',
    displayUrl: 'meetup.com/esperanto-new-york',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'New York Esperanto Society',
    languages: ['en', 'eo'],
    description: {
      eo: 'La renkontiĝejo de esperantistoj en Novjorko: regulaj renkontiĝoj en Manhatano, piknikoj en Central Park kaj konversaciaj vesperoj.',
      es: 'El grupo de esperantistas de Nueva York: reuniones periódicas en Manhattan, picnics en Central Park y tertulias en cafeterías.',
      en: 'The community of Esperanto speakers in New York City: regular meetups in Manhattan, picnics in Central Park, and casual coffee socials.'
    },
    tags: ['novjorko', 'new york', 'manhattan', 'central park', 'meetup', 'nueva york'],
    features: {
      eo: ['Regulaj renkontiĝoj en Manhatano kaj Brooklyn', 'Someraj piknikoj en Central Park', 'Miksaĵo de komencantoj kaj denaskuloj', 'Aliĝo per Meetup'],
      es: ['Reuniones periódicas en Manhattan y Brooklyn', 'Picnics veraniegos en Central Park', 'Comunidad diversa de aprendices y veteranos', 'Convocatorias abiertas por Meetup'],
      en: ['Regular meetups in Manhattan and Brooklyn', 'Summer socials in Central Park', 'Diverse blend of beginners and fluent speakers', 'Active Meetup group']
    }
  },
  {
    id: 'tokyo-esperanto-klubo',
    title: 'Tokia Esperanto-Klubo',
    url: 'https://www.jei.or.jp/kluboj/tokio',
    displayUrl: 'jei.or.jp/tokio',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Japana Esperanto-Instituto (JEI)',
    languages: ['ja', 'eo'],
    description: {
      eo: 'La tradicia klubo en Tokio kunvenanta en la sidejo de JEI en Ŝinĝuku por konversacio, prelegoj pri japana kulturo kaj gastigado de eksterlandanoj.',
      es: 'El club de Tokio que se reúne en la sede del JEI en Shinjuku para tertulias, difusión de la cultura japonesa y acogida de viajeros internacionales.',
      en: 'The Tokyo club meeting at JEI headquarters in Shinjuku for conversation, Japanese cultural exchanges, and welcoming international visitors.'
    },
    tags: ['tokio', 'tokyo', 'sinjuku', 'japanio', 'japon'],
    features: {
      eo: ['Renkontiĝoj en la sidejo de JEI en Ŝinĝuku', 'Prelegoj pri japana historio kaj kulturo', 'Gastigado de eksterlandaj esperantistoj en Tokio', 'Senpagaj konversaciaj rondoj'],
      es: ['Reuniones en el emblemático barrio de Shinjuku', 'Charlas sobre historia, arte y tradiciones japonesas', 'Hospitalidad con viajeros esperantistas en Tokio', 'Práctica de conversación gratuita'],
      en: ['Meetups at the JEI building in Shinjuku', 'Presentations on Japanese history and culture', 'Hospitality for international travelers visiting Tokyo', 'Free conversation circles']
    }
  },

  // ========================================================
  // 3. AFRIKAJ KAJ AZIAJ ASOCIOJ (AFRICA & ASIA NETWORKS)
  // ========================================================
  {
    id: 'benina-esperanto-asocio',
    title: 'Asocio de Esperantistoj de Benino (ABeE)',
    url: 'https://esperanto-benin.org',
    displayUrl: 'esperanto-benin.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Asocio de Esperantistoj de Benino (ABeE)',
    languages: ['fr', 'eo'],
    description: {
      eo: 'Unu el la plej aktivaj kaj kreskantaj naciaj asocioj en Okcidenta Afriko, kun kursoj en Kotonuo kaj Lokosa, kaj vigla junularo.',
      es: 'Una de las asociaciones más activas y con mayor crecimiento de África Occidental, con cursos en Cotonú y Lokossa y gran protagonismo juvenil.',
      en: 'One of the most energetic and rapidly expanding national associations in West Africa, running classes in Cotonou and Lokossa with vibrant youth.'
    },
    tags: ['benino', 'kotonuo', 'afriko', 'abee', 'benin', 'africa'],
    features: {
      eo: ['Grandaj junularaj kursoj en pluraj urboj', 'Gastiganto de tutafrikaj seminarioj de TEJO', 'Eldono de bultenoj kaj informiloj', 'Membroj instruantaj en mezlernejoj'],
      es: ['Multitudinarios cursos juveniles en varias ciudades', 'Anfitriona de seminarios panafricanos de TEJO', 'Edición de boletines informativos locales', 'Docencia del idioma en institutos'],
      en: ['Large youth classes across multiple cities', 'Host of pan-African TEJO training seminars', 'Local informational bulletins', 'Esperanto taught in secondary schools']
    }
  },
  {
    id: 'togolanda-esperanto-asocio',
    title: 'Togolanda Esperanto-Asocio (ATE)',
    url: 'https://esperanto-togo.org',
    displayUrl: 'esperanto-togo.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Asocio Togolanda de Esperanto (ATE)',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La nacia organizo en Lomeo kaj Togolando, konata pro la unua Afrika Esperanto-Kongreso kaj vasta reto de junularaj kluboj.',
      es: 'La asociación nacional en Lomé y Togo, anfitriona del histórico primer Congreso Africano de Esperanto y con una extensa red de clubes.',
      en: 'The national body in Lomé and Togo, host of the historic first African Esperanto Congress and a widespread network of youth clubs.'
    },
    tags: ['togolando', 'lomeo', 'afriko', 'ate', 'togo', 'africa'],
    features: {
      eo: ['Historia centro de la afrika movado ekde la 1980-aj jaroj', 'Sidejo kaj biblioteko en Lomeo', 'Intensaj lingvaj staĝoj por junuloj', 'Korespondado kun tutmondaj kluboj'],
      es: ['Centro histórico del movimiento africano desde los años 80', 'Sede y biblioteca en Lomé', 'Cursos intensivos residenciales para jóvenes', 'Red de correspondencia internacional'],
      en: ['Pioneering hub of the African movement since the 1980s', 'Headquarters and reading room in Lomé', 'Intensive residential language seminars', 'Active pen-pal programs worldwide']
    }
  },
  {
    id: 'burunda-esperanto-asocio',
    title: 'Burunda Esperanto-Asocio (ANEB)',
    url: 'https://esperanto-burundi.org',
    displayUrl: 'esperanto-burundi.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Asocio Nacia de Esperanto en Burundo (ANEB)',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La tre dinamika nacia asocio en Buĵumburo, gastiganto de la 8-a Afrika Esperanto-Kongreso kaj gvidanto de multaj edukaj kaj humanitaraj projektoj.',
      es: 'La dinámica asociación en Buyumbura, anfitriona del 8º Congreso Africano y promotora de destacados proyectos educativos y humanitarios.',
      en: 'The dynamic association in Bujumbura, host of the 8th African Esperanto Congress and organizer of educational and community development projects.'
    },
    tags: ['burundo', 'bujumbura', 'afriko', 'aneb', 'burundi'],
    features: {
      eo: ['Pli ol mil lernantoj en mezlernejoj kaj universitatoj', 'Gastiganto de la Afrika Kongreso', 'Projektoj pri legopovo kaj virina povigo', 'Regulaj elsendoj en loka radio'],
      es: ['Más de un millar de estudiantes en escuelas y universidades', 'Anfitriona del Congreso Africano de Esperanto', 'Proyectos de alfabetización y empoderamiento', 'Espacios divulgativos en radios locales'],
      en: ['Over a thousand students in schools and universities', 'Host of the African Esperanto Congress', 'Literacy and women\'s empowerment initiatives', 'Regular broadcasts on local community radio']
    }
  },
  {
    id: 'nepala-esperanto-asocio',
    title: 'Nepala Esperanto-Asocio (NEspA)',
    url: 'https://esperanto-nepal.org',
    displayUrl: 'esperanto-nepal.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Nepal Esperanto Association (NEspA)',
    year: '1990-2024',
    languages: ['ne', 'eo', 'en'],
    description: {
      eo: 'La nacia asocio en Katmanduo, organizanta himalajajn trejnadojn, kursojn por montaraj gvidistoj kaj gastiganta vojaĝantojn el la tuta mondo.',
      es: 'La asociación nacional en Katmandú, que imparte cursos para guías de montaña del Himalaya y acoge a viajeros internacionales.',
      en: 'The national association in Kathmandu, training Himalayan trekking guides in Esperanto and hosting international travelers.'
    },
    tags: ['nepalo', 'katmanduo', 'himalajo', 'nespa', 'nepal', 'trekking'],
    features: {
      eo: ['Kursoj por himalajaj montgvidistoj kaj ŝerpoj', 'Sidejo en Katmanduo', 'Turismaj gvidataj vojaĝoj tute en Esperanto', 'Gastigado per Pasporta Servo'],
      es: ['Cursos especiales para sherpas y guías de montaña', 'Sede social en Katmandú', 'Tours de trekking guiados íntegramente en esperanto', 'Gran hospitalidad en Pasporta Servo'],
      en: ['Tailored courses for Himalayan guides and sherpas', 'Community center in Kathmandu', 'Trekking tours conducted in Esperanto', 'Renowned hospitality via Pasporta Servo']
    }
  },
  {
    id: 'indonezia-esperanto-asocio',
    title: 'Indonezia Esperanto-Asocio (IEA)',
    url: 'https://esperanto.id',
    displayUrl: 'esperanto.id',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Indonezia Esperanto-Asocio',
    languages: ['id', 'eo', 'en'],
    description: {
      eo: 'La nacia asocio en Ĝakarto, Bandungo kaj Balio, organizanta la Indonezian Kongreson, retajn kursojn kaj aziajn renkontiĝojn.',
      es: 'La asociación nacional en Yakarta, Bandung y Bali, organizadora del Congreso Indonesio, cursos online y encuentros asiáticos.',
      en: 'The national association in Jakarta, Bandung, and Bali, organizing the Indonesian Congress, online courses, and Asian gatherings.'
    },
    tags: ['indonezio', 'jakarto', 'balio', 'iea', 'indonesia', 'asia'],
    features: {
      eo: ['Reta kurso en la indonezia lingvo (Bahasa Indonesia)', 'Ĉiujara Indonezia Esperanto-Kongreso', 'Kluboj en Ĝakarto, Bandungo, Jogjakarto kaj Balio', 'Vigla junulara ĉeesto en TikTok kaj Instagram'],
      es: ['Cursos online adaptados a hablantes de indonesio', 'Congreso Indonesio de Esperanto anual', 'Clubes en Yakarta, Bandung, Yogyakarta y Bali', 'Presencia dinámica en redes sociales'],
      en: ['Online course in Bahasa Indonesia', 'Annual Indonesian Esperanto Congress', 'Active chapters in Jakarta, Bandung, Yogyakarta, and Bali', 'Youth engagement on social media']
    }
  },

  // ========================================================
  // 4. PLIAJ SCIENCAJ KAJ FAKAJ TERMINAROJ (SCIENCE & VOCABULARY)
  // ========================================================
  {
    id: 'kemia-terminaro-esperanto',
    title: 'Kemia Terminaro kaj Perioda Tabelo',
    url: 'https://esperanto.davidgsimpson.com/kemia/',
    displayUrl: 'davidgsimpson.com/kemia',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Scienca Esperanto-Fako',
    languages: ['eo'],
    description: {
      eo: 'Ampleksa scienca datumbazo kun la perioda tabelo de elementoj, kemiaj reakcioj, organikaj kombinaĵoj kaj laboratoraj iloj en Esperanto.',
      es: 'Base de datos científica con la tabla periódica de los elementos, reacciones químicas, compuestos orgánicos e instrumental de laboratorio.',
      en: 'A scientific database presenting the periodic table of elements, chemical reactions, organic compounds, and laboratory apparatus in Esperanto.'
    },
    tags: ['kemio', 'perioda tabelo', 'scienco', 'elementoj', 'terminaro', 'quimica', 'ciencia'],
    features: {
      eo: ['Ĉiuj 118 kemiaj elementoj kun oficialaj esperantaj nomoj', 'Nomenklaturo de IUPAC adaptita al Esperanto', 'Terminoj de organika kaj neorganika kemio', 'Libere konsultebla'],
      es: ['Los 118 elementos de la tabla periódica con denominación oficial', 'Nomenclatura IUPAC adaptada a las normas del esperanto', 'Vocabulario de química orgánica e inorgánica', 'Acceso libre'],
      en: ['All 118 periodic table elements with standardized names', 'IUPAC systematic nomenclature rules in Esperanto', 'Organic and inorganic terminology', 'Freely accessible online']
    }
  },
  {
    id: 'botanika-terminaro-neergaard',
    title: 'Botanika Terminaro (Paul Neergaard)',
    url: 'https://eventoj.hu/steb/botaniko/botanika-vortaro.htm',
    displayUrl: 'eventoj.hu/botaniko',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'D-ro Paul Neergaard (Danza Botanikisto & Akademiano)',
    year: '1954',
    languages: ['eo', 'la', 'fr', 'en', 'de'],
    description: {
      eo: 'La fundamenta faka terminaro de botaniko kaj agronomo verkita de la dana profesoro Paul Neergaard, difinanta plantajn partojn, florojn kaj ĉelojn.',
      es: 'El vocabulario botánico de referencia compilado por el catedrático danés Paul Neergaard, con morfología vegetal, taxonomía y citología.',
      en: 'The definitive botanical reference dictionary compiled by Danish professor Paul Neergaard, defining plant morphology, taxonomy, and cytology.'
    },
    tags: ['botaniko', 'plantoj', 'floroj', 'agronomio', 'neergaard', 'scienco', 'botanica'],
    features: {
      eo: ['Klaraj difinoj de plantanatomio kaj fiziologio', 'Latinaj sciencaj ekvivalentoj por ĉiu termino', 'Ilustraĵoj de folioj, radikoj kaj floroj', 'Parto de la Scienca Biblioteko STEB'],
      es: ['Definición rigurosa de anatomía y fisiología vegetal', 'Equivalencias en latín botánico para cada término', 'Diagramas e ilustraciones de estructuras vegetales', 'Disponible en el portal STEB'],
      en: ['Rigorous definitions of plant anatomy and physiology', 'Latin botanical equivalents for every term', 'Diagrams of leaf structures, roots, and flowers', 'Preserved in the STEB digital library']
    }
  },
  {
    id: 'kuirarta-terminaro',
    title: 'Kuirarta Vortaro & Gastronomio en Esperanto',
    url: 'https://eventoj.hu/steb/gastronomio/kuirarta-vortareto.htm',
    displayUrl: 'eventoj.hu/kuirarto',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Gastronomia Esperanto-Grupo',
    languages: ['eo', 'es', 'fr', 'en'],
    description: {
      eo: 'Praktika vortaro de kuirarto, spicoj, manĝaĵoj, kuirteknikoj kaj receptoj el diversaj landoj, utila por prepari internaciajn bankedojn.',
      es: 'Glosario práctico de cocina, especias, ingredientes, técnicas culinarias y recetas del mundo, ideal para comidas y encuentros internacionales.',
      en: 'A practical dictionary of culinary arts, spices, ingredients, cooking methods, and global recipes, ideal for international dinner banquets.'
    },
    tags: ['kuirarto', 'gastronomio', 'mangajoj', 'spicoj', 'receptoj', 'cocina', 'gastronomia'],
    features: {
      eo: ['Centoj da terminoj pri spicoj, legomoj, viandoj kaj desertoj', 'Vortoj por kuirteknikoj (boli, friti, stufi, baki)', 'Tradiciaj receptoj en Esperanto', 'Plurlingvaj indeksoj'],
      es: ['Cientos de términos de especias, verduras, pastas y repostería', 'Verbos de cocinado (hervir, rehogar, hornear, escalfar)', 'Recetario internacional en esperanto', 'Índices multilingües'],
      en: ['Hundreds of culinary terms covering spices, produce, and baking', 'Cooking verbs and techniques (simmer, sauté, roast, poach)', 'International recipe collections in Esperanto', 'Multilingual indices']
    }
  },
  {
    id: 'fotografia-terminaro',
    title: 'Fotografia Terminaro en Esperanto',
    url: 'https://eventoj.hu/steb/fotografio/fotovortaro.htm',
    displayUrl: 'eventoj.hu/fotografio',
    category: 'projects',
    level: 'B1',
    isFree: true,
    format: 'tool',
    author: 'Fotografia Faka Rondo',
    languages: ['eo'],
    description: {
      eo: 'Faka gvidilo pri cifereca kaj analoga fotarto: objektivoj, ekspono, ISO, diafragmo, fokusa distanco kaj bildprilaborado en Esperanto.',
      es: 'Glosario técnico de fotografía analógica y digital: objetivos, velocidad de obturación, ISO, diafragma, distancia focal y revelado digital.',
      en: 'A technical glossary for analog and digital photography: lenses, shutter speed, ISO, aperture, focal length, and digital post-processing.'
    },
    tags: ['fotografio', 'fotoj', 'fotiloj', 'diafragmo', 'objektivoj', 'fotografia'],
    features: {
      eo: ['Terminoj de moderna cifereca fotarto (RAW, sensoroj, pikseloj)', 'Optikaj konceptoj klarigitaj precize', 'Klarigoj pri lumigado kaj kompono', 'Senpage alirebla'],
      es: ['Terminología moderna de cámaras digitales, sensores y formato RAW', 'Conceptos ópticos explicados con precisión', 'Técnicas de iluminación y composición fotográfica', 'Acceso online gratuito'],
      en: ['Modern digital photography concepts (RAW, sensors, dynamic range)', 'Optical terminology explained clearly', 'Lighting and photographic composition techniques', 'Free online access']
    }
  },
  {
    id: 'arkitektura-terminaro',
    title: 'Konstrua kaj Arkitektura Terminaro',
    url: 'https://eventoj.hu/steb/konstruo/konstrua-vortaro.htm',
    displayUrl: 'eventoj.hu/arkitekturo',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'book',
    author: 'Jan Werner (Ĉeĥa Arkitekto & Akademiano)',
    year: '1995',
    languages: ['eo', 'cs', 'de'],
    description: {
      eo: 'Majstra faka vortaro pri arkitekturo, konstrua inĝenierarto, urboplanado kaj materialoj verkita de la ĉeĥa akademiano Jan Werner.',
      es: 'Exhaustivo diccionario técnico sobre arquitectura, ingeniería de la edificación, urbanismo y materiales redactado por el académico Jan Werner.',
      en: 'Master technical dictionary on architecture, structural engineering, urban planning, and building materials compiled by academician Jan Werner.'
    },
    tags: ['arkitekturo', 'konstruo', 'inĝenierarto', 'jan werner', 'urboplanado', 'arquitectura'],
    features: {
      eo: ['Miloj da fakterminoj pri konstruado kaj statiko', 'Terminoj pri klasikaj kaj modernaj arkitekturaj stiloj', 'Verkita de eminenta konstru-inĝeniero kaj akademiano', 'Rikega faka referenco'],
      es: ['Miles de tecnicismos sobre edificación, estructuras y estática', 'Vocabulario de estilos arquitectónicos desde la antigüedad al presente', 'Autoría de un reputado arquitecto y académico', 'Referencia imprescindible'],
      en: ['Thousands of technical terms in structural engineering and statics', 'Vocabulary spanning historic and contemporary architectural movements', 'Authored by an eminent architect and academician', 'Essential engineering reference']
    }
  },

  // ========================================================
  // 5. CUMBRE FILOZOFIA KAJ HOMARANISMO (ZAMENHOF & HUMANISM)
  // ========================================================
  {
    id: 'homaranismo-zamenhof',
    title: 'Homaranismo - La Humanisma Filozofio de Zamenhof',
    url: 'https://literaturo.org/zamenhof/homaranismo',
    displayUrl: 'literaturo.org/homaranismo',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'book',
    author: 'D-ro L.L. Zamenhof',
    year: '1906-1913',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'La filozofia kaj etika manifesto de L.L. Zamenhof proponanta superi naciismon kaj religiajn dividojn per reciproka respekto kaj universala homa frateco.',
      es: 'El manifiesto ético y filosófico del Dr. Zamenhof que propone superar el chovinismo y las divisiones religiosas mediante la fraternidad universal.',
      en: 'The philosophical and ethical manifesto by L.L. Zamenhof proposing to overcome nationalism and religious divisions through universal human fraternity.'
    },
    tags: ['homaranismo', 'zamenhof', 'filozofio', 'etiko', 'paco', 'humanismo', 'fraternidad'],
    features: {
      eo: ['La plena teksto de la Deklaracio pri Homaranismo', 'Analizo de la "interna ideo" de Esperanto', 'Ponto inter diversaj kulturoj kaj religioj', 'Baza dokumento por kompreni la celon de Zamenhof'],
      es: ['Texto íntegro de la Declaración del Homaranismo', 'Explicación de la "idea interna" humanista que inspiró el esperanto', 'Propuesta de convivencia basada en la Regla de Oro', 'Documento clave para entender la visión de Zamenhof'],
      en: ['Full text of the Declaration of Homaranismo', 'Analysis of the humanist "inner idea" that inspired Esperanto', 'Ethical framework based on the Golden Rule', 'Fundamental text for understanding Zamenhof\'s vision']
    }
  },
  {
    id: 'zamenhof-tago-librotago',
    title: 'Zamenhof-Tago & Esperanta Librotago (15-a de Decembro)',
    url: 'https://uea.org/aktuale/komunikoj/2023/zamenhof-tago',
    displayUrl: 'uea.org/zamenhof-tago',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Universala Esperanto-Asocio & Monda Komunumo',
    languages: ['eo', 'es', 'en'],
    description: {
      eo: 'La tutmonda festo de Esperanto la 15-an de decembro (naskiĝtago de Zamenhof), festata kiel Librotago per donaco de libroj, prelegoj kaj festoj en 120 landoj.',
      es: 'La fiesta mundial del esperanto cada 15 de diciembre (cumpleaños de Zamenhof), celebrada como Día del Libro con regalos literarios y eventos en 120 países.',
      en: 'The global celebration of Esperanto on December 15 (Zamenhof\'s birthday), observed as Esperanto Book Day with book exchanges and parties in 120 countries.'
    },
    tags: ['zamenhof-tago', 'librotago', '15 decembro', 'festo', 'libroj', 'celebracion'],
    features: {
      eo: ['La plej granda ĉiujara festotago en Esperantujo ekde la 1920-aj jaroj', 'Tradicio aĉeti kaj donaci esperantlingvajn librojn', 'Retaj kaj fizikaj festoj tra la tuta mondo', 'Oficiala mesaĝo de la prezidanto de UEA'],
      es: ['La celebración anual más extendida en la comunidad desde los años 20', 'Costumbre de regalar y adquirir libros en esperanto', 'Fiestas presenciales y encuentros virtuales en los cinco continentes', 'Mensaje oficial de la presidencia de la UEA'],
      en: ['The most widely celebrated holiday in the Esperanto world since the 1920s', 'Tradition of gifting and reading Esperanto books', 'In-person gatherings and virtual galas worldwide', 'Official annual address by the UEA president']
    }
  },
  {
    id: 'omegat-tradukilo',
    title: 'OmegaT - Libera Komputile Helpata Tradukilo (CAT)',
    url: 'https://omegat.org',
    displayUrl: 'omegat.org',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'OmegaT Projekto',
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'La plej populara libera profesia tradukhelpilo (CAT-ilo) en la mondo, plene lokalizita en Esperanton kaj kreita por profesiaj tradukistoj.',
      es: 'La herramienta libre de traducción asistida por ordenador (TAO) más popular del mundo, completamente disponible en esperanto para traductores.',
      en: 'The world\'s premier free computer-assisted translation (CAT) tool, fully localized into Esperanto and engineered for professional translators.'
    },
    tags: ['omegat', 'cat', 'tradukilo', 'memortraduko', 'glosaro', 'traduccion profesional'],
    features: {
      eo: ['Plena interfaco kaj dokumentaro en Esperanto', 'Tradukmemoroj (TMX), glosaroj kaj literumilo', 'Subtenas dekduojn da dosierformatoj (Word, LibreOffice, HTML)', 'Malfermkoda kaj tute senkosta'],
      es: ['Interfaz y manuales íntegramente en esperanto', 'Gestión de memorias de traducción (TMX), glosarios y corrector', 'Compatible con decenas de formatos de archivo (DOCX, ODT, HTML)', 'Software libre y gratuito'],
      en: ['Full UI and documentation available in Esperanto', 'Translation memory (TMX), glossaries, and spell-checker', 'Supports dozens of document file formats (DOCX, ODT, HTML)', 'Free and open-source']
    }
  },
  {
    id: 'vikilibroj-esperanto',
    title: 'Vikilibroj en Esperanto (Wikibooks)',
    url: 'https://eo.wikibooks.org',
    displayUrl: 'eo.wikibooks.org',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La libera kolekto de lernolibroj, manlibroj kaj pedagogiaj tekstoj de Vikimedio en Esperanto, redaktebla de iu ajn.',
      es: 'La colección colaborativa de libros de texto, manuales de aprendizaje y guías temáticas libres de Wikimedia en esperanto.',
      en: 'The collaborative collection of open textbooks, instructional manuals, and educational guides by Wikimedia in Esperanto.'
    },
    tags: ['vikilibroj', 'wikibooks', 'lernolibroj', 'manlibroj', 'pedagogio', 'libros de texto'],
    features: {
      eo: ['Senpagaj lernolibroj pri programado, historio, muziko kaj scienco', 'Kursoj de Esperanto por diversaj lingvoj', 'Malfermita por ke uzantoj plibonigu librojn', 'Elŝuteblaj tekstoj en PDF'],
      es: ['Manuales didácticos gratuitos sobre programación, historia y música', 'Cursos de esperanto orientados a diferentes lenguas maternas', 'Plataforma abierta a contribuciones de educadores', 'Formatos descargables'],
      en: ['Free textbooks on programming, history, music, and science', 'Esperanto courses tailored for various native tongues', 'Open platform editable by educators worldwide', 'Downloadable digital formats']
    }
  },
  {
    id: 'vikinovajoj-esperanto',
    title: 'Vikinovaĵoj en Esperanto (Wikinews)',
    url: 'https://eo.wikinews.org',
    displayUrl: 'eo.wikinews.org',
    category: 'news',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La libera civitana novaĵagentejo de Vikimedio en Esperanto, raportanta pri internaciaj aktualaĵoj, sciencaj malkovroj kaj kulturaj eventoj.',
      es: 'La agencia ciudadana libre de noticias de Wikimedia en esperanto, con cobertura de actualidad internacional, ciencia y cultura.',
      en: 'The open citizen journalism news agency by Wikimedia in Esperanto, reporting on international events, science discoveries, and cultural affairs.'
    },
    tags: ['vikinovaĵoj', 'wikinews', 'novaĵoj', 'ĵurnalismo', 'internacia', 'noticias'],
    features: {
      eo: ['Aktualaj novaĵoj el la tuta mondo en neŭtrala stilo', 'Verkita kaj reviziita de sendependaj volontuloj', 'Klaraj referencoj kaj fontoj por ĉiu artikolo', 'Malfermita enhavo sub Creative Commons'],
      es: ['Noticias internacionales redactadas con neutralidad periodística', 'Elaboradas y contrastadas por reporteros voluntarios', 'Fuentes acreditadas y enlaces a medios originales', 'Licencia abierta Creative Commons'],
      en: ['International news reported from a neutral viewpoint', 'Authored and fact-checked by volunteer citizen journalists', 'Accredited sources and links to original reports', 'Open Creative Commons licensing']
    }
  }
];
