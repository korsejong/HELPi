'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Folder = require("../models/folder");

router.post('/create', async(function*(req,res){
    let parent = null;
    if(req.body.path != '/')
        parent = yield Folder.findById(req.body.path);
    let folder = new Folder({
        foldername: req.body.foldername,
        type: req.body.type,
        owner: req.user,
        path: req.body.path,
        parent: parent
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