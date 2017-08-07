'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Folder = require("../models/folder");
const Document = require("../models/document");
const User = require("../models/user");

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
        if(req.body.path != '/'){
            parent.contents.folders.push(folder);
            yield parent.save();
        }
    }catch(err){
        console.log(err);
    }
    res.redirect('back');
}));

router.post('/update', async(function*(req,res){
    let folder = yield Folder.findById(req.body.fdid);
    folder.foldername = req.body.foldername;
    let partner = yield User.findOne({username:req.body.user});
    if(partner){
        folder.partner.push(partner);
        folder.type = 'public';
    }
    try{
        yield folder.save();
    }catch(err){
        console.log(err);
        re.redirect('back');
    }
    res.redirect('back');
}));

router.get('/delete/:id', async(function*(req,res){
    let folder = yield Folder.findById(req.params.id);
    folder.deleted = true;
    try{
        yield folder.save();
        res.redirect('back');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

module.exports = router;