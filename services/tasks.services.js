const { tasksModelOperations } = require("../models/tasks")

const tasksServices = {
    getAll : async(orderBy , orderByValue , filterBy ,filterByValue,from,to , userId , page ) => {
        return await tasksModelOperations.getAll(orderBy , orderByValue , filterBy ,filterByValue,from,to,userId,page);
    },
    createTask : async( body , userId ) => {
        await tasksModelOperations.createTask(body, userId ) ;
    },
    getTaskById : async( id ) => {
        return await tasksModelOperations.taskById(id)
    },
    updateTaskById : async( id ) => {
        await tasksModelOperations.updateTaskById( id ) ;
    },
    deleteTaskById : async( id ) => {
         await tasksModelOperations.deleteTaskById( id ) ;
    }
}

module.exports = { tasksServices } ;