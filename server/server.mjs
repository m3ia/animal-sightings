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
    const sightings = await db.any('SELECT Sightings.id, Sightings.location, Sightings.date_time, Individuals.nick_name, Sightings.healthy FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.id DESC');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// POST - Add a Sighting ------------------------------------------------------
app.post('/sightings', async (req, res) => {
  const sighting = {
    location: req.body.location,
    date: req.body.date,
    individualId: req.body.individualId,
    healthStatus: req.body.healthStatus
  };
  try {
    const createdSighting = await db.one(
      'INSERT INTO sightings (location, date_time, individual_id, healthy, created_on) VALUES ($1, $2, $3, $4, current_date) RETURNING * ',
      [sighting.location, sighting.date, sighting.individualId, sighting.healthStatus]
    );
    // const sightings = await db.any('SELECT Sightings.id, Sightings.location, Sightings.date_time, Individuals.nick_name, Sightings.healthy FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.id');
    // res.send(sightings);
    res.send(createdSighting);
    
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// For getting the individuals
app.get('/individuals', async function (req, res) {
  try {
    const individuals = await db.any('SELECT * FROM individuals');
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});