const config = require('config');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.get('TELEGRAM_BOT_TOKEN'));
bot.setWebHook(`${config.get('URL')}/bot${config.get('TELEGRAM_BOT_TOKEN')}`);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	const resp = match[1]; // the captured "whatever"

	bot.sendChatAction(chatId, 'typing');

	bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of messages
bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	console.log('Received your message');
	console.log(msg);

	setTimeout(() => {
		bot.sendMessage(chatId, 'Received your message');
	}, 1000);
});

module.exports = bot;
