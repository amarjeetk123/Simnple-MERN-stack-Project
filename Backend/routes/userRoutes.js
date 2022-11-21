 // Here inside routes we write URL path

const express = require("express")
const router = express.Router();

const {home , createUser ,deleteUser , getUser , editUser} = require("../controller/userController")

router.get("/" , home )
router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.put("/edituser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router