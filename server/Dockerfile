FROM node:10.15-alpine

WORKDIR "/app"

COPY ./package.json ./

RUN npm install --silent

COPY . .

CMD ["npm","start"]