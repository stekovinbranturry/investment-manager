const express = require('express');
const db = require('./db');
const utils = require('./utils');

const Router = express.Router();
const User = db.getModel('user');

const _filter = { password: 0, __v: 0 };

/**
 * User route redirect
 */
Router.get('/auth', (req, res) => {
	const { userid } = req.cookies;
	if (!userid) {
		return res.json({ code: 1 });
	} else {
		User.find({ _id: userid }, _filter, (err, doc) =>
			doc
				? res.json({ code: 0, doc })
				: res.json({ code: 1, msg: 'userid不存在' })
		);
	}
});

/**
 * 注册
 */
Router.post('/signup', (req, res) => {
	console.log(req.body);
	const { firstName, lastName, username, password } = req.body;
	User.findOne({ username }, (err, doc) => {
		if (doc) {
			return res.json({ code: 1001, msg: '用户名已存在' });
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
				const { _id } = doc;
				res.cookie('userid', _id);
				return res.json({
					code: 1000,
					doc
				});
			}
		});
	});
});

/**
 * Verify username
 */
Router.post('/username', (req, res) => {
	console.log(req.body);
	const { username } = req.body;
	User.findOne({ username }, (err, doc) =>
		doc
			? res.json({ code: 1101, msg: '用户名已存在' })
			: res.json({ code: 1100, msg: '用户名有效' })
	);
});

Router.get('/list', (req, res) => {
	User.find({}, _filter, (err, doc) => (err ? res.json(err) : res.json(doc)));
});

module.exports = Router;
