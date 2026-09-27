import { EsperantoResource } from '../types';

export const PART4_RESOURCES: EsperantoResource[] = [
  // ========================================================
  // 1. JUNULARAJ NACIAJ ASOCIOJ (NATIONAL YOUTH SECTIONS)
  // ========================================================
  {
    id: 'jefo-junularo',
    title: 'Franca Esperanto-Junularo (JEFO)',
    url: 'https://jefo.fr',
    displayUrl: 'jefo.fr',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Jeunesse Espérantiste Française (JEFO)',
    languages: ['fr', 'eo'],
    description: {
      eo: 'La nacia junulara organizo en Francio, organizanto de la muzikfestivalo FESTO, staĝoj kaj eldonanto de la bulteno JEFO-Informas.',
      es: 'La sección juvenil de Francia, organizadora del festival de música FESTO, campamentos de verano y encuentros universitarios.',
      en: 'The national youth organization in France, organizers of the music festival FESTO, language immersion camps, and university clubs.'
    },
    tags: ['jefo', 'junuloj', 'francio', 'festo', 'jovenes', 'francia'],
    features: {
      eo: ['Organizanto de la somera festivalo FESTO', 'Junularaj staĝoj en Kastelo Greziljono', 'Aktiva babilgrupo en Discord', 'Subteno al Erasmus-studentoj'],
      es: ['Organización del festival FESTO', 'Campamentos juveniles en el Castillo de Grésillon', 'Comunidad activa en Discord', 'Apoyo a estudiantes Erasmus'],
      en: ['Organizers of the summer music festival FESTO', 'Youth workshops at Château de Grésillon', 'Active Discord community', 'Support for Erasmus students']
    }
  },
  {
    id: 'gej-junularo',
    title: 'Germana Esperanto-Junularo (GEJ)',
    url: 'https://esperanto-jugend.de',
    displayUrl: 'esperanto-jugend.de',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Deutsche Esperanto-Jugend (GEJ)',
    year: '1951-2024',
    languages: ['de', 'eo'],
    description: {
      eo: 'Unu el la plej historiaj kaj aktivaj junularaj sekcioj en Eŭropo, organizanto de la Internacia Seminario (IS) kaj de la Novjara Renkontiĝo (NR).',
      es: 'Una de las secciones juveniles más veteranas de Europa, organizadora histórica del Seminario Internacional (IS) y del encuentro de Año Nuevo.',
      en: 'One of the most active youth sections in Europe, historic organizer of the International Seminar (IS) and New Year Youth Gatherings.'
    },
    tags: ['gej', 'junuloj', 'germanio', 'berlino', 'is', 'alemania'],
    features: {
      eo: ['Historio ekde 1951 kun miloj da partoprenintoj', 'La revuo Kune', 'Seminarioj financataj de la Eŭropa Unio', 'Sidejo en Berlino'],
      es: ['Trayectoria continuada desde 1951', 'Revista juvenil Kune', 'Seminarios internacionales subvencionados por la UE', 'Sede en Berlín'],
      en: ['Continuous activity since 1951', 'Youth magazine Kune', 'International seminars funded by the EU', 'Headquarters in Berlin']
    }
  },
  {
    id: 'iej-junularo',
    title: 'Itala Esperantista Junularo (IEJ)',
    url: 'https://iej.esperanto.it',
    displayUrl: 'iej.esperanto.it',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Itala Esperantista Junularo (IEJ)',
    languages: ['it', 'eo'],
    description: {
      eo: 'La junulara sekcio en Italio, organizanto de la Internacia Junulara Festivalo (IJF) kaj eldonanto de la gazeto Konscie.',
      es: 'La sección juvenil italiana, organizadora del Festival Internacional de Jóvenes (IJF) en Semana Santa y editora de la revista Konscie.',
      en: 'The Italian youth section, organizers of the annual Easter International Youth Festival (IJF) and publishers of the magazine Konscie.'
    },
    tags: ['iej', 'junuloj', 'italio', 'ijf', 'konscie', 'italia'],
    features: {
      eo: ['Ĉiujara organizado de la Internacia Junulara Festivalo (IJF)', 'La gazeto Konscie', 'Aktiva partopreno en TEJO', 'Kursoj por studentoj en Romo kaj Milano'],
      es: ['Organización del Festival Juvenil Internacional (IJF) cada Pascua', 'Revista periódica Konscie', 'Participación activa en los órganos de TEJO', 'Talleres en Roma y Milán'],
      en: ['Hosts the annual Easter International Youth Festival (IJF)', 'Periodical Konscie', 'Strong leadership role in TEJO', 'Workshops in Rome and Milan']
    }
  },
  {
    id: 'pej-junularo',
    title: 'Pola Esperanto-Junularo (PEJ)',
    url: 'https://pej.pl',
    displayUrl: 'pej.pl',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Pola Esperanto-Junularo',
    languages: ['pl', 'eo'],
    description: {
      eo: 'La junulara asocio en Pollando, organizanto de la Junulara E-Semajno (JES) kaj renkontiĝoj en Varsovio, Vroclavo kaj Bjalistoko.',
      es: 'La asociación juvenil de Polonia, coorganizadora de la Semana Juvenil de Año Nuevo (JES) y encuentros en Varsovia y Breslavia.',
      en: 'The Polish youth organization, co-host of the New Year Youth Week (JES) and local gatherings in Warsaw and Wrocław.'
    },
    tags: ['pej', 'junuloj', 'pollando', 'jes', 'polonia', 'jovenes'],
    features: {
      eo: ['Kunorganizanto de la granda vintra festivalo JES', 'Projektoj en Bjalistoko kaj Varsovio', 'Edukaj trejnadoj por junaj aktivuloj', 'Kooperado kun najbaraj landoj'],
      es: ['Coorganización del multitudinario festival de invierno JES', 'Proyectos culturales en Białystok y Varsovia', 'Seminarios de formación para jóvenes líderes', 'Cooperación transfronteriza'],
      en: ['Co-hosts the major winter festival JES', 'Cultural projects in Białystok and Warsaw', 'Leadership training for young activists', 'Strong regional cross-border ties']
    }
  },
  {
    id: 'hejs-junularo',
    title: 'Hispana Esperanto-Junulara Sekcio (HEJS)',
    url: 'https://esperanto.es/juventud',
    displayUrl: 'esperanto.es/juventud',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Federación Española de Esperanto (HEF)',
    languages: ['es', 'eo'],
    description: {
      eo: 'La sekcio por junuloj de la Hispana Federacio, kunordiganta renkontiĝojn, stipendiojn por partopreni en IJK kaj retajn babilrondojn.',
      es: 'La sección joven de la Federación Española, coordinadora de encuentros juveniles, becas para el IJK y tertulias virtuales.',
      en: 'The youth branch of the Spanish Federation, coordinating young adult meetups, IJK travel grants, and online conversation clubs.'
    },
    tags: ['hejs', 'junuloj', 'hispanio', 'hef', 'espana', 'jovenes'],
    features: {
      eo: ['Vojaĝstipendioj por hispanaj junuloj al la IJK', 'Interagaj babiladoj en Telegram kaj Discord', 'Junularaj programeroj dum la Hispana Kongreso', 'Konekto kun TEJO'],
      es: ['Becas de desplazamiento al IJK para jóvenes socios', 'Canales de conversación en Telegram y Discord', 'Programa juvenil propio en el Congreso Español', 'Conexión directa con TEJO'],
      en: ['Travel grants to IJK for young members', 'Chat channels on Telegram and Discord', 'Dedicated youth track at the Spanish Congress', 'Direct ties to TEJO']
    }
  },
  {
    id: 'fleja-junularo',
    title: 'Flandra Ligo de Esperantistaj Junuloj (FLEJA)',
    url: 'https://esperanto.be/fleja',
    displayUrl: 'esperanto.be/fleja',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'FLEJA (Belgio)',
    languages: ['nl', 'eo'],
    description: {
      eo: 'La junulara asocio en Flandrio (Belgio), eldonanto de la revuo Jongeren Esperanto Nieuws (JEN) kaj gastiganto de internaciaj renkontiĝoj.',
      es: 'La asociación juvenil flamenca en Bélgica, editora de la revista bilingüe JEN y anfitriona de encuentros internacionales.',
      en: 'The Flemish youth association in Belgium, publisher of the bilingual magazine JEN and host of international gatherings.'
    },
    tags: ['fleja', 'flandrio', 'belgio', 'antverpeno', 'jen', 'belgica'],
    features: {
      eo: ['La revuo JEN por junaj lernantoj', 'Sidejo en Antverpeno', 'Seminarioj kaj ekskursoj en Belgio', 'Kunlaboro kun nederlandaj junuloj'],
      es: ['Revista bilingüe JEN', 'Sede en Amberes', 'Excursiones y talleres culturales en Bélgica', 'Cooperación con la juventud neerlandesa'],
      en: ['Bilingual magazine JEN', 'Headquarters in Antwerp', 'Excursions and cultural workshops across Belgium', 'Close collaboration with Dutch youth']
    }
  },
  {
    id: 'bje-junularo',
    title: 'Brazila Junulara Esperanto-Organizo (BEJO)',
    url: 'https://bejo.esperanto.org.br',
    displayUrl: 'bejo.esperanto.org.br',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Brazila Esperantista Junulara Organizo',
    languages: ['pt', 'eo'],
    description: {
      eo: 'Unu el la plej multnombraj junularaj asocioj en Sudameriko, organizanto de la Brazila Junulara Esperanto-Kongreso (BJEK).',
      es: 'Una de las organizaciones juveniles más multitudinarias de Sudamérica, organizadora del Congreso Juvenil Brasileño (BJEK).',
      en: 'One of South America\'s largest youth organizations, organizers of the annual Brazilian Youth Esperanto Congress (BJEK).'
    },
    tags: ['bejo', 'brazilo', 'junuloj', 'bjek', 'brasil', 'jovenes'],
    features: {
      eo: ['Ĉiujara Brazila Junulara Kongreso', 'Aktivaj kluboj en Rio-de-Ĵanejro, San-Paŭlo kaj Braziljo', 'Podcastoj kaj videoj en TikTok', 'Granda komunumo de denaskuloj'],
      es: ['Congreso Juvenil Brasileño anual', 'Clubes en Río de Janeiro, São Paulo y Brasilia', 'Podcasts y vídeos en redes sociales', 'Notable comunidad de hablantes nativos'],
      en: ['Annual Brazilian Youth Congress', 'Active chapters in Rio, São Paulo, and Brasília', 'Podcasts and social media content', 'Strong cohort of native speakers']
    }
  },
  {
    id: 'usej-junularo',
    title: 'Usona Junulara Esperanto-Organizo (USEJ)',
    url: 'https://usej.esperanto-usa.org',
    displayUrl: 'usej.esperanto-usa.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'USEJ (Usono)',
    languages: ['en', 'eo'],
    description: {
      eo: 'La junulara sekcio de Esperanto-USA, kunordiganta studentajn grupojn en usonaj universitatoj kaj retajn lud-noktojn.',
      es: 'La sección juvenil de Esperanto-USA, coordinadora de clubes estudiantiles universitarios y noches de videojuegos en línea.',
      en: 'The youth division of Esperanto-USA, coordinating student clubs at US colleges and weekly online gaming socials.'
    },
    tags: ['usej', 'usono', 'junuloj', 'studentoj', 'universitatoj', 'estados unidos'],
    features: {
      eo: ['Studentaj kluboj en Harvard, Berkeley kaj aliaj universitatoj', 'Semajnaj videoludaj sesioj en Discord', 'Subteno por junaj usonaj komencantoj', 'Stipendioj'],
      es: ['Clubes estudiantiles en universidades estadounidenses', 'Sesiones semanales de videojuegos en Discord', 'Apoyo a jóvenes aprendices', 'Becas de viaje para congresos'],
      en: ['Student clubs at US universities', 'Weekly online Discord gaming sessions', 'Mentorship for young US learners', 'Travel grants to conferences']
    }
  },

  // ========================================================
  // 2. KROMAJ METROPOLOJ KAJ KLUBAROJ (GLOBAL CITIES)
  // ========================================================
  {
    id: 'sfero-san-francisco',
    title: 'SFERO - San-Francisko Esperanto-Societo',
    url: 'https://sfero.org',
    displayUrl: 'sfero.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'San Francisco Regional Esperanto Organization',
    languages: ['en', 'eo'],
    description: {
      eo: 'La historia societo en la golfregiono de San-Francisko kaj Silicon Valley, organizanto de la Somera Esperanto-Laboratorio kaj klubaj vesperoj.',
      es: 'La histórica sociedad del área de la Bahía de San Francisco y Silicon Valley, organizadora de talleres intensivos y tertulias.',
      en: 'The historic society in the San Francisco Bay Area and Silicon Valley, host to regional workshops and regular gatherings.'
    },
    tags: ['san francisko', 'silicon valley', 'kalifornio', 'sfero', 'estados unidos'],
    features: {
      eo: ['Regulaj renkontiĝoj en San-Francisko kaj Berkeley', 'Ligiloj kun teknologiaj kompanioj en Silicon Valley', 'Someraj intensaj laborrenkontiĝoj', 'Libroservo'],
      es: ['Reuniones en San Francisco y Berkeley', 'Vínculos con profesionales tecnológicos de Silicon Valley', 'Talleres formativos de verano', 'Fondo bibliográfico local'],
      en: ['Regular socials in San Francisco and Berkeley', 'Ties to tech professionals in Silicon Valley', 'Summer intensive language retreats', 'Local lending library']
    }
  },
  {
    id: 'chicago-esperanto-society',
    title: 'Chicago Esperanto Society',
    url: 'https://chicagoesperanto.org',
    displayUrl: 'chicagoesperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Chicago Esperanto Society',
    languages: ['en', 'eo'],
    description: {
      eo: 'La societo en Ĉikago kunvenanta ĉiumonate por prelegoj, konversaciaj lunĉoj kaj kulturaj vizitoj en la metropolo de Ilinojso.',
      es: 'La sociedad de Chicago que se reúne mensualmente para conferencias, comidas de conversación y visitas a museos de la ciudad.',
      en: 'The Chicago club meeting monthly for cultural presentations, conversational lunches, and museum excursions.'
    },
    tags: ['ĉikago', 'chicago', 'ilinojso', 'klubo', 'estados unidos'],
    features: {
      eo: ['Ĉiumonataj konversaciaj renkontiĝoj en Ĉikago', 'Kunlaboro kun la Universitato de Ĉikago', 'Kultura gvidado por vizitantoj', 'Senpaga aliĝo'],
      es: ['Encuentros mensuales de conversación en Chicago', 'Vínculos con la Universidad de Chicago', 'Guía cultural para visitantes foráneos', 'Participación gratuita'],
      en: ['Monthly conversation lunches in Chicago', 'Ties with the University of Chicago', 'Cultural orientation for visiting Esperantists', 'Free to join']
    }
  },
  {
    id: 'roma-esperanto-klubo',
    title: 'Roma Esperanto-Klubo (Circolo Esperantista di Roma)',
    url: 'https://esperanto.roma.it',
    displayUrl: 'esperanto.roma.it',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Roma Esperanto-Klubo',
    languages: ['it', 'eo'],
    description: {
      eo: 'La tradicia klubo en la Itala Ĉefurbo, kunvenanta por lingvokursoj, beletraj vesperoj kaj gvidataj vizitoj al la monumentoj de Romo.',
      es: 'El tradicional club de la capital italiana, punto de encuentro para cursos, recitales literarios y visitas culturales por los monumentos de Roma.',
      en: 'The classic club in the Italian capital, meeting for classes, literary readings, and guided walking tours among Roman antiquities.'
    },
    tags: ['romo', 'roma', 'italio', 'klubo', 'monumentoj', 'italia'],
    features: {
      eo: ['Regulaj renkontiĝoj en la centro de Romo', 'Gvidataj vizitoj de la Colosseum kaj Vatikanaj Muzeoj en Esperanto', 'Kursoj por komencantoj', 'Biblioteko'],
      es: ['Tertulias regulares en el centro de Roma', 'Recorridos por el Coliseo y Museos Vaticanos guiados en esperanto', 'Cursos de iniciación', 'Biblioteca de préstamo'],
      en: ['Regular meetings in central Rome', 'Guided walking tours of Rome\'s heritage in Esperanto', 'Beginner classes', 'Lending library']
    }
  },
  {
    id: 'milana-esperanto-klubo',
    title: 'Milana Esperanto-Klubo (Milano)',
    url: 'https://esperanto.milano.it',
    displayUrl: 'esperanto.milano.it',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Milana Esperanto-Klubo',
    languages: ['it', 'eo'],
    description: {
      eo: 'La aktiva klubo en Milano, administranto de vasta faka biblioteko kaj organizanto de semajnaj konversaciaj vesperoj en Lombardio.',
      es: 'El activo club de Milán, custodio de una gran biblioteca especializada y organizador de veladas de conversación en Lombardía.',
      en: 'The active club in Milan, curator of an extensive reference library and organizer of weekly conversation nights in Lombardy.'
    },
    tags: ['milano', 'lombardio', 'italio', 'klubo', 'italia'],
    features: {
      eo: ['Rikega biblioteko kun miloj da maloftaj libroj', 'Semajnaj konversaciaj vesperoj', 'Partopreno en lokaj lingvofoiroj', 'Prelegoj pri arto kaj muziko'],
      es: ['Biblioteca con miles de volúmenes singulares', 'Encuentros semanales de conversación', 'Presencia en ferias culturales de Milán', 'Ciclos de conferencias sobre arte'],
      en: ['Extensive library holding thousands of rare books', 'Weekly conversation meetups', 'Presence at Milan cultural fairs', 'Lecture series on art and music']
    }
  },

  // ========================================================
  // 3. KROMAJ LATINAMERIKAJ KAJ EŬROPAJ ASOCIOJ (AMERICAS & EUROPE)
  // ========================================================
  {
    id: 'venezuela-esperanto-asocio',
    title: 'Venezuela Esperanto-Asocio (VEA)',
    url: 'https://esperanto-venezuela.org',
    displayUrl: 'esperanto-venezuela.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Venezuela Esperanto-Asocio',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia asocio en Karakaso, eldonanto de Venezuela Esperantisto kaj organizanto de retaj kursoj por studentoj tra la tuta lando.',
      es: 'La asociación nacional en Caracas, editora de Venezuela Esperantisto y promotora de cursos virtuales para estudiantes de todo el país.',
      en: 'The national association in Caracas, publisher of Venezuela Esperantisto and provider of virtual courses for students nationwide.'
    },
    tags: ['venezuelo', 'karakaso', 'vea', 'venezuela', 'latinameriko'],
    features: {
      eo: ['La revuo Venezuela Esperantisto', 'Regulaj retaj kursoj senpagaj', 'Komunumo en Karakaso kaj Valencio', 'Kunlaboro kun aliaj latinamerikaj asocioj'],
      es: ['Revista periódica Venezuela Esperantisto', 'Cursos virtuales gratuitos para hispanohablantes', 'Comunidad activa en Caracas y Valencia', 'Cooperación regional'],
      en: ['Journal Venezuela Esperantisto', 'Free online courses for Spanish speakers', 'Active community in Caracas and Valencia', 'Regional cooperation']
    }
  },
  {
    id: 'ekvadora-esperanto-movado',
    title: 'Ekvadora Esperanto-Movado',
    url: 'https://esperanto-ecuador.org',
    displayUrl: 'esperanto-ecuador.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Ekvadora Esperanto-Movado',
    languages: ['es', 'eo'],
    description: {
      eo: 'La komunumo de esperantistoj en Kito kaj Guajakilo, organizanta prelegojn pri lingva justeco kaj renkontiĝojn en la andaj valoj.',
      es: 'La comunidad de esperantistas en Quito y Guayaquil, organizadora de charlas sobre justicia lingüística y tertulias en los Andes.',
      en: 'The Esperanto community in Quito and Guayaquil, organizing talks on language rights and conversation circles in the Andean valleys.'
    },
    tags: ['ekvadoro', 'kito', 'guajakilo', 'ecuador', 'latinameriko'],
    features: {
      eo: ['Renkontiĝoj en Kito kaj Guajakilo', 'Kursoj por komencantoj en Ekvadoro', 'Prelegoj en universitatoj', 'Turisma akompano por vizitantoj'],
      es: ['Encuentros en Quito y Guayaquil', 'Iniciación al idioma para estudiantes locales', 'Conferencias en universidades', 'Acogida de viajeros'],
      en: ['Meetups in Quito and Guayaquil', 'Introductory courses for local learners', 'Lectures at university faculties', 'Hospitality for visiting speakers']
    }
  },
  {
    id: 'bolivia-esperanto-rondo',
    title: 'Bolivia Esperanto-Rondo',
    url: 'https://esperanto-bolivia.org',
    displayUrl: 'esperanto-bolivia.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Bolivia Esperanto-Rondo',
    languages: ['es', 'ay', 'qu', 'eo'],
    description: {
      eo: 'La andaj esperantistoj en La-Pazo kaj Koĉabambo, esplorantaj ligojn inter Esperanto kaj indiĝenaj lingvoj kiel la keĉua kaj ajmara.',
      es: 'El colectivo de esperantistas en La Paz y Cochabamba, que explora puntos en común entre el esperanto y lenguas indígenas como el quechua y aimara.',
      en: 'The Andean collective in La Paz and Cochabamba, exploring parallels between Esperanto and indigenous tongues like Quechua and Aymara.'
    },
    tags: ['bolivio', 'la-pazo', 'kocabambo', 'ajmara', 'kecua', 'bolivia'],
    features: {
      eo: ['Esploroj pri paralelaĵoj inter Esperanto kaj la ajmara lingvo', 'Renkontiĝoj en La-Pazo', 'Kursoj por boliviaj studentoj', 'Andaj kulturaj ekskursoj'],
      es: ['Estudios sobre paralelismos morfológicos entre el aimara y el esperanto', 'Tertulias periódicas en La Paz', 'Cursos para universitarios', 'Excursiones andinas'],
      en: ['Linguistic studies on morphological parallels with Aymara', 'Regular meetups in La Paz', 'University student courses', 'Andean cultural outings']
    }
  },
  {
    id: 'urugvaja-esperanto-societo',
    title: 'Urugvaja Esperanto-Societo (UES)',
    url: 'https://esperanto.uy',
    displayUrl: 'esperanto.uy',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Urugvaja Esperanto-Societo',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia societo en Montevideo, fondita en la lando kie okazis la fama 8-a Ĝenerala Konferenco de UNESCO en 1954 kun la unua rezolucio favora al Esperanto.',
      es: 'La sociedad nacional en Montevideo, ciudad donde la UNESCO aprobó en 1954 su célebre primera resolución oficial favorable al esperanto.',
      en: 'The national society in Montevideo, where UNESCO held its landmark 1954 General Conference passing the first historic resolution supporting Esperanto.'
    },
    tags: ['urugvajo', 'montevideo', 'unesco 1954', 'ues', 'uruguay'],
    features: {
      eo: ['Loko de la historia Rezolucio de Unesko en Montevideo (1954)', 'Regulaj renkontiĝoj en Montevideo', 'La radioprogramo Radio Aktiva', 'Biblioteko de libroj'],
      es: ['Cuna de la histórica Resolución de la UNESCO de Montevideo (1954)', 'Tertulias periódicas en Montevideo', 'Programa radiofónico Radio Aktiva', 'Fondo bibliográfico'],
      en: ['Birthplace of the historic 1954 UNESCO Montevideo Resolution', 'Regular meetups in Montevideo', 'Online radio program Radio Aktiva', 'Lending book collection']
    }
  },
  {
    id: 'islanda-esperanto-asocio',
    title: 'Islanda Esperanto-Asocio (IEA)',
    url: 'https://esperanto.is',
    displayUrl: 'esperanto.is',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Íslenska esperantosambandið (IEA)',
    year: '1950-2024',
    languages: ['is', 'eo'],
    description: {
      eo: 'La nacia asocio en Rejkjaviko kaj Islando, eldoninto de islandaj sagaoj en Esperanto kaj gastiganto de la 62-a Universala Kongreso (1977).',
      es: 'La asociación nacional en Reikiavik e Islandia, traductora de las sagas nórdicas al esperanto y anfitriona del 62º Congreso Universal (1977).',
      en: 'The national association in Reykjavik and Iceland, translator of the Icelandic sagas into Esperanto and host of the 62nd World Congress (1977).'
    },
    tags: ['islando', 'rejkjaviko', 'sagaoj', 'iea', 'islandia', 'nordico'],
    features: {
      eo: ['Tradukoj de la famaj malnovnordaj sagaoj de Islando', 'Gastiganto de la UK en Rejkjaviko en 1977 kaj 2013', 'Sidejo en Rejkjaviko', 'La revuo La Mevo'],
      es: ['Traducción al esperanto de las sagas islandesas medievales', 'Doble anfitriona del Congreso Mundial en Reikiavik (1977 y 2013)', 'Sede en Reikiavik', 'Boletín La Mevo'],
      en: ['Translations of medieval Old Norse Icelandic sagas', 'Host to the World Congress in Reykjavik (1977 & 2013)', 'Headquarters in Reykjavik', 'Periodical La Mevo']
    }
  },
  {
    id: 'luksemburga-esperanto-asocio',
    title: 'Luksemburga Esperanto-Asocio (LEA)',
    url: 'https://esperanto.lu',
    displayUrl: 'esperanto.lu',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Luksemburga Esperanto-Asocio',
    languages: ['lb', 'fr', 'de', 'eo'],
    description: {
      eo: 'La multlingva asocio en la Granda Duklando de Luksemburgo, aktiva en la eŭropaj institucioj kaj organizanta lingvopolitikan dialogon.',
      es: 'La asociación multilingüe del Gran Ducado de Luxemburgo, activa ante instituciones europeas y promotora del multilingüismo equitativo.',
      en: 'The multilingual association in the Grand Duchy of Luxembourg, active near European institutions and promoting equitable linguistic policy.'
    },
    tags: ['luksemburgo', 'lea', 'europa unio', 'lingvapolitiko', 'luxemburgo'],
    features: {
      eo: ['Kvarlingva oficiala laboro en la koro de Eŭropo', 'Dialogo kun eŭropaj institucioj pri lingvaj rajtoj', 'Semajnaj klubaj kunvenoj', 'Kultura kunlaboro kun najbaraj regionoj'],
      es: ['Actividad multilingüe en el corazón institucional de Europa', 'Debate con organismos comunitarios sobre política lingüística', 'Reuniones periódicas de club', 'Cooperación transfronteriza'],
      en: ['Multilingual operation in the institutional heart of Europe', 'Dialogue with European bodies on language policy', 'Regular club meetups', 'Cross-border cultural partnerships']
    }
  },

  // ========================================================
  // 4. KROMAJ FAKAJ ASOCIOJ KAJ KULTURO (SPECIALIZED HOBBIES)
  // ========================================================
  {
    id: 'postmarkoj-elf-arek',
    title: 'Esperanto-Ligo Filatelista (ELF-AREK)',
    url: 'https://elf-arek.esperanto.org',
    displayUrl: 'elf-arek.esperanto.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Ligo Filatelista',
    year: '1968-2024',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio por filatelistoj kaj numismatikistoj: katalogoj de centoj da oficialaj poŝtmarkoj eldonitaj tutmonde kun la portreto de Zamenhof aŭ la verda stelo.',
      es: 'Asociación filatélica y numismática: catálogos de cientos de sellos oficiales emitidos en todo el mundo con la efigie de Zamenhof o la estrella verde.',
      en: 'Philatelic and numismatic association cataloging hundreds of official postage stamps issued globally honoring Zamenhof and Esperanto.'
    },
    tags: ['filatelo', 'poŝtmarkoj', 'numismatiko', 'zamenhof', 'kolekto', 'filatelia', 'sellos'],
    features: {
      eo: ['Katalogo de pli ol 500 oficialaj poŝtmarkoj pri Esperanto el 80 landoj', 'La bulteno La Filatelisto', 'Poŝtmarko-interŝanĝo inter membroj', 'Ekspozicioj dum kongresoj'],
      es: ['Catálogo de más de 500 sellos oficiales de correos de 80 países', 'Boletín especializado La Filatelisto', 'Servicio de intercambio entre coleccionistas', 'Exposiciones filatélicas en congresos'],
      en: ['Catalog of over 500 official postage stamps from 80 postal services', 'Specialized bulletin La Filatelisto', 'Stamp exchange network among collectors', 'Philatelic exhibitions at world congresses']
    }
  },
  {
    id: 'rondo-kato-amantoj',
    title: 'Rondo Kato - Faka Asocio por Kat-Amantoj',
    url: 'https://rondo-kato.blogspot.com',
    displayUrl: 'rondo-kato.blogspot.com',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Rondo Kato Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Kora kaj amika faka asocio kunveniganta amantojn de katoj en Esperantujo: rakontoj, fotoj, veterinara konsilo kaj faka terminaro pri felisedoj.',
      es: 'Entrañable club temático que reúne a amantes de los gatos en el mundo del esperanto: relatos, fotografía felina y vocabulario veterinario.',
      en: 'Charming thematic society uniting cat lovers across the Esperanto world: stories, feline photography, veterinary care tips, and cat vocabulary.'
    },
    tags: ['katoj', 'bestoj', 'rondo kato', 'veterinaro', 'gatos', 'mascotas'],
    features: {
      eo: ['Artikoloj kaj rakontoj pri hejmaj kaj sovaĝaj katoj', 'Veterinara konsilo kaj faka terminaro', 'Foto-konkursoj inter membroj', 'Amika kaj bonhumura etoso'],
      es: ['Relatos y artículos sobre felinos domésticos y salvajes', 'Consejos de salud y términos veterinarios', 'Concursos fotográficos periódicos', 'Ambiente simpático y familiar'],
      en: ['Articles and stories on domestic and wild felines', 'Health advice and feline veterinary terms', 'Community photo competitions', 'Warm and playful community spirit']
    }
  },
  {
    id: 'bahaa-esperanto-ligo',
    title: 'Bahaa Esperanto-Ligo (BEL)',
    url: 'https://bahaa-esperanto-ligo.org',
    displayUrl: 'bahaa-esperanto-ligo.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Bahaa Esperanto-Ligo (BEL)',
    year: '1970-2024',
    languages: ['eo', 'en'],
    description: {
      eo: 'La ligo de bahaanoj en Esperantujo, disvastiganta la instruojn de Bahá\'u\'lláh pri la neceso de universala helpa lingvo por certigi mondan pacon.',
      es: 'La asociación de bahá\'ís en el esperanto, que difunde los principios de Bahá\'u\'lláh sobre la necesidad de una lengua auxiliar universal para la paz.',
      en: 'The association of Bahá\'ís in Esperantujo, promoting Bahá\'u\'lláh\'s core teaching on the necessity of a universal auxiliary language for world peace.'
    },
    tags: ['bahaismo', 'bel', 'paco', 'monda unueco', 'bahai', 'espiritualidad'],
    features: {
      eo: ['La revuo Bahaa Mondotesto', 'Tradukoj de la Sanktaj Skriboj de Bahá\'u\'lláh en Esperanton', 'Prelegoj pri universala lingvo kaj paco', 'Renkontiĝoj dum Universalaj Kongresoj'],
      es: ['Publicación periódica Bahaa Mondotesto', 'Traducción íntegra de las Sagradas Escrituras bahá\'ís al esperanto', 'Conferencias sobre paz mundial y armonía', 'Presencia en congresos universales'],
      en: ['Periodical Bahaa Mondotesto', 'Translations of Bahá\'í Sacred Writings into Esperanto', 'Lectures on universal language and human unity', 'Sessions at World Congresses']
    }
  },
  {
    id: 'kvakera-esperanto-servo',
    title: 'Kvakera Esperanto-Servo (Amika Societo)',
    url: 'https://quaker.org/esperanto/',
    displayUrl: 'quaker.org/esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Amika Societo (Kvakeroj)',
    languages: ['en', 'eo'],
    description: {
      eo: 'La servo de la Religia Societo de Amikoj (Kvakeroj) dediĉita al senperforto, socia justeco, silenta medito kaj interpopola harmonio per Esperanto.',
      es: 'El grupo de la Sociedad Religiosa de los Amigos (Cuáqueros) dedicado a la no violencia activa, justicia social y fraternidad a través del esperanto.',
      en: 'The fellowship of the Religious Society of Friends (Quakers) committed to active non-violence, social justice, and international peace through Esperanto.'
    },
    tags: ['kvakeroj', 'paco', 'senperforto', 'medito', 'cuaqueros', 'pacifismo'],
    features: {
      eo: ['Tradukoj de kvakeraj tekstoj pri paco kaj justeco', 'Silentaj meditadoj dum internaciaj kongresoj', 'Subteno al rifuĝintoj kaj homaj rajtoj', 'Dialogo trans religiaj limoj'],
      es: ['Traducción de textos cuáqueros sobre paz activa y objeción de conciencia', 'Encuentros de meditación en silencio en congresos', 'Compromiso con los derechos humanos y refugiados', 'Diálogo interreligioso'],
      en: ['Translations of Quaker writings on peace and conscientious objection', 'Silent worship meetings at international congresses', 'Advocacy for human rights and refugees', 'Interfaith bridge-building']
    }
  },
  {
    id: 'internacia-naturista-organizo',
    title: 'Internacia Naturista Organizo Esperantista (INOE)',
    url: 'https://inoe.esperanto.org',
    displayUrl: 'inoe.esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Internacia Naturista Organizo (Fondita en 1961)',
    year: '1961-2024',
    languages: ['eo'],
    description: {
      eo: 'Fondita en 1961 kaj ligita al la Internacia Naturista Federacio (INF), INOE kunigas naturistojn tutmonde kaj eldonas la revuon Naturista Vivo.',
      es: 'Fundada en 1961 y vinculada a la Federación Naturista Internacional (INF), reúne a naturistas de todo el mundo y edita Naturista Vivo.',
      en: 'Founded in 1961 and affiliated with the International Naturist Federation (INF), uniting naturists globally and publishing Naturista Vivo.'
    },
    tags: ['naturismo', 'inoe', 'naturo', 'sano', 'naturista vivo', 'naturismo'],
    features: {
      eo: ['La revuo Naturista Vivo ekde 1961', 'Oficiala rekono fare de la Internacia Naturista Federacio (INF)', 'Naturistaj renkontiĝoj kaj ferioj en Francio, Hispanio kaj Kroatio', 'Respekto al naturo kaj homa korpo'],
      es: ['Revista Naturista Vivo en publicación desde 1961', 'Reconocimiento oficial por la Federación Naturista Internacional (INF)', 'Vacaciones y campamentos en Francia, España y Croacia', 'Filosofía de respeto al cuerpo y al medio ambiente'],
      en: ['Journal Naturista Vivo published continuously since 1961', 'Official affiliate of the International Naturist Federation (INF)', 'Naturist holidays and rallies in France, Spain, and Croatia', 'Philosophy of body positivity and nature respect']
    }
  },
  {
    id: 'motorciklistoj-esperanto',
    title: 'Esperantista Motorciklisto-Klubo',
    url: 'https://motorciklo.esperanto.org',
    displayUrl: 'motorciklo.esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperantista Motorciklisto-Rondo',
    languages: ['eo'],
    description: {
      eo: 'Entuziasma faka rondo de motorciklantoj en Esperantujo, organizanta internaciajn vojvojaĝojn tra Eŭropo kaj montaraj pasejoj.',
      es: 'Club de aficionados a las motocicletas en el esperanto, organizador de rutas internacionales por puertos de montaña y carreteras europeas.',
      en: 'Enthusiastic club of motorcyclists in Esperantujo, organizing cross-border touring rallies across Europe and scenic mountain passes.'
    },
    tags: ['motorcikloj', 'vojaĝoj', 'motoroj', 'vojoj', 'motos', 'rutas'],
    features: {
      eo: ['Vojvojaĝoj (moto-tours) en la Alpoj, Pireneoj kaj Karpatoj', 'Faka terminaro pri motorcikloj kaj mekaniko', 'Komunaj tendumadoj kaj renkontiĝoj', 'Amika etoso de motoramantoj'],
      es: ['Rutas en moto por los Pirineos, los Alpes y los Cárpatos', 'Vocabulario especializado de mecánica y piezas de moto', 'Acampadas conjuntas y escapadas de fin de semana', 'Compañerismo motero'],
      en: ['Motorcycle tours through the Alps, Pyrenees, and Carpathians', 'Specialized mechanical lexicon for motorbikes', 'Weekend group rides and campouts', 'Open camaraderie of riding enthusiasts']
    }
  },

  // ========================================================
  // 5. PLIAJ TEKNIKAJ KAJ SCIENCAJ FAKOJ (ENGINEERING & TECH)
  // ========================================================
  {
    id: 'geologia-terminaro',
    title: 'Geologia kaj Paleontologia Terminaro',
    url: 'https://eventoj.hu/steb/geologio/geologia-vortaro.htm',
    displayUrl: 'eventoj.hu/geologio',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Endre Dudich (Hungara Geologo & Akademiano)',
    languages: ['eo', 'hu', 'en', 'fr'],
    description: {
      eo: 'Scienca terminaro pri mineraloj, rokoj, tektoniko, fosilioj kaj geologiaj epokoj verkita de la hungara akademiano Endre Dudich.',
      es: 'Glosario científico sobre minerales, rocas, tectónica de placas, fósiles y eras geológicas compilado por el catedrático Endre Dudich.',
      en: 'Scientific glossary covering minerals, petrology, plate tectonics, fossils, and geological epochs compiled by academician Endre Dudich.'
    },
    tags: ['geologio', 'mineraloj', 'rokoj', 'fosilioj', 'scienco', 'geologia', 'ciencia'],
    features: {
      eo: ['Nomoj de ĉiuj geologiaj epokoj kaj tavoloj', 'Mineralogia klasifiko kaj roktipoj', 'Terminoj pri tertremoj kaj tektoniko', 'Parto de la scienca heredaĵo STEB'],
      es: ['Denominación de todas las eras, períodos y estratos geológicos', 'Clasificación mineralógica y tipos de rocas', 'Sismología y tectónica de placas', 'Incluido en la biblioteca STEB'],
      en: ['Nomenclature for all geological epochs and strata', 'Mineralogical classifications and rock types', 'Seismology and plate tectonics concepts', 'Archived in the STEB science library']
    }
  },
  {
    id: 'aviada-terminaro',
    title: 'Aviada kaj Aeronaŭtika Terminaro',
    url: 'https://eventoj.hu/steb/aviado/aviada-terminaro.htm',
    displayUrl: 'eventoj.hu/aviado',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'tool',
    author: 'Aviada Esperanto-Fako',
    languages: ['eo', 'en'],
    description: {
      eo: 'Faka gvidilo pri aviado, aviadiloj, navigado, flughavenoj, vetero kaj aeronaŭtika inĝenierarto kun oficialaj esperantaj ekvivalentoj.',
      es: 'Vocabulario técnico de aviación, aeronaves, navegación aérea, aeropuertos, meteorología e ingeniería aeronáutica.',
      en: 'Technical lexicon covering aviation, aircraft systems, air navigation, airport operations, aeronautical meteorology, and aerodynamics.'
    },
    tags: ['aviado', 'aviadiloj', 'flughaveno', 'navigado', 'aviacion', 'aerodinamica'],
    features: {
      eo: ['Terminoj por partoj de aviadilo (flugiloj, fuzelaĝo, motoroj)', 'Aeronaŭtika navigado kaj instrumentoj', 'Flughavenaj proceduroj kaj aertrafiko', 'Senpage konsultebla'],
      es: ['Componentes de la aeronave (fuselaje, flaps, turbinas)', 'Instrumental y procedimientos de navegación aérea', 'Control de tráfico aéreo y aeropuertos', 'Acceso libre'],
      en: ['Aircraft structural components (fuselage, wings, jet engines)', 'Avionics instrumentation and flight navigation', 'Air traffic control procedures and runways', 'Free online access']
    }
  },
  {
    id: 'kriptografia-terminaro',
    title: 'Kriptografio kaj Cibersekureco en Esperanto',
    url: 'https://komputeko.net/kripto',
    displayUrl: 'komputeko.net/kripto',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Komputeko & E@I',
    languages: ['eo', 'en', 'es'],
    description: {
      eo: 'Faka terminaro pri moderna ĉifrado, publikaj ŝlosiloj (RSA, ECC), haket-funkcioj, blokĉenoj kaj cifereca sekureco.',
      es: 'Vocabulario especializado sobre criptografía moderna, claves públicas, funciones hash, cadena de bloques (blockchain) y ciberseguridad.',
      en: 'Specialized glossary covering modern cryptography, public-key encryption (RSA, ECC), hash algorithms, blockchain, and cybersecurity.'
    },
    tags: ['kriptografio', 'cibersekureco', 'ĉifrado', 'blokĉeno', 'komputeko', 'criptografia', 'seguridad'],
    features: {
      eo: ['Terminoj por asimetria kaj simetria ĉifrado', 'Blokĉeno kaj ciferecaj subskriboj', 'Sekureco de retoj kaj datum-protekto', 'Ĝisdatigita laŭ modernaj normoj'],
      es: ['Conceptos de cifrado asimétrico, hash y firmas digitales', 'Blockchain y contratos inteligentes', 'Seguridad de redes y protección de datos', 'Actualizado con la terminología actual'],
      en: ['Symmetric and asymmetric encryption concepts', 'Blockchain and digital signature nomenclature', 'Network security and data protection', 'Continuously updated with contemporary tech terms']
    }
  },
  {
    id: 'linux-en-esperanto',
    title: 'Linux kaj Libera Programaro en Esperanto (KDE & GNOME)',
    url: 'https://eo.fedoraproject.org',
    displayUrl: 'eo.fedoraproject.org',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Fedora, Debian, Ubuntu & KDE Tradukteamoj',
    languages: ['eo'],
    description: {
      eo: 'La ĉefaj liberaj operaciumoj (Ubuntu, Debian, Fedora) kaj labortablaj medioj (KDE Plasma, GNOME) plene tradukitaj en Esperanton fare de volontuloj.',
      es: 'Las principales distribuciones libres (Ubuntu, Debian, Fedora) y escritorios (GNOME, KDE Plasma) traducidos íntegramente al esperanto.',
      en: 'Major open operating systems (Ubuntu, Debian, Fedora) and desktop environments (GNOME, KDE Plasma) fully localized into Esperanto.'
    },
    tags: ['linux', 'ubuntu', 'kde', 'gnome', 'debian', 'fedora', 'software libre'],
    features: {
      eo: ['Kompleta esperanta labortablo (menukartoj, fenestroj, dosieradministrilo)', 'Instalilo de Linukso en Esperanto', 'Literumilo kaj sistemo-agordoj', 'Centprocente libera kaj malfermfonta'],
      es: ['Escritorio completo en esperanto (menús, explorador de archivos, configuración)', 'Instalador del sistema operativo en esperanto', 'Corrector y teclados preconfigurados', 'Cien por cien software libre'],
      en: ['Complete desktop UI in Esperanto (menus, file managers, control center)', 'OS installers available in Esperanto', 'Pre-configured spell-checkers and keymaps', 'One hundred percent free and open-source']
    }
  },
  {
    id: 'libretranslate-esperanto',
    title: 'LibreTranslate - Malfermkoda Reta Tradukilo',
    url: 'https://libretranslate.com',
    displayUrl: 'libretranslate.com',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'LibreTranslate & Argos Open Tech',
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'Sendependa, memgastigebla kaj malfermfonta maŝintradukilo funkciigita de Argos Translate, plene subtenanta Esperanton sen spionado nek reklamoj.',
      es: 'Traductor automático libre y autoalojable basado en redes neuronales abiertas (Argos Translate), con soporte de esperanto y respeto a la privacidad.',
      en: 'A self-hostable, open-source neural machine translation engine powered by Argos Translate, supporting Esperanto without tracking or ads.'
    },
    tags: ['libretranslate', 'traduko', 'artefarita intelekto', 'malferma kodo', 'privateco', 'traductor libre'],
    features: {
      eo: ['Tute malfermfonta maŝintradukado', 'Memgastigebla sur propra servilo sen spionado', 'Senpaga publika API por programistoj', 'Ne dividas datumojn kun grandaj kompanioj'],
      es: ['Motor de traducción neuronal 100% de código abierto', 'Autoalojable en servidor propio sin rastreo de datos', 'API pública gratuita para programadores', 'Máxima privacidad'],
      en: ['100% open-source neural translation engine', 'Self-hostable on private servers with zero telemetry', 'Free public API for developers', 'Uncompromised data privacy']
    }
  },
  {
    id: 'matrix-esperanto-cxambroj',
    title: 'Matrix Esperanto-Ĉambroj (Sekura Malcentrigita Ĉato)',
    url: 'https://matrix.to/#/#esperanto:matrix.org',
    displayUrl: 'matrix.to/#/#esperanto:matrix.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Matrix.org Esperanto Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La federita, sekura kaj fin-al-fine ĉifrita babilreto de Matrix: aliĝu al la esperantaj spacoj el Element aŭ ajna Matrix-kliento.',
      es: 'La red de mensajería federada, segura y cifrada de extremo a extremo de Matrix: salas de esperanto accesibles desde Element y cualquier app.',
      en: 'The federated, secure, end-to-end encrypted messaging network of Matrix: join Esperanto spaces and rooms via Element or any Matrix client.'
    },
    tags: ['matrix', 'element', 'ĉifrado', 'sekureco', 'malcentrigita', 'chat seguro', 'fediverso'],
    features: {
      eo: ['Fin-al-fine ĉifrita sekura babilado', 'Ponto kun Telegram kaj Discord-ĉambroj', 'Malcentrigita sen dependeco de ununura kompanio', 'Senpaga reta kaj poŝtelefona aliro'],
      es: ['Cifrado de extremo a extremo para máxima privacidad', 'Interconectado con salas de Telegram y Discord', 'Descentralizado y libre de censura central', 'Acceso gratuito web y móvil'],
      en: ['End-to-end encrypted secure conversations', 'Bridged with select Telegram and Discord channels', 'Decentralized and resilient against censorship', 'Free web and mobile apps']
    }
  },
  {
    id: 'lemmy-esperanto',
    title: 'Lemmy Esperanto-Komunumo (Federita Reddit)',
    url: 'https://lemmy.world/c/esperanto',
    displayUrl: 'lemmy.world/c/esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Fediverse Lemmy Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La malfermfonta kaj federita alternativo al Reddit en la Fediverso: afiŝu ligilojn, voĉdonu pri novaĵoj kaj diskutu en pura Esperanto.',
      es: 'La alternativa de código abierto y federada a Reddit en el Fediverso: comparte enlaces, vota temas y debate íntegramente en esperanto.',
      en: 'The open-source, federated alternative to Reddit on the Fediverse: post links, vote on community topics, and discuss in Esperanto.'
    },
    tags: ['lemmy', 'fediverse', 'forumoj', 'diskutoj', 'malferma kodo', 'foro', 'red social'],
    features: {
      eo: ['Tute senkomerca platformo sen reklamoj', 'Ligiloj kaj novaĵoj pri Esperantujo ĉiutage', 'Konektita al la tuta Fediverso', 'Libera partopreno sen spionado'],
      es: ['Plataforma sin publicidad comercial ni algoritmos opacos', 'Enlaces diarios de actualidad y cultura', 'Interconectada con todo el Fediverso', 'Privacidad protegida'],
      en: ['Non-commercial platform free of tracking ads', 'Daily curated links and community updates', 'Interconnected with the broader Fediverse', 'Privacy-first architecture']
    }
  },
  {
    id: 'esperanto-tv-sidnejo',
    title: 'Esperanto TV (Sidnejo, Aŭstralio)',
    url: 'https://esperantotv.net',
    displayUrl: 'esperantotv.net',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'video',
    author: 'Esperanto TV Aŭstralio',
    languages: ['eo'],
    description: {
      eo: 'Reta televidkanalo el Sidnejo elsendanta intervjuojn, kongresajn raportojn, dokumentajn filmojn kaj muzikajn videojn el la tuta mondo.',
      es: 'Canal de televisión por internet desde Sídney que emite entrevistas, documentales, crónicas de congresos y actuaciones musicales.',
      en: 'Internet television station based in Sydney broadcasting interviews, documentary features, congress reports, and music performances.'
    },
    tags: ['televido', 'tv', 'sidnejo', 'aŭstralio', 'videoj', 'television', 'entrevistas'],
    features: {
      eo: ['Seninterrompaj retaj video-elsendoj', 'Dokumentaj filmoj pri Esperanto-historio', 'Intervjuoj kun vojaĝantoj kaj aktivuloj', 'Spektebla en ajna retumilo'],
      es: ['Emisión de vídeo online en continuo', 'Documentales sobre la historia y personajes del idioma', 'Entrevistas a viajeros y personalidades', 'Reproducción directa en navegador'],
      en: ['Continuous online video broadcasts', 'Documentaries on Esperanto heritage and figures', 'Interviews with international travelers', 'Plays directly in any browser']
    }
  },
  {
    id: 'komprenu-min-podkasto',
    title: 'Komprenu Min - Intervjuoj kun Denaskuloj',
    url: 'https://anchor.fm/komprenumin',
    displayUrl: 'anchor.fm/komprenumin',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Komprenu Min Projekto',
    languages: ['eo'],
    description: {
      eo: 'Podkasto de profundaj intervjuoj kun denaskaj parolantoj de Esperanto el diversaj kontinentoj, rakontantaj sian infanaĝon kaj dulingvan edukon.',
      es: 'Podcast de entrevistas en profundidad con hablantes nativos de esperanto de diversos países, narrando su infancia y crianza bilingüe.',
      en: 'A podcast of in-depth interviews with native Esperanto speakers from various continents, discussing their childhood and bilingual upbringing.'
    },
    tags: ['denaskuloj', 'podkasto', 'infanaĝo', 'familioj', 'denaskaj parolantoj', 'podcast', 'hablantes nativos'],
    features: {
      eo: ['Aŭtentaj atestoj de denaskuloj el Eŭropo, Azio kaj Ameriko', 'Klarigoj pri kiel familioj edukas infanojn en Esperanto', 'Klara kaj natura parolado', 'Disponebla en Spotify kaj Apple Podcasts'],
      es: ['Testimonios reales de hablantes nativos de Europa, Asia y América', 'Experiencias de familias plurilingües que crían en esperanto', 'Conversación fluida y natural', 'Disponible en las principales plataformas de podcast'],
      en: ['Firsthand accounts from native speakers in Europe, Asia, and the Americas', 'Insights into how multilingual families raise children in Esperanto', 'Natural, flowing native speech', 'Available on Spotify and Apple Podcasts']
    }
  },
  {
    id: 'isu-somera-universitato',
    title: 'Internacia Somera Universitato (ISU de UEA)',
    url: 'https://uea.org/kongresoj/isu',
    displayUrl: 'uea.org/isu',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'website',
    author: 'Universala Esperanto-Asocio & Akademianoj',
    year: '1948-2024',
    languages: ['eo'],
    description: {
      eo: 'La prestiĝa akademia programo okazanta ĉiujare dum la Universala Kongreso, kie universitataj profesoroj prelegas pri siaj sciencaj esploroj.',
      es: 'El prestigioso ciclo académico celebrado cada año durante el Congreso Universal, donde catedráticos universitarios imparten lecciones magistrales.',
      en: 'The prestigious academic program held annually during the World Congress, where university professors deliver master lectures on scientific research.'
    },
    tags: ['isu', 'universitato', 'akademio', 'prelegoj', 'scienco', 'conferencias', 'universidad'],
    features: {
      eo: ['Prelegoj de universitataj profesoroj en pura Esperanto', 'Publikigo de la prelegkolekto en oficialaj libroj de ISU', 'Fakoj: fiziko, biologio, juro, lingvistiko, historio', 'Akademia nivelo C1-C2'],
      es: ['Lecciones magistrales de catedráticos universitarios en esperanto', 'Publicación del libro anual con los textos íntegros de las ponencias', 'Disciplinas: física, astronomía, derecho, biología e historia', 'Nivel académico superior C1-C2'],
      en: ['Master lectures by university professors entirely in Esperanto', 'Annual publication of the bound lecture compendium volume', 'Covers physics, astronomy, law, biology, and history', 'Scholarly CEFR C1-C2 tier']
    }
  },

  // ========================================================
  // 6. KROMAJ NACIAJ ASOCIOJ EN LA MONDO (GLOBAL ASSOCIATIONS)
  // ========================================================
  {
    id: 'filipina-esperanto-junularo',
    title: 'Filipina Esperanto-Junularo (FEJ)',
    url: 'https://esperanto-philippines.org',
    displayUrl: 'esperanto-philippines.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Filipina Esperanto-Junularo',
    languages: ['tl', 'en', 'eo'],
    description: {
      eo: 'La junulara organizo en Manilo kaj Filipinoj, organizanta retajn kursojn en la tagaloga kaj angla, kaj partoprenanta en aziaj seminarioj.',
      es: 'La asociación juvenil en Manila y Filipinas, que imparte cursos en tagalo e inglés y participa activamente en encuentros asiáticos.',
      en: 'The youth organization in Manila and the Philippines, running courses in Tagalog and English, active in Asian regional exchanges.'
    },
    tags: ['filipinoj', 'manilo', 'tagaloga', 'fej', 'filipinas', 'asia'],
    features: {
      eo: ['Kursoj en la tagaloga kaj angla', 'Renkontiĝoj en Manilo kaj Kezonurbo', 'Aktiva grupo de universitataj studentoj', 'Partopreno en TEJO-projektoj'],
      es: ['Cursos bilingües en tagalo e inglés', 'Encuentros en Manila y Quezon City', 'Comunidad estudiantil universitaria', 'Participación en seminarios de TEJO'],
      en: ['Bilingual courses in Tagalog and English', 'Social meetups in Manila and Quezon City', 'Active university student chapters', 'Participation in TEJO projects']
    }
  },
  {
    id: 'barata-esperanto-federacio',
    title: 'Fondaĵo Esperanto Barato (FEI - Hindio)',
    url: 'https://esperanto-india.org',
    displayUrl: 'esperanto-india.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Fondaĵo Esperanto Barato',
    languages: ['hi', 'en', 'eo'],
    description: {
      eo: 'La nacia fondaĵo en Hindio (Barato), kunveniganta membrojn en Nov-Delhio, Bengaluro kaj Puneo, eldonanta la bultenon Barata Esperantisto.',
      es: 'La federación nacional de la India, con actividad en Nueva Delhi, Bangalore y Pune, editora del boletín Barata Esperantisto.',
      en: 'The national federation in India, bringing together chapters in New Delhi, Bangalore, and Pune, publisher of Barata Esperantisto.'
    },
    tags: ['hindio', 'barato', 'nov-delhio', 'bengaluro', 'india', 'asia'],
    features: {
      eo: ['Kursoj en la hindia kaj angla', 'Barataj Esperanto-Renkontiĝoj', 'Tradukoj de Rabindranath Tagore kaj Gandhi', 'Biblioteko en Bengaluro'],
      es: ['Cursos adaptados a hablantes de hindi e inglés', 'Encuentros Nacionales de la India', 'Traducción de Rabindranath Tagore y Mahatma Gandhi', 'Biblioteca en Bangalore'],
      en: ['Courses tailored for Hindi and English speakers', 'All-India Esperanto Gatherings', 'Translations of Rabindranath Tagore and Gandhi', 'Library in Bangalore']
    }
  },
  {
    id: 'tajvana-esperanto-asocio',
    title: 'Tajvana Esperanto-Asocio (TEA)',
    url: 'https://esperanto.tw',
    displayUrl: 'esperanto.tw',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Tajvana Esperanto-Asocio',
    languages: ['zh', 'eo'],
    description: {
      eo: 'La nacia asocio en Tajpeo, organizanta kursojn en tradiciaj ĉinaj signoj, kulturajn prelegojn kaj la Tajvanan Kongreson.',
      es: 'La asociación en Taipéi, organizadora de cursos en caracteres chinos tradicionales, conferencias culturales y el Congreso Taiwanés.',
      en: 'The national association in Taipei, running courses with traditional Chinese characters, cultural lectures, and the Taiwanese Congress.'
    },
    tags: ['tajvano', 'tajpeo', 'tea', 'ĉina', 'taiwan', 'asia'],
    features: {
      eo: ['Kursoj en tradiciaj ĉinaj signoj', 'Ĉiujara Tajvana Esperanto-Kongreso', 'Klubo en Tajpeo kaj Tajnano', 'Kulturaj interŝanĝoj kun Japanio kaj Koreio'],
      es: ['Cursos elaborados con caracteres chinos tradicionales', 'Congreso Taiwanés de Esperanto anual', 'Clubes activos en Taipéi y Tainan', 'Intercambios culturales con Japón y Corea'],
      en: ['Courses with traditional Chinese characters', 'Annual Taiwanese Esperanto Congress', 'Active chapters in Taipei and Tainan', 'Cultural exchanges with Japan and Korea']
    }
  },
  {
    id: 'kostarika-esperanto-asocio',
    title: 'Kostarika Esperanto-Asocio (KEA)',
    url: 'https://esperanto-costarica.org',
    displayUrl: 'esperanto-costarica.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kostarika Esperanto-Asocio',
    languages: ['es', 'eo'],
    description: {
      eo: 'La nacia asocio en San-Joseo kaj Kostariko, lando de paco sen armeo, kunvenanta por ekologiaj projektoj kaj lingvokursoj.',
      es: 'La asociación nacional en San José de Costa Rica, país de paz sin ejército, centrada en proyectos medioambientales y cursos.',
      en: 'The national association in San José, Costa Rica, a peaceful nation without an army, focusing on eco-projects and language education.'
    },
    tags: ['kostariko', 'san-joseo', 'paco', 'ekologio', 'costa rica', 'centroamerica'],
    features: {
      eo: ['Projektoj ligantaj pacismon kaj ekologion', 'Renkontiĝoj en San-Joseo', 'Kursoj por universitataj studentoj', 'Turisma akompano en naciaj parkoj'],
      es: ['Proyectos que vinculan la cultura de paz y la ecología', 'Tertulias periódicas en San José', 'Cursos para estudiantes universitarios', 'Turismo ecológico en parques nacionales'],
      en: ['Initiatives linking culture of peace and ecology', 'Regular socials in San José', 'Classes for university students', 'Eco-tourism hospitality in national parks']
    }
  },
  {
    id: 'madagaskara-esperanto-unio',
    title: 'Madagaskara Esperanto-Unio (MEU)',
    url: 'https://esperanto-madagaskaro.org',
    displayUrl: 'esperanto-madagaskaro.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Madagaskara Esperanto-Unio',
    languages: ['mg', 'fr', 'eo'],
    description: {
      eo: 'La vigla insula asocio en Antananarivo, organizanta mezlernejajn klubojn tra Madagaskaro kaj gastiganta vojaĝantojn el la tuta mondo.',
      es: 'La activa federación insular en Antananarivo, con clubes en escuelas de Madagascar y gran dinamismo en el océano Índico.',
      en: 'The vibrant island association in Antananarivo, running secondary school clubs across Madagascar and hosting world travelers.'
    },
    tags: ['madagaskaro', 'antananarivo', 'meu', 'malagasa', 'madagascar', 'africa'],
    features: {
      eo: ['Dekoj da aktivaj lernejaj kluboj', 'Kursoj en la malagasa kaj franca lingvoj', 'Kulturaj kantoj en Esperanto', 'Partopreno en afrikaj kongresoj'],
      es: ['Decenas de clubes juveniles en centros educativos', 'Cursos en lengua malgache y francés', 'Música y coros tradicionales en esperanto', 'Participación en congresos africanos'],
      en: ['Dozens of active student clubs in schools', 'Courses in Malagasy and French', 'Traditional choral music in Esperanto', 'Active presence at African congresses']
    }
  },
  {
    id: 'konga-esperanto-asocio',
    title: 'Esperanto-Asocio de DR Kongo (Kinŝaso)',
    url: 'https://esperanto-rdc.org',
    displayUrl: 'esperanto-rdc.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Demokratia Konga Esperanto-Asocio',
    languages: ['fr', 'ln', 'eo'],
    description: {
      eo: 'La nacia asocio en Kinŝaso kaj Goma, kie miloj da gejunuloj lernas Esperanton en lernejoj kaj universitatoj por internacia komunikado.',
      es: 'La asociación nacional en Kinshasa y Goma, donde miles de jóvenes aprenden esperanto en escuelas y universidades.',
      en: 'The national association in Kinshasa and Goma, where thousands of young people learn Esperanto in schools and universities.'
    },
    tags: ['kongo', 'kinsaso', 'goma', 'afriko', 'rdc', 'congo'],
    features: {
      eo: ['Unu el la plej rapide kreskantaj komunumoj en Centra Afriko', 'Kursoj en lingala kaj franca', 'Muzikaj bandoj kantantaj en Esperanto', 'Humanitaraj edukprojektoj'],
      es: ['Una de las comunidades con mayor crecimiento de África Central', 'Cursos en lingala y francés', 'Bandas de música locales que cantan en esperanto', 'Proyectos educativos'],
      en: ['One of the fastest-growing communities in Central Africa', 'Classes taught in Lingala and French', 'Local music groups singing in Esperanto', 'Educational humanitarian initiatives']
    }
  },
  {
    id: 'paragvaja-esperanto-klubo',
    title: 'Paragvaja Esperanto-Klubo (Asunciono)',
    url: 'https://esperanto-paraguay.org',
    displayUrl: 'esperanto-paraguay.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Paragvaja Esperanto-Klubo',
    languages: ['es', 'gn', 'eo'],
    description: {
      eo: 'La klubo en Asunciono, esploranta la interagadon inter Esperanto kaj la gvarania lingvo (la oficiala indiĝena lingvo de Paragvajo).',
      es: 'El club en Asunción, que investiga los lazos de afinidad entre el esperanto y el guaraní (lengua indígena oficial de Paraguay).',
      en: 'The club in Asunción, exploring linguistic parallels between Esperanto and Guaraní (the official indigenous tongue of Paraguay).'
    },
    tags: ['paragvajo', 'asunciono', 'gvarania', 'guarani', 'paraguay'],
    features: {
      eo: ['Tradukoj de gvaraniaj legendoj kaj poemoj en Esperanton', 'Renkontiĝoj en Asunciono', 'Dulingva gvidilo (hispana-gvarania)', 'Kultura kunlaboro kun Argentino'],
      es: ['Traducción de leyendas y poesía guaraní al esperanto', 'Tertulias periódicas en Asunción', 'Guía comparativa bilingüe español-guaraní', 'Cooperación con el movimiento argentino'],
      en: ['Translations of Guaraní folklore and poetry into Esperanto', 'Regular socials in Asunción', 'Comparative linguistic notes with Guaraní', 'Close partnership with Argentine groups']
    }
  },
  {
    id: 'malta-esperanto-societo',
    title: 'Malta Esperanto-Societo (MES)',
    url: 'https://esperanto-malta.org',
    displayUrl: 'esperanto-malta.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Malta Esperanto-Societo',
    year: '1961-2024',
    languages: ['mt', 'en', 'eo'],
    description: {
      eo: 'La nacia societo en La-Valeto kaj Malto fondita en 1961 de Karmenu Mallia, eldoninto de la malta nacia eposo en Esperanto.',
      es: 'La sociedad nacional en La Valeta y Malta fundada en 1961 por Karmenu Mallia, traductora de la gran epopeya maltesa al esperanto.',
      en: 'The national society in Valletta and Malta founded in 1961 by Karmenu Mallia, translator of the Maltese national epic into Esperanto.'
    },
    tags: ['malto', 'la-valeto', 'karmenu mallia', 'mes', 'malta'],
    features: {
      eo: ['Tradukoj de la malta beletro kaj historio', 'Renkontiĝoj en La-Valeto', 'La bulteno Malta Stelo', 'Kultura ponto en la mezo de Mediteraneo'],
      es: ['Traducciones de clásicos de la literatura maltesa', 'Encuentros en La Valeta', 'Boletín informativo Malta Stelo', 'Puente cultural en el Mediterráneo'],
      en: ['Translations of Maltese literary classics', 'Meetups in Valletta', 'Periodical bulletin Malta Stelo', 'Cultural crossroads in the Mediterranean']
    }
  },
  {
    id: 'armena-esperanto-asocio',
    title: 'Armena Esperanto-Asocio (AEE)',
    url: 'https://esperanto-armenia.org',
    displayUrl: 'esperanto-armenia.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Armena Esperantista Asocio',
    languages: ['hy', 'eo'],
    description: {
      eo: 'La nacia asocio en Erevano, eldonanto de bultenoj kaj tradukanto de antikva armena poezio kaj la epopeo David de Sasun.',
      es: 'La asociación nacional en Ereván, editora de boletines y traductora de poesía armenia milenaria y la epopeya David de Sasún.',
      en: 'The national association in Yerevan, publisher of newsletters and translator of ancient Armenian poetry and the epic David of Sasun.'
    },
    tags: ['armenio', 'erevano', 'kaŭkazo', 'poezio', 'armenia'],
    features: {
      eo: ['Traduko de la armena nacia eposo David de Sasun', 'Renkontiĝoj en Erevano', 'Kursoj por armenaj studentoj', 'Historio de esperantistoj en Kaŭkazio'],
      es: ['Traducción al esperanto de la epopeya nacional David de Sasún', 'Tertulias periódicas en Ereván', 'Cursos para universitarios', 'Historia del movimiento en el Cáucaso'],
      en: ['Translation of the national epic David of Sasun into Esperanto', 'Meetups in Yerevan', 'Classes for Armenian university students', 'Caucasus regional heritage']
    }
  },
  {
    id: 'kartvela-esperanto-asocio',
    title: 'Kartvela Esperanto-Asocio (Tbiliso)',
    url: 'https://esperanto-georgia.org',
    displayUrl: 'esperanto-georgia.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kartvela Esperanto-Asocio',
    languages: ['ka', 'eo'],
    description: {
      eo: 'La historia asocio en Tbiliso, eldoninto de la kartvela nacia majstroverko "La Kavaliro en Panterfelo" de Ŝota Rustaveli en Esperanto.',
      es: 'La asociación histórica en Tiflis, traductora de la obra cumbre de la literatura georgiana "El caballero en la piel de pantera" de Shota Rustaveli.',
      en: 'The historic association in Tbilisi, translator of the Georgian national masterpiece "The Knight in the Panther\'s Skin" by Shota Rustaveli.'
    },
    tags: ['kartvelio', 'tbiliso', 'rustaveli', 'kaŭkazo', 'georgia'],
    features: {
      eo: ['Traduko de la majstroverko de Ŝota Rustaveli', 'Klubo en Tbiliso kunvenanta regule', 'Kursoj por kartveloj', 'Kaŭkazaj Esperanto-Tagoj'],
      es: ['Traducción íntegra de la obra inmortal de Shota Rustaveli', 'Club en Tiflis con reuniones periódicas', 'Cursos para estudiantes georgianos', 'Jornadas del Cáucaso'],
      en: ['Translation of Shota Rustaveli\'s immortal epic', 'Club in Tbilisi with regular gatherings', 'Classes for Georgian students', 'Caucasus regional retreats']
    }
  },
  {
    id: 'kazaha-esperanto-asocio',
    title: 'Kazaĥa Esperanto-Asocio (Almato)',
    url: 'https://esperanto-kazakhstan.org',
    displayUrl: 'esperanto-kazakhstan.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kazaĥa Esperanto-Asocio',
    languages: ['kk', 'ru', 'eo'],
    description: {
      eo: 'La asocio en Almato kaj Astano, hejmlando de famaj kantistoj (Ĵomart kaj Nataŝa) kaj tradukistoj de kazaĥa stepa literaturo.',
      es: 'La asociación en Almatý y Astaná, cuna de los célebres músicos Ĵomart y Nataŝa y traductora de la lírica de las estepas kazajas.',
      en: 'The association in Almaty and Astana, homeland of famed balladeers Ĵomart and Nataŝa and translator of Kazakh nomadic epics.'
    },
    tags: ['kazaĥio', 'almato', 'astano', 'centra azio', 'kazajistan'],
    features: {
      eo: ['Cirklo de artistoj kaj tradukistoj', 'Kursoj en la kazaĥa kaj rusa', 'Renkontiĝoj en Almato', 'Tradukoj de Abaj Kunanbajev'],
      es: ['Círculo de creadores y traductores', 'Cursos en kazajo y ruso', 'Encuentros en Almatý', 'Traducción de los versos de Abay Kunanbayev'],
      en: ['Circle of creators and translators', 'Classes in Kazakh and Russian', 'Social meetups in Almaty', 'Translations of poet Abay Kunanbayev']
    }
  },
  {
    id: 'mongola-esperanto-societo',
    title: 'Mongola Esperanto-Societo (Ulanbatoro)',
    url: 'https://esperanto-mongolia.org',
    displayUrl: 'esperanto-mongolia.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Mongola Esperanto-Societo',
    languages: ['mn', 'eo'],
    description: {
      eo: 'La nacia societo en Ulanbatoro, organizanta mongolajn jurto-tendarojn, kursojn por universitataj studentoj kaj tradukon de nomada folkloro.',
      es: 'La sociedad nacional en Ulán Bator, organizadora de campamentos en yurtas mongolas, cursos universitarios y traducción de folclore nómada.',
      en: 'The national society in Ulaanbaatar, organizing yurt campouts on the steppe, university courses, and translations of nomadic folklore.'
    },
    tags: ['mongolio', 'ulanbatoro', 'jurtoj', 'stepo', 'mongolia'],
    features: {
      eo: ['Somera jurto-renkontiĝo en la mongola stepo', 'Sidejo en Ulanbatoro', 'Kursoj en la mongola lingvo', 'Rikega gastamo por vojaĝantoj'],
      es: ['Encuentros estivales en yurtas tradicionales en las estepas', 'Sede en Ulán Bator', 'Cursos en lengua mongola', 'Hospitalidad extraordinaria con viajeros'],
      en: ['Summer yurt gatherings on the open Mongolian steppe', 'Headquarters in Ulaanbaatar', 'Courses in the Mongolian language', 'Extraordinary hospitality for visitors']
    }
  },

  // ========================================================
  // 7. KROMAJ FAKAJ ASOCIOJ KAJ TERMINAROJ (SPECIALIZED FIELDS)
  // ========================================================
  {
    id: 'los-angeles-esperanto-club',
    title: 'Los Angeles Esperanto Club (Kalifornio)',
    url: 'https://www.meetup.com/esperanto-la/',
    displayUrl: 'meetup.com/esperanto-la',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Los Angeles Esperanto Club',
    languages: ['en', 'es', 'eo'],
    description: {
      eo: 'La vigla klubo en Los-Anĝeleso kaj Holivudo: renkontiĝoj en Santa Monica, Pasadena kaj Hollywood kun filmistoj, muzikistoj kaj studentoj.',
      es: 'El activo club de Los Ángeles y Hollywood: tertulias en Santa Mónica, Pasadena y Hollywood con cineastas, músicos y estudiantes.',
      en: 'The lively club in Los Angeles and Hollywood: meetups in Santa Monica, Pasadena, and Hollywood with filmmakers, musicians, and students.'
    },
    tags: ['los angeles', 'holivudo', 'kalifornio', 'kinejo', 'estados unidos'],
    features: {
      eo: ['Regulaj renkontiĝoj en Santa Monica kaj Pasadena', 'Partopreno de holivudaj filmistoj kaj aktoroj', 'Dulingvaj kunvenoj (angla, hispana, Esperanto)', 'Senpaga aliro'],
      es: ['Reuniones en Santa Mónica, Pasadena y West Hollywood', 'Participación de profesionales del cine y la música', 'Encuentros trilingües', 'Acceso gratuito vía Meetup'],
      en: ['Regular socials in Santa Monica and Pasadena', 'Participation by film and music industry creatives', 'Trilingual meetups', 'Free via Meetup']
    }
  },
  {
    id: 'aeh-handikapuloj',
    title: 'Asocio de Esperantistoj Handikapuloj (AEH)',
    url: 'https://aeh.esperanto.org',
    displayUrl: 'aeh.esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Asocio de Esperantistoj Handikapuloj',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio dediĉita al alirebleco, inkluziveco kaj reciproka helpo por esperantistoj kun fizikaj, vidaj aŭ aŭdaj malkapabloj.',
      es: 'Asociación especializada en accesibilidad universal, inclusión y apoyo mutuo para personas con discapacidad visual, auditiva o motora.',
      en: 'Specialized association dedicated to universal accessibility, inclusion, and mutual assistance for speakers with physical or sensory disabilities.'
    },
    tags: ['handikapo', 'alirebleco', 'inkluzivo', 'brajlo', 'solidareco', 'accesibilidad', 'inclusion'],
    features: {
      eo: ['La bulteno Informa Bulteno de AEH', 'Materialoj en brajla skribo kaj sonlibroj', 'Konsiloj pri alirebleco dum Universalaj Kongresoj', 'Internacia solidara reto'],
      es: ['Boletín informativo de AEH', 'Materiales en braille y audiolibros adaptados', 'Asesoría de accesibilidad para la organización de congresos', 'Red de apoyo mutuo'],
      en: ['AEH informative bulletin', 'Braille editions and accessible audiobooks', 'Accessibility consulting for world congress venues', 'Global mutual-aid network']
    }
  },
  {
    id: 'policanoj-ipa-esperanto',
    title: 'Policanoj kaj Esperanto (IPA Esperanto-Sekcio)',
    url: 'https://ipa-esperanto.org',
    displayUrl: 'ipa-esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Internacia Polica Asocio (IPA)',
    languages: ['eo'],
    description: {
      eo: 'La oficiala faka sekcio de la Internacia Polica Asocio (IPA), kies devizo estas "Servo per Amikeco", uzanta Esperanton por internacia polica amikeco.',
      es: 'La sección oficial en esperanto de la International Police Association (IPA), cuyo lema "Servicio por la Amistad" fomenta la confraternidad policial.',
      en: 'The official Esperanto section of the International Police Association (IPA), whose motto "Service Through Friendship" fosters global police camaraderie.'
    },
    tags: ['polico', 'ipa', 'amikeco', 'sekureco', 'policia', 'internacional'],
    features: {
      eo: ['Faka polica terminaro en Esperanto', 'Renkontiĝoj inter policistoj el dekoj da landoj', 'La bulteno Polica Revuo', 'Oficiala rekono ene de IPA'],
      es: ['Vocabulario policial técnico en esperanto', 'Encuentros de confraternidad entre agentes de múltiples países', 'Publicación periódica Polica Revuo', 'Reconocimiento oficial dentro de la IPA'],
      en: ['Technical police terminology in Esperanto', 'Fellowship gatherings of officers across nations', 'Periodical Polica Revuo', 'Official standing within the IPA']
    }
  },
  {
    id: 'tole-ortodoksuloj',
    title: 'Tutmonda Ortodoksa Ligo Esperantista (TOLE)',
    url: 'https://tole.esperanto.org',
    displayUrl: 'tole.esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Tutmonda Ortodoksa Ligo Esperantista',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio kuniganta ortodoksajn kristanojn, tradukanta la liturgion de Johano Krizostomo, himnojn kaj ikon-teologion en Esperanton.',
      es: 'Asociación que reúne a cristianos ortodoxos, traductora de la Divina Liturgia de San Juan Crisóstomo, himnos e iconografía sacra al esperanto.',
      en: 'Association uniting Orthodox Christians, translating the Divine Liturgy of St. John Chrysostom, Byzantine hymns, and icon theology into Esperanto.'
    },
    tags: ['ortodoksa', 'liturgio', 'bizanca', 'kristanismo', 'ortodoxo'],
    features: {
      eo: ['Plena teksto de la Dia Liturgio de Sankta Johano Krizostomo en Esperanto', 'Tradukoj de bizancaj himnoj kaj preĝoj', 'Prelegoj pri ortodoksa teologio', 'Partopreno en ekumenaj kongresoj'],
      es: ['Texto íntegro de la Divina Liturgia en esperanto', 'Traducción de himnos bizantinos y plegarias patrísticas', 'Conferencias sobre teología ortodoxa', 'Presencia en congresos ecuménicos'],
      en: ['Full text of the Divine Liturgy in Esperanto', 'Translations of Byzantine hymnology and patristic prayers', 'Lectures on Eastern Christian theology', 'Participation in ecumenical conferences']
    }
  },
  {
    id: 'entomologia-terminaro',
    title: 'Entomologia Vortaro (Insektoj en Esperanto)',
    url: 'https://eventoj.hu/steb/zoologio/entomologio.htm',
    displayUrl: 'eventoj.hu/entomologio',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Scienca Esperanto-Fako',
    languages: ['eo', 'la'],
    description: {
      eo: 'Scienca terminaro pri entomologio: papilioj, koleopteroj, abeloj, formikoj kaj insektaj anatomio kaj metamorfozo kun latinaj ekvivalentoj.',
      es: 'Glosario entomológico especializado: mariposas, escarabajos, abejas, hormigas, anatomía del exoesqueleto y metamorfosis con nombres latinos.',
      en: 'Specialized entomological glossary covering butterflies, beetles, bees, ants, exoskeleton anatomy, and metamorphosis with Latin binomials.'
    },
    tags: ['entomologio', 'insektoj', 'papilioj', 'abeloj', 'scienco', 'zoologia', 'insectos'],
    features: {
      eo: ['Latinaj kaj esperantaj nomoj de ĉiuj insektaj ordoj', 'Terminoj pri anatomio (antenoj, flugiloj, metamorfozo)', 'Gvidilo pri abelbredado kaj polenado', 'Libere konsultebla'],
      es: ['Nombres científicos y en esperanto de órdenes de insectos', 'Morfología externa y fases metamórficas', 'Apicultura y biología de polinizadores', 'Acceso libre'],
      en: ['Scientific Latin and Esperanto binomials of insect orders', 'Anatomical terms (antennae, wing venation, metamorphosis)', 'Beekeeping and pollinator ecology', 'Free online access']
    }
  },
  {
    id: 'geodezia-terminaro',
    title: 'Geodezia kaj Kartografia Terminaro',
    url: 'https://eventoj.hu/steb/geodezio/geodezia-vortaro.htm',
    displayUrl: 'eventoj.hu/geodezio',
    category: 'projects',
    level: 'C1',
    isFree: true,
    format: 'tool',
    author: 'Geodezia Esperanto-Fakgrupo',
    languages: ['eo'],
    description: {
      eo: 'Faka vortaro pri mezurado de la tero, triangulado, satelita poziciigo (GPS, Galileo), mapaj projekcioj kaj GIS-geoinformaj sistemoj.',
      es: 'Glosario de topografía, geodesia, triangulación, posicionamiento por satélite (GPS, Galileo), proyecciones cartográficas y sistemas SIG.',
      en: 'Technical glossary covering land surveying, geodesy, triangulation, satellite positioning (GPS, Galileo), map projections, and GIS systems.'
    },
    tags: ['geodezio', 'kartografio', 'topografio', 'gps', 'gis', 'mapas', 'topografia'],
    features: {
      eo: ['Precizaj matematikaj difinoj de geodeziaj nocioj', 'Terminoj pri satelita navigado kaj koordinataj sistemoj', 'Mapaj projekcioj (Mercator k.a.)', 'Faka referenco por inĝenieroj'],
      es: ['Definiciones matemáticas rigurosas de conceptos geodésicos', 'Sistemas de coordenadas y posicionamiento global', 'Proyecciones cartográficas cilíndricas y cónicas', 'Referencia técnica para ingenieros'],
      en: ['Rigorous mathematical definitions of geodetic concepts', 'Coordinate reference systems and satellite positioning', 'Cartographic projections (Mercator, conical)', 'Engineering reference manual']
    }
  },
  {
    id: 'kineja-terminaro',
    title: 'Kineja kaj Filmarta Terminaro',
    url: 'https://eventoj.hu/steb/kinejo/kineja-terminaro.htm',
    displayUrl: 'eventoj.hu/kinejo',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'tool',
    author: 'Kin-Amantoj de Esperanto',
    languages: ['eo'],
    description: {
      eo: 'Gvidilo pri filmfarado, reĝisorado, kameraaj movoj, muntado, scenaro, lumigo kaj kineja teorio en pura Esperanto.',
      es: 'Glosario técnico sobre cinematografía, dirección de cine, planos de cámara, montaje, guion, iluminación y teoría fílmica.',
      en: 'Technical glossary on cinematography, film directing, camera movements, editing cuts, screenwriting, lighting, and film theory.'
    },
    tags: ['kinejo', 'filmoj', 'reĝisoro', 'kamerao', 'muntado', 'cine', 'audiovisual'],
    features: {
      eo: ['Terminoj por kameramovoj (panoramo, travelo, zomo)', 'Munta faka vortprovizo (eltondo, transiro)', 'Filmĝenroj kaj scenara strukturo', 'Utila por krei filmojn en Esperanto'],
      es: ['Tipos de planos y movimientos de cámara (paneo, travelling, plano secuencia)', 'Vocabulario de edición y montaje', 'Estructura de guion cinematográfico', 'Herramienta para cineastas independientes'],
      en: ['Camera movements and shot types (pan, tracking shot, zoom)', 'Editing and post-production vocabulary', 'Screenplay formatting and narrative beats', 'Resource for indie Esperanto filmmakers']
    }
  },
  {
    id: 'vina-enologia-terminaro',
    title: 'Enologia kaj Vina Terminaro',
    url: 'https://eventoj.hu/steb/enologio/vina-vortaro.htm',
    displayUrl: 'eventoj.hu/vino',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Vinkultura Faka Rondo',
    languages: ['eo', 'fr', 'es'],
    description: {
      eo: 'Faka gvidilo pri vinkultivado, fermentado, gustumado, vitospecioj kaj vinregionoj el la tuta mondo por vinamantoj kaj somelieroj.',
      es: 'Glosario enológico sobre viticultura, fermentación, cata de vinos, variedades de uva y denominaciones de origen del mundo.',
      en: 'Enological and viticultural glossary covering winemaking, fermentation, wine tasting notes, grape varietals, and wine regions.'
    },
    tags: ['vino', 'enologio', 'gustumado', 'vitoj', 'vino', 'enologia', 'gastronomia'],
    features: {
      eo: ['Fakaj terminoj por aroma kaj gustuma analizo (taninoj, acideco, bukedo)', 'Priskribo de vitospecioj (Cabernet, Merlot, Tempranillo)', 'Terminoj pri barela maturigo kaj vinigado', 'Leksiko por internaciaj vintestadoj'],
      es: ['Vocabulario descriptivo de cata (taninos, acidez, retrogusto, bouquet)', 'Variedades de vid internacionales', 'Procesos de crianza en barrica y fermentación', 'Ideal para catas internacionales guiadas'],
      en: ['Sensory tasting vocabulary (tannins, acidity, finish, bouquet)', 'Profiles of international grape cultivars', 'Barrel aging and vinification terminology', 'Perfect for guided international wine tastings']
    }
  },
  {
    id: 'tipografia-terminaro',
    title: 'Tipografia kaj Preseja Terminaro',
    url: 'https://eventoj.hu/steb/tipografio/tipografia-vortaro.htm',
    displayUrl: 'eventoj.hu/tipografio',
    category: 'tools',
    level: 'B2',
    isFree: true,
    format: 'tool',
    author: 'Tipografia Esperanto-Fako',
    languages: ['eo'],
    description: {
      eo: 'Gvidilo pri tipoj, tiparoj (serifaj, senserifaj), interpunkcio, paĝoraranĝo, librobindado kaj historio de la presarto.',
      es: 'Vocabulario sobre tipografía, familias de fuentes, interletraje, maquetación editorial, encuadernación e imprenta.',
      en: 'Vocabulary covering typography, font families (serif, sans-serif), kerning, editorial book layout, binding, and printing history.'
    },
    tags: ['tipografio', 'tiparoj', 'libroj', 'paĝaranĝo', 'presejo', 'tipografia', 'diseño editorial'],
    features: {
      eo: ['Klarigoj pri tiparaj familioj kaj kursivo', 'Teknikaj terminoj de libro-enpaĝigo kaj marĝenoj', 'Bindaj teknikoj kaj papertipoj', 'Utila por eldonejoj kaj verkistoj'],
      es: ['Clasificación tipográfica (serifa, palo seco, cursivas)', 'Maquetación editorial, sangrías y retículas', 'Tipos de papel y métodos de encuadernación', 'Herramienta de referencia para editoriales'],
      en: ['Typeface taxonomy (serif, sans-serif, italics)', 'Editorial layout, leading, and baseline grids', 'Paper stocks and binding techniques', 'Reference guide for publishers and authors']
    }
  },
  {
    id: 'reddit-esperanto-komunumo',
    title: 'Reddit r/Esperanto Komunumo',
    url: 'https://www.reddit.com/r/esperanto/',
    displayUrl: 'reddit.com/r/esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Reddit Esperanto Komunumo',
    languages: ['eo', 'en'],
    description: {
      eo: 'La plej granda diskutejo pri Esperanto en Reddit kun pli ol 30 000 membroj: dividu memojn, demandu pri gramatiko kaj diskutu novaĵojn.',
      es: 'La mayor comunidad de esperanto en Reddit con más de 30.000 suscriptores: memes, consultas gramaticales, debate y recursos diarios.',
      en: 'The largest Esperanto subreddit with over 30,000 subscribers: sharing memes, answering grammar questions, and debating community news.'
    },
    tags: ['reddit', 'forumo', 'komunumo', 'demandoj', 'memoj', 'foro', 'social'],
    features: {
      eo: ['Pli ol 30 000 membroj el la tuta mondo', 'Semajnaj fadenoj por komencantoj', 'Aktivaj diskutoj pri movado kaj lingvo', 'Divido de artikoloj kaj videoj'],
      es: ['Más de 30.000 usuarios activos de todos los países', 'Hilos semanales de preguntas para principiantes', 'Debates de actualidad cultural y lingüística', 'Publicación diaria de contenidos y enlaces'],
      en: ['Over 30,000 global community members', 'Weekly beginner question threads', 'Discussions on language evolution and culture', 'Daily links, articles, and memes']
    }
  },
  {
    id: 'tatoeba-audio-vocoj',
    title: 'Tatoeba Audio - Voĉregistraĵoj de Frazoj',
    url: 'https://tatoeba.org/eo/audio/index/epo',
    displayUrl: 'tatoeba.org/audio/epo',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Tatoeba Projekto',
    languages: ['eo'],
    description: {
      eo: 'Dekoj da miloj da voĉregistritaj esperantlingvaj frazoj prononcitaj de spertaj parolantoj el la tuta mondo por ekzerci aŭskultan komprenon.',
      es: 'Decenas de miles de frases en esperanto con grabaciones de voz reales de hablantes nativos y fluidos para entrenar el oído.',
      en: 'Tens of thousands of spoken Esperanto sentences recorded by fluent speakers worldwide, perfect for ear training and listening practice.'
    },
    tags: ['tatoeba', 'audio', 'prononco', 'voĉoj', 'frazoj', 'pronunciacion', 'audio'],
    features: {
      eo: ['Dekoj da miloj da aŭtentaj sonregistraĵoj', 'Senpage elŝuteblaj en MP3-formato', 'Kunligitaj kun paralelaj tradukoj en centoj da lingvoj', 'Malferma licenco Creative Commons'],
      es: ['Decenas de miles de audios grabados en alta fidelidad', 'Descargables libremente en formato MP3', 'Vinculados a traducciones en cientos de idiomas', 'Licencia abierta'],
      en: ['Tens of thousands of high quality authentic recordings', 'Free direct MP3 downloads', 'Paired with translations in hundreds of languages', 'Open Creative Commons licensing']
    }
  },
  {
    id: 'lingvomapo-europo',
    title: 'Eŭropa Lingvomapo kaj Esperanto (Lingvo.info)',
    url: 'https://lingvo.info/eo/babylon/european_languages',
    displayUrl: 'lingvo.info/lingvomapo',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'E@I & Eŭropa Komisiono',
    languages: ['eo', 'es', 'en', 'fr', 'de'],
    description: {
      eo: 'Interaga gvidilo pri la lingvaj familioj de Eŭropo, montranta kiel Esperanto funkcias kiel neŭtrala ponto inter latinidaj, ĝermanaj kaj slavaj lingvoj.',
      es: 'Mapa interactivo sobre las familias lingüísticas de Europa, ilustrando cómo el esperanto actúa como puente neutral entre lenguas romances, germánicas y eslavas.',
      en: 'An interactive guide to European language families, demonstrating how Esperanto bridges Romance, Germanic, and Slavic language branches.'
    },
    tags: ['lingvomapo', 'europo', 'lingvofamilioj', 'interaga', 'e@i', 'mapa lingüístico', 'europa'],
    features: {
      eo: ['Interaga mapa esplorado de lingvaj familioj', 'Klarigoj pri radik-deveno en Esperanto', 'Subtenata de la Eŭropa Unio', 'Edukaj infografioj por lernejoj'],
      es: ['Exploración cartográfica interactiva de familias lingüísticas', 'Etimología y procedencia de las raíces del esperanto', 'Proyecto cofinanciado por la Unión Europea', 'Infografías didácticas'],
      en: ['Interactive cartographic exploration of language families', 'Demonstrates etymological origins of Esperanto roots', 'Supported by the European Commission', 'Educational infographics for schools']
    }
  }
];

