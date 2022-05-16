const express = require('express');
const { addNewClient, loadClient, deleteCustomer } = require('../../database/crud/clientcrud');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post("/new", (req, res) => {
    addNewClient(req.body).then(val => {
        res.send(val);
    }).catch(err => {
        res.send(err);
    })

})

router.post("/", async (req, res) => {
    const customerData = await loadClient(req.body);
    res.json(customerData);
})

router.delete("/", async (req, res) => {
    const id = req.body._id;
    const _$oid = new ObjectId(id);
    const out = await deleteCustomer({ _id: _$oid });
    if (out) res.send({ eliminado: true })
    else res.send({ eliminado: false })
})
module.exports = router;
