const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);
require('./config/routes')(app,passport);

module.exports = app;
