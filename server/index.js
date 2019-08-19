const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const goodsRouter = require('./goods');

const app = express();
const port = 4000;

app.on('connection', () => console.log('user login'));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/goods', goodsRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
