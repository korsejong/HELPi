'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const passport = require('passport');
const crypto = require('crypto');

const Folder = require("../models/folder");

router.post('/create', async(function*(req,res){
    let folder = new Folder({
    });
    try{
        yield folder.save();
        res.redirect('back');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));


module.exports = router;