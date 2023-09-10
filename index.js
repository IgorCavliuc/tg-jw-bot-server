const TelegramBot = require("node-telegram-bot-api");
const token = "6157631529:AAGsWEIePwZzgj4Cwpf0m-2x_ISsEYfxCTc";
const webAppUrl = "https://eclectic-stardust-c9ad9a.netlify.app/";

const bot = new TelegramBot(token, { polling: true });

const http = require("http");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/restart") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Restarting server...");

    exec("pm2 restart myApp", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting server: ${error}`);
        return;
      }
      console.log(`Server restarted: ${stdout}`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
