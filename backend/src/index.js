"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var pageText = require("../public/text.json");
var userRouter = require("./routes/userRouter");
var postRouter = require("./routes/postRouter");
var commentsRouter = require("./routes/CommentsRouter");
var tagsRouter = require("./routes/tagsRouter");
var adminRouter = require("./routes/adminRouter");
var sequelize = require("./utils/db");
var groupRouter = require("./routes/groupRouter");
var bodyParser = require("body-parser");
var profileRouter = require("./routes/profileRouter");
var morgan = require("morgan");
var requestLogger = require("./utils/logger").requestLogger;
var sequelizeLogger = require("./middlewares/sequelizeLogger");
morgan.token("query", function (req) { return JSON.stringify(req.query); });
morgan.token("body", function (req) { return JSON.stringify(req.body); });
var morganFormat = ":method :url :status :res[content-length] - :response-time ms :query :body";
app.use(morgan(morganFormat, {
    stream: {
        write: function (message) { return requestLogger.info(message.trim()); },
    },
}));
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
app.get("/:language", function (req, res) {
    var language = req.params.language;
    var supportedLanguages = ["en", "pt"];
    if (!supportedLanguages.includes(language)) {
        return res.status(400).json({
            error: true,
            message: "Language is not supported",
        });
    }
    else {
        return res.status(200).render("index", {
            pageText: pageText,
            language: language,
        });
    }
});
app.get("/", function (_, res) {
    return res.redirect("/pt");
});
app.use(sequelizeLogger);
sequelize
    .sync({ alter: true })
    .then(function () {
    app.listen(3000, function () {
        console.log("Server is running!");
    });
})
    .catch(function (err) { return console.log(err); });
