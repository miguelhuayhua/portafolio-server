//import connect and the 
const { connect, disconnect } = require("../connections");
//import the database
const { database } = require("../database");
//connect auto
//SELECT certificates
const findCertificates = async (data) => {
    connect();
    const certificates = database.collection("certificates");
    const list = await getData(certificates, data).then(val => {
        disconnect();
        return val;
    }).catch(err => {
        throw err;
    });
    return list;
}
const getData = async (res, data) => {
    return res.find(data).toArray();
}

const addCertificate = () => {

}
module.exports = { findCertificates };