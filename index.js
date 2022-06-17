const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* 
//configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); */

app.use(cors())

//CONNECT TO DB
/* const mongoString = process.env.DB_URL */
const mongoString = "mongodb+srv://user:Password123@bookstore.znatx.mongodb.net/test"
mongoose.connect(mongoString);

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//Import Routes
const routes = require('./Routes/routes.js');

const authRoute = require('./Routes/auth.js');

const verifyToken = require('./Routes/verifyToken.js');

app.use('/api', routes);
app.use('/api/register',authRoute);


app.get("/", (req, res) => {
    res.send("Express on Vercel");
    //res.json({ message: "Server is running" });
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
