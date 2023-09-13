const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const token = "6157631529:AAGsWEIePwZzgj4Cwpf0m-2x_ISsEYfxCTc";
const webAppUrl = "https://eclectic-stardust-c9ad9a.netlify.app/";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Open Web App",
            url: webAppUrl,
          },
        ],
      ],
    }),
  };

  if (messageText === "/start") {
    bot
      .sendMessage(chatId, "Hello!", options)
      .catch((error) => console.error(error));
  }
});

app.post("/web-data", async (req, res) => {
  const { queryId } = req.data;

  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Sample Article",
      input_message_content: {
        message_text: "This is a sample article.",
      },
    });
    return res.status(200).json({});
  } catch {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Noooo Sample Article",
      input_message_content: {
        message_text: "Nooooo This is a sample article.",
      },
    });

    return res.status(500).json({});
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Перезапустить сервер каждые 24 часа (86400000 миллисекунд)
setInterval(() => {
  console.log("Restarting server...");
  process.exit(0);
}, 900000);
