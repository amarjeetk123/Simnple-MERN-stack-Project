require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/database")
const app = express();
const userRouts = require("./routes/userRoutes")
var cors = require('cors')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectToDB();

app.use("/" , userRouts );



module.exports = app ;


// #   mongodb = 
// #   localhost = this is my system
// #   27017 = PORT Number
// #   alphacrud = name of the database
// #   Here i am not created database with name "alphacrud" , but mongodb will automatically craete it.