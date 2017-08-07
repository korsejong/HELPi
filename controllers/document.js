'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.post('/create', async(function*(req,res){
    let parent = null;
    if(req.body.path != '/')
        parent = yield Folder.findById(req.body.path);
    let document = new Document({
        owner : req.user,
        type : req.body.type,
        documentname : req.body.documentname,
        path : req.body.path,
        parent : parent,
        option : req.body.docoption,
    });
    try{
        yield document.save();
        if(req.body.path != '/'){
            parent.contents.documents.push(document);
            yield parent.save();
        }  
        res.redirect('/privateDocuments/view/'+document.id);
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

router.post('/update', async(function*(req,res){
    let document = yield Document.findById(req.body.dcid);
    document.documentname = req.body.documentname;
    let partner = yield User.findOne({username:req.body.user});
    if(partner){
        document.partner.push(partner);
        document.type = 'public';
    }
    try{
        yield document.save();
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
    res.redirect('back');
}));

router.get('/delete/:id', async(function*(req,res){
    let document = yield Document.findById(req.params.id);
    document.deleted = true;
    try{
        yield document.save();
        res.redirect('back');
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

module.exports = router;