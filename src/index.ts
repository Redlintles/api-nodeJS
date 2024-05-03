import { Request, Response } from "express";
require("dotenv").config()

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter")
const bodyParser = require("body-parser")


app.use(bodyParser.json())
app.use("/user", userRouter)

app.get("/", async (_: Request, res: Response) => {
	return res.send("Hello World!");
});

app.listen(3000, () => {
	console.log("Server is running!");
});
