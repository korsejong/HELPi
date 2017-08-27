const express = require('express');
const router = express.Router();
const { wrap: async } = require('co');
const Document = require("../models/document");
const Folder = require("../models/folder");
const User = require("../models/user");

const common = require('../util/common');
const is_user = common.requireAuthentication;

router.get('/', is_user, async(function*(req, res){
	private = {
		documents: yield Document.privateList(req.user,'/'),
		folders: yield Folder.privateList(req.user,'/'),
	};
	public = {
		documents: yield Document.publicList(req.user,'/'),
		folders: yield Folder.publicList(req.user,'/'),
	};
	recent = {
		documents: yield Document.recentList(req.user),
		folders: yield Folder.recentList(req.user)
	};
	others = yield User.find();
	res.render('dashboard/home', { 
		title: 'HELPi',
		user: req.user,
		private: private,
		public: public,
		recent: recent,
		others:others,
		type: 'private',
	});
}));

module.exports = router;
