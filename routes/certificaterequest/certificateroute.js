const express = require('express');
const path = require('path');
//import CRUD operators
const { findCertificates } = require('../../database/crud/certificatecrud');

//import id from mongodb
const { ObjectId, } = require("mongodb");
const router = express.Router();
//fs
const fs = require('fs');
//getting images from the server by url param
router.get("/images/:certificateid", (req, res) => {
    let pathImage = path.join(__dirname, "..", "..", "static", "images");

    const _$oid = new ObjectId(req.params.certificateid);
    findCertificates({ _id: _$oid }).then(certificate => {
        res.sendFile(`${pathImage}/${certificate[0].file}`)
    })
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
    let arr = new Uint8Array(files.data)
    fs.writeFileSync("static/images/" + files.name, Buffer.from(arr))
    res.send("h")
})

module.exports = router;