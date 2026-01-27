const { usersModelOperations } = require("../models/users")

const userServices = {
    getTaskCreator : async( taskId ) => {
       return await usersModelOperations.getTaskCreator( taskId ) ;
    }
}

module.exports = { userServices } ;