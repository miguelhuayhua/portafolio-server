//import connect and the 
const { dbConnection } = require("../connections");
//import the database
const { database } = require("../database");

//connect auto
//INSERT CUSTOMER
const addNewClient = async (data) => {
    return dbConnection.connect().then(()=>{
        const clients = database.collection("customers");
        const res = clients.insertOne(data).then(result => {
            console.log(`New document with _id${result.insertedId} was inserted`);
            dbConnection.close();
            return true;
        }).catch(() => {
            return false;
        });
        return res;
    })
}

//SELECT CUSTOMERS

const loadClient = async (data) => {
    return dbConnection.connect().then(()=>{
        const customer = database.collection("customers");
        const customerData = getData(data, customer).then(val => {
            dbConnection.close();
            return val;
        });
        return customerData;
    })
}
    

//get customer function;
const getData = async (data, collection) => {
    return collection.find(data).toArray();
}


//DELETE CUSTOMER
const deleteCustomer = async (data) => {
    return dbConnection.connect().then(()=>{
        const customer = database.collection("customers");
        let out = customer.deleteOne(data).then(message => {
            console.log("Delete success...");
            console.log(message)
            dbConnection.close();
            return true;
        }).catch((err) => {
            return false;
        })
        return out;
    });
}
module.exports = { addNewClient, loadClient, deleteCustomer };