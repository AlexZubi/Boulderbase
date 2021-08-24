FROM node:16.7.0 AS build_backend

WORKDIR /usr/app

EXPOSE 3000

COPY ./src ./src

COPY [	"package.json", "package-lock.json","nodemon.json","tsconfig.json", "./"]

RUN npm install

CMD ["npm", "run", "dev"]
