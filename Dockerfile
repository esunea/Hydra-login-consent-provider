
# BUILD
FROM node:12-alpine AS build

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:app



# PRODUCTION
FROM node:12-alpine AS production

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i --prod

COPY --from=build /home/node/app/build/ .
COPY ./templates/ ./templates/
COPY ./public/ ./public/
CMD ["node","index.js"]
