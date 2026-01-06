FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]




