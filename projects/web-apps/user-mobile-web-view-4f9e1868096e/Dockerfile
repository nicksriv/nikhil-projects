#FROM node:12.22.8
FROM node:10.19.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY .  .
CMD ["npm", "start"]
