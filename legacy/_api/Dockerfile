FROM node:19 AS builder

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start:migrate:dev"]