const {users, tasks} = require('../models/index');
const bcrypt = require('bcrypt');

const usersModelOperations = {
  register: async (body) => {
    const err = new Error('Something went wrong.');

    if (!body.name || !body.name.trim().length) {
      err.message = 'Please provide name.';
      err.code = 400;
      throw err;
    }

    if (!body.email || !body.email.trim().length) {
      err.message = 'Please provide email.';
      err.code = 400;
      throw err;
    }

    if (!body.password || !body.password.trim().length) {
      err.message = 'Please provide password.';
      err.code = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await users.create({
      username: body.name,
      email: body.email,
      password: hashedPassword,
    });
  },

  login: async (body) => {
    const err = new Error('Something went wrong.');

    if (!body.email || !body.email.trim().length) {
      err.message = 'Please provide email.';
      err.code = 400;
      throw err;
    }

    if (!body.password || !body.password.trim().length) {
      err.message = 'Please provide password.';
      err.code = 400;
      throw err;
    }

    const user = await users.findOne({where: {email: body.email}});

    if (!user || !user.dataValues) {
      err.message = 'User not found.';
      err.code = 404;
      throw err;
    }

    const isMatch = await bcrypt.compare(
        body.password,
        user.dataValues.password,
    );

    if (!isMatch) {
      err.message = 'Password mismatch.';
      err.code = 401;
      throw err;
    }

    return user.dataValues;
  },

  getTaskCreator: async (taskId) => {
    const task = await tasks.findOne({where: {id: taskId}});
    return task.dataValues.userId;
  },
};

module.exports = {usersModelOperations};
