const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Freepost = require("../models/freepost");

const common = require('../util/common');
const is_user = common.requireAuthentication;

router.get('/', is_user, async(function* (req, res) {
  let posts = yield Freepost.find().populate('writer');
  res.render('freeboard/list-board', { 
    title: 'HELPi', 
    user: req.user,
    posts: posts,
  });
}));

router.get('/:id', is_user, function (req, res){
  res.render('freeboard?view-board',{
    title: 'HELPi',

  });
});

module.exports = router;
