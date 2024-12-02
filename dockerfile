FROM node:latest

WORKDIR /usr/src/oshikatsu
RUN chown -R node:node /usr/src/oshikatsu

USER node
CMD ["npm","run","dev"]
