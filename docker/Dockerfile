FROM node:20.15.1-alpine AS base
WORKDIR /app
COPY . .
RUN npm install --production

FROM node:20.15.1-alpine AS production
COPY --from=base /app ./
EXPOSE 3000
CMD ["node", "main.js"]