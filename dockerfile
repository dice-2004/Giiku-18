FROM node:latest

USER node
WORKDIR /usr/src/oshikatsu
CMD ["npm","run","dev"]
