#!/bin/sh
# On the first start the volume is empty: copy the database that ships with
# the image (links, knowledge panels and the demo forum) into it.
set -e
if [ -n "$SERCHI_DB" ] && [ ! -f "$SERCHI_DB" ]; then
  mkdir -p "$(dirname "$SERCHI_DB")"
  cp /app/data/serchi.db "$SERCHI_DB"
  echo "Created $SERCHI_DB from the database in the image"
fi
exec "$@"
