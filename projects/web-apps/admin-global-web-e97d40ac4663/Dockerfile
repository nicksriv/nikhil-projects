FROM node:10.19.0-alpine
WORKDIR /app
COPY package.json .
COPY packages/v5_global_screen_builder/package.json ./packages/v5_global_screen_builder/
RUN npm install
COPY .  .
CMD ["npm", "start"]
