import { KnowledgePanel } from '../types';

export const KNOWLEDGE_PANELS: KnowledgePanel[] = [
  {
    id: 'esperanto-lingvo',
    keywords: ['esperanto', 'lingvo', 'zamenhofa', 'internacia lingvo', 'idioma esperanto', 'esperanto language'],
    title: 'Esperanto',
    subtitle: {
      eo: 'Internacia planlingvo kreita en 1887',
      es: 'Lengua auxiliar internacional creada en 1887',
      en: 'International auxiliary constructed language created in 1887'
    },
    description: {
      eo: 'Esperanto estas la plej vaste parolata internacia planlingvo en la mondo. Ĝin iniciatis la pola okulkuracisto L.L. Zamenhof en 1887 por faciligi justan, senantaŭjuĝan kaj amikan komunikadon inter parolantoj de diversaj denaskaj lingvoj.',
      es: 'El esperanto es la lengua planificada internacional más hablada del mundo. Fue creada en 1887 por el oftalmólogo polaco L.L. Zamenhof con el fin de facilitar una comunicación justa, neutral y fraterna entre personas de diferentes pueblos.',
      en: 'Esperanto is the most widely spoken international constructed language in the world. It was initiated in 1887 by Polish ophthalmologist L.L. Zamenhof to enable fair, neutral, and friendly communication between people of different mother tongues.'
    },
    facts: [
      {
        label: { eo: 'Kreinto', es: 'Creador', en: 'Creator' },
        value: 'L. L. Zamenhof (Doktoro Esperanto)'
      },
      {
        label: { eo: 'Jaro de publikigo', es: 'Año de publicación', en: 'First published' },
        value: '1887 (Unua Libro, Varsovio)'
      },
      {
        label: { eo: 'Gramatikaj reguloj', es: 'Reglas gramaticales', en: 'Grammar rules' },
        value: '16 fundamentaj reguloj sen esceptoj'
      },
      {
        label: { eo: 'Alfabeto', es: 'Alfabeto', en: 'Alphabet' },
        value: '28 literoj (kun ĉ, ĝ, ĥ, ĵ, ŝ, ŭ)'
      },
      {
        label: { eo: 'Parolantoj', es: 'Hablantes estimados', en: 'Estimated speakers' },
        value: '1 000 000 – 2 000 000 tutmonde'
      },
      {
        label: { eo: 'Simbolo', es: 'Símbolo', en: 'Symbol' },
        value: 'Verda Stelo (⭐️ kvinpinta stelo de espero)'
      }
    ],
    links: [
      { title: 'Vikipedio: Esperanto', url: 'https://eo.wikipedia.org/wiki/Esperanto' },
      { title: 'Esperanto.net', url: 'https://esperanto.net' },
      { title: 'Universala Esperanto-Asocio', url: 'https://uea.org' }
    ]
  },
  {
    id: 'zamenhof-biografio',
    keywords: ['zamenhof', 'doktoro esperanto', 'ludoviko', 'l.l. zamenhof', 'leizer'],
    title: 'L. L. Zamenhof',
    subtitle: {
      eo: 'Iniciatinto de Esperanto, okulkuracisto kaj verkisto (1859–1917)',
      es: 'Iniciador del esperanto, oftalmólogo y escritor (1859–1917)',
      en: 'Initiator of Esperanto, ophthalmologist and writer (1859–1917)'
    },
    description: {
      eo: 'Ludoviko Lazaro Zamenhof naskiĝis en Bjalistoko (tiam en la Rusa Imperio). Vidante la profundan malpacon inter la diversaj etnaj grupoj (rusoj, poloj, judoj, germanoj), li dediĉis sian vivon al kreado de neŭtrala ponto-lingvo por paco inter popoloj.',
      es: 'Ludwik Lejzer Zamenhof nació en Białystok. Al presenciar los constantes conflictos entre las comunidades étnicas de su ciudad, consagró sus esfuerzos a crear una lengua puente neutral para fomentar la concordia y el entendimiento mundial.',
      en: 'Ludwik Lejzer Zamenhof was born in Białystok. Witnessing constant strife among ethnic communities in his hometown, he dedicated his life to crafting a neutral bridge language to promote world peace and human fraternity.'
    },
    facts: [
      {
        label: { eo: 'Naskiĝo', es: 'Nacimiento', en: 'Born' },
        value: '15-a de decembro 1859 (Zamenhof-Tago / Tago de la Esperanto-Libro)'
      },
      {
        label: { eo: 'Forpaso', es: 'Fallecimiento', en: 'Died' },
        value: '14-a de aprilo 1917 (Varsovio)'
      },
      {
        label: { eo: 'Profesio', es: 'Profesión', en: 'Profession' },
        value: 'Okulkuracisto, lingvisto, verkisto kaj tradukisto'
      },
      {
        label: { eo: 'Grava filozofio', es: 'Ideología humanista', en: 'Humanist philosophy' },
        value: 'Homaranismo (universala homamo)'
      }
    ],
    links: [
      { title: 'Vikipedio: L. L. Zamenhof', url: 'https://eo.wikipedia.org/wiki/L._L._Zamenhof' },
      { title: 'Zamenhofa retejo', url: 'https://zamenhof.info' }
    ]
  },
  {
    id: 'pmeg-panel',
    keywords: ['pmeg', 'gramatiko', 'bertilo', 'akuzativo', 'sintakso', 'gramatica', 'grammar'],
    title: 'PMEG (Gramatiko)',
    subtitle: {
      eo: 'Plena Manlibro de Esperanta Gramatiko',
      es: 'Manual Completo de Gramática del Esperanto',
      en: 'Complete Handbook of Esperanto Grammar'
    },
    description: {
      eo: 'PMEG estas la plej moderna, vasta kaj fidinda referenclibro pri la gramatiko de Esperanto. Verkata de Bertilo Wennergren ekde la 1990-aj jaroj, ĝi klarigas ĉiun fenomenon per facila, praktika lingvaĵo.',
      es: 'PMEG es el manual moderno de referencia más respetado y consultado sobre la gramática del esperanto. Obra del lingüista y académico Bertilo Wennergren, explica con claridad y rigor cada aspecto de la lengua.',
      en: 'PMEG is the premier modern grammatical reference work for Esperanto. Written by linguist and Academy member Bertilo Wennergren, it resolves linguistic queries in clear, approachable language.'
    },
    facts: [
      {
        label: { eo: 'Aŭtoro', es: 'Autor', en: 'Author' },
        value: 'Bertilo Wennergren'
      },
      {
        label: { eo: 'Statuso', es: 'Estado', en: 'Status' },
        value: 'Reta senpaga referenco + presita libro'
      },
      {
        label: { eo: 'Precipa trajto', es: 'Característica clave', en: 'Key feature' },
        value: 'Klarigoj per facila Esperanto sen latina faka terminaro'
      }
    ],
    links: [
      { title: 'Reta PMEG', url: 'https://bertilow.com/pmeg/' }
    ]
  },
  {
    id: 'akuzativo-panel',
    keywords: ['akuzativo', 'akuzativon', 'finaĵo n', 'la n', 'n-finaĵo', 'acusativo', 'accusative'],
    title: 'La Akuzativo (-N)',
    subtitle: {
      eo: 'La objekta kazo en Esperanto',
      es: 'El caso acusativo en esperanto',
      en: 'The accusative case in Esperanto'
    },
    description: {
      eo: 'En Esperanto, la finaĵo "-n" indikas la rektan objekton de ago (ekz. "Mi vidas la hundon"), direkton de moviĝo ("Mi iras en la domon"), aŭ tempodaŭron/mezuron ("Mi atendis tutan horon"). Ĉi tio donas flekseblan vortordon sen perdo de klareco.',
      es: 'En esperanto, la desinencia "-n" marca el objeto directo ("Mi vidas la hundon" = Veo al perro), la dirección de movimiento ("al interior de"), o la duración temporal. Esto permite un orden de palabras libre y expresivo con total precisión.',
      en: 'In Esperanto, the ending "-n" marks the direct object ("Mi vidas la hundon" = I see the dog), direction of motion into a space, or duration/measure. This affords flexible sentence word order with complete semantic clarity.'
    },
    facts: [
      {
        label: { eo: 'Finaĵo', es: 'Terminación', en: 'Suffix' },
        value: '-n (por substantivoj, adjektivoj kaj pronomoj)'
      },
      {
        label: { eo: 'Ĉefaj uzoj', es: 'Usos principales', en: 'Primary uses' },
        value: 'Rekta objekto, movdirekto, tempa daŭro, mezuro'
      }
    ],
    links: [
      { title: 'PMEG: Rolvorteto N', url: 'https://bertilow.com/pmeg/gramatiko/rolmontriloj/n/' }
    ]
  },
  {
    id: 'pasporta-panel',
    keywords: ['pasporta servo', 'pasporto', 'gastoj', 'gastigado', 'couchsurfing', 'viajar'],
    title: 'Pasporta Servo',
    subtitle: {
      eo: 'Tutmonda gastiga reto por esperantistoj ekde 1974',
      es: 'Red mundial de hospitalidad para esperantistas desde 1974',
      en: 'Worldwide hospitality exchange network for Esperantists since 1974'
    },
    description: {
      eo: 'Pasporta Servo estas senpaga gastiga servo organizata de TEJO. Esperanto-parolantoj povas gastiĝi en la hejmoj de lokaj esperantistoj en pli ol 90 landoj tra la tuta mondo.',
      es: 'Pasporta Servo es una red pionera de hospitalidad gestionada por TEJO. Permite a cualquier hablante de esperanto alojarse gratuitamente en casa de otros esperantistas en más de 90 países.',
      en: 'Pasporta Servo is a pioneering hospitality network maintained by TEJO. It allows Esperanto speakers to stay for free as guests in the homes of fellow speakers in over 90 countries.'
    },
    facts: [
      {
        label: { eo: 'Fondojaro', es: 'Año de fundación', en: 'Founded' },
        value: '1974'
      },
      {
        label: { eo: 'Organizo', es: 'Organización', en: 'Organization' },
        value: 'TEJO (Tutmonda Esperantista Junulara Organizo)'
      },
      {
        label: { eo: 'Kosto', es: 'Coste', en: 'Cost' },
        value: '100% Senpaga por amikaj gastoj'
      }
    ],
    links: [
      { title: 'Retejo de Pasporta Servo', url: 'https://pasportaservo.org' }
    ]
  }
];
