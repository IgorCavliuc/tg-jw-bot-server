const TelegramBot = require("node-telegram-bot-api");
const token = "6157631529:AAGsWEIePwZzgj4Cwpf0m-2x_ISsEYfxCTc";
const webAppUrl =
  "https://translate.google.com/?hl=ru&sl=en&tl=ru&text=on%20click%20link%2C%20nothing%20going&op=translate";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Open Web App",
            web_app: { url: webAppUrl },
          },
        ],
      ],
    }),
  };

  bot.sendMessage(
    chatId,
    "Click the button below to open the web app:",
    options,
  );
});
