
//import the database
const { database } = require("../database");
//mongoid
const { ObjectId } = require('mongodb');
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
    const db = await database;
    const certificates = db.collection("certificates");
    certificates.insertOne(data, (err, res) => {
        if (err) throw err;
        console.log(res)
    });
}

const deleteCertificate = async (id) => {
    let _id = new ObjectId(id);
    const db = await database;
    const certificate = db.collection('certificates');
    certificate.deleteOne({ _id }).then(value => {
        console.log(`Delete success ${value}`);
    })
}
module.exports = { findCertificates, addCertificate, findCertificate, deleteCertificate };