const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var cors = require('cors')
const eventsRouter = require("./routes/events.route");
const groupsRouter = require("./routes/groups.route");
const usersRouter = require("./routes/users.route");
const participantTypesRouter = require("./routes/participantTypes.route");
const eventTypesRouter = require("./routes/eventTypes.route");
const invitesRouter = require("./routes/invites.route");
const eventParticipantsRouter = require("./routes/eventParticipants.route");
const app = express();
const errorHandler = require("./middleware/errorhandler");
const authMiddleware = require('./middleware/auth');

app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api/events", authMiddleware, eventsRouter);
app.use("/api/groups", authMiddleware, groupsRouter);
app.use("/api/users", usersRouter);
app.use("/api/participant-types", authMiddleware, participantTypesRouter);
app.use("/api/event-types", authMiddleware, eventTypesRouter);
app.use("/api/invites", authMiddleware, invitesRouter);
app.use("/api/event-participants", authMiddleware, eventParticipantsRouter);

app.use(errorHandler);

module.exports = app;
