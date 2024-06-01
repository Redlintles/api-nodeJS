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
const morgan = require("morgan");
const { requestLogger } = require("./utils/logger");

morgan.token("query", (req: any) => JSON.stringify(req.query));
morgan.token("body", (req: any) => JSON.stringify(req.body));
const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms :query :body";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) => requestLogger.info(message.trim()),
    },
  })
);

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

app.get("/:language", (req: Request, res: Response) => {
  const { language } = req.params;
  const supportedLanguages = ["en", "pt"];

  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({
      error: true,
      message: "Language is not supported",
    });
  } else {
    return res.status(200).render("index", {
      pageText,
      language,
    });
  }
});

app.get("/", (_: Request, res: Response) => {
  return res.redirect("/pt");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => console.log(err));
