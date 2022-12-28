// here inside controller we write LOGIC or BUSINESS LOGIC

const User = require("../models/userModels")

exports.home = (req , res) =>{
    res.send("amarjeet kumar")
}



exports.createUser = async (req , res) =>{

    try {
        const {name , email} = req.body ;
        // To check all the details
        if(!name || !email) {
            throw new Error("Name and Email are Require")
            
        }

        const userExit = await User.findOne({email})
        if(userExit){
           return res.status(401).json({
                success : false ,
                message : "User Email is already exist",
            })
        }
 // Inserting into database
        const user = await User.create({name , email})

        res.status(201).json({
            success : true ,
            message : "User Created Successfully",
            user,
        })
        
    } catch (error) {
        console.log(error)
        
    }

}


exports.getUser = async (req , res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success:true,
            users,
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message,
        })
        
    }

}

exports.editUser = async (req, res) =>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body)
        res.status(200).json({
            success : true ,
            message : "user update succesfull"
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false ,
            message  : error.message,
        })
        
    }
}

exports.deleteUser = async  ( req , res ) =>{
    try {
        const user_id = req.params.id ;
        const user = await User.findByIdAndDelete(user_id)
        res.status(200).json({
            success : true ,
            message : "user delete succesfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false ,
            message  : error.message,
        })
        
    }
}