FROM node:20.17.0

WORKDIR /threewygo_frontend

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
