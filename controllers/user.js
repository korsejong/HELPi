'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const passport = require('passport');
const crypto = require('crypto');

const User = require("../models/user");

router.post('/create', async(function*(req,res){
    let user = new User({
        username : req.body.username,
        password : req.body.password
    });
    try{
        yield user.save();
        res.redirect('back');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

router.post( '/signin', passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: true
}), async(function* (req, res){
    res.redirect('/dashboard')
}));

router.post( '/signout', function(req,res){
    req.logOut();
    res.redirect('/')
});


module.exports = router;