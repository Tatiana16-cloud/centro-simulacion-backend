FROM node:alpine3.17

WORKDIR /project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]