//import connect and the 
const { restart } = require("nodemon");
const { dbConnection } = require("../connections");
//import the database
const { database } = require("../database");
//connect auto
//SELECT certificates
const findCertificates = async (data) => {
    const db = await database;
    const certificates = db.collection("certificates");
    certificatesList = await certificates.find(data).toArray();
    return certificatesList;

}
const findCertificate = async (data) => {
    const db = await database;
    const certificate = db.collection('certificates');
    const result = certificate.findOne(data);
    return result;

}

const addCertificate = async (data) => {
    const certificates = db.collection("certificates");
    certificates.insertOne(data, (err, res) => {
        if (err) throw err;
    });
}
module.exports = { findCertificates, addCertificate, findCertificate };