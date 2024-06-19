FROM node:22-alpghine

WORKDIR /app

COPY package.json ./

RUN yarn

EXPOSE 3000

COPY . .
RUN yarn build

CMD [ "node", "dist/main.js" ]