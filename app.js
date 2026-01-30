const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {errorMiddleware} = require('./middleware/error.middleware');
const {indexRouter} = require('./routes');
const {config} = require('./config');
const morgan = require('morgan');
const {healthRouter} = require('./routes/health');
const { logsStream } = require('./config/file.logs');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined' , { stream : logsStream}));

// cors
app.use( cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use( '/health', healthRouter);

app.use('/', indexRouter);

app.use(errorMiddleware);


module.exports = {app};
