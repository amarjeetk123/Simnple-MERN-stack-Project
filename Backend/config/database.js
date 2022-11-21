const mongoose = require("mongoose");
const {MONGO_URL}  = process.env ;

const connectToDB = () =>{

    mongoose
    .connect(MONGO_URL , {
         useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    .then( console.log("DB connection Sucsefully"))
    .catch(err => console.log(err));


}

module.exports = connectToDB;