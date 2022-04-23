const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client();

var colors = require('colors');
require('dotenv').config();
const fs = require('fs');

client.commands = new Discord.Collection();
fs.readdirSync('./commands').forEach((category) => {
  const commandsFiles = fs.readdirSync('./commands/' + category + '/').filter((file) => file.endsWith('js'));
  for (let file of commandsFiles) {
    let command = require('./commands/' + category + '/' + file);
    console.log('[COMMANDS]'.rainbow + ' Command ' + file.yellow + ' of the category ' + category.magenta + ' loaded')
    client.commands.set(command.name, command)
  }
});

fs.readdirSync('./events').forEach((category) => {
  const eventsFiles = fs.readdirSync('./events/' + category + '/').filter((file) => file.endsWith('js'));
  for (const file of eventsFiles) {
    let event = require('./events/' + category + '/' + file);
    console.log('[EVENTS]'.cyan + ' Event ' + file.blue + ' of the category ' + category.magenta + ' loaded')
    client.on(file.split(".")[0], (...args) => event(client, ...args));
  };
});

client.login(process.env.TOKEN);


process.on('unhandledRejection', error => {
  console.error(error)

  const WebHookClient = new Discord.WebhookClient({ url: process.env.WH_URL });

  WebHookClient.send({ content: '🚨 **ERROR**\n\n```' + error + '```' });
});
