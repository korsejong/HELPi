'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

// create document
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
        if(req.body.path != '/'){
            parent.contents.documents.push(document);
            yield parent.save();
            if(parent.partner.length != 0){
                document.partner = parent.partner;
            }
        }
        yield document.save();  
        res.redirect('/privateDocuments/view/'+document.id);
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

// update document - documentname or partner
router.post('/update', async(function*(req,res){
    let document = yield Document.findById(req.body.dcid);
    document.documentname = req.body.documentname;
    if(req.body.user){
        let partner = yield User.findOne({username:req.body.user});
        if(partner){
            document.partner.push(partner);
            document.type = 'public';
        }
    }
    if(req.body.delete_user){
        let deletePartner = yield User.findOne({username:req.body.delete_user});
        if(deletePartner){
            let idx = document.partner.indexOf(deletePartner.id);
            if(idx != -1)
                document.partner.splice(idx,1);
        }
    }
    try{
        yield document.save();
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
    res.redirect('back');
}));

// delete document
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

// get document information
router.get('/get/:id',async(function*(req,res){
    let document = yield Document.findById(req.params.id).populate('owner').populate('partner');
    res.send(document);
}));

module.exports = router;