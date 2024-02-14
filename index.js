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
    console.log('MongoDB kapcsolat lezárva');
  }
};

const getUsers = async (db) => {
  try {
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({}).toArray();
    return users;
  } catch (error) {
    console.error('Hiba felhasznalok lekérésekor', error);
    throw error;
  }
};


const getCodes = async (db) => {
  try {
    const codesCollection = db.collection('codes');
    const codes = await codesCollection.find({}).toArray();
    return codes;
  } catch (error) {
    console.error('Hiba kodok lekérésekor', error);
    throw error;
  }
};


const getProjects = async (db) => {
  try {
    const projectsCollection = db.collection('projects');
    const projects = await projectsCollection.find({}).toArray();
    return projects;
  } catch (error) {
    console.error('Hiba projektek lekérésekor', error);
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
        const users = await getUsers(database);
        const codes = await getCodes(database);
        const projects = await getProjects(database);

        const allData = {
          users: users,
          codes: codes,
          projects: projects
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
