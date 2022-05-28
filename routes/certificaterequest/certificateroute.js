const express = require('express');
const path = require('path');
//import CRUD operators
const { findCertificates, addCertificate, findCertificate, deleteCertificate } = require('../../database/crud/certificatecrud');

//import id from mongodb
const { ObjectId, } = require("mongodb");

const router = express.Router();
//fs
const fs = require('fs');


//getting images from the server by url param
router.get("/images/:certificateid", async (req, res) => {
    let pathImage = path.join(__dirname, "..", "..", "static", "images");
    const _$oid = new ObjectId(req.params.certificateid);
    const certificate = await findCertificate({ _id: _$oid });
    res.sendFile(`${pathImage}/${certificate.fileName}`)

})

//main route
router.get("/", (req, res) => {
    findCertificates({}).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})

//adding new certificate
router.post("/add", (req, res) => {
    const { files } = req.files;
    const { title, business, year, month, date, credencial, type } = req.body;
    let arr = new Uint8Array(files.data);
    fs.writeFile("static/images/" + files.name, Buffer.from(arr), (err => {
        if (err) throw err;
        addCertificate({ title, business, year, month, fileName: files.name, credencial, date, type });
        res.json({
            added: true
        });
    }))
})

//deleting certificate given _id
router.delete('/delete', (req, res) => {
    const { id } = req.body;
    deleteCertificate(id).then(() => {
        res.json({
            deleted: true
        });
    }).catch(() => {
        res.json({
            deleted: false
        })
    })
})

module.exports = router;