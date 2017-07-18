const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Documents = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.get('/', async(function*(req, res){
  folders = yield Folder.find({owner:req.user});
  documents = yield Documents.find({owner:req.user});
  res.render('public-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
  });
}));

router.get('/create', (req, res) => {
  res.render('documents/create', { 
    title: 'HELPi',
    user: req.user, 
  });
});

module.exports = router;
