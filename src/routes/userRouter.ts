const express = require("express")
const router = express.Router()
const createUser = require("../controllers/Users/createUser")

router.post("/add",createUser)


module.exports = router