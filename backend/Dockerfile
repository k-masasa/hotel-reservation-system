FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs \
  && adduser -S backend -u 1001 \
  && chown -R backend:nodejs /app

USER backend
EXPOSE 3001

CMD ["npm", "start"]
