import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 5000;

const dbConfig = {
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'hotel_reservation'
};

app.get('/reservations', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM reservations');
    res.json(rows);
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
