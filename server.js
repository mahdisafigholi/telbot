const config = require('config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const bot = require('./bot');

mongoose
	.connect(config.get('MONGODB_ADDRESS'))
	.then(() => console.log('mongoDB connected successfully'))
	.catch(() => console.log('error in mongoDB connection!'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({ status: 200, message: 'OK' });
});

app.post(`/bot${config.get('TELEGRAM_BOT_TOKEN')}`, (req, res) => {
	console.log(req.body);
	bot.processUpdate(req.body);
	res.sendStatus(200);
});

const server = http.createServer(app);

module.exports = server;
