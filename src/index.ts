import { Request, Response } from "express";
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const pageText = require("../public/text.json");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentsRouter = require("./routes/CommentsRouter");
const tagsRouter = require("./routes/tagsRouter");
const adminRouter = require("./routes/adminRouter");
const sequelize = require("./utils/db");
const groupRouter = require("./routes/groupRouter");
const bodyParser = require("body-parser");
const profileRouter = require("./routes/profileRouter");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/comments", commentsRouter);
app.use("/tags", tagsRouter);
app.use("/admin", adminRouter);
app.use("/group", groupRouter);
app.use("/profile", profileRouter);

app.get("/", async (_: Request, res: Response) => {
  return res.render("index", {
    pageText,
    language: "pt",
  });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => console.log(err));
