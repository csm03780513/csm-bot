FROM node:carbon-jessie
WORKDIR /telegramApp
COPY /package.json /telegramApp
RUN npm install
COPY . /telegramApp
CMD node index.js
EXPOSE 3000