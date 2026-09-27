-- Serĉilo database schema (SQLite 3).
-- Shared by the Node/React version (server/db.ts) and the Delphi version
-- (delphi/src/Serchi.Store.pas). Every statement is idempotent so the schema
-- can be applied on every start. Databases created with an older schema are
-- upgraded by server/db.ts (PRAGMA user_version, currently 4).

PRAGMA foreign_keys = ON;

-- Curated and user-added Esperanto resources ("direcciones")
CREATE TABLE IF NOT EXISTS resources (
  id             TEXT PRIMARY KEY,
  title          TEXT NOT NULL,
  url            TEXT NOT NULL,
  url_key        TEXT NOT NULL UNIQUE,   -- lower-cased URL without trailing "/", used to reject duplicates
  display_url    TEXT NOT NULL,
  description_eo TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  category       TEXT NOT NULL CHECK (category IN ('courses','news','projects','tools','literature','media','community','radio','people','events','kids')),
  level          TEXT NOT NULL DEFAULT 'all' CHECK (level IN ('all','A1','A2','B1','B2','C1')),
  format         TEXT NOT NULL DEFAULT 'website' CHECK (format IN ('website','app','podcast','book','video','forum','course','tool')),
  is_free        INTEGER NOT NULL DEFAULT 1,
  author         TEXT,
  featured       INTEGER NOT NULL DEFAULT 0,
  year,                                 -- no type: keeps 2015 (number) or '2002-2024' (text) as given
  source         TEXT NOT NULL DEFAULT 'curated' CHECK (source IN ('curated','user','crawled')),
  position       INTEGER NOT NULL DEFAULT 0,  -- display order used as ranking tie-breaker
  stream_type    TEXT CHECK (stream_type IN ('spotify','zeno','rss','audio')),  -- online player, see src/types
  stream_url     TEXT,
  created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_level ON resources(level);
CREATE INDEX IF NOT EXISTS idx_resources_position ON resources(position);

CREATE TABLE IF NOT EXISTS resource_tags (
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  position    INTEGER NOT NULL,
  tag         TEXT NOT NULL,
  PRIMARY KEY (resource_id, position)
);
CREATE INDEX IF NOT EXISTS idx_resource_tags_tag ON resource_tags(tag);

-- Languages the resource is available in (ISO codes)
CREATE TABLE IF NOT EXISTS resource_languages (
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  position    INTEGER NOT NULL,
  lang        TEXT NOT NULL,
  PRIMARY KEY (resource_id, position)
);

-- Localized feature bullet points
CREATE TABLE IF NOT EXISTS resource_features (
  resource_id TEXT NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  lang        TEXT NOT NULL CHECK (lang IN ('eo','es','en')),
  position    INTEGER NOT NULL,
  text        TEXT NOT NULL,
  PRIMARY KEY (resource_id, lang, position)
);

-- Knowledge panels shown next to the results
CREATE TABLE IF NOT EXISTS knowledge_panels (
  id             TEXT PRIMARY KEY,
  position       INTEGER NOT NULL DEFAULT 0,
  title          TEXT NOT NULL,
  subtitle_eo    TEXT NOT NULL DEFAULT '',
  subtitle_es    TEXT NOT NULL DEFAULT '',
  subtitle_en    TEXT NOT NULL DEFAULT '',
  description_eo TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  icon_name      TEXT
);

CREATE TABLE IF NOT EXISTS knowledge_keywords (
  panel_id TEXT NOT NULL REFERENCES knowledge_panels(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  keyword  TEXT NOT NULL,
  PRIMARY KEY (panel_id, position)
);

CREATE TABLE IF NOT EXISTS knowledge_facts (
  panel_id TEXT NOT NULL REFERENCES knowledge_panels(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  label_eo TEXT NOT NULL DEFAULT '',
  label_es TEXT NOT NULL DEFAULT '',
  label_en TEXT NOT NULL DEFAULT '',
  value    TEXT NOT NULL,
  PRIMARY KEY (panel_id, position)
);

CREATE TABLE IF NOT EXISTS knowledge_links (
  panel_id TEXT NOT NULL REFERENCES knowledge_panels(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  title    TEXT NOT NULL,
  url      TEXT NOT NULL,
  PRIMARY KEY (panel_id, position)
);
