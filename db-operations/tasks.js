const {Op} = require('sequelize');
const {tasks} = require('../models/index');
const {sequelize} = require('../connections/sequelize');

const tasksModelOperations = {
  getAll: async (
      orderBy,
      orderByValue,
      filterBy,
      filterByValue,
      from,
      to,
      userId,
      page,
  ) => {
    let obj = {userId: userId};
    let limit = {};
    if (page) {
      limit = {...limit, limit: page * 10, offset: (page - 1) * 10};
    }
    if (filterBy === 'dueDate') {
      obj[filterBy] = {};
      if (from) obj[filterBy][Op.gt] = new Date(from);
      if (to) obj[filterBy][Op.lt] = new Date(to);
    } else {
      obj =
        filterBy && filterByValue ?
          {...obj, [filterBy]: filterByValue} :
          {...obj};
    }
    if (orderBy && orderByValue) {
      if (orderBy === 'priority') {
        return await tasks.findAll({
          where: obj,
          order: [
            [
              sequelize.literal(
                  'case priority when \'low\' then 1 when \'medium\' then 2 when \'high\' then 3 end',
              ),
              orderByValue,
            ],
          ],
          ...limit,
        });
      }
      return await tasks.findAll({
        where: obj,
        order: [[orderBy, orderByValue]],
        ...limit,
      });
    }
    return await tasks.findAll({
      where: obj,
      ...limit,
    });
  },
  createTask: async (body, userId) => {
    const err = new Error('Something went wrong.');
    if (!body.title || !body.title.trim().length) {
      err.message = 'Please provide title';
      err.code = 400;
      throw err;
    } else if (!body.priority || !body.priority.trim().length) {
      err.message = 'Please provide priority';
      err.code = 400;
      throw err;
    } else if (!body.dueDate || !body.dueDate.trim().length) {
      err.message = 'Please provide dueDate';
      err.code = 400;
      throw err;
    } else if (!body.status || !body.status.trim().length) {
      err.message = 'Please provide status';
      err.code = 400;
      throw err;
    }
    await tasks.create({
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      status: body.status,
      userId: userId,
      priority: body.priority,
    });
  },
  taskById: async (id) => {
    const data = await tasks.findOne({where: {id: id}});
    return data.dataValues;
  },
  updateTaskById: async (id, body) => {
    const obj = {};
    if (body.title) {
      obj[body.title] = body.title;
    }
    if (body.description) {
      obj[body.description] = body.description;
    }
    if (body.priority) {
      obj[body.priority] = body.priority;
    }
    if (body.dueDate) {
      obj[body.dueDate] = body.dueDate;
    }
    if (body.status) {
      obj[body.status] = body.status;
    }

    await tasks.update(obj, {where: {id: id}});
  },
  deleteTaskById: async (id) => {
    await tasks.destroy({where: {id: id}});
  },
};

module.exports = {tasksModelOperations};
