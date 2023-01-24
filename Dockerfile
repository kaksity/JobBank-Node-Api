FROM node:16-alpine

RUN mkdir -p /usr/app && chown node:node /usr/app
WORKDIR /usr/app

USER node

COPY --chown=node:node ./package.json ./
COPY --chown=node:node yarn.lock ./
RUN yarn install

COPY --chown=node:node . .


EXPOSE 3333

CMD ["yarn","build"]
