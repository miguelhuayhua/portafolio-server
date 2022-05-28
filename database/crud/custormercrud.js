//import connect and the 

const { database } = require("../database");

//INSERT CUSTOMER
const addNewClient = async (data) => {
    const db = await database;
    const customers = db.collection("customers");
    const res = customers.insertOne(data).then(result => {
        console.log(`New document with _id${result.insertedId} was inserted`);
        return true;
    }).catch(() => {
        return false;
    });
    return res;
}

//SELECT CUSTOMERS

const loadClient = async (data) => {
    const db = await database;
    const customer = db.collection("customers");
    const customerData = getData(data, customer).then(val => {
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
    const db = await database;
    const customer = db.collection("customers");
    let out = customer.deleteOne(data).then(() => {
        console.log("Delete success...");
        return true;
    }).catch(() => {
        return false;
    })
    return out;
}
module.exports = { addNewClient, loadClient, deleteCustomer };