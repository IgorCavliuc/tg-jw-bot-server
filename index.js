const TelegramBot = require("node-telegram-bot-api");
const token = "6157631529:AAGsWEIePwZzgj4Cwpf0m-2x_ISsEYfxCTc";
const webAppUrl = "https://eclectic-stardust-c9ad9a.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

function checkForUpdates() {
  bot
    .getUpdates({ offset: -1 })
    .then((updates) => {
      if (updates.length > 0) {
        // Process the updates if there are any
        updates.forEach((update) => {
          console.log(update);
          // Add your custom processing logic here
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching updates:", error);
    });
}

// Set an interval to check for updates every 500 seconds (adjust as needed)
setInterval(checkForUpdates, 5000);

// Optionally, you can handle incoming messages as well
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

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

  if (messageText === "/start") {
    bot.sendMessage(chatId, "hello", options);
  }
});
