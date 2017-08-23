const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

const common = require('../util/common');
const is_user = common.requireAuthentication;

router.get('/', is_user, async(function*(req, res){
  let folders = yield Folder.publicList(req.user,'/');
  let documents = yield Document.publicList(req.user,'/');
  res.render('public-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
  });
}));

router.get('/:id', is_user, async(function*(req, res){
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

router.get('/view/:id', is_user, async(function*(req, res){
  let document = yield Document.findById(req.params.id);
  res.render('documents/view',{
    title: 'HELPi',
    user: req.user,
    document: document,
  })
}));

module.exports = router;
