const express = require('express');
require('dotenv').config();
//CORS config
const cors = require('cors');
//cookie config
const cookieParser = require('cookie-parser');
const app = express();
//file uploader
const fileupload = require('express-fileupload');
//routes
const client = require("./routes/clientrequest/clientroute");
const certificate = require("./routes/certificaterequest/certificateroute");
const user = require("./routes/userrequest/userroute");
const morgan = require('morgan');

//path manager
const path = require('path');

//set the port of our server
app.set("PORT", process.env.PORT || 3100);

// use urlencoded to make sure to get an html form body and json
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(fileupload({ createParentPath: true }))
app.use(morgan("dev"))
app.use(cors({
    credentials: true
    , origin: ['http://localhost:3000', 'http://192.168.0.15:3000','https://miguel-huayhua.netlify.app']
}))
app.use(cookieParser("miguelmikeh"));

//using routes
app.use("/client", client);
app.use("/certificate", certificate);
app.use("/user", user);
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/logo.png')
})

app.get('/website/myself', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'website', 'myself.jpg'));
})


//connect with the enviroment port 3100
app.listen(app.get("PORT"), () => {
    console.log(`Listen to port ${app.get("PORT")}`);
})