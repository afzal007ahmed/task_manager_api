const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors') ;
const { authRouter } = require("./routes/auth");
const { tasksRouter } = require("./routes/tasks");
const { authMiddleware } = require("./middleware/auth.middleware");
const { errorMiddleware } = require("./middleware/error.middleware");
const app = express();

app.use(express.json());
app.use(cookieParser());

//cors 
app.use( cors({
    origin:"http://localhost:5173" ,
    methods : [ "GET" , "POST" , "PUT" , "DELETE"] ,
    credentials : true 
}))

app.use("/auth", authRouter);

app.use('/tasks', authMiddleware ,tasksRouter ) ;

app.use(errorMiddleware) ;


module.exports = { app };
