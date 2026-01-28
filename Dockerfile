FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

CMD ["npm", "run", "dev"]