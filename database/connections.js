//client to connect to our database
const { MongoClient, ServerApiVersion } = require("mongodb");

//initialize .env variables
const dotenv = require("dotenv");
dotenv.config();

//mongodburi in node env variables
const URI = process.env.ATLAS_URI;
//create client
const dbConnection = new MongoClient(URI,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});


//export database connection
module.exports = { dbConnection};