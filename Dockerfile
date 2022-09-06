FROM node:16-alpine

ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package.json /app

RUN npm install

COPY .. /app/

EXPOSE $PORT

CMD [ "npm", "run", "start:dev" ]