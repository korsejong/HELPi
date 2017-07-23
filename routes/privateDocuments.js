const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.get('/', async(function*(req, res){
  folders = yield Folder.find({owner:req.user});
  documents = yield Document.find({owner:req.user});

  res.render('private-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
  });
}));

router.get('/view/:id', async(function*(req, res){
  let document = yield Document.findById(req.params.id);
  res.render('documents/view',{
    title: 'HELPi',
    user: req.user,
    document: document,
  })
}));

module.exports = router;
