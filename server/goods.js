const express = require('express');
const db = require('./db');
const utils = require('./utils');

const Router = express.Router();
const Goods = db.getModel('goods');

const _filter = { __v: 0 };

// const goods = [
// 	{
// 		name: '凌志',
// 		day: 3,
// 		rate: 100
// 	},
// 	{
// 		name: '甲壳虫',
// 		day: 7,
// 		rate: 250
// 	},
// 	{
// 		name: '奥迪',
// 		day: 5,
// 		rate: 125
// 	},
// 	{
// 		name: '法拉利',
// 		day: 20,
// 		rate: 400
// 	},
// 	{
// 		name: '宝马',
// 		day: 12,
// 		rate: 240
// 	},
// 	{
// 		name: '摩托车旧',
// 		day: 1,
// 		rate: 60
// 	},
// 	{
// 		name: '摩托车新',
// 		day: 1,
// 		rate: 40
// 	},
// 	{
// 		name: '奔驰',
// 		day: 7,
// 		rate: 140
// 	}
// ];

// Goods.insertMany(goods);

Router.get('/list', (req, res) => {
	Goods.find({}, _filter, (err, doc) =>
		err
			? res.json({ code: 2001, msg: '请求失败' })
			: res.json({ code: 2000, doc })
	);
});

module.exports = Router;
