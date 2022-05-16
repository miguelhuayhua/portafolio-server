//client to connect to our database
const { MongoClient } = require("mongodb");

//initialize .env variables
const dotenv = require("dotenv");
dotenv.config();

//mongodburi in node env variables
const URI = process.env.ATLAS_URI;

//create client
const dbConnection = new MongoClient(URI);

//try connect
const connect = () => {
    dbConnection.connect().then(() => {
        console.log("Connection to MongoDb Successful!");
    }).catch(err => {
        throw err;
    })

}
// disconnect
const disconnect = () => {
    dbConnection.close().then(() => {
        console.log("Disconnect Successful");
    }).catch(err => {
        console.log("Hubo un error al desconectar");
    })
}

//export database connection
module.exports = { dbConnection, connect, disconnect };