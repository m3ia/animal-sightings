import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pgPromise from 'pg-Promise';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Hola this server is running on port ${PORT}`);
})

// DB connection
const pgp = pgPromise({});
const db = pgp('postgres://localhost:5432/sightings');

app.get('/', (req, res) => {
  res.json('Hiyeee');
})

// GET - All Sightings --------------------------------------------------------
app.get('/sightings', async function (req, res) {
  try {
    const sightings = await db.any('SELECT * FROM sightings ORDER BY id');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});