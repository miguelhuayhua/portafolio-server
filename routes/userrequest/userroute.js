const express = require('express');
const route = express.Router();
const { addNewUser, getOneUser } = require("../../database/crud/usercrud");
//security
const { genSalt, hash, compare } = require("bcrypt");
//add new user from the data frontend


route.post("/", async (req, res) => {
    const { password } = req.body;
    let salt = await genSalt(2);
    let encPass = await hash(password, salt);
    addNewUser({ ...req.body, password: encPass }).then(val => {
        res.json(val);
    }).catch(err => {
        res.send(err);
    })
})
//login and password verification
route.post("/login", async (req, res) => {
    const { username, password } = req.body;
    username === undefined ? "" : username;
    let userLog = await getOneUser({ username });
    if (userLog == null) res.send("No existe usuario");
    else {
        let finded = await compare(password, userLog.password);
        if (finded) {
            res.json({ id: userLog._id })
        }
        
        else res.send("Contraseña de usuario erronea");
    }
})

module.exports = route;