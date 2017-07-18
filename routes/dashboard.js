const express = require('express');
const router = express.Router();

const Documents = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

router.get('/', function(req, res, next) {
  res.render('dashboard/home', { 
    title: 'HELPi',
    user: req.user,
  });
});

module.exports = router;
