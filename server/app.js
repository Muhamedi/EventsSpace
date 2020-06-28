const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require('cors')
const eventsRouter = require("./routes/Events");
const usersRouter = require("./routes/Users");
const app = express();
const errorHandler = require("./middleware/errorhandler");

app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

module.exports = app;
