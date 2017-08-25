'use strict';
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express')
const flash = require("req-flash");
const session = require('express-session');

const index = require('../routes/index');
const dashboard = require('../routes/dashboard');
const privateDocuments = require('../routes/privateDocuments');
const publicDocuments = require('../routes/publicDocuments');
const freeboard = require('../routes/freeboard');

const user = require('../controllers/user');
const document = require('../controllers/document');
const folder = require('../controllers/folder');
const freepost = require('../controllers/freepost');

module.exports = function( app,passport ) {
    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../data')));
    app.use(session({ secret: '123', resave: true, saveUninitialized: false}));
    app.use(flash());
    
    // passport
    app.use(passport.initialize());
    app.use(passport.session());

    // router
    app.use('/', index);
    app.use('/dashboard',dashboard);
    app.use('/privateDocuments',privateDocuments);
    app.use('/publicDocuments',publicDocuments);
    app.use('/freeboard',freeboard);

    //controller
    app.use('/user',user);
    app.use('/document',document);
    app.use('/folder',folder);
    app.use('/freepost',freepost);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    });
}