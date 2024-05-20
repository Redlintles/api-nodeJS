import { Request, Response } from "express";
require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentsRouter = require("./routes/CommentsRouter");
const tagsRouter = require("./routes/tagsRouter");
const adminRouter = require("./routes/adminRouter");
const sequelize = require("./utils/db");
const groupRouter = require("./routes/groupRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comments", commentsRouter);
app.use("/tags", tagsRouter);
app.use("/admin", adminRouter);
app.use("/group", groupRouter);

app.get("/", async (_: Request, res: Response) => {
  return res.send("Hello World!");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => console.log(err));
