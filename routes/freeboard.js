const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

router.get('/', function(req, res, next) {
  res.render('freeboard/list-board', { 
    title: 'HELPi', 
    user: req.user,
  });
});

module.exports = router;
