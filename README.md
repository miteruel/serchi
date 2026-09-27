<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1f685933-e473-4c77-9a87-e5e3f760bab5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Node.js 22.13 or later is required (the server uses the built-in `node:sqlite`).

## Data: SQLite database

The Esperanto resources ("links") and the knowledge panels live in the SQLite
database [`data/serchi.db`](data/serchi.db) (schema in [`data/schema.sql`](data/schema.sql)).
The Express server reads it and exposes it to the React app:

| Method | Route | |
|---|---|---|
| GET | `/api/resources` | all resources |
| GET | `/api/knowledge` | knowledge panels |
| POST | `/api/resources` | add one resource (409 if the URL already exists) |
| POST | `/api/resources/batch` | add several resources, skipping duplicates |

Resources added from the web are saved in the database, so every visitor sees them.
Set `SERCHI_DB=/path/to/file.db` to use another database file (for example, so
testing does not modify the committed one).

Scripts:

- `npm run db:import -- --resources links.json [--knowledge panels.json] [--source curated|user|crawled] [--reset]`:
  loads a JSON array of resources into the database, skipping duplicated URLs. This
  is the script that migrated the original `src/data/*.ts` files to SQLite (see the
  comment at the top of [`scripts/db-import.ts`](scripts/db-import.ts)).
- `npm run db:export -- [--out dir]`: dumps the database to `resources.json` and
  `knowledge.json` (default `data/export/`), handy for reviewing or editing by hand.

## Delphi + WebStencils + HTMX version

The [`delphi/`](delphi/README.md) folder contains a server-rendered version of the same
site built with Delphi WebBroker, WebStencils templates and HTMX. It reads the same
SQLite database; UI translations and forum seed data are exported to JSON with
`npm run export:delphi`.

## Historia del proyecto

Serĉilo es un buscador de recursos en esperanto (cursos, diccionarios, noticias,
literatura, radio, comunidad…) de **Liberanimo Teruel**, el grupo esperantista de
Teruel. Todo lo que sigue ocurrió el 27 de septiembre de 2026; entre paréntesis, los
PR y commits correspondientes.

1. **Origen en Google AI Studio** (`29f5106`, `e2b5c87`). Antonio Alcázar crea la
   aplicación con AI Studio: una web React + Vite, con un servidor Express que usa
   Gemini con búsqueda de Google para descubrir enlaces en vivo. Incluye 300 recursos
   en ficheros TypeScript, paneles de conocimiento, un foro simulado, favoritos y la
   interfaz en esperanto, español e inglés.
2. **Puesta a punto para ejecutarla en local**
   ([#1](https://github.com/miteruel/serchi/pull/1)). Se corrigen un conflicto de
   dependencias de esbuild y la carga de `.env.local`.
3. **Versión Delphi + WebStencils + HTMX**
   ([#2](https://github.com/miteruel/serchi/pull/2)). Se añade en [`delphi/`](delphi/README.md)
   una segunda versión del sitio, renderizada en el servidor con Delphi WebBroker y
   plantillas WebStencils, y con HTMX para la búsqueda en vivo, el foro y los
   favoritos, sin React.
4. **Identidad de Liberanimo Teruel**
   ([#3](https://github.com/miteruel/serchi/pull/3)). El logotipo del grupo sustituye a
   la estrella genérica y la web indica expresamente que es de Liberanimo Teruel, en
   los tres idiomas.
5. **Migración de los datos a SQLite**
   ([#4](https://github.com/miteruel/serchi/pull/4)). Los enlaces y los paneles pasan de
   los ficheros `.ts` a `data/serchi.db`, que comparten las versiones Node y Delphi. La
   migración se hizo con `scripts/db-import.ts`, que queda como herramienta de carga.
   En el proceso apareció un enlace duplicado (Reddit r/Esperanto), así que quedaron 299.
6. **Ampliación a más de 500 enlaces** (`7b9ecf3` … `11473ff`). Se añaden 204 enlaces
   en cuatro tandas (`data/imports/2026-09-enlaces-*.json`), con especial atención a
   cursos, herramientas, literatura y recursos en español, incluidos artículos sobre la
   historia del esperanto en Teruel y Aragón. Cada URL se tomó de resultados reales de
   búsqueda web; ninguna se escribió de memoria.
7. **Sección de radio con reproductor en línea** (`17a84c9`). Nueva categoría *Radio*
   con 36 emisoras y programas (hoy 34, tras la revisión del paso 8: Muzaiko, Pola Retradio, Radio Vaticano, 3ZZZ, Radio
   Havano Kubo, China Radio International, Radio Brazila Esperanto…). Las que tienen
   una fuente verificada se pueden escuchar sin salir de la web:
   - reproductores oficiales de Spotify y Zeno.FM;
   - feeds de pódcast leídos por el servidor.

   La barra del reproductor sigue sonando mientras se navega.

8. **Revisión de los enlaces originales.** Los 299 enlaces heredados de AI Studio se
   comprobaron uno a uno con búsquedas restringidas a su dominio. Resultado:
   - 113 correctos;
   - 67 con la dirección corregida;
   - 73 eliminados: no existían, estaban duplicados o sus dominios ya no son de
     esperanto (spam, un gimnasio, una web de apuestas…);
   - 46 pendientes de revisar.

   El detalle está en [`data/audits/2026-09-revision-enlaces-originales.md`](data/audits/2026-09-revision-enlaces-originales.md).
   De paso se añadieron 35 enlaces reales encontrados durante la revisión
   (`data/imports/2026-09-enlaces-5.json`), entre ellos dos noticias sobre la app de
   Liberanimo. La base de datos queda con 489 enlaces.

### Pendiente y limitaciones conocidas

- **Enlaces por revisar:** quedan 46 enlaces originales por comprobar; la lista está en
  el informe de revisión.
- **Versión Delphi sin compilar:** no se ha compilado todavía con RAD Studio (ver
  [`delphi/README.md`](delphi/README.md)).
- **Foro sin base de datos:** el foro sigue sin guardarse en la base de datos (en el
  navegador en la versión React y en memoria en la versión Delphi).
