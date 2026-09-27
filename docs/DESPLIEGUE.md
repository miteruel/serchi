# Cómo publicar Serĉilo en un servidor

Esta guía explica cómo poner en marcha la versión Node/React en un servidor propio y
cómo mantenerla: variables de entorno, dónde vive la base de datos, copias de seguridad
y actualizaciones. La versión Delphi tiene sus propias instrucciones en
[`delphi/README.md`](../delphi/README.md).

## Qué hace falta

- Un servidor Linux con **Docker** (lo más sencillo) o con **Node.js 22.13 o posterior**.
- Opcional: un dominio y un proxy con HTTPS delante (ver más abajo).

## Variables de entorno

| Variable | Para qué sirve | Por defecto |
|---|---|---|
| `PORT` | Puerto en el que escucha el servidor | `3000` |
| `NODE_ENV` | Con `production` sirve la web ya compilada (`dist/`) en vez del modo desarrollo | — |
| `SERCHI_DB` | Ruta del fichero SQLite con enlaces, paneles y foro | `data/serchi.db` |
| `SITE_URL` | Dirección pública del sitio, sin `/` final (p. ej. `https://serchi.ejemplo.org`). Se usa en `sitemap.xml` y en la vista previa al compartir un enlace | la de cada petición |
| `GEMINI_API_KEY` | Activa la búsqueda en vivo de webs nuevas con Gemini | desactivada |
| `FORUM_MODERATOR_KEY` | Si se define, el rol de moderador del foro pide esta clave | cualquiera modera |
| `DOMAIN` | Solo con `docker compose --profile https`: dominio para el certificado HTTPS | — |

Se pueden poner en un fichero `.env.local` (ver [`.env.example`](../.env.example)), que
nunca se sube al repositorio.

> **Importante:** si la web es pública, define siempre `FORUM_MODERATOR_KEY`. Sin ella
> cualquiera puede fijar, cerrar o borrar mensajes del foro.

## Opción 1: Docker Compose (recomendada)

El fichero [`compose.yaml`](../compose.yaml) arranca la web y un servicio que hace una
copia de seguridad de la base de datos cada 24 horas. Opcionalmente arranca también
[Caddy](https://caddyserver.com/) para servir la web con HTTPS.

```bash
git clone https://github.com/miteruel/serchi.git
cd serchi
cp .env.example .env.local        # y rellena las claves
docker compose up -d
```

La web queda en `http://servidor:3000`. Para usar otro puerto, pon `SERCHI_PORT=8080`
delante del comando o en un fichero `.env`.

**Con HTTPS y dominio propio:**
1. Apunta el dominio al servidor.
2. Pon `DOMAIN=serchi.ejemplo.org` en `.env.local`.
3. Abre los puertos 80 y 443 del servidor.
4. Arranca con:

```bash
docker compose --profile https up -d
```

Caddy consigue y renueva el certificado solo.

**Actualizar a una versión nueva:**

```bash
git pull
docker compose up -d --build        # añade --profile https si lo usas
```

Las copias de seguridad quedan en el volumen, en `/data/backups`, y se guardan las 14
últimas. Para sacar una copia del servidor:

```bash
docker compose cp serchi:/data/backups ./backups
```

Otras órdenes útiles:
- `docker compose logs -f serchi`: ver lo que pasa en la web;
- `docker compose down`: pararlo todo sin borrar los datos. Solo `down -v` borraría los
  volúmenes con la base de datos.

## Opción 2: Docker sin Compose

```bash
git clone https://github.com/miteruel/serchi.git
cd serchi
cp .env.example .env.local        # y rellena las claves
docker build -t serchi .
docker run -d --name serchi --restart unless-stopped \
  -p 3000:3000 -v serchi-data:/data --env-file .env.local serchi
```

La web queda en `http://servidor:3000`.

La base de datos vive en el volumen `serchi-data` (`/data/serchi.db` dentro del
contenedor). La primera vez que arranca, el contenedor copia allí la base de datos que
viene con el repositorio. Después ya no la toca: las altas de enlaces y el foro se
guardan en el volumen y sobreviven a las actualizaciones.

**Actualizar a una versión nueva:**

```bash
git pull
docker build -t serchi .
docker rm -f serchi
docker run -d --name serchi --restart unless-stopped \
  -p 3000:3000 -v serchi-data:/data --env-file .env.local serchi
```

## Opción 3: Node.js directamente

```bash
git clone https://github.com/miteruel/serchi.git
cd serchi
npm ci
npm run build
cp data/serchi.db /srv/serchi/serchi.db        # la base de datos "de verdad", fuera del repositorio
SERCHI_DB=/srv/serchi/serchi.db NODE_ENV=production npm start
```

Conviene tener la base de datos fuera de la carpeta del repositorio. Así un `git pull`
no la sobrescribe con la versión del repositorio.

Para que arranque sola con el servidor, un servicio de systemd
(`/etc/systemd/system/serchi.service`):

```ini
[Unit]
Description=Serĉilo
After=network.target

[Service]
WorkingDirectory=/opt/serchi
Environment=NODE_ENV=production PORT=3000 SERCHI_DB=/srv/serchi/serchi.db
EnvironmentFile=/opt/serchi/.env.local
ExecStart=/usr/bin/npm start
Restart=on-failure
User=serchi

[Install]
WantedBy=multi-user.target
```

Y después: `sudo systemctl enable --now serchi`.

## HTTPS con un dominio

Lo más fácil es poner [Caddy](https://caddyserver.com/) delante, que consigue y renueva
el certificado solo. Este es el `Caddyfile` completo:

```
serchi.ejemplo.org {
    reverse_proxy localhost:3000
}
```

## Copias de seguridad

`npm run db:backup` hace una copia coherente de la base de datos sin parar el servidor
(con `VACUUM INTO` de SQLite). Guarda las copias en `data/backups/` y conserva las 14
últimas:

```bash
# Node directamente
SERCHI_DB=/srv/serchi/serchi.db npm run db:backup -- --out /srv/serchi/backups

# Docker Compose: ya se hacen solas cada 24 horas (servicio backup)
# Docker sin Compose: las copias quedan dentro del volumen, en /data/backups
docker exec serchi npx tsx scripts/db-backup.ts --out /data/backups
```

Para hacerla cada noche, una línea en `crontab -e`:

```
15 3 * * * docker exec serchi npx tsx scripts/db-backup.ts --out /data/backups
```

Guarda de vez en cuando alguna copia **fuera** del servidor: otro ordenador, un disco
o un almacenamiento en la nube.

**Restaurar una copia:** para el servidor, copia el fichero de la copia encima del de
`SERCHI_DB` y vuelve a arrancarlo.

## Añadir datos en producción

Los scripts de carga (`npm run db:import`, `npm run forum:import`) trabajan por defecto
sobre `data/serchi.db` del repositorio. En producción hay que indicarles la base de datos
que se está usando de verdad:

```bash
SERCHI_DB=/srv/serchi/serchi.db npm run db:import -- --resources nuevos.json
# con Docker Compose:
docker compose cp nuevos.json serchi:/data/nuevos.json
docker compose exec serchi npx tsx scripts/db-import.ts --db /data/serchi.db --resources /data/nuevos.json
# con Docker sin Compose (copia antes el JSON dentro del volumen):
docker exec serchi npx tsx scripts/db-import.ts --db /data/serchi.db --resources /data/nuevos.json
```

## Versión Node y versión Delphi a la vez

Las dos versiones pueden usar el mismo fichero SQLite. Node lo lee en cada petición,
así que ve enseguida lo que escribe Delphi. Delphi guarda los datos en memoria, pero
antes de cada petición comprueba si otra conexión ha cambiado la base de datos
(`PRAGMA data_version`) y, si es así, los vuelve a cargar.

## Comprobaciones automáticas en GitHub

- **CI** (`.github/workflows/ci.yml`): en cada push y pull request comprueba los tipos,
  pasa las pruebas (`npm test`), compila la web y verifica que los JSON de Delphi están
  al día.
- **Comprobar enlaces** (`.github/workflows/links.yml`): el día 1 de cada mes abre todas
  las URL de la base de datos y, si hay enlaces rotos o sin respuesta, abre o actualiza
  un issue con la etiqueta `enlaces`. También se puede lanzar a mano desde la pestaña
  *Actions*.
