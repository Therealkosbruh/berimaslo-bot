const TelegramBot = require('node-telegram-bot-api');

const token = '8009120158:AAGZ3TeV5e-h4k2d8BbAhCLABpfmWHigS6s';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || "Пользователь";

  const startMessage = `Здравствуйте, ${username}!\n\nПриветствуем Вас в нашем интернет магазине.\n\nВыберите интересующий Вас пункт меню 👇`;

  const menuOptions = {
    reply_markup: {
      inline_keyboard: [
        // [
        //   { text: 'Каталог товаров', callback_data: 'catalog' },
        //   { text: 'Контакты', callback_data: 'contacts' }
        // ],
        [
          { 
            text: 'Открыть WebApp', 
            web_app: { url: 'https://berimaslo-bot.ru/' }
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, startMessage, menuOptions);
});

bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'catalog') {
    bot.sendMessage(chatId, 'Вы выбрали Каталог товаров. Чем можем помочь?');
  } else if (data === 'contacts') {
    bot.sendMessage(chatId, 'Наши контакты: +7 123 456 7890');
  }
  bot.answerCallbackQuery(callbackQuery.id, { text: 'Вы выбрали ' + data });
});
