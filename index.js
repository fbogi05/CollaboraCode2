const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = Express();
app.use(cors());

const uri = "mongodb+srv://admin:admin@cluster.d4bejds.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "CCDatabase";
let database;

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(databaseName);
    console.log('Sikeres csatlakozás :)');
    return { client, db };
  } catch (error) {
    console.error('Sikertelen csatlakozás :c', error);
    throw error;
  }
};

const closeMongoDBConnection = (client) => {
  if (client) {
    client.close();
    console.log('MongoDB connection closed');
  }
};

const getFelhasznalok = async (db) => {
  try {
    const felhasznalokCollection = db.collection('felhasznalok');
    const felhasznalok = await felhasznalokCollection.find({}).toArray();
    return felhasznalok;
  } catch (error) {
    console.error('Hiba felhasznalok', error);
    throw error;
  }
};


const getKodok = async (db) => {
  try {
    const kodokCollection = db.collection('kodok');
    const kodok = await kodokCollection.find({}).toArray();
    return kodok;
  } catch (error) {
    console.error('Hiba kodok', error);
    throw error;
  }
};


const getProjektek = async (db) => {
  try {
    const projektekCollection = db.collection('projektek');
    const projektek = await projektekCollection.find({}).toArray();
    return projektek;
  } catch (error) {
    console.error('Hiba projektek', error);
    throw error;
  }
};

app.listen(5040, async () => {
  try {
    
    const { client, db } = await connectToMongoDB();
    database = db;
    console.log("MongoDB kapcsolat létrehozva és az alkalmazás elindult.");

    
    app.get('/api/CC/GetAllData', async (request, response) => {
      try {
        const felhasznalok = await getFelhasznalok(database);
        const kodok = await getKodok(database);
        const projektek = await getProjektek(database);

        const allData = {
          felhasznalok: felhasznalok,
          kodok: kodok,
          projektek: projektek
        };

        response.send(allData);
      } catch (error) {
        console.error('Hiba a /api/CC/GetAllData útvonalon:', error);
        response.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error('Hiba az alkalmazás indításakor:', error);
  }
});


process.on('SIGINT', () => {
  closeMongoDBConnection(database);
  process.exit();
});
