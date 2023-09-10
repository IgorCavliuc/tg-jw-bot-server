const fetch = require('node-fetch');

// Define the URL of your Netlify server
const netlifyUrl = 'https://delightful-cendol-8a4eee.netlify.app'; // Replace with your Netlify server URL

// Define the interval (in milliseconds) at which you want to ping the server
const pingInterval = 600000; // 10 minutes (adjust as needed)

function pingServer() {
  fetch(netlifyUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`Ping successful at ${new Date().toLocaleString()}`);
    })
    .catch(error => console.error(`Error pinging server: ${error.message}`))
    .finally(() => {
      setTimeout(pingServer, pingInterval);
    });
}

pingServer();
