const { dbConnection } = require("./connections");

//create a portafolio database reference
const database = dbConnection.connect().then(() => {
    return dbConnection.db('portafolio');
});


//export the database
module.exports = { database };

