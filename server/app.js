﻿const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require('cors')
const eventsRouter = require("./routes/Events");
const usersRouter = require("./routes/Users");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

module.exports = app;
