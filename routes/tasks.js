const {tasksController} = require('../controllers/tasks.controller');

const tasksRouter = require('express').Router();

tasksRouter.get('/', tasksController.getAll );
tasksRouter.post('/create', tasksController.createTask);
tasksRouter.get('/:id', tasksController.getTaskById );
tasksRouter.put('/:id', tasksController.updateTaskById );
tasksRouter.delete('/:id', tasksController.deleteTaskById);

module.exports = {tasksRouter};
