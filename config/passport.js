'use strict';
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require( 'mongoose' );
const User = require("../models/user");

module.exports = function( passport ){
    // use static authenticate method of model in LocalStrategy
    // passport.use(User.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser( function( user, done ){
        done( null, user.id );
    });

    passport.deserializeUser( function( id, done ){
        User.findById( id, function( err, user ){
            done( err, user )
        });
    });

    // default local strategy
    passport.use( new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        passReqToCallback: true,
        session: true
    }, function( req, id, pw, done ) {
        //erase null string at head and taile
        var trimStr = id.toString().trim();
        User.findOne({ user_id: trimStr }, function (err, user) {
                //'trimStr' has null string
                if(trimStr.indexOf(" ") > 0){
                    return done(null, false, req.flash( 'message', '아이디에 공백이 포함 되었습니다.'));
                }
                //no user
                if (!user)
                    return done(null, false, req.flash( 'message', '이메일 또는 비밀번호가 틀렸습니다.'));
                // no exist password
                if (!user.isExistPassword()) {
                    return done(null, false, req.flash('message', '이메일 또는 비밀번호가 틀렸습니다.'));
                }
                // password wrong
                if (!user.validPassword(pw))
                    return done(null, false, req.flash('message', '이메일 또는 비밀번호가 틀렸습니다.'));
                // done
                done(null, user);
            });
        }
    ));
};