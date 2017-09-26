'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Folder = require("../models/folder");
const Document = require("../models/document");
const User = require("../models/user");

// create folder
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
        if(req.body.path != '/'){
            parent.contents.folders.push(folder);
            yield parent.save();
            if(parent.partner.length != 0){
                folder.partner = parent.partner;
            }
        }
        yield folder.save();
    }catch(err){
        console.log(err);
    }
    res.redirect('back');
}));

// update folder - foldername or partner
router.post('/update', async(function*(req,res){
    let folder = yield Folder.findById(req.body.fdid);
    folder.foldername = req.body.foldername;
    if(req.body.user){
        let partner = yield User.findOne({username:req.body.user,deleted:{$ne:true}});
        if(partner){
            folder.partner.push(partner);
            folder.type = 'public';
            folder.path = '/';
            if(folder.contents.length != 0)
                setContentsPublic(folder.contents,partner);
        }
    }
    if(req.body.delete_user){
        let deletePartner = yield User.findOne({username:req.body.delete_user,deleted:{$ne:true}});
        if(deletePartner){
            let idx = folder.partner.indexOf(deletePartner.id);
            if(idx != -1)
                folder.partner.splice(idx,1);
            if(deletePartner && folder.contents.length != 0){
                setContentsDeletePartner(folder.contents,deletePartner);
            }
        }
    }
    try{
        yield folder.save();
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
    res.redirect('back');
}));

// update sub-content of folder - add partner
const setContentsPublic = function(contents,p){
    let partner = p;
    contents.documents.forEach(async(function*(id){
        let document = yield Document.findById(id);
        document.type = 'public';
        document.partner.push(partner);
        try{
            yield document.save();
        } catch(err) {
            console.log(err);
        }
    }));
    contents.folders.forEach(async(function*(id){
        let folder = yield Folder.findById(id);
        folder.type= 'public';
        folder.partner.push(partner);
        try{
            yield folder.save();
        } catch(err) {
            console.log(err);
        }
        if(folder.contents.length != 0)
            setContentsPublic(folder.contents,partner);
    }));
}

// update sub-content of folder - delete partner
const setContentsDeletePartner = function(contents,p){
    let deletePartner = p;
    contents.documents.forEach(async(function*(id){
        let document = yield Document.findById(id);
        document.type = 'public';
        let idx = document.partner.indexOf(deletePartner.id);
        if(idx != -1)
            document.partner.splice(idx,1);
        try{
            yield document.save();
        } catch(err) {
            console.log(err);
        }
    }));
    contents.folders.forEach(async(function*(id){
        let folder = yield Folder.findById(id);
        folder.type= 'public';
        let idx = folder.partner.indexOf(deletePartner.id);
        if(idx != -1)
            folder.partner.splice(idx,1);
        try{
            yield folder.save();
        } catch(err) {
            console.log(err);
        }
        if(folder.contents.length != 0)
            setContentsPublic(folder.contents,partner);
    }));
}

// delete folder
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

// get folder information
router.get('/get/:id', async(function*(req,res){
    let folder = yield Folder.findById(req.params.id).populate('owner').populate('partner');
    res.send(folder);
}));

// move folder
router.post('/move/:id', async(function*(req,res){
    let curFolder = yield Folder.findById(req.params.id);
    console.log(req.body);
    console.log("-----------------");
    console.log(req.body.target);
    let targetFolder = yield Folder.findById(req.body.target);
    targetFolder.contents.folders.push(curFolder);
    curFolder.path = targetFolder.id;
    curFolder.parent = targetFolder;
    try{
        yield curFolder.save();
        yield tagetFolder.save();
    }catch(err){
        console.log(err);
    }
}));

module.exports = router;