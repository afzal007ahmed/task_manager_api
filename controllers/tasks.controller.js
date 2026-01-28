const { tasksServices } = require("../services/tasks.services");
const jwt = require("jsonwebtoken");
const { userServices } = require("../services/user.services");

const tasksController = {
  getAll: async (req, res , next ) => {
    try {
      const tasks = await tasksServices.getAll(
        req.query.orderBy,
        req.query.orderByValue,
        req.query.filterBy,
        req.query.filterByValue,
        req.query.from,
        req.query.to,
        req.user.id,
        req.query.page
      );
      res.status(200).send({
        data: tasks,
        error: null,
      });
    } catch (error) {
      next( error ) ;
    }
  },
  createTask: async (req, res , next) => {
    try {
      const { id } = req.user;
      await tasksServices.createTask(req.body, id);
      res.status(201).send({
        success: true,
        error: null,
      });
    } catch (error) {
      next( error );
    }
  },
  getTaskById: async (req, res) => {
    try {
      const creatorId = await userServices.getTaskCreator(req.params.id);
      if (req.user.id !== creatorId) {
        const err = new Error("You are not authorized to see this task details.");
        err.code = 403 ;
        throw err ;
      }
      const response = await tasksServices.getTaskById(req.params.id);
      res.status(200).send({
        data: response,
        error: null,
      });
    } catch (error) {
      next(error)
    }
  },
  updateTaskById: async (req, res , next) => {
    try {
      const taskCreator = await userServices.getTaskCreator(req.params.id);
      if (taskCreator !== req.user.id) {
        const err = new Error("You are not authorized to make any update to this task.");
        err.code = 403;
        throw err ;
      }
      await tasksController.updateTaskById(req.params.id);
      res.status(200).send({
        success: true,
        error: null,
      });
    } catch (error) {
      next(error)
    }
  },
  deleteTaskById: async (req, res,next) => {
    try {
      const taskCreator = await userServices.getTaskCreator(req.params.id);
      if (taskCreator !== req.user.id) {
        const err = new Error("You are not authorized to delete this task.");
        err.code = 403;
        throw err ;
      }
      await tasksServices.deleteTaskById(req.params.id);
      res.status(200).send({
        success: true,
        error: null,
      });
    } catch (error) {
      next(error)
    }
  },
};

module.exports = { tasksController };
