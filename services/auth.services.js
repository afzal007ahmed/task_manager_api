const { usersModelOperations } = require("../models/users")

const authServices = {
    register : async( body ) => {
        await usersModelOperations.register( body ) ;
    },
    login : async( body ) => {
        return await usersModelOperations.login( body ) ;
    }
}


module.exports = { authServices } ;