const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");
const { userModel } = require("./user.model");
const { tasksModel } = require("./tasks.model");




const users = userModel(sequelize , DataTypes) ;
const tasks = tasksModel(sequelize , DataTypes) ;

users.hasMany( tasks , { foreignKey : "userId" , as : "tasks"}) ;
tasks.belongsTo( users , { foreignKey : "userId" , as : "users" } )


module.exports = { users , tasks } ;

