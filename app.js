const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);
require('./config/routes')(app,passport);
require('./config/share')(app);

const mongoDB = 'mongodb://127.0.0.1:27017/HELPi';
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoDB);
module.exports = app;
