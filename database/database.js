const { dbConnection } = require("./connections");

//create a portafolio database reference
const database = dbConnection.db("portafolio");
//export the database
module.exports = { database };

