FROM node:12 AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:12-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=base /app .
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]