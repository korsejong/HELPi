'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const passport = require('passport');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const User = require("../models/user");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './data/profile/')
        },
        filename: (req, file, cb) => {
            let ran = Math.floor(Math.random()*90000) + 10000;
            cb(null, ran + Date.now() + path.extname(file.originalname));
        }
    })
});

router.post('/create', async(function*(req,res){
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        useremail: req.body.useremail,
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

router.get( '/signout', function(req,res){
    req.logOut();
    res.redirect('/')
});

router.post('/update', upload.single('image'), async(function* (req, res) {
    let user = req.user;
    user.useremail = req.body.useremail;
    user.username = req.body.username;
    if(req.body.password)
        user.password = user.hashPassword(req.body.password);
    if(req.file)
        user.profileImage = "/profile/" + req.file.filename;
    try {
        yield user.save();
        res.redirect('back');
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}));


module.exports = router;