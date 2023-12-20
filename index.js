
var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://nagybertalazar:colaboracode@cluster.d4bejds.mongodb.net/?retryWrites=true&w=majority";
var DATABASE_NAME = "CC";
var database;

app.listen(5040, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Mongo DB Connection Error:", error);
        } else {
            database = client.db(DATABASE_NAME);
            console.log("Mongo DB Connection Successful :)");
        }
    });
});

app.get('/api/CC/GetNotes',(request,response)=>{
    database.collection("felhasznalok").find=({}).toArray((error,result)=>{
        response.send(result);
    });
})
