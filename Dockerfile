# Serĉilo, Node/React version. See docs/DESPLIEGUE.md.
#
#   docker build -t serchi .
#   docker run -d -p 3000:3000 -v serchi-data:/data --env-file .env.local serchi
#
# The database lives in the /data volume, so it survives new versions of the image.
FROM node:22-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

ENV NODE_ENV=production \
    PORT=3000 \
    SERCHI_DB=/data/serchi.db
VOLUME /data
EXPOSE 3000

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["npx", "tsx", "server.ts"]
