const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Freepost = require("../models/freepost");

router.get('/', async(function* (req, res) {
  let posts = yield Freepost.find().populate('writer');
  res.render('freeboard/list-board', { 
    title: 'HELPi', 
    user: req.user,
    posts: posts,
  });
}));

router.get('/:id',function (req, res){
  res.render('freeboard?view-board',{
    title: 'HELPi',

  });
});

module.exports = router;
