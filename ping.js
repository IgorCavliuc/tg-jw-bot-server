import fetch from "node-fetch";
const herokuUrl = "https://git.heroku.com/tg-jw-bot-server.git"; // Replace with your Netlify server URL
const pingInterval = 5000;

function pingServer() {
  fetch(herokuUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Ping successful at ${new Date().toLocaleString()}`);
    })
    .catch((error) => console.error(`Error pinging server: ${error.message}`))
    .finally(() => {
      setTimeout(pingServer, pingInterval);
    });
}

pingServer();
