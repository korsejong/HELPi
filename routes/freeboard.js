const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { wrap: async } = require('co');

const Freepost = require("../models/freepost");

const common = require('../util/common');
const is_user = common.requireAuthentication;

router.get('/', is_user, async(function* (req, res) {
	let page = 0;
	let limit = 4;
	let option = {
		page: page,
		limit: limit,
	}
	let posts = yield Freepost.list(option);
	let count = yield Freepost.allCount();
	res.render('freeboard/list-board', { 
		title: 'HELPi', 
		user: req.user,
		posts: posts,
		page: page,
		pages: Math.ceil(count / limit)
	});
}));

router.get('/:page', is_user, async(function* (req, res) {
	let page = parseInt(req.params.page);
	let limit = 4;
	let option = {
		page: page,
		limit: limit,
	}
	let posts = yield Freepost.list(option);
	let count = yield Freepost.allCount();
	res.render('freeboard/list-board', { 
		title: 'HELPi', 
		user: req.user,
		posts: posts,
		page: page,
		pages: Math.ceil(count / limit)
	});
}));

module.exports = router;
