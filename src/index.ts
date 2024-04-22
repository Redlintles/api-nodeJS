import { Request, Response } from "express";

const express = require("express");
const app = express();

app.get("/", async (_: Request, res: Response) => {
	return res.send("Hello World!");
});

app.listen(3000, () => {
	console.log("Server is running!");
});
