'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const passport = require('passport');
const crypto = require('crypto');

const Freepost = require("../models/freepost");

router.post('/create', async(function*(req,res){
    let freepost = new Freepost({
    });
    try{
        yield freepost.save();
        res.redirect('back');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));


module.exports = router;