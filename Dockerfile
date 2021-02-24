FROM node:current-buster-slim@sha256:3e8e4725a03b7304a4205239cd93b6c8eae3f3b896e868293706a692060b1f78 as installer
USER node
WORKDIR /home/node
COPY --chown="node:node" . .

RUN npm ci

FROM node:current-buster-slim@sha256:3e8e4725a03b7304a4205239cd93b6c8eae3f3b896e868293706a692060b1f78 as builder
USER node
WORKDIR /home/node
COPY --chown="node:node" --from=installer /home/node .

RUN npm run build

FROM node:current-buster-slim@sha256:3e8e4725a03b7304a4205239cd93b6c8eae3f3b896e868293706a692060b1f78 as release
USER node
WORKDIR /home/node
COPY --from=builder --chown="node:node" /home/node/package.json package.json
COPY --from=builder --chown="node:node" /home/node/dist dist
COPY --from=builder --chown="node:node" /home/node/node_modules node_modules

EXPOSE 3000
CMD ["node", "./dist/main.js"]
