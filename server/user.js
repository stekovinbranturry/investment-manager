const express = require('express');
const db = require('./db');
const utils = require('./utils');

const Router = express.Router();
const User = db.getModel('user');

const _filter = { password: 0, __v: 0 };

/**
 * 注册
 */
Router.post('/register', (req, res) => {
	console.log(req.body);
	const { firstName, lastName, username, password } = req.body;
	User.findOne({ username }, (err, doc) => {
		if (doc) {
			return res.json({ code: 1001, msg: '邮箱已注册' });
		}
		const userModel = new User({
			firstName,
			lastName,
			username,
			password: utils.md5Encryption(password)
		});

		userModel.save((err, doc) => {
			if (err) {
				return res.json({ code: 1002, msg: '后台出错' });
			} else {
				res.cookie('userid', doc._id);
				return res.json({ code: 1000, data: doc });
			}
		});
	});
});

Router.get('/list', (req, res) => {
	User.find({}, _filter, (err, doc) => (err ? res.json(err) : res.json(doc)));
});

module.exports = Router;
