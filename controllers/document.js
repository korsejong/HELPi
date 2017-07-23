'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");

router.post('/create', async(function*(req,res){
    let document = new Document({
        owner : req.user,
        type : req.body.type,
        documentname : req.body.documentname
    });
    try{
        yield document.save();
        res.redirect('/privateDocuments/view/'+document.id);
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}));

module.exports = router;