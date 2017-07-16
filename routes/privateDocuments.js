const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Document = require("../models/document");

router.get('/', function(req, res, next) {
  res.render('private-documents/list-documents', { 
    title: 'HELPi',
    user: req.user, 
  });
});

module.exports = router;
