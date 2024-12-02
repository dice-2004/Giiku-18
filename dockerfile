FROM node:latest

WORKDIR /usr/src/oshikatsu
RUN chown -R node:node /usr/src/oshikatsu

COPY ./package.json ./
RUN npm install

USER node
CMD ["npm","run","dev"]
