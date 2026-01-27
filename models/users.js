const { users, tasks } = require("./index");
const bcrypt = require("bcrypt");

const usersModelOperations = {
  register: async (body) => {
    const err = new Error("Something went wrong.");
    if (!body.name || !body.name.trim().length) {
      err.message = "Please provide name.";
      err.code = 403;
      throw err;
    } else if (!body.email || !body.email.trim().length) {
      err.message = "Please provide email.";
      err.code = 403;
      throw err;
    } else if (!body.password || !body.password.trim().length) {
      err.message = "Please provide password.";
      err.code = 403;
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
    const err = new Error("Something went wrong.");
    if (!body.email || !body.email.trim().length) {
      err.message = "Please provide email.";
      err.code = 403;
      throw err;
    } else if (!body.password || !body.password.trim().length) {
      err.message = "Please provide password.";
      err.code = 403;
      throw err;
    }
    const user = await users.findOne({ where: { email: body.email } });

    if (!user || !user.dataValues) {
      err.message = "user not found.";
      err.code = 404;
      throw err;
    } else if (
      !(await bcrypt.compare(body.password, user.dataValues.password))
    ) {
      err.message = "Password mismatch.";
      err.code = 401;
      throw err;
    }
    return user.dataValues;
  },
  getTaskCreator: async (taskId) => {
    const task = await tasks.findOne({
      where: {
        id: taskId,
      },
    });
    return task.dataValues.userId;
  },
};

module.exports = { usersModelOperations };
