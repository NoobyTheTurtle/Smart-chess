FROM node:18.4.0

WORKDIR /smart-chess-front

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]