const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.get('/', async(function*(req, res){
  let folders = yield Folder.publicList(req.user,'/');
  let documents = yield Document.publicList(req.user,'/');
  res.render('public-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
  });
}));

router.get('/:id', async(function*(req, res){
  let curPath = yield Folder.findById(req.params.id).populate('parent');
  let folders = yield Folder.publicList(req.user,req.params.id);
  let documents = yield Document.publicList(req.user,req.params.id);
  res.render('public-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
    cur: curPath,
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
