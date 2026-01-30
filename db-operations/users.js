const { users, tasks } = require("../models/index");
const bcrypt = require("bcrypt");
const { emailSchema, passwordSchema } = require("../validation/joi.validation");

const usersModelOperations = {
  register: async (body) => {
    const err = new Error("Something went wrong.");
    const emailValidation = emailSchema.validate(body.email);
    const passwordValidation = passwordSchema.validate(body.password);
    if (!body.name || !body.name.trim().length) {
      err.message = "Please provide name.";
      err.code = 400;
      throw err;
    }

    if (emailValidation.error) {
      err.message = emailValidation.error.details[0].message;
      err.code = 400;
      throw err;
    }

    if (passwordValidation.error) {
      err.message = passwordValidation.error.details[0].message;
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
    const err = new Error("Something went wrong.");
    const emailValidation = emailSchema.validate(body.email);
    if (emailValidation.error) {
      err.message = emailValidation.error.details[0].message;
      err.code = 400;
      throw err;
    }

    const user = await users.findOne({ where: { email: body.email } });

    if (!user || !user.dataValues) {
      err.message = "User not found.";
      err.code = 404;
      throw err;
    }

    const isMatch = await bcrypt.compare(
      body.password,
      user.dataValues.password,
    );

    if (!isMatch) {
      err.message = "Password mismatch.";
      err.code = 401;
      throw err;
    }

    return user.dataValues;
  },

  getTaskCreator: async (taskId) => {
    const task = await tasks.findOne({ where: { id: taskId } });
    return task.dataValues.userId;
  },
};

module.exports = { usersModelOperations };
