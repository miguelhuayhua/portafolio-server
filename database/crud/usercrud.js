//import the database
const { database } = require("../database");




//INSERT new user
const addNewUser = async (data) => {
    const db = await database;
    const users = db.collection("users");
    const res = await users.insertOne(data).then(result => {
        console.log(`New document with _id${result.insertedId} was inserted`);
        return true;
    }).catch(() => {
        return false;
    });
    return res;
}

//GET A ONE USER 
const getOneUser = async (data) => {
    const db = await database;
    const users = db.collection("users");
    const user = getData(users, data).then(user => {
        return user;
    }).catch(() => {
        return false;
    })
    return user;
}


const getData = async (res, data) => {
    return res.findOne(data, { projection: { _id: 1, password: 1 } });
}
module.exports = { getOneUser, addNewUser }
