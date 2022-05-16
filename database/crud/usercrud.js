//import connect and the 
const { connect, disconnect } = require("../connections");
//import the database
const { database } = require("../database");




//INSERT new user
const addNewUser = async (data) => {
    connect();
    const users = database.collection("users");
    const res = await users.insertOne(data).then(result => {
        console.log(`New document with _id${result.insertedId} was inserted`);
        disconnect();
        return true;
    }).catch(() => {
        return false;
    });
    return res;
}

//GET A ONE USER 
const getOneUser = async (data) => {
    connect();
    const users = database.collection("users");
    const res = await getData(users, data).then(user => {
        disconnect();
        return user;
    }).catch(() => {
        return false;
    })

    return res;
}


const getData = async (res, data) => {
    return res.findOne(data, { projection: { _id: 1, password: 1 } });
}
module.exports = { getOneUser, addNewUser }
