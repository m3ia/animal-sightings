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
    const sightings = await db.any('SELECT Sightings.id, Sightings.location, Sightings.date_time, Sightings.individual_id, Individuals.nick_name, Sightings.healthy FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.id DESC');
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

// PATCH - Sighting---------------------------------------------------
app.patch('/sightings/:id', async (req, res) => {
  const sighting = {
    id: req.body.id,
    location: req.body.location,
    date: req.body.date,
    individualId: req.body.individualId,
    healthStatus: req.body.healthStatus
  };
  try {
    const createdSighting = await db.one(
      `UPDATE sightings SET location = $1, date_time = $2, individual_id = $3, healthy = $4 WHERE id=$5 RETURNING *`,
      [sighting.location, sighting.date, sighting.individualId, sighting.healthStatus, sighting.id]
    );
    console.log('createdSighting: ', createdSighting);
    const sightings = await db.any('SELECT Sightings.id, Sightings.location, Sightings.date_time, Sightings.individual_id, Individuals.nick_name, Sightings.healthy FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.id DESC', [true]);
    res.send(sightings);
  } catch (e) {
    console.log('e: ', e)
    return res.status(400).json({ e });
  }
});

// GET - All Individuals---------------------------------------------------
app.get('/individuals', async function (req, res) {
  try {
    const individuals = await db.any('SELECT individuals.id, individuals.nick_name, individuals.seen_on, species.scientific_name FROM individuals LEFT JOIN species ON individuals.species_id=species.id ORDER BY individuals.id DESC');
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// POST - Add a Individual ------------------------------------------------------
app.post('/individuals', async (req, res) => {
  const individual = {
    nickName: req.body.nickName,
    seenDate: req.body.seenDate,
    speciesId: req.body.speciesId,
  };
  try {
    const createdIndividual = await db.one(
      'INSERT INTO individuals (nick_name, seen_on, species_id) VALUES ($1, $2, $3) RETURNING * ',
      [individual.nickName, individual.seenDate, individual.speciesId]
    );
  
    res.send(createdIndividual);
    
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// GET - All Species --------------------------------------------------------
app.get('/species', async function (req, res) {
  try {
    const species = await db.any('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// GET - All sighting locations and individuals ------------------------------
app.get('/locations', async function (req, res) {
  try {
    const locations = await db.any('SELECT Sightings.location, Individuals.nick_name FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.location');
    let locationsDict = {};
    for (let i of locations) {
      if (locationsDict.hasOwnProperty(i.location) === true) {
        if (!locationsDict[i.location].includes(i.nick_name)) {
          locationsDict[i.location].push(i.nick_name);
        } 
      } else {
        locationsDict[i.location] = [i.nick_name];
      }
    }
    res.send(locationsDict);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// DELETE - All sighting locations and individuals ------------------------------

app.delete('/sightings/:id', async (req, res) => {
  // : acts as a placeholder
  const sightingId = req.params.id;
  try {
    await db.none('DELETE FROM sightings WHERE id=$1', [sightingId]);
    const sightings = await db.any('SELECT Sightings.location, Individuals.nick_name FROM Sightings LEFT JOIN Individuals ON Sightings.individual_id=Individuals.id ORDER BY Sightings.location', [true]);
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});