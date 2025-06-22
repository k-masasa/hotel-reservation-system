const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'mysql',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'hotel_user',
    password: process.env.DB_PASSWORD || 'hotel_password',
    database: process.env.DB_NAME || 'hotel_reservation',
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts'
  },
  seeds: {
    directory: './src/database/seeds',
    extension: 'ts'
  }
};

module.exports = config;