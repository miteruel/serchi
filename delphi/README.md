# Serĉilo · versión Delphi + WebStencils + HTMX

Versión del buscador Serĉilo escrita en **Delphi** con **WebBroker**, plantillas
**WebStencils** (Delphi 12.2+) y **HTMX** para la interactividad. Todo el HTML se
genera en el servidor; HTMX sustituye fragmentos de la página sin recargarla, por lo
que no hay React, ni paso de *build*, ni estado en el navegador más allá de unas cookies.

Lee los enlaces, los paneles de conocimiento y el foro de la **misma base de datos
SQLite** que la versión React (`data/serchi.db`, en la raíz del repositorio) usando
FireDAC. Los enlaces que se añaden desde la web y todo lo que se hace en el foro se
guardan en esa base de datos. Las traducciones EO/ES/EN y los sinónimos se exportan a
JSON en `delphi/data/`.

## Requisitos

- Delphi **12.2 Athens** o posterior (la unidad `Web.Stencils` apareció en 12.2).
- Indy y FireDAC con el driver SQLite (incluidos con Delphi).
- Opcional: variable de entorno `GEMINI_API_KEY` para el descubrimiento de enlaces en
  vivo con Gemini + Google Search.

## Compilar y ejecutar

1. Abre `delphi/SerchiWeb.dpr` en RAD Studio (se creará el `.dproj`) y compila para
   Win64 (o Linux64).
2. Ejecuta `SerchiWeb.exe [puerto]` (por defecto `8080`, o la variable `PORT`).
3. Abre <http://localhost:8080>.

El ejecutable busca las carpetas `templates/`, `static/` y `data/` subiendo desde la
carpeta del `.exe` (p. ej. `Win64\Debug\`), o en la ruta indicada por `SERCHI_HOME`.
La base de datos se busca en `../data/serchi.db` (junto a `schema.sql`) o en la ruta
de la variable `SERCHI_DB`. Las versiones Node y Delphi pueden usar el mismo fichero a
la vez y cada una ve enseguida lo que escribe la otra.

## Estructura

```
delphi/
├── SerchiWeb.dpr              servidor WebBroker standalone (TIdHTTPWebBrokerBridge)
├── src/
│   ├── WebModuleMain.pas/.dfm rutas, cookies, construcción de view models y render
│   ├── Serchi.Store.pas       carga desde SQLite (FireDAC), caché en memoria, búsqueda/ranking, foro
│   ├── Serchi.Models.pas      modelos de dominio + carga desde JSON
│   ├── Serchi.ViewModels.pas  objetos que leen las plantillas vía RTTI
│   ├── Serchi.Text.pas        x-sistemo (cx → ĉ), normalización y sinónimos
│   ├── Serchi.I18n.pas        traducciones (@t.clave en las plantillas)
│   └── Serchi.Gemini.pas      búsqueda en vivo (Gemini + Google Search grounding)
├── templates/                 plantillas WebStencils (páginas y fragmentos _*.html)
├── static/                    app.js (x-sistemo, copiar enlace, modal), css, icono
└── data/                      traducciones y sinónimos (JSON generado desde TypeScript)
```

## Cómo encajan WebStencils y HTMX

- Las páginas completas (`home.html`, `search.html`, `forum.html`, …) declaran
  `@LayoutPage layout.html`; los fragmentos (`_results.html`, `_cards.html`,
  `_comment.html`, …) no tienen layout y son lo que se devuelve a HTMX.
- El WebModule mira la cabecera `HX-Request`/`HX-Target` para decidir si devuelve la
  página completa o solo el fragmento. Así cada URL funciona también sin JavaScript
  y con recarga normal (`hx-push-url` mantiene la URL sincronizada).
- Los datos llegan a las plantillas con `AddVar('App', …)` y `AddVar('Model', …)`;
  los textos traducidos se resuelven con el evento `OnValue` del procesador
  (`@t.searchBtn`, `@t.categories_courses`, …).

| Funcionalidad | Cómo se hace con HTMX |
|---|---|
| Búsqueda mientras escribes y filtros | `hx-get="/search" hx-target="#results" hx-trigger="submit, change, input changed delay:400ms from:#q" hx-push-url="true"` |
| "Cargar más" resultados | botón `hx-get` que se reemplaza (`outerHTML`) por la siguiente página de tarjetas |
| Vista previa de un recurso / "Voy a tener suerte" | `hx-get="/resource?id=…"` o `/lucky` → modal en `#modal` |
| Guardar en favoritos | `hx-post="/bookmark?id=…"` + cabecera `HX-Trigger: bookmarksChanged` que refresca el contador |
| Foro: filtrar, responder, "me gusta", moderar | `hx-get` a `#topics`, `hx-post` con `hx-swap="beforeend"`, `outerHTML` y `HX-Redirect` |
| Añadir enlace / descubrimiento en vivo | `hx-post="/add"` y `hx-post="/live-search"` con indicador `hx-indicator` |

## Rutas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Portada |
| GET | `/search?q=&category=&level=&format=&free=&sort=&exact=&any=&exclude=&page=` | Resultados (página o fragmento) |
| GET | `/resource?id=` · `/lucky` | Modal de detalle |
| POST | `/bookmark?id=` | Alterna favorito (cookie) |
| GET | `/bookmarks` · `/bookmarks/count` · `/bookmarks/export` | Favoritos, contador, exportar JSON |
| POST | `/bookmarks/clear` | Borra favoritos |
| GET | `/lang?l=eo\|es\|en` · `/role?r=learner\|teacher\|moderator` | Preferencias (cookies) |
| GET · POST | `/moderator` | Pide y comprueba la clave de moderador (`FORUM_MODERATOR_KEY`) |
| GET | `/forum` · `/forum/topic?id=` | Foro y tema |
| POST | `/forum/topic` · `/forum/reply?id=` · `/forum/like?id=` · `/forum/comment-like` · `/forum/mod?action=pin\|lock\|delete&id=` · `/forum/comment-delete` | Acciones del foro |
| GET/POST | `/add` | Añadir enlace manualmente |
| POST | `/live-search` · `/import` | Descubrimiento con Gemini e importación |

## Diferencias con la versión React

- Los enlaces añadidos y el foro se guardan en SQLite. El servidor los lee al arrancar
  y los mantiene en memoria. Antes de cada petición comprueba si otro programa (la
  versión Node) ha cambiado la base de datos (`PRAGMA data_version`) y, si es así,
  vuelve a cargarlos.
  Idioma, rol del foro y favoritos van en cookies.
- Si se define `FORUM_MODERATOR_KEY`, el rol de moderador pide esa clave en la página
  `/moderator` (en React se pide en un cuadro de diálogo). Al acertarla se guarda una
  cookie `HttpOnly` con un HMAC de la clave, válida 30 días.
- El tema claro/oscuro sigue la preferencia del sistema (`prefers-color-scheme`).
- La búsqueda avanzada es un panel desplegable en lugar de un modal.

## Actualizar los datos

Los enlaces y paneles se gestionan en `data/serchi.db` (ver `npm run db:import` y
`npm run db:export` en el README principal). Los JSON de `delphi/data/` se generan
desde el código TypeScript; después de cambiar `src/translations` o
`src/utils/esperanto.ts` ejecuta en la raíz:

```bash
npm run export:delphi
```

## Notas

- Los fuentes `.pas` están en UTF-8 con BOM para que el compilador lea bien los
  caracteres esperantos (ĉ, ĝ, ĥ, ĵ, ŝ, ŭ).
- El contenido de usuario (foro, enlaces añadidos) se imprime con `@objeto.propiedad`,
  que WebStencils codifica en HTML; comprueba que sigue así en tu versión.
- El código se escribió sin poder compilarlo con RAD Studio (no hay Delphi en el
  entorno donde se generó). Los puntos más sensibles a la versión son la firma del
  evento `OnValue` (`TWebModuleMain.ProcessorValue`), la resolución de rutas de
  `@Import`/`@LayoutPage`, que se buscan en `templates/`, y el acceso a SQLite con
  FireDAC en `Serchi.Store.pas`.
