const express = require('express');
const router = express.Router();

const document = require("../models/document");

router.get('/', function(req, res, next) {
  res.render('dashboard/home', { 
    title: 'HELPi',
    user: req.user,
  });
});

module.exports = router;
