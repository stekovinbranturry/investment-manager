const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const userRouter = require('./user');

const app = express();
const port = 4000;

app.on('connection', () => console.log('user login'));

app.use(cors());
app.use(proxy('/api', { target: 'http://localhost:4000/' }));
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
