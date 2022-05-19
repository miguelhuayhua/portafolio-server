const express = require('express');
const path = require('path');
//import CRUD operators
const { findCertificates, addCertificate, findCertificate } = require('../../database/crud/certificatecrud');

//import id from mongodb
const { ObjectId, } = require("mongodb");

const router = express.Router();
//fs
const fs = require('fs');
const { dbConnection } = require('../../database/connections');
//getting images from the server by url param
router.get("/images/:certificateid", async (req, res) => {
    let pathImage = path.join(__dirname, "..", "..", "static", "images");
    const _$oid = new ObjectId(req.params.certificateid);
    const certificate = await findCertificate({ _id: _$oid });
    console.log(certificate)
    res.sendFile(`${pathImage}/${certificate.fileName}`)

})

router.get("/images", (req, res) => {

    res.send("hiiii")
})

//main route
router.get("/", (req, res) => {
    findCertificates({}).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})

router.post("/add", (req, res) => {
    const { files } = req.files;
    const { title, business, year, month, date } = req.body;
    let arr = new Uint8Array(files.data);
    fs.writeFile("static/images/" + files.name, Buffer.from(arr), (err => {
        if (err) throw err;
        addCertificate({ title, business, year, month, fileName: files.name });
        res.json({ title, business, year, month, fileName: files.name, date });
    }))
})

module.exports = router;