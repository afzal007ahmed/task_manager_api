const { authMiddleware } = require("../middleware/auth.middleware");
const { authRouter } = require("./auth");
const { tasksRouter } = require("./tasks");

const indexRouter = require("express").Router();

indexRouter.use("/auth", authRouter);

indexRouter.use("/tasks", authMiddleware, tasksRouter);

module.exports = { indexRouter } ;