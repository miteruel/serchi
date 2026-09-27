# Grabaciones del minicurso

Lista generada por `npm run audio:manifest`: todas las palabras y frases en esperanto
del minicurso «Esperanto en 7 tagoj» y el nombre que debe tener cada grabación.
Las que ya existen llevan ✅. En la página solo aparece el botón 🔊 junto a las que
tienen grabación, así que se pueden ir añadiendo poco a poco.

Hay dos formas de añadir grabaciones:

- **Desde la web**, en la página *Graba el minicurso* (`/grabar.html` en la web):
  cualquiera puede grabar con el micrófono y un moderador
  aprueba cada grabación antes de que suene en el curso. Se guardan en la base de
  datos, no en esta carpeta, y no aparecen en la tabla de abajo.
- **Como ficheros MP3** en el repositorio, siguiendo los pasos siguientes. Si una
  palabra tiene las dos, suena el fichero MP3.

Mientras nadie graba una palabra, suena una **voz sintética** (espeak-ng) guardada en
`public/audio/tts/`. Se regenera con `npm run audio:tts` (hacen falta espeak-ng y
ffmpeg) y deja de sonar en cuanto la palabra tiene una grabación de verdad.

## Cómo grabar ficheros MP3

1. Graba cada palabra o frase por separado, despacio y con claridad, como se la dirías
   a un niño. Deja medio segundo de silencio al principio y al final. Sirve el móvil
   (una app de notas de voz) en una habitación sin eco.
2. Guárdala en **MP3** con el nombre de la tabla, en la carpeta `public/audio/`. Si la
   app graba en otro formato (m4a, ogg…), conviértela con Audacity o con
   `ffmpeg -i entrada.m4a -ac 1 -b:a 64k nombre.mp3`.
3. Ejecuta `npm run audio:manifest` para actualizar la lista de grabaciones de la
   página y esta tabla, y súbelo todo al repositorio.

Ficheros MP3: **0 de 134**.

| | Esperanto | Fichero |
|---|---|---|
| — | Saluton! | `saluton.mp3` |
| — | Bonan tagon! | `bonan-tagon.mp3` |
| — | Bonan nokton! | `bonan-nokton.mp3` |
| — | Dankon! | `dankon.mp3` |
| — | Bonvolu | `bonvolu.mp3` |
| — | Jes / Ne | `jes-ne.mp3` |
| — | Ĝis revido! | `gxis-revido.mp3` |
| — | Ĝis! | `gxis.mp3` |
| — | cent | `cent.mp3` |
| — | ĉokolado | `cxokolado.mp3` |
| — | geografio | `geografio.mp3` |
| — | ĝardeno | `gxardeno.mp3` |
| — | hundo | `hundo.mp3` |
| — | ĥoro | `hxoro.mp3` |
| — | jes | `jes.mp3` |
| — | ĵurnalo | `jxurnalo.mp3` |
| — | ŝipo | `sxipo.mp3` |
| — | aŭto | `auxto.mp3` |
| — | zebro | `zebro.mp3` |
| — | mi | `mi.mp3` |
| — | vi | `vi.mp3` |
| — | li | `li.mp3` |
| — | ŝi | `sxi.mp3` |
| — | ĝi | `gxi.mp3` |
| — | ni | `ni.mp3` |
| — | ili | `ili.mp3` |
| — | estas | `estas.mp3` |
| — | Mi estas Ana. | `mi-estas-ana.mp3` |
| — | Li estas knabo. | `li-estas-knabo.mp3` |
| — | Ŝi estas knabino. | `sxi-estas-knabino.mp3` |
| — | Kiel vi fartas? | `kiel-vi-fartas.mp3` |
| — | Mi fartas bone. | `mi-fartas-bone.mp3` |
| — | Mi nomiĝas… | `mi-nomigxas.mp3` |
| — | Saluton! Mi nomiĝas… | `saluton-mi-nomigxas.mp3` |
| — | kato | `kato.mp3` |
| — | birdo | `birdo.mp3` |
| — | domo | `domo.mp3` |
| — | arbo | `arbo.mp3` |
| — | libro | `libro.mp3` |
| — | knabo | `knabo.mp3` |
| — | amiko | `amiko.mp3` |
| — | granda | `granda.mp3` |
| — | malgranda | `malgranda.mp3` |
| — | bela | `bela.mp3` |
| — | bona | `bona.mp3` |
| — | nova | `nova.mp3` |
| — | feliĉa | `felicxa.mp3` |
| — | la | `la.mp3` |
| — | mia | `mia.mp3` |
| — | granda libro | `granda-libro.mp3` |
| — | bela kato | `bela-kato.mp3` |
| — | unu | `unu.mp3` |
| — | du | `du.mp3` |
| — | tri | `tri.mp3` |
| — | kvar | `kvar.mp3` |
| — | kvin | `kvin.mp3` |
| — | ses | `ses.mp3` |
| — | sep | `sep.mp3` |
| — | ok | `ok.mp3` |
| — | naŭ | `naux.mp3` |
| — | dek | `dek.mp3` |
| — | dek unu | `dek-unu.mp3` |
| — | dudek | `dudek.mp3` |
| — | dudek tri | `dudek-tri.mp3` |
| — | ruĝa | `rugxa.mp3` |
| — | oranĝa | `orangxa.mp3` |
| — | flava | `flava.mp3` |
| — | verda | `verda.mp3` |
| — | blua | `blua.mp3` |
| — | violkolora | `violkolora.mp3` |
| — | nigra | `nigra.mp3` |
| — | blanka | `blanka.mp3` |
| — | bruna | `bruna.mp3` |
| — | rozkolora | `rozkolora.mp3` |
| — | tri ruĝaj pomoj | `tri-rugxaj-pomoj.mp3` |
| — | Kiom da balonoj? | `kiom-da-balonoj.mp3` |
| — | manĝi | `mangxi.mp3` |
| — | trinki | `trinki.mp3` |
| — | ludi | `ludi.mp3` |
| — | legi | `legi.mp3` |
| — | dormi | `dormi.mp3` |
| — | kuri | `kuri.mp3` |
| — | vidi | `vidi.mp3` |
| — | ami | `ami.mp3` |
| — | hieraŭ | `hieraux.mp3` |
| — | Mi ludis. | `mi-ludis.mp3` |
| — | hodiaŭ | `hodiaux.mp3` |
| — | Mi ludas. | `mi-ludas.mp3` |
| — | morgaŭ | `morgaux.mp3` |
| — | Mi ludos. | `mi-ludos.mp3` |
| — | mi manĝas, vi manĝas, ili manĝas | `mi-mangxas-vi-mangxas-ili-mangxas.mp3` |
| — | Mi manĝas pomon. | `mi-mangxas-pomon.mp3` |
| — | La kato vidas la birdon. | `la-kato-vidas-la-birdon.mp3` |
| — | akvo | `akvo.mp3` |
| — | Mi manĝas… | `mi-mangxas.mp3` |
| — | patro | `patro.mp3` |
| — | patrino | `patrino.mp3` |
| — | frato | `frato.mp3` |
| — | fratino | `fratino.mp3` |
| — | avo | `avo.mp3` |
| — | avino | `avino.mp3` |
| — | filo | `filo.mp3` |
| — | gepatroj | `gepatroj.mp3` |
| — | gepatroj, geavoj | `gepatroj-geavoj.mp3` |
| — | varma | `varma.mp3` |
| — | patro, patrino, frato… | `patro-patrino-frato.mp3` |
| — | Kio? | `kio.mp3` |
| — | Kiu? | `kiu.mp3` |
| — | Kie? | `kie.mp3` |
| — | Kiam? | `kiam.mp3` |
| — | Kial? | `kial.mp3` |
| — | Kiel? | `kiel.mp3` |
| — | Kiom? | `kiom.mp3` |
| — | ŝati | `sxati.mp3` |
| — | Ĉu | `cxu.mp3` |
| — | Ĉu vi ŝatas katojn? | `cxu-vi-sxatas-katojn.mp3` |
| — | Jes, mi ŝatas katojn! | `jes-mi-sxatas-katojn.mp3` |
| — | Saluton! Kiel vi nomiĝas? | `saluton-kiel-vi-nomigxas.mp3` |
| — | Mi nomiĝas Lucía. Kaj vi? | `mi-nomigxas-lucia-kaj-vi.mp3` |
| — | Mi nomiĝas Pablo. Kie vi loĝas? | `mi-nomigxas-pablo-kie-vi-logxas.mp3` |
| — | Mi loĝas en Teruelo. | `mi-logxas-en-teruelo.mp3` |
| — | Ĉu vi ŝatas ludi? | `cxu-vi-sxatas-ludi.mp3` |
| — | Jes! Ni ludu kune! | `jes-ni-ludu-kune.mp3` |
| — | Ni ludu! | `ni-ludu.mp3` |
| — | Venu! | `venu.mp3` |
| — | Kiel vi nomiĝas? | `kiel-vi-nomigxas.mp3` |
| — | Kie vi loĝas? | `kie-vi-logxas.mp3` |
| — | Ĉu vi ŝatas hundojn? | `cxu-vi-sxatas-hundojn.mp3` |
| — | Kiom da katoj vi havas? | `kiom-da-katoj-vi-havas.mp3` |
| — | havi | `havi.mp3` |
| — | rapida | `rapida.mp3` |
| — | mi estas, vi estas, ŝi estas | `mi-estas-vi-estas-sxi-estas.mp3` |
| — | mi manĝas, vi manĝas, ŝi manĝas | `mi-mangxas-vi-mangxas-sxi-mangxas.mp3` |
| — | La birdon vidas la kato | `la-birdon-vidas-la-kato.mp3` |
