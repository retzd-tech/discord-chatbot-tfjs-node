require('@tensorflow/tfjs-node');
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const config = require('./config');

const initializeBot = async () => {
  await client.login(config.BOT_TOKEN);
};

initializeEvents = () => {
  fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
      const eventHandler = require(`./events/${file}`);
      const eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventHandler(client, ...args));
    });
  });
};

initializeEvents();
initializeBot();


