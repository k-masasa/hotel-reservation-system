FROM node:20-alpine

WORKDIR /app

# パッケージ定義だけ先にコピー（キャッシュが効く）
COPY package.json ./

# パッケージインストール
RUN npm install

# アプリケーションコードをすべてコピー
COPY . .

# ビルド（distを生成）
RUN npm run build

# 実行ユーザー設定
RUN addgroup -g 1001 -S nodejs \
  && adduser -S backend -u 1001 \
  && chown -R backend:nodejs /app

USER backend
EXPOSE 3001

CMD ["npm", "start"]
