const joi = require('joi')


const emailSchema = joi.string().email().required().messages({
    "string.email" : "Invalid email address" ,
    "any.required" : "Email is required" ,
    "string.empty" : "Email cannot be empty" 
}) ; 

const passwordSchema = joi.string().min(8).required().messages({
    "string.min" : "Password must be at least of 8 characters." ,
    "string.empty" : "Please provide a password."
})


module.exports = { emailSchema , passwordSchema} ;