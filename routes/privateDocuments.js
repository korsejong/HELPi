const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.get('/', async(function*(req, res){
  let folders = yield Folder.privateList(req.user,'/');
  let documents = yield Document.privateList(req.user,'/');
  res.render('private-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
  });
}));

router.get('/:id', async(function*(req, res){
  let curPath = yield Folder.findById(req.params.id).populate('parent');
  let folders = yield Folder.privateList(req.user,req.params.id);
  let documents = yield Document.privateList(req.user,req.params.id);
  res.render('private-documents/list-documents', { 
    title: 'HELPi',
    user: req.user,
    folders: folders,
    documents: documents,
    cur: curPath,
  });
}));

router.get('/view/:id', async(function*(req, res){
  let document = yield Document.findById(req.params.id);
  switch(document.option){
    case 0:
    res.render('documents/view',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 1:
    res.render('documents/type/mindmap',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 2:
    res.render('documents/type/onepageproposal',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 3:
    res.render('documents/type/requirementdocument',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 4:
    res.render('documents/type/designdocument',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 5:
    res.render('documents/type/testcase',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 6:
    res.render('documents/type/usermanual',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
    case 7:
    res.render('documents/type/finalpresentation',{
      title: 'HELPi',
      user: req.user,
      document: document,
    })
    break;
  }
}));

module.exports = router;
