'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Freepost = require("../models/freepost");
const User = require("../models/user");

router.post('/create', async(function*(req,res){
    let freepost = new Freepost({
        writer: req.user,
        title: req.body.title,
        contents: req.body.contents
    });
    try{
        yield freepost.save();
    }catch(err){
        console.log(err);
    }
    res.redirect('back');
}));

router.post('/edit',async(function*(req,res){
    let freepost = yield Freepost.findById(req.body.postid);
    freepost.title = req.body.title;
    freepost.contents = req.body.contents;
    try {
        yield freepost.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('back');
}));

router.get('/delete/:id',async(function*(req,res){
    let freepost = yield Freepost.findById(req.params.id);
    freepost.deleted = true;
    try {
        yield freepost.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('back');
}));

router.get('/get/:id',async(function*(req,res){
    let freepost = yield Freepost.findById(req.params.id);
    res.send(freepost);
}));

router.post('/addComment/:id/:uid',async(function(req,res){

}));

module.exports = router;