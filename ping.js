const fetch = require("node-fetch");
const netlifyUrl = "https://delightful-cendol-8a4eee.netlify.app"; // Replace with your Netlify server URL
const pingInterval = 600000;

function pingServer() {
  fetch(netlifyUrl)
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
