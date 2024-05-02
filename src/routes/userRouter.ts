const express = require("express")
const router = express.Router()
const createUser = require("../controllers/Users/createUser")

router.get("/add",createUser)


module.exports = router