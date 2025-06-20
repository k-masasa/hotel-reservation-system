FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --strict-ssl=false

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs \
  && adduser -S frontend -u 1001 \
  && chown -R frontend:nodejs /app

USER frontend
EXPOSE 3000

CMD ["npm", "run", "preview"]