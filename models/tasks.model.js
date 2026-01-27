function tasksModel(Sequelize, DataTypes) {
  const tasks = Sequelize.define("Tasks", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority : {
        type : DataTypes.ENUM("low" , "medium" , "high") ,
        allowNull : false 
    },
    dueDate : {
        type : DataTypes.DATE ,
        allowNull : false 
    },
    status : {
        type : DataTypes.ENUM("pending" , "completed"),
        allowNull : false 
    },
    userId : {
        type : DataTypes.UUID ,
        onDelete : "CASCADE" ,
        onUpdate : "CASCADE",
        references : {
            model : "Users",
            key : "id"
        }
    }
  }, { tableName : "Tasks"});
  return tasks ;
}

module.exports = { tasksModel } ;