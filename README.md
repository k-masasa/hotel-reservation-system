# ホテルの予約管理システム

このプロジェクトは、ホテルの予約管理システムを構築するためのものです。フロントエンドには Nuxt.js、バックエンドには Node.js (Express) を使用し、データベースには MySQL を使用します。フロントエンドとバックエンドの両方で TypeScript を使用しています。

## 開発環境のセットアップ

1. リポジトリをクローンします。

```sh
git clone https://github.com/k-masasa/hotel-reservation-system.git
cd hotel-reservation-system
```

2. Docker Compose を使用して開発環境を立ち上げます。

```sh
docker-compose up --build
```

3. フロントエンドの開発サーバーが http://localhost:3000 で、バックエンドの開発サーバーが http://localhost:5000 で動作します。

## プロジェクトの実行

1. Docker Compose を使用してプロジェクトを起動します。

```sh
docker-compose up
```

2. ブラウザで http://localhost:3000 にアクセスして、予約一覧ページを確認します。
