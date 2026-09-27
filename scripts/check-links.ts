/**
 * Opens every URL in the database and reports the ones that no longer work:
 * resource links, knowledge panel links and radio feeds/players.
 *
 *   npm run links:check -- [--db <file.db>] [--category <cat>] [--limit <n>]
 *                          [--concurrency <n>] [--timeout <seconds>]
 *                          [--out <report.md>] [--json <report.json>]
 *
 * Writes a Markdown report (default: data/audits/<date>-comprobacion-enlaces.md).
 * Every URL is requested with GET, following redirects, and retried once when
 * it fails with a network error, a timeout or a 5xx answer. Results:
 *   ok        2xx on the same site
 *   redirect  2xx, but after redirecting to another domain
 *   blocked   401, 403 or 429: often anti-bot protection, check by hand
 *   broken    any other 4xx or 5xx
 *   error     no answer: DNS, TLS, connection refused or timeout
 * Exits with code 1 when some URL is broken or fails with an error.
 * Behind an HTTP proxy, run it with NODE_USE_ENV_PROXY=1 so fetch uses it.
 */
import fs from 'fs';
import path from 'path';
import { openDatabase, ROOT_DIR } from '../server/db';

const argv = process.argv.slice(2);
const opt = (name: string) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const today = new Date().toISOString().slice(0, 10);
const outFile = path.resolve(opt('out') || path.join(ROOT_DIR, 'data', 'audits', `${today}-comprobacion-enlaces.md`));
const jsonFile = opt('json') ? path.resolve(opt('json')!) : undefined;
const concurrency = Math.max(1, Number(opt('concurrency')) || 8);
const timeoutMs = Math.max(1, Number(opt('timeout')) || 20) * 1000;
const limit = Number(opt('limit')) || Infinity;
const category = opt('category');

type Status = 'ok' | 'redirect' | 'blocked' | 'broken' | 'error';

interface Target {
  url: string;
  /** Where the URL is used, e.g. "lernu-net (courses)" or "panel zamenhof". */
  usedBy: string[];
}

interface Result extends Target {
  status: Status;
  httpStatus?: number;
  finalUrl?: string;
  error?: string;
}

// ---- Collect the URLs ------------------------------------------------------

const db = openDatabase(opt('db'));
const targets = new Map<string, Target>();
const add = (url: string, usedBy: string) => {
  const key = url.trim();
  if (!/^https?:\/\//i.test(key)) return;
  const t = targets.get(key);
  if (t) t.usedBy.push(usedBy);
  else targets.set(key, { url: key, usedBy: [usedBy] });
};

const resources = db
  .prepare(`SELECT id, url, category, stream_type, stream_url FROM resources
            ${category ? 'WHERE category = ?' : ''} ORDER BY position, rowid`)
  .all(...(category ? [category] : [])) as Record<string, string>[];
for (const r of resources) {
  add(r.url, `${r.id} (${r.category})`);
  if (r.stream_url) add(r.stream_url, `${r.id} (${r.stream_type})`);
}
if (!category) {
  const links = db.prepare('SELECT panel_id, url FROM knowledge_links ORDER BY panel_id, position').all() as Record<string, string>[];
  for (const l of links) add(l.url, `panel ${l.panel_id}`);
}
db.close();

const list = [...targets.values()].slice(0, limit);

// ---- Check them ------------------------------------------------------------

const HEADERS = {
  // Some sites answer 403 to requests without a browser-like user agent
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 Serchilo-link-check',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'eo,es;q=0.9,en;q=0.8',
};

const site = (url: string) => {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return url;
  }
};

async function request(url: string): Promise<Omit<Result, keyof Target>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: 'follow', signal: controller.signal });
    // Only the status matters: do not download the page
    await res.body?.cancel().catch(() => {});
    const httpStatus = res.status;
    const finalUrl = res.url || url;
    if (httpStatus >= 200 && httpStatus < 300) {
      return site(finalUrl) === site(url) ? { status: 'ok', httpStatus } : { status: 'redirect', httpStatus, finalUrl };
    }
    if (httpStatus === 401 || httpStatus === 403 || httpStatus === 429) return { status: 'blocked', httpStatus, finalUrl };
    return { status: 'broken', httpStatus, finalUrl };
  } catch (err: any) {
    const cause = err?.cause?.code || err?.cause?.message;
    const error = err?.name === 'AbortError' ? `timeout (${timeoutMs / 1000} s)` : cause || err?.message || String(err);
    return { status: 'error', error };
  } finally {
    clearTimeout(timer);
  }
}

async function check(target: Target): Promise<Result> {
  let result = await request(target.url);
  if (result.status === 'error' || (result.httpStatus ?? 0) >= 500) {
    await new Promise((r) => setTimeout(r, 2000));
    result = await request(target.url);
  }
  return { ...target, ...result };
}

const results: Result[] = new Array(list.length);
let next = 0;
let done = 0;
async function worker() {
  while (next < list.length) {
    const i = next++;
    results[i] = await check(list[i]);
    done++;
    if (done % 25 === 0 || done === list.length) process.stderr.write(`\r${done}/${list.length} URLs checked`);
  }
}
console.error(`Checking ${list.length} URLs (${concurrency} at a time, ${timeoutMs / 1000} s timeout)...`);
await Promise.all(Array.from({ length: Math.min(concurrency, list.length) }, worker));
process.stderr.write('\n');

// ---- Report ----------------------------------------------------------------

const by = (s: Status) => results.filter((r) => r.status === s);
const cell = (s: string) => s.replace(/\|/g, '\\|');
const table = (rows: Result[], detail: (r: Result) => string) =>
  ['| URL | Usado en | Detalle |', '|---|---|---|', ...rows.map((r) => `| ${cell(r.url)} | ${cell(r.usedBy.join(', '))} | ${cell(detail(r))} |`)].join('\n');

const sections: [Status, string, string, (r: Result) => string][] = [
  ['broken', 'Rotos', 'El servidor responde con un error: la página ya no existe o el sitio falla.', (r) => `HTTP ${r.httpStatus}`],
  ['error', 'Sin respuesta', 'No se pudo conectar: el dominio no existe, el certificado no es válido o no respondió a tiempo.', (r) => r.error || ''],
  ['blocked', 'Bloqueados', 'El sitio rechaza las visitas automáticas (401, 403 o 429). Hay que abrirlos a mano.', (r) => `HTTP ${r.httpStatus}`],
  ['redirect', 'Redirigen a otro dominio', 'Funcionan, pero llevan a otra web: puede que el sitio se haya mudado o que el dominio ya no sea el mismo proyecto.', (r) => `→ ${r.finalUrl}`],
];

const lines = [
  '# Comprobación de enlaces',
  '',
  `Fecha: ${today}. Método: \`npm run links:check\` abre cada URL de la base de datos (enlaces, paneles de conocimiento y fuentes de radio) con una petición GET, siguiendo las redirecciones, y repite una vez las que fallan sin respuesta o con un error 5xx.${category ? ` Solo la categoría \`${category}\`.` : ''}`,
  '',
  `- URLs comprobadas: **${results.length}**`,
  `- Correctas: **${by('ok').length}**`,
  ...sections.map(([s, title]) => `- ${title}: **${by(s).length}**`),
];
for (const [s, title, intro, detail] of sections) {
  const rows = by(s);
  if (rows.length === 0) continue;
  lines.push('', `## ${title}`, '', intro, '', table(rows, detail));
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, lines.join('\n') + '\n');
if (jsonFile) fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2) + '\n');

console.log(
  `${results.length} URLs: ${by('ok').length} ok, ${by('redirect').length} redirect, ` +
    `${by('blocked').length} blocked, ${by('broken').length} broken, ${by('error').length} error`,
);
console.log(`Report: ${path.relative(process.cwd(), outFile)}`);
process.exitCode = by('broken').length + by('error').length > 0 ? 1 : 0;
