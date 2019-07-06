const { TelegramClient } = require('messaging-api-telegram');

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const client = TelegramClient.connect('884221604:AAEVBWl5ETesASuZ0XjXZs3DBMG0YwovKZM');

var CHAT_ID = '@mikehorbach';
var phone = "380345452323"
var text = "Покупець: Горбач Михайло\n" +
    "телефон:"+phone+"\n Замовлення\n";

client.sendMessage("-327577485", text, {
    disable_web_page_preview: true,
    disable_notification: false,
});