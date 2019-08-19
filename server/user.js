const express = require('express');
const db = require('./db');
const utils = require('./utils');

const Router = express.Router();
const User = db.getModel('user');

const _filter = { password: 0, __v: 0 };

/**
 * User route redirect
 */
Router.post('/auth', (req, res) => {
	const { userid } = req.cookies;
	if (!userid) {
		return res.json({ code: 1 });
	} else {
		User.findOne({ _id: userid }, _filter, (err, doc) =>
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
	const { username } = req.body;
	User.findOne({ username }, (err, doc) =>
		doc
			? res.json({ code: 1101, msg: '用户名已存在' })
			: res.json({ code: 1100, msg: '用户名有效' })
	);
});

/**
 * Signin
 */
Router.post('/signin', (req, res) => {
	console.log(req.body);
	const { username, password } = req.body;
	User.findOne(
		{ username, password: utils.md5Encryption(password) },
		_filter,
		(err, doc) => {
			if (doc) {
				console.log(doc._id);
				res.cookie('userid', doc._id);
				return res.json({ code: 1200, doc });
			} else {
				return res.json({ code: 1201, msg: '登录失败' });
			}
		}
	);
});

Router.get('/list', (req, res) => {
	console.log(req.query);
	const condition = req.query ? { ...req.query } : {};
	User.find(condition, _filter, (err, doc) =>
		err
			? res.json({ code: 1301, msg: '请求失败' })
			: res.json({ code: 1300, doc })
	);
});

Router.post('/add', (req, res) => {
	console.log(req.body);
	const { userid } = req.cookies;
	User.findOneAndUpdate(
		{ _id: userid },
		{ $push: { cars: req.body } },
		(err, doc) =>
			doc
				? res.json({ code: 1400, msg: '添加成功' })
				: res.json({ code: 1401, msg: '添加失败' })
	);
});

module.exports = Router;
