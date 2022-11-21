const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name:{
        type : String ,
        require : [true , "name is required"],
        trim  : true ,  // it will remove all extra spaces
        maxlength : [25  , "Name must be less than 25 character" ]
    },
    email :{
        type : String ,
        require : [true  , "email is required"],
        unique : true ,
    }

})

module.exports = mongoose.model("User"  , userSchema ) // inside database this "User" is save as "users" i.e in plural form
