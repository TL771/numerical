FROM node:16.13.1

WORKDIR /numer/app

COPY package.json /numer/app

COPY . /numer/app

RUN npm i --force

EXPOSE 3000

ENTRYPOINT [ "npm" , "start"]