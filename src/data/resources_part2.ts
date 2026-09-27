import { EsperantoResource } from '../types';

export const PART2_RESOURCES: EsperantoResource[] = [
  // ========================================================
  // 1. NACIAJ & REGIONAJ ASOCIOJ (NATIONAL & REGIONAL BODIES)
  // ========================================================
  {
    id: 'kanada-esperanto-asocio',
    title: 'Kanada Esperanto-Asocio (KEA)',
    url: 'https://esperanto.ca',
    displayUrl: 'esperanto.ca',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kanada Esperanto-Asocio',
    year: '1958-2024',
    languages: ['en', 'fr', 'eo'],
    description: {
      eo: 'La nacia asocio en Kanado, eldonanto de la bulteno Lumo kaj organizanto de naciaj kongresoj en Montrealo, Toronto kaj Vankuvero.',
      es: 'La asociación nacional de Canadá, editora del boletín Lumo y organizadora de congresos nacionales en Montreal, Toronto y Vancouver.',
      en: 'The national association in Canada, publisher of the bulletin Lumo and organizer of national congresses in Montreal, Toronto, and Vancouver.'
    },
    tags: ['kanado', 'montrealo', 'toronto', 'vankuvero', 'lumo', 'asocio', 'canada'],
    features: {
      eo: ['Trilingva oficiala retejo (angla, franca, Esperanto)', 'Bulteno Lumo eldonata regule', 'Lokaj grupoj tra ĉiuj kanadaj provincoj', 'Stipendioj por junuloj'],
      es: ['Web oficial trilingüe (inglés, francés y esperanto)', 'Boletín Lumo con artículos culturales', 'Grupos locales en las principales provincias', 'Becas de viaje para jóvenes'],
      en: ['Trilingual official portal (English, French, Esperanto)', 'Journal Lumo published regularly', 'Local chapters across Canadian provinces', 'Travel scholarships for youth']
    }
  },
  {
    id: 'irlanda-esperanto-asocio',
    title: 'Irlanda Esperanto-Asocio (Esperanto-Asocio de Irlando)',
    url: 'https://esperanto.ie',
    displayUrl: 'esperanto.ie',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Asocio de Irlando',
    languages: ['en', 'ga', 'eo'],
    description: {
      eo: 'La nacia asocio en Dublino kaj Irlando, organizanta la Irlandan Esperanto-Kongreson kaj retajn kursojn por gelernantoj.',
      es: 'La asociación nacional en Dublín e Irlanda, organizadora del Congreso Irlandés y cursos virtuales para estudiantes.',
      en: 'The national association in Dublin and Ireland, organizers of the Irish Esperanto Congress and online courses for learners.'
    },
    tags: ['irlando', 'dublino', 'gaeilge', 'asocio', 'irlanda'],
    features: {
      eo: ['Regulaj renkontiĝoj en Dublino', 'Kursoj por komencantoj', 'Informoj en la irlanda lingvo (Gaeilge)', 'Ĉiujara Irlanda Kongreso'],
      es: ['Reuniones periódicas en Dublín', 'Cursos de iniciación para novatos', 'Materiales en gaélico irlandés (Gaeilge)', 'Congreso Irlandés anual'],
      en: ['Regular Dublin meetups', 'Introductory courses for beginners', 'Information in Irish (Gaeilge)', 'Annual Irish Congress']
    }
  },
  {
    id: 'skota-esperanto-asocio',
    title: 'Skota Esperanto-Federacio',
    url: 'https://esperanto-scotland.org.uk',
    displayUrl: 'esperanto-scotland.org.uk',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Scottish Esperanto Federation',
    year: '1906-2024',
    languages: ['en', 'eo'],
    description: {
      eo: 'Historia federacio en Edinburgo kaj Glasgovo fondita en 1906, eldonanto de la bulteno Esperanto en Skotlando.',
      es: 'Histórica federación en Edimburgo y Glasgow fundada en 1906, editora del boletín Esperanto en Skotlando.',
      en: 'Historic federation in Edinburgh and Glasgow founded in 1906, publisher of the journal Esperanto in Scotland.'
    },
    tags: ['skotlando', 'edinburgo', 'glasgovo', 'asocio', 'escocia'],
    features: {
      eo: ['Pli ol 110 jaroj da historio en Skotlando', 'La revuo Esperanto en Skotlando', 'Ĉiujara Skota Esperanto-Kongreso', 'Lokaj kluboj en Glasgovo kaj Edinburgo'],
      es: ['Más de 110 años de historia en Escocia', 'Revista histórica Esperanto en Skotlando', 'Congreso Escocés de Esperanto anual', 'Clubes activos en Glasgow y Edimburgo'],
      en: ['Over 110 years of Scottish heritage', 'Journal Esperanto in Scotland', 'Annual Scottish Congress', 'Active chapters in Glasgow and Edinburgh']
    }
  },
  {
    id: 'finna-esperanto-asocio',
    title: 'Esperanto-Asocio de Finnlando (EAF)',
    url: 'https://esperanto.fi',
    displayUrl: 'esperanto.fi',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Asocio de Finnlando',
    year: '1907-2024',
    languages: ['fi', 'sv', 'eo'],
    description: {
      eo: 'La nacia asocio en Helsinko fondita en 1907, eldonanto de la revuo Esperantolehti kaj organizanto de someraj tagoj en Finnlando.',
      es: 'La asociación nacional en Helsinki fundada en 1907, editora de la revista Esperantolehti y anfitriona de encuentros nórdicos.',
      en: 'The national association in Helsinki founded in 1907, publisher of the magazine Esperantolehti and host of Nordic gatherings.'
    },
    tags: ['finnlando', 'helsinko', 'eaf', 'esperantolehti', 'finlandia'],
    features: {
      eo: ['La revuo Esperantolehti ekde 1907', 'Sidejo en Helsinko kun faka biblioteko', 'Someraj tagoj en la finna lagregiono', 'Kursoj por finnlingvanoj'],
      es: ['Revista histórica Esperantolehti desde 1907', 'Sede en Helsinki con biblioteca especializada', 'Encuentros de verano en los lagos finlandeses', 'Cursos adaptados para hablantes de finés'],
      en: ['Historic journal Esperantolehti published since 1907', 'Headquarters in Helsinki with reference library', 'Summer retreats in the Finnish lake district', 'Courses tailored for Finnish speakers']
    }
  },
  {
    id: 'sveda-esperanto-federacio',
    title: 'Sveda Esperanto-Federacio (SEF)',
    url: 'https://esperanto.se',
    displayUrl: 'esperanto.se',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Sveda Esperanto-Federacio',
    year: '1906-2024',
    languages: ['sv', 'eo'],
    description: {
      eo: 'La nacia federacio en Stokholmo fondita en 1906, eldonanto de La Espero kaj motoro de multaj kulturaj kaj muzikaj projektoj en Skandinavio.',
      es: 'La federación nacional en Estocolmo fundada en 1906, editora de La Espero y promotora de destacados proyectos musicales escandinavos.',
      en: 'The national federation in Stockholm founded in 1906, publisher of La Espero and driver of prominent Scandinavian cultural and music projects.'
    },
    tags: ['svedio', 'stokholmo', 'sef', 'la espero', 'suecia'],
    features: {
      eo: ['La revuo La Espero ekde 1913', 'Hejmo de famaj muzikgrupoj (Persone, LPG)', 'Kluboj en Stokholmo, Gotenburgo kaj Malmo', 'Ĉiujara Sveda Kongreso'],
      es: ['Revista periódica La Espero desde 1913', 'Cuna de célebres bandas de rock (Persone, LPG)', 'Clubes en Estocolmo, Gotemburgo y Malmö', 'Congreso Sueco anual'],
      en: ['Periodical La Espero published since 1913', 'Birthplace of iconic rock bands (Persone, LPG)', 'Local chapters in Stockholm, Gothenburg, and Malmö', 'Annual Swedish Congress']
    }
  },
  {
    id: 'norvega-esperanto-ligo',
    title: 'Norvega Esperanto-Ligo (NEL)',
    url: 'https://esperanto.no',
    displayUrl: 'esperanto.no',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Norvega Esperanto-Ligo',
    year: '1911-2024',
    languages: ['no', 'eo'],
    description: {
      eo: 'La nacia asocio en Oslo fondita en 1911, eldonanto de la gazeto Norvega Esperantisto kaj organizanto de naciaj kaj nordiaj renkontiĝoj.',
      es: 'La asociación nacional en Oslo fundada en 1911, editora del periódico Norvega Esperantisto y promotora de encuentros en Noruega.',
      en: 'The national association in Oslo founded in 1911, publisher of Norvega Esperantisto and organizer of national and Nordic gatherings.'
    },
    tags: ['norvegio', 'oslo', 'nel', 'norvega esperantisto', 'noruega'],
    features: {
      eo: ['La gazeto Norvega Esperantisto', 'Sidejo kaj klubo en Oslo', 'Nordiaj Esperanto-Kongresoj', 'Kursoj kaj prelegoj'],
      es: ['Publicación periódica Norvega Esperantisto', 'Sede y club en Oslo', 'Congresos Nórdicos de Esperanto', 'Cursos y charlas culturales'],
      en: ['Periodical Norvega Esperantisto', 'Oslo headquarters and club', 'Nordic Esperanto Congresses', 'Language courses and cultural talks']
    }
  },
  {
    id: 'dana-esperanto-asocio',
    title: 'Dana Esperanto-Asocio (DEA)',
    url: 'https://esperanto.dk',
    displayUrl: 'esperanto.dk',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Dansk Esperanto-Forbund (DEA)',
    year: '1908-2024',
    languages: ['da', 'eo'],
    description: {
      eo: 'La nacia federacio en Kopenhago fondita en 1908, kunveniganta danajn esperantistojn kaj eldonanta la revuon Esperanto Nyt.',
      es: 'La federación nacional en Copenhague fundada en 1908, que reúne a hablantes daneses y publica la revista Esperanto Nyt.',
      en: 'The national federation in Copenhagen founded in 1908, bringing together Danish speakers and publishing the magazine Esperanto Nyt.'
    },
    tags: ['danio', 'kopenhago', 'dea', 'esperanto nyt', 'dinamarca'],
    features: {
      eo: ['La revuo Esperanto Nyt', 'Kopenhaga Esperanto-Klubo kun semajnaj renkontiĝoj', 'Dana Esperanto-Kongreso', 'Biblioteko en Kopenhago'],
      es: ['Revista periódica Esperanto Nyt', 'Club de Copenhague con tertulias semanales', 'Congreso Danés anual', 'Biblioteca propia en Copenhague'],
      en: ['Periodical Esperanto Nyt', 'Copenhagen club with weekly meetups', 'Annual Danish Congress', 'Library collection in Copenhagen']
    }
  },
  {
    id: 'belga-esperanto-federacio',
    title: 'Belga Esperanto-Federacio (BEF)',
    url: 'https://esperanto.be',
    displayUrl: 'esperanto.be',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Belga Esperanto-Federacio',
    languages: ['nl', 'fr', 'eo'],
    description: {
      eo: 'La nacia tegmenta organizo en Bruselo kaj Belgio kuniganta flandrajn kaj valonajn esperantistojn.',
      es: 'La federación estatal en Bruselas y Bélgica que coordina a las asociaciones flamencas y valonas.',
      en: 'The umbrella national body in Brussels and Belgium uniting Flemish and Walloon Esperanto organizations.'
    },
    tags: ['belgio', 'bruselo', 'bef', 'flandrio', 'valonio', 'belgica'],
    features: {
      eo: ['Kunordigo de Flandra kaj Valona Esperanto-movadoj', 'Sidejo kaj renkontiĝejo en Bruselo', 'Partopreno en EU-kulturaj projektoj', 'Ĉiujara Belga Kongreso'],
      es: ['Coordinación de los movimientos flamenco y valón', 'Sede y lugar de encuentro en Bruselas', 'Participación en iniciativas culturales europeas', 'Congreso Belga anual'],
      en: ['Bridges Flemish and Walloon regional movements', 'Headquarters and meeting space in Brussels', 'EU cultural project involvement', 'Annual Belgian Congress']
    }
  },
  {
    id: 'portugala-esperanto-asocio',
    title: 'Portugala Esperanto-Asocio (PEA)',
    url: 'https://esperanto.pt',
    displayUrl: 'esperanto.pt',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Associação Portuguesa de Esperanto',
    year: '1972-2024',
    languages: ['pt', 'eo'],
    description: {
      eo: 'La nacia asocio en Lisbono, eldonanto de Portugala Esperanto-Revuo kaj organizanto de la Portugala Kongreso de Esperanto.',
      es: 'La asociación nacional en Lisboa, editora de Portugala Esperanto-Revuo y organizadora del Congreso Portugués de Esperanto.',
      en: 'The national association in Lisbon, publisher of Portugala Esperanto-Revuo and organizer of the Portuguese Esperanto Congress.'
    },
    tags: ['portugalo', 'lisbono', 'porto', 'pea', 'portugal'],
    features: {
      eo: ['Sidejo kaj faka libroservo en Lisbono', 'Portugala Esperanto-Revuo', 'Senpagaj kursoj por portugallingvanoj', 'Renkontiĝoj en Lisbono kaj Porto'],
      es: ['Sede y librería especializada en Lisboa', 'Revista Portugala Esperanto-Revuo', 'Cursos gratuitos para lusófonos', 'Actividades en Lisboa y Oporto'],
      en: ['Headquarters and specialized bookshop in Lisbon', 'Journal Portugala Esperanto-Revuo', 'Free courses for Portuguese speakers', 'Chapters in Lisbon and Porto']
    }
  },
  {
    id: 'greka-esperanto-federacio',
    title: 'Greka Esperanto-Federacio (GEF)',
    url: 'https://esperanto.gr',
    displayUrl: 'esperanto.gr',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Hellenic Esperanto Federation',
    year: '1927-2024',
    languages: ['el', 'eo'],
    description: {
      eo: 'La nacia federacio en Ateno fondita en 1927, eldonanto de Greka Esperantisto kaj tradukanto de antikvaj grekaj filozofoj.',
      es: 'La federación nacional en Atenas fundada en 1927, editora de Greka Esperantisto y traductora de filósofos griegos clásicos.',
      en: 'The national federation in Athens founded in 1927, publisher of Greka Esperantisto and translator of classical Greek philosophers.'
    },
    tags: ['grekio', 'ateno', 'gef', 'greka esperantisto', 'grecia'],
    features: {
      eo: ['La bulteno Greka Esperantisto', 'Sidejo en Ateno kun historia biblioteko', 'Tradukoj de Platono, Sofoklo kaj Homero', 'Greka Esperanto-Kongreso'],
      es: ['Boletín Greka Esperantisto', 'Sede en Atenas con biblioteca clásica', 'Traducciones de Platón, Sófocles y Homero', 'Congreso Griego anual'],
      en: ['Bulletin Greka Esperantisto', 'Athens headquarters with classical library', 'Translations of Plato, Sophocles, and Homer', 'Annual Greek Congress']
    }
  },
  {
    id: 'rusa-esperantista-unio',
    title: 'Rusa Esperantista Unio (REU)',
    url: 'https://reu.ru',
    displayUrl: 'reu.ru',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Rusa Esperantista Unio',
    year: '1991-2024',
    languages: ['ru', 'eo'],
    description: {
      eo: 'La nacia organizo en Rusio kunveniganta dekojn da kluboj de Sankt-Peterburgo ĝis Vladivostoko, eldonanta la revuon REGO.',
      es: 'La organización nacional en Rusia que reúne clubes de San Petersburgo a Vladivostok, editora de la revista REGO.',
      en: 'The national organization in Russia uniting clubs from St. Petersburg to Vladivostok, publisher of the journal REGO.'
    },
    tags: ['rusio', 'moskvo', 'sankt-peterburgo', 'reu', 'rego', 'rusia'],
    features: {
      eo: ['La revuo REGO kaj Rusa Esperantisto', 'Rusa Esperanto-Kongreso (REK)', 'Okcident-Siberiaj kaj Uralaj renkontiĝoj', 'Grandega faka literaturo'],
      es: ['Revista REGO y boletines informativos', 'Congreso Ruso de Esperanto (REK)', 'Encuentros regionales en los Urales y Siberia', 'Amplio fondo editorial'],
      en: ['Magazine REGO and informational newsletters', 'Russian Esperanto Congress (REK)', 'Regional gatherings in the Urals and Siberia', 'Extensive publishing heritage']
    }
  },
  {
    id: 'ukraina-esperanto-asocio',
    title: 'Ukraina Esperanto-Asocio (UkrEA)',
    url: 'https://esperanto.org.ua',
    displayUrl: 'esperanto.org.ua',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Ukraina Esperanto-Asocio',
    year: '1989-2024',
    languages: ['uk', 'eo'],
    description: {
      eo: 'La nacia asocio en Ukrainio kun branĉoj en Kievo, Lvivo kaj Odeso, eldonanta la revuon Heliko kaj tradukanta ukrainan literaturon.',
      es: 'La asociación nacional de Ucrania con clubes en Kiev, Leópolis y Odesa, editora de la revista Heliko y traductora de clásicos ucranianos.',
      en: 'The national association in Ukraine with branches in Kyiv, Lviv, and Odesa, publisher of the magazine Heliko and translator of Ukrainian literature.'
    },
    tags: ['ukrainio', 'kievo', 'lvivo', 'odeso', 'heliko', 'ucrania'],
    features: {
      eo: ['La revuo Heliko', 'Tradukoj de Taras Ŝevĉenko kaj Lesja Ukrainka', 'Ukrainaj Esperanto-Kongresoj', 'Subteno al paco kaj kultura heredaĵo'],
      es: ['Revista periódica Heliko', 'Traducciones de Taras Shevchenko y Lesya Ukrainka', 'Congresos Nacionales de Ucrania', 'Compromiso con la paz y la cultura'],
      en: ['Periodical Heliko', 'Translations of Taras Shevchenko and Lesya Ukrainka', 'Ukrainian National Congresses', 'Commitment to peace and cultural heritage']
    }
  },
  {
    id: 'litova-esperanto-asocio',
    title: 'Litova Esperanto-Asocio (LEA)',
    url: 'https://esperanto.lt',
    displayUrl: 'esperanto.lt',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Litova Esperanto-Asocio',
    year: '1919-2024',
    languages: ['lt', 'eo'],
    description: {
      eo: 'Unu el la plej aktivaj baltaj asocioj, kun sidejo en Kaŭno kaj Vilno, gastiganto de la Baltiaj Esperanto-Tagoj (BET) kaj eldonanto de Litova Stelo.',
      es: 'Una de las asociaciones bálticas más destacadas, con sedes en Kaunas y Vilna, anfitriona de los Baltiaj Esperanto-Tagoj (BET) y editora de Litova Stelo.',
      en: 'One of the foremost Baltic associations, headquartered in Kaunas and Vilnius, host to the Baltic Esperanto Days (BET) and publisher of Litova Stelo.'
    },
    tags: ['litovio', 'vilno', 'kauno', 'lea', 'litova stelo', 'bet', 'lituania'],
    features: {
      eo: ['La bela ilustrita revuo Litova Stelo', 'Organizanto de Baltiaj Esperanto-Tagoj (BET)', 'Historia Zamenhof-Domo en Kaŭno', 'Aktiva libroeldonado'],
      es: ['Revista ilustrada de calidad Litova Stelo', 'Organización de los Encuentros Bálticos (BET)', 'Casa histórica de Zamenhof en Kaunas', 'Prolífica labor editorial'],
      en: ['Illustrated high-quality magazine Litova Stelo', 'Hosts the Baltic Esperanto Days (BET)', 'Historic Zamenhof residence in Kaunas', 'Active publishing program']
    }
  },
  {
    id: 'ceha-esperanto-asocio',
    title: 'Ĉeĥa Esperanto-Asocio (ĈEA)',
    url: 'https://esperanto.cz',
    displayUrl: 'esperanto.cz',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Ĉeĥa Esperanto-Asocio',
    year: '1969-2024',
    languages: ['cs', 'eo'],
    description: {
      eo: 'La nacia asocio en Prago kaj Brno, administristo de la Esperanto-Muzeo en Svitavy kaj eldonanto de la revuo Starto.',
      es: 'La asociación nacional en Praga y Brno, gestora del Museo de Esperanto en Svitavy y editora de la revista Starto.',
      en: 'The national association in Prague and Brno, manager of the Esperanto Museum in Svitavy and publisher of the magazine Starto.'
    },
    tags: ['ĉeĥio', 'prago', 'brno', 'starto', 'ĉea', 'chequia'],
    features: {
      eo: ['La revuo Starto aperanta ekde 1969', 'Kolekto de la Esperanto-Muzeo en Svitavy', 'Ĉeĥa Esperanto-Kongreso', 'Rikega cifereca biblioteko rete'],
      es: ['Revista Starto publicada ininterrumpidamente desde 1969', 'Gestión del Museo del Esperanto de Svitavy', 'Congreso Checo anual', 'Extensa biblioteca digital en su web'],
      en: ['Journal Starto published continuously since 1969', 'Custodians of the Svitavy Esperanto Museum', 'Annual Czech Congress', 'Extensive digital library online']
    }
  },
  {
    id: 'slovaka-esperanto-federacio',
    title: 'Slovaka Esperanta Federacio (SKEF)',
    url: 'https://esperanto.sk',
    displayUrl: 'esperanto.sk',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Slovaka Esperanta Federacio',
    languages: ['sk', 'eo'],
    description: {
      eo: 'La nacia federacio en Bratislavo kaj Nitro, gastiginto de la 101-a Universala Kongreso (2016) kaj eldonanto de Esperantopres.',
      es: 'La federación nacional en Bratislava y Nitra, anfitriona del 101º Congreso Universal (2016) y editora de Esperantopres.',
      en: 'The national federation in Bratislava and Nitra, host to the 101st Universal Congress (2016) and publisher of Esperantopres.'
    },
    tags: ['slovakio', 'bratislavo', 'nitro', 'skef', 'eslovaquia'],
    features: {
      eo: ['Gastiganto de la UK 2016 en Nitra', 'Bulteno Esperantopres', 'Kunlaboro kun E@I en Somera Esperanto-Studado', 'Kursoj por slovakoj'],
      es: ['Anfitriona del Congreso Universal 2016 en Nitra', 'Boletín periódico Esperantopres', 'Colaboración estrecha con E@I en el SES', 'Cursos adaptados para eslovacos'],
      en: ['Host of the 2016 World Congress in Nitra', 'Periodical Esperantopres', 'Close collaboration with E@I on SES', 'Language courses for Slovak speakers']
    }
  },
  {
    id: 'kroata-esperanto-ligo',
    title: 'Kroata Esperanto-Ligo (KEL)',
    url: 'https://esperanto.hr',
    displayUrl: 'esperanto.hr',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kroata Esperanto-Ligo',
    year: '1908-2024',
    languages: ['hr', 'eo'],
    description: {
      eo: 'La nacia ligo en Zagrebo fondita en 1908, hejmlando de la fama "Zagreba Metodo" kaj de la revuo Tempo.',
      es: 'La federación nacional en Zagreb fundada en 1908, cuna del célebre "Método de Zagreb" y de la revista Tempo.',
      en: 'The national league in Zagreb founded in 1908, birthplace of the renowned "Zagreb Method" and the journal Tempo.'
    },
    tags: ['kroatio', 'zagrebo', 'kel', 'zagreba metodo', 'tempo', 'croacia'],
    features: {
      eo: ['Kreado de la mondfama Zagreba Metodo de lernado', 'La revuo Tempo', 'Gastiganto de la 86-a UK (2001)', 'Aktiva pupteatro en Esperanto'],
      es: ['Creadores del célebre Método de Zagreb para aprender esperanto', 'Revista periódica Tempo', 'Anfitriona del 86º Congreso Universal en 2001', 'Tradición de teatro de marionetas en esperanto'],
      en: ['Creators of the globally acclaimed Zagreb Method', 'Periodical Tempo', 'Host to the 86th World Congress in 2001', 'Puppet theater tradition in Esperanto']
    }
  },
  {
    id: 'serba-esperanto-ligo',
    title: 'Serba Esperanto-Ligo (SEL)',
    url: 'https://esperanto-serbio.org',
    displayUrl: 'esperanto-serbio.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Serba Esperanto-Ligo',
    year: '1909-2024',
    languages: ['sr', 'eo'],
    description: {
      eo: 'Historia ligo en Beogrado fondita en 1909, organizanta kongresojn en Serbio kaj eldonanta bultenon en la serba kaj Esperanto.',
      es: 'Histórica federación en Belgrado fundada en 1909, organizadora de congresos en Serbia y publicaciones bilingües.',
      en: 'Historic federation in Belgrade founded in 1909, organizing congresses in Serbia and bilingual periodicals.'
    },
    tags: ['serbio', 'beogrado', 'sel', 'balkanoj', 'serbia'],
    features: {
      eo: ['Pli ol jarcento da historio ekde 1909', 'Serba Esperanto-Kongreso', 'Kursoj en la Universitato de Beogrado', 'Tradukoj de serbaj klasikaj poetoj'],
      es: ['Más de un siglo de historia desde 1909', 'Congreso Serbio de Esperanto', 'Cursos en la Universidad de Belgrado', 'Traducciones de poesía serbia'],
      en: ['Over a century of history since 1909', 'Serbian Esperanto Congress', 'Courses at the University of Belgrade', 'Translations of Serbian classical poets']
    }
  },
  {
    id: 'israela-esperanto-ligo',
    title: 'Israela Esperanto-Ligo (ELI)',
    url: 'https://esperanto.org.il',
    displayUrl: 'esperanto.org.il',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Ligo en Israelo (ELI)',
    year: '1949-2024',
    languages: ['he', 'eo', 'ar'],
    description: {
      eo: 'La nacia ligo en Tel-Avivo kaj Jerusalemo, gastiganto de la 85-a UK (2000) kaj eldonanto de la revuo Israela Esperanto-Bulteno.',
      es: 'La federación nacional en Tel Aviv y Jerusalén, anfitriona del 85º Congreso Universal (2000) y editora del Israela Esperanto-Bulteno.',
      en: 'The national league in Tel Aviv and Jerusalem, host to the 85th World Congress (2000) and publisher of Israela Esperanto-Bulteno.'
    },
    tags: ['israelo', 'tel-avivo', 'jerusalemo', 'eli', 'israel'],
    features: {
      eo: ['Israela Esperanto-Bulteno en la hebrea kaj Esperanto', 'Gastiganto de la UK en Tel-Avivo en 2000', 'Semajnaj klubaj kunvenoj en Tel-Avivo', 'Interkultura dialogo inter popoloj'],
      es: ['Boletín bilingüe en hebreo y esperanto', 'Anfitriona del Congreso Universal 2000 en Tel Aviv', 'Reuniones semanales del club de Tel Aviv', 'Iniciativas de diálogo intercultural'],
      en: ['Bilingual bulletin in Hebrew and Esperanto', 'Host to the 2000 World Congress in Tel Aviv', 'Weekly club meetups in Tel Aviv', 'Intercultural dialogue initiatives']
    }
  },
  {
    id: 'sudafrika-esperanto-asocio',
    title: 'Esperanto-Asocio de Suda Afriko (EASA)',
    url: 'https://esperanto.org.za',
    displayUrl: 'esperanto.org.za',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Esperanto-Asocio de Suda Afriko',
    languages: ['en', 'af', 'eo'],
    description: {
      eo: 'La nacia asocio en Sud-Afriko kunveniganta membrojn en Kaburbo, Johanesburgo kaj Pretorio, eldonanta bultenon Bakŝiŝ.',
      es: 'La asociación nacional de Sudáfrica con miembros en Ciudad del Cabo, Johannesburgo y Pretoria, editora del boletín Bakŝiŝ.',
      en: 'The national association in South Africa uniting members across Cape Town, Johannesburg, and Pretoria, publisher of the newsletter Bakŝiŝ.'
    },
    tags: ['sud-afriko', 'kaburbo', 'johanesburgo', 'easa', 'sudafrica'],
    features: {
      eo: ['Bulteno Bakŝiŝ', 'Kluboj en Kaburbo kaj Johanesburgo', 'Kursoj por anglalingvanoj kaj afrikanslingvanoj', 'Kunlaboro en tutafrikaj seminarioj'],
      es: ['Boletín informativo Bakŝiŝ', 'Clubes en Ciudad del Cabo y Johannesburgo', 'Cursos para anglófonos y afrikáners', 'Participación en congresos panafricanos'],
      en: ['Newsletter Bakŝiŝ', 'Local chapters in Cape Town and Johannesburg', 'Courses for English and Afrikaans speakers', 'Involvement in pan-African seminars']
    }
  },

  // ========================================================
  // 2. FAKAJ KAJ TEMATAJ ASOCIOJ (THEMATIC & SPECIALIZED BODIES)
  // ========================================================
  {
    id: 'teva-vegetarana-asocio',
    title: 'TEVA - Tutmonda Esperantista Vegetarana Asocio',
    url: 'https://esperanto-vegetara.org',
    displayUrl: 'esperanto-vegetara.org',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'TEVA (Fondita en 1908)',
    year: '1908-2024',
    languages: ['eo'],
    description: {
      eo: 'La plej malnova internacia vegetarana asocio en la mondo (fondita en 1908 dum la 4-a UK en Dresdeno de Lev Tolstoj kaj esperantistoj), eldonanto de Vegetarano.',
      es: 'La asociación vegetariana internacional más antigua del mundo (fundada en 1908 con el impulso de León Tolstói), editora de la revista Vegetarano.',
      en: 'The oldest international vegetarian association in the world (founded in 1908 with the blessing of Leo Tolstoy), publisher of the journal Vegetarano.'
    },
    tags: ['teva', 'vegetarismo', 'veganismo', 'tolstoj', '1908', 'animalaj rajtoj', 'vegetariano'],
    features: {
      eo: ['Pli ol 115 jaroj da seninterrompa historio ekde 1908', 'Lev Tolstoj estis honora prezidanto', 'La revuo Vegetarano eldonata regule', 'Vegetaranaj bankedoj dum Universalaj Kongresoj'],
      es: ['Más de 115 años de historia ininterrumpida desde 1908', 'León Tolstói figuró entre sus presidentes de honor', 'Revista especializada Vegetarano', 'Banquetes vegetarianos en los Congresos Mundiales'],
      en: ['Over 115 years of continuous history since 1908', 'Leo Tolstoy was one of its founding honorary presidents', 'Specialized journal Vegetarano', 'Vegetarian banquets at World Congresses']
    }
  },
  {
    id: 'skolta-esperanto-ligo',
    title: 'Skolta Esperanto-Ligo (SEL)',
    url: 'https://skolta.org',
    displayUrl: 'skolta.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Skolta Esperanto-Ligo (Fondita en 1918)',
    year: '1918-2024',
    languages: ['eo', 'en'],
    description: {
      eo: 'Fondita en 1918 tuj post la Unua Mondmilito fare de Alexander William Thomson, SEL kunigas skoltojn el ĉiuj kontinentoj en internaciaj ĵamboreoj.',
      es: 'Fundada en 1918 tras la Primera Guerra Mundial por Alexander William Thomson, reúne a scouts de todos los continentes en jamborees mundiales.',
      en: 'Founded in 1918 after World War I by Alexander William Thomson, uniting scouts across all continents at World Scout Jamborees.'
    },
    tags: ['skoltoj', 'sel', 'baden-powell', 'ĵamboreo', 'junuloj', 'scouts', 'escultismo'],
    features: {
      eo: ['Pli ol 105 jaroj da skolta esperantista agado', 'Partopreno kun propra tendejo en Mondaj Skoltaj Ĵamboreoj', 'Skolta terminaro en Esperanto', 'Insigno de esperanto-parolanta skolto'],
      es: ['Más de un siglo de escultismo internacional', 'Campamento propio en los Jamborees Scouts Mundiales', 'Glosario scout oficial en esperanto', 'Insignia scout de intérprete de esperanto'],
      en: ['Over a century of international scouting activity', 'Dedicated sub-camp at World Scout Jamborees', 'Official scout terminology in Esperanto', 'Scout Esperanto interpreter badge']
    }
  },
  {
    id: 'ilera-radio-amatoroj',
    title: 'ILERA - Internacia Ligo de Esperantistaj Radio-Amatoroj',
    url: 'https://esperanto.org/ilera/',
    displayUrl: 'esperanto.org/ilera',
    category: 'projects',
    level: 'B1',
    isFree: true,
    format: 'website',
    author: 'ILERA Komunumo',
    year: '1970-2024',
    languages: ['eo'],
    description: {
      eo: 'Tutmonda asocio de radio-amatoroj komunikantaj per kurtondo kaj satelito en Esperanto: regulaj frekvencoj, diplomoj kaj radiaj konkursoj.',
      es: 'Asociación mundial de radioaficionados que comunican por onda corta y satélite en esperanto: frecuencias fijas, diplomas y concursos.',
      en: 'Worldwide network of amateur radio operators communicating via HF shortwave and satellites in Esperanto: skeds, award diplomas, and contests.'
    },
    tags: ['ilera', 'radio-amatoroj', 'kurtondo', 'satelito', 'qso', 'radioaficionados', 'ham radio'],
    features: {
      eo: ['Regulaj semajnaj QSO-horoj sur fiksaj frekvencoj (14.266 MHz, 7.066 MHz)', 'Faka radio-amatora terminaro', 'Premioj kaj diplomoj de ILERA', 'Elsendoj dum kongresoj'],
      es: ['Rondas semanales de contacto (QSO) en frecuencias fijas', 'Glosario técnico de radioafición en esperanto', 'Diplomas acreditativos y premios de concurso', 'Estaciones de radio en vivo en congresos'],
      en: ['Weekly scheduled on-air nets on dedicated HF frequencies', 'Technical ham radio terminology in Esperanto', 'Award diplomas and operating certificates', 'Special event stations at conventions']
    }
  },
  {
    id: 'ikef-komerco-ekonomio',
    title: 'IKEF - Internacia Komerca kaj Ekonomia Fakgrupo',
    url: 'https://ikef.info',
    displayUrl: 'ikef.info',
    category: 'projects',
    level: 'B2',
    isFree: true,
    format: 'website',
    author: 'Internacia Komerca kaj Ekonomia Fakgrupo',
    languages: ['eo'],
    description: {
      eo: 'Faka asocio por entreprenistoj, ekonomikistoj kaj komercistoj, esploranta la aplikon de Esperanto en internacia komerco, turismo kaj financoj.',
      es: 'Asociación profesional para empresarios, economistas y comerciantes, dedicada al uso del esperanto en comercio exterior, turismo y finanzas.',
      en: 'Professional association for entrepreneurs, economists, and business executives, exploring Esperanto\'s application in international trade and finance.'
    },
    tags: ['ikef', 'komerco', 'ekonomio', 'entreprenoj', 'financoj', 'comercio', 'negocios'],
    features: {
      eo: ['Faka Komerca Vortaro en Esperanto', 'La revuo La Merkato aperanta regule', 'Internaciaj ekonomiaj simpozioj', 'Reto de esperantistaj entreprenistoj'],
      es: ['Diccionario mercantil y comercial en esperanto', 'Revista especializada La Merkato', 'Simposios internacionales de economía y finanzas', 'Red de empresas y profesionales bilingües'],
      en: ['Specialized Commercial Dictionary in Esperanto', 'Business periodical La Merkato', 'International trade symposia', 'Global network of bilingual business leaders']
    }
  },
  {
    id: 'oomoto-esperanto',
    title: 'Oomoto kaj Esperanto (Spirita Movado el Japanio)',
    url: 'https://oomoto.or.jp/esperanto/',
    displayUrl: 'oomoto.or.jp/esperanto',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Oomoto Religia Komunumo (Kameoka, Japanio)',
    year: '1923-2024',
    languages: ['ja', 'eo', 'en'],
    description: {
      eo: 'Japana spirita movado fondita en 1892, kiu oficiale adoptis Esperanton en 1923 laŭ la principo "Unu Dio, Unu Mondo, Unu Interlingvo" kaj organizas kursojn.',
      es: 'Movimiento espiritual japonés fundado en 1892 que adoptó el esperanto en 1923 bajo el lema "Un Dios, Un Mundo, Una Interlengua".',
      en: 'Japanese spiritual movement founded in 1892 that officially adopted Esperanto in 1923 under the motto "One God, One World, One Common Language".'
    },
    tags: ['oomoto', 'japanio', 'spiriteco', 'kameoka', 'arto', 'paco', 'espiritualidad'],
    features: {
      eo: ['Uzo de Esperanto ekde 1923 kiel oficiala internacia lingvo', 'La revuo Oomoto eldonata de jardekoj', 'Senpagaj kursoj en Kameoka kaj Kioto', 'Kulturaj tradicioj: teceremonio, No-teatro kaj kaligrafio'],
      es: ['Uso ininterrumpido del esperanto desde 1923 como lengua internacional oficial', 'Revista periódica Oomoto en esperanto', 'Cursos de inmersión en Kameoka y Kioto', 'Difusión de artes tradicionales: ceremonia del té y caligrafía'],
      en: ['Adopted Esperanto as its official international tongue in 1923', 'Decades-long publication of Oomoto magazine', 'Immersion language courses in Kameoka and Kyoto', 'Promotes traditional Japanese arts: tea ceremony and calligraphy']
    }
  },
  {
    id: 'keli-kristanoj',
    title: 'KELI - Kristana Esperanta Ligo Internacia',
    url: 'https://keli.esperanto.cc',
    displayUrl: 'keli.esperanto.cc',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Kristana Esperanta Ligo Internacia',
    year: '1911-2024',
    languages: ['eo'],
    description: {
      eo: 'Ekumena ligo fondita en 1911 kuniganta protestantajn kaj sendependajn kristanojn, eldonanto de la revuo Dia Regno kaj de la Biblio en Esperanto.',
      es: 'Asociación ecuménica fundada en 1911 que reúne a cristianos evangélicos y protestantes, editora de Dia Regno y difusora de la Biblia en esperanto.',
      en: 'Ecumenical association founded in 1911 uniting Protestant and independent Christians, publisher of Dia Regno and the Esperanto Bible.'
    },
    tags: ['keli', 'kristanismo', 'dia regno', 'biblio', 'ekumena', 'cristianismo'],
    features: {
      eo: ['La revuo Dia Regno ekde 1911', 'La Sankta Biblio en Esperanto (traduko de Zamenhof kaj britaj teologoj)', 'Ekumenaj Esperanto-Kongresoj kun IKUE', 'Kantaro Adoru'],
      es: ['Revista centenaria Dia Regno', 'La Santa Biblia en esperanto (con traducción del Antiguo Testamento por Zamenhof)', 'Congresos ecuménicos conjuntos con IKUE', 'Cancionero coral Adoru'],
      en: ['Centennial journal Dia Regno', 'The Holy Bible in Esperanto (OT translated by L.L. Zamenhof)', 'Joint ecumenical congresses with IKUE', 'Hymnal Adoru with musical scores']
    }
  },
  {
    id: 'ikue-katolikoj',
    title: 'IKUE - Internacia Katolika Unuiĝo Esperantista',
    url: 'https://www.ikue.net',
    displayUrl: 'ikue.net',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Internacia Katolika Unuiĝo Esperantista',
    year: '1910-2024',
    languages: ['it', 'eo'],
    description: {
      eo: 'Oficiale agnoskita de la Vatikano ekde 1910, IKUE organizas katolikajn esperantistojn, eldonas la revuon Espero Katolika kaj subtenas mesojn en Esperanto.',
      es: 'Reconocida oficialmente por el Vaticano desde 1910, reúne a católicos esperantistas, edita Espero Katolika y promueve misas en esperanto.',
      en: 'Officially recognized by the Holy See since 1910, uniting Catholic Esperantists, publishing Espero Katolika, and fostering liturgy in Esperanto.'
    },
    tags: ['ikue', 'katolikismo', 'vatikano', 'espero katolika', 'liturgio', 'catolicismo'],
    features: {
      eo: ['La revuo Espero Katolika estas la plej malnova seninterrompe aperanta esperanta gazeto (ekde 1903)', 'Agnosko de la Roma Kurio por mesoj en Esperanto', 'Kongresoj kaj pilgrimaroj', 'Paska kaj kristnaska beno Urbi et Orbi de la Papo en Esperanto'],
      es: ['Revista Espero Katolika, la más longeva en publicación ininterrumpida (desde 1903)', 'Misal romano y lecturas litúrgicas aprobadas por Roma', 'Congresos y peregrinaciones internacionales', 'Bendición papal Urbi et Orbi con saludo en esperanto'],
      en: ['Journal Espero Katolika is the oldest continuously published periodical in the language (est. 1903)', 'Approved Missal and liturgical texts from the Vatican', 'Pilgrimages and international conventions', 'Papal Urbi et Orbi blessings traditionally include Esperanto']
    }
  },
  {
    id: 'budhana-ligo-esperantista',
    title: 'Budhana Ligo Esperantista (BLE)',
    url: 'https://ble.esperanto.org',
    displayUrl: 'ble.esperanto.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Budhana Ligo Esperantista',
    year: '1925-2024',
    languages: ['eo', 'en'],
    description: {
      eo: 'Fondita en 1925, BLE tradukas budhanajn tekstojn (Dhammapada, Sutroj) en Esperanton kaj diskonigas mediton kaj pacismon.',
      es: 'Fundada en 1925, la asociación traduce textos budistas canónicos (Dhammapada, Sutras) al esperanto y promueve la meditación y la paz.',
      en: 'Founded in 1925, BLE translates canonical Buddhist texts (Dhammapada, Sutras) into Esperanto and promotes meditation and mindfulness.'
    },
    tags: ['budhismo', 'ble', 'dhammapada', 'medito', 'sutroj', 'budismo', 'filosofia'],
    features: {
      eo: ['La Dhammapada plene tradukita en Esperanton', 'La bulteno La Budha Lumo', 'Medito-sesioj dum kongresoj', 'Tradukoj de sutroj el la palia, ĉina kaj sanskrita'],
      es: ['El Dhammapada completo traducido al esperanto', 'Publicación periódica La Budha Lumo', 'Talleres de meditación guiada en congresos', 'Traducción de textos sagrados del pali y sánscrito'],
      en: ['The complete Dhammapada translated into Esperanto', 'Periodical bulletin La Budha Lumo', 'Guided meditation sessions at world congresses', 'Direct translations from Pali and Sanskrit']
    }
  },

  // ========================================================
  // 3. ĈEFOVERKOJ DE LA LITERATURO (LITERARY MASTERPIECES)
  // ========================================================
  {
    id: 'dangera-lingvo-lins',
    title: 'La Danĝera Lingvo (Ulrich Lins)',
    url: 'https://uea.org/libroservo/dangera-lingvo',
    displayUrl: 'uea.org/dangera-lingvo',
    category: 'literature',
    level: 'B2',
    isFree: false,
    format: 'book',
    author: 'Ulrich Lins (Germana Historiisto)',
    year: '1988-2016',
    languages: ['eo', 'es', 'en', 'de', 'ru', 'ja'],
    description: {
      eo: 'La fundamenta historia esploro pri la persekutoj kontraŭ Esperanto kaj ĝiaj parolantoj sub la totalismaj reĝimoj de Hitler kaj Stalin.',
      es: 'La investigación histórica definitiva sobre la persecución del esperanto y sus hablantes bajo los regímenes totalitarios de Hitler y Stalin.',
      en: 'The definitive historical study of the persecutions against Esperanto and its speakers under the totalitarian regimes of Hitler and Stalin.'
    },
    tags: ['historio', 'persekutoj', 'hitler', 'stalin', 'totalismo', 'historia', 'ensayo'],
    features: {
      eo: ['Verkita surbaze de arkivoj de Gestapo kaj KGB', 'Tradukita en la anglan, germanan, rusan, japanan kaj hispanan', 'Monumento de historia scienco', 'Eldonita de Universala Esperanto-Asocio'],
      es: ['Basado en documentos desclasificados de la Gestapo y el KGB', 'Traducido a numerosos idiomas por editoriales de prestigio', 'Obra cumbre de la historiografía del esperanto', 'Publicado por la UEA'],
      en: ['Researched using declassified Gestapo and KGB files', 'Translated into English, German, Russian, Japanese, and Spanish', 'Landmark work of modern European history', 'Published by UEA']
    }
  },
  {
    id: 'la-infana-raso-auld',
    title: 'La Infana Raso (William Auld)',
    url: 'https://literaturo.org/infana-raso',
    displayUrl: 'literaturo.org/infana-raso',
    category: 'literature',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'William Auld (Kandidato por la Nobel-premio)',
    year: '1956',
    languages: ['eo'],
    description: {
      eo: 'La majstroverko de la skota poeto William Auld en 25 ĉapitroj, pro kiu li estis plurfoje proponita por la Nobel-premio pri Literaturo.',
      es: 'La obra maestra poética del autor escocés William Auld en 25 cantos, por la cual fue candidato oficial al Premio Nobel de Literatura.',
      en: 'The crowning poetic masterpiece by Scottish poet William Auld in 25 cantos, for which he was repeatedly nominated for the Nobel Prize in Literature.'
    },
    tags: ['william auld', 'poezio', 'nobel-premio', 'ĉefverko', 'poema', 'literatura universal'],
    features: {
      eo: ['Kandidatigita por la Nobel-premio pri Literaturo en 1999, 2004 kaj 2006', '25 profundaj filozofiaj kaj lirikaj kantoj', 'Komparata al "The Waste Land" de T.S. Eliot kaj Ezra Pound', 'Libere konsultebla enreta'],
      es: ['Candidato al Premio Nobel de Literatura en 1999, 2004 y 2006', 'Poema monumental en 25 cantos líricos y filosóficos', 'Equiparable a "La tierra baldía" de T.S. Eliot', 'Texto íntegro consultable libremente'],
      en: ['Nominated for the Nobel Prize in Literature in 1999, 2004, and 2006', 'Epic poem spanning 25 philosophical cantos', 'Compared by critics to T.S. Eliot\'s The Waste Land', 'Fully accessible online']
    }
  },
  {
    id: 'vojago-al-kazohinio',
    title: 'Vojaĝo al Kazohinio (Sándor Szathmári)',
    url: 'https://verkoj.com/szathmari/kazohinio',
    displayUrl: 'verkoj.com/kazohinio',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'book',
    author: 'Sándor Szathmári',
    year: '1958',
    languages: ['eo', 'en', 'hu'],
    description: {
      eo: 'La klasika satira utopio en la tradicio de Gulliver: ŝipestro Gulliver malkovras la landojn de la raciaj "hinuloj" kaj la frenezaj "behinoj".',
      es: 'La gran novela satírica y distópica en la estela de Gulliver: el protagonista naufraga en la tierra de los hiperracionales "hinos" y los caóticos "behinos".',
      en: 'The classic satirical masterpiece in the tradition of Swift: shipwrecked Gulliver discovers the hyper-rational "Hins" and the fanatical "Behins".'
    },
    tags: ['szathmari', 'kazohinio', 'saturo', 'utopio', 'distopio', 'gulliver', 'novela', 'clasico'],
    features: {
      eo: ['Unu el la plej famaj originalaj romanoj en Esperanto', 'Profunda analizo de homa frenezo kaj socio', 'Tradukita en la anglan, hungaran kaj francan', 'Leginda por ĉiuj mezaj kaj spertaj legantoj'],
      es: ['Una de las novelas cumbre de la literatura en esperanto', 'Brillante sátira psicológica de la civilización', 'Traducida a múltiples idiomas nacionales', 'Lectura obligada para nivel intermedio-avanzado'],
      en: ['One of the undisputed peaks of original Esperanto fiction', 'Profound critique of human irrationality and social dogma', 'Translated into English and published worldwide', 'Essential reading for B2-C1 learners']
    }
  },
  {
    id: 'kredu-min-sinjorino',
    title: 'Kredu Min, Sinjorino! (Cezaro Rossetti)',
    url: 'https://verkoj.com/rossetti/kredu-min',
    displayUrl: 'verkoj.com/kredu-min',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Cezaro Rossetti',
    year: '1950',
    languages: ['eo'],
    description: {
      eo: 'Alloga kaj sprita pikareska romano pri la aventuroj de foiro-vendisto tra Britio: plena de vigla viva Esperanto, humuro kaj komercaj lertaĵoj.',
      es: 'Divertida y amena novela picaresca sobre las andanzas de un vendedor ambulante: repleta de esperanto vivo, humor y trucos comerciales.',
      en: 'A witty, fast-paced picaresque novel recounting the adventures of a traveling market salesman: full of colorful idioms, humor, and life.'
    },
    tags: ['rossetti', 'kredu min', 'humuro', 'pikareska', 'romano', 'novela picaresca'],
    features: {
      eo: ['Viglaj kaj naturaj dialogoj en modelo de stilo', 'Plej amuza romano en la tuta esperanta beletro', 'Tre rekomendata post la kursoj Gerda Malaperis', 'Senpage konsultebla rete'],
      es: ['Diálogos naturales de impecable soltura idiomática', 'Una de las lecturas más entretenidas del idioma', 'Lectura ideal de transición para recién graduados de nivel A2/B1', 'Acceso digital libre'],
      en: ['Lively and colloquial authentic dialogue', 'One of the most enjoyable novels ever penned in Esperanto', 'Great transitional read after beginner courses', 'Available free online']
    }
  },
  {
    id: 'la-stranga-butiko-schwartz',
    title: 'La Stranga Butiko (Raymond Schwartz)',
    url: 'https://verkoj.com/schwartz/la-stranga-butiko',
    displayUrl: 'verkoj.com/stranga-butiko',
    category: 'literature',
    level: 'B1',
    isFree: true,
    format: 'book',
    author: 'Raymond Schwartz (Pariza Kabaredo)',
    year: '1931',
    languages: ['eo'],
    description: {
      eo: 'La fama kolekto de spritaj poemoj, kalemburoj kaj humuraĵoj de la fondinto de la parizaj esperantaj kabaredoj "Verda Kato" kaj "Tri Koboldoj".',
      es: 'Célebre colección de poemas satíricos y juegos de palabras del alma de los cabarets parisinos en esperanto "Verda Kato" y "Tri Koboldoj".',
      en: 'The celebrated collection of humorous poetry and puns by the founder of the iconic Paris Esperanto cabarets "Verda Kato" and "Tri Koboldoj".'
    },
    tags: ['schwartz', 'humuro', 'kabaredo', 'kalemburoj', 'parizo', 'poezio', 'humor', 'poesia'],
    features: {
      eo: ['Majstra uzo de la vortfarado de Esperanto', 'Senkompara pariza kabareda humuro', 'Klaraj kaj memoreblaj rimoj', 'Malkaŝas la flekseblecon de la lingvo'],
      es: ['Ingenio incomparable en los juegos de palabras y prefijos', 'Atmósfera de los cabarets de Montmartre en París', 'Rimas fáciles de recordar y recitar', 'Muestra la asombrosa versatilidad del esperanto'],
      en: ['Peerless wit exploring Esperanto\'s word-building genius', 'Ambiance of historic bohemian Montmartre cabarets', 'Memorable, musical rhyming verses', 'Showcases the boundless flexibility of the language']
    }
  },
  {
    id: 'kiel-akvo-de-l-rivero',
    title: 'Kiel Akvo de l\' Rivero (Raymond Schwartz)',
    url: 'https://verkoj.com/schwartz/kiel-akvo',
    displayUrl: 'verkoj.com/kiel-akvo',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'book',
    author: 'Raymond Schwartz',
    year: '1963',
    languages: ['eo'],
    description: {
      eo: 'Monumenta originala historia romano pri franca kaj germana junuloj trafitaj de la tragedioj de ambaŭ mondmilitoj kaj ilia amikeco trans limoj.',
      es: 'Monumental novela histórica sobre jóvenes franceses y alemanes atrapados en las dos guerras mundiales y su amistad indestructible.',
      en: 'A monumental historical novel following young French and German friends caught up in the two World Wars and their cross-border bond.'
    },
    tags: ['schwartz', 'historia romano', 'mondmilitoj', 'francio', 'germanio', 'paco', 'novela historica'],
    features: {
      eo: ['Konsiderata unu el la plej grandaj romanoj en Esperanto', 'Profunda homa kaj humanisma mesaĝo', 'Rikega lingvaĵo kaj historia kunteksto', 'Aŭtobiografiaj elementoj de la aŭtoro'],
      es: ['Considerada una de las obras cumbre de la narrativa en esperanto', 'Mensaje profundamente antibelicista y humano', 'Vocabulario rico y ambientación histórica cuidada', 'Basada en vivencias del propio autor'],
      en: ['Universally recognized as a titan of original Esperanto fiction', 'Powerful anti-war and humanist message', 'Rich prose with immersive historical detail', 'Draws heavily on Schwartz\'s lived experiences']
    }
  },
  {
    id: 'poemo-de-utnoa-montagut',
    title: 'Poemo de Utnoa (Abel Montagut)',
    url: 'https://verkoj.com/montagut/utnoa',
    displayUrl: 'verkoj.com/utnoa',
    category: 'literature',
    level: 'C1',
    isFree: true,
    format: 'book',
    author: 'Abel Montagut (Kataluna Verkisto)',
    year: '1993',
    languages: ['eo'],
    description: {
      eo: 'Epika sciencfikcia poemo en 12 kantoj kaj 7 000 heksametraj versoj, unuiganta la sumeran diluvon de Gilgameŝ kun eksterteraj civilizoj.',
      es: 'Epopeya épica de ciencia ficción en 12 cantos y 7.000 versos hexámetros que fusiona el mito de Gilgamesh con visitantes extraterrestres.',
      en: 'A science-fiction epic in 12 cantos and 7,000 hexameter verses, fusing the Mesopotamian flood myth of Gilgamesh with extraterrestrial visitors.'
    },
    tags: ['abel montagut', 'epopeo', 'sciencfikcio', 'gilgames', 'poezio', 'heksametro', 'ciencia ficcion'],
    features: {
      eo: ['Monumenta 7 000-versa heksametra poemo', 'Inspirita de la mitoj de Gilgameŝ, Biblio kaj hindaj Vedoj', 'Sciencfikcia kunteksto pri la originoj de la homaro', 'Akademia ĉefverko de Abel Montagut'],
      es: ['Poema monumental de 7.000 versos en hexámetro clásico', 'Inspirado en la epopeya de Gilgamesh, la Biblia y los Vedas', 'Trama de ciencia ficción sobre los orígenes de la humanidad', 'Obra maestra de las letras catalanas y esperantistas'],
      en: ['Grand epic in 7,000 classical hexameter verses', 'Draws upon Gilgamesh, biblical flood myths, and Vedic lore', 'Science fiction narrative on the origins of humankind', 'Academic masterwork by Abel Montagut']
    }
  },
  {
    id: 'la-stona-urbo-lowenstein',
    title: 'La Ŝtona Urbo (Anna Löwenstein)',
    url: 'https://uea.org/libroservo/la-stona-urbo',
    displayUrl: 'uea.org/stona-urbo',
    category: 'literature',
    level: 'B1',
    isFree: false,
    format: 'book',
    author: 'Anna Löwenstein (Brita Verkistino & Akademiano)',
    year: '1999',
    languages: ['eo', 'en'],
    description: {
      eo: 'Alloga historia romano pri kelta sklavino forkondukita al la Romia Imperio: fascina priskribo de la antikva mondo el la vidpunkto de kaptitino.',
      es: 'Novela histórica apasionante sobre una esclava celta llevada a Roma: retrato fascinante del Imperio romano desde los ojos de una cautiva.',
      en: 'A gripping historical novel following a Celtic captive brought as a slave to ancient Rome, chronicling the imperial capital through her eyes.'
    },
    tags: ['anna lowenstein', 'romia imperio', 'sklavo', 'kelta', 'historio', 'romano', 'novela historica'],
    features: {
      eo: ['Elstara facila kaj eleganta lingvaĵo ideala por B1-legantoj', 'Publikigita samtempe en Esperanto kaj en la angla', 'Profunda historia esplorado pri Romio', 'Dua sukcesa romano: Morto de Artisto'],
      es: ['Prosa cuidada y accesible ideal para nivel B1 en adelante', 'Publicada simultáneamente en esperanto y en inglés', 'Rigurosa investigación histórica sobre la vida cotidiana en Roma', 'Aclamada internacionalmente'],
      en: ['Elegant, clear prose suited for intermediate B1 readers', 'Published simultaneously in Esperanto and English', 'Painstakingly researched portrait of ancient Roman life', 'Followed by the acclaimed sequel Death of an Artist']
    }
  },
  {
    id: 'kumewawa-filo-sekely',
    title: 'Kumeŭaŭa, la Filo de la Ĝangalo (Tibor Sekelj)',
    url: 'https://verkoj.com/sekelj/kumewawa',
    displayUrl: 'verkoj.com/kumewawa',
    category: 'literature',
    level: 'A2',
    isFree: true,
    format: 'book',
    author: 'Tibor Sekelj (Tutmonda Esploristo)',
    year: '1979',
    languages: ['eo'],
    description: {
      eo: 'La klasika romano por infanoj kaj plenkreskuloj pri la vivo de indiĝena knabo en la brazila ĝangalo, tradukita el Esperanto en pli ol 20 naciajn lingvojn.',
      es: 'Clásica novela de aventuras sobre la vida de un niño indígena en la selva del Amazonas, traducida desde el esperanto a más de 20 idiomas nacionales.',
      en: 'The adventure novel following an indigenous boy in the Amazon rainforest, translated from Esperanto into more than 20 world languages.'
    },
    tags: ['tibor sekelj', 'brazilo', 'amazono', 'indigenoj', 'aventuroj', 'infanoj', 'novela juvenil'],
    features: {
      eo: ['Verkita de la fama mondvojaĝanto Tibor Sekelj', 'Tradukita en la japanan, ĉinan, hispanan, rusan k.a.', 'Baza kaj facila vortprovizo taŭga por A2-legantoj', 'Autenta priskribo de indiĝenaj kulturoj'],
      es: ['Escrito por el insigne explorador mundial Tibor Sekelj', 'Traducido al japonés, chino, español, ruso y decenas de idiomas', 'Vocabulario gradual excelente para estudiantes de nivel A2', 'Retrato fidedigno y respetuoso de los pueblos amazónicos'],
      en: ['Penned by the legendary explorer Tibor Sekelj', 'Translated into Japanese, Chinese, Spanish, Russian, and more', 'Accessible vocabulary ideal for A2 elementary readers', 'Authentic, respectful portrait of Amazonian cultures']
    }
  },
  {
    id: 'cu-vi-kuiras-cine-piron',
    title: 'Ĉu Vi Kuiras Ĉine? (Johán Valano / Claude Piron)',
    url: 'https://verkoj.com/piron/cu-vi-kuiras-cine',
    displayUrl: 'verkoj.com/cu-vi-kuiras-cine',
    category: 'literature',
    level: 'A2',
    isFree: true,
    format: 'book',
    author: 'Claude Piron (pseŭdonime Johán Valano)',
    year: '1976',
    languages: ['eo'],
    description: {
      eo: 'La unua el la famaj facilaj detektivaj romanoj de Claude Piron, uzanta limigitan bazan vortprovizon por provizi allogan kaj distran polican enketon.',
      es: 'La primera de las célebres novelas policíacas fáciles de Claude Piron, con vocabulario básico para ofrecer una intriga detectivesca apasionante.',
      en: 'The first of Claude Piron\'s mystery detective novels, designed with controlled vocabulary to provide an engaging whodunit for learners.'
    },
    tags: ['claude piron', 'johan valano', 'polica', 'detektivo', 'mistero', 'facila', 'novela policiaca'],
    features: {
      eo: ['Intriga polica rakonto verkita per baza lingvaĵo', 'Parto de la serio "Ĉu..." de Claude Piron', 'Perfekta por legi tuj post Gerda Malaperis', 'Senpage atingebla enreta'],
      es: ['Trama de suspense detectivesco con vocabulario accesible', 'Parte de la exitosa serie de novelas "Ĉu..." de Claude Piron', 'Lectura perfecta tras completar Gerda Malaperis', 'Disponible íntegra en la red'],
      en: ['Engrossing detective plot crafted with high-frequency vocabulary', 'Part of Claude Piron\'s beloved "Ĉu..." mystery series', 'Perfect follow-up reading after Gerda Malaperis', 'Freely accessible online']
    }
  },
  {
    id: 'sur-sanga-tero-baghy',
    title: 'Sur Sanga Tero (Julio Baghy)',
    url: 'https://verkoj.com/baghy/sur-sanga-tero',
    displayUrl: 'verkoj.com/sur-sanga-tero',
    category: 'literature',
    level: 'B2',
    isFree: true,
    format: 'book',
    author: 'Julio Baghy (Hungara Majstro)',
    year: '1933',
    languages: ['eo'],
    description: {
      eo: 'La kortuŝa historia romano de Julio Baghy pri lia sperto kiel militkaptito en Siberio dum la Unua Mondmilito kaj la Rusa Revolucio.',
      es: 'La conmovedora novela histórica de Julio Baghy sobre su experiencia como prisionero de guerra en Siberia durante la Gran Guerra y la Revolución Rusa.',
      en: 'The moving historical novel by Julio Baghy chronicling his experiences as a prisoner of war in Siberia during World War I and the Russian Revolution.'
    },
    tags: ['julio baghy', 'siberio', 'militkaptito', 'historio', 'romano', 'clasicos'],
    features: {
      eo: ['Sekvo de la fama romano Printempo en la Aŭtuno', 'Autenta atesto pri homa solidareco en siberiaj tendaroj', 'Majstra stilo de unu el la fondintoj de esperanto-beletro', 'Libera legado en Verkoj.com'],
      es: ['Secuela de la célebre novela Printempo en la Aŭtuno', 'Testimonio conmovedor de fraternidad en los campos de prisioneros', 'Estilo emotivo de uno de los grandes fundadores de las letras esperantistas', 'Lectura libre en Verkoj.com'],
      en: ['Sequel to the classic Printempo en la Aŭtuno', 'Heartfelt testament to human solidarity in Siberian prison camps', 'Masterful prose by one of Esperanto literature\'s greatest voices', 'Free online at Verkoj.com']
    }
  },

  // ========================================================
  // 4. MUZIKO KAJ BANDOJ (BANDS, SINGERS & MUSIC PROJECTS)
  // ========================================================
  {
    id: 'persone-bando',
    title: 'Persone - Legenda Roka Bando',
    url: 'https://persone.se',
    displayUrl: 'persone.se',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Martin Wiese, Bertilo Wennergren & Per Ola Axelsson',
    year: '1986-2024',
    languages: ['eo', 'sv'],
    description: {
      eo: 'La plej amata kaj profesia sveda rokbando de Esperantujo, kreintoj de klasikaj albumoj kiel "En la Spegulo", "Povus Esti Simpla" kaj "Sen Kialo".',
      es: 'La banda de rock sueca más emblemática y querida del esperanto, autores de álbumes legendarios como "En la Spegulo" y "Povus Esti Simpla".',
      en: 'The most beloved and influential Swedish rock band in Esperanto, creators of iconic albums including "En la Spegulo" and "Povus Esti Simpla".'
    },
    tags: ['persone', 'roko', 'svedio', 'martin wiese', 'bertilo', 'muziko', 'rock'],
    features: {
      eo: ['Rok-muziko kun profundaj kaj poeziaj tekstoj', 'Membroj inkluzivas la faman gramatikiston Bertilo Wennergren', 'Koncertoj en dekoj da IJK kaj festivaloj', 'Albumoj elŝuteblaj ĉe Vinilkosmo kaj Spotify'],
      es: ['Rock con letras poéticas y sonido acústico y eléctrico impecable', 'Entre sus miembros figura el insigne lingüista Bertilo Wennergren', 'Cabezas de cartel en decenas de IJK y congresos', 'Disponible en Vinilkosmo y Spotify'],
      en: ['Heartfelt rock with poetic, thoughtful lyrics', 'Personnel includes acclaimed linguist Bertilo Wennergren', 'Headlined dozens of IJK youth congresses', 'Available on Vinilkosmo and Spotify']
    }
  },
  {
    id: 'amplifiki-bando',
    title: 'Amplifiki - La Unua Esperanta Rokbando',
    url: 'https://vinilkosmo-mp3.com/eo/rok-pop-alternativ/amplifiki.html',
    displayUrl: 'vinilkosmo-mp3.com/amplifiki',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Amplifiki (Svedio, Francio, Danio)',
    year: '1982-1990',
    languages: ['eo'],
    description: {
      eo: 'La historia pionira rokbando fondita en 1982 dum la IJK en Belgio, kiu naskis la modernan esperanto-muzikan movadon kaj kantis "Sola", "IS" kaj "Tute Ne Gravas".',
      es: 'La histórica banda pionera de rock fundada en 1982 en el IJK de Bélgica, creadora del movimiento musical moderno con himnos como "Sola" y "IS".',
      en: 'The trailblazing first Esperanto rock band formed in 1982 at the IJK in Belgium, launching modern Esperanto rock culture with anthems like "Sola".'
    },
    tags: ['amplifiki', 'pioniroj', 'roko', '1982', 'vinilkosmo', 'himnoj', 'musica'],
    features: {
      eo: ['La unua vera rokbando en Esperantujo', 'Naskis bandojn kiel Persone kaj Esperanto Desperado', 'Kanzonoj kantataj ĉe tendarfajroj tutmonde', 'Historiaj albumoj reeldonitaj en MP3'],
      es: ['La primera auténtica banda de rock de la cultura esperantista', 'De ella surgieron grupos como Persone y Esperanto Desperado', 'Himnos coreados en acampadas de todo el mundo', 'Álbumes históricos remasterizados'],
      en: ['The very first authentic rock band in Esperanto culture', 'Spawned subsequent powerhouse acts like Persone and Esperanto Desperado', 'Campfire sing-alongs sung at gatherings globally', 'Historic master albums remastered in digital format']
    }
  },
  {
    id: 'esperanto-desperado',
    title: 'Esperanto Desperado - Danca kaj Ritma Muziko',
    url: 'https://vinilkosmo-mp3.com/eo/balkan-ska-folk-kaj-regeo/esperanto-desperado.html',
    displayUrl: 'vinilkosmo-mp3.com/esperanto-desperado',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Kim J. Henriksen & Grupo',
    year: '1997-2005',
    languages: ['eo'],
    description: {
      eo: 'Populara dana-argentina bando kombinanta skaon, regeon, folkloron kaj rokon en tre energiaj kantoj kiel "Jen Venas Svislando" kaj "Hotel Desperado".',
      es: 'Aclamada banda danesa-argentina que fusiona ska, reggae, ritmos balcánicos y rock enérgico en éxitos como "Hotel Desperado".',
      en: 'Acclaimed Danish-Argentine band blending ska, reggae, folk, and infectious upbeat rock in danceable hits like "Hotel Desperado".'
    },
    tags: ['esperanto desperado', 'ska', 'regeo', 'danco', 'danio', 'argentino', 'ska'],
    features: {
      eo: ['Energia miksaĵo de skao, latinaj ritmoj kaj folkroko', 'Albumoj "Brokantaĵoj" kaj "Hotel Desperado"', 'Gvidata de Kim J. Henriksen (denaskulo el Danio)', 'Plej danciga bando en junularaj kongresoj'],
      es: ['Mezcla festiva de ska, cumbia, folk y rock latino', 'Álbumes superventas "Brokantaĵoj" y "Hotel Desperado"', 'Liderada por Kim Henriksen, hablante nativo danés', 'Banda fija de las fiestas en los IJK'],
      en: ['Festive blend of ska, Latin beats, and dance rock', 'Hit albums "Brokantaĵoj" and "Hotel Desperado"', 'Fronted by Danish native speaker Kim J. Henriksen', 'Crowd-favorite headliners at international youth festivals']
    }
  },
  {
    id: 'kaj-tiel-plu',
    title: 'Kaj Tiel Plu - Kataluna kaj Okcitana Tradicia Muziko',
    url: 'https://kajtielplu.esperanto.cat',
    displayUrl: 'kajtielplu.esperanto.cat',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Pau de Nut & Carles Vela (Barcelono)',
    year: '1989-2024',
    languages: ['ca', 'eo', 'es'],
    description: {
      eo: 'Konata kataluna grupo el Barcelono kantanta tradiciajn katalunajn, okcitanajn, sefardajn kaj renesancajn kantojn majstre tradukitajn en Esperanton.',
      es: 'Célebre grupo catalán de Barcelona que interpreta canciones tradicionales occitanas, sefardíes, renacentistas y catalanas en esperanto.',
      en: 'Renowned Catalan ensemble from Barcelona performing traditional Occitan, Sephardic, Renaissance, and Catalan songs in poetic Esperanto.'
    },
    tags: ['kaj tiel plu', 'katalunio', 'okcitanio', 'renesanco', 'tradicia', 'folk', 'musica tradicional'],
    features: {
      eo: ['Albumoj "Sojle de la Klara Temp\'", "Plaĉas al mi" kaj "Surplacen"', 'Akustikaj instrumentoj: gitaroj, mandolino, fluto kaj violonĉelo', 'Kantoj de la hispana milito kaj mezepokaj romancoj', 'Koncertoj en Eŭropo kaj Ameriko'],
      es: ['Álbumes emblemáticos "Sojle de la Klara Temp\'" y "Surplacen"', 'Instrumentación acústica: mandolina, laúd, flauta dulce y chelo', 'Canciones de la Guerra Civil y romances provenzales', 'Giras de conciertos por Europa y América'],
      en: ['Celebrated albums "Sojle de la Klara Temp\'" and "Surplacen"', 'Rich acoustic instrumentation: mandolin, lute, flute, and cello', 'Songs of the Spanish Civil War and Provencal ballads', 'Touring acts across Europe and the Americas']
    }
  },
  {
    id: 'jomo-kantisto',
    title: 'JoMo (Jean-Marc Leclercq) - La Rekordulo de Kantoj',
    url: 'https://jomo.free.fr',
    displayUrl: 'jomo.free.fr',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Jean-Marc Leclercq (Tuluzo, Francio)',
    languages: ['fr', 'eo', 'es', 'en'],
    description: {
      eo: 'La plej dinamika tuluza kantisto kaj spektaklisto, Guinness-rekordulo pro kantado en 22 lingvoj en ununura koncerto, gvidanto de tradiciaj kantejoj.',
      es: 'El cantante y showman más carismático de Toulouse, récord Guinness por cantar en 22 idiomas en un solo concierto y animador de verbenas.',
      en: 'The charismatic showman and singer from Toulouse, Guinness record holder for singing in 22 languages in a single set and festival entertainer.'
    },
    tags: ['jomo', 'tuluzo', 'guinness', 'rokmuziko', 'kantoj', 'francio', 'conciertos'],
    features: {
      eo: ['Albumoj "JoMo friponas", "JoMo kaj la Liberecanoj"', 'Miksaĵo de punko, tradicia franca kanzono kaj roko', 'Guinness-rekordo pri multlingva kantado', 'Grandiozaj koncertoj plenaj de publik-partopreno'],
      es: ['Álbumes como "JoMo friponas" y "JoMo kaj la Liberecanoj"', 'Fusión de punk-rock, chanson francesa y verbena popular', 'Récord oficial Guinness de canto políglota', 'Conciertos multitudinarios interactivos con el público'],
      en: ['Albums include "JoMo friponas" and "JoMo kaj la Liberecanoj"', 'High-octane fusion of punk, French chanson, and rock \'n\' roll', 'Official Guinness world record for multilingual performance', 'Massive sing-along audience participation']
    }
  },
  {
    id: 'la-perdita-generacio-bando',
    title: 'La Perdita Generacio (LPG) - Ekologia Roko',
    url: 'https://vinilkosmo-mp3.com/eo/rok-pop-alternativ/la-perdita-generacio.html',
    displayUrl: 'vinilkosmo-mp3.com/lpg',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Tomas Frejarö & Grupo (Svedio)',
    year: '2003-2024',
    languages: ['eo'],
    description: {
      eo: 'Sveda alternativa ekologia folk-rokbando kun profundaj, filozofiaj kaj mediprotektaj kantoj kiel "Ne Timu", "Plastika Ĉielo" kaj "Ĉu Vi Volas Danci?".',
      es: 'Banda sueca de folk-rock alternativo y ecologista con letras filosóficas y poéticas sobre la naturaleza, el cambio social y la libertad.',
      en: 'Swedish alternative eco-folk-rock band renowned for philosophical and ecological lyrics defending nature, social transformation, and freedom.'
    },
    tags: ['lpg', 'la perdita generacio', 'ekologio', 'svedio', 'folk-roko', 'alternativa', 'indie'],
    features: {
      eo: ['Albumoj "Eksplodu Malame", "Ĉu Ni Kunvenis Vane?"', 'Kantoj pri ekologio, amo kaj tutmonda libereco', 'Akustikaj kaj elektraj koncertoj tra la tuta mondo', 'Unu el la plej influaj modernaj bandoj'],
      es: ['Álbumes "Eksplodu Malame" y "Ĉu Ni Kunvenis Vane?"', 'Temas sobre protección ambiental, antibelicismo y comunidad', 'Conciertos acústicos y eléctricos en festivales de todo el mundo', 'Una de las bandas más influyentes del siglo XXI'],
      en: ['Albums include "Eksplodu Malame" and "Ĉu Ni Kunvenis Vane?"', 'Themes of environmental harmony, peace, and human empathy', 'Acoustic and electric shows across world festivals', 'Among the most influential modern Esperanto indie groups']
    }
  },
  {
    id: 'inicialoj-dc-muziko',
    title: 'Inicialoj dc - Elektronika kaj Sintezila Popo',
    url: 'https://inicialojdc.net',
    displayUrl: 'inicialojdc.net',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Éric Languillat (Frankfurto / Francio)',
    year: '2009-2024',
    languages: ['eo', 'en', 'fr'],
    description: {
      eo: 'La precipa projekto de elektronika sintezila popmuziko (synth-pop / indie electronic) en Esperanto, kun luksaj muzikfilmetoj kaj melancholiaj melodioj.',
      es: 'El principal exponente del synth-pop y la música electrónica en esperanto, con videoclips de estética cinematográfica y melodías envolventes.',
      en: 'The leading synth-pop and indie electronic project in Esperanto, acclaimed for cinematic music videos and atmospheric electronic melodies.'
    },
    tags: ['inicialoj dc', 'synthpop', 'elektronika', 'elektropopo', 'videofilmoj', 'musica electronica'],
    features: {
      eo: ['Albumoj "Urbano", "Signoj de Viv\'", "Fulmerford"', 'Altkvalitaj kinaj muzikfilmetoj en YouTube', 'Eleganta sintezila produktado', 'Koncertoj en Eŭropo, Azio kaj Ameriko'],
      es: ['Álbumes de culto "Urbano", "Signoj de Viv\'" y "Fulmerford"', 'Videoclips oficiales con cinematografía profesional', 'Producción sonora refinada de sintetizadores vintage', 'Giras por Europa, Asia y América'],
      en: ['Critically acclaimed albums "Urbano", "Signoj de Viv\'", and "Fulmerford"', 'Cinematographic official music videos on YouTube', 'Sleek vintage synthesizer production', 'Live tours spanning Europe, Asia, and the Americas']
    }
  },
  {
    id: 'jonny-m-regeo',
    title: 'Jonny M - Regeo kaj Dancmuziko',
    url: 'https://jonny-m.de',
    displayUrl: 'jonny-m.de',
    category: 'media',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Jonas Marx (Germanio)',
    year: '2011-2024',
    languages: ['eo', 'de'],
    description: {
      eo: 'Germana regeo- kaj danchala kantisto en Esperanto, plenplena de pozitiva energio, someraj ritmoj kaj kuraĝigaj mesaĝoj por junuloj.',
      es: 'Cantante de reggae y dancehall en esperanto, lleno de energía positiva, ritmos veraniegos y letras motivadoras para la juventud.',
      en: 'Energetic reggae and dancehall artist singing in Esperanto, packed with positive vibes, summery grooves, and uplifting lyrics.'
    },
    tags: ['jonny m', 'regeo', 'dancehall', 'pozitiva', 'somero', 'reggae', 'musica'],
    features: {
      eo: ['Albumoj "Regestilo", "Kreanto", "Vojago"', 'Senpage elŝuteblaj kantoj kaj muzikfilmetoj', 'Pozitiva etoso kaj facilaj memoreblaj refrenoj', 'Grandaj koncertoj en festivaloj'],
      es: ['Álbumes "Regestilo", "Kreanto" y "Vojago"', 'Música descargable y videoclips alegres', 'Estribillos pegadizos y mensaje positivo', 'Actuaciones multitudinarias en festivales juveniles'],
      en: ['Albums include "Regestilo", "Kreanto", and "Vojago"', 'Free music downloads and upbeat music videos', 'Catchy hooks and uplifting socially conscious lyrics', 'Massive live shows at youth festivals']
    }
  },
  {
    id: 'kajto-folko',
    title: 'Kajto - Nederlanda Marista kaj Popola Folko',
    url: 'https://vinilkosmo-mp3.com/eo/kanzono-tradikanta-akustika/kajto.html',
    displayUrl: 'vinilkosmo-mp3.com/kajto',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Nanne Kalma & Ankie van der Meer (Frislando)',
    year: '1988-2024',
    languages: ['fy', 'nl', 'eo'],
    description: {
      eo: 'Fama nederlanda kanta grupo el Frislando, kantanta maristajn kanzonojn, popolan poezion kaj tradiciajn kanonojn kun perfekta harmonio kaj akustiko.',
      es: 'Veterano grupo neerlandés de Frisia que interpreta canciones marineras, poesía tradicional y cánones polifónicos con armonías vocales impecables.',
      en: 'Famed Dutch acoustic folk group from Friesland, singing sea shanties, folk poetry, and polyphonic canons with pristine vocal harmonies.'
    },
    tags: ['kajto', 'folko', 'maristoj', 'nederlando', 'kanonoj', 'frislando', 'folk'],
    features: {
      eo: ['Albumoj "Kajto Fajfas", "Pro Kio?", "Tohuvabohu"', 'Multvoĉa harmonia korus-kantado', 'Instrumentoj: akordiono, violono, gitaro', 'Popularaj kanonoj facile lerneblaj por kursoj'],
      es: ['Álbumes como "Kajto Fajfas" y "Tohuvabohu"', 'Cantos corales marineros con arreglos polifónicos', 'Acordeón, violín y guitarra acústica', 'Cánones y rondas idóneas para clases y campamentos'],
      en: ['Albums include "Kajto Fajfas" and "Tohuvabohu"', 'Rich polyphonic maritime choral harmonies', 'Accordion, acoustic guitar, and fiddle instrumentation', 'Simple, joyful rounds and canons used in teaching']
    }
  },
  {
    id: 'jomart-kaj-natasa',
    title: 'Ĵomart kaj Nataŝa - Lirikaj Akustikaj Kanzonoj',
    url: 'https://jomart.net',
    displayUrl: 'jomart.net',
    category: 'media',
    level: 'all',
    isFree: false,
    format: 'website',
    author: 'Ĵomart Amzeel & Nataŝa Gerlaĥ (Kazaĥio / Svedio)',
    year: '1985-2024',
    languages: ['eo', 'sv', 'ru'],
    description: {
      eo: 'Lirika akustika duopo el Ŝimkento (Kazaĥio) nun loĝanta en Svedio, konata pro dolĉaj gitaraj melodioj, poeziaj tekstoj kaj amkantoj.',
      es: 'Dúo acústico originario de Kazajistán afincado en Suecia, célebre por sus baladas líricas de guitarra, poesía y canciones de amor.',
      en: 'Acoustic duo originating in Kazakhstan now based in Sweden, known for delicate guitar ballads, poetry, and love songs in Esperanto.'
    },
    tags: ['ĵomart', 'nataŝa', 'baladoj', 'gitaro', 'liriko', 'amkantoj', 'baladas'],
    features: {
      eo: ['Albumoj "Folkkantoj", "Amu Min", "Valso por Amikoj"', 'Sentemaj lirikaj kantoj por gitaro kaj du voĉoj', 'Koncertoj en pli ol 30 landoj', 'Publikigo de kantlibroj kun notoj'],
      es: ['Álbumes como "Folkkantoj", "Amu Min" y "Valso por Amikoj"', 'Baladas poéticas para guitarra acústica y armonía a dos voces', 'Conciertos en más de 30 países del mundo', 'Cancioneros con acordes y partituras'],
      en: ['Albums include "Folkkantoj", "Amu Min", and "Valso por Amikoj"', 'Poetic acoustic guitar arrangements and two-part vocal harmonies', 'Performances across 30+ nations', 'Songbooks with musical notation and guitar chords']
    }
  },

  // ========================================================
  // 5. METODAJ LERNOLIBROJ KAJ GRAMATIKOJ (ADVANCED COURSES & GRAMMARS)
  // ========================================================
  {
    id: 'pasoj-al-plena-posedo',
    title: 'Paŝoj al Plena Posedo (William Auld)',
    url: 'https://uea.org/libroservo/pasoj-al-plena-posedo',
    displayUrl: 'uea.org/pasoj-posedo',
    category: 'courses',
    level: 'B2',
    isFree: false,
    format: 'book',
    author: 'William Auld',
    year: '1968-2020',
    languages: ['eo'],
    description: {
      eo: 'La klasika supera legolibro kaj kurso por perfektigi la lingvaĵon de B1 al C1 per elektitaj beletraj specimenoj kaj lingvaj ekzercoj.',
      es: 'El curso superior y manual clásico de lectura para perfeccionar el idioma de nivel B1 a C1 mediante textos literarios selectos y ejercicios.',
      en: 'The classic advanced reader and workbook designed to propel learners from intermediate B1 to mastery C1 through selected literature.'
    },
    tags: ['william auld', 'perfektigo', 'b2', 'c1', 'legolibro', 'stilo', 'avanzado', 'ejercicios'],
    features: {
      eo: ['30 lecionoj kun tekstoj de la plej grandaj verkistoj', 'Gramatikaj demandoj kaj stilaj ekzercoj', 'Solvoj kaj vortaraj klarigoj', 'Ideala por prepari KER-ekzamenojn C1'],
      es: ['30 lecciones con fragmentos de los mejores autores de las letras', 'Cuestionarios gramaticales y ejercicios de redacción estilística', 'Clave de soluciones y notas léxicas', 'Ideal para preparar exámenes oficiales de nivel C1'],
      en: ['30 lessons featuring excerpts from premier literary stylists', 'Grammar analysis and nuanced writing exercises', 'Answer keys and lexical glossaries', 'Essential preparation for CEFR C1 exams']
    }
  },
  {
    id: 'vojago-en-esperanto-lando',
    title: 'Vojaĝo en Esperanto-Lando (Boris Kolker)',
    url: 'https://uea.org/libroservo/vojago-en-esperanto-lando',
    displayUrl: 'uea.org/vojago-kolker',
    category: 'courses',
    level: 'B2',
    isFree: false,
    format: 'book',
    author: 'Boris Kolker (Akademiano & Lingvisto)',
    year: '1992-2005',
    languages: ['eo', 'ru', 'en'],
    description: {
      eo: 'Perfektiĝa kurso kaj gvidlibro pri la kulturo, historio kaj komunumo de Esperanto, gvidanta la lernanton tra la tuta historio de la lingvo.',
      es: 'Manual de perfeccionamiento y guía integral sobre la cultura, historia y sociedad del esperanto, avalado por universidades.',
      en: 'An advanced mastery course and cultural guidebook exploring the heritage, literature, and living community of Esperanto.'
    },
    tags: ['boris kolker', 'perfektigo', 'kulturo', 'historio', 'b2', 'c1', 'cultura', 'avanzado'],
    features: {
      eo: ['26 profundaj lecionoj kun historiaj dokumentoj', 'Klarigoj de kulturo, kongresoj kaj proverboj', 'Gvidata kurso kun ekzamenoj', 'Atestiloj de internacia rekono'],
      es: ['26 lecciones exhaustivas con documentos históricos', 'Análisis de la cultura compartida, congresos y modismos', 'Curso tutorizado con autoevaluaciones', 'Reconocimiento internacional'],
      en: ['26 comprehensive lessons with historic documents', 'Covers culture, congress traditions, and proverbs', 'Tutored coursework with self-evaluations', 'Widely adopted university textbook']
    }
  },
  {
    id: 'complete-esperanto-teach-yourself',
    title: 'Complete Esperanto (Teach Yourself - Tim Owen)',
    url: 'https://library.teachyourself.com/id004325109/Complete-Esperanto',
    displayUrl: 'teachyourself.com/esperanto',
    category: 'courses',
    level: 'A1',
    isFree: false,
    format: 'book',
    author: 'Tim Owen & Judith Meyer',
    year: '2018',
    languages: ['en', 'eo'],
    description: {
      eo: 'La moderna eldono de la prestiĝa brita serio Teach Yourself, kun interagaj dialogoj, senpaga poŝtelefona audio kaj klara gramatiko de A1 ĝis B2.',
      es: 'La edición moderna de la célebre serie británica Teach Yourself, con diálogos dinámicos, audio móvil gratuito y gramática gradual hasta B2.',
      en: 'The modern edition in the prestigious Teach Yourself series, featuring contemporary dialogues, free mobile audio, and step-by-step progression to B2.'
    },
    tags: ['teach yourself', 'tim owen', 'kurso', 'audio', 'brita', 'manual', 'ingles'],
    features: {
      eo: ['Kovras la lingvon de A1 ĝis B2 laŭ la eŭropa kadro (CEFR)', 'Senpaga elŝutebla audio en poŝtelefono', 'Modernaj dialogoj pri vojaĝoj, teknologio kaj vivo', 'Klare strukturita por memlernantoj'],
      es: ['Cubre desde el nivel inicial A1 hasta el intermedio-alto B2', 'Audios gratuitos para móvil en la app de Teach Yourself', 'Diálogos actuales sobre tecnología, viajes y sociedad', 'Óptimo para estudio autodidacta'],
      en: ['Spans CEFR levels A1 to upper-intermediate B2', 'Free companion audio via the Teach Yourself mobile app', 'Contemporary dialogues on tech, travel, and society', 'Superb for self-directed study']
    }
  },
  {
    id: 'esperanto-per-rekta-metodo-marcek',
    title: 'Esperanto per Rekta Metodo (Stano Marček)',
    url: 'https://uea.org/libroservo/rekta-metodo-marcek',
    displayUrl: 'uea.org/marcek-rekta',
    category: 'courses',
    level: 'A1',
    isFree: false,
    format: 'book',
    author: 'Stano Marček (Akademiano)',
    year: '2007-2024',
    languages: ['eo'],
    description: {
      eo: 'Ilustrita lernolibro bazita sur la rekta metodo (sen traduko), eldonita en pli ol 40 naciaj lingvoj kaj vaste uzata en klasĉambroj tra la tuta mondo.',
      es: 'Manual ilustrado basado en el método directo sin traducción, publicado en más de 40 idiomas nacionales y ampliamente utilizado en escuelas de todo el mundo.',
      en: 'Illustrated textbook based on the direct method without translation, published in over 40 national editions and widely used in classrooms globally.'
    },
    tags: ['stano marcek', 'rekta metodo', 'bildoj', 'ilustrita', 'pedagogio', 'metodo directo'],
    features: {
      eo: ['Centoj da klarigaj desegnaĵoj', 'Lernado sen tradukado per rekta kunteksto', 'Disponeblaj instruaj lumbildoj por instruistoj', 'Tradukita en pli ol 40 lingvojn'],
      es: ['Cientos de viñetas e ilustraciones directas', 'Aprendizaje inmersivo sin traducción', 'Presentaciones y diapositivas de apoyo para docentes', 'Adaptado a más de 40 idiomas'],
      en: ['Hundreds of intuitive instructional line drawings', 'Immersive direct learning without translation', 'Teacher slideshows and classroom aids available', 'Published in more than 40 languages']
    }
  },
  {
    id: 'baza-radikaro-oficiala',
    title: 'Baza Radikaro Oficiala (BRO) - Akademio de Esperanto',
    url: 'https://www.akademio-de-esperanto.org/aktoj/aktoj2/bro.html',
    displayUrl: 'akademio-de-esperanto.org/bro',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Akademio de Esperanto',
    languages: ['eo'],
    description: {
      eo: 'La oficiala listo de la Akademio de Esperanto klasifikanta ĉiujn oficialajn radikojn en 9 frekvenc-grupojn laŭ ilia graveco kaj ofta uzo.',
      es: 'La lista oficial de la Academia de Esperanto que clasifica todas las raíces del idioma en 9 grupos según su frecuencia de uso y necesidad pedagógica.',
      en: 'The official frequency lexicon compiled by the Academy of Esperanto dividing official roots into 9 graded groups based on utility and frequency.'
    },
    tags: ['bro', 'akademio', 'radikoj', 'frekvenco', 'oficiala', 'vortprovizo', 'frecuencia', 'lexico'],
    features: {
      eo: ['Klasifiko de radikoj en 9 grupojn laŭ ofteco', 'Bazo por krei lernilojn kaj gradigitajn legolibrojn', 'Aprobita de la Akademio de Esperanto', 'Libere konsultebla enreta'],
      es: ['Clasificación científica de raíces en 9 niveles de frecuencia', 'Base pedagógica para elaborar libros de texto y lecturas graduadas', 'Aprobado formalmente por la Academia de Esperanto', 'Acceso online libre y gratuito'],
      en: ['Scientific categorization of roots across 9 frequency tiers', 'Standard foundation for coursebooks and graded readers', 'Formally approved by the Academy of Esperanto', 'Freely accessible online']
    }
  },

  // ========================================================
  // 6. VIDEO-KANALOJ KAJ AŬDVIDAĴOJ (VIDEO & CHANNELS)
  // ========================================================
  {
    id: 'pasporto-al-la-tuta-mondo',
    title: 'Pasporto al la Tuta Mondo (15-Epizoda Video-Serio)',
    url: 'https://www.youtube.com/playlist?list=PL43B80DE62F933A9D',
    displayUrl: 'youtube.com/pasporto-mondo',
    category: 'media',
    level: 'A1',
    isFree: true,
    format: 'video',
    author: 'ELNA (Esperanto-USA) & Paul Gubbins',
    year: '2002',
    languages: ['eo'],
    description: {
      eo: 'Fama 15-epizoda humura video-komedio speciale filmita kun profesiaj aktoroj por instrui Esperanton de nula nivelo per amuza rakonto.',
      es: 'Famosa comedia televisiva de 15 episodios protagonizada por actores profesionales, concebida para enseñar esperanto desde cero con mucho humor.',
      en: 'The acclaimed 15-episode comedy video series filmed with professional actors, designed to teach Esperanto from scratch through an entertaining storyline.'
    },
    tags: ['pasporto', 'video', 'komedio', 'aktoroj', '15 epizodoj', 'humur', 'serie'],
    features: {
      eo: ['15 plenaj epizodoj senpage en YouTube', 'Subtitoloj en Esperanto kaj naciaj lingvoj', 'Aktoroj el pluraj landoj kun diversaj akĉentoj', 'Lerniloj kaj ekzercoj por ĉiu epizodo'],
      es: ['15 episodios completos disponibles gratis en YouTube', 'Subtítulos en esperanto y español', 'Reparto internacional con variedad de acentos claros', 'Fichas pedagógicas de apoyo'],
      en: ['All 15 complete episodes free on YouTube', 'Subtitles in Esperanto and English', 'International cast with varied natural accents', 'Accompanying pedagogical worksheets']
    }
  },
  {
    id: 'mazi-en-gondolando',
    title: 'Mazi en Gondolando (BBC Esperanto-Versio)',
    url: 'https://www.youtube.com/results?search_query=mazi+en+gondolando',
    displayUrl: 'youtube.com/mazi-gondolando',
    category: 'media',
    level: 'A1',
    isFree: true,
    format: 'video',
    author: 'BBC & Esperanto-Tradukteamo',
    languages: ['eo'],
    description: {
      eo: 'La fama animacia lingvokurso de BBC pri la granda horloĝ-manĝanta monstro Mazi, la reĝo, princino Silvia kaj Bobo, plene dublita en Esperanton.',
      es: 'El famoso curso infantil de animación de la BBC protagonizado por el monstruo Muzzy que come relojes, doblado íntegramente al esperanto.',
      en: 'The classic BBC animated language course starring the clock-eating monster Muzzy, the King, Princess Sylvia, and Bob, fully dubbed in Esperanto.'
    },
    tags: ['mazi', 'muzzy', 'bbc', 'animacio', 'infanoj', 'desegnofilmo', 'dibujos'],
    features: {
      eo: ['Klara kaj malrapida elparolo ideala por komencantoj kaj infanoj', 'Plezura animacio kaj kantoj', 'Centoj da bazaj ĉiutagaj vortoj kaj esprimoj', 'Senpage spektebla en YouTube'],
      es: ['Pronunciación pausada y nítida perfecta para niños y principiantes', 'Canciones pegadizas y animación clásica', 'Cientos de expresiones básicas cotidianas', 'Disponible libremente en YouTube'],
      en: ['Clear, paced diction perfect for beginners and children', 'Catchy songs and classic animation', 'Hundreds of essential everyday expressions', 'Freely viewable on YouTube']
    }
  },
  {
    id: 'usone-persone-podkasto',
    title: 'Usone Persone - Podkasto el Nordameriko',
    url: 'https://usonepersone.com',
    displayUrl: 'usonepersone.com',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Hans Becklin & Rafa Nogueras',
    languages: ['eo'],
    description: {
      eo: 'Dinamika podkasto diskutanta politikon, vivon en Usono, teknologion kaj la Esperanto-movadon kun sprita kaj amika etoso.',
      es: 'Dinámico podcast que analiza la actualidad política, vida cotidiana en Norteamérica, tecnología y cultura con un tono distendido.',
      en: 'A dynamic podcast discussing current affairs, life in North America, tech trends, and Esperanto culture with engaging banter.'
    },
    tags: ['usone persone', 'podkasto', 'usono', 'politiko', 'teknologio', 'podcast'],
    features: {
      eo: ['Senfiltrilaj interesaj konversacioj pri modernaj temoj', 'Disponebla en Spotify, Apple Podcasts kaj rete', 'Klara kaj vigla parolo', 'Epizodoj regule eldonataj'],
      es: ['Conversaciones francas e interesantes sobre la sociedad actual', 'Disponible en las principales plataformas de podcasting', 'Dicción cuidada y fluida', 'Publicación periódica continua'],
      en: ['Candid, engaging conversations on modern society', 'Available across Spotify, Apple Podcasts, and web', 'Crisp natural speech delivery', 'Regularly released episodes']
    }
  },
  {
    id: 'verda-stacio-teatro',
    title: 'Verda Stacio (Radio-Dramoj kaj Aŭd-Teatro)',
    url: 'https://verda-stacio.com',
    displayUrl: 'verda-stacio.com',
    category: 'media',
    level: 'B1',
    isFree: true,
    format: 'podcast',
    author: 'Historia Ĉeĥa Radio & Moderna Arkivo',
    languages: ['eo'],
    description: {
      eo: 'La historia heredaĵo de la praga kaj brna radio-elsendejoj, kiuj ekde la 1930-aj jaroj elsendis profesiajn teatraĵojn kaj operojn en Esperanto.',
      es: 'El archivo histórico de las emisoras checas de Praga y Brno, que emitieron radioteatro y óperas en esperanto con actores profesionales.',
      en: 'The historical heritage of Prague and Brno radio stations, broadcasting professional audio-dramas and operas in Esperanto since the 1930s.'
    },
    tags: ['verda stacio', 'radioteatro', 'teatro', 'prago', 'dramoj', 'teatro', 'radio'],
    features: {
      eo: ['Profesiaj aktoroj el naciaj teatroj ludantaj en Esperanto', 'Dramoj de Karel Čapek, Shakespeare kaj Molière', 'Registraĵoj ciferecigitaj por senpaga aŭskultado', 'Unika kultura trezoro'],
      es: ['Actores consagrados interpretando obras maestras en esperanto', 'Dramas de Karel Čapek, Shakespeare y Molière', 'Grabaciones digitalizadas para escucha gratuita', 'Tesoro cultural del teatro sonoro'],
      en: ['Distinguished stage actors performing in fluent Esperanto', 'Plays by Karel Čapek, Shakespeare, and Molière', 'Digitized recordings available for free streaming', 'Unique gem of audio-drama history']
    }
  },

  // ========================================================
  // 7. WIKIPEDIA, TEKNOLOGIO & RETPROJEKTOJ (WIKI & OPEN TECH)
  // ========================================================
  {
    id: 'vikivortaro-esperanto',
    title: 'Vikivortaro en Esperanto (Wiktionary)',
    url: 'https://eo.wiktionary.org',
    displayUrl: 'eo.wiktionary.org',
    category: 'tools',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La libera reta vortaro de Vikimedio kun pli ol 150 000 kapvortoj, etimologioj, tradukoj kaj sonregistraĵoj de elparolo.',
      es: 'El diccionario libre de Wikimedia en esperanto con más de 150.000 términos, etimologías, traducciones y pronunciación en audio.',
      en: 'The free collaborative Wikimedia dictionary in Esperanto with over 150,000 entries, etymologies, translations, and spoken audio.'
    },
    tags: ['vikivortaro', 'wiktionary', 'difinoj', 'etimologio', 'prononco', 'diccionario libre'],
    features: {
      eo: ['Pli ol 150 000 difinoj kaj kapvortoj', 'Etimologiaj detaloj kaj radik-fontoj', 'Prononcaj sondosieroj por miloj da vortoj', 'Konektita al ĉiuj lingvoj de la mondo'],
      es: ['Más de 150.000 acepciones y entradas léxicas', 'Etimologías y raíces de origen', 'Archivos de audio con pronunciación auténtica', 'Interconectado con todas las lenguas de Wiktionary'],
      en: ['Over 150,000 definitions and lexical entries', 'Etymological roots and derivational histories', 'Audio recordings for thousands of terms', 'Cross-linked with worldwide Wiktionary languages']
    }
  },
  {
    id: 'vikicitaro-esperanto',
    title: 'Vikicitaro en Esperanto (Wikiquote)',
    url: 'https://eo.wikiquote.org',
    displayUrl: 'eo.wikiquote.org',
    category: 'literature',
    level: 'all',
    isFree: true,
    format: 'website',
    author: 'Vikimedia Komunumo',
    languages: ['eo'],
    description: {
      eo: 'Kolekto de famaj citaĵoj, proverboj, aforismoj kaj saĝdiroj el la tuta mondo tradukitaj kaj klasifikitaj en Esperanto.',
      es: 'Colección libre de citas célebres, refranes universales, aforismos y proverbios clasificados temáticamente en esperanto.',
      en: 'A free collection of famous quotes, world proverbs, aphorisms, and timeless sayings translated and organized in Esperanto.'
    },
    tags: ['vikicitaro', 'wikiquote', 'proverboj', 'citaĵoj', 'saĝo', 'citas', 'proverbios'],
    features: {
      eo: ['Proverbaro Esperanta de L.L. Zamenhof plene enretigita', 'Citaĵoj de filozofoj, sciencistoj kaj verkistoj', 'Serĉebla laŭ temoj kaj aŭtoroj', 'Libere uzebla por prelegoj kaj artikoloj'],
      es: ['Proverbaro Esperanta de L.L. Zamenhof íntegramente digitalizado', 'Citas de filósofos, científicos, cineastas y estadistas', 'Búsqueda por materias, personajes o épocas', 'Recurso excelente para discursos y ensayos'],
      en: ['L.L. Zamenhof\'s complete Proverbaro Esperanta accessible online', 'Quotations from thinkers, scientists, and world authors', 'Searchable by topic, person, and century', 'Superb source for essays and speeches']
    }
  },
  {
    id: 'openstreetmap-esperanto',
    title: 'OpenStreetMap en Esperanto (Mondomapo)',
    url: 'https://wiki.openstreetmap.org/wiki/Eo:Esperanto',
    displayUrl: 'wiki.openstreetmap.org/eo',
    category: 'projects',
    level: 'all',
    isFree: true,
    format: 'tool',
    author: 'OpenStreetMap Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La tutmonda kunlabora libera mapo de la planedo: esperantistoj aldonas oficialajn esperantlingvajn toponimojn por ĉiuj urboj, montoj kaj landoj.',
      es: 'El mapa libre y colaborativo del planeta: voluntarios añaden los nombres y topónimos en esperanto de todas las ciudades y países del mundo.',
      en: 'The collaborative open map of the world: volunteers contribute standardized Esperanto toponyms for cities, mountains, and nations globally.'
    },
    tags: ['openstreetmap', 'mapo', 'toponimoj', 'geografio', 'urboj', 'mapas', 'geografia'],
    features: {
      eo: ['Esperantaj nomoj por miloj da mondaj urboj kaj landoj', 'Uzebleco en GPS-aparatoj kaj navigiloj', 'Malfermita datumbazo libere elŝutebla', 'Kunlabora kartografio'],
      es: ['Toponimia normalizada para miles de ciudades y regiones', 'Utilizable en aplicaciones de navegación y GPS libres', 'Base de datos geoespacial de código abierto', 'Cartografía comunitaria'],
      en: ['Standardized Esperanto names for thousands of world cities', 'Usable on open GPS navigators and mobile apps', 'Open-source geospatial dataset', 'Collaborative community mapping']
    }
  },
  {
    id: 'vortle-ludo',
    title: 'Vortle / Vortedo (Wordle en Esperanto)',
    url: 'https://vortle.net',
    displayUrl: 'vortle.net',
    category: 'tools',
    level: 'A2',
    isFree: true,
    format: 'app',
    author: 'Esperanto-Programistoj',
    languages: ['eo'],
    description: {
      eo: 'La populara 5-litera vortludo adaptita por Esperanto: divenu la kaŝitan vorton en 6 provoj kun plena subteno por ĉapeletaj literoj.',
      es: 'La célebre palabra oculta de 5 letras adaptada al esperanto: adivina el término del día en 6 intentos con soporte de diacríticos.',
      en: 'The viral 5-letter word game adapted for Esperanto: deduce the secret daily root in 6 tries with full diacritic character support.'
    },
    tags: ['vortle', 'vortedo', 'wordle', 'ludo', 'vortprovizo', 'juego', 'vocabulario'],
    features: {
      eo: ['Nova kaŝita vorto ĉiutage', 'Subtenas ĉiujn esperantajn literojn (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ)', 'Bonega rapida leksika cerb-ekzerco', 'Senpage ludebla en retumilo'],
      es: ['Una palabra secreta nueva cada día', 'Soporta los caracteres especiales diacríticos', 'Excelente microejercicio mental de vocabulario diario', 'Juego web directo sin instalación'],
      en: ['A new secret word every single day', 'Full diacritic keyboard layout (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ)', 'Delightful quick daily vocabulary workout', 'Free in-browser play with zero installs']
    }
  },
  {
    id: 'telegramo-babilado',
    title: 'Telegramo.org - Centra Babilkatalogo',
    url: 'https://telegramo.org',
    displayUrl: 'telegramo.org',
    category: 'community',
    level: 'all',
    isFree: true,
    format: 'forum',
    author: 'Telegramo.org Komunumo',
    languages: ['eo'],
    description: {
      eo: 'La plej vasta katalogo de esperantaj Telegram-grupoj kaj kanaloj: trovu grupojn pri muziko, videoludoj, lingvistiko, veganismo, politiko kaj literaturo.',
      es: 'El catálogo exhaustivo de grupos y canales de Telegram en esperanto: salas temáticas de música, videojuegos, política, literatura y cocina.',
      en: 'The comprehensive directory of Esperanto Telegram groups and channels: find rooms dedicated to music, gaming, politics, literature, and cooking.'
    },
    tags: ['telegram', 'babilejoj', 'katalogo', 'grupoj', 'komunumo', 'chat', 'directorio'],
    features: {
      eo: ['Centoj da temaj grupoj ordigitaj laŭ kategorioj', 'Speciala grupo por komencantoj por ricevi tujan helpon', 'Voĉaj babilĉambroj aktivaj ĉiutage', 'Senpaga aliĝo al ajna grupo'],
      es: ['Cientos de grupos clasificados por materias', 'Salas de consulta inmediata para principiantes', 'Canales de audio en directo para practicar conversación', 'Acceso directo a cualquier comunidad'],
      en: ['Hundreds of themed channels sorted by category', 'Dedicated beginner rooms with active tutors', 'Daily live voice chat lounges for spoken fluency', 'Instant one-click join links']
    }
  },
  {
    id: 'apertium-esperanto',
    title: 'Apertium - Malferma Regula Maŝintradukilo',
    url: 'https://www.apertium.org',
    displayUrl: 'apertium.org',
    category: 'tools',
    level: 'B1',
    isFree: true,
    format: 'tool',
    author: 'Universitato de Alakanto (Universitat d\'Alacant)',
    languages: ['ca', 'es', 'eo', 'en', 'fr'],
    description: {
      eo: 'Regulo-bazita malfermfonta maŝintraduka platformo disvolvita en la Universitato de Alakanto, speciale forta inter Esperanto, la kataluna kaj la hispana.',
      es: 'Plataforma de traducción automática libre basada en reglas desarrollada por la Universidad de Alicante, con excelente rendimiento entre catalán, español y esperanto.',
      en: 'An open-source rule-based machine translation platform created at the University of Alicante, uniquely strong for Esperanto, Catalan, and Spanish pairs.'
    },
    tags: ['apertium', 'maŝintraduko', 'alakanto', 'kataluna', 'hispana', 'traductor', 'software libre'],
    features: {
      eo: ['Regulo-bazita preciza gramatika tradukado', 'Bonega por paroj Esperanto-Kataluna kaj Esperanto-Hispana', 'Tute malferma kodo kaj datumbazoj', 'Senkosta uzo enreta aŭ loka'],
      es: ['Traducción gramatical de alta precisión basada en reglas', 'Rendimiento sobresaliente en combinaciones español-esperanto y catalán-esperanto', 'Código abierto y libre de licencias restrictivas', 'Uso web gratuito y descargable'],
      en: ['High-precision rule-based grammatical translation', 'Outstanding performance for Spanish-Esperanto and Catalan-Esperanto', 'Completely open-source and free of vendor lock-in', 'Free online or offline command-line tool']
    }
  }
];
