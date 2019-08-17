const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/investment-manager';
mongoose.connect(DB, { useFindAndModify: false, useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('Mongodb connected'));

const models = {
	user: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		cars: { type: Array }
	},
	car: {
		name: { type: String, required: true },
		day: { type: String, required: true },
		rate: { type: Number, required: true }
	}
};

for (const m in models) {
	if (models.hasOwnProperty(m)) {
		const el = models[m];
		mongoose.model(m, new mongoose.Schema(el));
	}
}

module.exports = {
	getModel: name => mongoose.model(name)
};
