//import connect and the 
const { connect, disconnect } = require("../connections");
//import the database
const { database } = require("../database");

//connect auto
//INSERT CUSTOMER
const addNewClient = async (data) => {
    connect();
    const clients = database.collection("clients");
    const res = await clients.insertOne(data).then(result => {

        console.log(`New document with _id${result.insertedId} was inserted`);
        disconnect();
        return true;
    }).catch(() => {
        return false;
    });
    return res;
}

//SELECT CUSTOMERS

const loadClient = async (data) => {
    connect();
    console.log(data)
    const customer = database.collection("clients");
    const customerData = await getData(data, customer).then(val => {
        return val;
    });
    return customerData;
}

//get customer function;
const getData = async (data, collection) => {
    return collection.find(data).toArray();
}


//DELETE CUSTOMER
const deleteCustomer = async (data) => {
    connect();
    const customer = database.collection("clients");
    let out = customer.deleteOne(data).then(message => {
        console.log("Delete success...");
        console.log(message)
        disconnect();
        return true;
    }).catch((err) => {
        return false;
    })
    return out;
}
module.exports = { addNewClient, loadClient, deleteCustomer };